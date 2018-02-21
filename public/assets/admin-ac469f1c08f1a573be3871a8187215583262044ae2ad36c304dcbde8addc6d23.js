/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.7.1
 *
 * Copyright 2017 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* MIT license */
var colorNames = require(5);

module.exports = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getHwb: getHwb,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   hwbString: hwbString,
   keyword: keyword
}

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr =  /^#([a-fA-F0-9]{3})$/i,
       hex =  /^#([a-fA-F0-9]{6})$/i,
       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
       keyword = /(\w+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   }
   else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
    var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
  var hsla = getHsla(string);
  return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
   else if (vals = getHwb(string)) {
      return vals[3];
   }
}

// generators
function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
              + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
           + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
           + alpha + ")";
}

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
  return reverseNames[rgb.slice(0, 3)];
}

// helpers
function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return (str.length < 2) ? "0" + str : str;
}


//create a list of reverse color names
var reverseNames = {};
for (var name in colorNames) {
   reverseNames[colorNames[name]] = name;
}

},{"5":5}],2:[function(require,module,exports){
/* MIT license */
var convert = require(4);
var string = require(1);

var Color = function (obj) {
	if (obj instanceof Color) {
		return obj;
	}
	if (!(this instanceof Color)) {
		return new Color(obj);
	}

	this.valid = false;
	this.values = {
		rgb: [0, 0, 0],
		hsl: [0, 0, 0],
		hsv: [0, 0, 0],
		hwb: [0, 0, 0],
		cmyk: [0, 0, 0, 0],
		alpha: 1
	};

	// parse Color() argument
	var vals;
	if (typeof obj === 'string') {
		vals = string.getRgba(obj);
		if (vals) {
			this.setValues('rgb', vals);
		} else if (vals = string.getHsla(obj)) {
			this.setValues('hsl', vals);
		} else if (vals = string.getHwb(obj)) {
			this.setValues('hwb', vals);
		}
	} else if (typeof obj === 'object') {
		vals = obj;
		if (vals.r !== undefined || vals.red !== undefined) {
			this.setValues('rgb', vals);
		} else if (vals.l !== undefined || vals.lightness !== undefined) {
			this.setValues('hsl', vals);
		} else if (vals.v !== undefined || vals.value !== undefined) {
			this.setValues('hsv', vals);
		} else if (vals.w !== undefined || vals.whiteness !== undefined) {
			this.setValues('hwb', vals);
		} else if (vals.c !== undefined || vals.cyan !== undefined) {
			this.setValues('cmyk', vals);
		}
	}
};

Color.prototype = {
	isValid: function () {
		return this.valid;
	},
	rgb: function () {
		return this.setSpace('rgb', arguments);
	},
	hsl: function () {
		return this.setSpace('hsl', arguments);
	},
	hsv: function () {
		return this.setSpace('hsv', arguments);
	},
	hwb: function () {
		return this.setSpace('hwb', arguments);
	},
	cmyk: function () {
		return this.setSpace('cmyk', arguments);
	},

	rgbArray: function () {
		return this.values.rgb;
	},
	hslArray: function () {
		return this.values.hsl;
	},
	hsvArray: function () {
		return this.values.hsv;
	},
	hwbArray: function () {
		var values = this.values;
		if (values.alpha !== 1) {
			return values.hwb.concat([values.alpha]);
		}
		return values.hwb;
	},
	cmykArray: function () {
		return this.values.cmyk;
	},
	rgbaArray: function () {
		var values = this.values;
		return values.rgb.concat([values.alpha]);
	},
	hslaArray: function () {
		var values = this.values;
		return values.hsl.concat([values.alpha]);
	},
	alpha: function (val) {
		if (val === undefined) {
			return this.values.alpha;
		}
		this.setValues('alpha', val);
		return this;
	},

	red: function (val) {
		return this.setChannel('rgb', 0, val);
	},
	green: function (val) {
		return this.setChannel('rgb', 1, val);
	},
	blue: function (val) {
		return this.setChannel('rgb', 2, val);
	},
	hue: function (val) {
		if (val) {
			val %= 360;
			val = val < 0 ? 360 + val : val;
		}
		return this.setChannel('hsl', 0, val);
	},
	saturation: function (val) {
		return this.setChannel('hsl', 1, val);
	},
	lightness: function (val) {
		return this.setChannel('hsl', 2, val);
	},
	saturationv: function (val) {
		return this.setChannel('hsv', 1, val);
	},
	whiteness: function (val) {
		return this.setChannel('hwb', 1, val);
	},
	blackness: function (val) {
		return this.setChannel('hwb', 2, val);
	},
	value: function (val) {
		return this.setChannel('hsv', 2, val);
	},
	cyan: function (val) {
		return this.setChannel('cmyk', 0, val);
	},
	magenta: function (val) {
		return this.setChannel('cmyk', 1, val);
	},
	yellow: function (val) {
		return this.setChannel('cmyk', 2, val);
	},
	black: function (val) {
		return this.setChannel('cmyk', 3, val);
	},

	hexString: function () {
		return string.hexString(this.values.rgb);
	},
	rgbString: function () {
		return string.rgbString(this.values.rgb, this.values.alpha);
	},
	rgbaString: function () {
		return string.rgbaString(this.values.rgb, this.values.alpha);
	},
	percentString: function () {
		return string.percentString(this.values.rgb, this.values.alpha);
	},
	hslString: function () {
		return string.hslString(this.values.hsl, this.values.alpha);
	},
	hslaString: function () {
		return string.hslaString(this.values.hsl, this.values.alpha);
	},
	hwbString: function () {
		return string.hwbString(this.values.hwb, this.values.alpha);
	},
	keyword: function () {
		return string.keyword(this.values.rgb, this.values.alpha);
	},

	rgbNumber: function () {
		var rgb = this.values.rgb;
		return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.values.rgb;
		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}
		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();
		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}
		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	dark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.values.rgb;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	light: function () {
		return !this.dark();
	},

	negate: function () {
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = 255 - this.values.rgb[i];
		}
		this.setValues('rgb', rgb);
		return this;
	},

	lighten: function (ratio) {
		var hsl = this.values.hsl;
		hsl[2] += hsl[2] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	darken: function (ratio) {
		var hsl = this.values.hsl;
		hsl[2] -= hsl[2] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	saturate: function (ratio) {
		var hsl = this.values.hsl;
		hsl[1] += hsl[1] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	desaturate: function (ratio) {
		var hsl = this.values.hsl;
		hsl[1] -= hsl[1] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	whiten: function (ratio) {
		var hwb = this.values.hwb;
		hwb[1] += hwb[1] * ratio;
		this.setValues('hwb', hwb);
		return this;
	},

	blacken: function (ratio) {
		var hwb = this.values.hwb;
		hwb[2] += hwb[2] * ratio;
		this.setValues('hwb', hwb);
		return this;
	},

	greyscale: function () {
		var rgb = this.values.rgb;
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		this.setValues('rgb', [val, val, val]);
		return this;
	},

	clearer: function (ratio) {
		var alpha = this.values.alpha;
		this.setValues('alpha', alpha - (alpha * ratio));
		return this;
	},

	opaquer: function (ratio) {
		var alpha = this.values.alpha;
		this.setValues('alpha', alpha + (alpha * ratio));
		return this;
	},

	rotate: function (degrees) {
		var hsl = this.values.hsl;
		var hue = (hsl[0] + degrees) % 360;
		hsl[0] = hue < 0 ? 360 + hue : hue;
		this.setValues('hsl', hsl);
		return this;
	},

	/**
	 * Ported from sass implementation in C
	 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
	 */
	mix: function (mixinColor, weight) {
		var color1 = this;
		var color2 = mixinColor;
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return this
			.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue()
			)
			.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
	},

	toJSON: function () {
		return this.rgb();
	},

	clone: function () {
		// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
		// making the final build way to big to embed in Chart.js. So let's do it manually,
		// assuming that values to clone are 1 dimension arrays containing only numbers,
		// except 'alpha' which is a number.
		var result = new Color();
		var source = this.values;
		var target = result.values;
		var value, type;

		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				value = source[prop];
				type = ({}).toString.call(value);
				if (type === '[object Array]') {
					target[prop] = value.slice(0);
				} else if (type === '[object Number]') {
					target[prop] = value;
				} else {
					console.error('unexpected color value:', value);
				}
			}
		}

		return result;
	}
};

Color.prototype.spaces = {
	rgb: ['red', 'green', 'blue'],
	hsl: ['hue', 'saturation', 'lightness'],
	hsv: ['hue', 'saturation', 'value'],
	hwb: ['hue', 'whiteness', 'blackness'],
	cmyk: ['cyan', 'magenta', 'yellow', 'black']
};

Color.prototype.maxes = {
	rgb: [255, 255, 255],
	hsl: [360, 100, 100],
	hsv: [360, 100, 100],
	hwb: [360, 100, 100],
	cmyk: [100, 100, 100, 100]
};

Color.prototype.getValues = function (space) {
	var values = this.values;
	var vals = {};

	for (var i = 0; i < space.length; i++) {
		vals[space.charAt(i)] = values[space][i];
	}

	if (values.alpha !== 1) {
		vals.a = values.alpha;
	}

	// {r: 255, g: 255, b: 255, a: 0.4}
	return vals;
};

Color.prototype.setValues = function (space, vals) {
	var values = this.values;
	var spaces = this.spaces;
	var maxes = this.maxes;
	var alpha = 1;
	var i;

	this.valid = true;

	if (space === 'alpha') {
		alpha = vals;
	} else if (vals.length) {
		// [10, 10, 10]
		values[space] = vals.slice(0, space.length);
		alpha = vals[space.length];
	} else if (vals[space.charAt(0)] !== undefined) {
		// {r: 10, g: 10, b: 10}
		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[space.charAt(i)];
		}

		alpha = vals.a;
	} else if (vals[spaces[space][0]] !== undefined) {
		// {red: 10, green: 10, blue: 10}
		var chans = spaces[space];

		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[chans[i]];
		}

		alpha = vals.alpha;
	}

	values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));

	if (space === 'alpha') {
		return false;
	}

	var capped;

	// cap values of the space prior converting all values
	for (i = 0; i < space.length; i++) {
		capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
		values[space][i] = Math.round(capped);
	}

	// convert to all the other color spaces
	for (var sname in spaces) {
		if (sname !== space) {
			values[sname] = convert[space][sname](values[space]);
		}
	}

	return true;
};

Color.prototype.setSpace = function (space, args) {
	var vals = args[0];

	if (vals === undefined) {
		// color.rgb()
		return this.getValues(space);
	}

	// color.rgb(10, 10, 10)
	if (typeof vals === 'number') {
		vals = Array.prototype.slice.call(args);
	}

	this.setValues(space, vals);
	return this;
};

Color.prototype.setChannel = function (space, index, val) {
	var svalues = this.values[space];
	if (val === undefined) {
		// color.red()
		return svalues[index];
	} else if (val === svalues[index]) {
		// color.red(color.red())
		return this;
	}

	// color.red(100)
	svalues[index] = val;
	this.setValues(space, svalues);

	return this;
};

if (typeof window !== 'undefined') {
	window.Color = Color;
}

module.exports = Color;

},{"1":1,"4":4}],3:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],4:[function(require,module,exports){
var conversions = require(3);

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"3":3}],5:[function(require,module,exports){
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],6:[function(require,module,exports){
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

},{}],7:[function(require,module,exports){
/**
 * @namespace Chart
 */
var Chart = require(29)();

Chart.helpers = require(45);

// @todo dispatch these helpers into appropriated helpers/helpers.* file and write unit tests!
require(27)(Chart);

Chart.defaults = require(25);
Chart.Element = require(26);
Chart.elements = require(40);
Chart.Interaction = require(28);
Chart.platform = require(48);

require(31)(Chart);
require(22)(Chart);
require(23)(Chart);
require(24)(Chart);
require(30)(Chart);
require(33)(Chart);
require(32)(Chart);
require(35)(Chart);

require(54)(Chart);
require(52)(Chart);
require(53)(Chart);
require(55)(Chart);
require(56)(Chart);
require(57)(Chart);

// Controllers must be loaded after elements
// See Chart.core.datasetController.dataElementType
require(15)(Chart);
require(16)(Chart);
require(17)(Chart);
require(18)(Chart);
require(19)(Chart);
require(20)(Chart);
require(21)(Chart);

require(8)(Chart);
require(9)(Chart);
require(10)(Chart);
require(11)(Chart);
require(12)(Chart);
require(13)(Chart);
require(14)(Chart);

// Loading built-it plugins
var plugins = [];

plugins.push(
	require(49)(Chart),
	require(50)(Chart),
	require(51)(Chart)
);

Chart.plugins.register(plugins);

Chart.platform.initialize();

module.exports = Chart;
if (typeof window !== 'undefined') {
	window.Chart = Chart;
}

// DEPRECATIONS

/**
 * Provided for backward compatibility, use Chart.helpers.canvas instead.
 * @namespace Chart.canvasHelpers
 * @deprecated since version 2.6.0
 * @todo remove at version 3
 * @private
 */
Chart.canvasHelpers = Chart.helpers.canvas;

},{"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30,"31":31,"32":32,"33":33,"35":35,"40":40,"45":45,"48":48,"49":49,"50":50,"51":51,"52":52,"53":53,"54":54,"55":55,"56":56,"57":57,"8":8,"9":9}],8:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Bar = function(context, config) {
		config.type = 'bar';

		return new Chart(context, config);
	};

};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Bubble = function(context, config) {
		config.type = 'bubble';
		return new Chart(context, config);
	};

};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Doughnut = function(context, config) {
		config.type = 'doughnut';

		return new Chart(context, config);
	};

};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Line = function(context, config) {
		config.type = 'line';

		return new Chart(context, config);
	};

};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.PolarArea = function(context, config) {
		config.type = 'polarArea';

		return new Chart(context, config);
	};

};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Radar = function(context, config) {
		config.type = 'radar';

		return new Chart(context, config);
	};

};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {
	Chart.Scatter = function(context, config) {
		config.type = 'scatter';
		return new Chart(context, config);
	};
};

},{}],15:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('bar', {
	hover: {
		mode: 'label'
	},

	scales: {
		xAxes: [{
			type: 'category',

			// Specific to Bar Controller
			categoryPercentage: 0.8,
			barPercentage: 0.9,

			// offset settings
			offset: true,

			// grid line settings
			gridLines: {
				offsetGridLines: true
			}
		}],

		yAxes: [{
			type: 'linear'
		}]
	}
});

defaults._set('horizontalBar', {
	hover: {
		mode: 'index',
		axis: 'y'
	},

	scales: {
		xAxes: [{
			type: 'linear',
			position: 'bottom'
		}],

		yAxes: [{
			position: 'left',
			type: 'category',

			// Specific to Horizontal Bar Controller
			categoryPercentage: 0.8,
			barPercentage: 0.9,

			// offset settings
			offset: true,

			// grid line settings
			gridLines: {
				offsetGridLines: true
			}
		}]
	},

	elements: {
		rectangle: {
			borderSkipped: 'left'
		}
	},

	tooltips: {
		callbacks: {
			title: function(item, data) {
				// Pick first xLabel for now
				var title = '';

				if (item.length > 0) {
					if (item[0].yLabel) {
						title = item[0].yLabel;
					} else if (data.labels.length > 0 && item[0].index < data.labels.length) {
						title = data.labels[item[0].index];
					}
				}

				return title;
			},

			label: function(item, data) {
				var datasetLabel = data.datasets[item.datasetIndex].label || '';
				return datasetLabel + ': ' + item.xLabel;
			}
		},
		mode: 'index',
		axis: 'y'
	}
});

module.exports = function(Chart) {

	Chart.controllers.bar = Chart.DatasetController.extend({

		dataElementType: elements.Rectangle,

		initialize: function() {
			var me = this;
			var meta;

			Chart.DatasetController.prototype.initialize.apply(me, arguments);

			meta = me.getMeta();
			meta.stack = me.getDataset().stack;
			meta.bar = true;
		},

		update: function(reset) {
			var me = this;
			var rects = me.getMeta().data;
			var i, ilen;

			me._ruler = me.getRuler();

			for (i = 0, ilen = rects.length; i < ilen; ++i) {
				me.updateElement(rects[i], i, reset);
			}
		},

		updateElement: function(rectangle, index, reset) {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var dataset = me.getDataset();
			var custom = rectangle.custom || {};
			var rectangleOptions = chart.options.elements.rectangle;

			rectangle._xScale = me.getScaleForId(meta.xAxisID);
			rectangle._yScale = me.getScaleForId(meta.yAxisID);
			rectangle._datasetIndex = me.index;
			rectangle._index = index;

			rectangle._model = {
				datasetLabel: dataset.label,
				label: chart.data.labels[index],
				borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleOptions.borderSkipped,
				backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.valueAtIndexOrDefault(dataset.backgroundColor, index, rectangleOptions.backgroundColor),
				borderColor: custom.borderColor ? custom.borderColor : helpers.valueAtIndexOrDefault(dataset.borderColor, index, rectangleOptions.borderColor),
				borderWidth: custom.borderWidth ? custom.borderWidth : helpers.valueAtIndexOrDefault(dataset.borderWidth, index, rectangleOptions.borderWidth)
			};

			me.updateElementGeometry(rectangle, index, reset);

			rectangle.pivot();
		},

		/**
		 * @private
		 */
		updateElementGeometry: function(rectangle, index, reset) {
			var me = this;
			var model = rectangle._model;
			var vscale = me.getValueScale();
			var base = vscale.getBasePixel();
			var horizontal = vscale.isHorizontal();
			var ruler = me._ruler || me.getRuler();
			var vpixels = me.calculateBarValuePixels(me.index, index);
			var ipixels = me.calculateBarIndexPixels(me.index, index, ruler);

			model.horizontal = horizontal;
			model.base = reset ? base : vpixels.base;
			model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
			model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
			model.height = horizontal ? ipixels.size : undefined;
			model.width = horizontal ? undefined : ipixels.size;
		},

		/**
		 * @private
		 */
		getValueScaleId: function() {
			return this.getMeta().yAxisID;
		},

		/**
		 * @private
		 */
		getIndexScaleId: function() {
			return this.getMeta().xAxisID;
		},

		/**
		 * @private
		 */
		getValueScale: function() {
			return this.getScaleForId(this.getValueScaleId());
		},

		/**
		 * @private
		 */
		getIndexScale: function() {
			return this.getScaleForId(this.getIndexScaleId());
		},

		/**
		 * Returns the effective number of stacks based on groups and bar visibility.
		 * @private
		 */
		getStackCount: function(last) {
			var me = this;
			var chart = me.chart;
			var scale = me.getIndexScale();
			var stacked = scale.options.stacked;
			var ilen = last === undefined ? chart.data.datasets.length : last + 1;
			var stacks = [];
			var i, meta;

			for (i = 0; i < ilen; ++i) {
				meta = chart.getDatasetMeta(i);
				if (meta.bar && chart.isDatasetVisible(i) &&
					(stacked === false ||
					(stacked === true && stacks.indexOf(meta.stack) === -1) ||
					(stacked === undefined && (meta.stack === undefined || stacks.indexOf(meta.stack) === -1)))) {
					stacks.push(meta.stack);
				}
			}

			return stacks.length;
		},

		/**
		 * Returns the stack index for the given dataset based on groups and bar visibility.
		 * @private
		 */
		getStackIndex: function(datasetIndex) {
			return this.getStackCount(datasetIndex) - 1;
		},

		/**
		 * @private
		 */
		getRuler: function() {
			var me = this;
			var scale = me.getIndexScale();
			var stackCount = me.getStackCount();
			var datasetIndex = me.index;
			var pixels = [];
			var isHorizontal = scale.isHorizontal();
			var start = isHorizontal ? scale.left : scale.top;
			var end = start + (isHorizontal ? scale.width : scale.height);
			var i, ilen;

			for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
				pixels.push(scale.getPixelForValue(null, i, datasetIndex));
			}

			return {
				pixels: pixels,
				start: start,
				end: end,
				stackCount: stackCount,
				scale: scale
			};
		},

		/**
		 * Note: pixel values are not clamped to the scale area.
		 * @private
		 */
		calculateBarValuePixels: function(datasetIndex, index) {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var scale = me.getValueScale();
			var datasets = chart.data.datasets;
			var value = scale.getRightValue(datasets[datasetIndex].data[index]);
			var stacked = scale.options.stacked;
			var stack = meta.stack;
			var start = 0;
			var i, imeta, ivalue, base, head, size;

			if (stacked || (stacked === undefined && stack !== undefined)) {
				for (i = 0; i < datasetIndex; ++i) {
					imeta = chart.getDatasetMeta(i);

					if (imeta.bar &&
						imeta.stack === stack &&
						imeta.controller.getValueScaleId() === scale.id &&
						chart.isDatasetVisible(i)) {

						ivalue = scale.getRightValue(datasets[i].data[index]);
						if ((value < 0 && ivalue < 0) || (value >= 0 && ivalue > 0)) {
							start += ivalue;
						}
					}
				}
			}

			base = scale.getPixelForValue(start);
			head = scale.getPixelForValue(start + value);
			size = (head - base) / 2;

			return {
				size: size,
				base: base,
				head: head,
				center: head + size / 2
			};
		},

		/**
		 * @private
		 */
		calculateBarIndexPixels: function(datasetIndex, index, ruler) {
			var me = this;
			var options = ruler.scale.options;
			var stackIndex = me.getStackIndex(datasetIndex);
			var pixels = ruler.pixels;
			var base = pixels[index];
			var length = pixels.length;
			var start = ruler.start;
			var end = ruler.end;
			var leftSampleSize, rightSampleSize, leftCategorySize, rightCategorySize, fullBarSize, size;

			if (length === 1) {
				leftSampleSize = base > start ? base - start : end - base;
				rightSampleSize = base < end ? end - base : base - start;
			} else {
				if (index > 0) {
					leftSampleSize = (base - pixels[index - 1]) / 2;
					if (index === length - 1) {
						rightSampleSize = leftSampleSize;
					}
				}
				if (index < length - 1) {
					rightSampleSize = (pixels[index + 1] - base) / 2;
					if (index === 0) {
						leftSampleSize = rightSampleSize;
					}
				}
			}

			leftCategorySize = leftSampleSize * options.categoryPercentage;
			rightCategorySize = rightSampleSize * options.categoryPercentage;
			fullBarSize = (leftCategorySize + rightCategorySize) / ruler.stackCount;
			size = fullBarSize * options.barPercentage;

			size = Math.min(
				helpers.valueOrDefault(options.barThickness, size),
				helpers.valueOrDefault(options.maxBarThickness, Infinity));

			base -= leftCategorySize;
			base += fullBarSize * stackIndex;
			base += (fullBarSize - size) / 2;

			return {
				size: size,
				base: base,
				head: base + size,
				center: base + size / 2
			};
		},

		draw: function() {
			var me = this;
			var chart = me.chart;
			var scale = me.getValueScale();
			var rects = me.getMeta().data;
			var dataset = me.getDataset();
			var ilen = rects.length;
			var i = 0;

			helpers.canvas.clipArea(chart.ctx, chart.chartArea);

			for (; i < ilen; ++i) {
				if (!isNaN(scale.getRightValue(dataset.data[i]))) {
					rects[i].draw();
				}
			}

			helpers.canvas.unclipArea(chart.ctx);
		},

		setHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;
			var custom = rectangle.custom || {};
			var model = rectangle._model;

			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.valueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.valueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;
			var custom = rectangle.custom || {};
			var model = rectangle._model;
			var rectangleElementOptions = this.chart.options.elements.rectangle;

			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.valueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : helpers.valueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.valueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
		}
	});

	Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
		/**
		 * @private
		 */
		getValueScaleId: function() {
			return this.getMeta().xAxisID;
		},

		/**
		 * @private
		 */
		getIndexScaleId: function() {
			return this.getMeta().yAxisID;
		}
	});
};

},{"25":25,"40":40,"45":45}],16:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('bubble', {
	hover: {
		mode: 'single'
	},

	scales: {
		xAxes: [{
			type: 'linear', // bubble should probably use a linear scale by default
			position: 'bottom',
			id: 'x-axis-0' // need an ID so datasets can reference the scale
		}],
		yAxes: [{
			type: 'linear',
			position: 'left',
			id: 'y-axis-0'
		}]
	},

	tooltips: {
		callbacks: {
			title: function() {
				// Title doesn't make sense for scatter since we format the data as a point
				return '';
			},
			label: function(item, data) {
				var datasetLabel = data.datasets[item.datasetIndex].label || '';
				var dataPoint = data.datasets[item.datasetIndex].data[item.index];
				return datasetLabel + ': (' + item.xLabel + ', ' + item.yLabel + ', ' + dataPoint.r + ')';
			}
		}
	}
});


module.exports = function(Chart) {

	Chart.controllers.bubble = Chart.DatasetController.extend({
		/**
		 * @protected
		 */
		dataElementType: elements.Point,

		/**
		 * @protected
		 */
		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var points = meta.data;

			// Update Points
			helpers.each(points, function(point, index) {
				me.updateElement(point, index, reset);
			});
		},

		/**
		 * @protected
		 */
		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var custom = point.custom || {};
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);
			var options = me._resolveElementOptions(point, index);
			var data = me.getDataset().data[index];
			var dsIndex = me.index;

			var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex);
			var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex);

			point._xScale = xScale;
			point._yScale = yScale;
			point._options = options;
			point._datasetIndex = dsIndex;
			point._index = index;
			point._model = {
				backgroundColor: options.backgroundColor,
				borderColor: options.borderColor,
				borderWidth: options.borderWidth,
				hitRadius: options.hitRadius,
				pointStyle: options.pointStyle,
				radius: reset ? 0 : options.radius,
				skip: custom.skip || isNaN(x) || isNaN(y),
				x: x,
				y: y,
			};

			point.pivot();
		},

		/**
		 * @protected
		 */
		setHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;

			model.backgroundColor = helpers.valueOrDefault(options.hoverBackgroundColor, helpers.getHoverColor(options.backgroundColor));
			model.borderColor = helpers.valueOrDefault(options.hoverBorderColor, helpers.getHoverColor(options.borderColor));
			model.borderWidth = helpers.valueOrDefault(options.hoverBorderWidth, options.borderWidth);
			model.radius = options.radius + options.hoverRadius;
		},

		/**
		 * @protected
		 */
		removeHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;

			model.backgroundColor = options.backgroundColor;
			model.borderColor = options.borderColor;
			model.borderWidth = options.borderWidth;
			model.radius = options.radius;
		},

		/**
		 * @private
		 */
		_resolveElementOptions: function(point, index) {
			var me = this;
			var chart = me.chart;
			var datasets = chart.data.datasets;
			var dataset = datasets[me.index];
			var custom = point.custom || {};
			var options = chart.options.elements.point;
			var resolve = helpers.options.resolve;
			var data = dataset.data[index];
			var values = {};
			var i, ilen, key;

			// Scriptable options
			var context = {
				chart: chart,
				dataIndex: index,
				dataset: dataset,
				datasetIndex: me.index
			};

			var keys = [
				'backgroundColor',
				'borderColor',
				'borderWidth',
				'hoverBackgroundColor',
				'hoverBorderColor',
				'hoverBorderWidth',
				'hoverRadius',
				'hitRadius',
				'pointStyle'
			];

			for (i = 0, ilen = keys.length; i < ilen; ++i) {
				key = keys[i];
				values[key] = resolve([
					custom[key],
					dataset[key],
					options[key]
				], context, index);
			}

			// Custom radius resolution
			values.radius = resolve([
				custom.radius,
				data ? data.r : undefined,
				dataset.radius,
				options.radius
			], context, index);

			return values;
		}
	});
};

},{"25":25,"40":40,"45":45}],17:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('doughnut', {
	animation: {
		// Boolean - Whether we animate the rotation of the Doughnut
		animateRotate: true,
		// Boolean - Whether we animate scaling the Doughnut from the centre
		animateScale: false
	},
	hover: {
		mode: 'single'
	},
	legendCallback: function(chart) {
		var text = [];
		text.push('<ul class="' + chart.id + '-legend">');

		var data = chart.data;
		var datasets = data.datasets;
		var labels = data.labels;

		if (datasets.length) {
			for (var i = 0; i < datasets[0].data.length; ++i) {
				text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
				if (labels[i]) {
					text.push(labels[i]);
				}
				text.push('</li>');
			}
		}

		text.push('</ul>');
		return text.join('');
	},
	legend: {
		labels: {
			generateLabels: function(chart) {
				var data = chart.data;
				if (data.labels.length && data.datasets.length) {
					return data.labels.map(function(label, i) {
						var meta = chart.getDatasetMeta(0);
						var ds = data.datasets[0];
						var arc = meta.data[i];
						var custom = arc && arc.custom || {};
						var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
						var arcOpts = chart.options.elements.arc;
						var fill = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
						var stroke = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
						var bw = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

						return {
							text: label,
							fillStyle: fill,
							strokeStyle: stroke,
							lineWidth: bw,
							hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

							// Extra data used for toggling the correct item
							index: i
						};
					});
				}
				return [];
			}
		},

		onClick: function(e, legendItem) {
			var index = legendItem.index;
			var chart = this.chart;
			var i, ilen, meta;

			for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
				meta = chart.getDatasetMeta(i);
				// toggle visibility of index if exists
				if (meta.data[index]) {
					meta.data[index].hidden = !meta.data[index].hidden;
				}
			}

			chart.update();
		}
	},

	// The percentage of the chart that we cut out of the middle.
	cutoutPercentage: 50,

	// The rotation of the chart, where the first data arc begins.
	rotation: Math.PI * -0.5,

	// The total circumference of the chart.
	circumference: Math.PI * 2.0,

	// Need to override these to give a nice default
	tooltips: {
		callbacks: {
			title: function() {
				return '';
			},
			label: function(tooltipItem, data) {
				var dataLabel = data.labels[tooltipItem.index];
				var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

				if (helpers.isArray(dataLabel)) {
					// show value on first line of multiline label
					// need to clone because we are changing the value
					dataLabel = dataLabel.slice();
					dataLabel[0] += value;
				} else {
					dataLabel += value;
				}

				return dataLabel;
			}
		}
	}
});

defaults._set('pie', helpers.clone(defaults.doughnut));
defaults._set('pie', {
	cutoutPercentage: 0
});

module.exports = function(Chart) {

	Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({

		dataElementType: elements.Arc,

		linkScales: helpers.noop,

		// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
		getRingIndex: function(datasetIndex) {
			var ringIndex = 0;

			for (var j = 0; j < datasetIndex; ++j) {
				if (this.chart.isDatasetVisible(j)) {
					++ringIndex;
				}
			}

			return ringIndex;
		},

		update: function(reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var opts = chart.options;
			var arcOpts = opts.elements.arc;
			var availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth;
			var availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth;
			var minSize = Math.min(availableWidth, availableHeight);
			var offset = {x: 0, y: 0};
			var meta = me.getMeta();
			var cutoutPercentage = opts.cutoutPercentage;
			var circumference = opts.circumference;

			// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
			if (circumference < Math.PI * 2.0) {
				var startAngle = opts.rotation % (Math.PI * 2.0);
				startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
				var endAngle = startAngle + circumference;
				var start = {x: Math.cos(startAngle), y: Math.sin(startAngle)};
				var end = {x: Math.cos(endAngle), y: Math.sin(endAngle)};
				var contains0 = (startAngle <= 0 && endAngle >= 0) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
				var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
				var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
				var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
				var cutout = cutoutPercentage / 100.0;
				var min = {x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))};
				var max = {x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))};
				var size = {width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5};
				minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
				offset = {x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5};
			}

			chart.borderWidth = me.getMaxBorderWidth(meta.data);
			chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
			chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 0, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
			chart.offsetX = offset.x * chart.outerRadius;
			chart.offsetY = offset.y * chart.outerRadius;

			meta.total = me.calculateTotal();

			me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
			me.innerRadius = Math.max(me.outerRadius - chart.radiusLength, 0);

			helpers.each(meta.data, function(arc, index) {
				me.updateElement(arc, index, reset);
			});
		},

		updateElement: function(arc, index, reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var opts = chart.options;
			var animationOpts = opts.animation;
			var centerX = (chartArea.left + chartArea.right) / 2;
			var centerY = (chartArea.top + chartArea.bottom) / 2;
			var startAngle = opts.rotation; // non reset case handled later
			var endAngle = opts.rotation; // non reset case handled later
			var dataset = me.getDataset();
			var circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI));
			var innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius;
			var outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius;
			var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;

			helpers.extend(arc, {
				// Utility
				_datasetIndex: me.index,
				_index: index,

				// Desired view properties
				_model: {
					x: centerX + chart.offsetX,
					y: centerY + chart.offsetY,
					startAngle: startAngle,
					endAngle: endAngle,
					circumference: circumference,
					outerRadius: outerRadius,
					innerRadius: innerRadius,
					label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
				}
			});

			var model = arc._model;
			// Resets the visual styles
			this.removeHoverStyle(arc);

			// Set correct angles if not resetting
			if (!reset || !animationOpts.animateRotate) {
				if (index === 0) {
					model.startAngle = opts.rotation;
				} else {
					model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
				}

				model.endAngle = model.startAngle + model.circumference;
			}

			arc.pivot();
		},

		removeHoverStyle: function(arc) {
			Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
		},

		calculateTotal: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var total = 0;
			var value;

			helpers.each(meta.data, function(element, index) {
				value = dataset.data[index];
				if (!isNaN(value) && !element.hidden) {
					total += Math.abs(value);
				}
			});

			/* if (total === 0) {
				total = NaN;
			}*/

			return total;
		},

		calculateCircumference: function(value) {
			var total = this.getMeta().total;
			if (total > 0 && !isNaN(value)) {
				return (Math.PI * 2.0) * (value / total);
			}
			return 0;
		},

		// gets the max border or hover width to properly scale pie charts
		getMaxBorderWidth: function(arcs) {
			var max = 0;
			var index = this.index;
			var length = arcs.length;
			var borderWidth;
			var hoverWidth;

			for (var i = 0; i < length; i++) {
				borderWidth = arcs[i]._model ? arcs[i]._model.borderWidth : 0;
				hoverWidth = arcs[i]._chart ? arcs[i]._chart.config.data.datasets[index].hoverBorderWidth : 0;

				max = borderWidth > max ? borderWidth : max;
				max = hoverWidth > max ? hoverWidth : max;
			}
			return max;
		}
	});
};

},{"25":25,"40":40,"45":45}],18:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('line', {
	showLines: true,
	spanGaps: false,

	hover: {
		mode: 'label'
	},

	scales: {
		xAxes: [{
			type: 'category',
			id: 'x-axis-0'
		}],
		yAxes: [{
			type: 'linear',
			id: 'y-axis-0'
		}]
	}
});

module.exports = function(Chart) {

	function lineEnabled(dataset, options) {
		return helpers.valueOrDefault(dataset.showLine, options.showLines);
	}

	Chart.controllers.line = Chart.DatasetController.extend({

		datasetElementType: elements.Line,

		dataElementType: elements.Point,

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var line = meta.dataset;
			var points = meta.data || [];
			var options = me.chart.options;
			var lineElementOptions = options.elements.line;
			var scale = me.getScaleForId(meta.yAxisID);
			var i, ilen, custom;
			var dataset = me.getDataset();
			var showLine = lineEnabled(dataset, options);

			// Update Line
			if (showLine) {
				custom = line.custom || {};

				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
					dataset.lineTension = dataset.tension;
				}

				// Utility
				line._scale = scale;
				line._datasetIndex = me.index;
				// Data
				line._children = points;
				// Model
				line._model = {
					// Appearance
					// The default behavior of lines is to break at null values, according
					// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
					// This option gives lines the ability to span gaps
					spanGaps: dataset.spanGaps ? dataset.spanGaps : options.spanGaps,
					tension: custom.tension ? custom.tension : helpers.valueOrDefault(dataset.lineTension, lineElementOptions.tension),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
					borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
					borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
					borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
					borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
					borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
					fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
					steppedLine: custom.steppedLine ? custom.steppedLine : helpers.valueOrDefault(dataset.steppedLine, lineElementOptions.stepped),
					cubicInterpolationMode: custom.cubicInterpolationMode ? custom.cubicInterpolationMode : helpers.valueOrDefault(dataset.cubicInterpolationMode, lineElementOptions.cubicInterpolationMode),
				};

				line.pivot();
			}

			// Update Points
			for (i = 0, ilen = points.length; i < ilen; ++i) {
				me.updateElement(points[i], i, reset);
			}

			if (showLine && line._model.tension !== 0) {
				me.updateBezierControlPoints();
			}

			// Now pivot the point for animation
			for (i = 0, ilen = points.length; i < ilen; ++i) {
				points[i].pivot();
			}
		},

		getPointBackgroundColor: function(point, index) {
			var backgroundColor = this.chart.options.elements.point.backgroundColor;
			var dataset = this.getDataset();
			var custom = point.custom || {};

			if (custom.backgroundColor) {
				backgroundColor = custom.backgroundColor;
			} else if (dataset.pointBackgroundColor) {
				backgroundColor = helpers.valueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
			} else if (dataset.backgroundColor) {
				backgroundColor = dataset.backgroundColor;
			}

			return backgroundColor;
		},

		getPointBorderColor: function(point, index) {
			var borderColor = this.chart.options.elements.point.borderColor;
			var dataset = this.getDataset();
			var custom = point.custom || {};

			if (custom.borderColor) {
				borderColor = custom.borderColor;
			} else if (dataset.pointBorderColor) {
				borderColor = helpers.valueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
			} else if (dataset.borderColor) {
				borderColor = dataset.borderColor;
			}

			return borderColor;
		},

		getPointBorderWidth: function(point, index) {
			var borderWidth = this.chart.options.elements.point.borderWidth;
			var dataset = this.getDataset();
			var custom = point.custom || {};

			if (!isNaN(custom.borderWidth)) {
				borderWidth = custom.borderWidth;
			} else if (!isNaN(dataset.pointBorderWidth) || helpers.isArray(dataset.pointBorderWidth)) {
				borderWidth = helpers.valueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
			} else if (!isNaN(dataset.borderWidth)) {
				borderWidth = dataset.borderWidth;
			}

			return borderWidth;
		},

		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var custom = point.custom || {};
			var dataset = me.getDataset();
			var datasetIndex = me.index;
			var value = dataset.data[index];
			var yScale = me.getScaleForId(meta.yAxisID);
			var xScale = me.getScaleForId(meta.xAxisID);
			var pointOptions = me.chart.options.elements.point;
			var x, y;

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
				dataset.pointRadius = dataset.radius;
			}
			if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
				dataset.pointHitRadius = dataset.hitRadius;
			}

			x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex);
			y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);

			// Utility
			point._xScale = xScale;
			point._yScale = yScale;
			point._datasetIndex = datasetIndex;
			point._index = index;

			// Desired view properties
			point._model = {
				x: x,
				y: y,
				skip: custom.skip || isNaN(x) || isNaN(y),
				// Appearance
				radius: custom.radius || helpers.valueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
				pointStyle: custom.pointStyle || helpers.valueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
				backgroundColor: me.getPointBackgroundColor(point, index),
				borderColor: me.getPointBorderColor(point, index),
				borderWidth: me.getPointBorderWidth(point, index),
				tension: meta.dataset._model ? meta.dataset._model.tension : 0,
				steppedLine: meta.dataset._model ? meta.dataset._model.steppedLine : false,
				// Tooltip
				hitRadius: custom.hitRadius || helpers.valueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
			};
		},

		calculatePointY: function(value, index, datasetIndex) {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var yScale = me.getScaleForId(meta.yAxisID);
			var sumPos = 0;
			var sumNeg = 0;
			var i, ds, dsMeta;

			if (yScale.options.stacked) {
				for (i = 0; i < datasetIndex; i++) {
					ds = chart.data.datasets[i];
					dsMeta = chart.getDatasetMeta(i);
					if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
						var stackedRightValue = Number(yScale.getRightValue(ds.data[index]));
						if (stackedRightValue < 0) {
							sumNeg += stackedRightValue || 0;
						} else {
							sumPos += stackedRightValue || 0;
						}
					}
				}

				var rightValue = Number(yScale.getRightValue(value));
				if (rightValue < 0) {
					return yScale.getPixelForValue(sumNeg + rightValue);
				}
				return yScale.getPixelForValue(sumPos + rightValue);
			}

			return yScale.getPixelForValue(value);
		},

		updateBezierControlPoints: function() {
			var me = this;
			var meta = me.getMeta();
			var area = me.chart.chartArea;
			var points = (meta.data || []);
			var i, ilen, point, model, controlPoints;

			// Only consider points that are drawn in case the spanGaps option is used
			if (meta.dataset._model.spanGaps) {
				points = points.filter(function(pt) {
					return !pt._model.skip;
				});
			}

			function capControlPoint(pt, min, max) {
				return Math.max(Math.min(pt, max), min);
			}

			if (meta.dataset._model.cubicInterpolationMode === 'monotone') {
				helpers.splineCurveMonotone(points);
			} else {
				for (i = 0, ilen = points.length; i < ilen; ++i) {
					point = points[i];
					model = point._model;
					controlPoints = helpers.splineCurve(
						helpers.previousItem(points, i)._model,
						model,
						helpers.nextItem(points, i)._model,
						meta.dataset._model.tension
					);
					model.controlPointPreviousX = controlPoints.previous.x;
					model.controlPointPreviousY = controlPoints.previous.y;
					model.controlPointNextX = controlPoints.next.x;
					model.controlPointNextY = controlPoints.next.y;
				}
			}

			if (me.chart.options.elements.line.capBezierPoints) {
				for (i = 0, ilen = points.length; i < ilen; ++i) {
					model = points[i]._model;
					model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
					model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
					model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
					model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
				}
			}
		},

		draw: function() {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var points = meta.data || [];
			var area = chart.chartArea;
			var ilen = points.length;
			var i = 0;

			helpers.canvas.clipArea(chart.ctx, area);

			if (lineEnabled(me.getDataset(), chart.options)) {
				meta.dataset.draw();
			}

			helpers.canvas.unclipArea(chart.ctx);

			// Draw the points
			for (; i < ilen; ++i) {
				points[i].draw(area);
			}
		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;

			model.radius = custom.hoverRadius || helpers.valueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
			model.backgroundColor = custom.hoverBackgroundColor || helpers.valueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor || helpers.valueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth || helpers.valueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var me = this;
			var dataset = me.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
				dataset.pointRadius = dataset.radius;
			}

			model.radius = custom.radius || helpers.valueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
			model.backgroundColor = me.getPointBackgroundColor(point, index);
			model.borderColor = me.getPointBorderColor(point, index);
			model.borderWidth = me.getPointBorderWidth(point, index);
		}
	});
};

},{"25":25,"40":40,"45":45}],19:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('polarArea', {
	scale: {
		type: 'radialLinear',
		angleLines: {
			display: false
		},
		gridLines: {
			circular: true
		},
		pointLabels: {
			display: false
		},
		ticks: {
			beginAtZero: true
		}
	},

	// Boolean - Whether to animate the rotation of the chart
	animation: {
		animateRotate: true,
		animateScale: true
	},

	startAngle: -0.5 * Math.PI,
	legendCallback: function(chart) {
		var text = [];
		text.push('<ul class="' + chart.id + '-legend">');

		var data = chart.data;
		var datasets = data.datasets;
		var labels = data.labels;

		if (datasets.length) {
			for (var i = 0; i < datasets[0].data.length; ++i) {
				text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
				if (labels[i]) {
					text.push(labels[i]);
				}
				text.push('</li>');
			}
		}

		text.push('</ul>');
		return text.join('');
	},
	legend: {
		labels: {
			generateLabels: function(chart) {
				var data = chart.data;
				if (data.labels.length && data.datasets.length) {
					return data.labels.map(function(label, i) {
						var meta = chart.getDatasetMeta(0);
						var ds = data.datasets[0];
						var arc = meta.data[i];
						var custom = arc.custom || {};
						var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
						var arcOpts = chart.options.elements.arc;
						var fill = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
						var stroke = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
						var bw = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

						return {
							text: label,
							fillStyle: fill,
							strokeStyle: stroke,
							lineWidth: bw,
							hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

							// Extra data used for toggling the correct item
							index: i
						};
					});
				}
				return [];
			}
		},

		onClick: function(e, legendItem) {
			var index = legendItem.index;
			var chart = this.chart;
			var i, ilen, meta;

			for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
				meta = chart.getDatasetMeta(i);
				meta.data[index].hidden = !meta.data[index].hidden;
			}

			chart.update();
		}
	},

	// Need to override these to give a nice default
	tooltips: {
		callbacks: {
			title: function() {
				return '';
			},
			label: function(item, data) {
				return data.labels[item.index] + ': ' + item.yLabel;
			}
		}
	}
});

module.exports = function(Chart) {

	Chart.controllers.polarArea = Chart.DatasetController.extend({

		dataElementType: elements.Arc,

		linkScales: helpers.noop,

		update: function(reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var meta = me.getMeta();
			var opts = chart.options;
			var arcOpts = opts.elements.arc;
			var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
			chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();

			me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
			me.innerRadius = me.outerRadius - chart.radiusLength;

			meta.count = me.countVisibleElements();

			helpers.each(meta.data, function(arc, index) {
				me.updateElement(arc, index, reset);
			});
		},

		updateElement: function(arc, index, reset) {
			var me = this;
			var chart = me.chart;
			var dataset = me.getDataset();
			var opts = chart.options;
			var animationOpts = opts.animation;
			var scale = chart.scale;
			var labels = chart.data.labels;

			var circumference = me.calculateCircumference(dataset.data[index]);
			var centerX = scale.xCenter;
			var centerY = scale.yCenter;

			// If there is NaN data before us, we need to calculate the starting angle correctly.
			// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
			var visibleCount = 0;
			var meta = me.getMeta();
			for (var i = 0; i < index; ++i) {
				if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
					++visibleCount;
				}
			}

			// var negHalfPI = -0.5 * Math.PI;
			var datasetStartAngle = opts.startAngle;
			var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
			var startAngle = datasetStartAngle + (circumference * visibleCount);
			var endAngle = startAngle + (arc.hidden ? 0 : circumference);

			var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);

			helpers.extend(arc, {
				// Utility
				_datasetIndex: me.index,
				_index: index,
				_scale: scale,

				// Desired view properties
				_model: {
					x: centerX,
					y: centerY,
					innerRadius: 0,
					outerRadius: reset ? resetRadius : distance,
					startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
					endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
					label: helpers.valueAtIndexOrDefault(labels, index, labels[index])
				}
			});

			// Apply border and fill style
			me.removeHoverStyle(arc);

			arc.pivot();
		},

		removeHoverStyle: function(arc) {
			Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
		},

		countVisibleElements: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var count = 0;

			helpers.each(meta.data, function(element, index) {
				if (!isNaN(dataset.data[index]) && !element.hidden) {
					count++;
				}
			});

			return count;
		},

		calculateCircumference: function(value) {
			var count = this.getMeta().count;
			if (count > 0 && !isNaN(value)) {
				return (2 * Math.PI) / count;
			}
			return 0;
		}
	});
};

},{"25":25,"40":40,"45":45}],20:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('radar', {
	scale: {
		type: 'radialLinear'
	},
	elements: {
		line: {
			tension: 0 // no bezier in radar
		}
	}
});

module.exports = function(Chart) {

	Chart.controllers.radar = Chart.DatasetController.extend({

		datasetElementType: elements.Line,

		dataElementType: elements.Point,

		linkScales: helpers.noop,

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var line = meta.dataset;
			var points = meta.data;
			var custom = line.custom || {};
			var dataset = me.getDataset();
			var lineElementOptions = me.chart.options.elements.line;
			var scale = me.chart.scale;

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
				dataset.lineTension = dataset.tension;
			}

			helpers.extend(meta.dataset, {
				// Utility
				_datasetIndex: me.index,
				_scale: scale,
				// Data
				_children: points,
				_loop: true,
				// Model
				_model: {
					// Appearance
					tension: custom.tension ? custom.tension : helpers.valueOrDefault(dataset.lineTension, lineElementOptions.tension),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
					borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
					fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
					borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
					borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
					borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
					borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
				}
			});

			meta.dataset.pivot();

			// Update Points
			helpers.each(points, function(point, index) {
				me.updateElement(point, index, reset);
			}, me);

			// Update bezier control points
			me.updateBezierControlPoints();
		},
		updateElement: function(point, index, reset) {
			var me = this;
			var custom = point.custom || {};
			var dataset = me.getDataset();
			var scale = me.chart.scale;
			var pointElementOptions = me.chart.options.elements.point;
			var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);

			// Compatibility: If the properties are defined with only the old name, use those values
			if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
				dataset.pointRadius = dataset.radius;
			}
			if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
				dataset.pointHitRadius = dataset.hitRadius;
			}

			helpers.extend(point, {
				// Utility
				_datasetIndex: me.index,
				_index: index,
				_scale: scale,

				// Desired view properties
				_model: {
					x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
					y: reset ? scale.yCenter : pointPosition.y,

					// Appearance
					tension: custom.tension ? custom.tension : helpers.valueOrDefault(dataset.lineTension, me.chart.options.elements.line.tension),
					radius: custom.radius ? custom.radius : helpers.valueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.valueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
					borderColor: custom.borderColor ? custom.borderColor : helpers.valueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : helpers.valueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
					pointStyle: custom.pointStyle ? custom.pointStyle : helpers.valueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),

					// Tooltip
					hitRadius: custom.hitRadius ? custom.hitRadius : helpers.valueAtIndexOrDefault(dataset.pointHitRadius, index, pointElementOptions.hitRadius)
				}
			});

			point._model.skip = custom.skip ? custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
		},
		updateBezierControlPoints: function() {
			var chartArea = this.chart.chartArea;
			var meta = this.getMeta();

			helpers.each(meta.data, function(point, index) {
				var model = point._model;
				var controlPoints = helpers.splineCurve(
					helpers.previousItem(meta.data, index, true)._model,
					model,
					helpers.nextItem(meta.data, index, true)._model,
					model.tension
				);

				// Prevent the bezier going outside of the bounds of the graph
				model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
				model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);

				model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
				model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);

				// Now pivot the point for animation
				point.pivot();
			});
		},

		setHoverStyle: function(point) {
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var custom = point.custom || {};
			var index = point._index;
			var model = point._model;

			model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.valueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.valueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.valueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.valueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var custom = point.custom || {};
			var index = point._index;
			var model = point._model;
			var pointElementOptions = this.chart.options.elements.point;

			model.radius = custom.radius ? custom.radius : helpers.valueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius);
			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.valueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : helpers.valueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.valueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
		}
	});
};

},{"25":25,"40":40,"45":45}],21:[function(require,module,exports){
'use strict';

var defaults = require(25);

defaults._set('scatter', {
	hover: {
		mode: 'single'
	},

	scales: {
		xAxes: [{
			id: 'x-axis-1',    // need an ID so datasets can reference the scale
			type: 'linear',    // scatter should not use a category axis
			position: 'bottom'
		}],
		yAxes: [{
			id: 'y-axis-1',
			type: 'linear',
			position: 'left'
		}]
	},

	showLines: false,

	tooltips: {
		callbacks: {
			title: function() {
				return '';     // doesn't make sense for scatter since data are formatted as a point
			},
			label: function(item) {
				return '(' + item.xLabel + ', ' + item.yLabel + ')';
			}
		}
	}
});

module.exports = function(Chart) {

	// Scatter charts use line controllers
	Chart.controllers.scatter = Chart.controllers.line;

};

},{"25":25}],22:[function(require,module,exports){
/* global window: false */
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

defaults._set('global', {
	animation: {
		duration: 1000,
		easing: 'easeOutQuart',
		onProgress: helpers.noop,
		onComplete: helpers.noop
	}
});

module.exports = function(Chart) {

	Chart.Animation = Element.extend({
		chart: null, // the animation associated chart instance
		currentStep: 0, // the current animation step
		numSteps: 60, // default number of steps
		easing: '', // the easing to use for this animation
		render: null, // render function used by the animation service

		onAnimationProgress: null, // user specified callback to fire on each step of the animation
		onAnimationComplete: null, // user specified callback to fire when the animation finishes
	});

	Chart.animationService = {
		frameDuration: 17,
		animations: [],
		dropFrames: 0,
		request: null,

		/**
		 * @param {Chart} chart - The chart to animate.
		 * @param {Chart.Animation} animation - The animation that we will animate.
		 * @param {Number} duration - The animation duration in ms.
		 * @param {Boolean} lazy - if true, the chart is not marked as animating to enable more responsive interactions
		 */
		addAnimation: function(chart, animation, duration, lazy) {
			var animations = this.animations;
			var i, ilen;

			animation.chart = chart;

			if (!lazy) {
				chart.animating = true;
			}

			for (i = 0, ilen = animations.length; i < ilen; ++i) {
				if (animations[i].chart === chart) {
					animations[i] = animation;
					return;
				}
			}

			animations.push(animation);

			// If there are no animations queued, manually kickstart a digest, for lack of a better word
			if (animations.length === 1) {
				this.requestAnimationFrame();
			}
		},

		cancelAnimation: function(chart) {
			var index = helpers.findIndex(this.animations, function(animation) {
				return animation.chart === chart;
			});

			if (index !== -1) {
				this.animations.splice(index, 1);
				chart.animating = false;
			}
		},

		requestAnimationFrame: function() {
			var me = this;
			if (me.request === null) {
				// Skip animation frame requests until the active one is executed.
				// This can happen when processing mouse events, e.g. 'mousemove'
				// and 'mouseout' events will trigger multiple renders.
				me.request = helpers.requestAnimFrame.call(window, function() {
					me.request = null;
					me.startDigest();
				});
			}
		},

		/**
		 * @private
		 */
		startDigest: function() {
			var me = this;
			var startTime = Date.now();
			var framesToDrop = 0;

			if (me.dropFrames > 1) {
				framesToDrop = Math.floor(me.dropFrames);
				me.dropFrames = me.dropFrames % 1;
			}

			me.advance(1 + framesToDrop);

			var endTime = Date.now();

			me.dropFrames += (endTime - startTime) / me.frameDuration;

			// Do we have more stuff to animate?
			if (me.animations.length > 0) {
				me.requestAnimationFrame();
			}
		},

		/**
		 * @private
		 */
		advance: function(count) {
			var animations = this.animations;
			var animation, chart;
			var i = 0;

			while (i < animations.length) {
				animation = animations[i];
				chart = animation.chart;

				animation.currentStep = (animation.currentStep || 0) + count;
				animation.currentStep = Math.min(animation.currentStep, animation.numSteps);

				helpers.callback(animation.render, [chart, animation], chart);
				helpers.callback(animation.onAnimationProgress, [animation], chart);

				if (animation.currentStep >= animation.numSteps) {
					helpers.callback(animation.onAnimationComplete, [animation], chart);
					chart.animating = false;
					animations.splice(i, 1);
				} else {
					++i;
				}
			}
		}
	};

	/**
	 * Provided for backward compatibility, use Chart.Animation instead
	 * @prop Chart.Animation#animationObject
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 */
	Object.defineProperty(Chart.Animation.prototype, 'animationObject', {
		get: function() {
			return this;
		}
	});

	/**
	 * Provided for backward compatibility, use Chart.Animation#chart instead
	 * @prop Chart.Animation#chartInstance
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 */
	Object.defineProperty(Chart.Animation.prototype, 'chartInstance', {
		get: function() {
			return this.chart;
		},
		set: function(value) {
			this.chart = value;
		}
	});

};

},{"25":25,"26":26,"45":45}],23:[function(require,module,exports){
'use strict';

var defaults = require(25);
var helpers = require(45);
var Interaction = require(28);
var platform = require(48);

module.exports = function(Chart) {
	var plugins = Chart.plugins;

	// Create a dictionary of chart types, to allow for extension of existing types
	Chart.types = {};

	// Store a reference to each instance - allowing us to globally resize chart instances on window resize.
	// Destroy method on the chart will remove the instance of the chart from this reference.
	Chart.instances = {};

	// Controllers available for dataset visualization eg. bar, line, slice, etc.
	Chart.controllers = {};

	/**
	 * Initializes the given config with global and chart default values.
	 */
	function initConfig(config) {
		config = config || {};

		// Do NOT use configMerge() for the data object because this method merges arrays
		// and so would change references to labels and datasets, preventing data updates.
		var data = config.data = config.data || {};
		data.datasets = data.datasets || [];
		data.labels = data.labels || [];

		config.options = helpers.configMerge(
			defaults.global,
			defaults[config.type],
			config.options || {});

		return config;
	}

	/**
	 * Updates the config of the chart
	 * @param chart {Chart} chart to update the options for
	 */
	function updateConfig(chart) {
		var newOptions = chart.options;

		// Update Scale(s) with options
		if (newOptions.scale) {
			chart.scale.options = newOptions.scale;
		} else if (newOptions.scales) {
			newOptions.scales.xAxes.concat(newOptions.scales.yAxes).forEach(function(scaleOptions) {
				chart.scales[scaleOptions.id].options = scaleOptions;
			});
		}

		// Tooltip
		chart.tooltip._options = newOptions.tooltips;
	}

	function positionIsHorizontal(position) {
		return position === 'top' || position === 'bottom';
	}

	helpers.extend(Chart.prototype, /** @lends Chart */ {
		/**
		 * @private
		 */
		construct: function(item, config) {
			var me = this;

			config = initConfig(config);

			var context = platform.acquireContext(item, config);
			var canvas = context && context.canvas;
			var height = canvas && canvas.height;
			var width = canvas && canvas.width;

			me.id = helpers.uid();
			me.ctx = context;
			me.canvas = canvas;
			me.config = config;
			me.width = width;
			me.height = height;
			me.aspectRatio = height ? width / height : null;
			me.options = config.options;
			me._bufferedRender = false;

			/**
			 * Provided for backward compatibility, Chart and Chart.Controller have been merged,
			 * the "instance" still need to be defined since it might be called from plugins.
			 * @prop Chart#chart
			 * @deprecated since version 2.6.0
			 * @todo remove at version 3
			 * @private
			 */
			me.chart = me;
			me.controller = me; // chart.chart.controller #inception

			// Add the chart instance to the global namespace
			Chart.instances[me.id] = me;

			// Define alias to the config data: `chart.data === chart.config.data`
			Object.defineProperty(me, 'data', {
				get: function() {
					return me.config.data;
				},
				set: function(value) {
					me.config.data = value;
				}
			});

			if (!context || !canvas) {
				// The given item is not a compatible context2d element, let's return before finalizing
				// the chart initialization but after setting basic chart / controller properties that
				// can help to figure out that the chart is not valid (e.g chart.canvas !== null);
				// https://github.com/chartjs/Chart.js/issues/2807
				console.error("Failed to create chart: can't acquire context from the given item");
				return;
			}

			me.initialize();
			me.update();
		},

		/**
		 * @private
		 */
		initialize: function() {
			var me = this;

			// Before init plugin notification
			plugins.notify(me, 'beforeInit');

			helpers.retinaScale(me, me.options.devicePixelRatio);

			me.bindEvents();

			if (me.options.responsive) {
				// Initial resize before chart draws (must be silent to preserve initial animations).
				me.resize(true);
			}

			// Make sure scales have IDs and are built before we build any controllers.
			me.ensureScalesHaveIDs();
			me.buildScales();
			me.initToolTip();

			// After init plugin notification
			plugins.notify(me, 'afterInit');

			return me;
		},

		clear: function() {
			helpers.canvas.clear(this);
			return this;
		},

		stop: function() {
			// Stops any current animation loop occurring
			Chart.animationService.cancelAnimation(this);
			return this;
		},

		resize: function(silent) {
			var me = this;
			var options = me.options;
			var canvas = me.canvas;
			var aspectRatio = (options.maintainAspectRatio && me.aspectRatio) || null;

			// the canvas render width and height will be casted to integers so make sure that
			// the canvas display style uses the same integer values to avoid blurring effect.

			// Set to 0 instead of canvas.size because the size defaults to 300x150 if the element is collased
			var newWidth = Math.max(0, Math.floor(helpers.getMaximumWidth(canvas)));
			var newHeight = Math.max(0, Math.floor(aspectRatio ? newWidth / aspectRatio : helpers.getMaximumHeight(canvas)));

			if (me.width === newWidth && me.height === newHeight) {
				return;
			}

			canvas.width = me.width = newWidth;
			canvas.height = me.height = newHeight;
			canvas.style.width = newWidth + 'px';
			canvas.style.height = newHeight + 'px';

			helpers.retinaScale(me, options.devicePixelRatio);

			if (!silent) {
				// Notify any plugins about the resize
				var newSize = {width: newWidth, height: newHeight};
				plugins.notify(me, 'resize', [newSize]);

				// Notify of resize
				if (me.options.onResize) {
					me.options.onResize(me, newSize);
				}

				me.stop();
				me.update(me.options.responsiveAnimationDuration);
			}
		},

		ensureScalesHaveIDs: function() {
			var options = this.options;
			var scalesOptions = options.scales || {};
			var scaleOptions = options.scale;

			helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
				xAxisOptions.id = xAxisOptions.id || ('x-axis-' + index);
			});

			helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
				yAxisOptions.id = yAxisOptions.id || ('y-axis-' + index);
			});

			if (scaleOptions) {
				scaleOptions.id = scaleOptions.id || 'scale';
			}
		},

		/**
		 * Builds a map of scale ID to scale object for future lookup.
		 */
		buildScales: function() {
			var me = this;
			var options = me.options;
			var scales = me.scales = {};
			var items = [];

			if (options.scales) {
				items = items.concat(
					(options.scales.xAxes || []).map(function(xAxisOptions) {
						return {options: xAxisOptions, dtype: 'category', dposition: 'bottom'};
					}),
					(options.scales.yAxes || []).map(function(yAxisOptions) {
						return {options: yAxisOptions, dtype: 'linear', dposition: 'left'};
					})
				);
			}

			if (options.scale) {
				items.push({
					options: options.scale,
					dtype: 'radialLinear',
					isDefault: true,
					dposition: 'chartArea'
				});
			}

			helpers.each(items, function(item) {
				var scaleOptions = item.options;
				var scaleType = helpers.valueOrDefault(scaleOptions.type, item.dtype);
				var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
				if (!scaleClass) {
					return;
				}

				if (positionIsHorizontal(scaleOptions.position) !== positionIsHorizontal(item.dposition)) {
					scaleOptions.position = item.dposition;
				}

				var scale = new scaleClass({
					id: scaleOptions.id,
					options: scaleOptions,
					ctx: me.ctx,
					chart: me
				});

				scales[scale.id] = scale;
				scale.mergeTicksOptions();

				// TODO(SB): I think we should be able to remove this custom case (options.scale)
				// and consider it as a regular scale part of the "scales"" map only! This would
				// make the logic easier and remove some useless? custom code.
				if (item.isDefault) {
					me.scale = scale;
				}
			});

			Chart.scaleService.addScalesToLayout(this);
		},

		buildOrUpdateControllers: function() {
			var me = this;
			var types = [];
			var newControllers = [];

			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				var meta = me.getDatasetMeta(datasetIndex);
				var type = dataset.type || me.config.type;

				if (meta.type && meta.type !== type) {
					me.destroyDatasetMeta(datasetIndex);
					meta = me.getDatasetMeta(datasetIndex);
				}
				meta.type = type;

				types.push(meta.type);

				if (meta.controller) {
					meta.controller.updateIndex(datasetIndex);
				} else {
					var ControllerClass = Chart.controllers[meta.type];
					if (ControllerClass === undefined) {
						throw new Error('"' + meta.type + '" is not a chart type.');
					}

					meta.controller = new ControllerClass(me, datasetIndex);
					newControllers.push(meta.controller);
				}
			}, me);

			return newControllers;
		},

		/**
		 * Reset the elements of all datasets
		 * @private
		 */
		resetElements: function() {
			var me = this;
			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				me.getDatasetMeta(datasetIndex).controller.reset();
			}, me);
		},

		/**
		* Resets the chart back to it's state before the initial animation
		*/
		reset: function() {
			this.resetElements();
			this.tooltip.initialize();
		},

		update: function(config) {
			var me = this;

			if (!config || typeof config !== 'object') {
				// backwards compatibility
				config = {
					duration: config,
					lazy: arguments[1]
				};
			}

			updateConfig(me);

			if (plugins.notify(me, 'beforeUpdate') === false) {
				return;
			}

			// In case the entire data object changed
			me.tooltip._data = me.data;

			// Make sure dataset controllers are updated and new controllers are reset
			var newControllers = me.buildOrUpdateControllers();

			// Make sure all dataset controllers have correct meta data counts
			helpers.each(me.data.datasets, function(dataset, datasetIndex) {
				me.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
			}, me);

			me.updateLayout();

			// Can only reset the new controllers after the scales have been updated
			helpers.each(newControllers, function(controller) {
				controller.reset();
			});

			me.updateDatasets();

			// Need to reset tooltip in case it is displayed with elements that are removed
			// after update.
			me.tooltip.initialize();

			// Last active contains items that were previously in the tooltip.
			// When we reset the tooltip, we need to clear it
			me.lastActive = [];

			// Do this before render so that any plugins that need final scale updates can use it
			plugins.notify(me, 'afterUpdate');

			if (me._bufferedRender) {
				me._bufferedRequest = {
					duration: config.duration,
					easing: config.easing,
					lazy: config.lazy
				};
			} else {
				me.render(config);
			}
		},

		/**
		 * Updates the chart layout unless a plugin returns `false` to the `beforeLayout`
		 * hook, in which case, plugins will not be called on `afterLayout`.
		 * @private
		 */
		updateLayout: function() {
			var me = this;

			if (plugins.notify(me, 'beforeLayout') === false) {
				return;
			}

			Chart.layoutService.update(this, this.width, this.height);

			/**
			 * Provided for backward compatibility, use `afterLayout` instead.
			 * @method IPlugin#afterScaleUpdate
			 * @deprecated since version 2.5.0
			 * @todo remove at version 3
			 * @private
			 */
			plugins.notify(me, 'afterScaleUpdate');
			plugins.notify(me, 'afterLayout');
		},

		/**
		 * Updates all datasets unless a plugin returns `false` to the `beforeDatasetsUpdate`
		 * hook, in which case, plugins will not be called on `afterDatasetsUpdate`.
		 * @private
		 */
		updateDatasets: function() {
			var me = this;

			if (plugins.notify(me, 'beforeDatasetsUpdate') === false) {
				return;
			}

			for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
				me.updateDataset(i);
			}

			plugins.notify(me, 'afterDatasetsUpdate');
		},

		/**
		 * Updates dataset at index unless a plugin returns `false` to the `beforeDatasetUpdate`
		 * hook, in which case, plugins will not be called on `afterDatasetUpdate`.
		 * @private
		 */
		updateDataset: function(index) {
			var me = this;
			var meta = me.getDatasetMeta(index);
			var args = {
				meta: meta,
				index: index
			};

			if (plugins.notify(me, 'beforeDatasetUpdate', [args]) === false) {
				return;
			}

			meta.controller.update();

			plugins.notify(me, 'afterDatasetUpdate', [args]);
		},

		render: function(config) {
			var me = this;

			if (!config || typeof config !== 'object') {
				// backwards compatibility
				config = {
					duration: config,
					lazy: arguments[1]
				};
			}

			var duration = config.duration;
			var lazy = config.lazy;

			if (plugins.notify(me, 'beforeRender') === false) {
				return;
			}

			var animationOptions = me.options.animation;
			var onComplete = function(animation) {
				plugins.notify(me, 'afterRender');
				helpers.callback(animationOptions && animationOptions.onComplete, [animation], me);
			};

			if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
				var animation = new Chart.Animation({
					numSteps: (duration || animationOptions.duration) / 16.66, // 60 fps
					easing: config.easing || animationOptions.easing,

					render: function(chart, animationObject) {
						var easingFunction = helpers.easing.effects[animationObject.easing];
						var currentStep = animationObject.currentStep;
						var stepDecimal = currentStep / animationObject.numSteps;

						chart.draw(easingFunction(stepDecimal), stepDecimal, currentStep);
					},

					onAnimationProgress: animationOptions.onProgress,
					onAnimationComplete: onComplete
				});

				Chart.animationService.addAnimation(me, animation, duration, lazy);
			} else {
				me.draw();

				// See https://github.com/chartjs/Chart.js/issues/3781
				onComplete(new Chart.Animation({numSteps: 0, chart: me}));
			}

			return me;
		},

		draw: function(easingValue) {
			var me = this;

			me.clear();

			if (helpers.isNullOrUndef(easingValue)) {
				easingValue = 1;
			}

			me.transition(easingValue);

			if (plugins.notify(me, 'beforeDraw', [easingValue]) === false) {
				return;
			}

			// Draw all the scales
			helpers.each(me.boxes, function(box) {
				box.draw(me.chartArea);
			}, me);

			if (me.scale) {
				me.scale.draw();
			}

			me.drawDatasets(easingValue);
			me._drawTooltip(easingValue);

			plugins.notify(me, 'afterDraw', [easingValue]);
		},

		/**
		 * @private
		 */
		transition: function(easingValue) {
			var me = this;

			for (var i = 0, ilen = (me.data.datasets || []).length; i < ilen; ++i) {
				if (me.isDatasetVisible(i)) {
					me.getDatasetMeta(i).controller.transition(easingValue);
				}
			}

			me.tooltip.transition(easingValue);
		},

		/**
		 * Draws all datasets unless a plugin returns `false` to the `beforeDatasetsDraw`
		 * hook, in which case, plugins will not be called on `afterDatasetsDraw`.
		 * @private
		 */
		drawDatasets: function(easingValue) {
			var me = this;

			if (plugins.notify(me, 'beforeDatasetsDraw', [easingValue]) === false) {
				return;
			}

			// Draw datasets reversed to support proper line stacking
			for (var i = (me.data.datasets || []).length - 1; i >= 0; --i) {
				if (me.isDatasetVisible(i)) {
					me.drawDataset(i, easingValue);
				}
			}

			plugins.notify(me, 'afterDatasetsDraw', [easingValue]);
		},

		/**
		 * Draws dataset at index unless a plugin returns `false` to the `beforeDatasetDraw`
		 * hook, in which case, plugins will not be called on `afterDatasetDraw`.
		 * @private
		 */
		drawDataset: function(index, easingValue) {
			var me = this;
			var meta = me.getDatasetMeta(index);
			var args = {
				meta: meta,
				index: index,
				easingValue: easingValue
			};

			if (plugins.notify(me, 'beforeDatasetDraw', [args]) === false) {
				return;
			}

			meta.controller.draw(easingValue);

			plugins.notify(me, 'afterDatasetDraw', [args]);
		},

		/**
		 * Draws tooltip unless a plugin returns `false` to the `beforeTooltipDraw`
		 * hook, in which case, plugins will not be called on `afterTooltipDraw`.
		 * @private
		 */
		_drawTooltip: function(easingValue) {
			var me = this;
			var tooltip = me.tooltip;
			var args = {
				tooltip: tooltip,
				easingValue: easingValue
			};

			if (plugins.notify(me, 'beforeTooltipDraw', [args]) === false) {
				return;
			}

			tooltip.draw();

			plugins.notify(me, 'afterTooltipDraw', [args]);
		},

		// Get the single element that was clicked on
		// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
		getElementAtEvent: function(e) {
			return Interaction.modes.single(this, e);
		},

		getElementsAtEvent: function(e) {
			return Interaction.modes.label(this, e, {intersect: true});
		},

		getElementsAtXAxis: function(e) {
			return Interaction.modes['x-axis'](this, e, {intersect: true});
		},

		getElementsAtEventForMode: function(e, mode, options) {
			var method = Interaction.modes[mode];
			if (typeof method === 'function') {
				return method(this, e, options);
			}

			return [];
		},

		getDatasetAtEvent: function(e) {
			return Interaction.modes.dataset(this, e, {intersect: true});
		},

		getDatasetMeta: function(datasetIndex) {
			var me = this;
			var dataset = me.data.datasets[datasetIndex];
			if (!dataset._meta) {
				dataset._meta = {};
			}

			var meta = dataset._meta[me.id];
			if (!meta) {
				meta = dataset._meta[me.id] = {
					type: null,
					data: [],
					dataset: null,
					controller: null,
					hidden: null,			// See isDatasetVisible() comment
					xAxisID: null,
					yAxisID: null
				};
			}

			return meta;
		},

		getVisibleDatasetCount: function() {
			var count = 0;
			for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
				if (this.isDatasetVisible(i)) {
					count++;
				}
			}
			return count;
		},

		isDatasetVisible: function(datasetIndex) {
			var meta = this.getDatasetMeta(datasetIndex);

			// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
			// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
			return typeof meta.hidden === 'boolean' ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
		},

		generateLegend: function() {
			return this.options.legendCallback(this);
		},

		/**
		 * @private
		 */
		destroyDatasetMeta: function(datasetIndex) {
			var id = this.id;
			var dataset = this.data.datasets[datasetIndex];
			var meta = dataset._meta && dataset._meta[id];

			if (meta) {
				meta.controller.destroy();
				delete dataset._meta[id];
			}
		},

		destroy: function() {
			var me = this;
			var canvas = me.canvas;
			var i, ilen;

			me.stop();

			// dataset controllers need to cleanup associated data
			for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
				me.destroyDatasetMeta(i);
			}

			if (canvas) {
				me.unbindEvents();
				helpers.canvas.clear(me);
				platform.releaseContext(me.ctx);
				me.canvas = null;
				me.ctx = null;
			}

			plugins.notify(me, 'destroy');

			delete Chart.instances[me.id];
		},

		toBase64Image: function() {
			return this.canvas.toDataURL.apply(this.canvas, arguments);
		},

		initToolTip: function() {
			var me = this;
			me.tooltip = new Chart.Tooltip({
				_chart: me,
				_chartInstance: me, // deprecated, backward compatibility
				_data: me.data,
				_options: me.options.tooltips
			}, me);
		},

		/**
		 * @private
		 */
		bindEvents: function() {
			var me = this;
			var listeners = me._listeners = {};
			var listener = function() {
				me.eventHandler.apply(me, arguments);
			};

			helpers.each(me.options.events, function(type) {
				platform.addEventListener(me, type, listener);
				listeners[type] = listener;
			});

			// Elements used to detect size change should not be injected for non responsive charts.
			// See https://github.com/chartjs/Chart.js/issues/2210
			if (me.options.responsive) {
				listener = function() {
					me.resize();
				};

				platform.addEventListener(me, 'resize', listener);
				listeners.resize = listener;
			}
		},

		/**
		 * @private
		 */
		unbindEvents: function() {
			var me = this;
			var listeners = me._listeners;
			if (!listeners) {
				return;
			}

			delete me._listeners;
			helpers.each(listeners, function(listener, type) {
				platform.removeEventListener(me, type, listener);
			});
		},

		updateHoverStyle: function(elements, mode, enabled) {
			var method = enabled ? 'setHoverStyle' : 'removeHoverStyle';
			var element, i, ilen;

			for (i = 0, ilen = elements.length; i < ilen; ++i) {
				element = elements[i];
				if (element) {
					this.getDatasetMeta(element._datasetIndex).controller[method](element);
				}
			}
		},

		/**
		 * @private
		 */
		eventHandler: function(e) {
			var me = this;
			var tooltip = me.tooltip;

			if (plugins.notify(me, 'beforeEvent', [e]) === false) {
				return;
			}

			// Buffer any update calls so that renders do not occur
			me._bufferedRender = true;
			me._bufferedRequest = null;

			var changed = me.handleEvent(e);
			changed |= tooltip && tooltip.handleEvent(e);

			plugins.notify(me, 'afterEvent', [e]);

			var bufferedRequest = me._bufferedRequest;
			if (bufferedRequest) {
				// If we have an update that was triggered, we need to do a normal render
				me.render(bufferedRequest);
			} else if (changed && !me.animating) {
				// If entering, leaving, or changing elements, animate the change via pivot
				me.stop();

				// We only need to render at this point. Updating will cause scales to be
				// recomputed generating flicker & using more memory than necessary.
				me.render(me.options.hover.animationDuration, true);
			}

			me._bufferedRender = false;
			me._bufferedRequest = null;

			return me;
		},

		/**
		 * Handle an event
		 * @private
		 * @param {IEvent} event the event to handle
		 * @return {Boolean} true if the chart needs to re-render
		 */
		handleEvent: function(e) {
			var me = this;
			var options = me.options || {};
			var hoverOptions = options.hover;
			var changed = false;

			me.lastActive = me.lastActive || [];

			// Find Active Elements for hover and tooltips
			if (e.type === 'mouseout') {
				me.active = [];
			} else {
				me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions);
			}

			// Invoke onHover hook
			// Need to call with native event here to not break backwards compatibility
			helpers.callback(options.onHover || options.hover.onHover, [e.native, me.active], me);

			if (e.type === 'mouseup' || e.type === 'click') {
				if (options.onClick) {
					// Use e.native here for backwards compatibility
					options.onClick.call(me, e.native, me.active);
				}
			}

			// Remove styling for last active (even if it may still be active)
			if (me.lastActive.length) {
				me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
			}

			// Built in hover styling
			if (me.active.length && hoverOptions.mode) {
				me.updateHoverStyle(me.active, hoverOptions.mode, true);
			}

			changed = !helpers.arrayEquals(me.active, me.lastActive);

			// Remember Last Actives
			me.lastActive = me.active;

			return changed;
		}
	});

	/**
	 * Provided for backward compatibility, use Chart instead.
	 * @class Chart.Controller
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 * @private
	 */
	Chart.Controller = Chart;
};

},{"25":25,"28":28,"45":45,"48":48}],24:[function(require,module,exports){
'use strict';

var helpers = require(45);

module.exports = function(Chart) {

	var arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];

	/**
	 * Hooks the array methods that add or remove values ('push', pop', 'shift', 'splice',
	 * 'unshift') and notify the listener AFTER the array has been altered. Listeners are
	 * called on the 'onData*' callbacks (e.g. onDataPush, etc.) with same arguments.
	 */
	function listenArrayEvents(array, listener) {
		if (array._chartjs) {
			array._chartjs.listeners.push(listener);
			return;
		}

		Object.defineProperty(array, '_chartjs', {
			configurable: true,
			enumerable: false,
			value: {
				listeners: [listener]
			}
		});

		arrayEvents.forEach(function(key) {
			var method = 'onData' + key.charAt(0).toUpperCase() + key.slice(1);
			var base = array[key];

			Object.defineProperty(array, key, {
				configurable: true,
				enumerable: false,
				value: function() {
					var args = Array.prototype.slice.call(arguments);
					var res = base.apply(this, args);

					helpers.each(array._chartjs.listeners, function(object) {
						if (typeof object[method] === 'function') {
							object[method].apply(object, args);
						}
					});

					return res;
				}
			});
		});
	}

	/**
	 * Removes the given array event listener and cleanup extra attached properties (such as
	 * the _chartjs stub and overridden methods) if array doesn't have any more listeners.
	 */
	function unlistenArrayEvents(array, listener) {
		var stub = array._chartjs;
		if (!stub) {
			return;
		}

		var listeners = stub.listeners;
		var index = listeners.indexOf(listener);
		if (index !== -1) {
			listeners.splice(index, 1);
		}

		if (listeners.length > 0) {
			return;
		}

		arrayEvents.forEach(function(key) {
			delete array[key];
		});

		delete array._chartjs;
	}

	// Base class for all dataset controllers (line, bar, etc)
	Chart.DatasetController = function(chart, datasetIndex) {
		this.initialize(chart, datasetIndex);
	};

	helpers.extend(Chart.DatasetController.prototype, {

		/**
		 * Element type used to generate a meta dataset (e.g. Chart.element.Line).
		 * @type {Chart.core.element}
		 */
		datasetElementType: null,

		/**
		 * Element type used to generate a meta data (e.g. Chart.element.Point).
		 * @type {Chart.core.element}
		 */
		dataElementType: null,

		initialize: function(chart, datasetIndex) {
			var me = this;
			me.chart = chart;
			me.index = datasetIndex;
			me.linkScales();
			me.addElements();
		},

		updateIndex: function(datasetIndex) {
			this.index = datasetIndex;
		},

		linkScales: function() {
			var me = this;
			var meta = me.getMeta();
			var dataset = me.getDataset();

			if (meta.xAxisID === null) {
				meta.xAxisID = dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
			}
			if (meta.yAxisID === null) {
				meta.yAxisID = dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
			}
		},

		getDataset: function() {
			return this.chart.data.datasets[this.index];
		},

		getMeta: function() {
			return this.chart.getDatasetMeta(this.index);
		},

		getScaleForId: function(scaleID) {
			return this.chart.scales[scaleID];
		},

		reset: function() {
			this.update(true);
		},

		/**
		 * @private
		 */
		destroy: function() {
			if (this._data) {
				unlistenArrayEvents(this._data, this);
			}
		},

		createMetaDataset: function() {
			var me = this;
			var type = me.datasetElementType;
			return type && new type({
				_chart: me.chart,
				_datasetIndex: me.index
			});
		},

		createMetaData: function(index) {
			var me = this;
			var type = me.dataElementType;
			return type && new type({
				_chart: me.chart,
				_datasetIndex: me.index,
				_index: index
			});
		},

		addElements: function() {
			var me = this;
			var meta = me.getMeta();
			var data = me.getDataset().data || [];
			var metaData = meta.data;
			var i, ilen;

			for (i = 0, ilen = data.length; i < ilen; ++i) {
				metaData[i] = metaData[i] || me.createMetaData(i);
			}

			meta.dataset = meta.dataset || me.createMetaDataset();
		},

		addElementAndReset: function(index) {
			var element = this.createMetaData(index);
			this.getMeta().data.splice(index, 0, element);
			this.updateElement(element, index, true);
		},

		buildOrUpdateElements: function() {
			var me = this;
			var dataset = me.getDataset();
			var data = dataset.data || (dataset.data = []);

			// In order to correctly handle data addition/deletion animation (an thus simulate
			// real-time charts), we need to monitor these data modifications and synchronize
			// the internal meta data accordingly.
			if (me._data !== data) {
				if (me._data) {
					// This case happens when the user replaced the data array instance.
					unlistenArrayEvents(me._data, me);
				}

				listenArrayEvents(data, me);
				me._data = data;
			}

			// Re-sync meta data in case the user replaced the data array or if we missed
			// any updates and so make sure that we handle number of datapoints changing.
			me.resyncElements();
		},

		update: helpers.noop,

		transition: function(easingValue) {
			var meta = this.getMeta();
			var elements = meta.data || [];
			var ilen = elements.length;
			var i = 0;

			for (; i < ilen; ++i) {
				elements[i].transition(easingValue);
			}

			if (meta.dataset) {
				meta.dataset.transition(easingValue);
			}
		},

		draw: function() {
			var meta = this.getMeta();
			var elements = meta.data || [];
			var ilen = elements.length;
			var i = 0;

			if (meta.dataset) {
				meta.dataset.draw();
			}

			for (; i < ilen; ++i) {
				elements[i].draw();
			}
		},

		removeHoverStyle: function(element, elementOpts) {
			var dataset = this.chart.data.datasets[element._datasetIndex];
			var index = element._index;
			var custom = element.custom || {};
			var valueOrDefault = helpers.valueAtIndexOrDefault;
			var model = element._model;

			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
		},

		setHoverStyle: function(element) {
			var dataset = this.chart.data.datasets[element._datasetIndex];
			var index = element._index;
			var custom = element.custom || {};
			var valueOrDefault = helpers.valueAtIndexOrDefault;
			var getHoverColor = helpers.getHoverColor;
			var model = element._model;

			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
		},

		/**
		 * @private
		 */
		resyncElements: function() {
			var me = this;
			var meta = me.getMeta();
			var data = me.getDataset().data;
			var numMeta = meta.data.length;
			var numData = data.length;

			if (numData < numMeta) {
				meta.data.splice(numData, numMeta - numData);
			} else if (numData > numMeta) {
				me.insertElements(numMeta, numData - numMeta);
			}
		},

		/**
		 * @private
		 */
		insertElements: function(start, count) {
			for (var i = 0; i < count; ++i) {
				this.addElementAndReset(start + i);
			}
		},

		/**
		 * @private
		 */
		onDataPush: function() {
			this.insertElements(this.getDataset().data.length - 1, arguments.length);
		},

		/**
		 * @private
		 */
		onDataPop: function() {
			this.getMeta().data.pop();
		},

		/**
		 * @private
		 */
		onDataShift: function() {
			this.getMeta().data.shift();
		},

		/**
		 * @private
		 */
		onDataSplice: function(start, count) {
			this.getMeta().data.splice(start, count);
			this.insertElements(start, arguments.length - 2);
		},

		/**
		 * @private
		 */
		onDataUnshift: function() {
			this.insertElements(0, arguments.length);
		}
	});

	Chart.DatasetController.extend = helpers.inherits;
};

},{"45":45}],25:[function(require,module,exports){
'use strict';

var helpers = require(45);

module.exports = {
	/**
	 * @private
	 */
	_set: function(scope, values) {
		return helpers.merge(this[scope] || (this[scope] = {}), values);
	}
};

},{"45":45}],26:[function(require,module,exports){
'use strict';

var color = require(2);
var helpers = require(45);

function interpolate(start, view, model, ease) {
	var keys = Object.keys(model);
	var i, ilen, key, actual, origin, target, type, c0, c1;

	for (i = 0, ilen = keys.length; i < ilen; ++i) {
		key = keys[i];

		target = model[key];

		// if a value is added to the model after pivot() has been called, the view
		// doesn't contain it, so let's initialize the view to the target value.
		if (!view.hasOwnProperty(key)) {
			view[key] = target;
		}

		actual = view[key];

		if (actual === target || key[0] === '_') {
			continue;
		}

		if (!start.hasOwnProperty(key)) {
			start[key] = actual;
		}

		origin = start[key];

		type = typeof target;

		if (type === typeof origin) {
			if (type === 'string') {
				c0 = color(origin);
				if (c0.valid) {
					c1 = color(target);
					if (c1.valid) {
						view[key] = c1.mix(c0, ease).rgbString();
						continue;
					}
				}
			} else if (type === 'number' && isFinite(origin) && isFinite(target)) {
				view[key] = origin + (target - origin) * ease;
				continue;
			}
		}

		view[key] = target;
	}
}

var Element = function(configuration) {
	helpers.extend(this, configuration);
	this.initialize.apply(this, arguments);
};

helpers.extend(Element.prototype, {

	initialize: function() {
		this.hidden = false;
	},

	pivot: function() {
		var me = this;
		if (!me._view) {
			me._view = helpers.clone(me._model);
		}
		me._start = {};
		return me;
	},

	transition: function(ease) {
		var me = this;
		var model = me._model;
		var start = me._start;
		var view = me._view;

		// No animation -> No Transition
		if (!model || ease === 1) {
			me._view = model;
			me._start = null;
			return me;
		}

		if (!view) {
			view = me._view = {};
		}

		if (!start) {
			start = me._start = {};
		}

		interpolate(start, view, model, ease);

		return me;
	},

	tooltipPosition: function() {
		return {
			x: this._model.x,
			y: this._model.y
		};
	},

	hasValue: function() {
		return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
	}
});

Element.extend = helpers.inherits;

module.exports = Element;

},{"2":2,"45":45}],27:[function(require,module,exports){
/* global window: false */
/* global document: false */
'use strict';

var color = require(2);
var defaults = require(25);
var helpers = require(45);

module.exports = function(Chart) {

	// -- Basic js utility methods

	helpers.configMerge = function(/* objects ... */) {
		return helpers.merge(helpers.clone(arguments[0]), [].slice.call(arguments, 1), {
			merger: function(key, target, source, options) {
				var tval = target[key] || {};
				var sval = source[key];

				if (key === 'scales') {
					// scale config merging is complex. Add our own function here for that
					target[key] = helpers.scaleMerge(tval, sval);
				} else if (key === 'scale') {
					// used in polar area & radar charts since there is only one scale
					target[key] = helpers.merge(tval, [Chart.scaleService.getScaleDefaults(sval.type), sval]);
				} else {
					helpers._merger(key, target, source, options);
				}
			}
		});
	};

	helpers.scaleMerge = function(/* objects ... */) {
		return helpers.merge(helpers.clone(arguments[0]), [].slice.call(arguments, 1), {
			merger: function(key, target, source, options) {
				if (key === 'xAxes' || key === 'yAxes') {
					var slen = source[key].length;
					var i, type, scale;

					if (!target[key]) {
						target[key] = [];
					}

					for (i = 0; i < slen; ++i) {
						scale = source[key][i];
						type = helpers.valueOrDefault(scale.type, key === 'xAxes' ? 'category' : 'linear');

						if (i >= target[key].length) {
							target[key].push({});
						}

						if (!target[key][i].type || (scale.type && scale.type !== target[key][i].type)) {
							// new/untyped scale or type changed: let's apply the new defaults
							// then merge source scale to correctly overwrite the defaults.
							helpers.merge(target[key][i], [Chart.scaleService.getScaleDefaults(type), scale]);
						} else {
							// scales type are the same
							helpers.merge(target[key][i], scale);
						}
					}
				} else {
					helpers._merger(key, target, source, options);
				}
			}
		});
	};

	helpers.where = function(collection, filterCallback) {
		if (helpers.isArray(collection) && Array.prototype.filter) {
			return collection.filter(filterCallback);
		}
		var filtered = [];

		helpers.each(collection, function(item) {
			if (filterCallback(item)) {
				filtered.push(item);
			}
		});

		return filtered;
	};
	helpers.findIndex = Array.prototype.findIndex ?
		function(array, callback, scope) {
			return array.findIndex(callback, scope);
		} :
		function(array, callback, scope) {
			scope = scope === undefined ? array : scope;
			for (var i = 0, ilen = array.length; i < ilen; ++i) {
				if (callback.call(scope, array[i], i, array)) {
					return i;
				}
			}
			return -1;
		};
	helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
		// Default to start of the array
		if (helpers.isNullOrUndef(startIndex)) {
			startIndex = -1;
		}
		for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
			var currentItem = arrayToSearch[i];
			if (filterCallback(currentItem)) {
				return currentItem;
			}
		}
	};
	helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
		// Default to end of the array
		if (helpers.isNullOrUndef(startIndex)) {
			startIndex = arrayToSearch.length;
		}
		for (var i = startIndex - 1; i >= 0; i--) {
			var currentItem = arrayToSearch[i];
			if (filterCallback(currentItem)) {
				return currentItem;
			}
		}
	};

	// -- Math methods
	helpers.isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};
	helpers.almostEquals = function(x, y, epsilon) {
		return Math.abs(x - y) < epsilon;
	};
	helpers.almostWhole = function(x, epsilon) {
		var rounded = Math.round(x);
		return (((rounded - epsilon) < x) && ((rounded + epsilon) > x));
	};
	helpers.max = function(array) {
		return array.reduce(function(max, value) {
			if (!isNaN(value)) {
				return Math.max(max, value);
			}
			return max;
		}, Number.NEGATIVE_INFINITY);
	};
	helpers.min = function(array) {
		return array.reduce(function(min, value) {
			if (!isNaN(value)) {
				return Math.min(min, value);
			}
			return min;
		}, Number.POSITIVE_INFINITY);
	};
	helpers.sign = Math.sign ?
		function(x) {
			return Math.sign(x);
		} :
		function(x) {
			x = +x; // convert to a number
			if (x === 0 || isNaN(x)) {
				return x;
			}
			return x > 0 ? 1 : -1;
		};
	helpers.log10 = Math.log10 ?
		function(x) {
			return Math.log10(x);
		} :
		function(x) {
			return Math.log(x) / Math.LN10;
		};
	helpers.toRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	};
	helpers.toDegrees = function(radians) {
		return radians * (180 / Math.PI);
	};
	// Gets the angle from vertical upright to the point about a centre.
	helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
		var distanceFromXCenter = anglePoint.x - centrePoint.x;
		var distanceFromYCenter = anglePoint.y - centrePoint.y;
		var radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

		var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

		if (angle < (-0.5 * Math.PI)) {
			angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
		}

		return {
			angle: angle,
			distance: radialDistanceFromCenter
		};
	};
	helpers.distanceBetweenPoints = function(pt1, pt2) {
		return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
	};
	helpers.aliasPixel = function(pixelWidth) {
		return (pixelWidth % 2 === 0) ? 0 : 0.5;
	};
	helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
		// Props to Rob Spencer at scaled innovation for his post on splining between points
		// http://scaledinnovation.com/analytics/splines/aboutSplines.html

		// This function must also respect "skipped" points

		var previous = firstPoint.skip ? middlePoint : firstPoint;
		var current = middlePoint;
		var next = afterPoint.skip ? middlePoint : afterPoint;

		var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
		var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

		var s01 = d01 / (d01 + d12);
		var s12 = d12 / (d01 + d12);

		// If all points are the same, s01 & s02 will be inf
		s01 = isNaN(s01) ? 0 : s01;
		s12 = isNaN(s12) ? 0 : s12;

		var fa = t * s01; // scaling factor for triangle Ta
		var fb = t * s12;

		return {
			previous: {
				x: current.x - fa * (next.x - previous.x),
				y: current.y - fa * (next.y - previous.y)
			},
			next: {
				x: current.x + fb * (next.x - previous.x),
				y: current.y + fb * (next.y - previous.y)
			}
		};
	};
	helpers.EPSILON = Number.EPSILON || 1e-14;
	helpers.splineCurveMonotone = function(points) {
		// This function calculates Bézier control points in a similar way than |splineCurve|,
		// but preserves monotonicity of the provided data and ensures no local extremums are added
		// between the dataset discrete points due to the interpolation.
		// See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

		var pointsWithTangents = (points || []).map(function(point) {
			return {
				model: point._model,
				deltaK: 0,
				mK: 0
			};
		});

		// Calculate slopes (deltaK) and initialize tangents (mK)
		var pointsLen = pointsWithTangents.length;
		var i, pointBefore, pointCurrent, pointAfter;
		for (i = 0; i < pointsLen; ++i) {
			pointCurrent = pointsWithTangents[i];
			if (pointCurrent.model.skip) {
				continue;
			}

			pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
			pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
			if (pointAfter && !pointAfter.model.skip) {
				var slopeDeltaX = (pointAfter.model.x - pointCurrent.model.x);

				// In the case of two points that appear at the same x pixel, slopeDeltaX is 0
				pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
			}

			if (!pointBefore || pointBefore.model.skip) {
				pointCurrent.mK = pointCurrent.deltaK;
			} else if (!pointAfter || pointAfter.model.skip) {
				pointCurrent.mK = pointBefore.deltaK;
			} else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
				pointCurrent.mK = 0;
			} else {
				pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
			}
		}

		// Adjust tangents to ensure monotonic properties
		var alphaK, betaK, tauK, squaredMagnitude;
		for (i = 0; i < pointsLen - 1; ++i) {
			pointCurrent = pointsWithTangents[i];
			pointAfter = pointsWithTangents[i + 1];
			if (pointCurrent.model.skip || pointAfter.model.skip) {
				continue;
			}

			if (helpers.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
				pointCurrent.mK = pointAfter.mK = 0;
				continue;
			}

			alphaK = pointCurrent.mK / pointCurrent.deltaK;
			betaK = pointAfter.mK / pointCurrent.deltaK;
			squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
			if (squaredMagnitude <= 9) {
				continue;
			}

			tauK = 3 / Math.sqrt(squaredMagnitude);
			pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
			pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
		}

		// Compute control points
		var deltaX;
		for (i = 0; i < pointsLen; ++i) {
			pointCurrent = pointsWithTangents[i];
			if (pointCurrent.model.skip) {
				continue;
			}

			pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
			pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
			if (pointBefore && !pointBefore.model.skip) {
				deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
				pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
				pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
			}
			if (pointAfter && !pointAfter.model.skip) {
				deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
				pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
				pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
			}
		}
	};
	helpers.nextItem = function(collection, index, loop) {
		if (loop) {
			return index >= collection.length - 1 ? collection[0] : collection[index + 1];
		}
		return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
	};
	helpers.previousItem = function(collection, index, loop) {
		if (loop) {
			return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
		}
		return index <= 0 ? collection[0] : collection[index - 1];
	};
	// Implementation of the nice number algorithm used in determining where axis labels will go
	helpers.niceNum = function(range, round) {
		var exponent = Math.floor(helpers.log10(range));
		var fraction = range / Math.pow(10, exponent);
		var niceFraction;

		if (round) {
			if (fraction < 1.5) {
				niceFraction = 1;
			} else if (fraction < 3) {
				niceFraction = 2;
			} else if (fraction < 7) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}
		} else if (fraction <= 1.0) {
			niceFraction = 1;
		} else if (fraction <= 2) {
			niceFraction = 2;
		} else if (fraction <= 5) {
			niceFraction = 5;
		} else {
			niceFraction = 10;
		}

		return niceFraction * Math.pow(10, exponent);
	};
	// Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	helpers.requestAnimFrame = (function() {
		if (typeof window === 'undefined') {
			return function(callback) {
				callback();
			};
		}
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			};
	}());
	// -- DOM methods
	helpers.getRelativePosition = function(evt, chart) {
		var mouseX, mouseY;
		var e = evt.originalEvent || evt;
		var canvas = evt.currentTarget || evt.srcElement;
		var boundingRect = canvas.getBoundingClientRect();

		var touches = e.touches;
		if (touches && touches.length > 0) {
			mouseX = touches[0].clientX;
			mouseY = touches[0].clientY;

		} else {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}

		// Scale mouse coordinates into canvas coordinates
		// by following the pattern laid out by 'jerryj' in the comments of
		// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
		var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
		var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
		var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
		var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
		var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
		var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;

		// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
		// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
		mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
		mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);

		return {
			x: mouseX,
			y: mouseY
		};

	};

	// Private helper function to convert max-width/max-height values that may be percentages into a number
	function parseMaxStyle(styleValue, node, parentProperty) {
		var valueInPixels;
		if (typeof styleValue === 'string') {
			valueInPixels = parseInt(styleValue, 10);

			if (styleValue.indexOf('%') !== -1) {
				// percentage * size in dimension
				valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
			}
		} else {
			valueInPixels = styleValue;
		}

		return valueInPixels;
	}

	/**
	 * Returns if the given value contains an effective constraint.
	 * @private
	 */
	function isConstrainedValue(value) {
		return value !== undefined && value !== null && value !== 'none';
	}

	// Private helper to get a constraint dimension
	// @param domNode : the node to check the constraint on
	// @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
	// @param percentageProperty : property of parent to use when calculating width as a percentage
	// @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
	function getConstraintDimension(domNode, maxStyle, percentageProperty) {
		var view = document.defaultView;
		var parentNode = domNode.parentNode;
		var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
		var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
		var hasCNode = isConstrainedValue(constrainedNode);
		var hasCContainer = isConstrainedValue(constrainedContainer);
		var infinity = Number.POSITIVE_INFINITY;

		if (hasCNode || hasCContainer) {
			return Math.min(
				hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
				hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
		}

		return 'none';
	}
	// returns Number or undefined if no constraint
	helpers.getConstraintWidth = function(domNode) {
		return getConstraintDimension(domNode, 'max-width', 'clientWidth');
	};
	// returns Number or undefined if no constraint
	helpers.getConstraintHeight = function(domNode) {
		return getConstraintDimension(domNode, 'max-height', 'clientHeight');
	};
	helpers.getMaximumWidth = function(domNode) {
		var container = domNode.parentNode;
		if (!container) {
			return domNode.clientWidth;
		}

		var paddingLeft = parseInt(helpers.getStyle(container, 'padding-left'), 10);
		var paddingRight = parseInt(helpers.getStyle(container, 'padding-right'), 10);
		var w = container.clientWidth - paddingLeft - paddingRight;
		var cw = helpers.getConstraintWidth(domNode);
		return isNaN(cw) ? w : Math.min(w, cw);
	};
	helpers.getMaximumHeight = function(domNode) {
		var container = domNode.parentNode;
		if (!container) {
			return domNode.clientHeight;
		}

		var paddingTop = parseInt(helpers.getStyle(container, 'padding-top'), 10);
		var paddingBottom = parseInt(helpers.getStyle(container, 'padding-bottom'), 10);
		var h = container.clientHeight - paddingTop - paddingBottom;
		var ch = helpers.getConstraintHeight(domNode);
		return isNaN(ch) ? h : Math.min(h, ch);
	};
	helpers.getStyle = function(el, property) {
		return el.currentStyle ?
			el.currentStyle[property] :
			document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
	};
	helpers.retinaScale = function(chart, forceRatio) {
		var pixelRatio = chart.currentDevicePixelRatio = forceRatio || window.devicePixelRatio || 1;
		if (pixelRatio === 1) {
			return;
		}

		var canvas = chart.canvas;
		var height = chart.height;
		var width = chart.width;

		canvas.height = height * pixelRatio;
		canvas.width = width * pixelRatio;
		chart.ctx.scale(pixelRatio, pixelRatio);

		// If no style has been set on the canvas, the render size is used as display size,
		// making the chart visually bigger, so let's enforce it to the "correct" values.
		// See https://github.com/chartjs/Chart.js/issues/3575
		canvas.style.height = height + 'px';
		canvas.style.width = width + 'px';
	};
	// -- Canvas methods
	helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
		return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
	};
	helpers.longestText = function(ctx, font, arrayOfThings, cache) {
		cache = cache || {};
		var data = cache.data = cache.data || {};
		var gc = cache.garbageCollect = cache.garbageCollect || [];

		if (cache.font !== font) {
			data = cache.data = {};
			gc = cache.garbageCollect = [];
			cache.font = font;
		}

		ctx.font = font;
		var longest = 0;
		helpers.each(arrayOfThings, function(thing) {
			// Undefined strings and arrays should not be measured
			if (thing !== undefined && thing !== null && helpers.isArray(thing) !== true) {
				longest = helpers.measureText(ctx, data, gc, longest, thing);
			} else if (helpers.isArray(thing)) {
				// if it is an array lets measure each element
				// to do maybe simplify this function a bit so we can do this more recursively?
				helpers.each(thing, function(nestedThing) {
					// Undefined strings and arrays should not be measured
					if (nestedThing !== undefined && nestedThing !== null && !helpers.isArray(nestedThing)) {
						longest = helpers.measureText(ctx, data, gc, longest, nestedThing);
					}
				});
			}
		});

		var gcLen = gc.length / 2;
		if (gcLen > arrayOfThings.length) {
			for (var i = 0; i < gcLen; i++) {
				delete data[gc[i]];
			}
			gc.splice(0, gcLen);
		}
		return longest;
	};
	helpers.measureText = function(ctx, data, gc, longest, string) {
		var textWidth = data[string];
		if (!textWidth) {
			textWidth = data[string] = ctx.measureText(string).width;
			gc.push(string);
		}
		if (textWidth > longest) {
			longest = textWidth;
		}
		return longest;
	};
	helpers.numberOfLabelLines = function(arrayOfThings) {
		var numberOfLines = 1;
		helpers.each(arrayOfThings, function(thing) {
			if (helpers.isArray(thing)) {
				if (thing.length > numberOfLines) {
					numberOfLines = thing.length;
				}
			}
		});
		return numberOfLines;
	};

	helpers.color = !color ?
		function(value) {
			console.error('Color.js not found!');
			return value;
		} :
		function(value) {
			/* global CanvasGradient */
			if (value instanceof CanvasGradient) {
				value = defaults.global.defaultColor;
			}

			return color(value);
		};

	helpers.getHoverColor = function(colorValue) {
		/* global CanvasPattern */
		return (colorValue instanceof CanvasPattern) ?
			colorValue :
			helpers.color(colorValue).saturate(0.5).darken(0.1).rgbString();
	};
};

},{"2":2,"25":25,"45":45}],28:[function(require,module,exports){
'use strict';

var helpers = require(45);

/**
 * Helper function to get relative position for an event
 * @param {Event|IEvent} event - The event to get the position for
 * @param {Chart} chart - The chart
 * @returns {Point} the event position
 */
function getRelativePosition(e, chart) {
	if (e.native) {
		return {
			x: e.x,
			y: e.y
		};
	}

	return helpers.getRelativePosition(e, chart);
}

/**
 * Helper function to traverse all of the visible elements in the chart
 * @param chart {chart} the chart
 * @param handler {Function} the callback to execute for each visible item
 */
function parseVisibleItems(chart, handler) {
	var datasets = chart.data.datasets;
	var meta, i, j, ilen, jlen;

	for (i = 0, ilen = datasets.length; i < ilen; ++i) {
		if (!chart.isDatasetVisible(i)) {
			continue;
		}

		meta = chart.getDatasetMeta(i);
		for (j = 0, jlen = meta.data.length; j < jlen; ++j) {
			var element = meta.data[j];
			if (!element._view.skip) {
				handler(element);
			}
		}
	}
}

/**
 * Helper function to get the items that intersect the event position
 * @param items {ChartElement[]} elements to filter
 * @param position {Point} the point to be nearest to
 * @return {ChartElement[]} the nearest items
 */
function getIntersectItems(chart, position) {
	var elements = [];

	parseVisibleItems(chart, function(element) {
		if (element.inRange(position.x, position.y)) {
			elements.push(element);
		}
	});

	return elements;
}

/**
 * Helper function to get the items nearest to the event position considering all visible items in teh chart
 * @param chart {Chart} the chart to look at elements from
 * @param position {Point} the point to be nearest to
 * @param intersect {Boolean} if true, only consider items that intersect the position
 * @param distanceMetric {Function} function to provide the distance between points
 * @return {ChartElement[]} the nearest items
 */
function getNearestItems(chart, position, intersect, distanceMetric) {
	var minDistance = Number.POSITIVE_INFINITY;
	var nearestItems = [];

	parseVisibleItems(chart, function(element) {
		if (intersect && !element.inRange(position.x, position.y)) {
			return;
		}

		var center = element.getCenterPoint();
		var distance = distanceMetric(position, center);

		if (distance < minDistance) {
			nearestItems = [element];
			minDistance = distance;
		} else if (distance === minDistance) {
			// Can have multiple items at the same distance in which case we sort by size
			nearestItems.push(element);
		}
	});

	return nearestItems;
}

/**
 * Get a distance metric function for two points based on the
 * axis mode setting
 * @param {String} axis the axis mode. x|y|xy
 */
function getDistanceMetricForAxis(axis) {
	var useX = axis.indexOf('x') !== -1;
	var useY = axis.indexOf('y') !== -1;

	return function(pt1, pt2) {
		var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
		var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
		return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	};
}

function indexMode(chart, e, options) {
	var position = getRelativePosition(e, chart);
	// Default axis for index mode is 'x' to match old behaviour
	options.axis = options.axis || 'x';
	var distanceMetric = getDistanceMetricForAxis(options.axis);
	var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
	var elements = [];

	if (!items.length) {
		return [];
	}

	chart.data.datasets.forEach(function(dataset, datasetIndex) {
		if (chart.isDatasetVisible(datasetIndex)) {
			var meta = chart.getDatasetMeta(datasetIndex);
			var element = meta.data[items[0]._index];

			// don't count items that are skipped (null data)
			if (element && !element._view.skip) {
				elements.push(element);
			}
		}
	});

	return elements;
}

/**
 * @interface IInteractionOptions
 */
/**
 * If true, only consider items that intersect the point
 * @name IInterfaceOptions#boolean
 * @type Boolean
 */

/**
 * Contains interaction related functions
 * @namespace Chart.Interaction
 */
module.exports = {
	// Helper function for different modes
	modes: {
		single: function(chart, e) {
			var position = getRelativePosition(e, chart);
			var elements = [];

			parseVisibleItems(chart, function(element) {
				if (element.inRange(position.x, position.y)) {
					elements.push(element);
					return elements;
				}
			});

			return elements.slice(0, 1);
		},

		/**
		 * @function Chart.Interaction.modes.label
		 * @deprecated since version 2.4.0
		 * @todo remove at version 3
		 * @private
		 */
		label: indexMode,

		/**
		 * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
		 * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
		 * @function Chart.Interaction.modes.index
		 * @since v2.4.0
		 * @param chart {chart} the chart we are returning items from
		 * @param e {Event} the event we are find things at
		 * @param options {IInteractionOptions} options to use during interaction
		 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
		 */
		index: indexMode,

		/**
		 * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
		 * If the options.intersect is false, we find the nearest item and return the items in that dataset
		 * @function Chart.Interaction.modes.dataset
		 * @param chart {chart} the chart we are returning items from
		 * @param e {Event} the event we are find things at
		 * @param options {IInteractionOptions} options to use during interaction
		 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
		 */
		dataset: function(chart, e, options) {
			var position = getRelativePosition(e, chart);
			options.axis = options.axis || 'xy';
			var distanceMetric = getDistanceMetricForAxis(options.axis);
			var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);

			if (items.length > 0) {
				items = chart.getDatasetMeta(items[0]._datasetIndex).data;
			}

			return items;
		},

		/**
		 * @function Chart.Interaction.modes.x-axis
		 * @deprecated since version 2.4.0. Use index mode and intersect == true
		 * @todo remove at version 3
		 * @private
		 */
		'x-axis': function(chart, e) {
			return indexMode(chart, e, {intersect: false});
		},

		/**
		 * Point mode returns all elements that hit test based on the event position
		 * of the event
		 * @function Chart.Interaction.modes.intersect
		 * @param chart {chart} the chart we are returning items from
		 * @param e {Event} the event we are find things at
		 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
		 */
		point: function(chart, e) {
			var position = getRelativePosition(e, chart);
			return getIntersectItems(chart, position);
		},

		/**
		 * nearest mode returns the element closest to the point
		 * @function Chart.Interaction.modes.intersect
		 * @param chart {chart} the chart we are returning items from
		 * @param e {Event} the event we are find things at
		 * @param options {IInteractionOptions} options to use
		 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
		 */
		nearest: function(chart, e, options) {
			var position = getRelativePosition(e, chart);
			options.axis = options.axis || 'xy';
			var distanceMetric = getDistanceMetricForAxis(options.axis);
			var nearestItems = getNearestItems(chart, position, options.intersect, distanceMetric);

			// We have multiple items at the same distance from the event. Now sort by smallest
			if (nearestItems.length > 1) {
				nearestItems.sort(function(a, b) {
					var sizeA = a.getArea();
					var sizeB = b.getArea();
					var ret = sizeA - sizeB;

					if (ret === 0) {
						// if equal sort by dataset index
						ret = a._datasetIndex - b._datasetIndex;
					}

					return ret;
				});
			}

			// Return only 1 item
			return nearestItems.slice(0, 1);
		},

		/**
		 * x mode returns the elements that hit-test at the current x coordinate
		 * @function Chart.Interaction.modes.x
		 * @param chart {chart} the chart we are returning items from
		 * @param e {Event} the event we are find things at
		 * @param options {IInteractionOptions} options to use
		 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
		 */
		x: function(chart, e, options) {
			var position = getRelativePosition(e, chart);
			var items = [];
			var intersectsItem = false;

			parseVisibleItems(chart, function(element) {
				if (element.inXRange(position.x)) {
					items.push(element);
				}

				if (element.inRange(position.x, position.y)) {
					intersectsItem = true;
				}
			});

			// If we want to trigger on an intersect and we don't have any items
			// that intersect the position, return nothing
			if (options.intersect && !intersectsItem) {
				items = [];
			}
			return items;
		},

		/**
		 * y mode returns the elements that hit-test at the current y coordinate
		 * @function Chart.Interaction.modes.y
		 * @param chart {chart} the chart we are returning items from
		 * @param e {Event} the event we are find things at
		 * @param options {IInteractionOptions} options to use
		 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
		 */
		y: function(chart, e, options) {
			var position = getRelativePosition(e, chart);
			var items = [];
			var intersectsItem = false;

			parseVisibleItems(chart, function(element) {
				if (element.inYRange(position.y)) {
					items.push(element);
				}

				if (element.inRange(position.x, position.y)) {
					intersectsItem = true;
				}
			});

			// If we want to trigger on an intersect and we don't have any items
			// that intersect the position, return nothing
			if (options.intersect && !intersectsItem) {
				items = [];
			}
			return items;
		}
	}
};

},{"45":45}],29:[function(require,module,exports){
'use strict';

var defaults = require(25);

defaults._set('global', {
	responsive: true,
	responsiveAnimationDuration: 0,
	maintainAspectRatio: true,
	events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
	hover: {
		onHover: null,
		mode: 'nearest',
		intersect: true,
		animationDuration: 400
	},
	onClick: null,
	defaultColor: 'rgba(0,0,0,0.1)',
	defaultFontColor: '#666',
	defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
	defaultFontSize: 12,
	defaultFontStyle: 'normal',
	showLines: true,

	// Element defaults defined in element extensions
	elements: {},

	// Layout options such as padding
	layout: {
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	}
});

module.exports = function() {

	// Occupy the global variable of Chart, and create a simple base class
	var Chart = function(item, config) {
		this.construct(item, config);
		return this;
	};

	Chart.Chart = Chart;

	return Chart;
};

},{"25":25}],30:[function(require,module,exports){
'use strict';

var helpers = require(45);

module.exports = function(Chart) {

	function filterByPosition(array, position) {
		return helpers.where(array, function(v) {
			return v.position === position;
		});
	}

	function sortByWeight(array, reverse) {
		array.forEach(function(v, i) {
			v._tmpIndex_ = i;
			return v;
		});
		array.sort(function(a, b) {
			var v0 = reverse ? b : a;
			var v1 = reverse ? a : b;
			return v0.weight === v1.weight ?
				v0._tmpIndex_ - v1._tmpIndex_ :
				v0.weight - v1.weight;
		});
		array.forEach(function(v) {
			delete v._tmpIndex_;
		});
	}

	/**
	 * @interface ILayoutItem
	 * @prop {String} position - The position of the item in the chart layout. Possible values are
	 * 'left', 'top', 'right', 'bottom', and 'chartArea'
	 * @prop {Number} weight - The weight used to sort the item. Higher weights are further away from the chart area
	 * @prop {Boolean} fullWidth - if true, and the item is horizontal, then push vertical boxes down
	 * @prop {Function} isHorizontal - returns true if the layout item is horizontal (ie. top or bottom)
	 * @prop {Function} update - Takes two parameters: width and height. Returns size of item
	 * @prop {Function} getPadding -  Returns an object with padding on the edges
	 * @prop {Number} width - Width of item. Must be valid after update()
	 * @prop {Number} height - Height of item. Must be valid after update()
	 * @prop {Number} left - Left edge of the item. Set by layout system and cannot be used in update
	 * @prop {Number} top - Top edge of the item. Set by layout system and cannot be used in update
	 * @prop {Number} right - Right edge of the item. Set by layout system and cannot be used in update
	 * @prop {Number} bottom - Bottom edge of the item. Set by layout system and cannot be used in update
	 */

	// The layout service is very self explanatory.  It's responsible for the layout within a chart.
	// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
	// It is this service's responsibility of carrying out that layout.
	Chart.layoutService = {
		defaults: {},

		/**
		 * Register a box to a chart.
		 * A box is simply a reference to an object that requires layout. eg. Scales, Legend, Title.
		 * @param {Chart} chart - the chart to use
		 * @param {ILayoutItem} item - the item to add to be layed out
		 */
		addBox: function(chart, item) {
			if (!chart.boxes) {
				chart.boxes = [];
			}

			// initialize item with default values
			item.fullWidth = item.fullWidth || false;
			item.position = item.position || 'top';
			item.weight = item.weight || 0;

			chart.boxes.push(item);
		},

		/**
		 * Remove a layoutItem from a chart
		 * @param {Chart} chart - the chart to remove the box from
		 * @param {Object} layoutItem - the item to remove from the layout
		 */
		removeBox: function(chart, layoutItem) {
			var index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
			if (index !== -1) {
				chart.boxes.splice(index, 1);
			}
		},

		/**
		 * Sets (or updates) options on the given `item`.
		 * @param {Chart} chart - the chart in which the item lives (or will be added to)
		 * @param {Object} item - the item to configure with the given options
		 * @param {Object} options - the new item options.
		 */
		configure: function(chart, item, options) {
			var props = ['fullWidth', 'position', 'weight'];
			var ilen = props.length;
			var i = 0;
			var prop;

			for (; i < ilen; ++i) {
				prop = props[i];
				if (options.hasOwnProperty(prop)) {
					item[prop] = options[prop];
				}
			}
		},

		/**
		 * Fits boxes of the given chart into the given size by having each box measure itself
		 * then running a fitting algorithm
		 * @param {Chart} chart - the chart
		 * @param {Number} width - the width to fit into
		 * @param {Number} height - the height to fit into
		 */
		update: function(chart, width, height) {
			if (!chart) {
				return;
			}

			var layoutOptions = chart.options.layout || {};
			var padding = helpers.options.toPadding(layoutOptions.padding);
			var leftPadding = padding.left;
			var rightPadding = padding.right;
			var topPadding = padding.top;
			var bottomPadding = padding.bottom;

			var leftBoxes = filterByPosition(chart.boxes, 'left');
			var rightBoxes = filterByPosition(chart.boxes, 'right');
			var topBoxes = filterByPosition(chart.boxes, 'top');
			var bottomBoxes = filterByPosition(chart.boxes, 'bottom');
			var chartAreaBoxes = filterByPosition(chart.boxes, 'chartArea');

			// Sort boxes by weight. A higher weight is further away from the chart area
			sortByWeight(leftBoxes, true);
			sortByWeight(rightBoxes, false);
			sortByWeight(topBoxes, true);
			sortByWeight(bottomBoxes, false);

			// Essentially we now have any number of boxes on each of the 4 sides.
			// Our canvas looks like the following.
			// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
			// B1 is the bottom axis
			// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
			// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
			// an error will be thrown.
			//
			// |----------------------------------------------------|
			// |                  T1 (Full Width)                   |
			// |----------------------------------------------------|
			// |    |    |                 T2                  |    |
			// |    |----|-------------------------------------|----|
			// |    |    | C1 |                           | C2 |    |
			// |    |    |----|                           |----|    |
			// |    |    |                                     |    |
			// | L1 | L2 |           ChartArea (C0)            | R1 |
			// |    |    |                                     |    |
			// |    |    |----|                           |----|    |
			// |    |    | C3 |                           | C4 |    |
			// |    |----|-------------------------------------|----|
			// |    |    |                 B1                  |    |
			// |----------------------------------------------------|
			// |                  B2 (Full Width)                   |
			// |----------------------------------------------------|
			//
			// What we do to find the best sizing, we do the following
			// 1. Determine the minimum size of the chart area.
			// 2. Split the remaining width equally between each vertical axis
			// 3. Split the remaining height equally between each horizontal axis
			// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
			// 5. Adjust the sizes of each axis based on it's minimum reported size.
			// 6. Refit each axis
			// 7. Position each axis in the final location
			// 8. Tell the chart the final location of the chart area
			// 9. Tell any axes that overlay the chart area the positions of the chart area

			// Step 1
			var chartWidth = width - leftPadding - rightPadding;
			var chartHeight = height - topPadding - bottomPadding;
			var chartAreaWidth = chartWidth / 2; // min 50%
			var chartAreaHeight = chartHeight / 2; // min 50%

			// Step 2
			var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);

			// Step 3
			var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);

			// Step 4
			var maxChartAreaWidth = chartWidth;
			var maxChartAreaHeight = chartHeight;
			var minBoxSizes = [];

			function getMinimumBoxSize(box) {
				var minSize;
				var isHorizontal = box.isHorizontal();

				if (isHorizontal) {
					minSize = box.update(box.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
					maxChartAreaHeight -= minSize.height;
				} else {
					minSize = box.update(verticalBoxWidth, chartAreaHeight);
					maxChartAreaWidth -= minSize.width;
				}

				minBoxSizes.push({
					horizontal: isHorizontal,
					minSize: minSize,
					box: box,
				});
			}

			helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);

			// If a horizontal box has padding, we move the left boxes over to avoid ugly charts (see issue #2478)
			var maxHorizontalLeftPadding = 0;
			var maxHorizontalRightPadding = 0;
			var maxVerticalTopPadding = 0;
			var maxVerticalBottomPadding = 0;

			helpers.each(topBoxes.concat(bottomBoxes), function(horizontalBox) {
				if (horizontalBox.getPadding) {
					var boxPadding = horizontalBox.getPadding();
					maxHorizontalLeftPadding = Math.max(maxHorizontalLeftPadding, boxPadding.left);
					maxHorizontalRightPadding = Math.max(maxHorizontalRightPadding, boxPadding.right);
				}
			});

			helpers.each(leftBoxes.concat(rightBoxes), function(verticalBox) {
				if (verticalBox.getPadding) {
					var boxPadding = verticalBox.getPadding();
					maxVerticalTopPadding = Math.max(maxVerticalTopPadding, boxPadding.top);
					maxVerticalBottomPadding = Math.max(maxVerticalBottomPadding, boxPadding.bottom);
				}
			});

			// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
			// be if the axes are drawn at their minimum sizes.
			// Steps 5 & 6
			var totalLeftBoxesWidth = leftPadding;
			var totalRightBoxesWidth = rightPadding;
			var totalTopBoxesHeight = topPadding;
			var totalBottomBoxesHeight = bottomPadding;

			// Function to fit a box
			function fitBox(box) {
				var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBox) {
					return minBox.box === box;
				});

				if (minBoxSize) {
					if (box.isHorizontal()) {
						var scaleMargin = {
							left: Math.max(totalLeftBoxesWidth, maxHorizontalLeftPadding),
							right: Math.max(totalRightBoxesWidth, maxHorizontalRightPadding),
							top: 0,
							bottom: 0
						};

						// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
						// on the margin. Sometimes they need to increase in size slightly
						box.update(box.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
					} else {
						box.update(minBoxSize.minSize.width, maxChartAreaHeight);
					}
				}
			}

			// Update, and calculate the left and right margins for the horizontal boxes
			helpers.each(leftBoxes.concat(rightBoxes), fitBox);

			helpers.each(leftBoxes, function(box) {
				totalLeftBoxesWidth += box.width;
			});

			helpers.each(rightBoxes, function(box) {
				totalRightBoxesWidth += box.width;
			});

			// Set the Left and Right margins for the horizontal boxes
			helpers.each(topBoxes.concat(bottomBoxes), fitBox);

			// Figure out how much margin is on the top and bottom of the vertical boxes
			helpers.each(topBoxes, function(box) {
				totalTopBoxesHeight += box.height;
			});

			helpers.each(bottomBoxes, function(box) {
				totalBottomBoxesHeight += box.height;
			});

			function finalFitVerticalBox(box) {
				var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minSize) {
					return minSize.box === box;
				});

				var scaleMargin = {
					left: 0,
					right: 0,
					top: totalTopBoxesHeight,
					bottom: totalBottomBoxesHeight
				};

				if (minBoxSize) {
					box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
				}
			}

			// Let the left layout know the final margin
			helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);

			// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
			totalLeftBoxesWidth = leftPadding;
			totalRightBoxesWidth = rightPadding;
			totalTopBoxesHeight = topPadding;
			totalBottomBoxesHeight = bottomPadding;

			helpers.each(leftBoxes, function(box) {
				totalLeftBoxesWidth += box.width;
			});

			helpers.each(rightBoxes, function(box) {
				totalRightBoxesWidth += box.width;
			});

			helpers.each(topBoxes, function(box) {
				totalTopBoxesHeight += box.height;
			});
			helpers.each(bottomBoxes, function(box) {
				totalBottomBoxesHeight += box.height;
			});

			// We may be adding some padding to account for rotated x axis labels
			var leftPaddingAddition = Math.max(maxHorizontalLeftPadding - totalLeftBoxesWidth, 0);
			totalLeftBoxesWidth += leftPaddingAddition;
			totalRightBoxesWidth += Math.max(maxHorizontalRightPadding - totalRightBoxesWidth, 0);

			var topPaddingAddition = Math.max(maxVerticalTopPadding - totalTopBoxesHeight, 0);
			totalTopBoxesHeight += topPaddingAddition;
			totalBottomBoxesHeight += Math.max(maxVerticalBottomPadding - totalBottomBoxesHeight, 0);

			// Figure out if our chart area changed. This would occur if the dataset layout label rotation
			// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
			// without calling `fit` again
			var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
			var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;

			if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
				helpers.each(leftBoxes, function(box) {
					box.height = newMaxChartAreaHeight;
				});

				helpers.each(rightBoxes, function(box) {
					box.height = newMaxChartAreaHeight;
				});

				helpers.each(topBoxes, function(box) {
					if (!box.fullWidth) {
						box.width = newMaxChartAreaWidth;
					}
				});

				helpers.each(bottomBoxes, function(box) {
					if (!box.fullWidth) {
						box.width = newMaxChartAreaWidth;
					}
				});

				maxChartAreaHeight = newMaxChartAreaHeight;
				maxChartAreaWidth = newMaxChartAreaWidth;
			}

			// Step 7 - Position the boxes
			var left = leftPadding + leftPaddingAddition;
			var top = topPadding + topPaddingAddition;

			function placeBox(box) {
				if (box.isHorizontal()) {
					box.left = box.fullWidth ? leftPadding : totalLeftBoxesWidth;
					box.right = box.fullWidth ? width - rightPadding : totalLeftBoxesWidth + maxChartAreaWidth;
					box.top = top;
					box.bottom = top + box.height;

					// Move to next point
					top = box.bottom;

				} else {

					box.left = left;
					box.right = left + box.width;
					box.top = totalTopBoxesHeight;
					box.bottom = totalTopBoxesHeight + maxChartAreaHeight;

					// Move to next point
					left = box.right;
				}
			}

			helpers.each(leftBoxes.concat(topBoxes), placeBox);

			// Account for chart width and height
			left += maxChartAreaWidth;
			top += maxChartAreaHeight;

			helpers.each(rightBoxes, placeBox);
			helpers.each(bottomBoxes, placeBox);

			// Step 8
			chart.chartArea = {
				left: totalLeftBoxesWidth,
				top: totalTopBoxesHeight,
				right: totalLeftBoxesWidth + maxChartAreaWidth,
				bottom: totalTopBoxesHeight + maxChartAreaHeight
			};

			// Step 9
			helpers.each(chartAreaBoxes, function(box) {
				box.left = chart.chartArea.left;
				box.top = chart.chartArea.top;
				box.right = chart.chartArea.right;
				box.bottom = chart.chartArea.bottom;

				box.update(maxChartAreaWidth, maxChartAreaHeight);
			});
		}
	};
};

},{"45":45}],31:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

defaults._set('global', {
	plugins: {}
});

module.exports = function(Chart) {

	/**
	 * The plugin service singleton
	 * @namespace Chart.plugins
	 * @since 2.1.0
	 */
	Chart.plugins = {
		/**
		 * Globally registered plugins.
		 * @private
		 */
		_plugins: [],

		/**
		 * This identifier is used to invalidate the descriptors cache attached to each chart
		 * when a global plugin is registered or unregistered. In this case, the cache ID is
		 * incremented and descriptors are regenerated during following API calls.
		 * @private
		 */
		_cacheId: 0,

		/**
		 * Registers the given plugin(s) if not already registered.
		 * @param {Array|Object} plugins plugin instance(s).
		 */
		register: function(plugins) {
			var p = this._plugins;
			([]).concat(plugins).forEach(function(plugin) {
				if (p.indexOf(plugin) === -1) {
					p.push(plugin);
				}
			});

			this._cacheId++;
		},

		/**
		 * Unregisters the given plugin(s) only if registered.
		 * @param {Array|Object} plugins plugin instance(s).
		 */
		unregister: function(plugins) {
			var p = this._plugins;
			([]).concat(plugins).forEach(function(plugin) {
				var idx = p.indexOf(plugin);
				if (idx !== -1) {
					p.splice(idx, 1);
				}
			});

			this._cacheId++;
		},

		/**
		 * Remove all registered plugins.
		 * @since 2.1.5
		 */
		clear: function() {
			this._plugins = [];
			this._cacheId++;
		},

		/**
		 * Returns the number of registered plugins?
		 * @returns {Number}
		 * @since 2.1.5
		 */
		count: function() {
			return this._plugins.length;
		},

		/**
		 * Returns all registered plugin instances.
		 * @returns {Array} array of plugin objects.
		 * @since 2.1.5
		 */
		getAll: function() {
			return this._plugins;
		},

		/**
		 * Calls enabled plugins for `chart` on the specified hook and with the given args.
		 * This method immediately returns as soon as a plugin explicitly returns false. The
		 * returned value can be used, for instance, to interrupt the current action.
		 * @param {Object} chart - The chart instance for which plugins should be called.
		 * @param {String} hook - The name of the plugin method to call (e.g. 'beforeUpdate').
		 * @param {Array} [args] - Extra arguments to apply to the hook call.
		 * @returns {Boolean} false if any of the plugins return false, else returns true.
		 */
		notify: function(chart, hook, args) {
			var descriptors = this.descriptors(chart);
			var ilen = descriptors.length;
			var i, descriptor, plugin, params, method;

			for (i = 0; i < ilen; ++i) {
				descriptor = descriptors[i];
				plugin = descriptor.plugin;
				method = plugin[hook];
				if (typeof method === 'function') {
					params = [chart].concat(args || []);
					params.push(descriptor.options);
					if (method.apply(plugin, params) === false) {
						return false;
					}
				}
			}

			return true;
		},

		/**
		 * Returns descriptors of enabled plugins for the given chart.
		 * @returns {Array} [{ plugin, options }]
		 * @private
		 */
		descriptors: function(chart) {
			var cache = chart._plugins || (chart._plugins = {});
			if (cache.id === this._cacheId) {
				return cache.descriptors;
			}

			var plugins = [];
			var descriptors = [];
			var config = (chart && chart.config) || {};
			var options = (config.options && config.options.plugins) || {};

			this._plugins.concat(config.plugins || []).forEach(function(plugin) {
				var idx = plugins.indexOf(plugin);
				if (idx !== -1) {
					return;
				}

				var id = plugin.id;
				var opts = options[id];
				if (opts === false) {
					return;
				}

				if (opts === true) {
					opts = helpers.clone(defaults.global.plugins[id]);
				}

				plugins.push(plugin);
				descriptors.push({
					plugin: plugin,
					options: opts || {}
				});
			});

			cache.descriptors = descriptors;
			cache.id = this._cacheId;
			return descriptors;
		}
	};

	/**
	 * Plugin extension hooks.
	 * @interface IPlugin
	 * @since 2.1.0
	 */
	/**
	 * @method IPlugin#beforeInit
	 * @desc Called before initializing `chart`.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#afterInit
	 * @desc Called after `chart` has been initialized and before the first update.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeUpdate
	 * @desc Called before updating `chart`. If any plugin returns `false`, the update
	 * is cancelled (and thus subsequent render(s)) until another `update` is triggered.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart update.
	 */
	/**
	 * @method IPlugin#afterUpdate
	 * @desc Called after `chart` has been updated and before rendering. Note that this
	 * hook will not be called if the chart update has been previously cancelled.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeDatasetsUpdate
 	 * @desc Called before updating the `chart` datasets. If any plugin returns `false`,
	 * the datasets update is cancelled until another `update` is triggered.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} false to cancel the datasets update.
	 * @since version 2.1.5
	 */
	/**
	 * @method IPlugin#afterDatasetsUpdate
	 * @desc Called after the `chart` datasets have been updated. Note that this hook
	 * will not be called if the datasets update has been previously cancelled.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 * @since version 2.1.5
	 */
	/**
	 * @method IPlugin#beforeDatasetUpdate
 	 * @desc Called before updating the `chart` dataset at the given `args.index`. If any plugin
	 * returns `false`, the datasets update is cancelled until another `update` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {Object} args - The call arguments.
	 * @param {Number} args.index - The dataset index.
	 * @param {Object} args.meta - The dataset metadata.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart datasets drawing.
	 */
	/**
	 * @method IPlugin#afterDatasetUpdate
 	 * @desc Called after the `chart` datasets at the given `args.index` has been updated. Note
	 * that this hook will not be called if the datasets update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {Object} args - The call arguments.
	 * @param {Number} args.index - The dataset index.
	 * @param {Object} args.meta - The dataset metadata.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeLayout
	 * @desc Called before laying out `chart`. If any plugin returns `false`,
	 * the layout update is cancelled until another `update` is triggered.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart layout.
	 */
	/**
	 * @method IPlugin#afterLayout
	 * @desc Called after the `chart` has been layed out. Note that this hook will not
	 * be called if the layout update has been previously cancelled.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeRender
	 * @desc Called before rendering `chart`. If any plugin returns `false`,
	 * the rendering is cancelled until another `render` is triggered.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart rendering.
	 */
	/**
	 * @method IPlugin#afterRender
	 * @desc Called after the `chart` has been fully rendered (and animation completed). Note
	 * that this hook will not be called if the rendering has been previously cancelled.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeDraw
	 * @desc Called before drawing `chart` at every animation frame specified by the given
	 * easing value. If any plugin returns `false`, the frame drawing is cancelled until
	 * another `render` is triggered.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart drawing.
	 */
	/**
	 * @method IPlugin#afterDraw
	 * @desc Called after the `chart` has been drawn for the specific easing value. Note
	 * that this hook will not be called if the drawing has been previously cancelled.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeDatasetsDraw
 	 * @desc Called before drawing the `chart` datasets. If any plugin returns `false`,
	 * the datasets drawing is cancelled until another `render` is triggered.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart datasets drawing.
	 */
	/**
	 * @method IPlugin#afterDatasetsDraw
	 * @desc Called after the `chart` datasets have been drawn. Note that this hook
	 * will not be called if the datasets drawing has been previously cancelled.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#beforeDatasetDraw
 	 * @desc Called before drawing the `chart` dataset at the given `args.index` (datasets
	 * are drawn in the reverse order). If any plugin returns `false`, the datasets drawing
	 * is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {Object} args - The call arguments.
	 * @param {Number} args.index - The dataset index.
	 * @param {Object} args.meta - The dataset metadata.
	 * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart datasets drawing.
	 */
	/**
	 * @method IPlugin#afterDatasetDraw
 	 * @desc Called after the `chart` datasets at the given `args.index` have been drawn
	 * (datasets are drawn in the reverse order). Note that this hook will not be called
	 * if the datasets drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {Object} args - The call arguments.
	 * @param {Number} args.index - The dataset index.
	 * @param {Object} args.meta - The dataset metadata.
	 * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 */
	/**
  	 * @method IPlugin#beforeTooltipDraw
	 * @desc Called before drawing the `tooltip`. If any plugin returns `false`,
	 * the tooltip drawing is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {Object} args - The call arguments.
	 * @param {Object} args.tooltip - The tooltip.
	 * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
	 * @param {Object} options - The plugin options.
	 * @returns {Boolean} `false` to cancel the chart tooltip drawing.
  	 */
	/**
 	 * @method IPlugin#afterTooltipDraw
  	 * @desc Called after drawing the `tooltip`. Note that this hook will not
 	 * be called if the tooltip drawing has been previously cancelled.
 	 * @param {Chart} chart - The chart instance.
 	 * @param {Object} args - The call arguments.
 	 * @param {Object} args.tooltip - The tooltip.
	 * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
 	 * @param {Object} options - The plugin options.
 	 */
	/**
	 * @method IPlugin#beforeEvent
 	 * @desc Called before processing the specified `event`. If any plugin returns `false`,
	 * the event will be discarded.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {IEvent} event - The event object.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#afterEvent
	 * @desc Called after the `event` has been consumed. Note that this hook
	 * will not be called if the `event` has been previously discarded.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {IEvent} event - The event object.
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#resize
	 * @desc Called after the chart as been resized.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Number} size - The new canvas display size (eq. canvas.style width & height).
	 * @param {Object} options - The plugin options.
	 */
	/**
	 * @method IPlugin#destroy
	 * @desc Called after the chart as been destroyed.
	 * @param {Chart.Controller} chart - The chart instance.
	 * @param {Object} options - The plugin options.
	 */

	/**
	 * Provided for backward compatibility, use Chart.plugins instead
	 * @namespace Chart.pluginService
	 * @deprecated since version 2.1.5
	 * @todo remove at version 3
	 * @private
	 */
	Chart.pluginService = Chart.plugins;

	/**
	 * Provided for backward compatibility, inheriting from Chart.PlugingBase has no
	 * effect, instead simply create/register plugins via plain JavaScript objects.
	 * @interface Chart.PluginBase
	 * @deprecated since version 2.5.0
	 * @todo remove at version 3
	 * @private
	 */
	Chart.PluginBase = Element.extend({});
};

},{"25":25,"26":26,"45":45}],32:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);
var Ticks = require(34);

defaults._set('scale', {
	display: true,
	position: 'left',
	offset: false,

	// grid line settings
	gridLines: {
		display: true,
		color: 'rgba(0, 0, 0, 0.1)',
		lineWidth: 1,
		drawBorder: true,
		drawOnChartArea: true,
		drawTicks: true,
		tickMarkLength: 10,
		zeroLineWidth: 1,
		zeroLineColor: 'rgba(0,0,0,0.25)',
		zeroLineBorderDash: [],
		zeroLineBorderDashOffset: 0.0,
		offsetGridLines: false,
		borderDash: [],
		borderDashOffset: 0.0
	},

	// scale label
	scaleLabel: {
		// display property
		display: false,

		// actual label
		labelString: '',

		// line height
		lineHeight: 1.2,

		// top/bottom padding
		padding: {
			top: 4,
			bottom: 4
		}
	},

	// label settings
	ticks: {
		beginAtZero: false,
		minRotation: 0,
		maxRotation: 50,
		mirror: false,
		padding: 0,
		reverse: false,
		display: true,
		autoSkip: true,
		autoSkipPadding: 0,
		labelOffset: 0,
		// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
		callback: Ticks.formatters.values,
		minor: {},
		major: {}
	}
});

function labelsFromTicks(ticks) {
	var labels = [];
	var i, ilen;

	for (i = 0, ilen = ticks.length; i < ilen; ++i) {
		labels.push(ticks[i].label);
	}

	return labels;
}

function getLineValue(scale, index, offsetGridLines) {
	var lineValue = scale.getPixelForTick(index);

	if (offsetGridLines) {
		if (index === 0) {
			lineValue -= (scale.getPixelForTick(1) - lineValue) / 2;
		} else {
			lineValue -= (lineValue - scale.getPixelForTick(index - 1)) / 2;
		}
	}
	return lineValue;
}

module.exports = function(Chart) {

	function computeTextSize(context, tick, font) {
		return helpers.isArray(tick) ?
			helpers.longestText(context, font, tick) :
			context.measureText(tick).width;
	}

	function parseFontOptions(options) {
		var valueOrDefault = helpers.valueOrDefault;
		var globalDefaults = defaults.global;
		var size = valueOrDefault(options.fontSize, globalDefaults.defaultFontSize);
		var style = valueOrDefault(options.fontStyle, globalDefaults.defaultFontStyle);
		var family = valueOrDefault(options.fontFamily, globalDefaults.defaultFontFamily);

		return {
			size: size,
			style: style,
			family: family,
			font: helpers.fontString(size, style, family)
		};
	}

	function parseLineHeight(options) {
		return helpers.options.toLineHeight(
			helpers.valueOrDefault(options.lineHeight, 1.2),
			helpers.valueOrDefault(options.fontSize, defaults.global.defaultFontSize));
	}

	Chart.Scale = Element.extend({
		/**
		 * Get the padding needed for the scale
		 * @method getPadding
		 * @private
		 * @returns {Padding} the necessary padding
		 */
		getPadding: function() {
			var me = this;
			return {
				left: me.paddingLeft || 0,
				top: me.paddingTop || 0,
				right: me.paddingRight || 0,
				bottom: me.paddingBottom || 0
			};
		},

		/**
		 * Returns the scale tick objects ({label, major})
		 * @since 2.7
		 */
		getTicks: function() {
			return this._ticks;
		},

		// These methods are ordered by lifecyle. Utilities then follow.
		// Any function defined here is inherited by all scale types.
		// Any function can be extended by the scale type

		mergeTicksOptions: function() {
			var ticks = this.options.ticks;
			if (ticks.minor === false) {
				ticks.minor = {
					display: false
				};
			}
			if (ticks.major === false) {
				ticks.major = {
					display: false
				};
			}
			for (var key in ticks) {
				if (key !== 'major' && key !== 'minor') {
					if (typeof ticks.minor[key] === 'undefined') {
						ticks.minor[key] = ticks[key];
					}
					if (typeof ticks.major[key] === 'undefined') {
						ticks.major[key] = ticks[key];
					}
				}
			}
		},
		beforeUpdate: function() {
			helpers.callback(this.options.beforeUpdate, [this]);
		},
		update: function(maxWidth, maxHeight, margins) {
			var me = this;
			var i, ilen, labels, label, ticks, tick;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = helpers.extend({
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}, margins);
			me.longestTextCache = me.longestTextCache || {};

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();

			// Data min/max
			me.beforeDataLimits();
			me.determineDataLimits();
			me.afterDataLimits();

			// Ticks - `this.ticks` is now DEPRECATED!
			// Internal ticks are now stored as objects in the PRIVATE `this._ticks` member
			// and must not be accessed directly from outside this class. `this.ticks` being
			// around for long time and not marked as private, we can't change its structure
			// without unexpected breaking changes. If you need to access the scale ticks,
			// use scale.getTicks() instead.

			me.beforeBuildTicks();

			// New implementations should return an array of objects but for BACKWARD COMPAT,
			// we still support no return (`this.ticks` internally set by calling this method).
			ticks = me.buildTicks() || [];

			me.afterBuildTicks();

			me.beforeTickToLabelConversion();

			// New implementations should return the formatted tick labels but for BACKWARD
			// COMPAT, we still support no return (`this.ticks` internally changed by calling
			// this method and supposed to contain only string values).
			labels = me.convertTicksToLabels(ticks) || me.ticks;

			me.afterTickToLabelConversion();

			me.ticks = labels;   // BACKWARD COMPATIBILITY

			// IMPORTANT: from this point, we consider that `this.ticks` will NEVER change!

			// BACKWARD COMPAT: synchronize `_ticks` with labels (so potentially `this.ticks`)
			for (i = 0, ilen = labels.length; i < ilen; ++i) {
				label = labels[i];
				tick = ticks[i];
				if (!tick) {
					ticks.push(tick = {
						label: label,
						major: false
					});
				} else {
					tick.label = label;
				}
			}

			me._ticks = ticks;

			// Tick Rotation
			me.beforeCalculateTickRotation();
			me.calculateTickRotation();
			me.afterCalculateTickRotation();
			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;

		},
		afterUpdate: function() {
			helpers.callback(this.options.afterUpdate, [this]);
		},

		//

		beforeSetDimensions: function() {
			helpers.callback(this.options.beforeSetDimensions, [this]);
		},
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;
		},
		afterSetDimensions: function() {
			helpers.callback(this.options.afterSetDimensions, [this]);
		},

		// Data limits
		beforeDataLimits: function() {
			helpers.callback(this.options.beforeDataLimits, [this]);
		},
		determineDataLimits: helpers.noop,
		afterDataLimits: function() {
			helpers.callback(this.options.afterDataLimits, [this]);
		},

		//
		beforeBuildTicks: function() {
			helpers.callback(this.options.beforeBuildTicks, [this]);
		},
		buildTicks: helpers.noop,
		afterBuildTicks: function() {
			helpers.callback(this.options.afterBuildTicks, [this]);
		},

		beforeTickToLabelConversion: function() {
			helpers.callback(this.options.beforeTickToLabelConversion, [this]);
		},
		convertTicksToLabels: function() {
			var me = this;
			// Convert ticks to strings
			var tickOpts = me.options.ticks;
			me.ticks = me.ticks.map(tickOpts.userCallback || tickOpts.callback, this);
		},
		afterTickToLabelConversion: function() {
			helpers.callback(this.options.afterTickToLabelConversion, [this]);
		},

		//

		beforeCalculateTickRotation: function() {
			helpers.callback(this.options.beforeCalculateTickRotation, [this]);
		},
		calculateTickRotation: function() {
			var me = this;
			var context = me.ctx;
			var tickOpts = me.options.ticks;
			var labels = labelsFromTicks(me._ticks);

			// Get the width of each grid by calculating the difference
			// between x offsets between 0 and 1.
			var tickFont = parseFontOptions(tickOpts);
			context.font = tickFont.font;

			var labelRotation = tickOpts.minRotation || 0;

			if (labels.length && me.options.display && me.isHorizontal()) {
				var originalLabelWidth = helpers.longestText(context, tickFont.font, labels, me.longestTextCache);
				var labelWidth = originalLabelWidth;
				var cosRotation, sinRotation;

				// Allow 3 pixels x2 padding either side for label readability
				var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;

				// Max label rotation can be set or default to 90 - also act as a loop counter
				while (labelWidth > tickWidth && labelRotation < tickOpts.maxRotation) {
					var angleRadians = helpers.toRadians(labelRotation);
					cosRotation = Math.cos(angleRadians);
					sinRotation = Math.sin(angleRadians);

					if (sinRotation * originalLabelWidth > me.maxHeight) {
						// go back one step
						labelRotation--;
						break;
					}

					labelRotation++;
					labelWidth = cosRotation * originalLabelWidth;
				}
			}

			me.labelRotation = labelRotation;
		},
		afterCalculateTickRotation: function() {
			helpers.callback(this.options.afterCalculateTickRotation, [this]);
		},

		//

		beforeFit: function() {
			helpers.callback(this.options.beforeFit, [this]);
		},
		fit: function() {
			var me = this;
			// Reset
			var minSize = me.minSize = {
				width: 0,
				height: 0
			};

			var labels = labelsFromTicks(me._ticks);

			var opts = me.options;
			var tickOpts = opts.ticks;
			var scaleLabelOpts = opts.scaleLabel;
			var gridLineOpts = opts.gridLines;
			var display = opts.display;
			var isHorizontal = me.isHorizontal();

			var tickFont = parseFontOptions(tickOpts);
			var tickMarkLength = opts.gridLines.tickMarkLength;

			// Width
			if (isHorizontal) {
				// subtract the margins to line up with the chartArea if we are a full width scale
				minSize.width = me.isFullWidth() ? me.maxWidth - me.margins.left - me.margins.right : me.maxWidth;
			} else {
				minSize.width = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
			}

			// height
			if (isHorizontal) {
				minSize.height = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
			} else {
				minSize.height = me.maxHeight; // fill all the height
			}

			// Are we showing a title for the scale?
			if (scaleLabelOpts.display && display) {
				var scaleLabelLineHeight = parseLineHeight(scaleLabelOpts);
				var scaleLabelPadding = helpers.options.toPadding(scaleLabelOpts.padding);
				var deltaHeight = scaleLabelLineHeight + scaleLabelPadding.height;

				if (isHorizontal) {
					minSize.height += deltaHeight;
				} else {
					minSize.width += deltaHeight;
				}
			}

			// Don't bother fitting the ticks if we are not showing them
			if (tickOpts.display && display) {
				var largestTextWidth = helpers.longestText(me.ctx, tickFont.font, labels, me.longestTextCache);
				var tallestLabelHeightInLines = helpers.numberOfLabelLines(labels);
				var lineSpace = tickFont.size * 0.5;
				var tickPadding = me.options.ticks.padding;

				if (isHorizontal) {
					// A horizontal axis is more constrained by the height.
					me.longestLabelWidth = largestTextWidth;

					var angleRadians = helpers.toRadians(me.labelRotation);
					var cosRotation = Math.cos(angleRadians);
					var sinRotation = Math.sin(angleRadians);

					// TODO - improve this calculation
					var labelHeight = (sinRotation * largestTextWidth)
						+ (tickFont.size * tallestLabelHeightInLines)
						+ (lineSpace * (tallestLabelHeightInLines - 1))
						+ lineSpace; // padding

					minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);

					me.ctx.font = tickFont.font;
					var firstLabelWidth = computeTextSize(me.ctx, labels[0], tickFont.font);
					var lastLabelWidth = computeTextSize(me.ctx, labels[labels.length - 1], tickFont.font);

					// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned
					// which means that the right padding is dominated by the font height
					if (me.labelRotation !== 0) {
						me.paddingLeft = opts.position === 'bottom' ? (cosRotation * firstLabelWidth) + 3 : (cosRotation * lineSpace) + 3; // add 3 px to move away from canvas edges
						me.paddingRight = opts.position === 'bottom' ? (cosRotation * lineSpace) + 3 : (cosRotation * lastLabelWidth) + 3;
					} else {
						me.paddingLeft = firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
						me.paddingRight = lastLabelWidth / 2 + 3;
					}
				} else {
					// A vertical axis is more constrained by the width. Labels are the
					// dominant factor here, so get that length first and account for padding
					if (tickOpts.mirror) {
						largestTextWidth = 0;
					} else {
						// use lineSpace for consistency with horizontal axis
						// tickPadding is not implemented for horizontal
						largestTextWidth += tickPadding + lineSpace;
					}

					minSize.width = Math.min(me.maxWidth, minSize.width + largestTextWidth);

					me.paddingTop = tickFont.size / 2;
					me.paddingBottom = tickFont.size / 2;
				}
			}

			me.handleMargins();

			me.width = minSize.width;
			me.height = minSize.height;
		},

		/**
		 * Handle margins and padding interactions
		 * @private
		 */
		handleMargins: function() {
			var me = this;
			if (me.margins) {
				me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
				me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
				me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
				me.paddingBottom = Math.max(me.paddingBottom - me.margins.bottom, 0);
			}
		},

		afterFit: function() {
			helpers.callback(this.options.afterFit, [this]);
		},

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === 'top' || this.options.position === 'bottom';
		},
		isFullWidth: function() {
			return (this.options.fullWidth);
		},

		// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
		getRightValue: function(rawValue) {
			// Null and undefined values first
			if (helpers.isNullOrUndef(rawValue)) {
				return NaN;
			}
			// isNaN(object) returns true, so make sure NaN is checking for a number; Discard Infinite values
			if (typeof rawValue === 'number' && !isFinite(rawValue)) {
				return NaN;
			}
			// If it is in fact an object, dive in one more level
			if (rawValue) {
				if (this.isHorizontal()) {
					if (rawValue.x !== undefined) {
						return this.getRightValue(rawValue.x);
					}
				} else if (rawValue.y !== undefined) {
					return this.getRightValue(rawValue.y);
				}
			}

			// Value is good, return it
			return rawValue;
		},

		/**
		 * Used to get the value to display in the tooltip for the data at the given index
		 * @param index
		 * @param datasetIndex
		 */
		getLabelForIndex: helpers.noop,

		/**
		 * Returns the location of the given data point. Value can either be an index or a numerical value
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 * @param value
		 * @param index
		 * @param datasetIndex
		 */
		getPixelForValue: helpers.noop,

		/**
		 * Used to get the data value from a given pixel. This is the inverse of getPixelForValue
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 * @param pixel
		 */
		getValueForPixel: helpers.noop,

		/**
		 * Returns the location of the tick at the given index
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 */
		getPixelForTick: function(index) {
			var me = this;
			var offset = me.options.offset;
			if (me.isHorizontal()) {
				var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
				var tickWidth = innerWidth / Math.max((me._ticks.length - (offset ? 0 : 1)), 1);
				var pixel = (tickWidth * index) + me.paddingLeft;

				if (offset) {
					pixel += tickWidth / 2;
				}

				var finalVal = me.left + Math.round(pixel);
				finalVal += me.isFullWidth() ? me.margins.left : 0;
				return finalVal;
			}
			var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
			return me.top + (index * (innerHeight / (me._ticks.length - 1)));
		},

		/**
		 * Utility for getting the pixel location of a percentage of scale
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 */
		getPixelForDecimal: function(decimal) {
			var me = this;
			if (me.isHorizontal()) {
				var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
				var valueOffset = (innerWidth * decimal) + me.paddingLeft;

				var finalVal = me.left + Math.round(valueOffset);
				finalVal += me.isFullWidth() ? me.margins.left : 0;
				return finalVal;
			}
			return me.top + (decimal * me.height);
		},

		/**
		 * Returns the pixel for the minimum chart value
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 */
		getBasePixel: function() {
			return this.getPixelForValue(this.getBaseValue());
		},

		getBaseValue: function() {
			var me = this;
			var min = me.min;
			var max = me.max;

			return me.beginAtZero ? 0 :
				min < 0 && max < 0 ? max :
				min > 0 && max > 0 ? min :
				0;
		},

		/**
		 * Returns a subset of ticks to be plotted to avoid overlapping labels.
		 * @private
		 */
		_autoSkip: function(ticks) {
			var skipRatio;
			var me = this;
			var isHorizontal = me.isHorizontal();
			var optionTicks = me.options.ticks.minor;
			var tickCount = ticks.length;
			var labelRotationRadians = helpers.toRadians(me.labelRotation);
			var cosRotation = Math.cos(labelRotationRadians);
			var longestRotatedLabel = me.longestLabelWidth * cosRotation;
			var result = [];
			var i, tick, shouldSkip;

			// figure out the maximum number of gridlines to show
			var maxTicks;
			if (optionTicks.maxTicksLimit) {
				maxTicks = optionTicks.maxTicksLimit;
			}

			if (isHorizontal) {
				skipRatio = false;

				if ((longestRotatedLabel + optionTicks.autoSkipPadding) * tickCount > (me.width - (me.paddingLeft + me.paddingRight))) {
					skipRatio = 1 + Math.floor(((longestRotatedLabel + optionTicks.autoSkipPadding) * tickCount) / (me.width - (me.paddingLeft + me.paddingRight)));
				}

				// if they defined a max number of optionTicks,
				// increase skipRatio until that number is met
				if (maxTicks && tickCount > maxTicks) {
					skipRatio = Math.max(skipRatio, Math.floor(tickCount / maxTicks));
				}
			}

			for (i = 0; i < tickCount; i++) {
				tick = ticks[i];

				// Since we always show the last tick,we need may need to hide the last shown one before
				shouldSkip = (skipRatio > 1 && i % skipRatio > 0) || (i % skipRatio === 0 && i + skipRatio >= tickCount);
				if (shouldSkip && i !== tickCount - 1) {
					// leave tick in place but make sure it's not displayed (#4635)
					delete tick.label;
				}
				result.push(tick);
			}
			return result;
		},

		// Actually draw the scale on the canvas
		// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
		draw: function(chartArea) {
			var me = this;
			var options = me.options;
			if (!options.display) {
				return;
			}

			var context = me.ctx;
			var globalDefaults = defaults.global;
			var optionTicks = options.ticks.minor;
			var optionMajorTicks = options.ticks.major || optionTicks;
			var gridLines = options.gridLines;
			var scaleLabel = options.scaleLabel;

			var isRotated = me.labelRotation !== 0;
			var isHorizontal = me.isHorizontal();

			var ticks = optionTicks.autoSkip ? me._autoSkip(me.getTicks()) : me.getTicks();
			var tickFontColor = helpers.valueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
			var tickFont = parseFontOptions(optionTicks);
			var majorTickFontColor = helpers.valueOrDefault(optionMajorTicks.fontColor, globalDefaults.defaultFontColor);
			var majorTickFont = parseFontOptions(optionMajorTicks);

			var tl = gridLines.drawTicks ? gridLines.tickMarkLength : 0;

			var scaleLabelFontColor = helpers.valueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
			var scaleLabelFont = parseFontOptions(scaleLabel);
			var scaleLabelPadding = helpers.options.toPadding(scaleLabel.padding);
			var labelRotationRadians = helpers.toRadians(me.labelRotation);

			var itemsToDraw = [];

			var xTickStart = options.position === 'right' ? me.left : me.right - tl;
			var xTickEnd = options.position === 'right' ? me.left + tl : me.right;
			var yTickStart = options.position === 'bottom' ? me.top : me.bottom - tl;
			var yTickEnd = options.position === 'bottom' ? me.top + tl : me.bottom;

			helpers.each(ticks, function(tick, index) {
				// autoskipper skipped this tick (#4635)
				if (helpers.isNullOrUndef(tick.label)) {
					return;
				}

				var label = tick.label;
				var lineWidth, lineColor, borderDash, borderDashOffset;
				if (index === me.zeroLineIndex && options.offset === gridLines.offsetGridLines) {
					// Draw the first index specially
					lineWidth = gridLines.zeroLineWidth;
					lineColor = gridLines.zeroLineColor;
					borderDash = gridLines.zeroLineBorderDash;
					borderDashOffset = gridLines.zeroLineBorderDashOffset;
				} else {
					lineWidth = helpers.valueAtIndexOrDefault(gridLines.lineWidth, index);
					lineColor = helpers.valueAtIndexOrDefault(gridLines.color, index);
					borderDash = helpers.valueOrDefault(gridLines.borderDash, globalDefaults.borderDash);
					borderDashOffset = helpers.valueOrDefault(gridLines.borderDashOffset, globalDefaults.borderDashOffset);
				}

				// Common properties
				var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
				var textAlign = 'middle';
				var textBaseline = 'middle';
				var tickPadding = optionTicks.padding;

				if (isHorizontal) {
					var labelYOffset = tl + tickPadding;

					if (options.position === 'bottom') {
						// bottom
						textBaseline = !isRotated ? 'top' : 'middle';
						textAlign = !isRotated ? 'center' : 'right';
						labelY = me.top + labelYOffset;
					} else {
						// top
						textBaseline = !isRotated ? 'bottom' : 'middle';
						textAlign = !isRotated ? 'center' : 'left';
						labelY = me.bottom - labelYOffset;
					}

					var xLineValue = getLineValue(me, index, gridLines.offsetGridLines && ticks.length > 1);
					if (xLineValue < me.left) {
						lineColor = 'rgba(0,0,0,0)';
					}
					xLineValue += helpers.aliasPixel(lineWidth);

					labelX = me.getPixelForTick(index) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)

					tx1 = tx2 = x1 = x2 = xLineValue;
					ty1 = yTickStart;
					ty2 = yTickEnd;
					y1 = chartArea.top;
					y2 = chartArea.bottom;
				} else {
					var isLeft = options.position === 'left';
					var labelXOffset;

					if (optionTicks.mirror) {
						textAlign = isLeft ? 'left' : 'right';
						labelXOffset = tickPadding;
					} else {
						textAlign = isLeft ? 'right' : 'left';
						labelXOffset = tl + tickPadding;
					}

					labelX = isLeft ? me.right - labelXOffset : me.left + labelXOffset;

					var yLineValue = getLineValue(me, index, gridLines.offsetGridLines && ticks.length > 1);
					if (yLineValue < me.top) {
						lineColor = 'rgba(0,0,0,0)';
					}
					yLineValue += helpers.aliasPixel(lineWidth);

					labelY = me.getPixelForTick(index) + optionTicks.labelOffset;

					tx1 = xTickStart;
					tx2 = xTickEnd;
					x1 = chartArea.left;
					x2 = chartArea.right;
					ty1 = ty2 = y1 = y2 = yLineValue;
				}

				itemsToDraw.push({
					tx1: tx1,
					ty1: ty1,
					tx2: tx2,
					ty2: ty2,
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2,
					labelX: labelX,
					labelY: labelY,
					glWidth: lineWidth,
					glColor: lineColor,
					glBorderDash: borderDash,
					glBorderDashOffset: borderDashOffset,
					rotation: -1 * labelRotationRadians,
					label: label,
					major: tick.major,
					textBaseline: textBaseline,
					textAlign: textAlign
				});
			});

			// Draw all of the tick labels, tick marks, and grid lines at the correct places
			helpers.each(itemsToDraw, function(itemToDraw) {
				if (gridLines.display) {
					context.save();
					context.lineWidth = itemToDraw.glWidth;
					context.strokeStyle = itemToDraw.glColor;
					if (context.setLineDash) {
						context.setLineDash(itemToDraw.glBorderDash);
						context.lineDashOffset = itemToDraw.glBorderDashOffset;
					}

					context.beginPath();

					if (gridLines.drawTicks) {
						context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
						context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
					}

					if (gridLines.drawOnChartArea) {
						context.moveTo(itemToDraw.x1, itemToDraw.y1);
						context.lineTo(itemToDraw.x2, itemToDraw.y2);
					}

					context.stroke();
					context.restore();
				}

				if (optionTicks.display) {
					// Make sure we draw text in the correct color and font
					context.save();
					context.translate(itemToDraw.labelX, itemToDraw.labelY);
					context.rotate(itemToDraw.rotation);
					context.font = itemToDraw.major ? majorTickFont.font : tickFont.font;
					context.fillStyle = itemToDraw.major ? majorTickFontColor : tickFontColor;
					context.textBaseline = itemToDraw.textBaseline;
					context.textAlign = itemToDraw.textAlign;

					var label = itemToDraw.label;
					if (helpers.isArray(label)) {
						for (var i = 0, y = 0; i < label.length; ++i) {
							// We just make sure the multiline element is a string here..
							context.fillText('' + label[i], 0, y);
							// apply same lineSpacing as calculated @ L#320
							y += (tickFont.size * 1.5);
						}
					} else {
						context.fillText(label, 0, 0);
					}
					context.restore();
				}
			});

			if (scaleLabel.display) {
				// Draw the scale label
				var scaleLabelX;
				var scaleLabelY;
				var rotation = 0;
				var halfLineHeight = parseLineHeight(scaleLabel) / 2;

				if (isHorizontal) {
					scaleLabelX = me.left + ((me.right - me.left) / 2); // midpoint of the width
					scaleLabelY = options.position === 'bottom'
						? me.bottom - halfLineHeight - scaleLabelPadding.bottom
						: me.top + halfLineHeight + scaleLabelPadding.top;
				} else {
					var isLeft = options.position === 'left';
					scaleLabelX = isLeft
						? me.left + halfLineHeight + scaleLabelPadding.top
						: me.right - halfLineHeight - scaleLabelPadding.top;
					scaleLabelY = me.top + ((me.bottom - me.top) / 2);
					rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
				}

				context.save();
				context.translate(scaleLabelX, scaleLabelY);
				context.rotate(rotation);
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = scaleLabelFontColor; // render in correct colour
				context.font = scaleLabelFont.font;
				context.fillText(scaleLabel.labelString, 0, 0);
				context.restore();
			}

			if (gridLines.drawBorder) {
				// Draw the line at the edge of the axis
				context.lineWidth = helpers.valueAtIndexOrDefault(gridLines.lineWidth, 0);
				context.strokeStyle = helpers.valueAtIndexOrDefault(gridLines.color, 0);
				var x1 = me.left;
				var x2 = me.right;
				var y1 = me.top;
				var y2 = me.bottom;

				var aliasPixel = helpers.aliasPixel(context.lineWidth);
				if (isHorizontal) {
					y1 = y2 = options.position === 'top' ? me.bottom : me.top;
					y1 += aliasPixel;
					y2 += aliasPixel;
				} else {
					x1 = x2 = options.position === 'left' ? me.right : me.left;
					x1 += aliasPixel;
					x2 += aliasPixel;
				}

				context.beginPath();
				context.moveTo(x1, y1);
				context.lineTo(x2, y2);
				context.stroke();
			}
		}
	});
};

},{"25":25,"26":26,"34":34,"45":45}],33:[function(require,module,exports){
'use strict';

var defaults = require(25);
var helpers = require(45);

module.exports = function(Chart) {

	Chart.scaleService = {
		// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
		// use the new chart options to grab the correct scale
		constructors: {},
		// Use a registration function so that we can move to an ES6 map when we no longer need to support
		// old browsers

		// Scale config defaults
		defaults: {},
		registerScaleType: function(type, scaleConstructor, scaleDefaults) {
			this.constructors[type] = scaleConstructor;
			this.defaults[type] = helpers.clone(scaleDefaults);
		},
		getScaleConstructor: function(type) {
			return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
		},
		getScaleDefaults: function(type) {
			// Return the scale defaults merged with the global settings so that we always use the latest ones
			return this.defaults.hasOwnProperty(type) ? helpers.merge({}, [defaults.scale, this.defaults[type]]) : {};
		},
		updateScaleDefaults: function(type, additions) {
			var me = this;
			if (me.defaults.hasOwnProperty(type)) {
				me.defaults[type] = helpers.extend(me.defaults[type], additions);
			}
		},
		addScalesToLayout: function(chart) {
			// Adds each scale to the chart.boxes array to be sized accordingly
			helpers.each(chart.scales, function(scale) {
				// Set ILayoutItem parameters for backwards compatibility
				scale.fullWidth = scale.options.fullWidth;
				scale.position = scale.options.position;
				scale.weight = scale.options.weight;
				Chart.layoutService.addBox(chart, scale);
			});
		}
	};
};

},{"25":25,"45":45}],34:[function(require,module,exports){
'use strict';

var helpers = require(45);

/**
 * Namespace to hold static tick generation functions
 * @namespace Chart.Ticks
 */
module.exports = {
	/**
	 * Namespace to hold generators for different types of ticks
	 * @namespace Chart.Ticks.generators
	 */
	generators: {
		/**
		 * Interface for the options provided to the numeric tick generator
		 * @interface INumericTickGenerationOptions
		 */
		/**
		 * The maximum number of ticks to display
		 * @name INumericTickGenerationOptions#maxTicks
		 * @type Number
		 */
		/**
		 * The distance between each tick.
		 * @name INumericTickGenerationOptions#stepSize
		 * @type Number
		 * @optional
		 */
		/**
		 * Forced minimum for the ticks. If not specified, the minimum of the data range is used to calculate the tick minimum
		 * @name INumericTickGenerationOptions#min
		 * @type Number
		 * @optional
		 */
		/**
		 * The maximum value of the ticks. If not specified, the maximum of the data range is used to calculate the tick maximum
		 * @name INumericTickGenerationOptions#max
		 * @type Number
		 * @optional
		 */

		/**
		 * Generate a set of linear ticks
		 * @method Chart.Ticks.generators.linear
		 * @param generationOptions {INumericTickGenerationOptions} the options used to generate the ticks
		 * @param dataRange {IRange} the range of the data
		 * @returns {Array<Number>} array of tick values
		 */
		linear: function(generationOptions, dataRange) {
			var ticks = [];
			// To get a "nice" value for the tick spacing, we will use the appropriately named
			// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
			// for details.

			var spacing;
			if (generationOptions.stepSize && generationOptions.stepSize > 0) {
				spacing = generationOptions.stepSize;
			} else {
				var niceRange = helpers.niceNum(dataRange.max - dataRange.min, false);
				spacing = helpers.niceNum(niceRange / (generationOptions.maxTicks - 1), true);
			}
			var niceMin = Math.floor(dataRange.min / spacing) * spacing;
			var niceMax = Math.ceil(dataRange.max / spacing) * spacing;

			// If min, max and stepSize is set and they make an evenly spaced scale use it.
			if (generationOptions.min && generationOptions.max && generationOptions.stepSize) {
				// If very close to our whole number, use it.
				if (helpers.almostWhole((generationOptions.max - generationOptions.min) / generationOptions.stepSize, spacing / 1000)) {
					niceMin = generationOptions.min;
					niceMax = generationOptions.max;
				}
			}

			var numSpaces = (niceMax - niceMin) / spacing;
			// If very close to our rounded value, use it.
			if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
				numSpaces = Math.round(numSpaces);
			} else {
				numSpaces = Math.ceil(numSpaces);
			}

			// Put the values into the ticks array
			ticks.push(generationOptions.min !== undefined ? generationOptions.min : niceMin);
			for (var j = 1; j < numSpaces; ++j) {
				ticks.push(niceMin + (j * spacing));
			}
			ticks.push(generationOptions.max !== undefined ? generationOptions.max : niceMax);

			return ticks;
		},

		/**
		 * Generate a set of logarithmic ticks
		 * @method Chart.Ticks.generators.logarithmic
		 * @param generationOptions {INumericTickGenerationOptions} the options used to generate the ticks
		 * @param dataRange {IRange} the range of the data
		 * @returns {Array<Number>} array of tick values
		 */
		logarithmic: function(generationOptions, dataRange) {
			var ticks = [];
			var valueOrDefault = helpers.valueOrDefault;

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph
			var tickVal = valueOrDefault(generationOptions.min, Math.pow(10, Math.floor(helpers.log10(dataRange.min))));

			var endExp = Math.floor(helpers.log10(dataRange.max));
			var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
			var exp, significand;

			if (tickVal === 0) {
				exp = Math.floor(helpers.log10(dataRange.minNotZero));
				significand = Math.floor(dataRange.minNotZero / Math.pow(10, exp));

				ticks.push(tickVal);
				tickVal = significand * Math.pow(10, exp);
			} else {
				exp = Math.floor(helpers.log10(tickVal));
				significand = Math.floor(tickVal / Math.pow(10, exp));
			}

			do {
				ticks.push(tickVal);

				++significand;
				if (significand === 10) {
					significand = 1;
					++exp;
				}

				tickVal = significand * Math.pow(10, exp);
			} while (exp < endExp || (exp === endExp && significand < endSignificand));

			var lastTick = valueOrDefault(generationOptions.max, tickVal);
			ticks.push(lastTick);

			return ticks;
		}
	},

	/**
	 * Namespace to hold formatters for different types of ticks
	 * @namespace Chart.Ticks.formatters
	 */
	formatters: {
		/**
		 * Formatter for value labels
		 * @method Chart.Ticks.formatters.values
		 * @param value the value to display
		 * @return {String|Array} the label to display
		 */
		values: function(value) {
			return helpers.isArray(value) ? value : '' + value;
		},

		/**
		 * Formatter for linear numeric ticks
		 * @method Chart.Ticks.formatters.linear
		 * @param tickValue {Number} the value to be formatted
		 * @param index {Number} the position of the tickValue parameter in the ticks array
		 * @param ticks {Array<Number>} the list of ticks being converted
		 * @return {String} string representation of the tickValue parameter
		 */
		linear: function(tickValue, index, ticks) {
			// If we have lots of ticks, don't use the ones
			var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];

			// If we have a number like 2.5 as the delta, figure out how many decimal places we need
			if (Math.abs(delta) > 1) {
				if (tickValue !== Math.floor(tickValue)) {
					// not an integer
					delta = tickValue - Math.floor(tickValue);
				}
			}

			var logDelta = helpers.log10(Math.abs(delta));
			var tickString = '';

			if (tickValue !== 0) {
				var numDecimal = -1 * Math.floor(logDelta);
				numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
				tickString = tickValue.toFixed(numDecimal);
			} else {
				tickString = '0'; // never show decimal places for 0
			}

			return tickString;
		},

		logarithmic: function(tickValue, index, ticks) {
			var remain = tickValue / (Math.pow(10, Math.floor(helpers.log10(tickValue))));

			if (tickValue === 0) {
				return '0';
			} else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === ticks.length - 1) {
				return tickValue.toExponential();
			}
			return '';
		}
	}
};

},{"45":45}],35:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

defaults._set('global', {
	tooltips: {
		enabled: true,
		custom: null,
		mode: 'nearest',
		position: 'average',
		intersect: true,
		backgroundColor: 'rgba(0,0,0,0.8)',
		titleFontStyle: 'bold',
		titleSpacing: 2,
		titleMarginBottom: 6,
		titleFontColor: '#fff',
		titleAlign: 'left',
		bodySpacing: 2,
		bodyFontColor: '#fff',
		bodyAlign: 'left',
		footerFontStyle: 'bold',
		footerSpacing: 2,
		footerMarginTop: 6,
		footerFontColor: '#fff',
		footerAlign: 'left',
		yPadding: 6,
		xPadding: 6,
		caretPadding: 2,
		caretSize: 5,
		cornerRadius: 6,
		multiKeyBackground: '#fff',
		displayColors: true,
		borderColor: 'rgba(0,0,0,0)',
		borderWidth: 0,
		callbacks: {
			// Args are: (tooltipItems, data)
			beforeTitle: helpers.noop,
			title: function(tooltipItems, data) {
				// Pick first xLabel for now
				var title = '';
				var labels = data.labels;
				var labelCount = labels ? labels.length : 0;

				if (tooltipItems.length > 0) {
					var item = tooltipItems[0];

					if (item.xLabel) {
						title = item.xLabel;
					} else if (labelCount > 0 && item.index < labelCount) {
						title = labels[item.index];
					}
				}

				return title;
			},
			afterTitle: helpers.noop,

			// Args are: (tooltipItems, data)
			beforeBody: helpers.noop,

			// Args are: (tooltipItem, data)
			beforeLabel: helpers.noop,
			label: function(tooltipItem, data) {
				var label = data.datasets[tooltipItem.datasetIndex].label || '';

				if (label) {
					label += ': ';
				}
				label += tooltipItem.yLabel;
				return label;
			},
			labelColor: function(tooltipItem, chart) {
				var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
				var activeElement = meta.data[tooltipItem.index];
				var view = activeElement._view;
				return {
					borderColor: view.borderColor,
					backgroundColor: view.backgroundColor
				};
			},
			labelTextColor: function() {
				return this._options.bodyFontColor;
			},
			afterLabel: helpers.noop,

			// Args are: (tooltipItems, data)
			afterBody: helpers.noop,

			// Args are: (tooltipItems, data)
			beforeFooter: helpers.noop,
			footer: helpers.noop,
			afterFooter: helpers.noop
		}
	}
});

module.exports = function(Chart) {

	/**
 	 * Helper method to merge the opacity into a color
 	 */
	function mergeOpacity(colorString, opacity) {
		var color = helpers.color(colorString);
		return color.alpha(opacity * color.alpha()).rgbaString();
	}

	// Helper to push or concat based on if the 2nd parameter is an array or not
	function pushOrConcat(base, toPush) {
		if (toPush) {
			if (helpers.isArray(toPush)) {
				// base = base.concat(toPush);
				Array.prototype.push.apply(base, toPush);
			} else {
				base.push(toPush);
			}
		}

		return base;
	}

	// Private helper to create a tooltip item model
	// @param element : the chart element (point, arc, bar) to create the tooltip item for
	// @return : new tooltip item
	function createTooltipItem(element) {
		var xScale = element._xScale;
		var yScale = element._yScale || element._scale; // handle radar || polarArea charts
		var index = element._index;
		var datasetIndex = element._datasetIndex;

		return {
			xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
			yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
			index: index,
			datasetIndex: datasetIndex,
			x: element._model.x,
			y: element._model.y
		};
	}

	/**
	 * Helper to get the reset model for the tooltip
	 * @param tooltipOpts {Object} the tooltip options
	 */
	function getBaseModel(tooltipOpts) {
		var globalDefaults = defaults.global;
		var valueOrDefault = helpers.valueOrDefault;

		return {
			// Positioning
			xPadding: tooltipOpts.xPadding,
			yPadding: tooltipOpts.yPadding,
			xAlign: tooltipOpts.xAlign,
			yAlign: tooltipOpts.yAlign,

			// Body
			bodyFontColor: tooltipOpts.bodyFontColor,
			_bodyFontFamily: valueOrDefault(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
			_bodyFontStyle: valueOrDefault(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
			_bodyAlign: tooltipOpts.bodyAlign,
			bodyFontSize: valueOrDefault(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
			bodySpacing: tooltipOpts.bodySpacing,

			// Title
			titleFontColor: tooltipOpts.titleFontColor,
			_titleFontFamily: valueOrDefault(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
			_titleFontStyle: valueOrDefault(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
			titleFontSize: valueOrDefault(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
			_titleAlign: tooltipOpts.titleAlign,
			titleSpacing: tooltipOpts.titleSpacing,
			titleMarginBottom: tooltipOpts.titleMarginBottom,

			// Footer
			footerFontColor: tooltipOpts.footerFontColor,
			_footerFontFamily: valueOrDefault(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
			_footerFontStyle: valueOrDefault(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
			footerFontSize: valueOrDefault(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
			_footerAlign: tooltipOpts.footerAlign,
			footerSpacing: tooltipOpts.footerSpacing,
			footerMarginTop: tooltipOpts.footerMarginTop,

			// Appearance
			caretSize: tooltipOpts.caretSize,
			cornerRadius: tooltipOpts.cornerRadius,
			backgroundColor: tooltipOpts.backgroundColor,
			opacity: 0,
			legendColorBackground: tooltipOpts.multiKeyBackground,
			displayColors: tooltipOpts.displayColors,
			borderColor: tooltipOpts.borderColor,
			borderWidth: tooltipOpts.borderWidth
		};
	}

	/**
	 * Get the size of the tooltip
	 */
	function getTooltipSize(tooltip, model) {
		var ctx = tooltip._chart.ctx;

		var height = model.yPadding * 2; // Tooltip Padding
		var width = 0;

		// Count of all lines in the body
		var body = model.body;
		var combinedBodyLength = body.reduce(function(count, bodyItem) {
			return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
		}, 0);
		combinedBodyLength += model.beforeBody.length + model.afterBody.length;

		var titleLineCount = model.title.length;
		var footerLineCount = model.footer.length;
		var titleFontSize = model.titleFontSize;
		var bodyFontSize = model.bodyFontSize;
		var footerFontSize = model.footerFontSize;

		height += titleLineCount * titleFontSize; // Title Lines
		height += titleLineCount ? (titleLineCount - 1) * model.titleSpacing : 0; // Title Line Spacing
		height += titleLineCount ? model.titleMarginBottom : 0; // Title's bottom Margin
		height += combinedBodyLength * bodyFontSize; // Body Lines
		height += combinedBodyLength ? (combinedBodyLength - 1) * model.bodySpacing : 0; // Body Line Spacing
		height += footerLineCount ? model.footerMarginTop : 0; // Footer Margin
		height += footerLineCount * (footerFontSize); // Footer Lines
		height += footerLineCount ? (footerLineCount - 1) * model.footerSpacing : 0; // Footer Line Spacing

		// Title width
		var widthPadding = 0;
		var maxLineWidth = function(line) {
			width = Math.max(width, ctx.measureText(line).width + widthPadding);
		};

		ctx.font = helpers.fontString(titleFontSize, model._titleFontStyle, model._titleFontFamily);
		helpers.each(model.title, maxLineWidth);

		// Body width
		ctx.font = helpers.fontString(bodyFontSize, model._bodyFontStyle, model._bodyFontFamily);
		helpers.each(model.beforeBody.concat(model.afterBody), maxLineWidth);

		// Body lines may include some extra width due to the color box
		widthPadding = model.displayColors ? (bodyFontSize + 2) : 0;
		helpers.each(body, function(bodyItem) {
			helpers.each(bodyItem.before, maxLineWidth);
			helpers.each(bodyItem.lines, maxLineWidth);
			helpers.each(bodyItem.after, maxLineWidth);
		});

		// Reset back to 0
		widthPadding = 0;

		// Footer width
		ctx.font = helpers.fontString(footerFontSize, model._footerFontStyle, model._footerFontFamily);
		helpers.each(model.footer, maxLineWidth);

		// Add padding
		width += 2 * model.xPadding;

		return {
			width: width,
			height: height
		};
	}

	/**
	 * Helper to get the alignment of a tooltip given the size
	 */
	function determineAlignment(tooltip, size) {
		var model = tooltip._model;
		var chart = tooltip._chart;
		var chartArea = tooltip._chart.chartArea;
		var xAlign = 'center';
		var yAlign = 'center';

		if (model.y < size.height) {
			yAlign = 'top';
		} else if (model.y > (chart.height - size.height)) {
			yAlign = 'bottom';
		}

		var lf, rf; // functions to determine left, right alignment
		var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
		var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
		var midX = (chartArea.left + chartArea.right) / 2;
		var midY = (chartArea.top + chartArea.bottom) / 2;

		if (yAlign === 'center') {
			lf = function(x) {
				return x <= midX;
			};
			rf = function(x) {
				return x > midX;
			};
		} else {
			lf = function(x) {
				return x <= (size.width / 2);
			};
			rf = function(x) {
				return x >= (chart.width - (size.width / 2));
			};
		}

		olf = function(x) {
			return x + size.width > chart.width;
		};
		orf = function(x) {
			return x - size.width < 0;
		};
		yf = function(y) {
			return y <= midY ? 'top' : 'bottom';
		};

		if (lf(model.x)) {
			xAlign = 'left';

			// Is tooltip too wide and goes over the right side of the chart.?
			if (olf(model.x)) {
				xAlign = 'center';
				yAlign = yf(model.y);
			}
		} else if (rf(model.x)) {
			xAlign = 'right';

			// Is tooltip too wide and goes outside left edge of canvas?
			if (orf(model.x)) {
				xAlign = 'center';
				yAlign = yf(model.y);
			}
		}

		var opts = tooltip._options;
		return {
			xAlign: opts.xAlign ? opts.xAlign : xAlign,
			yAlign: opts.yAlign ? opts.yAlign : yAlign
		};
	}

	/**
	 * @Helper to get the location a tooltip needs to be placed at given the initial position (via the vm) and the size and alignment
	 */
	function getBackgroundPoint(vm, size, alignment) {
		// Background Position
		var x = vm.x;
		var y = vm.y;

		var caretSize = vm.caretSize;
		var caretPadding = vm.caretPadding;
		var cornerRadius = vm.cornerRadius;
		var xAlign = alignment.xAlign;
		var yAlign = alignment.yAlign;
		var paddingAndSize = caretSize + caretPadding;
		var radiusAndPadding = cornerRadius + caretPadding;

		if (xAlign === 'right') {
			x -= size.width;
		} else if (xAlign === 'center') {
			x -= (size.width / 2);
		}

		if (yAlign === 'top') {
			y += paddingAndSize;
		} else if (yAlign === 'bottom') {
			y -= size.height + paddingAndSize;
		} else {
			y -= (size.height / 2);
		}

		if (yAlign === 'center') {
			if (xAlign === 'left') {
				x += paddingAndSize;
			} else if (xAlign === 'right') {
				x -= paddingAndSize;
			}
		} else if (xAlign === 'left') {
			x -= radiusAndPadding;
		} else if (xAlign === 'right') {
			x += radiusAndPadding;
		}

		return {
			x: x,
			y: y
		};
	}

	Chart.Tooltip = Element.extend({
		initialize: function() {
			this._model = getBaseModel(this._options);
			this._lastActive = [];
		},

		// Get the title
		// Args are: (tooltipItem, data)
		getTitle: function() {
			var me = this;
			var opts = me._options;
			var callbacks = opts.callbacks;

			var beforeTitle = callbacks.beforeTitle.apply(me, arguments);
			var title = callbacks.title.apply(me, arguments);
			var afterTitle = callbacks.afterTitle.apply(me, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeTitle);
			lines = pushOrConcat(lines, title);
			lines = pushOrConcat(lines, afterTitle);

			return lines;
		},

		// Args are: (tooltipItem, data)
		getBeforeBody: function() {
			var lines = this._options.callbacks.beforeBody.apply(this, arguments);
			return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
		},

		// Args are: (tooltipItem, data)
		getBody: function(tooltipItems, data) {
			var me = this;
			var callbacks = me._options.callbacks;
			var bodyItems = [];

			helpers.each(tooltipItems, function(tooltipItem) {
				var bodyItem = {
					before: [],
					lines: [],
					after: []
				};
				pushOrConcat(bodyItem.before, callbacks.beforeLabel.call(me, tooltipItem, data));
				pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
				pushOrConcat(bodyItem.after, callbacks.afterLabel.call(me, tooltipItem, data));

				bodyItems.push(bodyItem);
			});

			return bodyItems;
		},

		// Args are: (tooltipItem, data)
		getAfterBody: function() {
			var lines = this._options.callbacks.afterBody.apply(this, arguments);
			return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
		},

		// Get the footer and beforeFooter and afterFooter lines
		// Args are: (tooltipItem, data)
		getFooter: function() {
			var me = this;
			var callbacks = me._options.callbacks;

			var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
			var footer = callbacks.footer.apply(me, arguments);
			var afterFooter = callbacks.afterFooter.apply(me, arguments);

			var lines = [];
			lines = pushOrConcat(lines, beforeFooter);
			lines = pushOrConcat(lines, footer);
			lines = pushOrConcat(lines, afterFooter);

			return lines;
		},

		update: function(changed) {
			var me = this;
			var opts = me._options;

			// Need to regenerate the model because its faster than using extend and it is necessary due to the optimization in Chart.Element.transition
			// that does _view = _model if ease === 1. This causes the 2nd tooltip update to set properties in both the view and model at the same time
			// which breaks any animations.
			var existingModel = me._model;
			var model = me._model = getBaseModel(opts);
			var active = me._active;

			var data = me._data;

			// In the case where active.length === 0 we need to keep these at existing values for good animations
			var alignment = {
				xAlign: existingModel.xAlign,
				yAlign: existingModel.yAlign
			};
			var backgroundPoint = {
				x: existingModel.x,
				y: existingModel.y
			};
			var tooltipSize = {
				width: existingModel.width,
				height: existingModel.height
			};
			var tooltipPosition = {
				x: existingModel.caretX,
				y: existingModel.caretY
			};

			var i, len;

			if (active.length) {
				model.opacity = 1;

				var labelColors = [];
				var labelTextColors = [];
				tooltipPosition = Chart.Tooltip.positioners[opts.position].call(me, active, me._eventPosition);

				var tooltipItems = [];
				for (i = 0, len = active.length; i < len; ++i) {
					tooltipItems.push(createTooltipItem(active[i]));
				}

				// If the user provided a filter function, use it to modify the tooltip items
				if (opts.filter) {
					tooltipItems = tooltipItems.filter(function(a) {
						return opts.filter(a, data);
					});
				}

				// If the user provided a sorting function, use it to modify the tooltip items
				if (opts.itemSort) {
					tooltipItems = tooltipItems.sort(function(a, b) {
						return opts.itemSort(a, b, data);
					});
				}

				// Determine colors for boxes
				helpers.each(tooltipItems, function(tooltipItem) {
					labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, me._chart));
					labelTextColors.push(opts.callbacks.labelTextColor.call(me, tooltipItem, me._chart));
				});


				// Build the Text Lines
				model.title = me.getTitle(tooltipItems, data);
				model.beforeBody = me.getBeforeBody(tooltipItems, data);
				model.body = me.getBody(tooltipItems, data);
				model.afterBody = me.getAfterBody(tooltipItems, data);
				model.footer = me.getFooter(tooltipItems, data);

				// Initial positioning and colors
				model.x = Math.round(tooltipPosition.x);
				model.y = Math.round(tooltipPosition.y);
				model.caretPadding = opts.caretPadding;
				model.labelColors = labelColors;
				model.labelTextColors = labelTextColors;

				// data points
				model.dataPoints = tooltipItems;

				// We need to determine alignment of the tooltip
				tooltipSize = getTooltipSize(this, model);
				alignment = determineAlignment(this, tooltipSize);
				// Final Size and Position
				backgroundPoint = getBackgroundPoint(model, tooltipSize, alignment);
			} else {
				model.opacity = 0;
			}

			model.xAlign = alignment.xAlign;
			model.yAlign = alignment.yAlign;
			model.x = backgroundPoint.x;
			model.y = backgroundPoint.y;
			model.width = tooltipSize.width;
			model.height = tooltipSize.height;

			// Point where the caret on the tooltip points to
			model.caretX = tooltipPosition.x;
			model.caretY = tooltipPosition.y;

			me._model = model;

			if (changed && opts.custom) {
				opts.custom.call(me, model);
			}

			return me;
		},
		drawCaret: function(tooltipPoint, size) {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var caretPosition = this.getCaretPosition(tooltipPoint, size, vm);

			ctx.lineTo(caretPosition.x1, caretPosition.y1);
			ctx.lineTo(caretPosition.x2, caretPosition.y2);
			ctx.lineTo(caretPosition.x3, caretPosition.y3);
		},
		getCaretPosition: function(tooltipPoint, size, vm) {
			var x1, x2, x3, y1, y2, y3;
			var caretSize = vm.caretSize;
			var cornerRadius = vm.cornerRadius;
			var xAlign = vm.xAlign;
			var yAlign = vm.yAlign;
			var ptX = tooltipPoint.x;
			var ptY = tooltipPoint.y;
			var width = size.width;
			var height = size.height;

			if (yAlign === 'center') {
				y2 = ptY + (height / 2);

				if (xAlign === 'left') {
					x1 = ptX;
					x2 = x1 - caretSize;
					x3 = x1;

					y1 = y2 + caretSize;
					y3 = y2 - caretSize;
				} else {
					x1 = ptX + width;
					x2 = x1 + caretSize;
					x3 = x1;

					y1 = y2 - caretSize;
					y3 = y2 + caretSize;
				}
			} else {
				if (xAlign === 'left') {
					x2 = ptX + cornerRadius + (caretSize);
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				} else if (xAlign === 'right') {
					x2 = ptX + width - cornerRadius - caretSize;
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				} else {
					x2 = ptX + (width / 2);
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				}
				if (yAlign === 'top') {
					y1 = ptY;
					y2 = y1 - caretSize;
					y3 = y1;
				} else {
					y1 = ptY + height;
					y2 = y1 + caretSize;
					y3 = y1;
					// invert drawing order
					var tmp = x3;
					x3 = x1;
					x1 = tmp;
				}
			}
			return {x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3};
		},
		drawTitle: function(pt, vm, ctx, opacity) {
			var title = vm.title;

			if (title.length) {
				ctx.textAlign = vm._titleAlign;
				ctx.textBaseline = 'top';

				var titleFontSize = vm.titleFontSize;
				var titleSpacing = vm.titleSpacing;

				ctx.fillStyle = mergeOpacity(vm.titleFontColor, opacity);
				ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

				var i, len;
				for (i = 0, len = title.length; i < len; ++i) {
					ctx.fillText(title[i], pt.x, pt.y);
					pt.y += titleFontSize + titleSpacing; // Line Height and spacing

					if (i + 1 === title.length) {
						pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
					}
				}
			}
		},
		drawBody: function(pt, vm, ctx, opacity) {
			var bodyFontSize = vm.bodyFontSize;
			var bodySpacing = vm.bodySpacing;
			var body = vm.body;

			ctx.textAlign = vm._bodyAlign;
			ctx.textBaseline = 'top';
			ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

			// Before Body
			var xLinePadding = 0;
			var fillLineOfText = function(line) {
				ctx.fillText(line, pt.x + xLinePadding, pt.y);
				pt.y += bodyFontSize + bodySpacing;
			};

			// Before body lines
			ctx.fillStyle = mergeOpacity(vm.bodyFontColor, opacity);
			helpers.each(vm.beforeBody, fillLineOfText);

			var drawColorBoxes = vm.displayColors;
			xLinePadding = drawColorBoxes ? (bodyFontSize + 2) : 0;

			// Draw body lines now
			helpers.each(body, function(bodyItem, i) {
				var textColor = mergeOpacity(vm.labelTextColors[i], opacity);
				ctx.fillStyle = textColor;
				helpers.each(bodyItem.before, fillLineOfText);

				helpers.each(bodyItem.lines, function(line) {
					// Draw Legend-like boxes if needed
					if (drawColorBoxes) {
						// Fill a white rect so that colours merge nicely if the opacity is < 1
						ctx.fillStyle = mergeOpacity(vm.legendColorBackground, opacity);
						ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

						// Border
						ctx.lineWidth = 1;
						ctx.strokeStyle = mergeOpacity(vm.labelColors[i].borderColor, opacity);
						ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

						// Inner square
						ctx.fillStyle = mergeOpacity(vm.labelColors[i].backgroundColor, opacity);
						ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
						ctx.fillStyle = textColor;
					}

					fillLineOfText(line);
				});

				helpers.each(bodyItem.after, fillLineOfText);
			});

			// Reset back to 0 for after body
			xLinePadding = 0;

			// After body lines
			helpers.each(vm.afterBody, fillLineOfText);
			pt.y -= bodySpacing; // Remove last body spacing
		},
		drawFooter: function(pt, vm, ctx, opacity) {
			var footer = vm.footer;

			if (footer.length) {
				pt.y += vm.footerMarginTop;

				ctx.textAlign = vm._footerAlign;
				ctx.textBaseline = 'top';

				ctx.fillStyle = mergeOpacity(vm.footerFontColor, opacity);
				ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

				helpers.each(footer, function(line) {
					ctx.fillText(line, pt.x, pt.y);
					pt.y += vm.footerFontSize + vm.footerSpacing;
				});
			}
		},
		drawBackground: function(pt, vm, ctx, tooltipSize, opacity) {
			ctx.fillStyle = mergeOpacity(vm.backgroundColor, opacity);
			ctx.strokeStyle = mergeOpacity(vm.borderColor, opacity);
			ctx.lineWidth = vm.borderWidth;
			var xAlign = vm.xAlign;
			var yAlign = vm.yAlign;
			var x = pt.x;
			var y = pt.y;
			var width = tooltipSize.width;
			var height = tooltipSize.height;
			var radius = vm.cornerRadius;

			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			if (yAlign === 'top') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			if (yAlign === 'center' && xAlign === 'right') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			if (yAlign === 'bottom') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			if (yAlign === 'center' && xAlign === 'left') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();

			ctx.fill();

			if (vm.borderWidth > 0) {
				ctx.stroke();
			}
		},
		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;

			if (vm.opacity === 0) {
				return;
			}

			var tooltipSize = {
				width: vm.width,
				height: vm.height
			};
			var pt = {
				x: vm.x,
				y: vm.y
			};

			// IE11/Edge does not like very small opacities, so snap to 0
			var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

			// Truthy/falsey value for empty tooltip
			var hasTooltipContent = vm.title.length || vm.beforeBody.length || vm.body.length || vm.afterBody.length || vm.footer.length;

			if (this._options.enabled && hasTooltipContent) {
				// Draw Background
				this.drawBackground(pt, vm, ctx, tooltipSize, opacity);

				// Draw Title, Body, and Footer
				pt.x += vm.xPadding;
				pt.y += vm.yPadding;

				// Titles
				this.drawTitle(pt, vm, ctx, opacity);

				// Body
				this.drawBody(pt, vm, ctx, opacity);

				// Footer
				this.drawFooter(pt, vm, ctx, opacity);
			}
		},

		/**
		 * Handle an event
		 * @private
		 * @param {IEvent} event - The event to handle
		 * @returns {Boolean} true if the tooltip changed
		 */
		handleEvent: function(e) {
			var me = this;
			var options = me._options;
			var changed = false;

			me._lastActive = me._lastActive || [];

			// Find Active Elements for tooltips
			if (e.type === 'mouseout') {
				me._active = [];
			} else {
				me._active = me._chart.getElementsAtEventForMode(e, options.mode, options);
			}

			// Remember Last Actives
			changed = !helpers.arrayEquals(me._active, me._lastActive);

			// If tooltip didn't change, do not handle the target event
			if (!changed) {
				return false;
			}

			me._lastActive = me._active;

			if (options.enabled || options.custom) {
				me._eventPosition = {
					x: e.x,
					y: e.y
				};

				var model = me._model;
				me.update(true);
				me.pivot();

				// See if our tooltip position changed
				changed |= (model.x !== me._model.x) || (model.y !== me._model.y);
			}

			return changed;
		}
	});

	/**
	 * @namespace Chart.Tooltip.positioners
	 */
	Chart.Tooltip.positioners = {
		/**
		 * Average mode places the tooltip at the average position of the elements shown
		 * @function Chart.Tooltip.positioners.average
		 * @param elements {ChartElement[]} the elements being displayed in the tooltip
		 * @returns {Point} tooltip position
		 */
		average: function(elements) {
			if (!elements.length) {
				return false;
			}

			var i, len;
			var x = 0;
			var y = 0;
			var count = 0;

			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()) {
					var pos = el.tooltipPosition();
					x += pos.x;
					y += pos.y;
					++count;
				}
			}

			return {
				x: Math.round(x / count),
				y: Math.round(y / count)
			};
		},

		/**
		 * Gets the tooltip position nearest of the item nearest to the event position
		 * @function Chart.Tooltip.positioners.nearest
		 * @param elements {Chart.Element[]} the tooltip elements
		 * @param eventPosition {Point} the position of the event in canvas coordinates
		 * @returns {Point} the tooltip position
		 */
		nearest: function(elements, eventPosition) {
			var x = eventPosition.x;
			var y = eventPosition.y;
			var minDistance = Number.POSITIVE_INFINITY;
			var i, len, nearestElement;

			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()) {
					var center = el.getCenterPoint();
					var d = helpers.distanceBetweenPoints(eventPosition, center);

					if (d < minDistance) {
						minDistance = d;
						nearestElement = el;
					}
				}
			}

			if (nearestElement) {
				var tp = nearestElement.tooltipPosition();
				x = tp.x;
				y = tp.y;
			}

			return {
				x: x,
				y: y
			};
		}
	};
};

},{"25":25,"26":26,"45":45}],36:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

defaults._set('global', {
	elements: {
		arc: {
			backgroundColor: defaults.global.defaultColor,
			borderColor: '#fff',
			borderWidth: 2
		}
	}
});

module.exports = Element.extend({
	inLabelRange: function(mouseX) {
		var vm = this._view;

		if (vm) {
			return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
		}
		return false;
	},

	inRange: function(chartX, chartY) {
		var vm = this._view;

		if (vm) {
			var pointRelativePosition = helpers.getAngleFromPoint(vm, {x: chartX, y: chartY});
			var	angle = pointRelativePosition.angle;
			var distance = pointRelativePosition.distance;

			// Sanitise angle range
			var startAngle = vm.startAngle;
			var endAngle = vm.endAngle;
			while (endAngle < startAngle) {
				endAngle += 2.0 * Math.PI;
			}
			while (angle > endAngle) {
				angle -= 2.0 * Math.PI;
			}
			while (angle < startAngle) {
				angle += 2.0 * Math.PI;
			}

			// Check if within the range of the open/close angle
			var betweenAngles = (angle >= startAngle && angle <= endAngle);
			var withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);

			return (betweenAngles && withinRadius);
		}
		return false;
	},

	getCenterPoint: function() {
		var vm = this._view;
		var halfAngle = (vm.startAngle + vm.endAngle) / 2;
		var halfRadius = (vm.innerRadius + vm.outerRadius) / 2;
		return {
			x: vm.x + Math.cos(halfAngle) * halfRadius,
			y: vm.y + Math.sin(halfAngle) * halfRadius
		};
	},

	getArea: function() {
		var vm = this._view;
		return Math.PI * ((vm.endAngle - vm.startAngle) / (2 * Math.PI)) * (Math.pow(vm.outerRadius, 2) - Math.pow(vm.innerRadius, 2));
	},

	tooltipPosition: function() {
		var vm = this._view;
		var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2);
		var rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;

		return {
			x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
			y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
		};
	},

	draw: function() {
		var ctx = this._chart.ctx;
		var vm = this._view;
		var sA = vm.startAngle;
		var eA = vm.endAngle;

		ctx.beginPath();

		ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
		ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

		ctx.closePath();
		ctx.strokeStyle = vm.borderColor;
		ctx.lineWidth = vm.borderWidth;

		ctx.fillStyle = vm.backgroundColor;

		ctx.fill();
		ctx.lineJoin = 'bevel';

		if (vm.borderWidth) {
			ctx.stroke();
		}
	}
});

},{"25":25,"26":26,"45":45}],37:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

var globalDefaults = defaults.global;

defaults._set('global', {
	elements: {
		line: {
			tension: 0.4,
			backgroundColor: globalDefaults.defaultColor,
			borderWidth: 3,
			borderColor: globalDefaults.defaultColor,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			capBezierPoints: true,
			fill: true, // do we fill in the area between the line and its base axis
		}
	}
});

module.exports = Element.extend({
	draw: function() {
		var me = this;
		var vm = me._view;
		var ctx = me._chart.ctx;
		var spanGaps = vm.spanGaps;
		var points = me._children.slice(); // clone array
		var globalOptionLineElements = globalDefaults.elements.line;
		var lastDrawnIndex = -1;
		var index, current, previous, currentVM;

		// If we are looping, adding the first point again
		if (me._loop && points.length) {
			points.push(points[0]);
		}

		ctx.save();

		// Stroke Line Options
		ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;

		// IE 9 and 10 do not support line dash
		if (ctx.setLineDash) {
			ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
		}

		ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
		ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
		ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
		ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;

		// Stroke Line
		ctx.beginPath();
		lastDrawnIndex = -1;

		for (index = 0; index < points.length; ++index) {
			current = points[index];
			previous = helpers.previousItem(points, index);
			currentVM = current._view;

			// First point moves to it's starting position no matter what
			if (index === 0) {
				if (!currentVM.skip) {
					ctx.moveTo(currentVM.x, currentVM.y);
					lastDrawnIndex = index;
				}
			} else {
				previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

				if (!currentVM.skip) {
					if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
						// There was a gap and this is the first point after the gap
						ctx.moveTo(currentVM.x, currentVM.y);
					} else {
						// Line to next point
						helpers.canvas.lineTo(ctx, previous._view, current._view);
					}
					lastDrawnIndex = index;
				}
			}
		}

		ctx.stroke();
		ctx.restore();
	}
});

},{"25":25,"26":26,"45":45}],38:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

var defaultColor = defaults.global.defaultColor;

defaults._set('global', {
	elements: {
		point: {
			radius: 3,
			pointStyle: 'circle',
			backgroundColor: defaultColor,
			borderColor: defaultColor,
			borderWidth: 1,
			// Hover
			hitRadius: 1,
			hoverRadius: 4,
			hoverBorderWidth: 1
		}
	}
});

function xRange(mouseX) {
	var vm = this._view;
	return vm ? (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
}

function yRange(mouseY) {
	var vm = this._view;
	return vm ? (Math.pow(mouseY - vm.y, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
}

module.exports = Element.extend({
	inRange: function(mouseX, mouseY) {
		var vm = this._view;
		return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
	},

	inLabelRange: xRange,
	inXRange: xRange,
	inYRange: yRange,

	getCenterPoint: function() {
		var vm = this._view;
		return {
			x: vm.x,
			y: vm.y
		};
	},

	getArea: function() {
		return Math.PI * Math.pow(this._view.radius, 2);
	},

	tooltipPosition: function() {
		var vm = this._view;
		return {
			x: vm.x,
			y: vm.y,
			padding: vm.radius + vm.borderWidth
		};
	},

	draw: function(chartArea) {
		var vm = this._view;
		var model = this._model;
		var ctx = this._chart.ctx;
		var pointStyle = vm.pointStyle;
		var radius = vm.radius;
		var x = vm.x;
		var y = vm.y;
		var color = helpers.color;
		var errMargin = 1.01; // 1.01 is margin for Accumulated error. (Especially Edge, IE.)
		var ratio = 0;

		if (vm.skip) {
			return;
		}

		ctx.strokeStyle = vm.borderColor || defaultColor;
		ctx.lineWidth = helpers.valueOrDefault(vm.borderWidth, defaults.global.elements.point.borderWidth);
		ctx.fillStyle = vm.backgroundColor || defaultColor;

		// Cliping for Points.
		// going out from inner charArea?
		if ((chartArea !== undefined) && ((model.x < chartArea.left) || (chartArea.right * errMargin < model.x) || (model.y < chartArea.top) || (chartArea.bottom * errMargin < model.y))) {
			// Point fade out
			if (model.x < chartArea.left) {
				ratio = (x - model.x) / (chartArea.left - model.x);
			} else if (chartArea.right * errMargin < model.x) {
				ratio = (model.x - x) / (model.x - chartArea.right);
			} else if (model.y < chartArea.top) {
				ratio = (y - model.y) / (chartArea.top - model.y);
			} else if (chartArea.bottom * errMargin < model.y) {
				ratio = (model.y - y) / (model.y - chartArea.bottom);
			}
			ratio = Math.round(ratio * 100) / 100;
			ctx.strokeStyle = color(ctx.strokeStyle).alpha(ratio).rgbString();
			ctx.fillStyle = color(ctx.fillStyle).alpha(ratio).rgbString();
		}

		helpers.canvas.drawPoint(ctx, pointStyle, radius, x, y);
	}
});

},{"25":25,"26":26,"45":45}],39:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);

defaults._set('global', {
	elements: {
		rectangle: {
			backgroundColor: defaults.global.defaultColor,
			borderColor: defaults.global.defaultColor,
			borderSkipped: 'bottom',
			borderWidth: 0
		}
	}
});

function isVertical(bar) {
	return bar._view.width !== undefined;
}

/**
 * Helper function to get the bounds of the bar regardless of the orientation
 * @param bar {Chart.Element.Rectangle} the bar
 * @return {Bounds} bounds of the bar
 * @private
 */
function getBarBounds(bar) {
	var vm = bar._view;
	var x1, x2, y1, y2;

	if (isVertical(bar)) {
		// vertical
		var halfWidth = vm.width / 2;
		x1 = vm.x - halfWidth;
		x2 = vm.x + halfWidth;
		y1 = Math.min(vm.y, vm.base);
		y2 = Math.max(vm.y, vm.base);
	} else {
		// horizontal bar
		var halfHeight = vm.height / 2;
		x1 = Math.min(vm.x, vm.base);
		x2 = Math.max(vm.x, vm.base);
		y1 = vm.y - halfHeight;
		y2 = vm.y + halfHeight;
	}

	return {
		left: x1,
		top: y1,
		right: x2,
		bottom: y2
	};
}

module.exports = Element.extend({
	draw: function() {
		var ctx = this._chart.ctx;
		var vm = this._view;
		var left, right, top, bottom, signX, signY, borderSkipped;
		var borderWidth = vm.borderWidth;

		if (!vm.horizontal) {
			// bar
			left = vm.x - vm.width / 2;
			right = vm.x + vm.width / 2;
			top = vm.y;
			bottom = vm.base;
			signX = 1;
			signY = bottom > top ? 1 : -1;
			borderSkipped = vm.borderSkipped || 'bottom';
		} else {
			// horizontal bar
			left = vm.base;
			right = vm.x;
			top = vm.y - vm.height / 2;
			bottom = vm.y + vm.height / 2;
			signX = right > left ? 1 : -1;
			signY = 1;
			borderSkipped = vm.borderSkipped || 'left';
		}

		// Canvas doesn't allow us to stroke inside the width so we can
		// adjust the sizes to fit if we're setting a stroke on the line
		if (borderWidth) {
			// borderWidth shold be less than bar width and bar height.
			var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
			borderWidth = borderWidth > barSize ? barSize : borderWidth;
			var halfStroke = borderWidth / 2;
			// Adjust borderWidth when bar top position is near vm.base(zero).
			var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
			var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
			var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
			var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
			// not become a vertical line?
			if (borderLeft !== borderRight) {
				top = borderTop;
				bottom = borderBottom;
			}
			// not become a horizontal line?
			if (borderTop !== borderBottom) {
				left = borderLeft;
				right = borderRight;
			}
		}

		ctx.beginPath();
		ctx.fillStyle = vm.backgroundColor;
		ctx.strokeStyle = vm.borderColor;
		ctx.lineWidth = borderWidth;

		// Corner points, from bottom-left to bottom-right clockwise
		// | 1 2 |
		// | 0 3 |
		var corners = [
			[left, bottom],
			[left, top],
			[right, top],
			[right, bottom]
		];

		// Find first (starting) corner with fallback to 'bottom'
		var borders = ['bottom', 'left', 'top', 'right'];
		var startCorner = borders.indexOf(borderSkipped, 0);
		if (startCorner === -1) {
			startCorner = 0;
		}

		function cornerAt(index) {
			return corners[(startCorner + index) % 4];
		}

		// Draw rectangle from 'startCorner'
		var corner = cornerAt(0);
		ctx.moveTo(corner[0], corner[1]);

		for (var i = 1; i < 4; i++) {
			corner = cornerAt(i);
			ctx.lineTo(corner[0], corner[1]);
		}

		ctx.fill();
		if (borderWidth) {
			ctx.stroke();
		}
	},

	height: function() {
		var vm = this._view;
		return vm.base - vm.y;
	},

	inRange: function(mouseX, mouseY) {
		var inRange = false;

		if (this._view) {
			var bounds = getBarBounds(this);
			inRange = mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;
		}

		return inRange;
	},

	inLabelRange: function(mouseX, mouseY) {
		var me = this;
		if (!me._view) {
			return false;
		}

		var inRange = false;
		var bounds = getBarBounds(me);

		if (isVertical(me)) {
			inRange = mouseX >= bounds.left && mouseX <= bounds.right;
		} else {
			inRange = mouseY >= bounds.top && mouseY <= bounds.bottom;
		}

		return inRange;
	},

	inXRange: function(mouseX) {
		var bounds = getBarBounds(this);
		return mouseX >= bounds.left && mouseX <= bounds.right;
	},

	inYRange: function(mouseY) {
		var bounds = getBarBounds(this);
		return mouseY >= bounds.top && mouseY <= bounds.bottom;
	},

	getCenterPoint: function() {
		var vm = this._view;
		var x, y;
		if (isVertical(this)) {
			x = vm.x;
			y = (vm.y + vm.base) / 2;
		} else {
			x = (vm.x + vm.base) / 2;
			y = vm.y;
		}

		return {x: x, y: y};
	},

	getArea: function() {
		var vm = this._view;
		return vm.width * Math.abs(vm.y - vm.base);
	},

	tooltipPosition: function() {
		var vm = this._view;
		return {
			x: vm.x,
			y: vm.y
		};
	}
});

},{"25":25,"26":26}],40:[function(require,module,exports){
'use strict';

module.exports = {};
module.exports.Arc = require(36);
module.exports.Line = require(37);
module.exports.Point = require(38);
module.exports.Rectangle = require(39);

},{"36":36,"37":37,"38":38,"39":39}],41:[function(require,module,exports){
'use strict';

var helpers = require(42);

/**
 * @namespace Chart.helpers.canvas
 */
var exports = module.exports = {
	/**
	 * Clears the entire canvas associated to the given `chart`.
	 * @param {Chart} chart - The chart for which to clear the canvas.
	 */
	clear: function(chart) {
		chart.ctx.clearRect(0, 0, chart.width, chart.height);
	},

	/**
	 * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
	 * given size (width, height) and the same `radius` for all corners.
	 * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
	 * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
	 * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
	 * @param {Number} width - The rectangle's width.
	 * @param {Number} height - The rectangle's height.
	 * @param {Number} radius - The rounded amount (in pixels) for the four corners.
	 * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
	 */
	roundedRect: function(ctx, x, y, width, height, radius) {
		if (radius) {
			var rx = Math.min(radius, width / 2);
			var ry = Math.min(radius, height / 2);

			ctx.moveTo(x + rx, y);
			ctx.lineTo(x + width - rx, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
			ctx.lineTo(x + width, y + height - ry);
			ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
			ctx.lineTo(x + rx, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
			ctx.lineTo(x, y + ry);
			ctx.quadraticCurveTo(x, y, x + rx, y);
		} else {
			ctx.rect(x, y, width, height);
		}
	},

	drawPoint: function(ctx, style, radius, x, y) {
		var type, edgeLength, xOffset, yOffset, height, size;

		if (style && typeof style === 'object') {
			type = style.toString();
			if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
				ctx.drawImage(style, x - style.width / 2, y - style.height / 2, style.width, style.height);
				return;
			}
		}

		if (isNaN(radius) || radius <= 0) {
			return;
		}

		switch (style) {
		// Default includes circle
		default:
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			break;
		case 'triangle':
			ctx.beginPath();
			edgeLength = 3 * radius / Math.sqrt(3);
			height = edgeLength * Math.sqrt(3) / 2;
			ctx.moveTo(x - edgeLength / 2, y + height / 3);
			ctx.lineTo(x + edgeLength / 2, y + height / 3);
			ctx.lineTo(x, y - 2 * height / 3);
			ctx.closePath();
			ctx.fill();
			break;
		case 'rect':
			size = 1 / Math.SQRT2 * radius;
			ctx.beginPath();
			ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
			ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
			break;
		case 'rectRounded':
			var offset = radius / Math.SQRT2;
			var leftX = x - offset;
			var topY = y - offset;
			var sideSize = Math.SQRT2 * radius;
			ctx.beginPath();
			this.roundedRect(ctx, leftX, topY, sideSize, sideSize, radius / 2);
			ctx.closePath();
			ctx.fill();
			break;
		case 'rectRot':
			size = 1 / Math.SQRT2 * radius;
			ctx.beginPath();
			ctx.moveTo(x - size, y);
			ctx.lineTo(x, y + size);
			ctx.lineTo(x + size, y);
			ctx.lineTo(x, y - size);
			ctx.closePath();
			ctx.fill();
			break;
		case 'cross':
			ctx.beginPath();
			ctx.moveTo(x, y + radius);
			ctx.lineTo(x, y - radius);
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			ctx.closePath();
			break;
		case 'crossRot':
			ctx.beginPath();
			xOffset = Math.cos(Math.PI / 4) * radius;
			yOffset = Math.sin(Math.PI / 4) * radius;
			ctx.moveTo(x - xOffset, y - yOffset);
			ctx.lineTo(x + xOffset, y + yOffset);
			ctx.moveTo(x - xOffset, y + yOffset);
			ctx.lineTo(x + xOffset, y - yOffset);
			ctx.closePath();
			break;
		case 'star':
			ctx.beginPath();
			ctx.moveTo(x, y + radius);
			ctx.lineTo(x, y - radius);
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			xOffset = Math.cos(Math.PI / 4) * radius;
			yOffset = Math.sin(Math.PI / 4) * radius;
			ctx.moveTo(x - xOffset, y - yOffset);
			ctx.lineTo(x + xOffset, y + yOffset);
			ctx.moveTo(x - xOffset, y + yOffset);
			ctx.lineTo(x + xOffset, y - yOffset);
			ctx.closePath();
			break;
		case 'line':
			ctx.beginPath();
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			ctx.closePath();
			break;
		case 'dash':
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + radius, y);
			ctx.closePath();
			break;
		}

		ctx.stroke();
	},

	clipArea: function(ctx, area) {
		ctx.save();
		ctx.beginPath();
		ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
		ctx.clip();
	},

	unclipArea: function(ctx) {
		ctx.restore();
	},

	lineTo: function(ctx, previous, target, flip) {
		if (target.steppedLine) {
			if ((target.steppedLine === 'after' && !flip) || (target.steppedLine !== 'after' && flip)) {
				ctx.lineTo(previous.x, target.y);
			} else {
				ctx.lineTo(target.x, previous.y);
			}
			ctx.lineTo(target.x, target.y);
			return;
		}

		if (!target.tension) {
			ctx.lineTo(target.x, target.y);
			return;
		}

		ctx.bezierCurveTo(
			flip ? previous.controlPointPreviousX : previous.controlPointNextX,
			flip ? previous.controlPointPreviousY : previous.controlPointNextY,
			flip ? target.controlPointNextX : target.controlPointPreviousX,
			flip ? target.controlPointNextY : target.controlPointPreviousY,
			target.x,
			target.y);
	}
};

// DEPRECATIONS

/**
 * Provided for backward compatibility, use Chart.helpers.canvas.clear instead.
 * @namespace Chart.helpers.clear
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.clear = exports.clear;

/**
 * Provided for backward compatibility, use Chart.helpers.canvas.roundedRect instead.
 * @namespace Chart.helpers.drawRoundedRectangle
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.drawRoundedRectangle = function(ctx) {
	ctx.beginPath();
	exports.roundedRect.apply(exports, arguments);
	ctx.closePath();
};

},{"42":42}],42:[function(require,module,exports){
'use strict';

/**
 * @namespace Chart.helpers
 */
var helpers = {
	/**
	 * An empty function that can be used, for example, for optional callback.
	 */
	noop: function() {},

	/**
	 * Returns a unique id, sequentially generated from a global variable.
	 * @returns {Number}
	 * @function
	 */
	uid: (function() {
		var id = 0;
		return function() {
			return id++;
		};
	}()),

	/**
	 * Returns true if `value` is neither null nor undefined, else returns false.
	 * @param {*} value - The value to test.
	 * @returns {Boolean}
	 * @since 2.7.0
	 */
	isNullOrUndef: function(value) {
		return value === null || typeof value === 'undefined';
	},

	/**
	 * Returns true if `value` is an array, else returns false.
	 * @param {*} value - The value to test.
	 * @returns {Boolean}
	 * @function
	 */
	isArray: Array.isArray ? Array.isArray : function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	},

	/**
	 * Returns true if `value` is an object (excluding null), else returns false.
	 * @param {*} value - The value to test.
	 * @returns {Boolean}
	 * @since 2.7.0
	 */
	isObject: function(value) {
		return value !== null && Object.prototype.toString.call(value) === '[object Object]';
	},

	/**
	 * Returns `value` if defined, else returns `defaultValue`.
	 * @param {*} value - The value to return if defined.
	 * @param {*} defaultValue - The value to return if `value` is undefined.
	 * @returns {*}
	 */
	valueOrDefault: function(value, defaultValue) {
		return typeof value === 'undefined' ? defaultValue : value;
	},

	/**
	 * Returns value at the given `index` in array if defined, else returns `defaultValue`.
	 * @param {Array} value - The array to lookup for value at `index`.
	 * @param {Number} index - The index in `value` to lookup for value.
	 * @param {*} defaultValue - The value to return if `value[index]` is undefined.
	 * @returns {*}
	 */
	valueAtIndexOrDefault: function(value, index, defaultValue) {
		return helpers.valueOrDefault(helpers.isArray(value) ? value[index] : value, defaultValue);
	},

	/**
	 * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
	 * value returned by `fn`. If `fn` is not a function, this method returns undefined.
	 * @param {Function} fn - The function to call.
	 * @param {Array|undefined|null} args - The arguments with which `fn` should be called.
	 * @param {Object} [thisArg] - The value of `this` provided for the call to `fn`.
	 * @returns {*}
	 */
	callback: function(fn, args, thisArg) {
		if (fn && typeof fn.call === 'function') {
			return fn.apply(thisArg, args);
		}
	},

	/**
	 * Note(SB) for performance sake, this method should only be used when loopable type
	 * is unknown or in none intensive code (not called often and small loopable). Else
	 * it's preferable to use a regular for() loop and save extra function calls.
	 * @param {Object|Array} loopable - The object or array to be iterated.
	 * @param {Function} fn - The function to call for each item.
	 * @param {Object} [thisArg] - The value of `this` provided for the call to `fn`.
	 * @param {Boolean} [reverse] - If true, iterates backward on the loopable.
	 */
	each: function(loopable, fn, thisArg, reverse) {
		var i, len, keys;
		if (helpers.isArray(loopable)) {
			len = loopable.length;
			if (reverse) {
				for (i = len - 1; i >= 0; i--) {
					fn.call(thisArg, loopable[i], i);
				}
			} else {
				for (i = 0; i < len; i++) {
					fn.call(thisArg, loopable[i], i);
				}
			}
		} else if (helpers.isObject(loopable)) {
			keys = Object.keys(loopable);
			len = keys.length;
			for (i = 0; i < len; i++) {
				fn.call(thisArg, loopable[keys[i]], keys[i]);
			}
		}
	},

	/**
	 * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
	 * @see http://stackoverflow.com/a/14853974
	 * @param {Array} a0 - The array to compare
	 * @param {Array} a1 - The array to compare
	 * @returns {Boolean}
	 */
	arrayEquals: function(a0, a1) {
		var i, ilen, v0, v1;

		if (!a0 || !a1 || a0.length !== a1.length) {
			return false;
		}

		for (i = 0, ilen = a0.length; i < ilen; ++i) {
			v0 = a0[i];
			v1 = a1[i];

			if (v0 instanceof Array && v1 instanceof Array) {
				if (!helpers.arrayEquals(v0, v1)) {
					return false;
				}
			} else if (v0 !== v1) {
				// NOTE: two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}

		return true;
	},

	/**
	 * Returns a deep copy of `source` without keeping references on objects and arrays.
	 * @param {*} source - The value to clone.
	 * @returns {*}
	 */
	clone: function(source) {
		if (helpers.isArray(source)) {
			return source.map(helpers.clone);
		}

		if (helpers.isObject(source)) {
			var target = {};
			var keys = Object.keys(source);
			var klen = keys.length;
			var k = 0;

			for (; k < klen; ++k) {
				target[keys[k]] = helpers.clone(source[keys[k]]);
			}

			return target;
		}

		return source;
	},

	/**
	 * The default merger when Chart.helpers.merge is called without merger option.
	 * Note(SB): this method is also used by configMerge and scaleMerge as fallback.
	 * @private
	 */
	_merger: function(key, target, source, options) {
		var tval = target[key];
		var sval = source[key];

		if (helpers.isObject(tval) && helpers.isObject(sval)) {
			helpers.merge(tval, sval, options);
		} else {
			target[key] = helpers.clone(sval);
		}
	},

	/**
	 * Merges source[key] in target[key] only if target[key] is undefined.
	 * @private
	 */
	_mergerIf: function(key, target, source) {
		var tval = target[key];
		var sval = source[key];

		if (helpers.isObject(tval) && helpers.isObject(sval)) {
			helpers.mergeIf(tval, sval);
		} else if (!target.hasOwnProperty(key)) {
			target[key] = helpers.clone(sval);
		}
	},

	/**
	 * Recursively deep copies `source` properties into `target` with the given `options`.
	 * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
	 * @param {Object} target - The target object in which all sources are merged into.
	 * @param {Object|Array(Object)} source - Object(s) to merge into `target`.
	 * @param {Object} [options] - Merging options:
	 * @param {Function} [options.merger] - The merge method (key, target, source, options)
	 * @returns {Object} The `target` object.
	 */
	merge: function(target, source, options) {
		var sources = helpers.isArray(source) ? source : [source];
		var ilen = sources.length;
		var merge, i, keys, klen, k;

		if (!helpers.isObject(target)) {
			return target;
		}

		options = options || {};
		merge = options.merger || helpers._merger;

		for (i = 0; i < ilen; ++i) {
			source = sources[i];
			if (!helpers.isObject(source)) {
				continue;
			}

			keys = Object.keys(source);
			for (k = 0, klen = keys.length; k < klen; ++k) {
				merge(keys[k], target, source, options);
			}
		}

		return target;
	},

	/**
	 * Recursively deep copies `source` properties into `target` *only* if not defined in target.
	 * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
	 * @param {Object} target - The target object in which all sources are merged into.
	 * @param {Object|Array(Object)} source - Object(s) to merge into `target`.
	 * @returns {Object} The `target` object.
	 */
	mergeIf: function(target, source) {
		return helpers.merge(target, source, {merger: helpers._mergerIf});
	},

	/**
	 * Applies the contents of two or more objects together into the first object.
	 * @param {Object} target - The target object in which all objects are merged into.
	 * @param {Object} arg1 - Object containing additional properties to merge in target.
	 * @param {Object} argN - Additional objects containing properties to merge in target.
	 * @returns {Object} The `target` object.
	 */
	extend: function(target) {
		var setFn = function(value, key) {
			target[key] = value;
		};
		for (var i = 1, ilen = arguments.length; i < ilen; ++i) {
			helpers.each(arguments[i], setFn);
		}
		return target;
	},

	/**
	 * Basic javascript inheritance based on the model created in Backbone.js
	 */
	inherits: function(extensions) {
		var me = this;
		var ChartElement = (extensions && extensions.hasOwnProperty('constructor')) ? extensions.constructor : function() {
			return me.apply(this, arguments);
		};

		var Surrogate = function() {
			this.constructor = ChartElement;
		};

		Surrogate.prototype = me.prototype;
		ChartElement.prototype = new Surrogate();
		ChartElement.extend = helpers.inherits;

		if (extensions) {
			helpers.extend(ChartElement.prototype, extensions);
		}

		ChartElement.__super__ = me.prototype;
		return ChartElement;
	}
};

module.exports = helpers;

// DEPRECATIONS

/**
 * Provided for backward compatibility, use Chart.helpers.callback instead.
 * @function Chart.helpers.callCallback
 * @deprecated since version 2.6.0
 * @todo remove at version 3
 * @private
 */
helpers.callCallback = helpers.callback;

/**
 * Provided for backward compatibility, use Array.prototype.indexOf instead.
 * Array.prototype.indexOf compatibility: Chrome, Opera, Safari, FF1.5+, IE9+
 * @function Chart.helpers.indexOf
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.indexOf = function(array, item, fromIndex) {
	return Array.prototype.indexOf.call(array, item, fromIndex);
};

/**
 * Provided for backward compatibility, use Chart.helpers.valueOrDefault instead.
 * @function Chart.helpers.getValueOrDefault
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.getValueOrDefault = helpers.valueOrDefault;

/**
 * Provided for backward compatibility, use Chart.helpers.valueAtIndexOrDefault instead.
 * @function Chart.helpers.getValueAtIndexOrDefault
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.getValueAtIndexOrDefault = helpers.valueAtIndexOrDefault;

},{}],43:[function(require,module,exports){
'use strict';

var helpers = require(42);

/**
 * Easing functions adapted from Robert Penner's easing equations.
 * @namespace Chart.helpers.easingEffects
 * @see http://www.robertpenner.com/easing/
 */
var effects = {
	linear: function(t) {
		return t;
	},

	easeInQuad: function(t) {
		return t * t;
	},

	easeOutQuad: function(t) {
		return -t * (t - 2);
	},

	easeInOutQuad: function(t) {
		if ((t /= 0.5) < 1) {
			return 0.5 * t * t;
		}
		return -0.5 * ((--t) * (t - 2) - 1);
	},

	easeInCubic: function(t) {
		return t * t * t;
	},

	easeOutCubic: function(t) {
		return (t = t - 1) * t * t + 1;
	},

	easeInOutCubic: function(t) {
		if ((t /= 0.5) < 1) {
			return 0.5 * t * t * t;
		}
		return 0.5 * ((t -= 2) * t * t + 2);
	},

	easeInQuart: function(t) {
		return t * t * t * t;
	},

	easeOutQuart: function(t) {
		return -((t = t - 1) * t * t * t - 1);
	},

	easeInOutQuart: function(t) {
		if ((t /= 0.5) < 1) {
			return 0.5 * t * t * t * t;
		}
		return -0.5 * ((t -= 2) * t * t * t - 2);
	},

	easeInQuint: function(t) {
		return t * t * t * t * t;
	},

	easeOutQuint: function(t) {
		return (t = t - 1) * t * t * t * t + 1;
	},

	easeInOutQuint: function(t) {
		if ((t /= 0.5) < 1) {
			return 0.5 * t * t * t * t * t;
		}
		return 0.5 * ((t -= 2) * t * t * t * t + 2);
	},

	easeInSine: function(t) {
		return -Math.cos(t * (Math.PI / 2)) + 1;
	},

	easeOutSine: function(t) {
		return Math.sin(t * (Math.PI / 2));
	},

	easeInOutSine: function(t) {
		return -0.5 * (Math.cos(Math.PI * t) - 1);
	},

	easeInExpo: function(t) {
		return (t === 0) ? 0 : Math.pow(2, 10 * (t - 1));
	},

	easeOutExpo: function(t) {
		return (t === 1) ? 1 : -Math.pow(2, -10 * t) + 1;
	},

	easeInOutExpo: function(t) {
		if (t === 0) {
			return 0;
		}
		if (t === 1) {
			return 1;
		}
		if ((t /= 0.5) < 1) {
			return 0.5 * Math.pow(2, 10 * (t - 1));
		}
		return 0.5 * (-Math.pow(2, -10 * --t) + 2);
	},

	easeInCirc: function(t) {
		if (t >= 1) {
			return t;
		}
		return -(Math.sqrt(1 - t * t) - 1);
	},

	easeOutCirc: function(t) {
		return Math.sqrt(1 - (t = t - 1) * t);
	},

	easeInOutCirc: function(t) {
		if ((t /= 0.5) < 1) {
			return -0.5 * (Math.sqrt(1 - t * t) - 1);
		}
		return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	},

	easeInElastic: function(t) {
		var s = 1.70158;
		var p = 0;
		var a = 1;
		if (t === 0) {
			return 0;
		}
		if (t === 1) {
			return 1;
		}
		if (!p) {
			p = 0.3;
		}
		if (a < 1) {
			a = 1;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(1 / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	},

	easeOutElastic: function(t) {
		var s = 1.70158;
		var p = 0;
		var a = 1;
		if (t === 0) {
			return 0;
		}
		if (t === 1) {
			return 1;
		}
		if (!p) {
			p = 0.3;
		}
		if (a < 1) {
			a = 1;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(1 / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
	},

	easeInOutElastic: function(t) {
		var s = 1.70158;
		var p = 0;
		var a = 1;
		if (t === 0) {
			return 0;
		}
		if ((t /= 0.5) === 2) {
			return 1;
		}
		if (!p) {
			p = 0.45;
		}
		if (a < 1) {
			a = 1;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(1 / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
		}
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
	},
	easeInBack: function(t) {
		var s = 1.70158;
		return t * t * ((s + 1) * t - s);
	},

	easeOutBack: function(t) {
		var s = 1.70158;
		return (t = t - 1) * t * ((s + 1) * t + s) + 1;
	},

	easeInOutBack: function(t) {
		var s = 1.70158;
		if ((t /= 0.5) < 1) {
			return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s));
		}
		return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
	},

	easeInBounce: function(t) {
		return 1 - effects.easeOutBounce(1 - t);
	},

	easeOutBounce: function(t) {
		if (t < (1 / 2.75)) {
			return 7.5625 * t * t;
		}
		if (t < (2 / 2.75)) {
			return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
		}
		if (t < (2.5 / 2.75)) {
			return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
		}
		return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
	},

	easeInOutBounce: function(t) {
		if (t < 0.5) {
			return effects.easeInBounce(t * 2) * 0.5;
		}
		return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
	}
};

module.exports = {
	effects: effects
};

// DEPRECATIONS

/**
 * Provided for backward compatibility, use Chart.helpers.easing.effects instead.
 * @function Chart.helpers.easingEffects
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.easingEffects = effects;

},{"42":42}],44:[function(require,module,exports){
'use strict';

var helpers = require(42);

/**
 * @alias Chart.helpers.options
 * @namespace
 */
module.exports = {
	/**
	 * Converts the given line height `value` in pixels for a specific font `size`.
	 * @param {Number|String} value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
	 * @param {Number} size - The font size (in pixels) used to resolve relative `value`.
	 * @returns {Number} The effective line height in pixels (size * 1.2 if value is invalid).
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
	 * @since 2.7.0
	 */
	toLineHeight: function(value, size) {
		var matches = ('' + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
		if (!matches || matches[1] === 'normal') {
			return size * 1.2;
		}

		value = +matches[2];

		switch (matches[3]) {
		case 'px':
			return value;
		case '%':
			value /= 100;
			break;
		default:
			break;
		}

		return size * value;
	},

	/**
	 * Converts the given value into a padding object with pre-computed width/height.
	 * @param {Number|Object} value - If a number, set the value to all TRBL component,
	 *  else, if and object, use defined properties and sets undefined ones to 0.
	 * @returns {Object} The padding values (top, right, bottom, left, width, height)
	 * @since 2.7.0
	 */
	toPadding: function(value) {
		var t, r, b, l;

		if (helpers.isObject(value)) {
			t = +value.top || 0;
			r = +value.right || 0;
			b = +value.bottom || 0;
			l = +value.left || 0;
		} else {
			t = r = b = l = +value || 0;
		}

		return {
			top: t,
			right: r,
			bottom: b,
			left: l,
			height: t + b,
			width: l + r
		};
	},

	/**
	 * Evaluates the given `inputs` sequentially and returns the first defined value.
	 * @param {Array[]} inputs - An array of values, falling back to the last value.
	 * @param {Object} [context] - If defined and the current value is a function, the value
	 * is called with `context` as first argument and the result becomes the new input.
	 * @param {Number} [index] - If defined and the current value is an array, the value
	 * at `index` become the new input.
	 * @since 2.7.0
	 */
	resolve: function(inputs, context, index) {
		var i, ilen, value;

		for (i = 0, ilen = inputs.length; i < ilen; ++i) {
			value = inputs[i];
			if (value === undefined) {
				continue;
			}
			if (context !== undefined && typeof value === 'function') {
				value = value(context);
			}
			if (index !== undefined && helpers.isArray(value)) {
				value = value[index];
			}
			if (value !== undefined) {
				return value;
			}
		}
	}
};

},{"42":42}],45:[function(require,module,exports){
'use strict';

module.exports = require(42);
module.exports.easing = require(43);
module.exports.canvas = require(41);
module.exports.options = require(44);

},{"41":41,"42":42,"43":43,"44":44}],46:[function(require,module,exports){
/**
 * Platform fallback implementation (minimal).
 * @see https://github.com/chartjs/Chart.js/pull/4591#issuecomment-319575939
 */

module.exports = {
	acquireContext: function(item) {
		if (item && item.canvas) {
			// Support for any object associated to a canvas (including a context2d)
			item = item.canvas;
		}

		return item && item.getContext('2d') || null;
	}
};

},{}],47:[function(require,module,exports){
/**
 * Chart.Platform implementation for targeting a web browser
 */

'use strict';

var helpers = require(45);

var EXPANDO_KEY = '$chartjs';
var CSS_PREFIX = 'chartjs-';
var CSS_RENDER_MONITOR = CSS_PREFIX + 'render-monitor';
var CSS_RENDER_ANIMATION = CSS_PREFIX + 'render-animation';
var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart'];

/**
 * DOM event types -> Chart.js event types.
 * Note: only events with different types are mapped.
 * @see https://developer.mozilla.org/en-US/docs/Web/Events
 */
var EVENT_TYPES = {
	touchstart: 'mousedown',
	touchmove: 'mousemove',
	touchend: 'mouseup',
	pointerenter: 'mouseenter',
	pointerdown: 'mousedown',
	pointermove: 'mousemove',
	pointerup: 'mouseup',
	pointerleave: 'mouseout',
	pointerout: 'mouseout'
};

/**
 * The "used" size is the final value of a dimension property after all calculations have
 * been performed. This method uses the computed style of `element` but returns undefined
 * if the computed style is not expressed in pixels. That can happen in some cases where
 * `element` has a size relative to its parent and this last one is not yet displayed,
 * for example because of `display: none` on a parent node.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 * @returns {Number} Size in pixels or undefined if unknown.
 */
function readUsedSize(element, property) {
	var value = helpers.getStyle(element, property);
	var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
	return matches ? Number(matches[1]) : undefined;
}

/**
 * Initializes the canvas style and render size without modifying the canvas display size,
 * since responsiveness is handled by the controller.resize() method. The config is used
 * to determine the aspect ratio to apply in case no explicit height has been specified.
 */
function initCanvas(canvas, config) {
	var style = canvas.style;

	// NOTE(SB) canvas.getAttribute('width') !== canvas.width: in the first case it
	// returns null or '' if no explicit value has been set to the canvas attribute.
	var renderHeight = canvas.getAttribute('height');
	var renderWidth = canvas.getAttribute('width');

	// Chart.js modifies some canvas values that we want to restore on destroy
	canvas[EXPANDO_KEY] = {
		initial: {
			height: renderHeight,
			width: renderWidth,
			style: {
				display: style.display,
				height: style.height,
				width: style.width
			}
		}
	};

	// Force canvas to display as block to avoid extra space caused by inline
	// elements, which would interfere with the responsive resize process.
	// https://github.com/chartjs/Chart.js/issues/2538
	style.display = style.display || 'block';

	if (renderWidth === null || renderWidth === '') {
		var displayWidth = readUsedSize(canvas, 'width');
		if (displayWidth !== undefined) {
			canvas.width = displayWidth;
		}
	}

	if (renderHeight === null || renderHeight === '') {
		if (canvas.style.height === '') {
			// If no explicit render height and style height, let's apply the aspect ratio,
			// which one can be specified by the user but also by charts as default option
			// (i.e. options.aspectRatio). If not specified, use canvas aspect ratio of 2.
			canvas.height = canvas.width / (config.options.aspectRatio || 2);
		} else {
			var displayHeight = readUsedSize(canvas, 'height');
			if (displayWidth !== undefined) {
				canvas.height = displayHeight;
			}
		}
	}

	return canvas;
}

/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */
var supportsEventListenerOptions = (function() {
	var supports = false;
	try {
		var options = Object.defineProperty({}, 'passive', {
			get: function() {
				supports = true;
			}
		});
		window.addEventListener('e', null, options);
	} catch (e) {
		// continue regardless of error
	}
	return supports;
}());

// Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
// https://github.com/chartjs/Chart.js/issues/4287
var eventListenerOptions = supportsEventListenerOptions ? {passive: true} : false;

function addEventListener(node, type, listener) {
	node.addEventListener(type, listener, eventListenerOptions);
}

function removeEventListener(node, type, listener) {
	node.removeEventListener(type, listener, eventListenerOptions);
}

function createEvent(type, chart, x, y, nativeEvent) {
	return {
		type: type,
		chart: chart,
		native: nativeEvent || null,
		x: x !== undefined ? x : null,
		y: y !== undefined ? y : null,
	};
}

function fromNativeEvent(event, chart) {
	var type = EVENT_TYPES[event.type] || event.type;
	var pos = helpers.getRelativePosition(event, chart);
	return createEvent(type, chart, pos.x, pos.y, event);
}

function throttled(fn, thisArg) {
	var ticking = false;
	var args = [];

	return function() {
		args = Array.prototype.slice.call(arguments);
		thisArg = thisArg || this;

		if (!ticking) {
			ticking = true;
			helpers.requestAnimFrame.call(window, function() {
				ticking = false;
				fn.apply(thisArg, args);
			});
		}
	};
}

// Implementation based on https://github.com/marcj/css-element-queries
function createResizer(handler) {
	var resizer = document.createElement('div');
	var cls = CSS_PREFIX + 'size-monitor';
	var maxSize = 1000000;
	var style =
		'position:absolute;' +
		'left:0;' +
		'top:0;' +
		'right:0;' +
		'bottom:0;' +
		'overflow:hidden;' +
		'pointer-events:none;' +
		'visibility:hidden;' +
		'z-index:-1;';

	resizer.style.cssText = style;
	resizer.className = cls;
	resizer.innerHTML =
		'<div class="' + cls + '-expand" style="' + style + '">' +
			'<div style="' +
				'position:absolute;' +
				'width:' + maxSize + 'px;' +
				'height:' + maxSize + 'px;' +
				'left:0;' +
				'top:0">' +
			'</div>' +
		'</div>' +
		'<div class="' + cls + '-shrink" style="' + style + '">' +
			'<div style="' +
				'position:absolute;' +
				'width:200%;' +
				'height:200%;' +
				'left:0; ' +
				'top:0">' +
			'</div>' +
		'</div>';

	var expand = resizer.childNodes[0];
	var shrink = resizer.childNodes[1];

	resizer._reset = function() {
		expand.scrollLeft = maxSize;
		expand.scrollTop = maxSize;
		shrink.scrollLeft = maxSize;
		shrink.scrollTop = maxSize;
	};
	var onScroll = function() {
		resizer._reset();
		handler();
	};

	addEventListener(expand, 'scroll', onScroll.bind(expand, 'expand'));
	addEventListener(shrink, 'scroll', onScroll.bind(shrink, 'shrink'));

	return resizer;
}

// https://davidwalsh.name/detect-node-insertion
function watchForRender(node, handler) {
	var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});
	var proxy = expando.renderProxy = function(e) {
		if (e.animationName === CSS_RENDER_ANIMATION) {
			handler();
		}
	};

	helpers.each(ANIMATION_START_EVENTS, function(type) {
		addEventListener(node, type, proxy);
	});

	// #4737: Chrome might skip the CSS animation when the CSS_RENDER_MONITOR class
	// is removed then added back immediately (same animation frame?). Accessing the
	// `offsetParent` property will force a reflow and re-evaluate the CSS animation.
	// https://gist.github.com/paulirish/5d52fb081b3570c81e3a#box-metrics
	// https://github.com/chartjs/Chart.js/issues/4737
	expando.reflow = !!node.offsetParent;

	node.classList.add(CSS_RENDER_MONITOR);
}

function unwatchForRender(node) {
	var expando = node[EXPANDO_KEY] || {};
	var proxy = expando.renderProxy;

	if (proxy) {
		helpers.each(ANIMATION_START_EVENTS, function(type) {
			removeEventListener(node, type, proxy);
		});

		delete expando.renderProxy;
	}

	node.classList.remove(CSS_RENDER_MONITOR);
}

function addResizeListener(node, listener, chart) {
	var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});

	// Let's keep track of this added resizer and thus avoid DOM query when removing it.
	var resizer = expando.resizer = createResizer(throttled(function() {
		if (expando.resizer) {
			return listener(createEvent('resize', chart));
		}
	}));

	// The resizer needs to be attached to the node parent, so we first need to be
	// sure that `node` is attached to the DOM before injecting the resizer element.
	watchForRender(node, function() {
		if (expando.resizer) {
			var container = node.parentNode;
			if (container && container !== resizer.parentNode) {
				container.insertBefore(resizer, container.firstChild);
			}

			// The container size might have changed, let's reset the resizer state.
			resizer._reset();
		}
	});
}

function removeResizeListener(node) {
	var expando = node[EXPANDO_KEY] || {};
	var resizer = expando.resizer;

	delete expando.resizer;
	unwatchForRender(node);

	if (resizer && resizer.parentNode) {
		resizer.parentNode.removeChild(resizer);
	}
}

function injectCSS(platform, css) {
	// http://stackoverflow.com/q/3922139
	var style = platform._style || document.createElement('style');
	if (!platform._style) {
		platform._style = style;
		css = '/* Chart.js */\n' + css;
		style.setAttribute('type', 'text/css');
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	style.appendChild(document.createTextNode(css));
}

module.exports = {
	/**
	 * This property holds whether this platform is enabled for the current environment.
	 * Currently used by platform.js to select the proper implementation.
	 * @private
	 */
	_enabled: typeof window !== 'undefined' && typeof document !== 'undefined',

	initialize: function() {
		var keyframes = 'from{opacity:0.99}to{opacity:1}';

		injectCSS(this,
			// DOM rendering detection
			// https://davidwalsh.name/detect-node-insertion
			'@-webkit-keyframes ' + CSS_RENDER_ANIMATION + '{' + keyframes + '}' +
			'@keyframes ' + CSS_RENDER_ANIMATION + '{' + keyframes + '}' +
			'.' + CSS_RENDER_MONITOR + '{' +
				'-webkit-animation:' + CSS_RENDER_ANIMATION + ' 0.001s;' +
				'animation:' + CSS_RENDER_ANIMATION + ' 0.001s;' +
			'}'
		);
	},

	acquireContext: function(item, config) {
		if (typeof item === 'string') {
			item = document.getElementById(item);
		} else if (item.length) {
			// Support for array based queries (such as jQuery)
			item = item[0];
		}

		if (item && item.canvas) {
			// Support for any object associated to a canvas (including a context2d)
			item = item.canvas;
		}

		// To prevent canvas fingerprinting, some add-ons undefine the getContext
		// method, for example: https://github.com/kkapsner/CanvasBlocker
		// https://github.com/chartjs/Chart.js/issues/2807
		var context = item && item.getContext && item.getContext('2d');

		// `instanceof HTMLCanvasElement/CanvasRenderingContext2D` fails when the item is
		// inside an iframe or when running in a protected environment. We could guess the
		// types from their toString() value but let's keep things flexible and assume it's
		// a sufficient condition if the item has a context2D which has item as `canvas`.
		// https://github.com/chartjs/Chart.js/issues/3887
		// https://github.com/chartjs/Chart.js/issues/4102
		// https://github.com/chartjs/Chart.js/issues/4152
		if (context && context.canvas === item) {
			initCanvas(item, config);
			return context;
		}

		return null;
	},

	releaseContext: function(context) {
		var canvas = context.canvas;
		if (!canvas[EXPANDO_KEY]) {
			return;
		}

		var initial = canvas[EXPANDO_KEY].initial;
		['height', 'width'].forEach(function(prop) {
			var value = initial[prop];
			if (helpers.isNullOrUndef(value)) {
				canvas.removeAttribute(prop);
			} else {
				canvas.setAttribute(prop, value);
			}
		});

		helpers.each(initial.style || {}, function(value, key) {
			canvas.style[key] = value;
		});

		// The canvas render size might have been changed (and thus the state stack discarded),
		// we can't use save() and restore() to restore the initial state. So make sure that at
		// least the canvas context is reset to the default state by setting the canvas width.
		// https://www.w3.org/TR/2011/WD-html5-20110525/the-canvas-element.html
		canvas.width = canvas.width;

		delete canvas[EXPANDO_KEY];
	},

	addEventListener: function(chart, type, listener) {
		var canvas = chart.canvas;
		if (type === 'resize') {
			// Note: the resize event is not supported on all browsers.
			addResizeListener(canvas, listener, chart);
			return;
		}

		var expando = listener[EXPANDO_KEY] || (listener[EXPANDO_KEY] = {});
		var proxies = expando.proxies || (expando.proxies = {});
		var proxy = proxies[chart.id + '_' + type] = function(event) {
			listener(fromNativeEvent(event, chart));
		};

		addEventListener(canvas, type, proxy);
	},

	removeEventListener: function(chart, type, listener) {
		var canvas = chart.canvas;
		if (type === 'resize') {
			// Note: the resize event is not supported on all browsers.
			removeResizeListener(canvas, listener);
			return;
		}

		var expando = listener[EXPANDO_KEY] || {};
		var proxies = expando.proxies || {};
		var proxy = proxies[chart.id + '_' + type];
		if (!proxy) {
			return;
		}

		removeEventListener(canvas, type, proxy);
	}
};

// DEPRECATIONS

/**
 * Provided for backward compatibility, use EventTarget.addEventListener instead.
 * EventTarget.addEventListener compatibility: Chrome, Opera 7, Safari, FF1.5+, IE9+
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * @function Chart.helpers.addEvent
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.addEvent = addEventListener;

/**
 * Provided for backward compatibility, use EventTarget.removeEventListener instead.
 * EventTarget.removeEventListener compatibility: Chrome, Opera 7, Safari, FF1.5+, IE9+
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
 * @function Chart.helpers.removeEvent
 * @deprecated since version 2.7.0
 * @todo remove at version 3
 * @private
 */
helpers.removeEvent = removeEventListener;

},{"45":45}],48:[function(require,module,exports){
'use strict';

var helpers = require(45);
var basic = require(46);
var dom = require(47);

// @TODO Make possible to select another platform at build time.
var implementation = dom._enabled ? dom : basic;

/**
 * @namespace Chart.platform
 * @see https://chartjs.gitbooks.io/proposals/content/Platform.html
 * @since 2.4.0
 */
module.exports = helpers.extend({
	/**
	 * @since 2.7.0
	 */
	initialize: function() {},

	/**
	 * Called at chart construction time, returns a context2d instance implementing
	 * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
	 * @param {*} item - The native item from which to acquire context (platform specific)
	 * @param {Object} options - The chart options
	 * @returns {CanvasRenderingContext2D} context2d instance
	 */
	acquireContext: function() {},

	/**
	 * Called at chart destruction time, releases any resources associated to the context
	 * previously returned by the acquireContext() method.
	 * @param {CanvasRenderingContext2D} context - The context2d instance
	 * @returns {Boolean} true if the method succeeded, else false
	 */
	releaseContext: function() {},

	/**
	 * Registers the specified listener on the given chart.
	 * @param {Chart} chart - Chart from which to listen for event
	 * @param {String} type - The ({@link IEvent}) type to listen for
	 * @param {Function} listener - Receives a notification (an object that implements
	 * the {@link IEvent} interface) when an event of the specified type occurs.
	 */
	addEventListener: function() {},

	/**
	 * Removes the specified listener previously registered with addEventListener.
	 * @param {Chart} chart -Chart from which to remove the listener
	 * @param {String} type - The ({@link IEvent}) type to remove
	 * @param {Function} listener - The listener function to remove from the event target.
	 */
	removeEventListener: function() {}

}, implementation);

/**
 * @interface IPlatform
 * Allows abstracting platform dependencies away from the chart
 * @borrows Chart.platform.acquireContext as acquireContext
 * @borrows Chart.platform.releaseContext as releaseContext
 * @borrows Chart.platform.addEventListener as addEventListener
 * @borrows Chart.platform.removeEventListener as removeEventListener
 */

/**
 * @interface IEvent
 * @prop {String} type - The event type name, possible values are:
 * 'contextmenu', 'mouseenter', 'mousedown', 'mousemove', 'mouseup', 'mouseout',
 * 'click', 'dblclick', 'keydown', 'keypress', 'keyup' and 'resize'
 * @prop {*} native - The original native event (null for emulated events, e.g. 'resize')
 * @prop {Number} x - The mouse x position, relative to the canvas (null for incompatible events)
 * @prop {Number} y - The mouse y position, relative to the canvas (null for incompatible events)
 */

},{"45":45,"46":46,"47":47}],49:[function(require,module,exports){
/**
 * Plugin based on discussion from the following Chart.js issues:
 * @see https://github.com/chartjs/Chart.js/issues/2380#issuecomment-279961569
 * @see https://github.com/chartjs/Chart.js/issues/2440#issuecomment-256461897
 */

'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('global', {
	plugins: {
		filler: {
			propagate: true
		}
	}
});

module.exports = function() {

	var mappers = {
		dataset: function(source) {
			var index = source.fill;
			var chart = source.chart;
			var meta = chart.getDatasetMeta(index);
			var visible = meta && chart.isDatasetVisible(index);
			var points = (visible && meta.dataset._children) || [];
			var length = points.length || 0;

			return !length ? null : function(point, i) {
				return (i < length && points[i]._view) || null;
			};
		},

		boundary: function(source) {
			var boundary = source.boundary;
			var x = boundary ? boundary.x : null;
			var y = boundary ? boundary.y : null;

			return function(point) {
				return {
					x: x === null ? point.x : x,
					y: y === null ? point.y : y,
				};
			};
		}
	};

	// @todo if (fill[0] === '#')
	function decodeFill(el, index, count) {
		var model = el._model || {};
		var fill = model.fill;
		var target;

		if (fill === undefined) {
			fill = !!model.backgroundColor;
		}

		if (fill === false || fill === null) {
			return false;
		}

		if (fill === true) {
			return 'origin';
		}

		target = parseFloat(fill, 10);
		if (isFinite(target) && Math.floor(target) === target) {
			if (fill[0] === '-' || fill[0] === '+') {
				target = index + target;
			}

			if (target === index || target < 0 || target >= count) {
				return false;
			}

			return target;
		}

		switch (fill) {
		// compatibility
		case 'bottom':
			return 'start';
		case 'top':
			return 'end';
		case 'zero':
			return 'origin';
		// supported boundaries
		case 'origin':
		case 'start':
		case 'end':
			return fill;
		// invalid fill values
		default:
			return false;
		}
	}

	function computeBoundary(source) {
		var model = source.el._model || {};
		var scale = source.el._scale || {};
		var fill = source.fill;
		var target = null;
		var horizontal;

		if (isFinite(fill)) {
			return null;
		}

		// Backward compatibility: until v3, we still need to support boundary values set on
		// the model (scaleTop, scaleBottom and scaleZero) because some external plugins and
		// controllers might still use it (e.g. the Smith chart).

		if (fill === 'start') {
			target = model.scaleBottom === undefined ? scale.bottom : model.scaleBottom;
		} else if (fill === 'end') {
			target = model.scaleTop === undefined ? scale.top : model.scaleTop;
		} else if (model.scaleZero !== undefined) {
			target = model.scaleZero;
		} else if (scale.getBasePosition) {
			target = scale.getBasePosition();
		} else if (scale.getBasePixel) {
			target = scale.getBasePixel();
		}

		if (target !== undefined && target !== null) {
			if (target.x !== undefined && target.y !== undefined) {
				return target;
			}

			if (typeof target === 'number' && isFinite(target)) {
				horizontal = scale.isHorizontal();
				return {
					x: horizontal ? target : null,
					y: horizontal ? null : target
				};
			}
		}

		return null;
	}

	function resolveTarget(sources, index, propagate) {
		var source = sources[index];
		var fill = source.fill;
		var visited = [index];
		var target;

		if (!propagate) {
			return fill;
		}

		while (fill !== false && visited.indexOf(fill) === -1) {
			if (!isFinite(fill)) {
				return fill;
			}

			target = sources[fill];
			if (!target) {
				return false;
			}

			if (target.visible) {
				return fill;
			}

			visited.push(fill);
			fill = target.fill;
		}

		return false;
	}

	function createMapper(source) {
		var fill = source.fill;
		var type = 'dataset';

		if (fill === false) {
			return null;
		}

		if (!isFinite(fill)) {
			type = 'boundary';
		}

		return mappers[type](source);
	}

	function isDrawable(point) {
		return point && !point.skip;
	}

	function drawArea(ctx, curve0, curve1, len0, len1) {
		var i;

		if (!len0 || !len1) {
			return;
		}

		// building first area curve (normal)
		ctx.moveTo(curve0[0].x, curve0[0].y);
		for (i = 1; i < len0; ++i) {
			helpers.canvas.lineTo(ctx, curve0[i - 1], curve0[i]);
		}

		// joining the two area curves
		ctx.lineTo(curve1[len1 - 1].x, curve1[len1 - 1].y);

		// building opposite area curve (reverse)
		for (i = len1 - 1; i > 0; --i) {
			helpers.canvas.lineTo(ctx, curve1[i], curve1[i - 1], true);
		}
	}

	function doFill(ctx, points, mapper, view, color, loop) {
		var count = points.length;
		var span = view.spanGaps;
		var curve0 = [];
		var curve1 = [];
		var len0 = 0;
		var len1 = 0;
		var i, ilen, index, p0, p1, d0, d1;

		ctx.beginPath();

		for (i = 0, ilen = (count + !!loop); i < ilen; ++i) {
			index = i % count;
			p0 = points[index]._view;
			p1 = mapper(p0, index, view);
			d0 = isDrawable(p0);
			d1 = isDrawable(p1);

			if (d0 && d1) {
				len0 = curve0.push(p0);
				len1 = curve1.push(p1);
			} else if (len0 && len1) {
				if (!span) {
					drawArea(ctx, curve0, curve1, len0, len1);
					len0 = len1 = 0;
					curve0 = [];
					curve1 = [];
				} else {
					if (d0) {
						curve0.push(p0);
					}
					if (d1) {
						curve1.push(p1);
					}
				}
			}
		}

		drawArea(ctx, curve0, curve1, len0, len1);

		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}

	return {
		id: 'filler',

		afterDatasetsUpdate: function(chart, options) {
			var count = (chart.data.datasets || []).length;
			var propagate = options.propagate;
			var sources = [];
			var meta, i, el, source;

			for (i = 0; i < count; ++i) {
				meta = chart.getDatasetMeta(i);
				el = meta.dataset;
				source = null;

				if (el && el._model && el instanceof elements.Line) {
					source = {
						visible: chart.isDatasetVisible(i),
						fill: decodeFill(el, i, count),
						chart: chart,
						el: el
					};
				}

				meta.$filler = source;
				sources.push(source);
			}

			for (i = 0; i < count; ++i) {
				source = sources[i];
				if (!source) {
					continue;
				}

				source.fill = resolveTarget(sources, i, propagate);
				source.boundary = computeBoundary(source);
				source.mapper = createMapper(source);
			}
		},

		beforeDatasetDraw: function(chart, args) {
			var meta = args.meta.$filler;
			if (!meta) {
				return;
			}

			var ctx = chart.ctx;
			var el = meta.el;
			var view = el._view;
			var points = el._children || [];
			var mapper = meta.mapper;
			var color = view.backgroundColor || defaults.global.defaultColor;

			if (mapper && color && points.length) {
				helpers.canvas.clipArea(ctx, chart.chartArea);
				doFill(ctx, points, mapper, view, color, el._loop);
				helpers.canvas.unclipArea(ctx);
			}
		}
	};
};

},{"25":25,"40":40,"45":45}],50:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

defaults._set('global', {
	legend: {
		display: true,
		position: 'top',
		fullWidth: true,
		reverse: false,
		weight: 1000,

		// a callback that will handle
		onClick: function(e, legendItem) {
			var index = legendItem.datasetIndex;
			var ci = this.chart;
			var meta = ci.getDatasetMeta(index);

			// See controller.isDatasetVisible comment
			meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

			// We hid a dataset ... rerender the chart
			ci.update();
		},

		onHover: null,

		labels: {
			boxWidth: 40,
			padding: 10,
			// Generates labels shown in the legend
			// Valid properties to return:
			// text : text to display
			// fillStyle : fill of coloured box
			// strokeStyle: stroke of coloured box
			// hidden : if this legend item refers to a hidden item
			// lineCap : cap style for line
			// lineDash
			// lineDashOffset :
			// lineJoin :
			// lineWidth :
			generateLabels: function(chart) {
				var data = chart.data;
				return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
					return {
						text: dataset.label,
						fillStyle: (!helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0]),
						hidden: !chart.isDatasetVisible(i),
						lineCap: dataset.borderCapStyle,
						lineDash: dataset.borderDash,
						lineDashOffset: dataset.borderDashOffset,
						lineJoin: dataset.borderJoinStyle,
						lineWidth: dataset.borderWidth,
						strokeStyle: dataset.borderColor,
						pointStyle: dataset.pointStyle,

						// Below is extra data used for toggling the datasets
						datasetIndex: i
					};
				}, this) : [];
			}
		}
	},

	legendCallback: function(chart) {
		var text = [];
		text.push('<ul class="' + chart.id + '-legend">');
		for (var i = 0; i < chart.data.datasets.length; i++) {
			text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
			if (chart.data.datasets[i].label) {
				text.push(chart.data.datasets[i].label);
			}
			text.push('</li>');
		}
		text.push('</ul>');
		return text.join('');
	}
});

module.exports = function(Chart) {

	var layout = Chart.layoutService;
	var noop = helpers.noop;

	/**
	 * Helper function to get the box width based on the usePointStyle option
	 * @param labelopts {Object} the label options on the legend
	 * @param fontSize {Number} the label font size
	 * @return {Number} width of the color box area
	 */
	function getBoxWidth(labelOpts, fontSize) {
		return labelOpts.usePointStyle ?
			fontSize * Math.SQRT2 :
			labelOpts.boxWidth;
	}

	Chart.Legend = Element.extend({

		initialize: function(config) {
			helpers.extend(this, config);

			// Contains hit boxes for each dataset (in dataset order)
			this.legendHitBoxes = [];

			// Are we in doughnut mode which has a different data type
			this.doughnutMode = false;
		},

		// These methods are ordered by lifecycle. Utilities then follow.
		// Any function defined here is inherited by all legend types.
		// Any function can be extended by the legend type

		beforeUpdate: noop,
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = margins;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();
			// Labels
			me.beforeBuildLabels();
			me.buildLabels();
			me.afterBuildLabels();

			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;
		},
		afterUpdate: noop,

		//

		beforeSetDimensions: noop,
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;

			// Reset minSize
			me.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: noop,

		//

		beforeBuildLabels: noop,
		buildLabels: function() {
			var me = this;
			var labelOpts = me.options.labels || {};
			var legendItems = helpers.callback(labelOpts.generateLabels, [me.chart], me) || [];

			if (labelOpts.filter) {
				legendItems = legendItems.filter(function(item) {
					return labelOpts.filter(item, me.chart.data);
				});
			}

			if (me.options.reverse) {
				legendItems.reverse();
			}

			me.legendItems = legendItems;
		},
		afterBuildLabels: noop,

		//

		beforeFit: noop,
		fit: function() {
			var me = this;
			var opts = me.options;
			var labelOpts = opts.labels;
			var display = opts.display;

			var ctx = me.ctx;

			var globalDefault = defaults.global;
			var valueOrDefault = helpers.valueOrDefault;
			var fontSize = valueOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize);
			var fontStyle = valueOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle);
			var fontFamily = valueOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily);
			var labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

			// Reset hit boxes
			var hitboxes = me.legendHitBoxes = [];

			var minSize = me.minSize;
			var isHorizontal = me.isHorizontal();

			if (isHorizontal) {
				minSize.width = me.maxWidth; // fill all the width
				minSize.height = display ? 10 : 0;
			} else {
				minSize.width = display ? 10 : 0;
				minSize.height = me.maxHeight; // fill all the height
			}

			// Increase sizes here
			if (display) {
				ctx.font = labelFont;

				if (isHorizontal) {
					// Labels

					// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
					var lineWidths = me.lineWidths = [0];
					var totalHeight = me.legendItems.length ? fontSize + (labelOpts.padding) : 0;

					ctx.textAlign = 'left';
					ctx.textBaseline = 'top';

					helpers.each(me.legendItems, function(legendItem, i) {
						var boxWidth = getBoxWidth(labelOpts, fontSize);
						var width = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;

						if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= me.width) {
							totalHeight += fontSize + (labelOpts.padding);
							lineWidths[lineWidths.length] = me.left;
						}

						// Store the hitbox width and height here. Final position will be updated in `draw`
						hitboxes[i] = {
							left: 0,
							top: 0,
							width: width,
							height: fontSize
						};

						lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
					});

					minSize.height += totalHeight;

				} else {
					var vPadding = labelOpts.padding;
					var columnWidths = me.columnWidths = [];
					var totalWidth = labelOpts.padding;
					var currentColWidth = 0;
					var currentColHeight = 0;
					var itemHeight = fontSize + vPadding;

					helpers.each(me.legendItems, function(legendItem, i) {
						var boxWidth = getBoxWidth(labelOpts, fontSize);
						var itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;

						// If too tall, go to new column
						if (currentColHeight + itemHeight > minSize.height) {
							totalWidth += currentColWidth + labelOpts.padding;
							columnWidths.push(currentColWidth); // previous column width

							currentColWidth = 0;
							currentColHeight = 0;
						}

						// Get max width
						currentColWidth = Math.max(currentColWidth, itemWidth);
						currentColHeight += itemHeight;

						// Store the hitbox width and height here. Final position will be updated in `draw`
						hitboxes[i] = {
							left: 0,
							top: 0,
							width: itemWidth,
							height: fontSize
						};
					});

					totalWidth += currentColWidth;
					columnWidths.push(currentColWidth);
					minSize.width += totalWidth;
				}
			}

			me.width = minSize.width;
			me.height = minSize.height;
		},
		afterFit: noop,

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === 'top' || this.options.position === 'bottom';
		},

		// Actually draw the legend on the canvas
		draw: function() {
			var me = this;
			var opts = me.options;
			var labelOpts = opts.labels;
			var globalDefault = defaults.global;
			var lineDefault = globalDefault.elements.line;
			var legendWidth = me.width;
			var lineWidths = me.lineWidths;

			if (opts.display) {
				var ctx = me.ctx;
				var valueOrDefault = helpers.valueOrDefault;
				var fontColor = valueOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor);
				var fontSize = valueOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize);
				var fontStyle = valueOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle);
				var fontFamily = valueOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily);
				var labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
				var cursor;

				// Canvas setup
				ctx.textAlign = 'left';
				ctx.textBaseline = 'middle';
				ctx.lineWidth = 0.5;
				ctx.strokeStyle = fontColor; // for strikethrough effect
				ctx.fillStyle = fontColor; // render in correct colour
				ctx.font = labelFont;

				var boxWidth = getBoxWidth(labelOpts, fontSize);
				var hitboxes = me.legendHitBoxes;

				// current position
				var drawLegendBox = function(x, y, legendItem) {
					if (isNaN(boxWidth) || boxWidth <= 0) {
						return;
					}

					// Set the ctx for the box
					ctx.save();

					ctx.fillStyle = valueOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
					ctx.lineCap = valueOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
					ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
					ctx.lineJoin = valueOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
					ctx.lineWidth = valueOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
					ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
					var isLineWidthZero = (valueOrDefault(legendItem.lineWidth, lineDefault.borderWidth) === 0);

					if (ctx.setLineDash) {
						// IE 9 and 10 do not support line dash
						ctx.setLineDash(valueOrDefault(legendItem.lineDash, lineDefault.borderDash));
					}

					if (opts.labels && opts.labels.usePointStyle) {
						// Recalculate x and y for drawPoint() because its expecting
						// x and y to be center of figure (instead of top left)
						var radius = fontSize * Math.SQRT2 / 2;
						var offSet = radius / Math.SQRT2;
						var centerX = x + offSet;
						var centerY = y + offSet;

						// Draw pointStyle as legend symbol
						helpers.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
					} else {
						// Draw box as legend symbol
						if (!isLineWidthZero) {
							ctx.strokeRect(x, y, boxWidth, fontSize);
						}
						ctx.fillRect(x, y, boxWidth, fontSize);
					}

					ctx.restore();
				};
				var fillText = function(x, y, legendItem, textWidth) {
					var halfFontSize = fontSize / 2;
					var xLeft = boxWidth + halfFontSize + x;
					var yMiddle = y + halfFontSize;

					ctx.fillText(legendItem.text, xLeft, yMiddle);

					if (legendItem.hidden) {
						// Strikethrough the text if hidden
						ctx.beginPath();
						ctx.lineWidth = 2;
						ctx.moveTo(xLeft, yMiddle);
						ctx.lineTo(xLeft + textWidth, yMiddle);
						ctx.stroke();
					}
				};

				// Horizontal
				var isHorizontal = me.isHorizontal();
				if (isHorizontal) {
					cursor = {
						x: me.left + ((legendWidth - lineWidths[0]) / 2),
						y: me.top + labelOpts.padding,
						line: 0
					};
				} else {
					cursor = {
						x: me.left + labelOpts.padding,
						y: me.top + labelOpts.padding,
						line: 0
					};
				}

				var itemHeight = fontSize + labelOpts.padding;
				helpers.each(me.legendItems, function(legendItem, i) {
					var textWidth = ctx.measureText(legendItem.text).width;
					var width = boxWidth + (fontSize / 2) + textWidth;
					var x = cursor.x;
					var y = cursor.y;

					if (isHorizontal) {
						if (x + width >= legendWidth) {
							y = cursor.y += itemHeight;
							cursor.line++;
							x = cursor.x = me.left + ((legendWidth - lineWidths[cursor.line]) / 2);
						}
					} else if (y + itemHeight > me.bottom) {
						x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
						y = cursor.y = me.top + labelOpts.padding;
						cursor.line++;
					}

					drawLegendBox(x, y, legendItem);

					hitboxes[i].left = x;
					hitboxes[i].top = y;

					// Fill the actual label
					fillText(x, y, legendItem, textWidth);

					if (isHorizontal) {
						cursor.x += width + (labelOpts.padding);
					} else {
						cursor.y += itemHeight;
					}

				});
			}
		},

		/**
		 * Handle an event
		 * @private
		 * @param {IEvent} event - The event to handle
		 * @return {Boolean} true if a change occured
		 */
		handleEvent: function(e) {
			var me = this;
			var opts = me.options;
			var type = e.type === 'mouseup' ? 'click' : e.type;
			var changed = false;

			if (type === 'mousemove') {
				if (!opts.onHover) {
					return;
				}
			} else if (type === 'click') {
				if (!opts.onClick) {
					return;
				}
			} else {
				return;
			}

			// Chart event already has relative position in it
			var x = e.x;
			var y = e.y;

			if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
				// See if we are touching one of the dataset boxes
				var lh = me.legendHitBoxes;
				for (var i = 0; i < lh.length; ++i) {
					var hitBox = lh[i];

					if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
						// Touching an element
						if (type === 'click') {
							// use e.native for backwards compatibility
							opts.onClick.call(me, e.native, me.legendItems[i]);
							changed = true;
							break;
						} else if (type === 'mousemove') {
							// use e.native for backwards compatibility
							opts.onHover.call(me, e.native, me.legendItems[i]);
							changed = true;
							break;
						}
					}
				}
			}

			return changed;
		}
	});

	function createNewLegendAndAttach(chart, legendOpts) {
		var legend = new Chart.Legend({
			ctx: chart.ctx,
			options: legendOpts,
			chart: chart
		});

		layout.configure(chart, legend, legendOpts);
		layout.addBox(chart, legend);
		chart.legend = legend;
	}

	return {
		id: 'legend',

		beforeInit: function(chart) {
			var legendOpts = chart.options.legend;

			if (legendOpts) {
				createNewLegendAndAttach(chart, legendOpts);
			}
		},

		beforeUpdate: function(chart) {
			var legendOpts = chart.options.legend;
			var legend = chart.legend;

			if (legendOpts) {
				helpers.mergeIf(legendOpts, defaults.global.legend);

				if (legend) {
					layout.configure(chart, legend, legendOpts);
					legend.options = legendOpts;
				} else {
					createNewLegendAndAttach(chart, legendOpts);
				}
			} else if (legend) {
				layout.removeBox(chart, legend);
				delete chart.legend;
			}
		},

		afterEvent: function(chart, e) {
			var legend = chart.legend;
			if (legend) {
				legend.handleEvent(e);
			}
		}
	};
};

},{"25":25,"26":26,"45":45}],51:[function(require,module,exports){
'use strict';

var defaults = require(25);
var Element = require(26);
var helpers = require(45);

defaults._set('global', {
	title: {
		display: false,
		fontStyle: 'bold',
		fullWidth: true,
		lineHeight: 1.2,
		padding: 10,
		position: 'top',
		text: '',
		weight: 2000         // by default greater than legend (1000) to be above
	}
});

module.exports = function(Chart) {

	var layout = Chart.layoutService;
	var noop = helpers.noop;

	Chart.Title = Element.extend({
		initialize: function(config) {
			var me = this;
			helpers.extend(me, config);

			// Contains hit boxes for each dataset (in dataset order)
			me.legendHitBoxes = [];
		},

		// These methods are ordered by lifecycle. Utilities then follow.

		beforeUpdate: noop,
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = margins;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();
			// Labels
			me.beforeBuildLabels();
			me.buildLabels();
			me.afterBuildLabels();

			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;

		},
		afterUpdate: noop,

		//

		beforeSetDimensions: noop,
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;

			// Reset minSize
			me.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: noop,

		//

		beforeBuildLabels: noop,
		buildLabels: noop,
		afterBuildLabels: noop,

		//

		beforeFit: noop,
		fit: function() {
			var me = this;
			var valueOrDefault = helpers.valueOrDefault;
			var opts = me.options;
			var display = opts.display;
			var fontSize = valueOrDefault(opts.fontSize, defaults.global.defaultFontSize);
			var minSize = me.minSize;
			var lineCount = helpers.isArray(opts.text) ? opts.text.length : 1;
			var lineHeight = helpers.options.toLineHeight(opts.lineHeight, fontSize);
			var textSize = display ? (lineCount * lineHeight) + (opts.padding * 2) : 0;

			if (me.isHorizontal()) {
				minSize.width = me.maxWidth; // fill all the width
				minSize.height = textSize;
			} else {
				minSize.width = textSize;
				minSize.height = me.maxHeight; // fill all the height
			}

			me.width = minSize.width;
			me.height = minSize.height;

		},
		afterFit: noop,

		// Shared Methods
		isHorizontal: function() {
			var pos = this.options.position;
			return pos === 'top' || pos === 'bottom';
		},

		// Actually draw the title block on the canvas
		draw: function() {
			var me = this;
			var ctx = me.ctx;
			var valueOrDefault = helpers.valueOrDefault;
			var opts = me.options;
			var globalDefaults = defaults.global;

			if (opts.display) {
				var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize);
				var fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle);
				var fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily);
				var titleFont = helpers.fontString(fontSize, fontStyle, fontFamily);
				var lineHeight = helpers.options.toLineHeight(opts.lineHeight, fontSize);
				var offset = lineHeight / 2 + opts.padding;
				var rotation = 0;
				var top = me.top;
				var left = me.left;
				var bottom = me.bottom;
				var right = me.right;
				var maxWidth, titleX, titleY;

				ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor); // render in correct colour
				ctx.font = titleFont;

				// Horizontal
				if (me.isHorizontal()) {
					titleX = left + ((right - left) / 2); // midpoint of the width
					titleY = top + offset;
					maxWidth = right - left;
				} else {
					titleX = opts.position === 'left' ? left + offset : right - offset;
					titleY = top + ((bottom - top) / 2);
					maxWidth = bottom - top;
					rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
				}

				ctx.save();
				ctx.translate(titleX, titleY);
				ctx.rotate(rotation);
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				var text = opts.text;
				if (helpers.isArray(text)) {
					var y = 0;
					for (var i = 0; i < text.length; ++i) {
						ctx.fillText(text[i], 0, y, maxWidth);
						y += lineHeight;
					}
				} else {
					ctx.fillText(text, 0, 0, maxWidth);
				}

				ctx.restore();
			}
		}
	});

	function createNewTitleBlockAndAttach(chart, titleOpts) {
		var title = new Chart.Title({
			ctx: chart.ctx,
			options: titleOpts,
			chart: chart
		});

		layout.configure(chart, title, titleOpts);
		layout.addBox(chart, title);
		chart.titleBlock = title;
	}

	return {
		id: 'title',

		beforeInit: function(chart) {
			var titleOpts = chart.options.title;

			if (titleOpts) {
				createNewTitleBlockAndAttach(chart, titleOpts);
			}
		},

		beforeUpdate: function(chart) {
			var titleOpts = chart.options.title;
			var titleBlock = chart.titleBlock;

			if (titleOpts) {
				helpers.mergeIf(titleOpts, defaults.global.title);

				if (titleBlock) {
					layout.configure(chart, titleBlock, titleOpts);
					titleBlock.options = titleOpts;
				} else {
					createNewTitleBlockAndAttach(chart, titleOpts);
				}
			} else if (titleBlock) {
				Chart.layoutService.removeBox(chart, titleBlock);
				delete chart.titleBlock;
			}
		}
	};
};

},{"25":25,"26":26,"45":45}],52:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	// Default config for a category scale
	var defaultConfig = {
		position: 'bottom'
	};

	var DatasetScale = Chart.Scale.extend({
		/**
		* Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use those
		* else fall back to data.labels
		* @private
		*/
		getLabels: function() {
			var data = this.chart.data;
			return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
		},

		determineDataLimits: function() {
			var me = this;
			var labels = me.getLabels();
			me.minIndex = 0;
			me.maxIndex = labels.length - 1;
			var findIndex;

			if (me.options.ticks.min !== undefined) {
				// user specified min value
				findIndex = labels.indexOf(me.options.ticks.min);
				me.minIndex = findIndex !== -1 ? findIndex : me.minIndex;
			}

			if (me.options.ticks.max !== undefined) {
				// user specified max value
				findIndex = labels.indexOf(me.options.ticks.max);
				me.maxIndex = findIndex !== -1 ? findIndex : me.maxIndex;
			}

			me.min = labels[me.minIndex];
			me.max = labels[me.maxIndex];
		},

		buildTicks: function() {
			var me = this;
			var labels = me.getLabels();
			// If we are viewing some subset of labels, slice the original array
			me.ticks = (me.minIndex === 0 && me.maxIndex === labels.length - 1) ? labels : labels.slice(me.minIndex, me.maxIndex + 1);
		},

		getLabelForIndex: function(index, datasetIndex) {
			var me = this;
			var data = me.chart.data;
			var isHorizontal = me.isHorizontal();

			if (data.yLabels && !isHorizontal) {
				return me.getRightValue(data.datasets[datasetIndex].data[index]);
			}
			return me.ticks[index - me.minIndex];
		},

		// Used to get data value locations.  Value can either be an index or a numerical value
		getPixelForValue: function(value, index) {
			var me = this;
			var offset = me.options.offset;
			// 1 is added because we need the length but we have the indexes
			var offsetAmt = Math.max((me.maxIndex + 1 - me.minIndex - (offset ? 0 : 1)), 1);

			// If value is a data object, then index is the index in the data array,
			// not the index of the scale. We need to change that.
			var valueCategory;
			if (value !== undefined && value !== null) {
				valueCategory = me.isHorizontal() ? value.x : value.y;
			}
			if (valueCategory !== undefined || (value !== undefined && isNaN(index))) {
				var labels = me.getLabels();
				value = valueCategory || value;
				var idx = labels.indexOf(value);
				index = idx !== -1 ? idx : index;
			}

			if (me.isHorizontal()) {
				var valueWidth = me.width / offsetAmt;
				var widthOffset = (valueWidth * (index - me.minIndex));

				if (offset) {
					widthOffset += (valueWidth / 2);
				}

				return me.left + Math.round(widthOffset);
			}
			var valueHeight = me.height / offsetAmt;
			var heightOffset = (valueHeight * (index - me.minIndex));

			if (offset) {
				heightOffset += (valueHeight / 2);
			}

			return me.top + Math.round(heightOffset);
		},
		getPixelForTick: function(index) {
			return this.getPixelForValue(this.ticks[index], index + this.minIndex, null);
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var offset = me.options.offset;
			var value;
			var offsetAmt = Math.max((me._ticks.length - (offset ? 0 : 1)), 1);
			var horz = me.isHorizontal();
			var valueDimension = (horz ? me.width : me.height) / offsetAmt;

			pixel -= horz ? me.left : me.top;

			if (offset) {
				pixel -= (valueDimension / 2);
			}

			if (pixel <= 0) {
				value = 0;
			} else {
				value = Math.round(pixel / valueDimension);
			}

			return value + me.minIndex;
		},
		getBasePixel: function() {
			return this.bottom;
		}
	});

	Chart.scaleService.registerScaleType('category', DatasetScale, defaultConfig);

};

},{}],53:[function(require,module,exports){
'use strict';

var defaults = require(25);
var helpers = require(45);
var Ticks = require(34);

module.exports = function(Chart) {

	var defaultConfig = {
		position: 'left',
		ticks: {
			callback: Ticks.formatters.linear
		}
	};

	var LinearScale = Chart.LinearScaleBase.extend({

		determineDataLimits: function() {
			var me = this;
			var opts = me.options;
			var chart = me.chart;
			var data = chart.data;
			var datasets = data.datasets;
			var isHorizontal = me.isHorizontal();
			var DEFAULT_MIN = 0;
			var DEFAULT_MAX = 1;

			function IDMatches(meta) {
				return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
			}

			// First Calculate the range
			me.min = null;
			me.max = null;

			var hasStacks = opts.stacked;
			if (hasStacks === undefined) {
				helpers.each(datasets, function(dataset, datasetIndex) {
					if (hasStacks) {
						return;
					}

					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) &&
						meta.stack !== undefined) {
						hasStacks = true;
					}
				});
			}

			if (opts.stacked || hasStacks) {
				var valuesPerStack = {};

				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					var key = [
						meta.type,
						// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
						((opts.stacked === undefined && meta.stack === undefined) ? datasetIndex : ''),
						meta.stack
					].join('.');

					if (valuesPerStack[key] === undefined) {
						valuesPerStack[key] = {
							positiveValues: [],
							negativeValues: []
						};
					}

					// Store these per type
					var positiveValues = valuesPerStack[key].positiveValues;
					var negativeValues = valuesPerStack[key].negativeValues;

					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							positiveValues[index] = positiveValues[index] || 0;
							negativeValues[index] = negativeValues[index] || 0;

							if (opts.relativePoints) {
								positiveValues[index] = 100;
							} else if (value < 0) {
								negativeValues[index] += value;
							} else {
								positiveValues[index] += value;
							}
						});
					}
				});

				helpers.each(valuesPerStack, function(valuesForType) {
					var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
					var minVal = helpers.min(values);
					var maxVal = helpers.max(values);
					me.min = me.min === null ? minVal : Math.min(me.min, minVal);
					me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
				});

			} else {
				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}

							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}
						});
					}
				});
			}

			me.min = isFinite(me.min) && !isNaN(me.min) ? me.min : DEFAULT_MIN;
			me.max = isFinite(me.max) && !isNaN(me.max) ? me.max : DEFAULT_MAX;

			// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
			this.handleTickRangeOptions();
		},
		getTickLimit: function() {
			var maxTicks;
			var me = this;
			var tickOpts = me.options.ticks;

			if (me.isHorizontal()) {
				maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.width / 50));
			} else {
				// The factor of 2 used to scale the font size has been experimentally determined.
				var tickFontSize = helpers.valueOrDefault(tickOpts.fontSize, defaults.global.defaultFontSize);
				maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.height / (2 * tickFontSize)));
			}

			return maxTicks;
		},
		// Called after the ticks are built. We need
		handleDirectionalChanges: function() {
			if (!this.isHorizontal()) {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.ticks.reverse();
			}
		},
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		// Utils
		getPixelForValue: function(value) {
			// This must be called after fit has been run so that
			// this.left, this.top, this.right, and this.bottom have been defined
			var me = this;
			var start = me.start;

			var rightValue = +me.getRightValue(value);
			var pixel;
			var range = me.end - start;

			if (me.isHorizontal()) {
				pixel = me.left + (me.width / range * (rightValue - start));
				return Math.round(pixel);
			}

			pixel = me.bottom - (me.height / range * (rightValue - start));
			return Math.round(pixel);
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var isHorizontal = me.isHorizontal();
			var innerDimension = isHorizontal ? me.width : me.height;
			var offset = (isHorizontal ? pixel - me.left : me.bottom - pixel) / innerDimension;
			return me.start + ((me.end - me.start) * offset);
		},
		getPixelForTick: function(index) {
			return this.getPixelForValue(this.ticksAsNumbers[index]);
		}
	});
	Chart.scaleService.registerScaleType('linear', LinearScale, defaultConfig);

};

},{"25":25,"34":34,"45":45}],54:[function(require,module,exports){
'use strict';

var helpers = require(45);
var Ticks = require(34);

module.exports = function(Chart) {

	var noop = helpers.noop;

	Chart.LinearScaleBase = Chart.Scale.extend({
		getRightValue: function(value) {
			if (typeof value === 'string') {
				return +value;
			}
			return Chart.Scale.prototype.getRightValue.call(this, value);
		},

		handleTickRangeOptions: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;

			// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
			// do nothing since that would make the chart weird. If the user really wants a weird chart
			// axis, they can manually override it
			if (tickOpts.beginAtZero) {
				var minSign = helpers.sign(me.min);
				var maxSign = helpers.sign(me.max);

				if (minSign < 0 && maxSign < 0) {
					// move the top up to 0
					me.max = 0;
				} else if (minSign > 0 && maxSign > 0) {
					// move the bottom down to 0
					me.min = 0;
				}
			}

			var setMin = tickOpts.min !== undefined || tickOpts.suggestedMin !== undefined;
			var setMax = tickOpts.max !== undefined || tickOpts.suggestedMax !== undefined;

			if (tickOpts.min !== undefined) {
				me.min = tickOpts.min;
			} else if (tickOpts.suggestedMin !== undefined) {
				if (me.min === null) {
					me.min = tickOpts.suggestedMin;
				} else {
					me.min = Math.min(me.min, tickOpts.suggestedMin);
				}
			}

			if (tickOpts.max !== undefined) {
				me.max = tickOpts.max;
			} else if (tickOpts.suggestedMax !== undefined) {
				if (me.max === null) {
					me.max = tickOpts.suggestedMax;
				} else {
					me.max = Math.max(me.max, tickOpts.suggestedMax);
				}
			}

			if (setMin !== setMax) {
				// We set the min or the max but not both.
				// So ensure that our range is good
				// Inverted or 0 length range can happen when
				// ticks.min is set, and no datasets are visible
				if (me.min >= me.max) {
					if (setMin) {
						me.max = me.min + 1;
					} else {
						me.min = me.max - 1;
					}
				}
			}

			if (me.min === me.max) {
				me.max++;

				if (!tickOpts.beginAtZero) {
					me.min--;
				}
			}
		},
		getTickLimit: noop,
		handleDirectionalChanges: noop,

		buildTicks: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph. Make sure we always have at least 2 ticks
			var maxTicks = me.getTickLimit();
			maxTicks = Math.max(2, maxTicks);

			var numericGeneratorOptions = {
				maxTicks: maxTicks,
				min: tickOpts.min,
				max: tickOpts.max,
				stepSize: helpers.valueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
			};
			var ticks = me.ticks = Ticks.generators.linear(numericGeneratorOptions, me);

			me.handleDirectionalChanges();

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers.max(ticks);
			me.min = helpers.min(ticks);

			if (tickOpts.reverse) {
				ticks.reverse();

				me.start = me.max;
				me.end = me.min;
			} else {
				me.start = me.min;
				me.end = me.max;
			}
		},
		convertTicksToLabels: function() {
			var me = this;
			me.ticksAsNumbers = me.ticks.slice();
			me.zeroLineIndex = me.ticks.indexOf(0);

			Chart.Scale.prototype.convertTicksToLabels.call(me);
		}
	});
};

},{"34":34,"45":45}],55:[function(require,module,exports){
'use strict';

var helpers = require(45);
var Ticks = require(34);

module.exports = function(Chart) {

	var defaultConfig = {
		position: 'left',

		// label settings
		ticks: {
			callback: Ticks.formatters.logarithmic
		}
	};

	var LogarithmicScale = Chart.Scale.extend({
		determineDataLimits: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;
			var chart = me.chart;
			var data = chart.data;
			var datasets = data.datasets;
			var valueOrDefault = helpers.valueOrDefault;
			var isHorizontal = me.isHorizontal();
			function IDMatches(meta) {
				return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
			}

			// Calculate Range
			me.min = null;
			me.max = null;
			me.minNotZero = null;

			var hasStacks = opts.stacked;
			if (hasStacks === undefined) {
				helpers.each(datasets, function(dataset, datasetIndex) {
					if (hasStacks) {
						return;
					}

					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) &&
						meta.stack !== undefined) {
						hasStacks = true;
					}
				});
			}

			if (opts.stacked || hasStacks) {
				var valuesPerStack = {};

				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					var key = [
						meta.type,
						// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
						((opts.stacked === undefined && meta.stack === undefined) ? datasetIndex : ''),
						meta.stack
					].join('.');

					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						if (valuesPerStack[key] === undefined) {
							valuesPerStack[key] = [];
						}

						helpers.each(dataset.data, function(rawValue, index) {
							var values = valuesPerStack[key];
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							values[index] = values[index] || 0;

							if (opts.relativePoints) {
								values[index] = 100;
							} else {
								// Don't need to split positive and negative since the log scale can't handle a 0 crossing
								values[index] += value;
							}
						});
					}
				});

				helpers.each(valuesPerStack, function(valuesForType) {
					var minVal = helpers.min(valuesForType);
					var maxVal = helpers.max(valuesForType);
					me.min = me.min === null ? minVal : Math.min(me.min, minVal);
					me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
				});

			} else {
				helpers.each(datasets, function(dataset, datasetIndex) {
					var meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}

							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}

							if (value !== 0 && (me.minNotZero === null || value < me.minNotZero)) {
								me.minNotZero = value;
							}
						});
					}
				});
			}

			me.min = valueOrDefault(tickOpts.min, me.min);
			me.max = valueOrDefault(tickOpts.max, me.max);

			if (me.min === me.max) {
				if (me.min !== 0 && me.min !== null) {
					me.min = Math.pow(10, Math.floor(helpers.log10(me.min)) - 1);
					me.max = Math.pow(10, Math.floor(helpers.log10(me.max)) + 1);
				} else {
					me.min = 1;
					me.max = 10;
				}
			}
		},
		buildTicks: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;

			var generationOptions = {
				min: tickOpts.min,
				max: tickOpts.max
			};
			var ticks = me.ticks = Ticks.generators.logarithmic(generationOptions, me);

			if (!me.isHorizontal()) {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				ticks.reverse();
			}

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers.max(ticks);
			me.min = helpers.min(ticks);

			if (tickOpts.reverse) {
				ticks.reverse();

				me.start = me.max;
				me.end = me.min;
			} else {
				me.start = me.min;
				me.end = me.max;
			}
		},
		convertTicksToLabels: function() {
			this.tickValues = this.ticks.slice();

			Chart.Scale.prototype.convertTicksToLabels.call(this);
		},
		// Get the correct tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		getPixelForTick: function(index) {
			return this.getPixelForValue(this.tickValues[index]);
		},
		getPixelForValue: function(value) {
			var me = this;
			var start = me.start;
			var newVal = +me.getRightValue(value);
			var opts = me.options;
			var tickOpts = opts.ticks;
			var innerDimension, pixel, range;

			if (me.isHorizontal()) {
				range = helpers.log10(me.end) - helpers.log10(start); // todo: if start === 0
				if (newVal === 0) {
					pixel = me.left;
				} else {
					innerDimension = me.width;
					pixel = me.left + (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
				}
			} else {
				// Bottom - top since pixels increase downward on a screen
				innerDimension = me.height;
				if (start === 0 && !tickOpts.reverse) {
					range = helpers.log10(me.end) - helpers.log10(me.minNotZero);
					if (newVal === start) {
						pixel = me.bottom;
					} else if (newVal === me.minNotZero) {
						pixel = me.bottom - innerDimension * 0.02;
					} else {
						pixel = me.bottom - innerDimension * 0.02 - (innerDimension * 0.98 / range * (helpers.log10(newVal) - helpers.log10(me.minNotZero)));
					}
				} else if (me.end === 0 && tickOpts.reverse) {
					range = helpers.log10(me.start) - helpers.log10(me.minNotZero);
					if (newVal === me.end) {
						pixel = me.top;
					} else if (newVal === me.minNotZero) {
						pixel = me.top + innerDimension * 0.02;
					} else {
						pixel = me.top + innerDimension * 0.02 + (innerDimension * 0.98 / range * (helpers.log10(newVal) - helpers.log10(me.minNotZero)));
					}
				} else if (newVal === 0) {
					pixel = tickOpts.reverse ? me.top : me.bottom;
				} else {
					range = helpers.log10(me.end) - helpers.log10(start);
					innerDimension = me.height;
					pixel = me.bottom - (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
				}
			}
			return pixel;
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var range = helpers.log10(me.end) - helpers.log10(me.start);
			var value, innerDimension;

			if (me.isHorizontal()) {
				innerDimension = me.width;
				value = me.start * Math.pow(10, (pixel - me.left) * range / innerDimension);
			} else { // todo: if start === 0
				innerDimension = me.height;
				value = Math.pow(10, (me.bottom - pixel) * range / innerDimension) / me.start;
			}
			return value;
		}
	});
	Chart.scaleService.registerScaleType('logarithmic', LogarithmicScale, defaultConfig);

};

},{"34":34,"45":45}],56:[function(require,module,exports){
'use strict';

var defaults = require(25);
var helpers = require(45);
var Ticks = require(34);

module.exports = function(Chart) {

	var globalDefaults = defaults.global;

	var defaultConfig = {
		display: true,

		// Boolean - Whether to animate scaling the chart from the centre
		animate: true,
		position: 'chartArea',

		angleLines: {
			display: true,
			color: 'rgba(0, 0, 0, 0.1)',
			lineWidth: 1
		},

		gridLines: {
			circular: false
		},

		// label settings
		ticks: {
			// Boolean - Show a backdrop to the scale label
			showLabelBackdrop: true,

			// String - The colour of the label backdrop
			backdropColor: 'rgba(255,255,255,0.75)',

			// Number - The backdrop padding above & below the label in pixels
			backdropPaddingY: 2,

			// Number - The backdrop padding to the side of the label in pixels
			backdropPaddingX: 2,

			callback: Ticks.formatters.linear
		},

		pointLabels: {
			// Boolean - if true, show point labels
			display: true,

			// Number - Point label font size in pixels
			fontSize: 10,

			// Function - Used to convert point labels
			callback: function(label) {
				return label;
			}
		}
	};

	function getValueCount(scale) {
		var opts = scale.options;
		return opts.angleLines.display || opts.pointLabels.display ? scale.chart.data.labels.length : 0;
	}

	function getPointLabelFontOptions(scale) {
		var pointLabelOptions = scale.options.pointLabels;
		var fontSize = helpers.valueOrDefault(pointLabelOptions.fontSize, globalDefaults.defaultFontSize);
		var fontStyle = helpers.valueOrDefault(pointLabelOptions.fontStyle, globalDefaults.defaultFontStyle);
		var fontFamily = helpers.valueOrDefault(pointLabelOptions.fontFamily, globalDefaults.defaultFontFamily);
		var font = helpers.fontString(fontSize, fontStyle, fontFamily);

		return {
			size: fontSize,
			style: fontStyle,
			family: fontFamily,
			font: font
		};
	}

	function measureLabelSize(ctx, fontSize, label) {
		if (helpers.isArray(label)) {
			return {
				w: helpers.longestText(ctx, ctx.font, label),
				h: (label.length * fontSize) + ((label.length - 1) * 1.5 * fontSize)
			};
		}

		return {
			w: ctx.measureText(label).width,
			h: fontSize
		};
	}

	function determineLimits(angle, pos, size, min, max) {
		if (angle === min || angle === max) {
			return {
				start: pos - (size / 2),
				end: pos + (size / 2)
			};
		} else if (angle < min || angle > max) {
			return {
				start: pos - size - 5,
				end: pos
			};
		}

		return {
			start: pos,
			end: pos + size + 5
		};
	}

	/**
	 * Helper function to fit a radial linear scale with point labels
	 */
	function fitWithPointLabels(scale) {
		/*
		 * Right, this is really confusing and there is a lot of maths going on here
		 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
		 *
		 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
		 *
		 * Solution:
		 *
		 * We assume the radius of the polygon is half the size of the canvas at first
		 * at each index we check if the text overlaps.
		 *
		 * Where it does, we store that angle and that index.
		 *
		 * After finding the largest index and angle we calculate how much we need to remove
		 * from the shape radius to move the point inwards by that x.
		 *
		 * We average the left and right distances to get the maximum shape radius that can fit in the box
		 * along with labels.
		 *
		 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
		 * on each side, removing that from the size, halving it and adding the left x protrusion width.
		 *
		 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
		 * and position it in the most space efficient manner
		 *
		 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
		 */

		var plFont = getPointLabelFontOptions(scale);

		// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
		// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
		var largestPossibleRadius = Math.min(scale.height / 2, scale.width / 2);
		var furthestLimits = {
			r: scale.width,
			l: 0,
			t: scale.height,
			b: 0
		};
		var furthestAngles = {};
		var i, textSize, pointPosition;

		scale.ctx.font = plFont.font;
		scale._pointLabelSizes = [];

		var valueCount = getValueCount(scale);
		for (i = 0; i < valueCount; i++) {
			pointPosition = scale.getPointPosition(i, largestPossibleRadius);
			textSize = measureLabelSize(scale.ctx, plFont.size, scale.pointLabels[i] || '');
			scale._pointLabelSizes[i] = textSize;

			// Add quarter circle to make degree 0 mean top of circle
			var angleRadians = scale.getIndexAngle(i);
			var angle = helpers.toDegrees(angleRadians) % 360;
			var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
			var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);

			if (hLimits.start < furthestLimits.l) {
				furthestLimits.l = hLimits.start;
				furthestAngles.l = angleRadians;
			}

			if (hLimits.end > furthestLimits.r) {
				furthestLimits.r = hLimits.end;
				furthestAngles.r = angleRadians;
			}

			if (vLimits.start < furthestLimits.t) {
				furthestLimits.t = vLimits.start;
				furthestAngles.t = angleRadians;
			}

			if (vLimits.end > furthestLimits.b) {
				furthestLimits.b = vLimits.end;
				furthestAngles.b = angleRadians;
			}
		}

		scale.setReductions(largestPossibleRadius, furthestLimits, furthestAngles);
	}

	/**
	 * Helper function to fit a radial linear scale with no point labels
	 */
	function fit(scale) {
		var largestPossibleRadius = Math.min(scale.height / 2, scale.width / 2);
		scale.drawingArea = Math.round(largestPossibleRadius);
		scale.setCenterPoint(0, 0, 0, 0);
	}

	function getTextAlignForAngle(angle) {
		if (angle === 0 || angle === 180) {
			return 'center';
		} else if (angle < 180) {
			return 'left';
		}

		return 'right';
	}

	function fillText(ctx, text, position, fontSize) {
		if (helpers.isArray(text)) {
			var y = position.y;
			var spacing = 1.5 * fontSize;

			for (var i = 0; i < text.length; ++i) {
				ctx.fillText(text[i], position.x, y);
				y += spacing;
			}
		} else {
			ctx.fillText(text, position.x, position.y);
		}
	}

	function adjustPointPositionForLabelHeight(angle, textSize, position) {
		if (angle === 90 || angle === 270) {
			position.y -= (textSize.h / 2);
		} else if (angle > 270 || angle < 90) {
			position.y -= textSize.h;
		}
	}

	function drawPointLabels(scale) {
		var ctx = scale.ctx;
		var valueOrDefault = helpers.valueOrDefault;
		var opts = scale.options;
		var angleLineOpts = opts.angleLines;
		var pointLabelOpts = opts.pointLabels;

		ctx.lineWidth = angleLineOpts.lineWidth;
		ctx.strokeStyle = angleLineOpts.color;

		var outerDistance = scale.getDistanceFromCenterForValue(opts.ticks.reverse ? scale.min : scale.max);

		// Point Label Font
		var plFont = getPointLabelFontOptions(scale);

		ctx.textBaseline = 'top';

		for (var i = getValueCount(scale) - 1; i >= 0; i--) {
			if (angleLineOpts.display) {
				var outerPosition = scale.getPointPosition(i, outerDistance);
				ctx.beginPath();
				ctx.moveTo(scale.xCenter, scale.yCenter);
				ctx.lineTo(outerPosition.x, outerPosition.y);
				ctx.stroke();
				ctx.closePath();
			}

			if (pointLabelOpts.display) {
				// Extra 3px out for some label spacing
				var pointLabelPosition = scale.getPointPosition(i, outerDistance + 5);

				// Keep this in loop since we may support array properties here
				var pointLabelFontColor = valueOrDefault(pointLabelOpts.fontColor, globalDefaults.defaultFontColor);
				ctx.font = plFont.font;
				ctx.fillStyle = pointLabelFontColor;

				var angleRadians = scale.getIndexAngle(i);
				var angle = helpers.toDegrees(angleRadians);
				ctx.textAlign = getTextAlignForAngle(angle);
				adjustPointPositionForLabelHeight(angle, scale._pointLabelSizes[i], pointLabelPosition);
				fillText(ctx, scale.pointLabels[i] || '', pointLabelPosition, plFont.size);
			}
		}
	}

	function drawRadiusLine(scale, gridLineOpts, radius, index) {
		var ctx = scale.ctx;
		ctx.strokeStyle = helpers.valueAtIndexOrDefault(gridLineOpts.color, index - 1);
		ctx.lineWidth = helpers.valueAtIndexOrDefault(gridLineOpts.lineWidth, index - 1);

		if (scale.options.gridLines.circular) {
			// Draw circular arcs between the points
			ctx.beginPath();
			ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.stroke();
		} else {
			// Draw straight lines connecting each index
			var valueCount = getValueCount(scale);

			if (valueCount === 0) {
				return;
			}

			ctx.beginPath();
			var pointPosition = scale.getPointPosition(0, radius);
			ctx.moveTo(pointPosition.x, pointPosition.y);

			for (var i = 1; i < valueCount; i++) {
				pointPosition = scale.getPointPosition(i, radius);
				ctx.lineTo(pointPosition.x, pointPosition.y);
			}

			ctx.closePath();
			ctx.stroke();
		}
	}

	function numberOrZero(param) {
		return helpers.isNumber(param) ? param : 0;
	}

	var LinearRadialScale = Chart.LinearScaleBase.extend({
		setDimensions: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;
			// Set the unconstrained dimension before label rotation
			me.width = me.maxWidth;
			me.height = me.maxHeight;
			me.xCenter = Math.round(me.width / 2);
			me.yCenter = Math.round(me.height / 2);

			var minSize = helpers.min([me.height, me.width]);
			var tickFontSize = helpers.valueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
			me.drawingArea = opts.display ? (minSize / 2) - (tickFontSize / 2 + tickOpts.backdropPaddingY) : (minSize / 2);
		},
		determineDataLimits: function() {
			var me = this;
			var chart = me.chart;
			var min = Number.POSITIVE_INFINITY;
			var max = Number.NEGATIVE_INFINITY;

			helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
				if (chart.isDatasetVisible(datasetIndex)) {
					var meta = chart.getDatasetMeta(datasetIndex);

					helpers.each(dataset.data, function(rawValue, index) {
						var value = +me.getRightValue(rawValue);
						if (isNaN(value) || meta.data[index].hidden) {
							return;
						}

						min = Math.min(value, min);
						max = Math.max(value, max);
					});
				}
			});

			me.min = (min === Number.POSITIVE_INFINITY ? 0 : min);
			me.max = (max === Number.NEGATIVE_INFINITY ? 0 : max);

			// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
			me.handleTickRangeOptions();
		},
		getTickLimit: function() {
			var tickOpts = this.options.ticks;
			var tickFontSize = helpers.valueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
			return Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
		},
		convertTicksToLabels: function() {
			var me = this;

			Chart.LinearScaleBase.prototype.convertTicksToLabels.call(me);

			// Point labels
			me.pointLabels = me.chart.data.labels.map(me.options.pointLabels.callback, me);
		},
		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},
		fit: function() {
			if (this.options.pointLabels.display) {
				fitWithPointLabels(this);
			} else {
				fit(this);
			}
		},
		/**
		 * Set radius reductions and determine new radius and center point
		 * @private
		 */
		setReductions: function(largestPossibleRadius, furthestLimits, furthestAngles) {
			var me = this;
			var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
			var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
			var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
			var radiusReductionBottom = -Math.max(furthestLimits.b - me.height, 0) / Math.cos(furthestAngles.b);

			radiusReductionLeft = numberOrZero(radiusReductionLeft);
			radiusReductionRight = numberOrZero(radiusReductionRight);
			radiusReductionTop = numberOrZero(radiusReductionTop);
			radiusReductionBottom = numberOrZero(radiusReductionBottom);

			me.drawingArea = Math.min(
				Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2),
				Math.round(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2));
			me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
		},
		setCenterPoint: function(leftMovement, rightMovement, topMovement, bottomMovement) {
			var me = this;
			var maxRight = me.width - rightMovement - me.drawingArea;
			var maxLeft = leftMovement + me.drawingArea;
			var maxTop = topMovement + me.drawingArea;
			var maxBottom = me.height - bottomMovement - me.drawingArea;

			me.xCenter = Math.round(((maxLeft + maxRight) / 2) + me.left);
			me.yCenter = Math.round(((maxTop + maxBottom) / 2) + me.top);
		},

		getIndexAngle: function(index) {
			var angleMultiplier = (Math.PI * 2) / getValueCount(this);
			var startAngle = this.chart.options && this.chart.options.startAngle ?
				this.chart.options.startAngle :
				0;

			var startAngleRadians = startAngle * Math.PI * 2 / 360;

			// Start from the top instead of right, so remove a quarter of the circle
			return index * angleMultiplier + startAngleRadians;
		},
		getDistanceFromCenterForValue: function(value) {
			var me = this;

			if (value === null) {
				return 0; // null always in center
			}

			// Take into account half font size + the yPadding of the top value
			var scalingFactor = me.drawingArea / (me.max - me.min);
			if (me.options.ticks.reverse) {
				return (me.max - value) * scalingFactor;
			}
			return (value - me.min) * scalingFactor;
		},
		getPointPosition: function(index, distanceFromCenter) {
			var me = this;
			var thisAngle = me.getIndexAngle(index) - (Math.PI / 2);
			return {
				x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + me.xCenter,
				y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + me.yCenter
			};
		},
		getPointPositionForValue: function(index, value) {
			return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
		},

		getBasePosition: function() {
			var me = this;
			var min = me.min;
			var max = me.max;

			return me.getPointPositionForValue(0,
				me.beginAtZero ? 0 :
				min < 0 && max < 0 ? max :
				min > 0 && max > 0 ? min :
				0);
		},

		draw: function() {
			var me = this;
			var opts = me.options;
			var gridLineOpts = opts.gridLines;
			var tickOpts = opts.ticks;
			var valueOrDefault = helpers.valueOrDefault;

			if (opts.display) {
				var ctx = me.ctx;
				var startAngle = this.getIndexAngle(0);

				// Tick Font
				var tickFontSize = valueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = valueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = valueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

				helpers.each(me.ticks, function(label, index) {
					// Don't draw a centre value (if it is minimum)
					if (index > 0 || tickOpts.reverse) {
						var yCenterOffset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);

						// Draw circular lines around the scale
						if (gridLineOpts.display && index !== 0) {
							drawRadiusLine(me, gridLineOpts, yCenterOffset, index);
						}

						if (tickOpts.display) {
							var tickFontColor = valueOrDefault(tickOpts.fontColor, globalDefaults.defaultFontColor);
							ctx.font = tickLabelFont;

							ctx.save();
							ctx.translate(me.xCenter, me.yCenter);
							ctx.rotate(startAngle);

							if (tickOpts.showLabelBackdrop) {
								var labelWidth = ctx.measureText(label).width;
								ctx.fillStyle = tickOpts.backdropColor;
								ctx.fillRect(
									-labelWidth / 2 - tickOpts.backdropPaddingX,
									-yCenterOffset - tickFontSize / 2 - tickOpts.backdropPaddingY,
									labelWidth + tickOpts.backdropPaddingX * 2,
									tickFontSize + tickOpts.backdropPaddingY * 2
								);
							}

							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.fillStyle = tickFontColor;
							ctx.fillText(label, 0, -yCenterOffset);
							ctx.restore();
						}
					}
				});

				if (opts.angleLines.display || opts.pointLabels.display) {
					drawPointLabels(me);
				}
			}
		}
	});
	Chart.scaleService.registerScaleType('radialLinear', LinearRadialScale, defaultConfig);

};

},{"25":25,"34":34,"45":45}],57:[function(require,module,exports){
/* global window: false */
'use strict';

var moment = require(6);
moment = typeof moment === 'function' ? moment : window.moment;

var defaults = require(25);
var helpers = require(45);

// Integer constants are from the ES6 spec.
var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

var INTERVALS = {
	millisecond: {
		common: true,
		size: 1,
		steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
	},
	second: {
		common: true,
		size: 1000,
		steps: [1, 2, 5, 10, 30]
	},
	minute: {
		common: true,
		size: 60000,
		steps: [1, 2, 5, 10, 30]
	},
	hour: {
		common: true,
		size: 3600000,
		steps: [1, 2, 3, 6, 12]
	},
	day: {
		common: true,
		size: 86400000,
		steps: [1, 2, 5]
	},
	week: {
		common: false,
		size: 604800000,
		steps: [1, 2, 3, 4]
	},
	month: {
		common: true,
		size: 2.628e9,
		steps: [1, 2, 3]
	},
	quarter: {
		common: false,
		size: 7.884e9,
		steps: [1, 2, 3, 4]
	},
	year: {
		common: true,
		size: 3.154e10
	}
};

var UNITS = Object.keys(INTERVALS);

function sorter(a, b) {
	return a - b;
}

function arrayUnique(items) {
	var hash = {};
	var out = [];
	var i, ilen, item;

	for (i = 0, ilen = items.length; i < ilen; ++i) {
		item = items[i];
		if (!hash[item]) {
			hash[item] = true;
			out.push(item);
		}
	}

	return out;
}

/**
 * Returns an array of {time, pos} objects used to interpolate a specific `time` or position
 * (`pos`) on the scale, by searching entries before and after the requested value. `pos` is
 * a decimal between 0 and 1: 0 being the start of the scale (left or top) and 1 the other
 * extremity (left + width or top + height). Note that it would be more optimized to directly
 * store pre-computed pixels, but the scale dimensions are not guaranteed at the time we need
 * to create the lookup table. The table ALWAYS contains at least two items: min and max.
 *
 * @param {Number[]} timestamps - timestamps sorted from lowest to highest.
 * @param {String} distribution - If 'linear', timestamps will be spread linearly along the min
 * and max range, so basically, the table will contains only two items: {min, 0} and {max, 1}.
 * If 'series', timestamps will be positioned at the same distance from each other. In this
 * case, only timestamps that break the time linearity are registered, meaning that in the
 * best case, all timestamps are linear, the table contains only min and max.
 */
function buildLookupTable(timestamps, min, max, distribution) {
	if (distribution === 'linear' || !timestamps.length) {
		return [
			{time: min, pos: 0},
			{time: max, pos: 1}
		];
	}

	var table = [];
	var items = [min];
	var i, ilen, prev, curr, next;

	for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
		curr = timestamps[i];
		if (curr > min && curr < max) {
			items.push(curr);
		}
	}

	items.push(max);

	for (i = 0, ilen = items.length; i < ilen; ++i) {
		next = items[i + 1];
		prev = items[i - 1];
		curr = items[i];

		// only add points that breaks the scale linearity
		if (prev === undefined || next === undefined || Math.round((next + prev) / 2) !== curr) {
			table.push({time: curr, pos: i / (ilen - 1)});
		}
	}

	return table;
}

// @see adapted from http://www.anujgakhar.com/2014/03/01/binary-search-in-javascript/
function lookup(table, key, value) {
	var lo = 0;
	var hi = table.length - 1;
	var mid, i0, i1;

	while (lo >= 0 && lo <= hi) {
		mid = (lo + hi) >> 1;
		i0 = table[mid - 1] || null;
		i1 = table[mid];

		if (!i0) {
			// given value is outside table (before first item)
			return {lo: null, hi: i1};
		} else if (i1[key] < value) {
			lo = mid + 1;
		} else if (i0[key] > value) {
			hi = mid - 1;
		} else {
			return {lo: i0, hi: i1};
		}
	}

	// given value is outside table (after last item)
	return {lo: i1, hi: null};
}

/**
 * Linearly interpolates the given source `value` using the table items `skey` values and
 * returns the associated `tkey` value. For example, interpolate(table, 'time', 42, 'pos')
 * returns the position for a timestamp equal to 42. If value is out of bounds, values at
 * index [0, 1] or [n - 1, n] are used for the interpolation.
 */
function interpolate(table, skey, sval, tkey) {
	var range = lookup(table, skey, sval);

	// Note: the lookup table ALWAYS contains at least 2 items (min and max)
	var prev = !range.lo ? table[0] : !range.hi ? table[table.length - 2] : range.lo;
	var next = !range.lo ? table[1] : !range.hi ? table[table.length - 1] : range.hi;

	var span = next[skey] - prev[skey];
	var ratio = span ? (sval - prev[skey]) / span : 0;
	var offset = (next[tkey] - prev[tkey]) * ratio;

	return prev[tkey] + offset;
}

/**
 * Convert the given value to a moment object using the given time options.
 * @see http://momentjs.com/docs/#/parsing/
 */
function momentify(value, options) {
	var parser = options.parser;
	var format = options.parser || options.format;

	if (typeof parser === 'function') {
		return parser(value);
	}

	if (typeof value === 'string' && typeof format === 'string') {
		return moment(value, format);
	}

	if (!(value instanceof moment)) {
		value = moment(value);
	}

	if (value.isValid()) {
		return value;
	}

	// Labels are in an incompatible moment format and no `parser` has been provided.
	// The user might still use the deprecated `format` option to convert his inputs.
	if (typeof format === 'function') {
		return format(value);
	}

	return value;
}

function parse(input, scale) {
	if (helpers.isNullOrUndef(input)) {
		return null;
	}

	var options = scale.options.time;
	var value = momentify(scale.getRightValue(input), options);
	if (!value.isValid()) {
		return null;
	}

	if (options.round) {
		value.startOf(options.round);
	}

	return value.valueOf();
}

/**
 * Returns the number of unit to skip to be able to display up to `capacity` number of ticks
 * in `unit` for the given `min` / `max` range and respecting the interval steps constraints.
 */
function determineStepSize(min, max, unit, capacity) {
	var range = max - min;
	var interval = INTERVALS[unit];
	var milliseconds = interval.size;
	var steps = interval.steps;
	var i, ilen, factor;

	if (!steps) {
		return Math.ceil(range / ((capacity || 1) * milliseconds));
	}

	for (i = 0, ilen = steps.length; i < ilen; ++i) {
		factor = steps[i];
		if (Math.ceil(range / (milliseconds * factor)) <= capacity) {
			break;
		}
	}

	return factor;
}

/**
 * Figures out what unit results in an appropriate number of auto-generated ticks
 */
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
	var ilen = UNITS.length;
	var i, interval, factor;

	for (i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
		interval = INTERVALS[UNITS[i]];
		factor = interval.steps ? interval.steps[interval.steps.length - 1] : MAX_INTEGER;

		if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
			return UNITS[i];
		}
	}

	return UNITS[ilen - 1];
}

/**
 * Figures out what unit to format a set of ticks with
 */
function determineUnitForFormatting(ticks, minUnit, min, max) {
	var duration = moment.duration(moment(max).diff(moment(min)));
	var ilen = UNITS.length;
	var i, unit;

	for (i = ilen - 1; i >= UNITS.indexOf(minUnit); i--) {
		unit = UNITS[i];
		if (INTERVALS[unit].common && duration.as(unit) >= ticks.length) {
			return unit;
		}
	}

	return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}

function determineMajorUnit(unit) {
	for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
		if (INTERVALS[UNITS[i]].common) {
			return UNITS[i];
		}
	}
}

/**
 * Generates a maximum of `capacity` timestamps between min and max, rounded to the
 * `minor` unit, aligned on the `major` unit and using the given scale time `options`.
 * Important: this method can return ticks outside the min and max range, it's the
 * responsibility of the calling code to clamp values if needed.
 */
function generate(min, max, capacity, options) {
	var timeOpts = options.time;
	var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
	var major = determineMajorUnit(minor);
	var stepSize = helpers.valueOrDefault(timeOpts.stepSize, timeOpts.unitStepSize);
	var weekday = minor === 'week' ? timeOpts.isoWeekday : false;
	var majorTicksEnabled = options.ticks.major.enabled;
	var interval = INTERVALS[minor];
	var first = moment(min);
	var last = moment(max);
	var ticks = [];
	var time;

	if (!stepSize) {
		stepSize = determineStepSize(min, max, minor, capacity);
	}

	// For 'week' unit, handle the first day of week option
	if (weekday) {
		first = first.isoWeekday(weekday);
		last = last.isoWeekday(weekday);
	}

	// Align first/last ticks on unit
	first = first.startOf(weekday ? 'day' : minor);
	last = last.startOf(weekday ? 'day' : minor);

	// Make sure that the last tick include max
	if (last < max) {
		last.add(1, minor);
	}

	time = moment(first);

	if (majorTicksEnabled && major && !weekday && !timeOpts.round) {
		// Align the first tick on the previous `minor` unit aligned on the `major` unit:
		// we first aligned time on the previous `major` unit then add the number of full
		// stepSize there is between first and the previous major time.
		time.startOf(major);
		time.add(~~((first - time) / (interval.size * stepSize)) * stepSize, minor);
	}

	for (; time < last; time.add(stepSize, minor)) {
		ticks.push(+time);
	}

	ticks.push(+time);

	return ticks;
}

/**
 * Returns the right and left offsets from edges in the form of {left, right}.
 * Offsets are added when the `offset` option is true.
 */
function computeOffsets(table, ticks, min, max, options) {
	var left = 0;
	var right = 0;
	var upper, lower;

	if (options.offset && ticks.length) {
		if (!options.time.min) {
			upper = ticks.length > 1 ? ticks[1] : max;
			lower = ticks[0];
			left = (
				interpolate(table, 'time', upper, 'pos') -
				interpolate(table, 'time', lower, 'pos')
			) / 2;
		}
		if (!options.time.max) {
			upper = ticks[ticks.length - 1];
			lower = ticks.length > 1 ? ticks[ticks.length - 2] : min;
			right = (
				interpolate(table, 'time', upper, 'pos') -
				interpolate(table, 'time', lower, 'pos')
			) / 2;
		}
	}

	return {left: left, right: right};
}

function ticksFromTimestamps(values, majorUnit) {
	var ticks = [];
	var i, ilen, value, major;

	for (i = 0, ilen = values.length; i < ilen; ++i) {
		value = values[i];
		major = majorUnit ? value === +moment(value).startOf(majorUnit) : false;

		ticks.push({
			value: value,
			major: major
		});
	}

	return ticks;
}

module.exports = function(Chart) {

	var defaultConfig = {
		position: 'bottom',

		/**
		 * Data distribution along the scale:
		 * - 'linear': data are spread according to their time (distances can vary),
		 * - 'series': data are spread at the same distance from each other.
		 * @see https://github.com/chartjs/Chart.js/pull/4507
		 * @since 2.7.0
		 */
		distribution: 'linear',

		/**
		 * Scale boundary strategy (bypassed by min/max time options)
		 * - `data`: make sure data are fully visible, ticks outside are removed
		 * - `ticks`: make sure ticks are fully visible, data outside are truncated
		 * @see https://github.com/chartjs/Chart.js/pull/4556
		 * @since 2.7.0
		 */
		bounds: 'data',

		time: {
			parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
			format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
			unit: false, // false == automatic or override with week, month, year, etc.
			round: false, // none, or override with week, month, year, etc.
			displayFormat: false, // DEPRECATED
			isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
			minUnit: 'millisecond',

			// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
			displayFormats: {
				millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
				second: 'h:mm:ss a', // 11:20:01 AM
				minute: 'h:mm a', // 11:20 AM
				hour: 'hA', // 5PM
				day: 'MMM D', // Sep 4
				week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
				month: 'MMM YYYY', // Sept 2015
				quarter: '[Q]Q - YYYY', // Q3
				year: 'YYYY' // 2015
			},
		},
		ticks: {
			autoSkip: false,

			/**
			 * Ticks generation input values:
			 * - 'auto': generates "optimal" ticks based on scale size and time options.
			 * - 'data': generates ticks from data (including labels from data {t|x|y} objects).
			 * - 'labels': generates ticks from user given `data.labels` values ONLY.
			 * @see https://github.com/chartjs/Chart.js/pull/4507
			 * @since 2.7.0
			 */
			source: 'auto',

			major: {
				enabled: false
			}
		}
	};

	var TimeScale = Chart.Scale.extend({
		initialize: function() {
			if (!moment) {
				throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
			}

			this.mergeTicksOptions();

			Chart.Scale.prototype.initialize.call(this);
		},

		update: function() {
			var me = this;
			var options = me.options;

			// DEPRECATIONS: output a message only one time per update
			if (options.time && options.time.format) {
				console.warn('options.time.format is deprecated and replaced by options.time.parser.');
			}

			return Chart.Scale.prototype.update.apply(me, arguments);
		},

		/**
		 * Allows data to be referenced via 't' attribute
		 */
		getRightValue: function(rawValue) {
			if (rawValue && rawValue.t !== undefined) {
				rawValue = rawValue.t;
			}
			return Chart.Scale.prototype.getRightValue.call(this, rawValue);
		},

		determineDataLimits: function() {
			var me = this;
			var chart = me.chart;
			var timeOpts = me.options.time;
			var min = MAX_INTEGER;
			var max = MIN_INTEGER;
			var timestamps = [];
			var datasets = [];
			var labels = [];
			var i, j, ilen, jlen, data, timestamp;

			// Convert labels to timestamps
			for (i = 0, ilen = chart.data.labels.length; i < ilen; ++i) {
				labels.push(parse(chart.data.labels[i], me));
			}

			// Convert data to timestamps
			for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
				if (chart.isDatasetVisible(i)) {
					data = chart.data.datasets[i].data;

					// Let's consider that all data have the same format.
					if (helpers.isObject(data[0])) {
						datasets[i] = [];

						for (j = 0, jlen = data.length; j < jlen; ++j) {
							timestamp = parse(data[j], me);
							timestamps.push(timestamp);
							datasets[i][j] = timestamp;
						}
					} else {
						timestamps.push.apply(timestamps, labels);
						datasets[i] = labels.slice(0);
					}
				} else {
					datasets[i] = [];
				}
			}

			if (labels.length) {
				// Sort labels **after** data have been converted
				labels = arrayUnique(labels).sort(sorter);
				min = Math.min(min, labels[0]);
				max = Math.max(max, labels[labels.length - 1]);
			}

			if (timestamps.length) {
				timestamps = arrayUnique(timestamps).sort(sorter);
				min = Math.min(min, timestamps[0]);
				max = Math.max(max, timestamps[timestamps.length - 1]);
			}

			min = parse(timeOpts.min, me) || min;
			max = parse(timeOpts.max, me) || max;

			// In case there is no valid min/max, let's use today limits
			min = min === MAX_INTEGER ? +moment().startOf('day') : min;
			max = max === MIN_INTEGER ? +moment().endOf('day') + 1 : max;

			// Make sure that max is strictly higher than min (required by the lookup table)
			me.min = Math.min(min, max);
			me.max = Math.max(min + 1, max);

			// PRIVATE
			me._horizontal = me.isHorizontal();
			me._table = [];
			me._timestamps = {
				data: timestamps,
				datasets: datasets,
				labels: labels
			};
		},

		buildTicks: function() {
			var me = this;
			var min = me.min;
			var max = me.max;
			var options = me.options;
			var timeOpts = options.time;
			var timestamps = [];
			var ticks = [];
			var i, ilen, timestamp;

			switch (options.ticks.source) {
			case 'data':
				timestamps = me._timestamps.data;
				break;
			case 'labels':
				timestamps = me._timestamps.labels;
				break;
			case 'auto':
			default:
				timestamps = generate(min, max, me.getLabelCapacity(min), options);
			}

			if (options.bounds === 'ticks' && timestamps.length) {
				min = timestamps[0];
				max = timestamps[timestamps.length - 1];
			}

			// Enforce limits with user min/max options
			min = parse(timeOpts.min, me) || min;
			max = parse(timeOpts.max, me) || max;

			// Remove ticks outside the min/max range
			for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
				timestamp = timestamps[i];
				if (timestamp >= min && timestamp <= max) {
					ticks.push(timestamp);
				}
			}

			me.min = min;
			me.max = max;

			// PRIVATE
			me._unit = timeOpts.unit || determineUnitForFormatting(ticks, timeOpts.minUnit, me.min, me.max);
			me._majorUnit = determineMajorUnit(me._unit);
			me._table = buildLookupTable(me._timestamps.data, min, max, options.distribution);
			me._offsets = computeOffsets(me._table, ticks, min, max, options);

			return ticksFromTimestamps(ticks, me._majorUnit);
		},

		getLabelForIndex: function(index, datasetIndex) {
			var me = this;
			var data = me.chart.data;
			var timeOpts = me.options.time;
			var label = data.labels && index < data.labels.length ? data.labels[index] : '';
			var value = data.datasets[datasetIndex].data[index];

			if (helpers.isObject(value)) {
				label = me.getRightValue(value);
			}
			if (timeOpts.tooltipFormat) {
				label = momentify(label, timeOpts).format(timeOpts.tooltipFormat);
			}

			return label;
		},

		/**
		 * Function to format an individual tick mark
		 * @private
		 */
		tickFormatFunction: function(tick, index, ticks, formatOverride) {
			var me = this;
			var options = me.options;
			var time = tick.valueOf();
			var formats = options.time.displayFormats;
			var minorFormat = formats[me._unit];
			var majorUnit = me._majorUnit;
			var majorFormat = formats[majorUnit];
			var majorTime = tick.clone().startOf(majorUnit).valueOf();
			var majorTickOpts = options.ticks.major;
			var major = majorTickOpts.enabled && majorUnit && majorFormat && time === majorTime;
			var label = tick.format(formatOverride ? formatOverride : major ? majorFormat : minorFormat);
			var tickOpts = major ? majorTickOpts : options.ticks.minor;
			var formatter = helpers.valueOrDefault(tickOpts.callback, tickOpts.userCallback);

			return formatter ? formatter(label, index, ticks) : label;
		},

		convertTicksToLabels: function(ticks) {
			var labels = [];
			var i, ilen;

			for (i = 0, ilen = ticks.length; i < ilen; ++i) {
				labels.push(this.tickFormatFunction(moment(ticks[i].value), i, ticks));
			}

			return labels;
		},

		/**
		 * @private
		 */
		getPixelForOffset: function(time) {
			var me = this;
			var size = me._horizontal ? me.width : me.height;
			var start = me._horizontal ? me.left : me.top;
			var pos = interpolate(me._table, 'time', time, 'pos');

			return start + size * (me._offsets.left + pos) / (me._offsets.left + 1 + me._offsets.right);
		},

		getPixelForValue: function(value, index, datasetIndex) {
			var me = this;
			var time = null;

			if (index !== undefined && datasetIndex !== undefined) {
				time = me._timestamps.datasets[datasetIndex][index];
			}

			if (time === null) {
				time = parse(value, me);
			}

			if (time !== null) {
				return me.getPixelForOffset(time);
			}
		},

		getPixelForTick: function(index) {
			var ticks = this.getTicks();
			return index >= 0 && index < ticks.length ?
				this.getPixelForOffset(ticks[index].value) :
				null;
		},

		getValueForPixel: function(pixel) {
			var me = this;
			var size = me._horizontal ? me.width : me.height;
			var start = me._horizontal ? me.left : me.top;
			var pos = (size ? (pixel - start) / size : 0) * (me._offsets.left + 1 + me._offsets.left) - me._offsets.right;
			var time = interpolate(me._table, 'pos', pos, 'time');

			return moment(time);
		},

		/**
		 * Crude approximation of what the label width might be
		 * @private
		 */
		getLabelWidth: function(label) {
			var me = this;
			var ticksOpts = me.options.ticks;
			var tickLabelWidth = me.ctx.measureText(label).width;
			var angle = helpers.toRadians(ticksOpts.maxRotation);
			var cosRotation = Math.cos(angle);
			var sinRotation = Math.sin(angle);
			var tickFontSize = helpers.valueOrDefault(ticksOpts.fontSize, defaults.global.defaultFontSize);

			return (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
		},

		/**
		 * @private
		 */
		getLabelCapacity: function(exampleTime) {
			var me = this;

			var formatOverride = me.options.time.displayFormats.millisecond;	// Pick the longest format for guestimation

			var exampleLabel = me.tickFormatFunction(moment(exampleTime), 0, [], formatOverride);
			var tickLabelWidth = me.getLabelWidth(exampleLabel);
			var innerWidth = me.isHorizontal() ? me.width : me.height;

			return Math.floor(innerWidth / tickLabelWidth);
		}
	});

	Chart.scaleService.registerScaleType('time', TimeScale, defaultConfig);
};

},{"25":25,"45":45,"6":6}]},{},[7])(7)
});
/*
 * Chartkick.js
 * Create beautiful charts with one line of JavaScript
 * https://github.com/ankane/chartkick.js
 * v2.2.4
 * MIT License
 */

/*jslint browser: true, indent: 2, plusplus: true, vars: true */


(function (window) {
  'use strict';

  var config = window.Chartkick || {};
  var Chartkick, ISO8601_PATTERN, DECIMAL_SEPARATOR, adapters = [];
  var DATE_PATTERN = /^(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)$/i;
  var GoogleChartsAdapter, HighchartsAdapter, ChartjsAdapter;
  var pendingRequests = [], runningRequests = 0, maxRequests = 4;

  // helpers

  function isArray(variable) {
    return Object.prototype.toString.call(variable) === "[object Array]";
  }

  function isFunction(variable) {
    return variable instanceof Function;
  }

  function isPlainObject(variable) {
    return !isFunction(variable) && variable instanceof Object;
  }

  // https://github.com/madrobby/zepto/blob/master/src/zepto.js
  function extend(target, source) {
    var key;
    for (key in source) {
      if (isPlainObject(source[key]) || isArray(source[key])) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
          target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])) {
          target[key] = [];
        }
        extend(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }

  function merge(obj1, obj2) {
    var target = {};
    extend(target, obj1);
    extend(target, obj2);
    return target;
  }

  // https://github.com/Do/iso8601.js
  ISO8601_PATTERN = /(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i;
  DECIMAL_SEPARATOR = String(1.5).charAt(1);

  function parseISO8601(input) {
    var day, hour, matches, milliseconds, minutes, month, offset, result, seconds, type, year;
    type = Object.prototype.toString.call(input);
    if (type === "[object Date]") {
      return input;
    }
    if (type !== "[object String]") {
      return;
    }
    matches = input.match(ISO8601_PATTERN);
    if (matches) {
      year = parseInt(matches[1], 10);
      month = parseInt(matches[3], 10) - 1;
      day = parseInt(matches[5], 10);
      hour = parseInt(matches[7], 10);
      minutes = matches[9] ? parseInt(matches[9], 10) : 0;
      seconds = matches[11] ? parseInt(matches[11], 10) : 0;
      milliseconds = matches[12] ? parseFloat(DECIMAL_SEPARATOR + matches[12].slice(1)) * 1000 : 0;
      result = Date.UTC(year, month, day, hour, minutes, seconds, milliseconds);
      if (matches[13] && matches[14]) {
        offset = matches[15] * 60;
        if (matches[17]) {
          offset += parseInt(matches[17], 10);
        }
        offset *= matches[14] === "-" ? -1 : 1;
        result -= offset * 60 * 1000;
      }
      return new Date(result);
    }
  }
  // end iso8601.js

  function negativeValues(series) {
    var i, j, data;
    for (i = 0; i < series.length; i++) {
      data = series[i].data;
      for (j = 0; j < data.length; j++) {
        if (data[j][1] < 0) {
          return true;
        }
      }
    }
    return false;
  }

  function jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle) {
    return function (chart, opts, chartOptions) {
      var series = chart.data;
      var options = merge({}, defaultOptions);
      options = merge(options, chartOptions || {});

      if (chart.hideLegend || "legend" in opts) {
        hideLegend(options, opts.legend, chart.hideLegend);
      }

      if (opts.title) {
        setTitle(options, opts.title);
      }

      // min
      if ("min" in opts) {
        setMin(options, opts.min);
      } else if (!negativeValues(series)) {
        setMin(options, 0);
      }

      // max
      if (opts.max) {
        setMax(options, opts.max);
      }

      if ("stacked" in opts) {
        setStacked(options, opts.stacked);
      }

      if (opts.colors) {
        options.colors = opts.colors;
      }

      if (opts.xtitle) {
        setXtitle(options, opts.xtitle);
      }

      if (opts.ytitle) {
        setYtitle(options, opts.ytitle);
      }

      // merge library last
      options = merge(options, opts.library || {});

      return options;
    };
  }

  function setText(element, text) {
    if (document.body.innerText) {
      element.innerText = text;
    } else {
      element.textContent = text;
    }
  }

  function chartError(element, message) {
    setText(element, "Error Loading Chart: " + message);
    element.style.color = "#ff0000";
  }

  function pushRequest(element, url, success) {
    pendingRequests.push([element, url, success]);
    runNext();
  }

  function runNext() {
    if (runningRequests < maxRequests) {
      var request = pendingRequests.shift()
      if (request) {
        runningRequests++;
        getJSON(request[0], request[1], request[2]);
        runNext();
      }
    }
  }

  function requestComplete() {
    runningRequests--;
    runNext();
  }

  function getJSON(element, url, success) {
    ajaxCall(url, success, function (jqXHR, textStatus, errorThrown) {
      var message = (typeof errorThrown === "string") ? errorThrown : errorThrown.message;
      chartError(element, message);
    });
  }

  function ajaxCall(url, success, error) {
    var $ = window.jQuery || window.Zepto || window.$;

    if ($) {
      $.ajax({
        dataType: "json",
        url: url,
        success: success,
        error: error,
        complete: requestComplete
      });
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        requestComplete();
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText), xhr.statusText, xhr);
        } else {
          error(xhr, "error", xhr.statusText);
        }
      };
      xhr.send();
    }
  }

  function errorCatcher(chart, callback) {
    try {
      callback(chart);
    } catch (err) {
      chartError(chart.element, err.message);
      throw err;
    }
  }

  function fetchDataSource(chart, callback, dataSource) {
    if (typeof dataSource === "string") {
      pushRequest(chart.element, dataSource, function (data, textStatus, jqXHR) {
        chart.rawData = data;
        errorCatcher(chart, callback);
      });
    } else {
      chart.rawData = dataSource;
      errorCatcher(chart, callback);
    }
  }

  function addDownloadButton(chart) {
    var element = chart.element;
    var link = document.createElement("a");
    link.download = chart.options.download === true ? "chart.png" : chart.options.download; // http://caniuse.com/download
    link.style.position = "absolute";
    link.style.top = "20px";
    link.style.right = "20px";
    link.style.zIndex = 1000;
    link.style.lineHeight = "20px";
    link.target = "_blank"; // for safari
    var image = document.createElement("img");
    image.alt = "Download";
    image.style.border = "none";
    // icon from font-awesome
    // http://fa2png.io/
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==";
    link.appendChild(image);
    element.style.position = "relative";

    chart.downloadAttached = true;

    // mouseenter
    addEvent(element, "mouseover", function(e) {
      var related = e.relatedTarget;
      // check download option again to ensure it wasn't changed
      if (!related || (related !== this && !childOf(this, related)) && chart.options.download) {
        link.href = chart.toImage();
        element.appendChild(link);
      }
    });

    // mouseleave
    addEvent(element, "mouseout", function(e) {
      var related = e.relatedTarget;
      if (!related || (related !== this && !childOf(this, related))) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }
    });
  }

  // http://stackoverflow.com/questions/10149963/adding-event-listener-cross-browser
  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent("on" + event, function() {
        // set the this pointer same as addEventListener when fn is called
        return(fn.call(elem, window.event));
      });
    }
  }

  // https://gist.github.com/shawnbot/4166283
  function childOf(p, c) {
    if (p === c) return false;
    while (c && c !== p) c = c.parentNode;
    return c === p;
  }

  // type conversions

  function toStr(n) {
    return "" + n;
  }

  function toFloat(n) {
    return parseFloat(n);
  }

  function toDate(n) {
    var matches, year, month, day;
    if (typeof n !== "object") {
      if (typeof n === "number") {
        n = new Date(n * 1000); // ms
      } else if ((matches = n.match(DATE_PATTERN))) {
        year = parseInt(matches[1], 10);
        month = parseInt(matches[3], 10) - 1;
        day = parseInt(matches[5], 10);
        return new Date(year, month, day);
      } else { // str
        // try our best to get the str into iso8601
        // TODO be smarter about this
        var str = n.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
        n = parseISO8601(str) || new Date(n);
      }
    }
    return n;
  }

  function toArr(n) {
    if (!isArray(n)) {
      var arr = [], i;
      for (i in n) {
        if (n.hasOwnProperty(i)) {
          arr.push([i, n[i]]);
        }
      }
      n = arr;
    }
    return n;
  }

  function sortByTime(a, b) {
    return a[0].getTime() - b[0].getTime();
  }

  function sortByNumberSeries(a, b) {
    return a[0] - b[0];
  }

  function sortByNumber(a, b) {
    return a - b;
  }

  function loadAdapters() {
    if (!HighchartsAdapter && "Highcharts" in window) {
      HighchartsAdapter = new function () {
        var Highcharts = window.Highcharts;

        this.name = "highcharts";

        var defaultOptions = {
          chart: {},
          xAxis: {
            title: {
              text: null
            },
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          title: {
            text: null
          },
          credits: {
            enabled: false
          },
          legend: {
            borderWidth: 0
          },
          tooltip: {
            style: {
              fontSize: "12px"
            }
          },
          plotOptions: {
            areaspline: {},
            series: {
              marker: {}
            }
          }
        };

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            options.legend.enabled = !!legend;
            if (legend && legend !== true) {
              if (legend === "top" || legend === "bottom") {
                options.legend.verticalAlign = legend;
              } else {
                options.legend.layout = "vertical";
                options.legend.verticalAlign = "middle";
                options.legend.align = legend;
              }
            }
          } else if (hideLegend) {
            options.legend.enabled = false;
          }
        };

        var setTitle = function (options, title) {
          options.title.text = title;
        };

        var setMin = function (options, min) {
          options.yAxis.min = min;
        };

        var setMax = function (options, max) {
          options.yAxis.max = max;
        };

        var setStacked = function (options, stacked) {
          options.plotOptions.series.stacking = stacked ? "normal" : null;
        };

        var setXtitle = function (options, title) {
          options.xAxis.title.text = title;
        };

        var setYtitle = function (options, title) {
          options.yAxis.title.text = title;
        };

        var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        this.renderLineChart = function (chart, chartType) {
          chartType = chartType || "spline";
          var chartOptions = {};
          if (chartType === "areaspline") {
            chartOptions = {
              plotOptions: {
                areaspline: {
                  stacking: "normal"
                },
                area: {
                  stacking: "normal"
                },
                series: {
                  marker: {
                    enabled: false
                  }
                }
              }
            };
          }

          if (chart.options.curve === false) {
            if (chartType === "areaspline") {
              chartType = "area";
            } else if (chartType === "spline") {
              chartType = "line";
            }
          }

          var options = jsOptions(chart, chart.options, chartOptions), data, i, j;
          options.xAxis.type = chart.discrete ? "category" : "datetime";
          if (!options.chart.type) {
            options.chart.type = chartType;
          }
          options.chart.renderTo = chart.element.id;

          var series = chart.data;
          for (i = 0; i < series.length; i++) {
            data = series[i].data;
            if (!chart.discrete) {
              for (j = 0; j < data.length; j++) {
                data[j][0] = data[j][0].getTime();
              }
            }
            series[i].marker = {symbol: "circle"};
            if (chart.options.points === false) {
              series[i].marker.enabled = false;
            }
          }
          options.series = series;
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderScatterChart = function (chart) {
          var chartOptions = {};
          var options = jsOptions(chart, chart.options, chartOptions);
          options.chart.type = "scatter";
          options.chart.renderTo = chart.element.id;
          options.series = chart.data;
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderPieChart = function (chart) {
          var chartOptions = merge(defaultOptions, {});

          if (chart.options.colors) {
            chartOptions.colors = chart.options.colors;
          }
          if (chart.options.donut) {
            chartOptions.plotOptions = {pie: {innerSize: "50%"}};
          }

          if ("legend" in chart.options) {
            hideLegend(chartOptions, chart.options.legend);
          }

          if (chart.options.title) {
            setTitle(chartOptions, chart.options.title);
          }

          var options = merge(chartOptions, chart.options.library || {});
          options.chart.renderTo = chart.element.id;
          options.series = [{
            type: "pie",
            name: chart.options.label || "Value",
            data: chart.data
          }];
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderColumnChart = function (chart, chartType) {
          chartType = chartType || "column";
          var series = chart.data;
          var options = jsOptions(chart, chart.options), i, j, s, d, rows = [], categories = [];
          options.chart.type = chartType;
          options.chart.renderTo = chart.element.id;

          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              if (!rows[d[0]]) {
                rows[d[0]] = new Array(series.length);
                categories.push(d[0]);
              }
              rows[d[0]][i] = d[1];
            }
          }

          if (chart.options.xtype === "number") {
            categories.sort(sortByNumber);
          }

          options.xAxis.categories = categories;

          var newSeries = [], d2;
          for (i = 0; i < series.length; i++) {
            d = [];
            for (j = 0; j < categories.length; j++) {
              d.push(rows[categories[j]][i] || 0);
            }

            d2 = {
              name: series[i].name,
              data: d
            }
            if (series[i].stack) {
              d2.stack = series[i].stack;
            }

            newSeries.push(d2);
          }
          options.series = newSeries;

          chart.chart = new Highcharts.Chart(options);
        };

        var self = this;

        this.renderBarChart = function (chart) {
          self.renderColumnChart(chart, "bar");
        };

        this.renderAreaChart = function (chart) {
          self.renderLineChart(chart, "areaspline");
        };
      };
      adapters.push(HighchartsAdapter);
    }
    if (!GoogleChartsAdapter && window.google && (window.google.setOnLoadCallback || window.google.charts)) {
      GoogleChartsAdapter = new function () {
        var google = window.google;

        this.name = "google";

        var loaded = {};
        var callbacks = [];

        var runCallbacks = function () {
          var cb, call;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            call = google.visualization && ((cb.pack === "corechart" && google.visualization.LineChart) || (cb.pack === "timeline" && google.visualization.Timeline));
            if (call) {
              cb.callback();
              callbacks.splice(i, 1);
              i--;
            }
          }
        };

        var waitForLoaded = function (pack, callback) {
          if (!callback) {
            callback = pack;
            pack = "corechart";
          }

          callbacks.push({pack: pack, callback: callback});

          if (loaded[pack]) {
            runCallbacks();
          } else {
            loaded[pack] = true;

            // https://groups.google.com/forum/#!topic/google-visualization-api/fMKJcyA2yyI
            var loadOptions = {
              packages: [pack],
              callback: runCallbacks
            };
            if (config.language) {
              loadOptions.language = config.language;
            }
            if (pack === "corechart" && config.mapsApiKey) {
              loadOptions.mapsApiKey = config.mapsApiKey;
            }

            if (window.google.setOnLoadCallback) {
              google.load("visualization", "1", loadOptions);
            } else {
              google.charts.load("current", loadOptions);
            }
          }
        };

        // Set chart options
        var defaultOptions = {
          chartArea: {},
          fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
          pointSize: 6,
          legend: {
            textStyle: {
              fontSize: 12,
              color: "#444"
            },
            alignment: "center",
            position: "right"
          },
          curveType: "function",
          hAxis: {
            textStyle: {
              color: "#666",
              fontSize: 12
            },
            titleTextStyle: {},
            gridlines: {
              color: "transparent"
            },
            baselineColor: "#ccc",
            viewWindow: {}
          },
          vAxis: {
            textStyle: {
              color: "#666",
              fontSize: 12
            },
            titleTextStyle: {},
            baselineColor: "#ccc",
            viewWindow: {}
          },
          tooltip: {
            textStyle: {
              color: "#666",
              fontSize: 12
            }
          }
        };

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            var position;
            if (!legend) {
              position = "none";
            } else if (legend === true) {
              position = "right";
            } else {
              position = legend;
            }
            options.legend.position = position;
          } else if (hideLegend) {
            options.legend.position = "none";
          }
        };

        var setTitle = function (options, title) {
          options.title = title;
          options.titleTextStyle = {color: "#333", fontSize: "20px"};
        };

        var setMin = function (options, min) {
          options.vAxis.viewWindow.min = min;
        };

        var setMax = function (options, max) {
          options.vAxis.viewWindow.max = max;
        };

        var setBarMin = function (options, min) {
          options.hAxis.viewWindow.min = min;
        };

        var setBarMax = function (options, max) {
          options.hAxis.viewWindow.max = max;
        };

        var setStacked = function (options, stacked) {
          options.isStacked = !!stacked;
        };

        var setXtitle = function (options, title) {
          options.hAxis.title = title;
          options.hAxis.titleTextStyle.italic = false;
        };

        var setYtitle = function (options, title) {
          options.vAxis.title = title;
          options.vAxis.titleTextStyle.italic = false;
        };

        var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        // cant use object as key
        var createDataTable = function (series, columnType, xtype) {
          var i, j, s, d, key, rows = [], sortedLabels = [];
          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              key = (columnType === "datetime") ? d[0].getTime() : d[0];
              if (!rows[key]) {
                rows[key] = new Array(series.length);
                sortedLabels.push(key);
              }
              rows[key][i] = toFloat(d[1]);
            }
          }

          var rows2 = [];
          var day = true;
          var value;
          for (var j = 0; j < sortedLabels.length; j++) {
            var i = sortedLabels[j];
            if (columnType === "datetime") {
              value = new Date(toFloat(i));
              day = day && isDay(value);
            } else if (columnType === "number") {
              value = toFloat(i);
            } else {
              value = i;
            }
            rows2.push([value].concat(rows[i]));
          }
          if (columnType === "datetime") {
            rows2.sort(sortByTime);
          } else if (columnType === "number") {
            rows2.sort(sortByNumberSeries);
          }

          if (xtype === "number") {
            rows2.sort(sortByNumberSeries);

            for (var i = 0; i < rows2.length; i++) {
              rows2[i][0] = toStr(rows2[i][0]);
            }
          }

          // create datatable
          var data = new google.visualization.DataTable();
          columnType = columnType === "datetime" && day ? "date" : columnType;
          data.addColumn(columnType, "");
          for (i = 0; i < series.length; i++) {
            data.addColumn("number", series[i].name);
          }
          data.addRows(rows2);

          return data;
        };

        var resize = function (callback) {
          if (window.attachEvent) {
            window.attachEvent("onresize", callback);
          } else if (window.addEventListener) {
            window.addEventListener("resize", callback, true);
          }
          callback();
        };

        this.renderLineChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {};

            if (chart.options.curve === false) {
              chartOptions.curveType = "none";
            }

            if (chart.options.points === false) {
              chartOptions.pointSize = 0;
            }

            var options = jsOptions(chart, chart.options, chartOptions);
            var columnType = chart.discrete ? "string" : "datetime";
            if (chart.options.xtype === "number") {
              columnType = "number";
            }
            var data = createDataTable(chart.data, columnType);
            chart.chart = new google.visualization.LineChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderPieChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              chartArea: {
                top: "10%",
                height: "80%"
              },
              legend: {}
            };
            if (chart.options.colors) {
              chartOptions.colors = chart.options.colors;
            }
            if (chart.options.donut) {
              chartOptions.pieHole = 0.5;
            }
            if ("legend" in chart.options) {
              hideLegend(chartOptions, chart.options.legend);
            }
            if (chart.options.title) {
              setTitle(chartOptions, chart.options.title);
            }
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn("string", "");
            data.addColumn("number", "Value");
            data.addRows(chart.data);

            chart.chart = new google.visualization.PieChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderColumnChart = function (chart) {
          waitForLoaded(function () {
            var options = jsOptions(chart, chart.options);
            var data = createDataTable(chart.data, "string", chart.options.xtype);
            chart.chart = new google.visualization.ColumnChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderBarChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              hAxis: {
                gridlines: {
                  color: "#ccc"
                }
              }
            };
            var options = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options, chartOptions);
            var data = createDataTable(chart.data, "string", chart.options.xtype);
            chart.chart = new google.visualization.BarChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderAreaChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              isStacked: true,
              pointSize: 0,
              areaOpacity: 0.5
            };

            var options = jsOptions(chart, chart.options, chartOptions);
            var columnType = chart.discrete ? "string" : "datetime";
            if (chart.options.xtype === "number") {
              columnType = "number";
            }
            var data = createDataTable(chart.data, columnType);
            chart.chart = new google.visualization.AreaChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderGeoChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              legend: "none",
              colorAxis: {
                colors: chart.options.colors || ["#f6c7b6", "#ce502d"]
              }
            };
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn("string", "");
            data.addColumn("number", chart.options.label || "Value");
            data.addRows(chart.data);

            chart.chart = new google.visualization.GeoChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderScatterChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {};
            var options = jsOptions(chart, chart.options, chartOptions);

            var series = chart.data, rows2 = [], i, j, data, d;
            for (i = 0; i < series.length; i++) {
              d = series[i].data;
              for (j = 0; j < d.length; j++) {
                var row = new Array(series.length + 1);
                row[0] = d[j][0];
                row[i + 1] = d[j][1];
                rows2.push(row);
              }
            }

            var data = new google.visualization.DataTable();
            data.addColumn("number", "");
            for (i = 0; i < series.length; i++) {
              data.addColumn("number", series[i].name);
            }
            data.addRows(rows2);

            chart.chart = new google.visualization.ScatterChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderTimeline = function (chart) {
          waitForLoaded("timeline", function () {
            var chartOptions = {
              legend: "none"
            };

            if (chart.options.colors) {
              chartOptions.colors = chart.options.colors;
            }
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn({type: "string", id: "Name"});
            data.addColumn({type: "date", id: "Start"});
            data.addColumn({type: "date", id: "End"});
            data.addRows(chart.data);

            chart.element.style.lineHeight = "normal";
            chart.chart = new google.visualization.Timeline(chart.element);

            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };
      };

      adapters.push(GoogleChartsAdapter);
    }
    if (!ChartjsAdapter && "Chart" in window) {
      ChartjsAdapter = new function () {
        var Chart = window.Chart;

        this.name = "chartjs";

        var baseOptions = {
          maintainAspectRatio: false,
          animation: false,
          tooltips: {
            displayColors: false
          },
          legend: {},
          title: {fontSize: 20, fontColor: "#333"}
        };

        var defaultOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 4
                },
                scaleLabel: {
                  fontSize: 16,
                  // fontStyle: "bold",
                  fontColor: "#333"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                scaleLabel: {
                  fontSize: 16,
                  // fontStyle: "bold",
                  fontColor: "#333"
                },
                time: {},
                ticks: {}
              }
            ]
          }
        };

        // http://there4.io/2012/05/02/google-chart-color-list/
        var defaultColors = [
          "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6",
          "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11",
          "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"
        ];

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            options.legend.display = !!legend;
            if (legend && legend !== true) {
              options.legend.position = legend;
            }
          } else if (hideLegend) {
            options.legend.display = false;
          }
        };

        var setTitle = function (options, title) {
          options.title.display = true;
          options.title.text = title;
        };

        var setMin = function (options, min) {
          if (min !== null) {
            options.scales.yAxes[0].ticks.min = toFloat(min);
          }
        };

        var setMax = function (options, max) {
          options.scales.yAxes[0].ticks.max = toFloat(max);
        };

        var setBarMin = function (options, min) {
          if (min !== null) {
            options.scales.xAxes[0].ticks.min = toFloat(min);
          }
        };

        var setBarMax = function (options, max) {
          options.scales.xAxes[0].ticks.max = toFloat(max);
        };

        var setStacked = function (options, stacked) {
          options.scales.xAxes[0].stacked = !!stacked;
          options.scales.yAxes[0].stacked = !!stacked;
        };

        var setXtitle = function (options, title) {
          options.scales.xAxes[0].scaleLabel.display = true;
          options.scales.xAxes[0].scaleLabel.labelString = title;
        };

        var setYtitle = function (options, title) {
          options.scales.yAxes[0].scaleLabel.display = true;
          options.scales.yAxes[0].scaleLabel.labelString = title;
        };

        var drawChart = function(chart, type, data, options) {
          if (chart.chart) {
            chart.chart.destroy();
          } else {
            chart.element.innerHTML = "<canvas></canvas>";
          }

          var ctx = chart.element.getElementsByTagName("CANVAS")[0];
          chart.chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
          });
        };

        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        var addOpacity = function(hex, opacity) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? "rgba(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", " + opacity + ")" : hex;
        };

        var setLabelSize = function (chart, data, options) {
          var maxLabelSize = Math.ceil(chart.element.offsetWidth / 4.0 / data.labels.length);
          if (maxLabelSize > 25) {
            maxLabelSize = 25;
          }
          options.scales.xAxes[0].ticks.callback = function (value) {
            value = toStr(value);
            if (value.length > maxLabelSize) {
              return value.substring(0, maxLabelSize - 2) + "...";
            } else {
              return value;
            }
          };
        };

        var jsOptions = jsOptionsFunc(merge(baseOptions, defaultOptions), hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        var createDataTable = function (chart, options, chartType) {
          var datasets = [];
          var labels = [];

          var colors = chart.options.colors || defaultColors;

          var day = true;
          var week = true;
          var dayOfWeek;
          var month = true;
          var year = true;
          var hour = true;
          var minute = true;
          var detectType = (chartType === "line" || chartType === "area") && !chart.discrete;

          var series = chart.data;

          var sortedLabels = [];

          var i, j, s, d, key, rows = [];
          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              key = detectType ? d[0].getTime() : d[0];
              if (!rows[key]) {
                rows[key] = new Array(series.length);
              }
              rows[key][i] = toFloat(d[1]);
              if (sortedLabels.indexOf(key) === -1) {
                sortedLabels.push(key);
              }
            }
          }

          if (detectType || chart.options.xtype === "number") {
            sortedLabels.sort(sortByNumber);
          }

          var rows2 = [];
          for (j = 0; j < series.length; j++) {
            rows2.push([]);
          }

          var value;
          var k;
          for (k = 0; k < sortedLabels.length; k++) {
            i = sortedLabels[k];
            if (detectType) {
              value = new Date(toFloat(i));
              // TODO make this efficient
              day = day && isDay(value);
              if (!dayOfWeek) {
                dayOfWeek = value.getDay();
              }
              week = week && isWeek(value, dayOfWeek);
              month = month && isMonth(value);
              year = year && isYear(value);
              hour = hour && isHour(value);
              minute = minute && isMinute(value);
            } else {
              value = i;
            }
            labels.push(value);
            for (j = 0; j < series.length; j++) {
              // Chart.js doesn't like undefined
              rows2[j].push(rows[i][j] === undefined ? null : rows[i][j]);
            }
          }

          for (i = 0; i < series.length; i++) {
            s = series[i];

            var color = s.color || colors[i];
            var backgroundColor = chartType !== "line" ? addOpacity(color, 0.5) : color;

            var dataset = {
              label: s.name,
              data: rows2[i],
              fill: chartType === "area",
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2
            };

            if (s.stack) {
              dataset.stack = s.stack;
            }

            if (chart.options.curve === false) {
              dataset.lineTension = 0;
            }

            if (chart.options.points === false) {
              dataset.pointRadius = 0;
              dataset.pointHitRadius = 5;
            }

            datasets.push(merge(dataset, s.library || {}));
          }

          if (detectType && labels.length > 0) {
            var minTime = labels[0].getTime();
            var maxTime = labels[0].getTime();
            for (i = 1; i < labels.length; i++) {
              value = labels[i].getTime();
              if (value < minTime) {
                minTime = value;
              }
              if (value > maxTime) {
                maxTime = value;
              }
            }

            var timeDiff = (maxTime - minTime) / (86400 * 1000.0);

            if (!options.scales.xAxes[0].time.unit) {
              var step;
              if (year || timeDiff > 365 * 10) {
                options.scales.xAxes[0].time.unit = "year";
                step = 365;
              } else if (month || timeDiff > 30 * 10) {
                options.scales.xAxes[0].time.unit = "month";
                step = 30;
              } else if (day || timeDiff > 10) {
                options.scales.xAxes[0].time.unit = "day";
                step = 1;
              } else if (hour || timeDiff > 0.5) {
                options.scales.xAxes[0].time.displayFormats = {hour: "MMM D, h a"};
                options.scales.xAxes[0].time.unit = "hour";
                step = 1 / 24.0;
              } else if (minute) {
                options.scales.xAxes[0].time.displayFormats = {minute: "h:mm a"};
                options.scales.xAxes[0].time.unit = "minute";
                step = 1 / 24.0 / 60.0;
              }

              if (step && timeDiff > 0) {
                var unitStepSize = Math.ceil(timeDiff / step / (chart.element.offsetWidth / 100.0));
                if (week && step === 1) {
                  unitStepSize = Math.ceil(unitStepSize / 7.0) * 7;
                }
                options.scales.xAxes[0].time.unitStepSize = unitStepSize;
              }
            }

            if (!options.scales.xAxes[0].time.tooltipFormat) {
              if (day) {
                options.scales.xAxes[0].time.tooltipFormat = "ll";
              } else if (hour) {
                options.scales.xAxes[0].time.tooltipFormat = "MMM D, h a";
              } else if (minute) {
                options.scales.xAxes[0].time.tooltipFormat = "h:mm a";
              }
            }
          }

          var data = {
            labels: labels,
            datasets: datasets
          };

          return data;
        };

        this.renderLineChart = function (chart, chartType) {
          if (chart.options.xtype === "number") {
            return self.renderScatterChart(chart, chartType, true);
          }

          var chartOptions = {};
          if (chartType === "area") {
            // TODO fix area stacked
            // chartOptions.stacked = true;
          }
          // fix for https://github.com/chartjs/Chart.js/issues/2441
          if (!chart.options.max && allZeros(chart.data)) {
            chartOptions.max = 1;
          }

          var options = jsOptions(chart, merge(chartOptions, chart.options));

          var data = createDataTable(chart, options, chartType || "line");

          options.scales.xAxes[0].type = chart.discrete ? "category" : "time";

          drawChart(chart, "line", data, options);
        };

        this.renderPieChart = function (chart) {
          var options = merge({}, baseOptions);
          if (chart.options.donut) {
            options.cutoutPercentage = 50;
          }

          if ("legend" in chart.options) {
            hideLegend(options, chart.options.legend);
          }

          if (chart.options.title) {
            setTitle(options, chart.options.title);
          }

          options = merge(options, chart.options.library || {});

          var labels = [];
          var values = [];
          for (var i = 0; i < chart.data.length; i++) {
            var point = chart.data[i];
            labels.push(point[0]);
            values.push(point[1]);
          }

          var data = {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: chart.options.colors || defaultColors
              }
            ]
          };

          drawChart(chart, "pie", data, options);
        };

        this.renderColumnChart = function (chart, chartType) {
          var options;
          if (chartType === "bar") {
            options = jsOptionsFunc(merge(baseOptions, defaultOptions), hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options);
          } else {
            options = jsOptions(chart, chart.options);
          }
          var data = createDataTable(chart, options, "column");
          setLabelSize(chart, data, options);
          drawChart(chart, (chartType === "bar" ? "horizontalBar" : "bar"), data, options);
        };

        var self = this;

        this.renderAreaChart = function (chart) {
          self.renderLineChart(chart, "area");
        };

        this.renderBarChart = function (chart) {
          self.renderColumnChart(chart, "bar");
        };

        this.renderScatterChart = function (chart, chartType, lineChart) {
          chartType = chartType || "line";

          var options = jsOptions(chart, chart.options);

          var colors = chart.options.colors || defaultColors;

          var datasets = [];
          var series = chart.data;
          for (var i = 0; i < series.length; i++) {
            var s = series[i];
            var d = [];
            for (var j = 0; j < s.data.length; j++) {
              var point = {
                x: toFloat(s.data[j][0]),
                y: toFloat(s.data[j][1])
              };
              if (chartType === "bubble") {
                point.r = toFloat(s.data[j][2]);
              }
              d.push(point);
            }

            var color = s.color || colors[i];
            var backgroundColor = chartType === "area" ? addOpacity(color, 0.5) : color;

            datasets.push({
              label: s.name,
              showLine: lineChart || false,
              data: d,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              fill: chartType === "area"
            })
          }

          if (chartType === "area") {
            chartType = "line";
          }

          var data = {datasets: datasets};

          options.scales.xAxes[0].type = "linear";
          options.scales.xAxes[0].position = "bottom";

          drawChart(chart, chartType, data, options);
        };

        this.renderBubbleChart = function (chart) {
          this.renderScatterChart(chart, "bubble");
        };
      };

      adapters.unshift(ChartjsAdapter);
    }
  }

  function renderChart(chartType, chart) {
    callAdapter(chartType, chart);
    if (chart.options.download && !chart.downloadAttached && chart.adapter === "chartjs") {
      addDownloadButton(chart);
    }
  }

  // TODO remove chartType if cross-browser way
  // to get the name of the chart class
  function callAdapter(chartType, chart) {
    var i, adapter, fnName, adapterName;
    fnName = "render" + chartType;
    adapterName = chart.options.adapter;

    loadAdapters();

    for (i = 0; i < adapters.length; i++) {
      adapter = adapters[i];
      if ((!adapterName || adapterName === adapter.name) && isFunction(adapter[fnName])) {
        chart.adapter = adapter.name;
        return adapter[fnName](chart);
      }
    }
    throw new Error("No adapter found");
  }

  // process data

  var toFormattedKey = function (key, keyType) {
    if (keyType === "number") {
      key = toFloat(key);
    } else if (keyType === "datetime") {
      key = toDate(key);
    } else {
      key = toStr(key);
    }
    return key;
  };

  var formatSeriesData = function (data, keyType) {
    var r = [], key, j;
    for (j = 0; j < data.length; j++) {
      if (keyType === "bubble") {
        r.push([toFloat(data[j][0]), toFloat(data[j][1]), toFloat(data[j][2])]);
      } else {
        key = toFormattedKey(data[j][0], keyType);
        r.push([key, toFloat(data[j][1])]);
      }
    }
    if (keyType === "datetime") {
      r.sort(sortByTime);
    } else if (keyType === "number") {
      r.sort(sortByNumberSeries);
    }
    return r;
  };

  function isMinute(d) {
    return d.getMilliseconds() === 0 && d.getSeconds() === 0;
  }

  function isHour(d) {
    return isMinute(d) && d.getMinutes() === 0;
  }

  function isDay(d) {
    return isHour(d) && d.getHours() === 0;
  }

  function isWeek(d, dayOfWeek) {
    return isDay(d) && d.getDay() === dayOfWeek;
  }

  function isMonth(d) {
    return isDay(d) && d.getDate() === 1;
  }

  function isYear(d) {
    return isMonth(d) && d.getMonth() === 0;
  }

  function isDate(obj) {
    return !isNaN(toDate(obj)) && toStr(obj).length >= 6;
  }

  function allZeros(data) {
    var i, j, d;
    for (i = 0; i < data.length; i++) {
      d = data[i].data;
      for (j = 0; j < d.length; j++) {
        if (d[j][1] != 0) {
          return false;
        }
      }
    }
    return true;
  }

  function detectDiscrete(series) {
    var i, j, data;
    for (i = 0; i < series.length; i++) {
      data = toArr(series[i].data);
      for (j = 0; j < data.length; j++) {
        if (!isDate(data[j][0])) {
          return true;
        }
      }
    }
    return false;
  }

  // creates a shallow copy of each element of the array
  // elements are expected to be objects
  function copySeries(series) {
    var newSeries = [], i, j;
    for (i = 0; i < series.length; i++) {
      var copy = {}
      for (j in series[i]) {
        if (series[i].hasOwnProperty(j)) {
          copy[j] = series[i][j];
        }
      }
      newSeries.push(copy)
    }
    return newSeries;
  }

  function processSeries(chart, keyType) {
    var i;

    var opts = chart.options;
    var series = chart.rawData;

    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      series = [{name: opts.label || "Value", data: series}];
      chart.hideLegend = true;
    } else {
      chart.hideLegend = false;
    }
    if ((opts.discrete === null || opts.discrete === undefined) && keyType !== "bubble" && keyType !== "number") {
      chart.discrete = detectDiscrete(series);
    } else {
      chart.discrete = opts.discrete;
    }
    if (chart.discrete) {
      keyType = "string";
    }
    if (chart.options.xtype) {
      keyType = chart.options.xtype;
    }

    // right format
    series = copySeries(series);
    for (i = 0; i < series.length; i++) {
      series[i].data = formatSeriesData(toArr(series[i].data), keyType);
    }

    return series;
  }

  function processSimple(chart) {
    var perfectData = toArr(chart.rawData), i;
    for (i = 0; i < perfectData.length; i++) {
      perfectData[i] = [toStr(perfectData[i][0]), toFloat(perfectData[i][1])];
    }
    return perfectData;
  }

  function processTime(chart)
  {
    var i, data = chart.rawData;
    for (i = 0; i < data.length; i++) {
      data[i][1] = toDate(data[i][1]);
      data[i][2] = toDate(data[i][2]);
    }
    return data;
  }

  function processLineData(chart) {
    return processSeries(chart, "datetime");
  }

  function processColumnData(chart) {
    return processSeries(chart, "string");
  }

  function processBarData(chart) {
    return processSeries(chart, "string");
  }

  function processAreaData(chart) {
    return processSeries(chart, "datetime");
  }

  function processScatterData(chart) {
    return processSeries(chart, "number");
  }

  function processBubbleData(chart) {
    return processSeries(chart, "bubble");
  }

  function createChart(chartType, chart, element, dataSource, opts, processData) {
    var elementId;
    if (typeof element === "string") {
      elementId = element;
      element = document.getElementById(element);
      if (!element) {
        throw new Error("No element with id " + elementId);
      }
    }

    chart.element = element;
    opts = merge(Chartkick.options, opts || {});
    chart.options = opts;
    chart.dataSource = dataSource;

    if (!processData) {
      processData = function (chart) {
        return chart.rawData;
      }
    }

    // getters
    chart.getElement = function () {
      return element;
    };
    chart.getDataSource = function () {
      return chart.dataSource;
    };
    chart.getData = function () {
      return chart.data;
    };
    chart.getOptions = function () {
      return chart.options;
    };
    chart.getChartObject = function () {
      return chart.chart;
    };
    chart.getAdapter = function () {
      return chart.adapter;
    };

    var callback = function () {
      chart.data = processData(chart);
      renderChart(chartType, chart);
    };

    // functions
    chart.updateData = function (dataSource, options) {
      chart.dataSource = dataSource;
      if (options) {
        chart.options = merge(Chartkick.options, options);
      }
      fetchDataSource(chart, callback, dataSource);
    };
    chart.setOptions = function (options) {
      chart.options = merge(Chartkick.options, options);
      chart.redraw();
    };
    chart.redraw = function() {
      fetchDataSource(chart, callback, chart.rawData);
    };
    chart.refreshData = function () {
      if (typeof chart.dataSource === "string") {
        // prevent browser from caching
        var sep = chart.dataSource.indexOf("?") === -1 ? "?" : "&";
        var url = chart.dataSource + sep + "_=" + (new Date()).getTime();
        fetchDataSource(chart, callback, url);
      }
    };
    chart.stopRefresh = function () {
      if (chart.intervalId) {
        clearInterval(chart.intervalId);
      }
    };
    chart.toImage = function () {
      if (chart.adapter === "chartjs") {
        return chart.chart.toBase64Image();
      } else {
        return null;
      }
    }

    Chartkick.charts[element.id] = chart;

    fetchDataSource(chart, callback, dataSource);

    if (opts.refresh) {
      chart.intervalId = setInterval( function () {
        chart.refreshData();
      }, opts.refresh * 1000);
    }
  }

  // define classes

  Chartkick = {
    LineChart: function (element, dataSource, options) {
      createChart("LineChart", this, element, dataSource, options, processLineData);
    },
    PieChart: function (element, dataSource, options) {
      createChart("PieChart", this, element, dataSource, options, processSimple);
    },
    ColumnChart: function (element, dataSource, options) {
      createChart("ColumnChart", this, element, dataSource, options, processColumnData);
    },
    BarChart: function (element, dataSource, options) {
      createChart("BarChart", this, element, dataSource, options, processBarData);
    },
    AreaChart: function (element, dataSource, options) {
      createChart("AreaChart", this, element, dataSource, options, processAreaData);
    },
    GeoChart: function (element, dataSource, options) {
      createChart("GeoChart", this, element, dataSource, options, processSimple);
    },
    ScatterChart: function (element, dataSource, options) {
      createChart("ScatterChart", this, element, dataSource, options, processScatterData);
    },
    BubbleChart: function (element, dataSource, options) {
      createChart("BubbleChart", this, element, dataSource, options, processBubbleData);
    },
    Timeline: function (element, dataSource, options) {
      createChart("Timeline", this, element, dataSource, options, processTime);
    },
    charts: {},
    configure: function (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          config[key] = options[key];
        }
      }
    },
    eachChart: function (callback) {
      for (var chartId in Chartkick.charts) {
        if (Chartkick.charts.hasOwnProperty(chartId)) {
          callback(Chartkick.charts[chartId]);
        }
      }
    },
    options: {},
    adapters: adapters,
    createChart: createChart
  };

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Chartkick;
  } else {
    window.Chartkick = Chartkick;
  }
}(window));
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (typeof options.beforeSend === "function") {
          options.beforeSend(xhr, options);
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        } else {
          return fire(document, 'ajaxStop');
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return xhr.abort();
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/*
Turbolinks 5.1.0
Copyright © 2018 Basecamp, LLC
 */

(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,e){return Turbolinks.controller.visit(t,e)},clearCache:function(){return Turbolinks.controller.clearCache()},setProgressBarDelay:function(t){return Turbolinks.controller.setProgressBarDelay(t)}}}).call(this),function(){var t,e,r,n=[].slice;Turbolinks.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},Turbolinks.closest=function(e,r){return t.call(e,r)},t=function(){var t,r;return t=document.documentElement,null!=(r=t.closest)?r:function(t){var r;for(r=this;r;){if(r.nodeType===Node.ELEMENT_NODE&&e.call(r,t))return r;r=r.parentNode}}}(),Turbolinks.defer=function(t){return setTimeout(t,1)},Turbolinks.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},Turbolinks.dispatch=function(t,e){var n,o,i,s,a,u;return a=null!=e?e:{},u=a.target,n=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,n===!0),i.data=null!=o?o:{},i.cancelable&&!r&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},r=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),Turbolinks.match=function(t,r){return e.call(t,r)},e=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),Turbolinks.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}.call(this),function(){Turbolinks.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.HttpRequest=function(){function e(e,r,n){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=Turbolinks.Location.wrap(r).requestURL,this.referrer=Turbolinks.Location.wrap(n).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},e.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},e.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return Turbolinks.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return Turbolinks.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new Turbolinks.ProgressBar}var r,n,o;return o=Turbolinks.HttpRequest,r=o.NETWORK_FAILURE,n=o.TIMEOUT_FAILURE,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case r:case n:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.History=function(){function e(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},e.prototype.push=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("push",t,e)},e.prototype.replace=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("replace",t,e)},e.prototype.onPopState=function(t){var e,r,n,o;return this.shouldHandlePopState()&&(o=null!=(r=t.state)?r.turbolinks:void 0)?(e=Turbolinks.Location.wrap(window.location),n=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,n)):void 0},e.prototype.onPageLoad=function(t){return Turbolinks.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},e.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},e.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},e.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},e}()}.call(this),function(){Turbolinks.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new Turbolinks.Location(e)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;Turbolinks.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){Turbolinks.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.SnapshotRenderer=function(e){function r(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=new Turbolinks.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new Turbolinks.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(r,e),r.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},r.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},r.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},r.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},r.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},r.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},r.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},r.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.assignNewBody=function(){return document.body=this.newBody},r.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},r.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},r.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},r.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},r.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},r.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},r.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},r.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},r.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},r}(Turbolinks.Renderer)}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(Turbolinks.Renderer)}.call(this),function(){Turbolinks.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return Turbolinks.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,e,r){return Turbolinks.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),Turbolinks.Snapshot.wrap(t),e)},t.prototype.renderError=function(t,e){return Turbolinks.ErrorRenderer.render(this.delegate,e,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this),this.onScroll=Turbolinks.throttle(this.onScroll)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){Turbolinks.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){var r;return r=e(t),r in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var r;return r=e(t),this.snapshots[r]},t.prototype.write=function(t,r){var n;return n=e(t),this.snapshots[n]=r},t.prototype.touch=function(t){var r,n;return n=e(t),r=this.keys.indexOf(n),r>-1&&this.keys.splice(r,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},e=function(t){return Turbolinks.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Visit=function(){function e(e,r,n){this.controller=e,this.action=n,this.performScroll=t(this.performScroll,this),this.identifier=Turbolinks.uuid(),this.location=Turbolinks.Location.wrap(r),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var r;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=r(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new Turbolinks.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=Turbolinks.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return Turbolinks.copyObject(this.timingMetrics)},r=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new Turbolinks.History(this),this.view=new Turbolinks.View(this),this.scrollManager=new Turbolinks.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return e.prototype.start=function(){return Turbolinks.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new Turbolinks.SnapshotCache(10)},e.prototype.visit=function(t,e){var r,n;return null==e&&(e={}),t=Turbolinks.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(r=null!=(n=e.action)?n:"advance",this.adapter.visitProposedToLocationWithAction(t,r)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,r){var n;return Turbolinks.supported?(n=this.getRestorationDataForIdentifier(r),this.startVisit(t,e,{restorationData:n})):window.location=t},e.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},e.prototype.startHistory=function(){return this.location=Turbolinks.Location.wrap(window.location),this.restorationIdentifier=Turbolinks.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var r;return this.restorationIdentifier=e,this.enabled?(r=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:r,historyChanged:!0}),this.location=Turbolinks.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},e.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},e.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},e.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){
return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return Turbolinks.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return Turbolinks.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return Turbolinks.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return Turbolinks.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),Turbolinks.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,r){var n,o,i,s,a;return o=null!=r?r:{},s=o.restorationIdentifier,i=o.restorationData,n=o.historyChanged,a=new Turbolinks.Visit(this,t,e),a.restorationIdentifier=null!=s?s:Turbolinks.uuid(),a.restorationData=Turbolinks.copyObject(i),a.historyChanged=n,a.referrer=this.location,a},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?Turbolinks.closest(t,"a[href]:not([target]):not([download])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new Turbolinks.Location(t.getAttribute("href")),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return(e=Turbolinks.closest(t,"[data-turbolinks]"))?"false"!==e.getAttribute("data-turbolinks"):!0},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,e,r;Turbolinks.start=function(){return e()?(null==Turbolinks.controller&&(Turbolinks.controller=t()),Turbolinks.controller.start()):void 0},e=function(){return null==window.Turbolinks&&(window.Turbolinks=Turbolinks),r()},t=function(){var t;return t=new Turbolinks.Controller,t.adapter=new Turbolinks.BrowserAdapter(t),t},r=function(){return window.Turbolinks===Turbolinks},r()&&Turbolinks.start()}.call(this);


if(function(t,e){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){"use strict";var n=[],i=t.document,o=Object.getPrototypeOf,r=n.slice,s=n.concat,a=n.push,l=n.indexOf,c={},u=c.toString,h=c.hasOwnProperty,f=h.toString,p=f.call(Object),d={};function g(t,e){var n=(e=e||i).createElement("script");n.text=t,e.head.appendChild(n).parentNode.removeChild(n)}var m="3.2.1",v=function(t,e){return new v.fn.init(t,e)},b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,y=/^-ms-/,w=/-([a-z])/g,x=function(t,e){return e.toUpperCase()};function E(t){var e=!!t&&"length"in t&&t.length,n=v.type(t);return"function"!==n&&!v.isWindow(t)&&("array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t)}v.fn=v.prototype={jquery:m,constructor:v,length:0,toArray:function(){return r.call(this)},get:function(t){return null==t?r.call(this):t<0?this[t+this.length]:this[t]},pushStack:function(t){var e=v.merge(this.constructor(),t);return e.prevObject=this,e},each:function(t){return v.each(this,t)},map:function(t){return this.pushStack(v.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return this.pushStack(r.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,n=+t+(t<0?e:0);return this.pushStack(n>=0&&n<e?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:a,sort:n.sort,splice:n.splice},v.extend=v.fn.extend=function(){var t,e,n,i,o,r,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||v.isFunction(s)||(s={}),a===l&&(s=this,a--);a<l;a++)if(null!=(t=arguments[a]))for(e in t)n=s[e],i=t[e],s!==i&&(c&&i&&(v.isPlainObject(i)||(o=Array.isArray(i)))?(o?(o=!1,r=n&&Array.isArray(n)?n:[]):r=n&&v.isPlainObject(n)?n:{},s[e]=v.extend(c,r,i)):void 0!==i&&(s[e]=i));return s},v.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===v.type(t)},isWindow:function(t){return null!=t&&t===t.window},isNumeric:function(t){var e=v.type(t);return("number"===e||"string"===e)&&!isNaN(t-parseFloat(t))},isPlainObject:function(t){var e,n;return!(!t||"[object Object]"!==u.call(t)||(e=o(t))&&(n=h.call(e,"constructor")&&e.constructor,"function"!=typeof n||f.call(n)!==p))},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?c[u.call(t)]||"object":typeof t},globalEval:function(t){g(t)},camelCase:function(t){return t.replace(y,"ms-").replace(w,x)},each:function(t,e){var n,i=0;if(E(t))for(n=t.length;i<n&&!1!==e.call(t[i],i,t[i]);i++);else for(i in t)if(!1===e.call(t[i],i,t[i]))break;return t},trim:function(t){return null==t?"":(t+"").replace(b,"")},makeArray:function(t,e){var n=e||[];return null!=t&&(E(Object(t))?v.merge(n,"string"==typeof t?[t]:t):a.call(n,t)),n},inArray:function(t,e,n){return null==e?-1:l.call(e,t,n)},merge:function(t,e){for(var n=+e.length,i=0,o=t.length;i<n;i++)t[o++]=e[i];return t.length=o,t},grep:function(t,e,n){for(var i,o=[],r=0,s=t.length,a=!n;r<s;r++)i=!e(t[r],r),i!==a&&o.push(t[r]);return o},map:function(t,e,n){var i,o,r=0,a=[];if(E(t))for(i=t.length;r<i;r++)o=e(t[r],r,n),null!=o&&a.push(o);else for(r in t)o=e(t[r],r,n),null!=o&&a.push(o);return s.apply([],a)},guid:1,proxy:function(t,e){var n,i,o;if("string"==typeof e&&(n=t[e],e=t,t=n),v.isFunction(t))return i=r.call(arguments,2),o=function(){return t.apply(e||this,i.concat(r.call(arguments)))},o.guid=t.guid=t.guid||v.guid++,o},now:Date.now,support:d}),"function"==typeof Symbol&&(v.fn[Symbol.iterator]=n[Symbol.iterator]),v.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(t,e){c["[object "+e+"]"]=e.toLowerCase()});var T=function(t){var e,n,i,o,r,s,a,l,c,u,h,f,p,d,g,m,v,b,y,w="sizzle"+1*new Date,x=t.document,E=0,T=0,S=st(),C=st(),A=st(),L=function(t,e){return t===e&&(h=!0),0},k={}.hasOwnProperty,O=[],I=O.pop,N=O.push,_=O.push,R=O.slice,M=function(t,e){for(var n=0,i=t.length;n<i;n++)if(t[n]===e)return n;return-1},D="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",j="[\\x20\\t\\r\\n\\f]",$="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",P="\\["+j+"*("+$+")(?:"+j+"*([*^$|!~]?=)"+j+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+$+"))|)"+j+"*\\]",W=":("+$+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",F=new RegExp(j+"+","g"),H=new RegExp("^"+j+"+|((?:^|[^\\\\])(?:\\\\.)*)"+j+"+$","g"),B=new RegExp("^"+j+"*,"+j+"*"),z=new RegExp("^"+j+"*([>+~]|"+j+")"+j+"*"),X=new RegExp("="+j+"*([^\\]'\"]*?)"+j+"*\\]","g"),Y=new RegExp(W),U=new RegExp("^"+$+"$"),q={ID:new RegExp("^#("+$+")"),CLASS:new RegExp("^\\.("+$+")"),TAG:new RegExp("^("+$+"|[*])"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+j+"*(even|odd|(([+-]|)(\\d*)n|)"+j+"*(?:([+-]|)"+j+"*(\\d+)|))"+j+"*\\)|)","i"),bool:new RegExp("^(?:"+D+")$","i"),needsContext:new RegExp("^"+j+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+j+"*((?:-\\d)?\\d*)"+j+"*\\)|)(?=[^-]|$)","i")},V=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Q=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,J=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+j+"?|("+j+")|.)","ig"),tt=function(t,e,n){var i="0x"+e-65536;return i!=i||n?e:i<0?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},et=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,nt=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t},it=function(){f()},ot=bt(function(t){return!0===t.disabled&&("form"in t||"label"in t)},{dir:"parentNode",next:"legend"});try{_.apply(O=R.call(x.childNodes),x.childNodes),O[x.childNodes.length].nodeType}catch(t){_={apply:O.length?function(t,e){N.apply(t,R.call(e))}:function(t,e){for(var n=t.length,i=0;t[n++]=e[i++];);t.length=n-1}}}function rt(t,e,i,o){var r,a,c,u,h,d,v,b=e&&e.ownerDocument,E=e?e.nodeType:9;if(i=i||[],"string"!=typeof t||!t||1!==E&&9!==E&&11!==E)return i;if(!o&&((e?e.ownerDocument||e:x)!==p&&f(e),e=e||p,g)){if(11!==E&&(h=Q.exec(t)))if(r=h[1]){if(9===E){if(!(c=e.getElementById(r)))return i;if(c.id===r)return i.push(c),i}else if(b&&(c=b.getElementById(r))&&y(e,c)&&c.id===r)return i.push(c),i}else{if(h[2])return _.apply(i,e.getElementsByTagName(t)),i;if((r=h[3])&&n.getElementsByClassName&&e.getElementsByClassName)return _.apply(i,e.getElementsByClassName(r)),i}if(n.qsa&&!A[t+" "]&&(!m||!m.test(t))){if(1!==E)b=e,v=t;else if("object"!==e.nodeName.toLowerCase()){for((u=e.getAttribute("id"))?u=u.replace(et,nt):e.setAttribute("id",u=w),a=(d=s(t)).length;a--;)d[a]="#"+u+" "+vt(d[a]);v=d.join(","),b=J.test(t)&&gt(e.parentNode)||e}if(v)try{return _.apply(i,b.querySelectorAll(v)),i}catch(t){}finally{u===w&&e.removeAttribute("id")}}}return l(t.replace(H,"$1"),e,i,o)}function st(){var t=[];return function e(n,o){return t.push(n+" ")>i.cacheLength&&delete e[t.shift()],e[n+" "]=o}}function at(t){return t[w]=!0,t}function lt(t){var e=p.createElement("fieldset");try{return!!t(e)}catch(t){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function ct(t,e){for(var n=t.split("|"),o=n.length;o--;)i.attrHandle[n[o]]=e}function ut(t,e){var n=e&&t,i=n&&1===t.nodeType&&1===e.nodeType&&t.sourceIndex-e.sourceIndex;if(i)return i;if(n)for(;n=n.nextSibling;)if(n===e)return-1;return t?1:-1}function ht(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function ft(t){return function(e){var n=e.nodeName.toLowerCase();return("input"===n||"button"===n)&&e.type===t}}function pt(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ot(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function dt(t){return at(function(e){return e=+e,at(function(n,i){for(var o,r=t([],n.length,e),s=r.length;s--;)n[o=r[s]]&&(n[o]=!(i[o]=n[o]))})})}function gt(t){return t&&void 0!==t.getElementsByTagName&&t}n=rt.support={},r=rt.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return!!e&&"HTML"!==e.nodeName},f=rt.setDocument=function(t){var e,o,s=t?t.ownerDocument||t:x;return s!==p&&9===s.nodeType&&s.documentElement?(d=(p=s).documentElement,g=!r(p),x!==p&&(o=p.defaultView)&&o.top!==o&&(o.addEventListener?o.addEventListener("unload",it,!1):o.attachEvent&&o.attachEvent("onunload",it)),n.attributes=lt(function(t){return t.className="i",!t.getAttribute("className")}),n.getElementsByTagName=lt(function(t){return t.appendChild(p.createComment("")),!t.getElementsByTagName("*").length}),n.getElementsByClassName=K.test(p.getElementsByClassName),n.getById=lt(function(t){return d.appendChild(t).id=w,!p.getElementsByName||!p.getElementsByName(w).length}),n.getById?(i.filter.ID=function(t){var e=t.replace(Z,tt);return function(t){return t.getAttribute("id")===e}},i.find.ID=function(t,e){if(void 0!==e.getElementById&&g){var n=e.getElementById(t);return n?[n]:[]}}):(i.filter.ID=function(t){var e=t.replace(Z,tt);return function(t){var n=void 0!==t.getAttributeNode&&t.getAttributeNode("id");return n&&n.value===e}},i.find.ID=function(t,e){if(void 0!==e.getElementById&&g){var n,i,o,r=e.getElementById(t);if(r){if((n=r.getAttributeNode("id"))&&n.value===t)return[r];for(o=e.getElementsByName(t),i=0;r=o[i++];)if(n=r.getAttributeNode("id"),n&&n.value===t)return[r]}return[]}}),i.find.TAG=n.getElementsByTagName?function(t,e){return void 0!==e.getElementsByTagName?e.getElementsByTagName(t):n.qsa?e.querySelectorAll(t):void 0}:function(t,e){var n,i=[],o=0,r=e.getElementsByTagName(t);if("*"===t){for(;n=r[o++];)1===n.nodeType&&i.push(n);return i}return r},i.find.CLASS=n.getElementsByClassName&&function(t,e){if(void 0!==e.getElementsByClassName&&g)return e.getElementsByClassName(t)},v=[],m=[],(n.qsa=K.test(p.querySelectorAll))&&(lt(function(t){d.appendChild(t).innerHTML="<a id='"+w+"'></a><select id='"+w+"-\r\\' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&m.push("[*^$]="+j+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||m.push("\\["+j+"*(?:value|"+D+")"),t.querySelectorAll("[id~="+w+"-]").length||m.push("~="),t.querySelectorAll(":checked").length||m.push(":checked"),t.querySelectorAll("a#"+w+"+*").length||m.push(".#.+[+~]")}),lt(function(t){t.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var e=p.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&m.push("name"+j+"*[*^$|!~]?="),2!==t.querySelectorAll(":enabled").length&&m.push(":enabled",":disabled"),d.appendChild(t).disabled=!0,2!==t.querySelectorAll(":disabled").length&&m.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),m.push(",.*:")})),(n.matchesSelector=K.test(b=d.matches||d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&lt(function(t){n.disconnectedMatch=b.call(t,"*"),b.call(t,"[s!='']:x"),v.push("!=",W)}),m=m.length&&new RegExp(m.join("|")),v=v.length&&new RegExp(v.join("|")),e=K.test(d.compareDocumentPosition),y=e||K.test(d.contains)?function(t,e){var n=9===t.nodeType?t.documentElement:t,i=e&&e.parentNode;return t===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):t.compareDocumentPosition&&16&t.compareDocumentPosition(i)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},L=e?function(t,e){if(t===e)return h=!0,0;var i=!t.compareDocumentPosition-!e.compareDocumentPosition;return i||(1&(i=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1)||!n.sortDetached&&e.compareDocumentPosition(t)===i?t===p||t.ownerDocument===x&&y(x,t)?-1:e===p||e.ownerDocument===x&&y(x,e)?1:u?M(u,t)-M(u,e):0:4&i?-1:1)}:function(t,e){if(t===e)return h=!0,0;var n,i=0,o=t.parentNode,r=e.parentNode,s=[t],a=[e];if(!o||!r)return t===p?-1:e===p?1:o?-1:r?1:u?M(u,t)-M(u,e):0;if(o===r)return ut(t,e);for(n=t;n=n.parentNode;)s.unshift(n);for(n=e;n=n.parentNode;)a.unshift(n);for(;s[i]===a[i];)i++;return i?ut(s[i],a[i]):s[i]===x?-1:a[i]===x?1:0},p):p},rt.matches=function(t,e){return rt(t,null,null,e)},rt.matchesSelector=function(t,e){if((t.ownerDocument||t)!==p&&f(t),e=e.replace(X,"='$1']"),n.matchesSelector&&g&&!A[e+" "]&&(!v||!v.test(e))&&(!m||!m.test(e)))try{var i=b.call(t,e);if(i||n.disconnectedMatch||t.document&&11!==t.document.nodeType)return i}catch(t){}return rt(e,p,null,[t]).length>0},rt.contains=function(t,e){return(t.ownerDocument||t)!==p&&f(t),y(t,e)},rt.attr=function(t,e){(t.ownerDocument||t)!==p&&f(t);var o=i.attrHandle[e.toLowerCase()],r=o&&k.call(i.attrHandle,e.toLowerCase())?o(t,e,!g):void 0;return void 0!==r?r:n.attributes||!g?t.getAttribute(e):(r=t.getAttributeNode(e))&&r.specified?r.value:null},rt.escape=function(t){return(t+"").replace(et,nt)},rt.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},rt.uniqueSort=function(t){var e,i=[],o=0,r=0;if(h=!n.detectDuplicates,u=!n.sortStable&&t.slice(0),t.sort(L),h){for(;e=t[r++];)e===t[r]&&(o=i.push(r));for(;o--;)t.splice(i[o],1)}return u=null,t},o=rt.getText=function(t){var e,n="",i=0,r=t.nodeType;if(r){if(1===r||9===r||11===r){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)n+=o(t)}else if(3===r||4===r)return t.nodeValue}else for(;e=t[i++];)n+=o(e);return n},(i=rt.selectors={cacheLength:50,createPseudo:at,match:q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(Z,tt),t[3]=(t[3]||t[4]||t[5]||"").replace(Z,tt),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||rt.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&rt.error(t[0]),t},PSEUDO:function(t){var e,n=!t[6]&&t[2];return q.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&Y.test(n)&&(e=s(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),t[2]=n.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(Z,tt).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=S[t+" "];return e||(e=new RegExp("(^|"+j+")"+t+"("+j+"|$)"))&&S(t,function(t){return e.test("string"==typeof t.className&&t.className||void 0!==t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,e,n){return function(i){var o=rt.attr(i,t);return null==o?"!="===e:!e||(o+="","="===e?o===n:"!="===e?o!==n:"^="===e?n&&0===o.indexOf(n):"*="===e?n&&o.indexOf(n)>-1:"$="===e?n&&o.slice(-n.length)===n:"~="===e?(" "+o.replace(F," ")+" ").indexOf(n)>-1:"|="===e&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function(t,e,n,i,o){var r="nth"!==t.slice(0,3),s="last"!==t.slice(-4),a="of-type"===e;return 1===i&&0===o?function(t){return!!t.parentNode}:function(e,n,l){var c,u,h,f,p,d,g=r!==s?"nextSibling":"previousSibling",m=e.parentNode,v=a&&e.nodeName.toLowerCase(),b=!l&&!a,y=!1;if(m){if(r){for(;g;){for(f=e;f=f[g];)if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;d=g="only"===t&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&b){for(y=(p=(c=(u=(h=(f=m)[w]||(f[w]={}))[f.uniqueID]||(h[f.uniqueID]={}))[t]||[])[0]===E&&c[1])&&c[2],f=p&&m.childNodes[p];f=++p&&f&&f[g]||(y=p=0)||d.pop();)if(1===f.nodeType&&++y&&f===e){u[t]=[E,p,y];break}}else if(b&&(f=e,h=f[w]||(f[w]={}),u=h[f.uniqueID]||(h[f.uniqueID]={}),c=u[t]||[],p=c[0]===E&&c[1],y=p),!1===y)for(;(f=++p&&f&&f[g]||(y=p=0)||d.pop())&&((a?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++y||(b&&(h=f[w]||(f[w]={}),u=h[f.uniqueID]||(h[f.uniqueID]={}),u[t]=[E,y]),f!==e)););return(y-=o)===i||y%i==0&&y/i>=0}}},PSEUDO:function(t,e){var n,o=i.pseudos[t]||i.setFilters[t.toLowerCase()]||rt.error("unsupported pseudo: "+t);return o[w]?o(e):o.length>1?(n=[t,t,"",e],i.setFilters.hasOwnProperty(t.toLowerCase())?at(function(t,n){for(var i,r=o(t,e),s=r.length;s--;)i=M(t,r[s]),t[i]=!(n[i]=r[s])}):function(t){return o(t,0,n)}):o}},pseudos:{not:at(function(t){var e=[],n=[],i=a(t.replace(H,"$1"));return i[w]?at(function(t,e,n,o){for(var r,s=i(t,null,o,[]),a=t.length;a--;)(r=s[a])&&(t[a]=!(e[a]=r))}):function(t,o,r){return e[0]=t,i(e,null,r,n),e[0]=null,!n.pop()}}),has:at(function(t){return function(e){return rt(t,e).length>0}}),contains:at(function(t){return t=t.replace(Z,tt),function(e){return(e.textContent||e.innerText||o(e)).indexOf(t)>-1}}),lang:at(function(t){return U.test(t||"")||rt.error("unsupported lang: "+t),t=t.replace(Z,tt).toLowerCase(),function(e){var n;do{if(n=g?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var n=t.location&&t.location.hash;return n&&n.slice(1)===e.id},root:function(t){return t===d},focus:function(t){return t===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:pt(!1),disabled:pt(!0),checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,!0===t.selected},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!i.pseudos.empty(t)},header:function(t){return G.test(t.nodeName)},input:function(t){return V.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:dt(function(){return[0]}),last:dt(function(t,e){return[e-1]}),eq:dt(function(t,e,n){return[n<0?n+e:n]}),even:dt(function(t,e){for(var n=0;n<e;n+=2)t.push(n);return t}),odd:dt(function(t,e){for(var n=1;n<e;n+=2)t.push(n);return t}),lt:dt(function(t,e,n){for(var i=n<0?n+e:n;--i>=0;)t.push(i);return t}),gt:dt(function(t,e,n){for(var i=n<0?n+e:n;++i<e;)t.push(i);return t})}}).pseudos.nth=i.pseudos.eq;for(e in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[e]=ht(e);for(e in{submit:!0,reset:!0})i.pseudos[e]=ft(e);function mt(){}function vt(t){for(var e=0,n=t.length,i="";e<n;e++)i+=t[e].value;return i}function bt(t,e,n){var i=e.dir,o=e.next,r=o||i,s=n&&"parentNode"===r,a=T++;return e.first?function(e,n,o){for(;e=e[i];)if(1===e.nodeType||s)return t(e,n,o);return!1}:function(e,n,l){var c,u,h,f=[E,a];if(l){for(;e=e[i];)if((1===e.nodeType||s)&&t(e,n,l))return!0}else for(;e=e[i];)if(1===e.nodeType||s)if(h=e[w]||(e[w]={}),u=h[e.uniqueID]||(h[e.uniqueID]={}),o&&o===e.nodeName.toLowerCase())e=e[i]||e;else{if((c=u[r])&&c[0]===E&&c[1]===a)return f[2]=c[2];if(u[r]=f,f[2]=t(e,n,l))return!0}return!1}}function yt(t){return t.length>1?function(e,n,i){for(var o=t.length;o--;)if(!t[o](e,n,i))return!1;return!0}:t[0]}function wt(t,e,n,i,o){for(var r,s=[],a=0,l=t.length,c=null!=e;a<l;a++)(r=t[a])&&(n&&!n(r,i,o)||(s.push(r),c&&e.push(a)));return s}function xt(t,e,n,i,o,r){return i&&!i[w]&&(i=xt(i)),o&&!o[w]&&(o=xt(o,r)),at(function(r,s,a,l){var c,u,h,f=[],p=[],d=s.length,g=r||function(t,e,n){for(var i=0,o=e.length;i<o;i++)rt(t,e[i],n);return n}(e||"*",a.nodeType?[a]:a,[]),m=!t||!r&&e?g:wt(g,f,t,a,l),v=n?o||(r?t:d||i)?[]:s:m;if(n&&n(m,v,a,l),i)for(c=wt(v,p),i(c,[],a,l),u=c.length;u--;)(h=c[u])&&(v[p[u]]=!(m[p[u]]=h));if(r){if(o||t){if(o){for(c=[],u=v.length;u--;)(h=v[u])&&c.push(m[u]=h);o(null,v=[],c,l)}for(u=v.length;u--;)(h=v[u])&&(c=o?M(r,h):f[u])>-1&&(r[c]=!(s[c]=h))}}else v=wt(v===s?v.splice(d,v.length):v),o?o(null,s,v,l):_.apply(s,v)})}function Et(t){for(var e,n,o,r=t.length,s=i.relative[t[0].type],a=s||i.relative[" "],l=s?1:0,u=bt(function(t){return t===e},a,!0),h=bt(function(t){return M(e,t)>-1},a,!0),f=[function(t,n,i){var o=!s&&(i||n!==c)||((e=n).nodeType?u(t,n,i):h(t,n,i));return e=null,o}];l<r;l++)if(n=i.relative[t[l].type])f=[bt(yt(f),n)];else{if((n=i.filter[t[l].type].apply(null,t[l].matches))[w]){for(o=++l;o<r&&!i.relative[t[o].type];o++);return xt(l>1&&yt(f),l>1&&vt(t.slice(0,l-1).concat({value:" "===t[l-2].type?"*":""})).replace(H,"$1"),n,l<o&&Et(t.slice(l,o)),o<r&&Et(t=t.slice(o)),o<r&&vt(t))}f.push(n)}return yt(f)}return mt.prototype=i.filters=i.pseudos,i.setFilters=new mt,s=rt.tokenize=function(t,e){var n,o,r,s,a,l,c,u=C[t+" "];if(u)return e?0:u.slice(0);for(a=t,l=[],c=i.preFilter;a;){n&&!(o=B.exec(a))||(o&&(a=a.slice(o[0].length)||a),l.push(r=[])),n=!1,(o=z.exec(a))&&(n=o.shift(),r.push({value:n,type:o[0].replace(H," ")}),a=a.slice(n.length));for(s in i.filter)!(o=q[s].exec(a))||c[s]&&!(o=c[s](o))||(n=o.shift(),r.push({value:n,type:s,matches:o}),a=a.slice(n.length));if(!n)break}return e?a.length:a?rt.error(t):C(t,l).slice(0)},a=rt.compile=function(t,e){var n,o,r,a,l,u,h=[],d=[],m=A[t+" "];if(!m){for(e||(e=s(t)),n=e.length;n--;)m=Et(e[n]),m[w]?h.push(m):d.push(m);(m=A(t,(o=d,a=(r=h).length>0,l=o.length>0,u=function(t,e,n,s,u){var h,d,m,v=0,b="0",y=t&&[],w=[],x=c,T=t||l&&i.find.TAG("*",u),S=E+=null==x?1:Math.random()||.1,C=T.length;for(u&&(c=e===p||e||u);b!==C&&null!=(h=T[b]);b++){if(l&&h){for(d=0,e||h.ownerDocument===p||(f(h),n=!g);m=o[d++];)if(m(h,e||p,n)){s.push(h);break}u&&(E=S)}a&&((h=!m&&h)&&v--,t&&y.push(h))}if(v+=b,a&&b!==v){for(d=0;m=r[d++];)m(y,w,e,n);if(t){if(v>0)for(;b--;)y[b]||w[b]||(w[b]=I.call(s));w=wt(w)}_.apply(s,w),u&&!t&&w.length>0&&v+r.length>1&&rt.uniqueSort(s)}return u&&(E=S,c=x),y},a?at(u):u))).selector=t}return m},l=rt.select=function(t,e,n,o){var r,l,c,u,h,f="function"==typeof t&&t,p=!o&&s(t=f.selector||t);if(n=n||[],1===p.length){if((l=p[0]=p[0].slice(0)).length>2&&"ID"===(c=l[0]).type&&9===e.nodeType&&g&&i.relative[l[1].type]){if(!(e=(i.find.ID(c.matches[0].replace(Z,tt),e)||[])[0]))return n;f&&(e=e.parentNode),t=t.slice(l.shift().value.length)}for(r=q.needsContext.test(t)?0:l.length;r--&&(c=l[r],!i.relative[u=c.type]);)if((h=i.find[u])&&(o=h(c.matches[0].replace(Z,tt),J.test(l[0].type)&&gt(e.parentNode)||e))){if(l.splice(r,1),!(t=o.length&&vt(l)))return _.apply(n,o),n;break}}return(f||a(t,p))(o,e,!g,n,!e||J.test(t)&&gt(e.parentNode)||e),n},n.sortStable=w.split("").sort(L).join("")===w,n.detectDuplicates=!!h,f(),n.sortDetached=lt(function(t){return 1&t.compareDocumentPosition(p.createElement("fieldset"))}),lt(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||ct("type|href|height|width",function(t,e,n){if(!n)return t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),n.attributes&&lt(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||ct("value",function(t,e,n){if(!n&&"input"===t.nodeName.toLowerCase())return t.defaultValue}),lt(function(t){return null==t.getAttribute("disabled")})||ct(D,function(t,e,n){var i;if(!n)return!0===t[e]?e.toLowerCase():(i=t.getAttributeNode(e))&&i.specified?i.value:null}),rt}(t);v.find=T,v.expr=T.selectors,v.expr[":"]=v.expr.pseudos,v.uniqueSort=v.unique=T.uniqueSort,v.text=T.getText,v.isXMLDoc=T.isXML,v.contains=T.contains,v.escapeSelector=T.escape;var S=function(t,e,n){for(var i=[],o=void 0!==n;(t=t[e])&&9!==t.nodeType;)if(1===t.nodeType){if(o&&v(t).is(n))break;i.push(t)}return i},C=function(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);return n},A=v.expr.match.needsContext;function L(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()}var k=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,O=/^.[^:#\[\.,]*$/;function I(t,e,n){return v.isFunction(e)?v.grep(t,function(t,i){return!!e.call(t,i,t)!==n}):e.nodeType?v.grep(t,function(t){return t===e!==n}):"string"!=typeof e?v.grep(t,function(t){return l.call(e,t)>-1!==n}):O.test(e)?v.filter(e,t,n):(e=v.filter(e,t),v.grep(t,function(t){return l.call(e,t)>-1!==n&&1===t.nodeType}))}v.filter=function(t,e,n){var i=e[0];return n&&(t=":not("+t+")"),1===e.length&&1===i.nodeType?v.find.matchesSelector(i,t)?[i]:[]:v.find.matches(t,v.grep(e,function(t){return 1===t.nodeType}))},v.fn.extend({find:function(t){var e,n,i=this.length,o=this;if("string"!=typeof t)return this.pushStack(v(t).filter(function(){for(e=0;e<i;e++)if(v.contains(o[e],this))return!0}));for(n=this.pushStack([]),e=0;e<i;e++)v.find(t,o[e],n);return i>1?v.uniqueSort(n):n},filter:function(t){return this.pushStack(I(this,t||[],!1))},not:function(t){return this.pushStack(I(this,t||[],!0))},is:function(t){return!!I(this,"string"==typeof t&&A.test(t)?v(t):t||[],!1).length}});var N,_=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(v.fn.init=function(t,e,n){var o,r;if(!t)return this;if(n=n||N,"string"==typeof t){if(!(o="<"===t[0]&&">"===t[t.length-1]&&t.length>=3?[null,t,null]:_.exec(t))||!o[1]&&e)return!e||e.jquery?(e||n).find(t):this.constructor(e).find(t);if(o[1]){if(e=e instanceof v?e[0]:e,v.merge(this,v.parseHTML(o[1],e&&e.nodeType?e.ownerDocument||e:i,!0)),k.test(o[1])&&v.isPlainObject(e))for(o in e)v.isFunction(this[o])?this[o](e[o]):this.attr(o,e[o]);return this}return(r=i.getElementById(o[2]))&&(this[0]=r,this.length=1),this}return t.nodeType?(this[0]=t,this.length=1,this):v.isFunction(t)?void 0!==n.ready?n.ready(t):t(v):v.makeArray(t,this)}).prototype=v.fn,N=v(i);var R=/^(?:parents|prev(?:Until|All))/,M={children:!0,contents:!0,next:!0,prev:!0};function D(t,e){for(;(t=t[e])&&1!==t.nodeType;);return t}v.fn.extend({has:function(t){var e=v(t,this),n=e.length;return this.filter(function(){for(var t=0;t<n;t++)if(v.contains(this,e[t]))return!0})},closest:function(t,e){var n,i=0,o=this.length,r=[],s="string"!=typeof t&&v(t);if(!A.test(t))for(;i<o;i++)for(n=this[i];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&v.find.matchesSelector(n,t))){r.push(n);break}return this.pushStack(r.length>1?v.uniqueSort(r):r)},index:function(t){return t?"string"==typeof t?l.call(v(t),this[0]):l.call(this,t.jquery?t[0]:t):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(v.uniqueSort(v.merge(this.get(),v(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),v.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return S(t,"parentNode")},parentsUntil:function(t,e,n){return S(t,"parentNode",n)},next:function(t){return D(t,"nextSibling")},prev:function(t){return D(t,"previousSibling")},nextAll:function(t){return S(t,"nextSibling")},prevAll:function(t){return S(t,"previousSibling")},nextUntil:function(t,e,n){return S(t,"nextSibling",n)},prevUntil:function(t,e,n){return S(t,"previousSibling",n)},siblings:function(t){return C((t.parentNode||{}).firstChild,t)},children:function(t){return C(t.firstChild)},contents:function(t){return L(t,"iframe")?t.contentDocument:(L(t,"template")&&(t=t.content||t),v.merge([],t.childNodes))}},function(t,e){v.fn[t]=function(n,i){var o=v.map(this,e,n);return"Until"!==t.slice(-5)&&(i=n),i&&"string"==typeof i&&(o=v.filter(i,o)),this.length>1&&(M[t]||v.uniqueSort(o),R.test(t)&&o.reverse()),this.pushStack(o)}});var j=/[^\x20\t\r\n\f]+/g;function $(t){return t}function P(t){throw t}function W(t,e,n,i){var o;try{t&&v.isFunction(o=t.promise)?o.call(t).done(e).fail(n):t&&v.isFunction(o=t.then)?o.call(t,e,n):e.apply(void 0,[t].slice(i))}catch(t){n.apply(void 0,[t])}}v.Callbacks=function(t){var e,n;t="string"==typeof t?(e=t,n={},v.each(e.match(j)||[],function(t,e){n[e]=!0}),n):v.extend({},t);var i,o,r,s,a=[],l=[],c=-1,u=function(){for(s=s||t.once,r=i=!0;l.length;c=-1)for(o=l.shift();++c<a.length;)!1===a[c].apply(o[0],o[1])&&t.stopOnFalse&&(c=a.length,o=!1);t.memory||(o=!1),i=!1,s&&(a=o?[]:"")},h={add:function(){return a&&(o&&!i&&(c=a.length-1,l.push(o)),function e(n){v.each(n,function(n,i){v.isFunction(i)?t.unique&&h.has(i)||a.push(i):i&&i.length&&"string"!==v.type(i)&&e(i)})}(arguments),o&&!i&&u()),this},remove:function(){return v.each(arguments,function(t,e){for(var n;(n=v.inArray(e,a,n))>-1;)a.splice(n,1),n<=c&&c--}),this},has:function(t){return t?v.inArray(t,a)>-1:a.length>0},empty:function(){return a&&(a=[]),this},disable:function(){return s=l=[],a=o="",this},disabled:function(){return!a},lock:function(){return s=l=[],o||i||(a=o=""),this},locked:function(){return!!s},fireWith:function(t,e){return s||(e=[t,(e=e||[]).slice?e.slice():e],l.push(e),i||u()),this},fire:function(){return h.fireWith(this,arguments),this},fired:function(){return!!r}};return h},v.extend({Deferred:function(e){var n=[["notify","progress",v.Callbacks("memory"),v.Callbacks("memory"),2],["resolve","done",v.Callbacks("once memory"),v.Callbacks("once memory"),0,"resolved"],["reject","fail",v.Callbacks("once memory"),v.Callbacks("once memory"),1,"rejected"]],i="pending",o={state:function(){return i},always:function(){return r.done(arguments).fail(arguments),this},catch:function(t){return o.then(null,t)},pipe:function(){var t=arguments;return v.Deferred(function(e){v.each(n,function(n,i){var o=v.isFunction(t[i[4]])&&t[i[4]];r[i[1]](function(){var t=o&&o.apply(this,arguments);t&&v.isFunction(t.promise)?t.promise().progress(e.notify).done(e.resolve).fail(e.reject):e[i[0]+"With"](this,o?[t]:arguments)})}),t=null}).promise()},then:function(e,i,o){var r=0;function s(e,n,i,o){return function(){var a=this,l=arguments,c=function(){var t,c;if(!(e<r)){if((t=i.apply(a,l))===n.promise())throw new TypeError("Thenable self-resolution");c=t&&("object"==typeof t||"function"==typeof t)&&t.then,v.isFunction(c)?o?c.call(t,s(r,n,$,o),s(r,n,P,o)):(r++,c.call(t,s(r,n,$,o),s(r,n,P,o),s(r,n,$,n.notifyWith))):(i!==$&&(a=void 0,l=[t]),(o||n.resolveWith)(a,l))}},u=o?c:function(){try{c()}catch(t){v.Deferred.exceptionHook&&v.Deferred.exceptionHook(t,u.stackTrace),e+1>=r&&(i!==P&&(a=void 0,l=[t]),n.rejectWith(a,l))}};e?u():(v.Deferred.getStackHook&&(u.stackTrace=v.Deferred.getStackHook()),t.setTimeout(u))}}return v.Deferred(function(t){n[0][3].add(s(0,t,v.isFunction(o)?o:$,t.notifyWith)),n[1][3].add(s(0,t,v.isFunction(e)?e:$)),n[2][3].add(s(0,t,v.isFunction(i)?i:P))}).promise()},promise:function(t){return null!=t?v.extend(t,o):o}},r={};return v.each(n,function(t,e){var s=e[2],a=e[5];o[e[1]]=s.add,a&&s.add(function(){i=a},n[3-t][2].disable,n[0][2].lock),s.add(e[3].fire),r[e[0]]=function(){return r[e[0]+"With"](this===r?void 0:this,arguments),this},r[e[0]+"With"]=s.fireWith}),o.promise(r),e&&e.call(r,r),r},when:function(t){var e=arguments.length,n=e,i=Array(n),o=r.call(arguments),s=v.Deferred(),a=function(t){return function(n){i[t]=this,o[t]=arguments.length>1?r.call(arguments):n,--e||s.resolveWith(i,o)}};if(e<=1&&(W(t,s.done(a(n)).resolve,s.reject,!e),"pending"===s.state()||v.isFunction(o[n]&&o[n].then)))return s.then();for(;n--;)W(o[n],a(n),s.reject);return s.promise()}});var F=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;v.Deferred.exceptionHook=function(e,n){t.console&&t.console.warn&&e&&F.test(e.name)&&t.console.warn("jQuery.Deferred exception: "+e.message,e.stack,n)},v.readyException=function(e){t.setTimeout(function(){throw e})};var H=v.Deferred();function B(){i.removeEventListener("DOMContentLoaded",B),t.removeEventListener("load",B),v.ready()}v.fn.ready=function(t){return H.then(t).catch(function(t){v.readyException(t)}),this},v.extend({isReady:!1,readyWait:1,ready:function(t){(!0===t?--v.readyWait:v.isReady)||(v.isReady=!0,!0!==t&&--v.readyWait>0||H.resolveWith(i,[v]))}}),v.ready.then=H.then,"complete"===i.readyState||"loading"!==i.readyState&&!i.documentElement.doScroll?t.setTimeout(v.ready):(i.addEventListener("DOMContentLoaded",B),t.addEventListener("load",B));var z=function(t,e,n,i,o,r,s){var a=0,l=t.length,c=null==n;if("object"===v.type(n)){o=!0;for(a in n)z(t,e,a,n[a],!0,r,s)}else if(void 0!==i&&(o=!0,v.isFunction(i)||(s=!0),c&&(s?(e.call(t,i),e=null):(c=e,e=function(t,e,n){return c.call(v(t),n)})),e))for(;a<l;a++)e(t[a],n,s?i:i.call(t[a],a,e(t[a],n)));return o?t:c?e.call(t):l?e(t[0],n):r},X=function(t){return 1===t.nodeType||9===t.nodeType||!+t.nodeType};function Y(){this.expando=v.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(t){var e=t[this.expando];return e||(e={},X(t)&&(t.nodeType?t[this.expando]=e:Object.defineProperty(t,this.expando,{value:e,configurable:!0}))),e},set:function(t,e,n){var i,o=this.cache(t);if("string"==typeof e)o[v.camelCase(e)]=n;else for(i in e)o[v.camelCase(i)]=e[i];return o},get:function(t,e){return void 0===e?this.cache(t):t[this.expando]&&t[this.expando][v.camelCase(e)]},access:function(t,e,n){return void 0===e||e&&"string"==typeof e&&void 0===n?this.get(t,e):(this.set(t,e,n),void 0!==n?n:e)},remove:function(t,e){var n,i=t[this.expando];if(void 0!==i){if(void 0!==e){Array.isArray(e)?e=e.map(v.camelCase):e=(e=v.camelCase(e))in i?[e]:e.match(j)||[],n=e.length;for(;n--;)delete i[e[n]]}(void 0===e||v.isEmptyObject(i))&&(t.nodeType?t[this.expando]=void 0:delete t[this.expando])}},hasData:function(t){var e=t[this.expando];return void 0!==e&&!v.isEmptyObject(e)}};var U=new Y,q=new Y,V=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,G=/[A-Z]/g;function K(t,e,n){var i,o;if(void 0===n&&1===t.nodeType)if(i="data-"+e.replace(G,"-$&").toLowerCase(),n=t.getAttribute(i),"string"==typeof n){try{n="true"===(o=n)||"false"!==o&&("null"===o?null:o===+o+""?+o:V.test(o)?JSON.parse(o):o)}catch(t){}q.set(t,e,n)}else n=void 0;return n}v.extend({hasData:function(t){return q.hasData(t)||U.hasData(t)},data:function(t,e,n){return q.access(t,e,n)},removeData:function(t,e){q.remove(t,e)},_data:function(t,e,n){return U.access(t,e,n)},_removeData:function(t,e){U.remove(t,e)}}),v.fn.extend({data:function(t,e){var n,i,o,r=this[0],s=r&&r.attributes;if(void 0===t){if(this.length&&(o=q.get(r),1===r.nodeType&&!U.get(r,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(i=s[n].name,0===i.indexOf("data-")&&(i=v.camelCase(i.slice(5)),K(r,i,o[i])));U.set(r,"hasDataAttrs",!0)}return o}return"object"==typeof t?this.each(function(){q.set(this,t)}):z(this,function(e){var n;if(r&&void 0===e){if(void 0!==(n=q.get(r,t)))return n;if(void 0!==(n=K(r,t)))return n}else this.each(function(){q.set(this,t,e)})},null,e,arguments.length>1,null,!0)},removeData:function(t){return this.each(function(){q.remove(this,t)})}}),v.extend({queue:function(t,e,n){var i;if(t)return e=(e||"fx")+"queue",i=U.get(t,e),n&&(!i||Array.isArray(n)?i=U.access(t,e,v.makeArray(n)):i.push(n)),i||[]},dequeue:function(t,e){e=e||"fx";var n=v.queue(t,e),i=n.length,o=n.shift(),r=v._queueHooks(t,e);"inprogress"===o&&(o=n.shift(),i--),o&&("fx"===e&&n.unshift("inprogress"),delete r.stop,o.call(t,function(){v.dequeue(t,e)},r)),!i&&r&&r.empty.fire()},_queueHooks:function(t,e){var n=e+"queueHooks";return U.get(t,n)||U.access(t,n,{empty:v.Callbacks("once memory").add(function(){U.remove(t,[e+"queue",n])})})}}),v.fn.extend({queue:function(t,e){var n=2;return"string"!=typeof t&&(e=t,t="fx",n--),arguments.length<n?v.queue(this[0],t):void 0===e?this:this.each(function(){var n=v.queue(this,t,e);v._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&v.dequeue(this,t)})},dequeue:function(t){return this.each(function(){v.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var n,i=1,o=v.Deferred(),r=this,s=this.length,a=function(){--i||o.resolveWith(r,[r])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";s--;)n=U.get(r[s],t+"queueHooks"),n&&n.empty&&(i++,n.empty.add(a));return a(),o.promise(e)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,J=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Z=["Top","Right","Bottom","Left"],tt=function(t,e){return"none"===(t=e||t).style.display||""===t.style.display&&v.contains(t.ownerDocument,t)&&"none"===v.css(t,"display")},et=function(t,e,n,i){var o,r,s={};for(r in e)s[r]=t.style[r],t.style[r]=e[r];o=n.apply(t,i||[]);for(r in e)t.style[r]=s[r];return o};function nt(t,e,n,i){var o,r=1,s=20,a=i?function(){return i.cur()}:function(){return v.css(t,e,"")},l=a(),c=n&&n[3]||(v.cssNumber[e]?"":"px"),u=(v.cssNumber[e]||"px"!==c&&+l)&&J.exec(v.css(t,e));if(u&&u[3]!==c){c=c||u[3],n=n||[],u=+l||1;do{r=r||".5",u/=r,v.style(t,e,u+c)}while(r!==(r=a()/l)&&1!==r&&--s)}return n&&(u=+u||+l||0,o=n[1]?u+(n[1]+1)*n[2]:+n[2],i&&(i.unit=c,i.start=u,i.end=o)),o}var it={};function ot(t,e){for(var n,i,o=[],r=0,s=t.length;r<s;r++)i=t[r],i.style&&(n=i.style.display,e?("none"===n&&(o[r]=U.get(i,"display")||null,o[r]||(i.style.display="")),""===i.style.display&&tt(i)&&(o[r]=(a=i,l=void 0,c=void 0,void 0,h=void 0,c=a.ownerDocument,u=a.nodeName,h=it[u],h||(l=c.body.appendChild(c.createElement(u)),h=v.css(l,"display"),l.parentNode.removeChild(l),"none"===h&&(h="block"),it[u]=h,h)))):"none"!==n&&(o[r]="none",U.set(i,"display",n)));var a,l,c,u,h;for(r=0;r<s;r++)null!=o[r]&&(t[r].style.display=o[r]);return t}v.fn.extend({show:function(){return ot(this,!0)},hide:function(){return ot(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){tt(this)?v(this).show():v(this).hide()})}});var rt=/^(?:checkbox|radio)$/i,st=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,at=/^$|\/(?:java|ecma)script/i,lt={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ct(t,e){var n;return n=void 0!==t.getElementsByTagName?t.getElementsByTagName(e||"*"):void 0!==t.querySelectorAll?t.querySelectorAll(e||"*"):[],void 0===e||e&&L(t,e)?v.merge([t],n):n}function ut(t,e){for(var n=0,i=t.length;n<i;n++)U.set(t[n],"globalEval",!e||U.get(e[n],"globalEval"))}lt.optgroup=lt.option,lt.tbody=lt.tfoot=lt.colgroup=lt.caption=lt.thead,lt.th=lt.td;var ht,ft,pt=/<|&#?\w+;/;function dt(t,e,n,i,o){for(var r,s,a,l,c,u,h=e.createDocumentFragment(),f=[],p=0,d=t.length;p<d;p++)if(r=t[p],r||0===r)if("object"===v.type(r))v.merge(f,r.nodeType?[r]:r);else if(pt.test(r)){for(s=s||h.appendChild(e.createElement("div")),a=(st.exec(r)||["",""])[1].toLowerCase(),l=lt[a]||lt._default,s.innerHTML=l[1]+v.htmlPrefilter(r)+l[2],u=l[0];u--;)s=s.lastChild;v.merge(f,s.childNodes),(s=h.firstChild).textContent=""}else f.push(e.createTextNode(r));for(h.textContent="",p=0;r=f[p++];)if(i&&v.inArray(r,i)>-1)o&&o.push(r);else if(c=v.contains(r.ownerDocument,r),s=ct(h.appendChild(r),"script"),c&&ut(s),n)for(u=0;r=s[u++];)at.test(r.type||"")&&n.push(r);return h}ht=i.createDocumentFragment().appendChild(i.createElement("div")),(ft=i.createElement("input")).setAttribute("type","radio"),ft.setAttribute("checked","checked"),ft.setAttribute("name","t"),ht.appendChild(ft),d.checkClone=ht.cloneNode(!0).cloneNode(!0).lastChild.checked,ht.innerHTML="<textarea>x</textarea>",d.noCloneChecked=!!ht.cloneNode(!0).lastChild.defaultValue;var gt=i.documentElement,mt=/^key/,vt=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,bt=/^([^.]*)(?:\.(.+)|)/;function yt(){return!0}function wt(){return!1}function xt(){try{return i.activeElement}catch(t){}}function Et(t,e,n,i,o,r){var s,a;if("object"==typeof e){"string"!=typeof n&&(i=i||n,n=void 0);for(a in e)Et(t,a,n,i,e[a],r);return t}if(null==i&&null==o?(o=n,i=n=void 0):null==o&&("string"==typeof n?(o=i,i=void 0):(o=i,i=n,n=void 0)),!1===o)o=wt;else if(!o)return t;return 1===r&&(s=o,(o=function(t){return v().off(t),s.apply(this,arguments)}).guid=s.guid||(s.guid=v.guid++)),t.each(function(){v.event.add(this,e,o,i,n)})}v.event={global:{},add:function(t,e,n,i,o){var r,s,a,l,c,u,h,f,p,d,g,m=U.get(t);if(m)for(n.handler&&(n=(r=n).handler,o=r.selector),o&&v.find.matchesSelector(gt,o),n.guid||(n.guid=v.guid++),(l=m.events)||(l=m.events={}),(s=m.handle)||(s=m.handle=function(e){return void 0!==v&&v.event.triggered!==e.type?v.event.dispatch.apply(t,arguments):void 0}),c=(e=(e||"").match(j)||[""]).length;c--;)a=bt.exec(e[c])||[],p=g=a[1],d=(a[2]||"").split(".").sort(),p&&(h=v.event.special[p]||{},p=(o?h.delegateType:h.bindType)||p,h=v.event.special[p]||{},u=v.extend({type:p,origType:g,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&v.expr.match.needsContext.test(o),namespace:d.join(".")},r),(f=l[p])||(f=l[p]=[],f.delegateCount=0,h.setup&&!1!==h.setup.call(t,i,d,s)||t.addEventListener&&t.addEventListener(p,s)),h.add&&(h.add.call(t,u),u.handler.guid||(u.handler.guid=n.guid)),o?f.splice(f.delegateCount++,0,u):f.push(u),v.event.global[p]=!0)},remove:function(t,e,n,i,o){var r,s,a,l,c,u,h,f,p,d,g,m=U.hasData(t)&&U.get(t);if(m&&(l=m.events)){for(c=(e=(e||"").match(j)||[""]).length;c--;)if(a=bt.exec(e[c])||[],p=g=a[1],d=(a[2]||"").split(".").sort(),p){for(h=v.event.special[p]||{},f=l[p=(i?h.delegateType:h.bindType)||p]||[],a=a[2]&&new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=r=f.length;r--;)u=f[r],!o&&g!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||i&&i!==u.selector&&("**"!==i||!u.selector)||(f.splice(r,1),u.selector&&f.delegateCount--,h.remove&&h.remove.call(t,u));s&&!f.length&&(h.teardown&&!1!==h.teardown.call(t,d,m.handle)||v.removeEvent(t,p,m.handle),delete l[p])}else for(p in l)v.event.remove(t,p+e[c],n,i,!0);v.isEmptyObject(l)&&U.remove(t,"handle events")}},dispatch:function(t){var e,n,i,o,r,s,a=v.event.fix(t),l=new Array(arguments.length),c=(U.get(this,"events")||{})[a.type]||[],u=v.event.special[a.type]||{};for(l[0]=a,e=1;e<arguments.length;e++)l[e]=arguments[e];if(a.delegateTarget=this,!u.preDispatch||!1!==u.preDispatch.call(this,a)){for(s=v.event.handlers.call(this,a,c),e=0;(o=s[e++])&&!a.isPropagationStopped();)for(a.currentTarget=o.elem,n=0;(r=o.handlers[n++])&&!a.isImmediatePropagationStopped();)a.rnamespace&&!a.rnamespace.test(r.namespace)||(a.handleObj=r,a.data=r.data,i=((v.event.special[r.origType]||{}).handle||r.handler).apply(o.elem,l),void 0!==i&&!1===(a.result=i)&&(a.preventDefault(),a.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,a),a.result}},handlers:function(t,e){var n,i,o,r,s,a=[],l=e.delegateCount,c=t.target;if(l&&c.nodeType&&!("click"===t.type&&t.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==t.type||!0!==c.disabled)){for(r=[],s={},n=0;n<l;n++)i=e[n],o=i.selector+" ",void 0===s[o]&&(s[o]=i.needsContext?v(o,this).index(c)>-1:v.find(o,this,null,[c]).length),s[o]&&r.push(i);r.length&&a.push({elem:c,handlers:r})}return c=this,l<e.length&&a.push({elem:c,handlers:e.slice(l)}),a},addProp:function(t,e){Object.defineProperty(v.Event.prototype,t,{enumerable:!0,configurable:!0,get:v.isFunction(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(t){return t[v.expando]?t:new v.Event(t)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xt()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xt()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&L(this,"input"))return this.click(),!1},_default:function(t){return L(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}}},v.removeEvent=function(t,e,n){t.removeEventListener&&t.removeEventListener(e,n)},v.Event=function(t,e){return this instanceof v.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&!1===t.returnValue?yt:wt,this.target=t.target&&3===t.target.nodeType?t.target.parentNode:t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget):this.type=t,e&&v.extend(this,e),this.timeStamp=t&&t.timeStamp||v.now(),void(this[v.expando]=!0)):new v.Event(t,e)},v.Event.prototype={constructor:v.Event,isDefaultPrevented:wt,isPropagationStopped:wt,isImmediatePropagationStopped:wt,isSimulated:!1,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=yt,t&&!this.isSimulated&&t.preventDefault()},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=yt,t&&!this.isSimulated&&t.stopPropagation()},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=yt,t&&!this.isSimulated&&t.stopImmediatePropagation(),this.stopPropagation()}},v.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(t){var e=t.button;return null==t.which&&mt.test(t.type)?null!=t.charCode?t.charCode:t.keyCode:!t.which&&void 0!==e&&vt.test(t.type)?1&e?1:2&e?3:4&e?2:0:t.which}},v.event.addProp),v.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){v.event.special[t]={delegateType:e,bindType:e,handle:function(t){var n,i=t.relatedTarget,o=t.handleObj;return i&&(i===this||v.contains(this,i))||(t.type=o.origType,n=o.handler.apply(this,arguments),t.type=e),n}}}),v.fn.extend({on:function(t,e,n,i){return Et(this,t,e,n,i)},one:function(t,e,n,i){return Et(this,t,e,n,i,1)},off:function(t,e,n){var i,o;if(t&&t.preventDefault&&t.handleObj)return i=t.handleObj,v(t.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof t){for(o in t)this.off(o,e,t[o]);return this}return!1!==e&&"function"!=typeof e||(n=e,e=void 0),!1===n&&(n=wt),this.each(function(){v.event.remove(this,t,n,e)})}});var Tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,St=/<script|<style|<link/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,At=/^true\/(.*)/,Lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function kt(t,e){return L(t,"table")&&L(11!==e.nodeType?e:e.firstChild,"tr")&&v(">tbody",t)[0]||t}function Ot(t){return t.type=(null!==t.getAttribute("type"))+"/"+t.type,t}function It(t){var e=At.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function Nt(t,e){var n,i,o,r,s,a,l,c;if(1===e.nodeType){if(U.hasData(t)&&(r=U.access(t),s=U.set(e,r),c=r.events)){delete s.handle,s.events={};for(o in c)for(n=0,i=c[o].length;n<i;n++)v.event.add(e,o,c[o][n])}q.hasData(t)&&(a=q.access(t),l=v.extend({},a),q.set(e,l))}}function _t(t,e,n,i){e=s.apply([],e);var o,r,a,l,c,u,h=0,f=t.length,p=f-1,m=e[0],b=v.isFunction(m);if(b||f>1&&"string"==typeof m&&!d.checkClone&&Ct.test(m))return t.each(function(o){var r=t.eq(o);b&&(e[0]=m.call(this,o,r.html())),_t(r,e,n,i)});if(f&&(r=(o=dt(e,t[0].ownerDocument,!1,t,i)).firstChild,1===o.childNodes.length&&(o=r),r||i)){for(l=(a=v.map(ct(o,"script"),Ot)).length;h<f;h++)c=o,h!==p&&(c=v.clone(c,!0,!0),l&&v.merge(a,ct(c,"script"))),n.call(t[h],c,h);if(l)for(u=a[a.length-1].ownerDocument,v.map(a,It),h=0;h<l;h++)c=a[h],at.test(c.type||"")&&!U.access(c,"globalEval")&&v.contains(u,c)&&(c.src?v._evalUrl&&v._evalUrl(c.src):g(c.textContent.replace(Lt,""),u))}return t}function Rt(t,e,n){for(var i,o=e?v.filter(e,t):t,r=0;null!=(i=o[r]);r++)n||1!==i.nodeType||v.cleanData(ct(i)),i.parentNode&&(n&&v.contains(i.ownerDocument,i)&&ut(ct(i,"script")),i.parentNode.removeChild(i));return t}v.extend({htmlPrefilter:function(t){return t.replace(Tt,"<$1></$2>")},clone:function(t,e,n){var i,o,r,s,a,l,c,u=t.cloneNode(!0),h=v.contains(t.ownerDocument,t);if(!(d.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||v.isXMLDoc(t)))for(s=ct(u),r=ct(t),i=0,o=r.length;i<o;i++)a=r[i],l=s[i],void 0,c=l.nodeName.toLowerCase(),"input"===c&&rt.test(a.type)?l.checked=a.checked:"input"!==c&&"textarea"!==c||(l.defaultValue=a.defaultValue);if(e)if(n)for(r=r||ct(t),s=s||ct(u),i=0,o=r.length;i<o;i++)Nt(r[i],s[i]);else Nt(t,u);return(s=ct(u,"script")).length>0&&ut(s,!h&&ct(t,"script")),u},cleanData:function(t){for(var e,n,i,o=v.event.special,r=0;void 0!==(n=t[r]);r++)if(X(n)){if(e=n[U.expando]){if(e.events)for(i in e.events)o[i]?v.event.remove(n,i):v.removeEvent(n,i,e.handle);n[U.expando]=void 0}n[q.expando]&&(n[q.expando]=void 0)}}}),v.fn.extend({detach:function(t){return Rt(this,t,!0)},remove:function(t){return Rt(this,t)},text:function(t){return z(this,function(t){return void 0===t?v.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=t)})},null,t,arguments.length)},append:function(){return _t(this,arguments,function(t){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||kt(this,t).appendChild(t)})},prepend:function(){return _t(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=kt(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return _t(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return _t(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},empty:function(){for(var t,e=0;null!=(t=this[e]);e++)1===t.nodeType&&(v.cleanData(ct(t,!1)),t.textContent="");return this},clone:function(t,e){return t=null!=t&&t,e=null==e?t:e,this.map(function(){return v.clone(this,t,e)})},html:function(t){return z(this,function(t){var e=this[0]||{},n=0,i=this.length;if(void 0===t&&1===e.nodeType)return e.innerHTML;if("string"==typeof t&&!St.test(t)&&!lt[(st.exec(t)||["",""])[1].toLowerCase()]){t=v.htmlPrefilter(t);try{for(;n<i;n++)e=this[n]||{},1===e.nodeType&&(v.cleanData(ct(e,!1)),e.innerHTML=t);e=0}catch(t){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=[];return _t(this,arguments,function(e){var n=this.parentNode;v.inArray(this,t)<0&&(v.cleanData(ct(this)),n&&n.replaceChild(e,this))},t)}}),v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){v.fn[t]=function(t){for(var n,i=[],o=v(t),r=o.length-1,s=0;s<=r;s++)n=s===r?this:this.clone(!0),v(o[s])[e](n),a.apply(i,n.get());return this.pushStack(i)}});var Mt=/^margin/,Dt=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),jt=function(e){var n=e.ownerDocument.defaultView;return n&&n.opener||(n=t),n.getComputedStyle(e)};function $t(t,e,n){var i,o,r,s,a=t.style;return(n=n||jt(t))&&(""!==(s=n.getPropertyValue(e)||n[e])||v.contains(t.ownerDocument,t)||(s=v.style(t,e)),!d.pixelMarginRight()&&Dt.test(s)&&Mt.test(e)&&(i=a.width,o=a.minWidth,r=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=o,a.maxWidth=r)),void 0!==s?s+"":s}function Pt(t,e){return{get:function(){return t()?void delete this.get:(this.get=e).apply(this,arguments)}}}!function(){function e(){if(l){l.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",l.innerHTML="",gt.appendChild(a);var e=t.getComputedStyle(l);n="1%"!==e.top,s="2px"===e.marginLeft,o="4px"===e.width,l.style.marginRight="50%",r="4px"===e.marginRight,gt.removeChild(a),l=null}}var n,o,r,s,a=i.createElement("div"),l=i.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",d.clearCloneStyle="content-box"===l.style.backgroundClip,a.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",a.appendChild(l),v.extend(d,{pixelPosition:function(){return e(),n},boxSizingReliable:function(){return e(),o},pixelMarginRight:function(){return e(),r},reliableMarginLeft:function(){return e(),s}}))}();var Wt=/^(none|table(?!-c[ea]).+)/,Ft=/^--/,Ht={position:"absolute",visibility:"hidden",display:"block"},Bt={letterSpacing:"0",fontWeight:"400"},zt=["Webkit","Moz","ms"],Xt=i.createElement("div").style;function Yt(t){var e=v.cssProps[t];return e||(e=v.cssProps[t]=function(t){if(t in Xt)return t;for(var e=t[0].toUpperCase()+t.slice(1),n=zt.length;n--;)if(t=zt[n]+e,t in Xt)return t}(t)||t),e}function Ut(t,e,n){var i=J.exec(e);return i?Math.max(0,i[2]-(n||0))+(i[3]||"px"):e}function qt(t,e,n,i,o){var r,s=0;for(r=n===(i?"border":"content")?4:"width"===e?1:0;r<4;r+=2)"margin"===n&&(s+=v.css(t,n+Z[r],!0,o)),i?("content"===n&&(s-=v.css(t,"padding"+Z[r],!0,o)),"margin"!==n&&(s-=v.css(t,"border"+Z[r]+"Width",!0,o))):(s+=v.css(t,"padding"+Z[r],!0,o),"padding"!==n&&(s+=v.css(t,"border"+Z[r]+"Width",!0,o)));return s}function Vt(t,e,n){var i,o=jt(t),r=$t(t,e,o),s="border-box"===v.css(t,"boxSizing",!1,o);return Dt.test(r)?r:(i=s&&(d.boxSizingReliable()||r===t.style[e]),"auto"===r&&(r=t["offset"+e[0].toUpperCase()+e.slice(1)]),(r=parseFloat(r)||0)+qt(t,e,n||(s?"border":"content"),i,o)+"px")}function Gt(t,e,n,i,o){return new Gt.prototype.init(t,e,n,i,o)}v.extend({cssHooks:{opacity:{get:function(t,e){if(e){var n=$t(t,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function(t,e,n,i){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var o,r,s,a=v.camelCase(e),l=Ft.test(e),c=t.style;return l||(e=Yt(a)),s=v.cssHooks[e]||v.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(o=s.get(t,!1,i))?o:c[e]:("string"===(r=typeof n)&&(o=J.exec(n))&&o[1]&&(n=nt(t,e,o),r="number"),void(null!=n&&n==n&&("number"===r&&(n+=o&&o[3]||(v.cssNumber[a]?"":"px")),d.clearCloneStyle||""!==n||0!==e.indexOf("background")||(c[e]="inherit"),s&&"set"in s&&void 0===(n=s.set(t,n,i))||(l?c.setProperty(e,n):c[e]=n))))}},css:function(t,e,n,i){var o,r,s,a=v.camelCase(e);return Ft.test(e)||(e=Yt(a)),(s=v.cssHooks[e]||v.cssHooks[a])&&"get"in s&&(o=s.get(t,!0,n)),void 0===o&&(o=$t(t,e,i)),"normal"===o&&e in Bt&&(o=Bt[e]),""===n||n?(r=parseFloat(o),!0===n||isFinite(r)?r||0:o):o}}),v.each(["height","width"],function(t,e){v.cssHooks[e]={get:function(t,n,i){if(n)return!Wt.test(v.css(t,"display"))||t.getClientRects().length&&t.getBoundingClientRect().width?Vt(t,e,i):et(t,Ht,function(){return Vt(t,e,i)})},set:function(t,n,i){var o,r=i&&jt(t),s=i&&qt(t,e,i,"border-box"===v.css(t,"boxSizing",!1,r),r);return s&&(o=J.exec(n))&&"px"!==(o[3]||"px")&&(t.style[e]=n,n=v.css(t,e)),Ut(0,n,s)}}}),v.cssHooks.marginLeft=Pt(d.reliableMarginLeft,function(t,e){if(e)return(parseFloat($t(t,"marginLeft"))||t.getBoundingClientRect().left-et(t,{marginLeft:0},function(){return t.getBoundingClientRect().left}))+"px"}),v.each({margin:"",padding:"",border:"Width"},function(t,e){v.cssHooks[t+e]={expand:function(n){for(var i=0,o={},r="string"==typeof n?n.split(" "):[n];i<4;i++)o[t+Z[i]+e]=r[i]||r[i-2]||r[0];return o}},Mt.test(t)||(v.cssHooks[t+e].set=Ut)}),v.fn.extend({css:function(t,e){return z(this,function(t,e,n){var i,o,r={},s=0;if(Array.isArray(e)){for(i=jt(t),o=e.length;s<o;s++)r[e[s]]=v.css(t,e[s],!1,i);return r}return void 0!==n?v.style(t,e,n):v.css(t,e)},t,e,arguments.length>1)}}),v.Tween=Gt,Gt.prototype={constructor:Gt,init:function(t,e,n,i,o,r){this.elem=t,this.prop=n,this.easing=o||v.easing._default,this.options=e,this.start=this.now=this.cur(),this.end=i,this.unit=r||(v.cssNumber[n]?"":"px")},cur:function(){var t=Gt.propHooks[this.prop];return t&&t.get?t.get(this):Gt.propHooks._default.get(this)},run:function(t){var e,n=Gt.propHooks[this.prop];return this.options.duration?this.pos=e=v.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):this.pos=e=t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Gt.propHooks._default.set(this),this}},Gt.prototype.init.prototype=Gt.prototype,Gt.propHooks={_default:{get:function(t){var e;return 1!==t.elem.nodeType||null!=t.elem[t.prop]&&null==t.elem.style[t.prop]?t.elem[t.prop]:(e=v.css(t.elem,t.prop,""))&&"auto"!==e?e:0},set:function(t){v.fx.step[t.prop]?v.fx.step[t.prop](t):1!==t.elem.nodeType||null==t.elem.style[v.cssProps[t.prop]]&&!v.cssHooks[t.prop]?t.elem[t.prop]=t.now:v.style(t.elem,t.prop,t.now+t.unit)}}},Gt.propHooks.scrollTop=Gt.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},v.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2},_default:"swing"},v.fx=Gt.prototype.init,v.fx.step={};var Kt,Qt,Jt,Zt,te=/^(?:toggle|show|hide)$/,ee=/queueHooks$/;function ne(){Qt&&(!1===i.hidden&&t.requestAnimationFrame?t.requestAnimationFrame(ne):t.setTimeout(ne,v.fx.interval),v.fx.tick())}function ie(){return t.setTimeout(function(){Kt=void 0}),Kt=v.now()}function oe(t,e){var n,i=0,o={height:t};for(e=e?1:0;i<4;i+=2-e)n=Z[i],o["margin"+n]=o["padding"+n]=t;return e&&(o.opacity=o.width=t),o}function re(t,e,n){for(var i,o=(se.tweeners[e]||[]).concat(se.tweeners["*"]),r=0,s=o.length;r<s;r++)if(i=o[r].call(n,e,t))return i}function se(t,e,n){var i,o,r=0,s=se.prefilters.length,a=v.Deferred().always(function(){delete l.elem}),l=function(){if(o)return!1;for(var e=Kt||ie(),n=Math.max(0,c.startTime+c.duration-e),i=1-(n/c.duration||0),r=0,s=c.tweens.length;r<s;r++)c.tweens[r].run(i);return a.notifyWith(t,[c,i,n]),i<1&&s?n:(s||a.notifyWith(t,[c,1,0]),a.resolveWith(t,[c]),!1)},c=a.promise({elem:t,props:v.extend({},e),opts:v.extend(!0,{specialEasing:{},easing:v.easing._default},n),originalProperties:e,originalOptions:n,startTime:Kt||ie(),duration:n.duration,tweens:[],createTween:function(e,n){var i=v.Tween(t,c.opts,e,n,c.opts.specialEasing[e]||c.opts.easing);return c.tweens.push(i),i},stop:function(e){var n=0,i=e?c.tweens.length:0;if(o)return this;for(o=!0;n<i;n++)c.tweens[n].run(1);return e?(a.notifyWith(t,[c,1,0]),a.resolveWith(t,[c,e])):a.rejectWith(t,[c,e]),this}}),u=c.props;for(function(t,e){var n,i,o,r,s;for(n in t)if(i=v.camelCase(n),o=e[i],r=t[n],Array.isArray(r)&&(o=r[1],r=t[n]=r[0]),n!==i&&(t[i]=r,delete t[n]),s=v.cssHooks[i],s&&"expand"in s){r=s.expand(r),delete t[i];for(n in r)n in t||(t[n]=r[n],e[n]=o)}else e[i]=o}(u,c.opts.specialEasing);r<s;r++)if(i=se.prefilters[r].call(c,t,u,c.opts))return v.isFunction(i.stop)&&(v._queueHooks(c.elem,c.opts.queue).stop=v.proxy(i.stop,i)),i;return v.map(u,re,c),v.isFunction(c.opts.start)&&c.opts.start.call(t,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),v.fx.timer(v.extend(l,{elem:t,anim:c,queue:c.opts.queue})),c}v.Animation=v.extend(se,{tweeners:{"*":[function(t,e){var n=this.createTween(t,e);return nt(n.elem,t,J.exec(e),n),n}]},tweener:function(t,e){v.isFunction(t)?(e=t,t=["*"]):t=t.match(j);for(var n,i=0,o=t.length;i<o;i++)n=t[i],se.tweeners[n]=se.tweeners[n]||[],se.tweeners[n].unshift(e)},prefilters:[function(t,e,n){var i,o,r,s,a,l,c,u,h="width"in e||"height"in e,f=this,p={},d=t.style,g=t.nodeType&&tt(t),m=U.get(t,"fxshow");n.queue||(null==(s=v._queueHooks(t,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,f.always(function(){f.always(function(){s.unqueued--,v.queue(t,"fx").length||s.empty.fire()})}));for(i in e)if(o=e[i],te.test(o)){if(delete e[i],r=r||"toggle"===o,o===(g?"hide":"show")){if("show"!==o||!m||void 0===m[i])continue;g=!0}p[i]=m&&m[i]||v.style(t,i)}if((l=!v.isEmptyObject(e))||!v.isEmptyObject(p)){h&&1===t.nodeType&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],null==(c=m&&m.display)&&(c=U.get(t,"display")),"none"===(u=v.css(t,"display"))&&(c?u=c:(ot([t],!0),c=t.style.display||c,u=v.css(t,"display"),ot([t]))),("inline"===u||"inline-block"===u&&null!=c)&&"none"===v.css(t,"float")&&(l||(f.done(function(){d.display=c}),null==c&&(u=d.display,c="none"===u?"":u)),d.display="inline-block")),n.overflow&&(d.overflow="hidden",f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]})),l=!1;for(i in p)l||(m?"hidden"in m&&(g=m.hidden):m=U.access(t,"fxshow",{display:c}),r&&(m.hidden=!g),g&&ot([t],!0),f.done(function(){g||ot([t]),U.remove(t,"fxshow");for(i in p)v.style(t,i,p[i])})),l=re(g?m[i]:0,i,f),i in m||(m[i]=l.start,g&&(l.end=l.start,l.start=0))}}],prefilter:function(t,e){e?se.prefilters.unshift(t):se.prefilters.push(t)}}),v.speed=function(t,e,n){var i=t&&"object"==typeof t?v.extend({},t):{complete:n||!n&&e||v.isFunction(t)&&t,duration:t,easing:n&&e||e&&!v.isFunction(e)&&e};return v.fx.off?i.duration=0:"number"!=typeof i.duration&&(i.duration in v.fx.speeds?i.duration=v.fx.speeds[i.duration]:i.duration=v.fx.speeds._default),null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){v.isFunction(i.old)&&i.old.call(this),i.queue&&v.dequeue(this,i.queue)},i},v.fn.extend({fadeTo:function(t,e,n,i){return this.filter(tt).css("opacity",0).show().end().animate({opacity:e},t,n,i)},animate:function(t,e,n,i){var o=v.isEmptyObject(t),r=v.speed(e,n,i),s=function(){var e=se(this,v.extend({},t),r);(o||U.get(this,"finish"))&&e.stop(!0)};return s.finish=s,o||!1===r.queue?this.each(s):this.queue(r.queue,s)},stop:function(t,e,n){var i=function(t){var e=t.stop;delete t.stop,e(n)};return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&!1!==t&&this.queue(t||"fx",[]),this.each(function(){var e=!0,o=null!=t&&t+"queueHooks",r=v.timers,s=U.get(this);if(o)s[o]&&s[o].stop&&i(s[o]);else for(o in s)s[o]&&s[o].stop&&ee.test(o)&&i(s[o]);for(o=r.length;o--;)r[o].elem!==this||null!=t&&r[o].queue!==t||(r[o].anim.stop(n),e=!1,r.splice(o,1));!e&&n||v.dequeue(this,t)})},finish:function(t){return!1!==t&&(t=t||"fx"),this.each(function(){var e,n=U.get(this),i=n[t+"queue"],o=n[t+"queueHooks"],r=v.timers,s=i?i.length:0;for(n.finish=!0,v.queue(this,t,[]),o&&o.stop&&o.stop.call(this,!0),e=r.length;e--;)r[e].elem===this&&r[e].queue===t&&(r[e].anim.stop(!0),r.splice(e,1));for(e=0;e<s;e++)i[e]&&i[e].finish&&i[e].finish.call(this);delete n.finish})}}),v.each(["toggle","show","hide"],function(t,e){var n=v.fn[e];v.fn[e]=function(t,i,o){return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate(oe(e,!0),t,i,o)}}),v.each({slideDown:oe("show"),slideUp:oe("hide"),slideToggle:oe("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){v.fn[t]=function(t,n,i){return this.animate(e,t,n,i)}}),v.timers=[],v.fx.tick=function(){var t,e=0,n=v.timers;for(Kt=v.now();e<n.length;e++)t=n[e],t()||n[e]!==t||n.splice(e--,1);n.length||v.fx.stop(),Kt=void 0},v.fx.timer=function(t){v.timers.push(t),v.fx.start()},v.fx.interval=13,v.fx.start=function(){Qt||(Qt=!0,ne())},v.fx.stop=function(){Qt=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fn.delay=function(e,n){return e=v.fx&&v.fx.speeds[e]||e,n=n||"fx",this.queue(n,function(n,i){var o=t.setTimeout(n,e);i.stop=function(){t.clearTimeout(o)}})},Jt=i.createElement("input"),Zt=i.createElement("select").appendChild(i.createElement("option")),Jt.type="checkbox",d.checkOn=""!==Jt.value,d.optSelected=Zt.selected,(Jt=i.createElement("input")).value="t",Jt.type="radio",d.radioValue="t"===Jt.value;var ae,le=v.expr.attrHandle;v.fn.extend({attr:function(t,e){return z(this,v.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){v.removeAttr(this,t)})}}),v.extend({attr:function(t,e,n){var i,o,r=t.nodeType;if(3!==r&&8!==r&&2!==r)return void 0===t.getAttribute?v.prop(t,e,n):(1===r&&v.isXMLDoc(t)||(o=v.attrHooks[e.toLowerCase()]||(v.expr.match.bool.test(e)?ae:void 0)),void 0!==n?null===n?void v.removeAttr(t,e):o&&"set"in o&&void 0!==(i=o.set(t,n,e))?i:(t.setAttribute(e,n+""),n):o&&"get"in o&&null!==(i=o.get(t,e))?i:(i=v.find.attr(t,e),null==i?void 0:i))},attrHooks:{type:{set:function(t,e){if(!d.radioValue&&"radio"===e&&L(t,"input")){var n=t.value;return t.setAttribute("type",e),n&&(t.value=n),e}}}},removeAttr:function(t,e){var n,i=0,o=e&&e.match(j);if(o&&1===t.nodeType)for(;n=o[i++];)t.removeAttribute(n)}}),ae={set:function(t,e,n){return!1===e?v.removeAttr(t,n):t.setAttribute(n,n),n}},v.each(v.expr.match.bool.source.match(/\w+/g),function(t,e){var n=le[e]||v.find.attr;le[e]=function(t,e,i){var o,r,s=e.toLowerCase();return i||(r=le[s],le[s]=o,o=null!=n(t,e,i)?s:null,le[s]=r),o}});var ce=/^(?:input|select|textarea|button)$/i,ue=/^(?:a|area)$/i;function he(t){return(t.match(j)||[]).join(" ")}function fe(t){return t.getAttribute&&t.getAttribute("class")||""}v.fn.extend({prop:function(t,e){return z(this,v.prop,t,e,arguments.length>1)},removeProp:function(t){return this.each(function(){delete this[v.propFix[t]||t]})}}),v.extend({prop:function(t,e,n){var i,o,r=t.nodeType;if(3!==r&&8!==r&&2!==r)return 1===r&&v.isXMLDoc(t)||(e=v.propFix[e]||e,o=v.propHooks[e]),void 0!==n?o&&"set"in o&&void 0!==(i=o.set(t,n,e))?i:t[e]=n:o&&"get"in o&&null!==(i=o.get(t,e))?i:t[e]},propHooks:{tabIndex:{get:function(t){var e=v.find.attr(t,"tabindex");return e?parseInt(e,10):ce.test(t.nodeName)||ue.test(t.nodeName)&&t.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),d.optSelected||(v.propHooks.selected={get:function(t){var e=t.parentNode;return e&&e.parentNode&&e.parentNode.selectedIndex,null},set:function(t){var e=t.parentNode;e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex)}}),v.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){v.propFix[this.toLowerCase()]=this}),v.fn.extend({addClass:function(t){var e,n,i,o,r,s,a,l=0;if(v.isFunction(t))return this.each(function(e){v(this).addClass(t.call(this,e,fe(this)))});if("string"==typeof t&&t)for(e=t.match(j)||[];n=this[l++];)if(o=fe(n),i=1===n.nodeType&&" "+he(o)+" "){for(s=0;r=e[s++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ");o!==(a=he(i))&&n.setAttribute("class",a)}return this},removeClass:function(t){var e,n,i,o,r,s,a,l=0;if(v.isFunction(t))return this.each(function(e){v(this).removeClass(t.call(this,e,fe(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof t&&t)for(e=t.match(j)||[];n=this[l++];)if(o=fe(n),i=1===n.nodeType&&" "+he(o)+" "){for(s=0;r=e[s++];)for(;i.indexOf(" "+r+" ")>-1;)i=i.replace(" "+r+" "," ");o!==(a=he(i))&&n.setAttribute("class",a)}return this},toggleClass:function(t,e){var n=typeof t;return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):v.isFunction(t)?this.each(function(n){v(this).toggleClass(t.call(this,n,fe(this),e),e)}):this.each(function(){var e,i,o,r;if("string"===n)for(i=0,o=v(this),r=t.match(j)||[];e=r[i++];)o.hasClass(e)?o.removeClass(e):o.addClass(e);else void 0!==t&&"boolean"!==n||(e=fe(this),e&&U.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===t?"":U.get(this,"__className__")||""))})},hasClass:function(t){var e,n,i=0;for(e=" "+t+" ";n=this[i++];)if(1===n.nodeType&&(" "+he(fe(n))+" ").indexOf(e)>-1)return!0;return!1}});var pe=/\r/g;v.fn.extend({val:function(t){var e,n,i,o=this[0];return arguments.length?(i=v.isFunction(t),this.each(function(n){var o;1===this.nodeType&&(null==(o=i?t.call(this,n,v(this).val()):t)?o="":"number"==typeof o?o+="":Array.isArray(o)&&(o=v.map(o,function(t){return null==t?"":t+""})),(e=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()])&&"set"in e&&void 0!==e.set(this,o,"value")||(this.value=o))})):o?(e=v.valHooks[o.type]||v.valHooks[o.nodeName.toLowerCase()])&&"get"in e&&void 0!==(n=e.get(o,"value"))?n:"string"==typeof(n=o.value)?n.replace(pe,""):null==n?"":n:void 0}}),v.extend({valHooks:{option:{get:function(t){var e=v.find.attr(t,"value");return null!=e?e:he(v.text(t))}},select:{get:function(t){var e,n,i,o=t.options,r=t.selectedIndex,s="select-one"===t.type,a=s?null:[],l=s?r+1:o.length;for(i=r<0?l:s?r:0;i<l;i++)if(n=o[i],(n.selected||i===r)&&!n.disabled&&(!n.parentNode.disabled||!L(n.parentNode,"optgroup"))){if(e=v(n).val(),s)return e;a.push(e)}return a},set:function(t,e){for(var n,i,o=t.options,r=v.makeArray(e),s=o.length;s--;)i=o[s],(i.selected=v.inArray(v.valHooks.option.get(i),r)>-1)&&(n=!0);return n||(t.selectedIndex=-1),r}}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]={set:function(t,e){if(Array.isArray(e))return t.checked=v.inArray(v(t).val(),e)>-1}},d.checkOn||(v.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var de=/^(?:focusinfocus|focusoutblur)$/;v.extend(v.event,{trigger:function(e,n,o,r){var s,a,l,c,u,f,p,d=[o||i],g=h.call(e,"type")?e.type:e,m=h.call(e,"namespace")?e.namespace.split("."):[];if(a=l=o=o||i,3!==o.nodeType&&8!==o.nodeType&&!de.test(g+v.event.triggered)&&(g.indexOf(".")>-1&&(g=(m=g.split(".")).shift(),m.sort()),u=g.indexOf(":")<0&&"on"+g,(e=e[v.expando]?e:new v.Event(g,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=m.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=o),n=null==n?[e]:v.makeArray(n,[e]),p=v.event.special[g]||{},r||!p.trigger||!1!==p.trigger.apply(o,n))){if(!r&&!p.noBubble&&!v.isWindow(o)){for(c=p.delegateType||g,de.test(c+g)||(a=a.parentNode);a;a=a.parentNode)d.push(a),l=a;l===(o.ownerDocument||i)&&d.push(l.defaultView||l.parentWindow||t)}for(s=0;(a=d[s++])&&!e.isPropagationStopped();)e.type=s>1?c:p.bindType||g,f=(U.get(a,"events")||{})[e.type]&&U.get(a,"handle"),f&&f.apply(a,n),f=u&&a[u],f&&f.apply&&X(a)&&(e.result=f.apply(a,n),!1===e.result&&e.preventDefault());return e.type=g,r||e.isDefaultPrevented()||p._default&&!1!==p._default.apply(d.pop(),n)||!X(o)||u&&v.isFunction(o[g])&&!v.isWindow(o)&&((l=o[u])&&(o[u]=null),v.event.triggered=g,o[g](),v.event.triggered=void 0,l&&(o[u]=l)),e.result}},simulate:function(t,e,n){var i=v.extend(new v.Event,n,{type:t,isSimulated:!0});v.event.trigger(i,null,e)}}),v.fn.extend({trigger:function(t,e){return this.each(function(){v.event.trigger(t,e,this)})},triggerHandler:function(t,e){var n=this[0];if(n)return v.event.trigger(t,e,n,!0)}}),v.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(t,e){v.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e)}}),v.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)}}),d.focusin="onfocusin"in t,d.focusin||v.each({focus:"focusin",blur:"focusout"},function(t,e){var n=function(t){v.event.simulate(e,t.target,v.event.fix(t))};v.event.special[e]={setup:function(){var i=this.ownerDocument||this,o=U.access(i,e);o||i.addEventListener(t,n,!0),U.access(i,e,(o||0)+1)},teardown:function(){var i=this.ownerDocument||this,o=U.access(i,e)-1;o?U.access(i,e,o):(i.removeEventListener(t,n,!0),U.remove(i,e))}}});var ge=t.location,me=v.now(),ve=/\?/;v.parseXML=function(e){var n;if(!e||"string"!=typeof e)return null;try{n=(new t.DOMParser).parseFromString(e,"text/xml")}catch(t){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||v.error("Invalid XML: "+e),n};var be=/\[\]$/,ye=/\r?\n/g,we=/^(?:submit|button|image|reset|file)$/i,xe=/^(?:input|select|textarea|keygen)/i;function Ee(t,e,n,i){var o;if(Array.isArray(e))v.each(e,function(e,o){n||be.test(t)?i(t,o):Ee(t+"["+("object"==typeof o&&null!=o?e:"")+"]",o,n,i)});else if(n||"object"!==v.type(e))i(t,e);else for(o in e)Ee(t+"["+o+"]",e[o],n,i)}v.param=function(t,e){var n,i=[],o=function(t,e){var n=v.isFunction(e)?e():e;i[i.length]=encodeURIComponent(t)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(t)||t.jquery&&!v.isPlainObject(t))v.each(t,function(){o(this.name,this.value)});else for(n in t)Ee(n,t[n],e,o);return i.join("&")},v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=v.prop(this,"elements");return t?v.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!v(this).is(":disabled")&&xe.test(this.nodeName)&&!we.test(t)&&(this.checked||!rt.test(t))}).map(function(t,e){var n=v(this).val();return null==n?null:Array.isArray(n)?v.map(n,function(t){return{name:e.name,value:t.replace(ye,"\r\n")}}):{name:e.name,value:n.replace(ye,"\r\n")}}).get()}});var Te=/%20/g,Se=/#.*$/,Ce=/([?&])_=[^&]*/,Ae=/^(.*?):[ \t]*([^\r\n]*)$/gm,Le=/^(?:GET|HEAD)$/,ke=/^\/\//,Oe={},Ie={},Ne="*/".concat("*"),_e=i.createElement("a");function Re(t){return function(e,n){"string"!=typeof e&&(n=e,e="*");var i,o=0,r=e.toLowerCase().match(j)||[];if(v.isFunction(n))for(;i=r[o++];)"+"===i[0]?(i=i.slice(1)||"*",(t[i]=t[i]||[]).unshift(n)):(t[i]=t[i]||[]).push(n)}}function Me(t,e,n,i){var o={},r=t===Ie;function s(a){var l;return o[a]=!0,v.each(t[a]||[],function(t,a){var c=a(e,n,i);return"string"!=typeof c||r||o[c]?r?!(l=c):void 0:(e.dataTypes.unshift(c),s(c),!1)}),l}return s(e.dataTypes[0])||!o["*"]&&s("*")}function De(t,e){var n,i,o=v.ajaxSettings.flatOptions||{};for(n in e)void 0!==e[n]&&((o[n]?t:i||(i={}))[n]=e[n]);return i&&v.extend(!0,t,i),t}_e.href=ge.href,v.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ge.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ge.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Ne,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":v.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?De(De(t,v.ajaxSettings),e):De(v.ajaxSettings,t)},ajaxPrefilter:Re(Oe),ajaxTransport:Re(Ie),ajax:function(e,n){"object"==typeof e&&(n=e,e=void 0),n=n||{};var o,r,s,a,l,c,u,h,f,p,d=v.ajaxSetup({},n),g=d.context||d,m=d.context&&(g.nodeType||g.jquery)?v(g):v.event,b=v.Deferred(),y=v.Callbacks("once memory"),w=d.statusCode||{},x={},E={},T="canceled",S={readyState:0,getResponseHeader:function(t){var e;if(u){if(!a)for(a={};e=Ae.exec(s);)a[e[1].toLowerCase()]=e[2];e=a[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return u?s:null},setRequestHeader:function(t,e){return null==u&&(t=E[t.toLowerCase()]=E[t.toLowerCase()]||t,x[t]=e),this},overrideMimeType:function(t){return null==u&&(d.mimeType=t),this},statusCode:function(t){var e;if(t)if(u)S.always(t[S.status]);else for(e in t)w[e]=[w[e],t[e]];return this},abort:function(t){var e=t||T;return o&&o.abort(e),C(0,e),this}};if(b.promise(S),d.url=((e||d.url||ge.href)+"").replace(ke,ge.protocol+"//"),d.type=n.method||n.type||d.method||d.type,d.dataTypes=(d.dataType||"*").toLowerCase().match(j)||[""],null==d.crossDomain){c=i.createElement("a");try{c.href=d.url,c.href=c.href,d.crossDomain=_e.protocol+"//"+_e.host!=c.protocol+"//"+c.host}catch(t){d.crossDomain=!0}}if(d.data&&d.processData&&"string"!=typeof d.data&&(d.data=v.param(d.data,d.traditional)),Me(Oe,d,n,S),u)return S;(h=v.event&&d.global)&&0==v.active++&&v.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!Le.test(d.type),r=d.url.replace(Se,""),d.hasContent?d.data&&d.processData&&0===(d.contentType||"").indexOf("application/x-www-form-urlencoded")&&(d.data=d.data.replace(Te,"+")):(p=d.url.slice(r.length),d.data&&(r+=(ve.test(r)?"&":"?")+d.data,delete d.data),!1===d.cache&&(r=r.replace(Ce,"$1"),p=(ve.test(r)?"&":"?")+"_="+me+++p),d.url=r+p),d.ifModified&&(v.lastModified[r]&&S.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&S.setRequestHeader("If-None-Match",v.etag[r])),(d.data&&d.hasContent&&!1!==d.contentType||n.contentType)&&S.setRequestHeader("Content-Type",d.contentType),S.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+Ne+"; q=0.01":""):d.accepts["*"]);for(f in d.headers)S.setRequestHeader(f,d.headers[f]);if(d.beforeSend&&(!1===d.beforeSend.call(g,S,d)||u))return S.abort();if(T="abort",y.add(d.complete),S.done(d.success),S.fail(d.error),o=Me(Ie,d,n,S)){if(S.readyState=1,h&&m.trigger("ajaxSend",[S,d]),u)return S;d.async&&d.timeout>0&&(l=t.setTimeout(function(){S.abort("timeout")},d.timeout));try{u=!1,o.send(x,C)}catch(t){if(u)throw t;C(-1,t)}}else C(-1,"No Transport");function C(e,n,i,a){var c,f,p,x,E,T=n;u||(u=!0,l&&t.clearTimeout(l),o=void 0,s=a||"",S.readyState=e>0?4:0,c=e>=200&&e<300||304===e,i&&(x=function(t,e,n){for(var i,o,r,s,a=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=t.mimeType||e.getResponseHeader("Content-Type"));if(i)for(o in a)if(a[o]&&a[o].test(i)){l.unshift(o);break}if(l[0]in n)r=l[0];else{for(o in n){if(!l[0]||t.converters[o+" "+l[0]]){r=o;break}s||(s=o)}r=r||s}if(r)return r!==l[0]&&l.unshift(r),n[r]}(d,S,i)),x=function(t,e,n,i){var o,r,s,a,l,c={},u=t.dataTypes.slice();if(u[1])for(s in t.converters)c[s.toLowerCase()]=t.converters[s];for(r=u.shift();r;)if(t.responseFields[r]&&(n[t.responseFields[r]]=e),!l&&i&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=r,r=u.shift())if("*"===r)r=l;else if("*"!==l&&l!==r){if(!(s=c[l+" "+r]||c["* "+r]))for(o in c)if(a=o.split(" "),a[1]===r&&(s=c[l+" "+a[0]]||c["* "+a[0]])){!0===s?s=c[o]:!0!==c[o]&&(r=a[0],u.unshift(a[1]));break}if(!0!==s)if(s&&t.throws)e=s(e);else try{e=s(e)}catch(t){return{state:"parsererror",error:s?t:"No conversion from "+l+" to "+r}}}return{state:"success",data:e}}(d,x,S,c),c?(d.ifModified&&((E=S.getResponseHeader("Last-Modified"))&&(v.lastModified[r]=E),(E=S.getResponseHeader("etag"))&&(v.etag[r]=E)),204===e||"HEAD"===d.type?T="nocontent":304===e?T="notmodified":(T=x.state,f=x.data,c=!(p=x.error))):(p=T,!e&&T||(T="error",e<0&&(e=0))),S.status=e,S.statusText=(n||T)+"",c?b.resolveWith(g,[f,T,S]):b.rejectWith(g,[S,T,p]),S.statusCode(w),w=void 0,h&&m.trigger(c?"ajaxSuccess":"ajaxError",[S,d,c?f:p]),y.fireWith(g,[S,T]),h&&(m.trigger("ajaxComplete",[S,d]),--v.active||v.event.trigger("ajaxStop")))}return S},getJSON:function(t,e,n){return v.get(t,e,n,"json")},getScript:function(t,e){return v.get(t,void 0,e,"script")}}),v.each(["get","post"],function(t,e){v[e]=function(t,n,i,o){return v.isFunction(n)&&(o=o||i,i=n,n=void 0),v.ajax(v.extend({url:t,type:e,dataType:o,data:n,success:i},v.isPlainObject(t)&&t))}}),v._evalUrl=function(t){return v.ajax({url:t,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},v.fn.extend({wrapAll:function(t){var e;return this[0]&&(v.isFunction(t)&&(t=t.call(this[0])),e=v(t,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstElementChild;)t=t.firstElementChild;return t}).append(this)),this},wrapInner:function(t){return v.isFunction(t)?this.each(function(e){v(this).wrapInner(t.call(this,e))}):this.each(function(){var e=v(this),n=e.contents();n.length?n.wrapAll(t):e.append(t)})},wrap:function(t){var e=v.isFunction(t);return this.each(function(n){v(this).wrapAll(e?t.call(this,n):t)})},unwrap:function(t){return this.parent(t).not("body").each(function(){v(this).replaceWith(this.childNodes)}),this}}),v.expr.pseudos.hidden=function(t){return!v.expr.pseudos.visible(t)},v.expr.pseudos.visible=function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)},v.ajaxSettings.xhr=function(){try{return new t.XMLHttpRequest}catch(t){}};var je={0:200,1223:204},$e=v.ajaxSettings.xhr();d.cors=!!$e&&"withCredentials"in $e,d.ajax=$e=!!$e,v.ajaxTransport(function(e){var n,i;if(d.cors||$e&&!e.crossDomain)return{send:function(o,r){var s,a=e.xhr();if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)a[s]=e.xhrFields[s];e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||o["X-Requested-With"]||(o["X-Requested-With"]="XMLHttpRequest");for(s in o)a.setRequestHeader(s,o[s]);n=function(t){return function(){n&&(n=i=a.onload=a.onerror=a.onabort=a.onreadystatechange=null,"abort"===t?a.abort():"error"===t?"number"!=typeof a.status?r(0,"error"):r(a.status,a.statusText):r(je[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=n(),i=a.onerror=n("error"),void 0!==a.onabort?a.onabort=i:a.onreadystatechange=function(){4===a.readyState&&t.setTimeout(function(){n&&i()})},n=n("abort");try{a.send(e.hasContent&&e.data||null)}catch(t){if(n)throw t}},abort:function(){n&&n()}}}),v.ajaxPrefilter(function(t){t.crossDomain&&(t.contents.script=!1)}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(t){return v.globalEval(t),t}}}),v.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET")}),v.ajaxTransport("script",function(t){var e,n;if(t.crossDomain)return{send:function(o,r){e=v("<script>").prop({charset:t.scriptCharset,src:t.url}).on("load error",n=function(t){e.remove(),n=null,t&&r("error"===t.type?404:200,t.type)}),i.head.appendChild(e[0])},abort:function(){n&&n()}}});var Pe,We=[],Fe=/(=)\?(?=&|$)|\?\?/;v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=We.pop()||v.expando+"_"+me++;return this[t]=!0,t}}),v.ajaxPrefilter("json jsonp",function(e,n,i){var o,r,s,a=!1!==e.jsonp&&(Fe.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Fe.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return o=e.jsonpCallback=v.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Fe,"$1"+o):!1!==e.jsonp&&(e.url+=(ve.test(e.url)?"&":"?")+e.jsonp+"="+o),e.converters["script json"]=function(){return s||v.error(o+" was not called"),s[0]},e.dataTypes[0]="json",r=t[o],t[o]=function(){s=arguments},i.always(function(){void 0===r?v(t).removeProp(o):t[o]=r,e[o]&&(e.jsonpCallback=n.jsonpCallback,We.push(o)),s&&v.isFunction(r)&&r(s[0]),s=r=void 0}),"script"}),d.createHTMLDocument=((Pe=i.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Pe.childNodes.length),v.parseHTML=function(t,e,n){return"string"!=typeof t?[]:("boolean"==typeof e&&(n=e,e=!1),e||(d.createHTMLDocument?((o=(e=i.implementation.createHTMLDocument("")).createElement("base")).href=i.location.href,e.head.appendChild(o)):e=i),r=k.exec(t),s=!n&&[],r?[e.createElement(r[1])]:(r=dt([t],e,s),s&&s.length&&v(s).remove(),v.merge([],r.childNodes)));var o,r,s},v.fn.load=function(t,e,n){var i,o,r,s=this,a=t.indexOf(" ");return a>-1&&(i=he(t.slice(a)),t=t.slice(0,a)),v.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(o="POST"),s.length>0&&v.ajax({url:t,type:o||"GET",dataType:"html",data:e}).done(function(t){r=arguments,s.html(i?v("<div>").append(v.parseHTML(t)).find(i):t)}).always(n&&function(t,e){s.each(function(){n.apply(this,r||[t.responseText,e,t])})}),this},v.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){v.fn[e]=function(t){return this.on(e,t)}}),v.expr.pseudos.animated=function(t){return v.grep(v.timers,function(e){return t===e.elem}).length},v.offset={setOffset:function(t,e,n){var i,o,r,s,a,l,c=v.css(t,"position"),u=v(t),h={};"static"===c&&(t.style.position="relative"),a=u.offset(),r=v.css(t,"top"),l=v.css(t,"left"),("absolute"===c||"fixed"===c)&&(r+l).indexOf("auto")>-1?(s=(i=u.position()).top,o=i.left):(s=parseFloat(r)||0,o=parseFloat(l)||0),v.isFunction(e)&&(e=e.call(t,n,v.extend({},a))),null!=e.top&&(h.top=e.top-a.top+s),null!=e.left&&(h.left=e.left-a.left+o),"using"in e?e.using.call(t,h):u.css(h)}},v.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){v.offset.setOffset(this,t,e)});var e,n,i,o,r=this[0];return r?r.getClientRects().length?(i=r.getBoundingClientRect(),n=(e=r.ownerDocument).documentElement,o=e.defaultView,{top:i.top+o.pageYOffset-n.clientTop,left:i.left+o.pageXOffset-n.clientLeft}):{top:0,left:0}:void 0},position:function(){if(this[0]){var t,e,n=this[0],i={top:0,left:0};return"fixed"===v.css(n,"position")?e=n.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),L(t[0],"html")||(i=t.offset()),i={top:i.top+v.css(t[0],"borderTopWidth",!0),left:i.left+v.css(t[0],"borderLeftWidth",!0)}),{top:e.top-i.top-v.css(n,"marginTop",!0),left:e.left-i.left-v.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent;t&&"static"===v.css(t,"position");)t=t.offsetParent;return t||gt})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var n="pageYOffset"===e;v.fn[t]=function(i){return z(this,function(t,i,o){var r;return v.isWindow(t)?r=t:9===t.nodeType&&(r=t.defaultView),void 0===o?r?r[e]:t[i]:void(r?r.scrollTo(n?r.pageXOffset:o,n?o:r.pageYOffset):t[i]=o)},t,i,arguments.length)}}),v.each(["top","left"],function(t,e){v.cssHooks[e]=Pt(d.pixelPosition,function(t,n){if(n)return n=$t(t,e),Dt.test(n)?v(t).position()[e]+"px":n})}),v.each({Height:"height",Width:"width"},function(t,e){v.each({padding:"inner"+t,content:e,"":"outer"+t},function(n,i){v.fn[i]=function(o,r){var s=arguments.length&&(n||"boolean"!=typeof o),a=n||(!0===o||!0===r?"margin":"border");return z(this,function(e,n,o){var r;return v.isWindow(e)?0===i.indexOf("outer")?e["inner"+t]:e.document.documentElement["client"+t]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+t],r["scroll"+t],e.body["offset"+t],r["offset"+t],r["client"+t])):void 0===o?v.css(e,n,a):v.style(e,n,o,a)},e,s?o:void 0,s)}})}),v.fn.extend({bind:function(t,e,n){return this.on(t,null,e,n)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,n,i){return this.on(e,t,n,i)},undelegate:function(t,e,n){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)}}),v.holdReady=function(t){t?v.readyWait++:v.ready(!0)},v.isArray=Array.isArray,v.parseJSON=JSON.parse,v.nodeName=L,"function"==typeof define&&define.amd&&define("jquery",[],function(){return v});var He=t.jQuery,Be=t.$;return v.noConflict=function(e){return t.$===v&&(t.$=Be),e&&t.jQuery===v&&(t.jQuery=He),v},e||(t.jQuery=t.$=v),v}),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),function(t){"use strict";t.fn.emulateTransitionEnd=function(e){var n=!1,i=this;t(this).one("bsTransitionEnd",function(){n=!0});return setTimeout(function(){n||t(i).trigger(t.support.transition.end)},e),this},t(function(){t.support.transition=function(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in e)if(void 0!==t.style[n])return{end:e[n]};return!1}(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(t){"use strict";var e='[data-dismiss="alert"]',n=function(n){t(n).on("click",e,this.close)};n.VERSION="3.3.7",n.TRANSITION_DURATION=150,n.prototype.close=function(e){function i(){s.detach().trigger("closed.bs.alert").remove()}var o=t(this),r=o.attr("data-target");r||(r=(r=o.attr("href"))&&r.replace(/.*(?=#[^\s]*$)/,""));var s=t("#"===r?[]:r);e&&e.preventDefault(),s.length||(s=o.closest(".alert")),s.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",i).emulateTransitionEnd(n.TRANSITION_DURATION):i())};var i=t.fn.alert;t.fn.alert=function(e){return this.each(function(){var i=t(this),o=i.data("bs.alert");o||i.data("bs.alert",o=new n(this)),"string"==typeof e&&o[e].call(i)})},t.fn.alert.Constructor=n,t.fn.alert.noConflict=function(){return t.fn.alert=i,this},t(document).on("click.bs.alert.data-api",e,n.prototype.close)}(jQuery),function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.button"),r="object"==typeof e&&e;o||i.data("bs.button",o=new n(this,r)),"toggle"==e?o.toggle():e&&o.setState(e)})}var n=function(e,i){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,i),this.isLoading=!1};n.VERSION="3.3.7",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(e){var n="disabled",i=this.$element,o=i.is("input")?"val":"html",r=i.data();e+="Text",null==r.resetText&&i.data("resetText",i[o]()),setTimeout(t.proxy(function(){i[o](null==r[e]?this.options[e]:r[e]),"loadingText"==e?(this.isLoading=!0,i.addClass(n).attr(n,n).prop(n,!0)):this.isLoading&&(this.isLoading=!1,i.removeClass(n).removeAttr(n).prop(n,!1))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var n=this.$element.find("input");"radio"==n.prop("type")?(n.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==n.prop("type")&&(n.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),n.prop("checked",this.$element.hasClass("active")),t&&n.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var i=t.fn.button;t.fn.button=e,t.fn.button.Constructor=n,t.fn.button.noConflict=function(){return t.fn.button=i,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(n){var i=t(n.target).closest(".btn");e.call(i,"toggle"),t(n.target).is('input[type="radio"], input[type="checkbox"]')||(n.preventDefault(),i.is("input,button")?i.trigger("focus"):i.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.carousel"),r=t.extend({},n.DEFAULTS,i.data(),"object"==typeof e&&e),s="string"==typeof e?e:r.slide;o||i.data("bs.carousel",o=new n(this,r)),"number"==typeof e?o.to(e):s?o[s]():r.interval&&o.pause().cycle()})}var n=function(e,n){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};n.VERSION="3.3.7",n.TRANSITION_DURATION=600,n.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},n.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},n.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},n.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},n.prototype.getItemForDirection=function(t,e){var n=this.getItemIndex(e);if(("prev"==t&&0===n||"next"==t&&n==this.$items.length-1)&&!this.options.wrap)return e;var i=(n+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(i)},n.prototype.to=function(t){var e=this,n=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",this.$items.eq(t))},n.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},n.prototype.next=function(){if(!this.sliding)return this.slide("next")},n.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},n.prototype.slide=function(e,i){var o=this.$element.find(".item.active"),r=i||this.getItemForDirection(e,o),s=this.interval,a="next"==e?"left":"right",l=this;if(r.hasClass("active"))return this.sliding=!1;var c=r[0],u=t.Event("slide.bs.carousel",{relatedTarget:c,direction:a});if(this.$element.trigger(u),!u.isDefaultPrevented()){if(this.sliding=!0,s&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=t(this.$indicators.children()[this.getItemIndex(r)]);h&&h.addClass("active")}var f=t.Event("slid.bs.carousel",{relatedTarget:c,direction:a});return t.support.transition&&this.$element.hasClass("slide")?(r.addClass(e),r[0].offsetWidth,o.addClass(a),r.addClass(a),o.one("bsTransitionEnd",function(){r.removeClass([e,a].join(" ")).addClass("active"),o.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(f)},0)}).emulateTransitionEnd(n.TRANSITION_DURATION)):(o.removeClass("active"),r.addClass("active"),this.sliding=!1,this.$element.trigger(f)),s&&this.cycle(),this}};var i=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=n,t.fn.carousel.noConflict=function(){return t.fn.carousel=i,this};var o=function(n){var i,o=t(this),r=t(o.attr("data-target")||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""));if(r.hasClass("carousel")){var s=t.extend({},r.data(),o.data()),a=o.attr("data-slide-to");a&&(s.interval=!1),e.call(r,s),a&&r.data("bs.carousel").to(a),n.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",o).on("click.bs.carousel.data-api","[data-slide-to]",o),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var n=t(this);e.call(n,n.data())})})}(jQuery),function(t){"use strict";function e(e){var n,i=e.attr("data-target")||(n=e.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"");return t(i)}function n(e){return this.each(function(){var n=t(this),o=n.data("bs.collapse"),r=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);!o&&r.toggle&&/show|hide/.test(e)&&(r.toggle=!1),o||n.data("bs.collapse",o=new i(this,r)),"string"==typeof e&&o[e]()})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};i.VERSION="3.3.7",i.TRANSITION_DURATION=350,i.DEFAULTS={toggle:!0},i.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},i.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,o=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(o&&o.length&&(e=o.data("bs.collapse"),e&&e.transitioning))){var r=t.Event("show.bs.collapse");if(this.$element.trigger(r),!r.isDefaultPrevented()){o&&o.length&&(n.call(o,"hide"),e||o.data("bs.collapse",null));var s=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[s](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var l=t.camelCase(["scroll",s].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(i.TRANSITION_DURATION)[s](this.$element[0][l])}}}},i.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var o=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[n](0).one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(i.TRANSITION_DURATION):o.call(this)}}},i.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},i.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(n,i){var o=t(i);this.addAriaAndCollapsedClass(e(o),o)},this)).end()},i.prototype.addAriaAndCollapsedClass=function(t,e){var n=t.hasClass("in");t.attr("aria-expanded",n),e.toggleClass("collapsed",!n).attr("aria-expanded",n)};var o=t.fn.collapse;t.fn.collapse=n,t.fn.collapse.Constructor=i,t.fn.collapse.noConflict=function(){return t.fn.collapse=o,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(i){var o=t(this);o.attr("data-target")||i.preventDefault();var r=e(o),s=r.data("bs.collapse")?"toggle":o.data();n.call(r,s)})}(jQuery),function(t){"use strict";function e(e){var n=e.attr("data-target");n||(n=(n=e.attr("href"))&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,""));var i=n&&t(n);return i&&i.length?i:e.parent()}function n(n){n&&3===n.which||(t(i).remove(),t(o).each(function(){var i=t(this),o=e(i),r={relatedTarget:this};o.hasClass("open")&&(n&&"click"==n.type&&/input|textarea/i.test(n.target.tagName)&&t.contains(o[0],n.target)||(o.trigger(n=t.Event("hide.bs.dropdown",r)),n.isDefaultPrevented()||(i.attr("aria-expanded","false"),o.removeClass("open").trigger(t.Event("hidden.bs.dropdown",r)))))}))}var i=".dropdown-backdrop",o='[data-toggle="dropdown"]',r=function(e){t(e).on("click.bs.dropdown",this.toggle)};r.VERSION="3.3.7",r.prototype.toggle=function(i){var o=t(this);if(!o.is(".disabled, :disabled")){var r=e(o),s=r.hasClass("open");if(n(),!s){"ontouchstart"in document.documentElement&&!r.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",n);var a={relatedTarget:this};if(r.trigger(i=t.Event("show.bs.dropdown",a)),i.isDefaultPrevented())return;o.trigger("focus").attr("aria-expanded","true"),r.toggleClass("open").trigger(t.Event("shown.bs.dropdown",a))}return!1}},r.prototype.keydown=function(n){if(/(38|40|27|32)/.test(n.which)&&!/input|textarea/i.test(n.target.tagName)){var i=t(this);if(n.preventDefault(),n.stopPropagation(),!i.is(".disabled, :disabled")){var r=e(i),s=r.hasClass("open");if(!s&&27!=n.which||s&&27==n.which)return 27==n.which&&r.find(o).trigger("focus"),i.trigger("click");var a=r.find(".dropdown-menu li:not(.disabled):visible a");if(a.length){var l=a.index(n.target);38==n.which&&l>0&&l--,40==n.which&&l<a.length-1&&l++,~l||(l=0),a.eq(l).trigger("focus")}}}};var s=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var n=t(this),i=n.data("bs.dropdown");i||n.data("bs.dropdown",i=new r(this)),"string"==typeof e&&i[e].call(n)})},t.fn.dropdown.Constructor=r,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=s,this},t(document).on("click.bs.dropdown.data-api",n).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",o,r.prototype.toggle).on("keydown.bs.dropdown.data-api",o,r.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",r.prototype.keydown)}(jQuery),function(t){"use strict";function e(e,i){return this.each(function(){var o=t(this),r=o.data("bs.modal"),s=t.extend({},n.DEFAULTS,o.data(),"object"==typeof e&&e);r||o.data("bs.modal",r=new n(this,s)),"string"==typeof e?r[e](i):s.show&&r.show(i)})}var n=function(e,n){this.options=n,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};n.VERSION="3.3.7",n.TRANSITION_DURATION=300,n.BACKDROP_TRANSITION_DURATION=150,n.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},n.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},n.prototype.show=function(e){var i=this,o=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(o),this.isShown||o.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){i.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(i.$element)&&(i.ignoreBackdropClick=!0)})}),this.backdrop(function(){var o=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),i.adjustDialog(),o&&i.$element[0].offsetWidth,i.$element.addClass("in"),i.enforceFocus();var r=t.Event("shown.bs.modal",{relatedTarget:e});o?i.$dialog.one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(r)}).emulateTransitionEnd(n.TRANSITION_DURATION):i.$element.trigger("focus").trigger(r)}))},n.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(n.TRANSITION_DURATION):this.hideModal())},n.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},n.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},n.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},n.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},n.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},n.prototype.backdrop=function(e){var i=this,o=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var r=t.support.transition&&o;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+o).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),r&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;r?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var s=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",s).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):s()}else e&&e()},n.prototype.handleUpdate=function(){this.adjustDialog()},n.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},n.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},n.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},n.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},n.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},n.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var i=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=n,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(n){var i=t(this),o=i.attr("href"),r=t(i.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,"")),s=r.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(o)&&o},r.data(),i.data());i.is("a")&&n.preventDefault(),r.one("show.bs.modal",function(t){t.isDefaultPrevented()||r.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),e.call(r,s,this)})}(jQuery),function(t){"use strict";var e=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};e.VERSION="3.3.7",e.TRANSITION_DURATION=150,e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},e.prototype.init=function(e,n,i){if(this.enabled=!0,this.type=e,this.$element=t(n),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&t(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),r=o.length;r--;){var s=o[r];if("click"==s)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",l="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(e){return(e=t.extend({},this.getDefaults(),this.$element.data(),e)).delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},e.prototype.getDelegateOptions=function(){var e={},n=this.getDefaults();return this._options&&t.each(this._options,function(t,i){n[t]!=i&&(e[t]=i)}),e},e.prototype.enter=function(e){var n=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n)),e instanceof t.Event&&(n.inState["focusin"==e.type?"focus":"hover"]=!0),n.tip().hasClass("in")||"in"==n.hoverState?void(n.hoverState="in"):(clearTimeout(n.timeout),n.hoverState="in",n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function(){"in"==n.hoverState&&n.show()},n.options.delay.show)):n.show())},e.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},e.prototype.leave=function(e){var n=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n)),e instanceof t.Event&&(n.inState["focusout"==e.type?"focus":"hover"]=!1),!n.isInStateTrue())return clearTimeout(n.timeout),n.hoverState="out",n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function(){"out"==n.hoverState&&n.hide()},n.options.delay.hide)):n.hide()},e.prototype.show=function(){var n=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(n);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(n.isDefaultPrevented()||!i)return;var o=this,r=this.tip(),s=this.getUID(this.type);this.setContent(),r.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&r.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,r[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,c=l.test(a);c&&(a=a.replace(l,"")||"top"),r.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?r.appendTo(this.options.container):r.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var u=this.getPosition(),h=r[0].offsetWidth,f=r[0].offsetHeight;if(c){var p=a,d=this.getPosition(this.$viewport);a="bottom"==a&&u.bottom+f>d.bottom?"top":"top"==a&&u.top-f<d.top?"bottom":"right"==a&&u.right+h>d.width?"left":"left"==a&&u.left-h<d.left?"right":a,r.removeClass(p).addClass(a)}var g=this.getCalculatedOffset(a,u,h,f);this.applyPlacement(g,a);var m=function(){var t=o.hoverState;o.$element.trigger("shown.bs."+o.type),o.hoverState=null,"out"==t&&o.leave(o)};t.support.transition&&this.$tip.hasClass("fade")?r.one("bsTransitionEnd",m).emulateTransitionEnd(e.TRANSITION_DURATION):m()}},e.prototype.applyPlacement=function(e,n){var i=this.tip(),o=i[0].offsetWidth,r=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),e.top+=s,e.left+=a,t.offset.setOffset(i[0],t.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),i.addClass("in");var l=i[0].offsetWidth,c=i[0].offsetHeight;"top"==n&&c!=r&&(e.top=e.top+r-c);var u=this.getViewportAdjustedDelta(n,e,l,c);u.left?e.left+=u.left:e.top+=u.top;var h=/top|bottom/.test(n),f=h?2*u.left-o+l:2*u.top-r+c,p=h?"offsetWidth":"offsetHeight";i.offset(e),this.replaceArrow(f,i[0][p],h)},e.prototype.replaceArrow=function(t,e,n){this.arrow().css(n?"left":"top",50*(1-t/e)+"%").css(n?"top":"left","")},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},e.prototype.hide=function(n){function i(){"in"!=o.hoverState&&r.detach(),o.$element&&o.$element.removeAttr("aria-describedby").trigger("hidden.bs."+o.type),n&&n()}var o=this,r=t(this.$tip),s=t.Event("hide.bs."+this.type);if(this.$element.trigger(s),!s.isDefaultPrevented())return r.removeClass("in"),t.support.transition&&r.hasClass("fade")?r.one("bsTransitionEnd",i).emulateTransitionEnd(e.TRANSITION_DURATION):i(),this.hoverState=null,this},e.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(e){var n=(e=e||this.$element)[0],i="BODY"==n.tagName,o=n.getBoundingClientRect();null==o.width&&(o=t.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var r=window.SVGElement&&n instanceof window.SVGElement,s=i?{top:0,left:0}:r?null:e.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},l=i?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},o,a,l,s)},e.prototype.getCalculatedOffset=function(t,e,n,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-n/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-n/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-n}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},e.prototype.getViewportAdjustedDelta=function(t,e,n,i){var o={top:0,left:0};if(!this.$viewport)return o;var r=this.options.viewport&&this.options.viewport.padding||0,s=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-r-s.scroll,l=e.top+r-s.scroll+i;a<s.top?o.top=s.top-a:l>s.top+s.height&&(o.top=s.top+s.height-l)}else{var c=e.left-r,u=e.left+r+n;c<s.left?o.left=s.left-c:u>s.right&&(o.left=s.left+s.width-u)}return o},e.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},e.prototype.getUID=function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},e.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(e){var n=this;e&&((n=t(e.currentTarget).data("bs."+this.type))||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n))),e?(n.inState.click=!n.inState.click,n.isInStateTrue()?n.enter(n):n.leave(n)):n.tip().hasClass("in")?n.leave(n):n.enter(n)},e.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var n=t.fn.tooltip;t.fn.tooltip=function(n){return this.each(function(){var i=t(this),o=i.data("bs.tooltip"),r="object"==typeof n&&n;!o&&/destroy|hide/.test(n)||(o||i.data("bs.tooltip",o=new e(this,r)),"string"==typeof n&&o[n]())})},t.fn.tooltip.Constructor=e,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=n,this}}(jQuery),function(t){"use strict";var e=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");e.VERSION="3.3.7",e.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),e.prototype.constructor=e,e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),n=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof n?"html":"append":"text"](n),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},e.prototype.hasContent=function(){return this.getTitle()||this.getContent()},e.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var n=t.fn.popover;t.fn.popover=function(n){return this.each(function(){var i=t(this),o=i.data("bs.popover"),r="object"==typeof n&&n;!o&&/destroy|hide/.test(n)||(o||i.data("bs.popover",o=new e(this,r)),"string"==typeof n&&o[n]())})},t.fn.popover.Constructor=e,t.fn.popover.noConflict=function(){return t.fn.popover=n,this}}(jQuery),function(t){"use strict";function e(n,i){this.$body=t(document.body),this.$scrollElement=t(t(n).is(document.body)?window:n),this.options=t.extend({},e.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function n(n){return this.each(function(){var i=t(this),o=i.data("bs.scrollspy"),r="object"==typeof n&&n;o||i.data("bs.scrollspy",o=new e(this,r)),"string"==typeof n&&o[n]()})}e.VERSION="3.3.7",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,n="offset",i=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(n="position",i=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),o=e.data("target")||e.attr("href"),r=/^#./.test(o)&&t(o);return r&&r.length&&r.is(":visible")&&[[r[n]().top+i,o]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,n=this.getScrollHeight(),i=this.options.offset+n-this.$scrollElement.height(),o=this.offsets,r=this.targets,s=this.activeTarget;if(this.scrollHeight!=n&&this.refresh(),e>=i)return s!=(t=r[r.length-1])&&this.activate(t);if(s&&e<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)s!=r[t]&&e>=o[t]&&(void 0===o[t+1]||e<o[t+1])&&this.activate(r[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var n=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',i=t(n).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var i=t.fn.scrollspy;t.fn.scrollspy=n,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);n.call(e,e.data())})})}(jQuery),function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.tab");o||i.data("bs.tab",o=new n(this)),"string"==typeof e&&o[e]()})}var n=function(e){this.element=t(e)};n.VERSION="3.3.7",n.TRANSITION_DURATION=150,n.prototype.show=function(){var e=this.element,n=e.closest("ul:not(.dropdown-menu)"),i=e.data("target");if(i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var o=n.find(".active:last a"),r=t.Event("hide.bs.tab",{relatedTarget:e[0]}),s=t.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(r),e.trigger(s),!s.isDefaultPrevented()&&!r.isDefaultPrevented()){var a=t(i);this.activate(e.closest("li"),n),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},n.prototype.activate=function(e,i,o){function r(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),o&&o()}var s=i.find("> .active"),a=o&&t.support.transition&&(s.length&&s.hasClass("fade")||!!i.find("> .fade").length);s.length&&a?s.one("bsTransitionEnd",r).emulateTransitionEnd(n.TRANSITION_DURATION):r(),s.removeClass("in")};var i=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=n,t.fn.tab.noConflict=function(){return t.fn.tab=i,this};var o=function(n){n.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',o).on("click.bs.tab.data-api",'[data-toggle="pill"]',o)}(jQuery),function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.affix"),r="object"==typeof e&&e;o||i.data("bs.affix",o=new n(this,r)),"string"==typeof e&&o[e]()})}var n=function(e,i){this.options=t.extend({},n.DEFAULTS,i),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};n.VERSION="3.3.7",n.RESET="affix affix-top affix-bottom",n.DEFAULTS={offset:0,target:window},n.prototype.getState=function(t,e,n,i){var o=this.$target.scrollTop(),r=this.$element.offset(),s=this.$target.height();if(null!=n&&"top"==this.affixed)return o<n&&"top";if("bottom"==this.affixed)return null!=n?!(o+this.unpin<=r.top)&&"bottom":!(o+s<=t-i)&&"bottom";var a=null==this.affixed,l=a?o:r.top;return null!=n&&o<=n?"top":null!=i&&l+(a?s:e)>=t-i&&"bottom"},n.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(n.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},n.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},n.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=this.$element.height(),i=this.options.offset,o=i.top,r=i.bottom,s=Math.max(t(document).height(),t(document.body).height());"object"!=typeof i&&(r=o=i),"function"==typeof o&&(o=i.top(this.$element)),"function"==typeof r&&(r=i.bottom(this.$element));var a=this.getState(s,e,o,r);if(this.affixed!=a){null!=this.unpin&&this.$element.css("top","");var l="affix"+(a?"-"+a:""),c=t.Event(l+".bs.affix");if(this.$element.trigger(c),c.isDefaultPrevented())return;this.affixed=a,this.unpin="bottom"==a?this.getPinnedOffset():null,this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==a&&this.$element.offset({top:s-e-r})}};var i=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=n,t.fn.affix.noConflict=function(){return t.fn.affix=i,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var n=t(this),i=n.data();i.offset=i.offset||{},null!=i.offsetBottom&&(i.offset.bottom=i.offsetBottom),null!=i.offsetTop&&(i.offset.top=i.offsetTop),e.call(n,i)})})}(jQuery),function(t){function e(e){var n=t(e);n.prop("disabled")||n.closest(".form-group").addClass("is-focused")}function n(n){n.closest("label").hover(function(){var n=t(this).find("input");n.prop("disabled")||e(n)},function(){i(t(this).find("input"))})}function i(e){t(e).closest(".form-group").removeClass("is-focused")}t.expr[":"].notmdproc=function(e){return!t(e).data("mdproc")},t.material={options:{validate:!0,input:!0,ripples:!0,checkbox:!0,togglebutton:!0,radio:!0,arrive:!0,autofill:!1,withRipples:[".btn:not(.btn-link)",".card-image",".navbar a:not(.withoutripple)",".footer a:not(.withoutripple)",".dropdown-menu a",".nav-tabs a:not(.withoutripple)",".withripple",".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","),inputElements:"input.form-control, textarea.form-control, select.form-control",checkboxElements:".checkbox > label > input[type=checkbox]",togglebuttonElements:".togglebutton > label > input[type=checkbox]",radioElements:".radio > label > input[type=radio]"},checkbox:function(e){n(t(e||this.options.checkboxElements).filter(":notmdproc").data("mdproc",!0).after("<span class='checkbox-material'><span class='check'></span></span>"))},togglebutton:function(e){n(t(e||this.options.togglebuttonElements).filter(":notmdproc").data("mdproc",!0).after("<span class='toggle'></span>"))},radio:function(e){n(t(e||this.options.radioElements).filter(":notmdproc").data("mdproc",!0).after("<span class='circle'></span><span class='check'></span>"))},input:function(e){t(e||this.options.inputElements).filter(":notmdproc").data("mdproc",!0).each(function(){var e=t(this),n=e.closest(".form-group");0===n.length&&(e.wrap("<div class='form-group'></div>"),n=e.closest(".form-group")),e.attr("data-hint")&&(e.after("<p class='help-block'>"+e.attr("data-hint")+"</p>"),e.removeAttr("data-hint"));if(t.each({"input-lg":"form-group-lg","input-sm":"form-group-sm"},function(t,i){e.hasClass(t)&&(e.removeClass(t),n.addClass(i))}),e.hasClass("floating-label")){var i=e.attr("placeholder");e.attr("placeholder",null).removeClass("floating-label");var o=e.attr("id"),r="";o&&(r="for='"+o+"'"),n.addClass("label-floating"),e.after("<label "+r+"class='control-label'>"+i+"</label>")}(null===e.val()||"undefined"==e.val()||""===e.val())&&n.addClass("is-empty"),n.append("<span class='material-input'></span>"),n.find("input[type=file]").length>0&&n.addClass("is-fileinput")})},attachInputEventHandlers:function(){var n=this.options.validate;t(document).on("change",".checkbox input[type=checkbox]",function(){t(this).blur()}).on("keydown paste",".form-control",function(e){var n;(void 0===(n=e).which||"number"==typeof n.which&&n.which>0&&!n.ctrlKey&&!n.metaKey&&!n.altKey&&8!=n.which&&9!=n.which&&13!=n.which&&16!=n.which&&17!=n.which&&20!=n.which&&27!=n.which)&&t(this).closest(".form-group").removeClass("is-empty")}).on("keyup change",".form-control",function(){var e=t(this),i=e.closest(".form-group"),o=void 0===e[0].checkValidity||e[0].checkValidity();""===e.val()?i.addClass("is-empty"):i.removeClass("is-empty"),n&&(o?i.removeClass("has-error"):i.addClass("has-error"))}).on("focus",".form-control, .form-group.is-fileinput",function(){e(this)}).on("blur",".form-control, .form-group.is-fileinput",function(){i(this)}).on("change",".form-group input",function(){var e=t(this);if("file"!=e.attr("type")){var n=e.closest(".form-group");e.val()?n.removeClass("is-empty"):n.addClass("is-empty")}}).on("change",".form-group.is-fileinput input[type='file']",function(){var e=t(this).closest(".form-group"),n="";t.each(this.files,function(t,e){n+=e.name+", "}),(n=n.substring(0,n.length-2))?e.removeClass("is-empty"):e.addClass("is-empty"),e.find("input.form-control[readonly]").val(n)})},ripples:function(e){t(e||this.options.withRipples).ripples()},autofill:function(){var e=setInterval(function(){t("input[type!=checkbox]").each(function(){var e=t(this);e.val()&&e.val()!==e.attr("value")&&e.trigger("change")})},100);setTimeout(function(){clearInterval(e)},1e4)},attachAutofillEventHandlers:function(){var e;t(document).on("focus","input",function(){var n=t(this).parents("form").find("input").not("[type=file]");e=setInterval(function(){n.each(function(){var e=t(this);e.val()!==e.attr("value")&&e.trigger("change")})},100)}).on("blur",".form-group input",function(){clearInterval(e)})},init:function(e){this.options=t.extend({},this.options,e);var n=t(document);t.fn.ripples&&this.options.ripples&&this.ripples(),this.options.input&&(this.input(),this.attachInputEventHandlers()),this.options.checkbox&&this.checkbox(),this.options.togglebutton&&this.togglebutton(),this.options.radio&&this.radio(),this.options.autofill&&(this.autofill(),this.attachAutofillEventHandlers()),document.arrive&&this.options.arrive&&(t.fn.ripples&&this.options.ripples&&n.arrive(this.options.withRipples,function(){t.material.ripples(t(this))}),this.options.input&&n.arrive(this.options.inputElements,function(){t.material.input(t(this))}),this.options.checkbox&&n.arrive(this.options.checkboxElements,function(){t.material.checkbox(t(this))}),this.options.radio&&n.arrive(this.options.radioElements,function(){t.material.radio(t(this))}),this.options.togglebutton&&n.arrive(this.options.togglebuttonElements,function(){t.material.togglebutton(t(this))}))}}}(jQuery),function(t,e,n,i){"use strict";function o(e,n){s=this,this.element=t(e),this.options=t.extend({},a,n),this._defaults=a,this._name=r,this.init()}var r="ripples",s=null,a={};o.prototype.init=function(){var n=this.element;n.on("mousedown touchstart",function(i){if(!s.isTouch()||"mousedown"!==i.type){n.find(".ripple-container").length||n.append('<div class="ripple-container"></div>');var o=n.children(".ripple-container"),r=s.getRelY(o,i),a=s.getRelX(o,i);if(r||a){var l=s.getRipplesColor(n),c=t("<div></div>");c.addClass("ripple").css({left:a,top:r,"background-color":l}),o.append(c),e.getComputedStyle(c[0]).opacity,s.rippleOn(n,c),setTimeout(function(){s.rippleEnd(c)},500),n.on("mouseup mouseleave touchend",function(){c.data("mousedown","off"),"off"===c.data("animating")&&s.rippleOut(c)})}}})},o.prototype.getNewSize=function(t,e){return Math.max(t.outerWidth(),t.outerHeight())/e.outerWidth()*2.5},o.prototype.getRelX=function(t,e){var n=t.offset();return s.isTouch()?1===(e=e.originalEvent).touches.length&&e.touches[0].pageX-n.left:e.pageX-n.left},o.prototype.getRelY=function(t,e){var n=t.offset();return s.isTouch()?1===(e=e.originalEvent).touches.length&&e.touches[0].pageY-n.top:e.pageY-n.top},o.prototype.getRipplesColor=function(t){return t.data("ripple-color")?t.data("ripple-color"):e.getComputedStyle(t[0]).color},o.prototype.hasTransitionSupport=function(){var t=(n.body||n.documentElement).style;return t.transition!==i||t.WebkitTransition!==i||t.MozTransition!==i||t.MsTransition!==i||t.OTransition!==i},o.prototype.isTouch=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},o.prototype.rippleEnd=function(t){t.data("animating","off"),"off"===t.data("mousedown")&&s.rippleOut(t)},o.prototype.rippleOut=function(t){t.off(),s.hasTransitionSupport()?t.addClass("ripple-out"):t.animate({opacity:0},100,function(){t.trigger("transitionend")}),t.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){t.remove()})},o.prototype.rippleOn=function(t,e){var n=s.getNewSize(t,e);s.hasTransitionSupport()?e.css({"-ms-transform":"scale("+n+")","-moz-transform":"scale("+n+")","-webkit-transform":"scale("+n+")",transform:"scale("+n+")"}).addClass("ripple-on").data("animating","on").data("mousedown","on"):e.animate({width:2*Math.max(t.outerWidth(),t.outerHeight()),height:2*Math.max(t.outerWidth(),t.outerHeight()),"margin-left":-1*Math.max(t.outerWidth(),t.outerHeight()),"margin-top":-1*Math.max(t.outerWidth(),t.outerHeight()),opacity:.2},500,function(){e.trigger("transitionend")})},t.fn.ripples=function(e){return this.each(function(){t.data(this,"plugin_"+r)||t.data(this,"plugin_"+r,new o(this,e))})}}(jQuery,window,document),function(t,e){"function"==typeof define&&define.amd?define([],function(){return t.Chartist=e()}):"object"==typeof exports?module.exports=e():t.Chartist=e()}(this,function(){var t={version:"0.9.4"};return function(t,e,n){"use strict";n.noop=function(t){return t},n.alphaNumerate=function(t){return String.fromCharCode(97+t%26)},n.extend=function(t){return t=t||{},Array.prototype.slice.call(arguments,1).forEach(function(e){for(var i in e)"object"!=typeof e[i]||null===e[i]||e[i]instanceof Array?t[i]=e[i]:t[i]=n.extend({},t[i],e[i])}),t},n.replaceAll=function(t,e,n){return t.replace(new RegExp(e,"g"),n)},n.stripUnit=function(t){return"string"==typeof t&&(t=t.replace(/[^0-9\+-\.]/g,"")),+t},n.ensureUnit=function(t,e){return"number"==typeof t&&(t+=e),t},n.querySelector=function(t){return t instanceof Node?t:e.querySelector(t)},n.times=function(t){return Array.apply(null,new Array(t))},n.sum=function(t,e){return t+(e||0)},n.mapMultiply=function(t){return function(e){return e*t}},n.mapAdd=function(t){return function(e){return e+t}},n.serialMap=function(t,e){var i=[],o=Math.max.apply(null,t.map(function(t){return t.length}));return n.times(o).forEach(function(n,o){var r=t.map(function(t){return t[o]});i[o]=e.apply(null,r)}),i},n.roundWithPrecision=function(t,e){var i=Math.pow(10,e||n.precision);return Math.round(t*i)/i},n.precision=8,n.escapingMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},n.serialize=function(t){return null===t||void 0===t?t:("number"==typeof t?t=""+t:"object"==typeof t&&(t=JSON.stringify({data:t})),Object.keys(n.escapingMap).reduce(function(t,e){return n.replaceAll(t,e,n.escapingMap[e])},t))},n.deserialize=function(t){if("string"!=typeof t)return t;t=Object.keys(n.escapingMap).reduce(function(t,e){return n.replaceAll(t,n.escapingMap[e],e)},t);try{t=void 0!==(t=JSON.parse(t)).data?t.data:t}catch(t){}return t},n.createSvg=function(t,e,i,o){var r;return e=e||"100%",i=i||"100%",Array.prototype.slice.call(t.querySelectorAll("svg")).filter(function(t){return t.getAttributeNS("http://www.w3.org/2000/xmlns/",n.xmlNs.prefix)}).forEach(function(e){t.removeChild(e)}),r=new n.Svg("svg").attr({width:e,height:i}).addClass(o).attr({style:"width: "+e+"; height: "+i+";"}),t.appendChild(r._node),r},n.reverseData=function(t){t.labels.reverse(),t.series.reverse();for(var e=0;e<t.series.length;e++)"object"==typeof t.series[e]&&void 0!==t.series[e].data?t.series[e].data.reverse():t.series[e]instanceof Array&&t.series[e].reverse()},n.getDataArray=function(t,e,i){return(e&&!t.reversed||!e&&t.reversed)&&(n.reverseData(t),t.reversed=!t.reversed),t.series.map(function t(e){if(!n.isFalseyButZero(e)){if((e.data||e)instanceof Array)return(e.data||e).map(t);if(e.hasOwnProperty("value"))return t(e.value);if(i){var o={};return"string"==typeof i?o[i]=n.getNumberOrUndefined(e):o.y=n.getNumberOrUndefined(e),o.x=e.hasOwnProperty("x")?n.getNumberOrUndefined(e.x):o.x,o.y=e.hasOwnProperty("y")?n.getNumberOrUndefined(e.y):o.y,o}return n.getNumberOrUndefined(e)}})},n.normalizePadding=function(t,e){return e=e||0,"number"==typeof t?{top:t,right:t,bottom:t,left:t}:{top:"number"==typeof t.top?t.top:e,right:"number"==typeof t.right?t.right:e,bottom:"number"==typeof t.bottom?t.bottom:e,left:"number"==typeof t.left?t.left:e}},n.getMetaData=function(t,e){var i=t.data?t.data[e]:t[e];return i?n.serialize(i.meta):void 0},n.orderOfMagnitude=function(t){return Math.floor(Math.log(Math.abs(t))/Math.LN10)},n.projectLength=function(t,e,n){return e/n.range*t},n.getAvailableHeight=function(t,e){return Math.max((n.stripUnit(e.height)||t.height())-(e.chartPadding.top+e.chartPadding.bottom)-e.axisX.offset,0)},n.getHighLow=function(t,e,i){var o={high:void 0===(e=n.extend({},e,i?e["axis"+i.toUpperCase()]:{})).high?-Number.MAX_VALUE:+e.high,low:void 0===e.low?Number.MAX_VALUE:+e.low},r=void 0===e.high,s=void 0===e.low;return(r||s)&&function t(e){if(void 0!==e)if(e instanceof Array)for(var n=0;n<e.length;n++)t(e[n]);else{var a=i?+e[i]:+e;r&&a>o.high&&(o.high=a),s&&a<o.low&&(o.low=a)}}(t),(e.referenceValue||0===e.referenceValue)&&(o.high=Math.max(e.referenceValue,o.high),o.low=Math.min(e.referenceValue,o.low)),o.high<=o.low&&(0===o.low?o.high=1:o.low<0?o.high=0:o.low=0),o},n.isNum=function(t){return!isNaN(t)&&isFinite(t)},n.isFalseyButZero=function(t){return!t&&0!==t},n.getNumberOrUndefined=function(t){return isNaN(+t)?void 0:+t},n.getMultiValue=function(t,e){return n.isNum(t)?+t:t&&t[e||"y"]||0},n.rho=function(t){function e(t,n){return t%n==0?n:e(n,t%n)}function n(t){return t*t+1}if(1===t)return t;var i,o=2,r=2;if(t%2==0)return 2;do{o=n(o)%t,r=n(n(r))%t,i=e(Math.abs(o-r),t)}while(1===i);return i},n.getBounds=function(t,e,i,o){var r,s,a,l=0,c={high:e.high,low:e.low};c.valueRange=c.high-c.low,c.oom=n.orderOfMagnitude(c.valueRange),c.step=Math.pow(10,c.oom),c.min=Math.floor(c.low/c.step)*c.step,c.max=Math.ceil(c.high/c.step)*c.step,c.range=c.max-c.min,c.numberOfSteps=Math.round(c.range/c.step);var u=i>n.projectLength(t,c.step,c),h=o?n.rho(c.range):0;if(o&&n.projectLength(t,1,c)>=i)c.step=1;else if(o&&h<c.step&&n.projectLength(t,h,c)>=i)c.step=h;else for(;;){if(u&&n.projectLength(t,c.step,c)<=i)c.step*=2;else{if(u||!(n.projectLength(t,c.step/2,c)>=i))break;if(c.step/=2,o&&c.step%1!=0){c.step*=2;break}}if(l++>1e3)throw new Error("Exceeded maximum number of iterations while optimizing scale step!")}for(s=c.min,a=c.max;s+c.step<=c.low;)s+=c.step;for(;a-c.step>=c.high;)a-=c.step;for(c.min=s,c.max=a,c.range=c.max-c.min,c.values=[],r=c.min;r<=c.max;r+=c.step)c.values.push(n.roundWithPrecision(r));return c},n.polarToCartesian=function(t,e,n,i){var o=(i-90)*Math.PI/180;return{x:t+n*Math.cos(o),y:e+n*Math.sin(o)}},n.createChartRect=function(t,e,i){var o=!(!e.axisX&&!e.axisY),r=o?e.axisY.offset:0,s=o?e.axisX.offset:0,a=t.width()||n.stripUnit(e.width)||0,l=t.height()||n.stripUnit(e.height)||0,c=n.normalizePadding(e.chartPadding,i);a=Math.max(a,r+c.left+c.right),l=Math.max(l,s+c.top+c.bottom);var u={padding:c,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}};return o?("start"===e.axisX.position?(u.y2=c.top+s,u.y1=Math.max(l-c.bottom,u.y2+1)):(u.y2=c.top,u.y1=Math.max(l-c.bottom-s,u.y2+1)),"start"===e.axisY.position?(u.x1=c.left+r,u.x2=Math.max(a-c.right,u.x1+1)):(u.x1=c.left,u.x2=Math.max(a-c.right-r,u.x1+1))):(u.x1=c.left,u.x2=Math.max(a-c.right,u.x1+1),u.y2=c.top,u.y1=Math.max(l-c.bottom,u.y2+1)),u},n.createGrid=function(t,e,i,o,r,s,a,l){var c={};c[i.units.pos+"1"]=t,c[i.units.pos+"2"]=t,c[i.counterUnits.pos+"1"]=o,c[i.counterUnits.pos+"2"]=o+r;var u=s.elem("line",c,a.join(" "));l.emit("draw",n.extend({type:"grid",axis:i,index:e,group:s,element:u},c))},n.createLabel=function(t,e,i,o,r,s,a,l,c,u,h){var f,p={};if(p[r.units.pos]=t+a[r.units.pos],p[r.counterUnits.pos]=a[r.counterUnits.pos],p[r.units.len]=e,p[r.counterUnits.len]=s-10,u){var d='<span class="'+c.join(" ")+'" style="'+r.units.len+": "+Math.round(p[r.units.len])+"px; "+r.counterUnits.len+": "+Math.round(p[r.counterUnits.len])+'px">'+o[i]+"</span>";f=l.foreignObject(d,n.extend({style:"overflow: visible;"},p))}else f=l.elem("text",p,c.join(" ")).text(o[i]);h.emit("draw",n.extend({type:"label",axis:r,index:i,group:l,element:f,text:o[i]},p))},n.getSeriesOption=function(t,e,n){if(t.name&&e.series&&e.series[t.name]){var i=e.series[t.name];return i.hasOwnProperty(n)?i[n]:e[n]}return e[n]},n.optionsProvider=function(e,i,o){function r(e){var r=s;if(s=n.extend({},l),i)for(a=0;a<i.length;a++){t.matchMedia(i[a][0]).matches&&(s=n.extend(s,i[a][1]))}o&&!e&&o.emit("optionsChanged",{previousOptions:r,currentOptions:s})}var s,a,l=n.extend({},e),c=[];if(!t.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(i)for(a=0;a<i.length;a++){var u=t.matchMedia(i[a][0]);u.addListener(r),c.push(u)}return r(!0),{removeMediaQueryListeners:function(){c.forEach(function(t){t.removeListener(r)})},getCurrentOptions:function(){return n.extend({},s)}}}}(window,document,t),function(t,e,n){"use strict";n.Interpolation={},n.Interpolation.none=function(){return function(t,e){for(var i=new n.Svg.Path,o=!0,r=1;r<t.length;r+=2){var s=e[(r-1)/2];void 0===s.value?o=!0:o?(i.move(t[r-1],t[r],!1,s),o=!1):i.line(t[r-1],t[r],!1,s)}return i}},n.Interpolation.simple=function(t){t=n.extend({},{divisor:2},t);var e=1/Math.max(1,t.divisor);return function(t,i){for(var o=new n.Svg.Path,r=!0,s=2;s<t.length;s+=2){var a=t[s-2],l=t[s-1],c=t[s],u=t[s+1],h=(c-a)*e,f=i[s/2-1],p=i[s/2];void 0===f.value?r=!0:(r&&o.move(a,l,!1,f),void 0!==p.value&&(o.curve(a+h,l,c-h,u,c,u,!1,p),r=!1))}return o}},n.Interpolation.cardinal=function(t){t=n.extend({},{tension:1},t);var e=Math.min(1,Math.max(0,t.tension)),i=1-e;return function t(o,r){var s=function(t,e){for(var n=[],i=!0,o=0;o<t.length;o+=2)void 0===e[o/2].value?i=!0:(i&&(n.push({pathCoordinates:[],valueData:[]}),i=!1),n[n.length-1].pathCoordinates.push(t[o],t[o+1]),n[n.length-1].valueData.push(e[o/2]));return n}(o,r);if(s.length>1){var a=[];return s.forEach(function(e){a.push(t(e.pathCoordinates,e.valueData))}),n.Svg.Path.join(a)}if(o=s[0].pathCoordinates,r=s[0].valueData,o.length<=4)return n.Interpolation.none()(o,r);for(var l=(new n.Svg.Path).move(o[0],o[1],!1,r[0]),c=0,u=o.length;u-2>c;c+=2){var h=[{x:+o[c-2],y:+o[c-1]},{x:+o[c],y:+o[c+1]},{x:+o[c+2],y:+o[c+3]},{x:+o[c+4],y:+o[c+5]}];u-4===c?h[3]=h[2]:c||(h[0]={x:+o[c],y:+o[c+1]}),l.curve(e*(-h[0].x+6*h[1].x+h[2].x)/6+i*h[2].x,e*(-h[0].y+6*h[1].y+h[2].y)/6+i*h[2].y,e*(h[1].x+6*h[2].x-h[3].x)/6+i*h[2].x,e*(h[1].y+6*h[2].y-h[3].y)/6+i*h[2].y,h[2].x,h[2].y,!1,r[(c+2)/2])}return l}},n.Interpolation.step=function(t){return t=n.extend({},{postpone:!0},t),function(e,i){for(var o=new n.Svg.Path,r=!0,s=2;s<e.length;s+=2){var a=e[s-2],l=e[s-1],c=e[s],u=e[s+1],h=i[s/2-1],f=i[s/2];void 0===h.value?r=!0:(r&&o.move(a,l,!1,h),void 0!==f.value&&(t.postpone?o.line(c,l,!1,h):o.line(a,u,!1,f),o.line(c,u,!1,f),r=!1))}return o}}}(window,document,t),function(e,n,i){"use strict";t.EventEmitter=function(){var t=[];return{addEventHandler:function(e,n){t[e]=t[e]||[],t[e].push(n)},removeEventHandler:function(e,n){t[e]&&(n?(t[e].splice(t[e].indexOf(n),1),0===t[e].length&&delete t[e]):delete t[e])},emit:function(e,n){t[e]&&t[e].forEach(function(t){t(n)}),t["*"]&&t["*"].forEach(function(t){t(e,n)})}}}}(window,document),function(t,e,n){"use strict";n.Class={extend:function(t,e){var i=e||this.prototype||n.Class,o=Object.create(i);n.Class.cloneDefinitions(o,t);var r=function(){var t,e=o.constructor||function(){};return t=this===n?Object.create(o):this,e.apply(t,Array.prototype.slice.call(arguments,0)),t};return r.prototype=o,r.super=i,r.extend=this.extend,r},cloneDefinitions:function(){var t=function(t){var e=[];if(t.length)for(var n=0;n<t.length;n++)e.push(t[n]);return e}(arguments),e=t[0];return t.splice(1,t.length-1).forEach(function(t){Object.getOwnPropertyNames(t).forEach(function(n){delete e[n],Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}),e}}}(window,document,t),function(t,e,n){"use strict";n.Base=n.Class.extend({constructor:function(e,i,o,r,s){this.container=n.querySelector(e),this.data=i,this.defaultOptions=o,this.options=r,this.responsiveOptions=s,this.eventEmitter=n.EventEmitter(),this.supportsForeignObject=n.Svg.isSupported("Extensibility"),this.supportsAnimations=n.Svg.isSupported("AnimationEventsAttribute"),this.resizeListener=function(){this.update()}.bind(this),this.container&&(this.container.__chartist__&&this.container.__chartist__.detach(),this.container.__chartist__=this),this.initializeTimeoutId=setTimeout(function(){t.addEventListener("resize",this.resizeListener),this.optionsProvider=n.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter),this.eventEmitter.addEventHandler("optionsChanged",function(){this.update()}.bind(this)),this.options.plugins&&this.options.plugins.forEach(function(t){t instanceof Array?t[0](this,t[1]):t(this)}.bind(this)),this.eventEmitter.emit("data",{type:"initial",data:this.data}),this.createChart(this.optionsProvider.getCurrentOptions()),this.initializeTimeoutId=void 0}.bind(this),0)},optionsProvider:void 0,container:void 0,svg:void 0,eventEmitter:void 0,createChart:function(){throw new Error("Base chart type can't be instantiated!")},update:function(t,e,i){return t&&(this.data=t,this.eventEmitter.emit("data",{type:"update",data:this.data})),e&&(this.options=n.extend({},i?this.options:this.defaultOptions,e),this.initializeTimeoutId||(this.optionsProvider.removeMediaQueryListeners(),this.optionsProvider=n.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter))),this.initializeTimeoutId||this.createChart(this.optionsProvider.getCurrentOptions()),this},detach:function(){return this.initializeTimeoutId?t.clearTimeout(this.initializeTimeoutId):(t.removeEventListener("resize",this.resizeListener),this.optionsProvider.removeMediaQueryListeners()),this},on:function(t,e){return this.eventEmitter.addEventHandler(t,e),this},off:function(t,e){return this.eventEmitter.removeEventHandler(t,e),this},version:n.version,supportsForeignObject:!1})}(window,document,t),function(t,e,n){"use strict";function i(t,e){try{return t.getBBox()[e]}catch(t){}return 0}var o="http://www.w3.org/2000/svg",r="http://www.w3.org/2000/xmlns/",s="http://www.w3.org/1999/xhtml";n.xmlNs={qualifiedName:"xmlns:ct",prefix:"ct",uri:"http://gionkunz.github.com/chartist-js/ct"},n.Svg=n.Class.extend({constructor:function(t,i,s,a,l){t instanceof Element?this._node=t:(this._node=e.createElementNS(o,t),"svg"===t&&this._node.setAttributeNS(r,n.xmlNs.qualifiedName,n.xmlNs.uri)),i&&this.attr(i),s&&this.addClass(s),a&&(l&&a._node.firstChild?a._node.insertBefore(this._node,a._node.firstChild):a._node.appendChild(this._node))},attr:function(t,e){return"string"==typeof t?e?this._node.getAttributeNS(e,t):this._node.getAttribute(t):(Object.keys(t).forEach(function(i){void 0!==t[i]&&(e?this._node.setAttributeNS(e,[n.xmlNs.prefix,":",i].join(""),t[i]):this._node.setAttribute(i,t[i]))}.bind(this)),this)},elem:function(t,e,i,o){return new n.Svg(t,e,i,this,o)},parent:function(){return this._node.parentNode instanceof SVGElement?new n.Svg(this._node.parentNode):null},root:function(){for(var t=this._node;"svg"!==t.nodeName;)t=t.parentNode;return new n.Svg(t)},querySelector:function(t){var e=this._node.querySelector(t);return e?new n.Svg(e):null},querySelectorAll:function(t){var e=this._node.querySelectorAll(t);return e.length?new n.Svg.List(e):null},foreignObject:function(t,n,i,o){if("string"==typeof t){var r=e.createElement("div");r.innerHTML=t,t=r.firstChild}t.setAttribute("xmlns",s);var a=this.elem("foreignObject",n,i,o);return a._node.appendChild(t),a},text:function(t){return this._node.appendChild(e.createTextNode(t)),this},empty:function(){for(;this._node.firstChild;)this._node.removeChild(this._node.firstChild);return this},remove:function(){return this._node.parentNode.removeChild(this._node),this.parent()},replace:function(t){return this._node.parentNode.replaceChild(t._node,this._node),t},append:function(t,e){return e&&this._node.firstChild?this._node.insertBefore(t._node,this._node.firstChild):this._node.appendChild(t._node),this},classes:function(){return this._node.getAttribute("class")?this._node.getAttribute("class").trim().split(/\s+/):[]},addClass:function(t){return this._node.setAttribute("class",this.classes(this._node).concat(t.trim().split(/\s+/)).filter(function(t,e,n){return n.indexOf(t)===e}).join(" ")),this},removeClass:function(t){var e=t.trim().split(/\s+/);return this._node.setAttribute("class",this.classes(this._node).filter(function(t){return-1===e.indexOf(t)}).join(" ")),this},removeAllClasses:function(){return this._node.setAttribute("class",""),this},height:function(){return this._node.clientHeight||Math.round(i(this._node,"height"))||this._node.parentNode.clientHeight},width:function(){return this._node.clientWidth||Math.round(i(this._node,"width"))||this._node.parentNode.clientWidth},animate:function(t,e,i){return void 0===e&&(e=!0),Object.keys(t).forEach(function(o){function r(t,e){var r,s,a,l={};t.easing&&(a=t.easing instanceof Array?t.easing:n.Svg.Easing[t.easing],delete t.easing),t.begin=n.ensureUnit(t.begin,"ms"),t.dur=n.ensureUnit(t.dur,"ms"),a&&(t.calcMode="spline",t.keySplines=a.join(" "),t.keyTimes="0;1"),e&&(t.fill="freeze",l[o]=t.from,this.attr(l),s=n.stripUnit(t.begin||0),t.begin="indefinite"),r=this.elem("animate",n.extend({attributeName:o},t)),e&&setTimeout(function(){try{r._node.beginElement()}catch(e){l[o]=t.to,this.attr(l),r.remove()}}.bind(this),s),i&&r._node.addEventListener("beginEvent",function(){i.emit("animationBegin",{element:this,animate:r._node,params:t})}.bind(this)),r._node.addEventListener("endEvent",function(){i&&i.emit("animationEnd",{element:this,animate:r._node,params:t}),e&&(l[o]=t.to,this.attr(l),r.remove())}.bind(this))}t[o]instanceof Array?t[o].forEach(function(t){r.bind(this)(t,!1)}.bind(this)):r.bind(this)(t[o],e)}.bind(this)),this}}),n.Svg.isSupported=function(t){return e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#"+t,"1.1")};n.Svg.Easing={easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]},n.Svg.List=n.Class.extend({constructor:function(t){var e=this;this.svgElements=[];for(var i=0;i<t.length;i++)this.svgElements.push(new n.Svg(t[i]));Object.keys(n.Svg.prototype).filter(function(t){return-1===["constructor","parent","querySelector","querySelectorAll","replace","append","classes","height","width"].indexOf(t)}).forEach(function(t){e[t]=function(){var i=Array.prototype.slice.call(arguments,0);return e.svgElements.forEach(function(e){n.Svg.prototype[t].apply(e,i)}),e}})}})}(window,document,t),function(t,e,n){"use strict";function i(t,e,i,o,r,s){var a=n.extend({command:r?t.toLowerCase():t.toUpperCase()},e,s?{data:s}:{});i.splice(o,0,a)}function o(t,e){t.forEach(function(n,i){r[n.command.toLowerCase()].forEach(function(o,r){e(n,o,i,r,t)})})}var r={m:["x","y"],l:["x","y"],c:["x1","y1","x2","y2","x","y"],a:["rx","ry","xAr","lAf","sf","x","y"]},s={accuracy:3};n.Svg.Path=n.Class.extend({constructor:function(t,e){this.pathElements=[],this.pos=0,this.close=t,this.options=n.extend({},s,e)},position:function(t){return void 0!==t?(this.pos=Math.max(0,Math.min(this.pathElements.length,t)),this):this.pos},remove:function(t){return this.pathElements.splice(this.pos,t),this},move:function(t,e,n,o){return i("M",{x:+t,y:+e},this.pathElements,this.pos++,n,o),this},line:function(t,e,n,o){return i("L",{x:+t,y:+e},this.pathElements,this.pos++,n,o),this},curve:function(t,e,n,o,r,s,a,l){return i("C",{x1:+t,y1:+e,x2:+n,y2:+o,x:+r,y:+s},this.pathElements,this.pos++,a,l),this},arc:function(t,e,n,o,r,s,a,l,c){return i("A",{rx:+t,ry:+e,xAr:+n,lAf:+o,sf:+r,x:+s,y:+a},this.pathElements,this.pos++,l,c),this},scale:function(t,e){return o(this.pathElements,function(n,i){n[i]*="x"===i[0]?t:e}),this},translate:function(t,e){return o(this.pathElements,function(n,i){n[i]+="x"===i[0]?t:e}),this},transform:function(t){return o(this.pathElements,function(e,n,i,o,r){var s=t(e,n,i,o,r);(s||0===s)&&(e[n]=s)}),this},parse:function(t){var e=t.replace(/([A-Za-z])([0-9])/g,"$1 $2").replace(/([0-9])([A-Za-z])/g,"$1 $2").split(/[\s,]+/).reduce(function(t,e){return e.match(/[A-Za-z]/)&&t.push([]),t[t.length-1].push(e),t},[]);"Z"===e[e.length-1][0].toUpperCase()&&e.pop();var i=e.map(function(t){var e=t.shift(),i=r[e.toLowerCase()];return n.extend({command:e},i.reduce(function(e,n,i){return e[n]=+t[i],e},{}))}),o=[this.pos,0];return Array.prototype.push.apply(o,i),Array.prototype.splice.apply(this.pathElements,o),this.pos+=i.length,this},stringify:function(){var t=Math.pow(10,this.options.accuracy);return this.pathElements.reduce(function(e,n){var i=r[n.command.toLowerCase()].map(function(e){return this.options.accuracy?Math.round(n[e]*t)/t:n[e]}.bind(this));return e+n.command+i.join(",")}.bind(this),"")+(this.close?"Z":"")},clone:function(t){var e=new n.Svg.Path(t||this.close);return e.pos=this.pos,e.pathElements=this.pathElements.slice().map(function(t){return n.extend({},t)}),e.options=n.extend({},this.options),e},splitByCommand:function(t){var e=[new n.Svg.Path];return this.pathElements.forEach(function(i){i.command===t.toUpperCase()&&0!==e[e.length-1].pathElements.length&&e.push(new n.Svg.Path),e[e.length-1].pathElements.push(i)}),e}}),n.Svg.Path.elementDescriptions=r,n.Svg.Path.join=function(t,e,i){for(var o=new n.Svg.Path(e,i),r=0;r<t.length;r++)for(var s=t[r],a=0;a<s.pathElements.length;a++)o.pathElements.push(s.pathElements[a]);return o}}(window,document,t),function(t,e,n){"use strict";var i={x:{pos:"x",len:"width",dir:"horizontal",rectStart:"x1",rectEnd:"x2",rectOffset:"y2"},y:{pos:"y",len:"height",dir:"vertical",rectStart:"y2",rectEnd:"y1",rectOffset:"x1"}};n.Axis=n.Class.extend({constructor:function(t,e,n,o){this.units=t,this.counterUnits=t===i.x?i.y:i.x,this.chartRect=e,this.axisLength=e[t.rectEnd]-e[t.rectStart],this.gridOffset=e[t.rectOffset],this.ticks=n,this.options=o},createGridAndLabels:function(t,e,i,o,r){var s=o["axis"+this.units.pos.toUpperCase()],a=this.ticks.map(this.projectValue.bind(this)),l=this.ticks.map(s.labelInterpolationFnc);a.forEach(function(c,u){var h,f={x:0,y:0};h=a[u+1]?a[u+1]-c:Math.max(this.axisLength-c,30),(l[u]||0===l[u])&&("x"===this.units.pos?(c=this.chartRect.x1+c,f.x=o.axisX.labelOffset.x,"start"===o.axisX.position?f.y=this.chartRect.padding.top+o.axisX.labelOffset.y+(i?5:20):f.y=this.chartRect.y1+o.axisX.labelOffset.y+(i?5:20)):(c=this.chartRect.y1-c,f.y=o.axisY.labelOffset.y-(i?h:0),"start"===o.axisY.position?f.x=i?this.chartRect.padding.left+o.axisY.labelOffset.x:this.chartRect.x1-10:f.x=this.chartRect.x2+o.axisY.labelOffset.x+10),s.showGrid&&n.createGrid(c,u,this,this.gridOffset,this.chartRect[this.counterUnits.len](),t,[o.classNames.grid,o.classNames[this.units.dir]],r),s.showLabel&&n.createLabel(c,h,u,l,this,s.offset,f,e,[o.classNames.label,o.classNames[this.units.dir],o.classNames[s.position]],i,r))}.bind(this))},projectValue:function(t,e,n){throw new Error("Base axis can't be instantiated!")}}),n.Axis.units=i}(window,document,t),function(t,e,n){"use strict";n.AutoScaleAxis=n.Axis.extend({constructor:function(t,e,i,o){var r=o.highLow||n.getHighLow(e.normalized,o,t.pos);this.bounds=n.getBounds(i[t.rectEnd]-i[t.rectStart],r,o.scaleMinSpace||20,o.onlyInteger),this.range={min:this.bounds.min,max:this.bounds.max},n.AutoScaleAxis.super.constructor.call(this,t,i,this.bounds.values,o)},projectValue:function(t){return this.axisLength*(+n.getMultiValue(t,this.units.pos)-this.bounds.min)/this.bounds.range}})}(window,document,t),function(t,e,n){"use strict";n.FixedScaleAxis=n.Axis.extend({constructor:function(t,e,i,o){var r=o.highLow||n.getHighLow(e.normalized,o,t.pos);this.divisor=o.divisor||1,this.ticks=o.ticks||n.times(this.divisor).map(function(t,e){return r.low+(r.high-r.low)/this.divisor*e}.bind(this)),this.range={min:r.low,max:r.high},n.FixedScaleAxis.super.constructor.call(this,t,i,this.ticks,o),this.stepLength=this.axisLength/this.divisor},projectValue:function(t){return this.axisLength*(+n.getMultiValue(t,this.units.pos)-this.range.min)/(this.range.max-this.range.min)}})}(window,document,t),function(t,e,n){"use strict";n.StepAxis=n.Axis.extend({constructor:function(t,e,i,o){n.StepAxis.super.constructor.call(this,t,i,o.ticks,o),this.stepLength=this.axisLength/(o.ticks.length-(o.stretch?1:0))},projectValue:function(t,e){return this.stepLength*e}})}(window,document,t),function(t,e,n){"use strict";var i={axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:n.noop,type:void 0},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:n.noop,type:void 0,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,showLine:!0,showPoint:!0,showArea:!1,areaBase:0,lineSmooth:!0,low:void 0,high:void 0,chartPadding:{top:15,right:15,bottom:5,left:10},fullWidth:!1,reverseData:!1,classNames:{chart:"ct-chart-line",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",line:"ct-line",point:"ct-point",area:"ct-area",grid:"ct-grid",gridGroup:"ct-grids",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}};n.Line=n.Base.extend({constructor:function(t,e,o,r){n.Line.super.constructor.call(this,t,e,i,n.extend({},i,o),r)},createChart:function(t){var e={raw:this.data,normalized:n.getDataArray(this.data,t.reverseData,!0)};this.svg=n.createSvg(this.container,t.width,t.height,t.classNames.chart);var o,r,s=this.svg.elem("g").addClass(t.classNames.gridGroup),a=this.svg.elem("g"),l=this.svg.elem("g").addClass(t.classNames.labelGroup),c=n.createChartRect(this.svg,t,i.padding);o=void 0===t.axisX.type?new n.StepAxis(n.Axis.units.x,e,c,n.extend({},t.axisX,{ticks:e.raw.labels,stretch:t.fullWidth})):t.axisX.type.call(n,n.Axis.units.x,e,c,t.axisX),r=void 0===t.axisY.type?new n.AutoScaleAxis(n.Axis.units.y,e,c,n.extend({},t.axisY,{high:n.isNum(t.high)?t.high:t.axisY.high,low:n.isNum(t.low)?t.low:t.axisY.low})):t.axisY.type.call(n,n.Axis.units.y,e,c,t.axisY),o.createGridAndLabels(s,l,this.supportsForeignObject,t,this.eventEmitter),r.createGridAndLabels(s,l,this.supportsForeignObject,t,this.eventEmitter),e.raw.series.forEach(function(i,s){var l=a.elem("g");l.attr({"series-name":i.name,meta:n.serialize(i.meta)},n.xmlNs.uri),l.addClass([t.classNames.series,i.className||t.classNames.series+"-"+n.alphaNumerate(s)].join(" "));var u=[],h=[];e.normalized[s].forEach(function(t,a){var l={x:c.x1+o.projectValue(t,a,e.normalized[s]),y:c.y1-r.projectValue(t,a,e.normalized[s])};u.push(l.x,l.y),h.push({value:t,valueIndex:a,meta:n.getMetaData(i,a)})}.bind(this));var f={lineSmooth:n.getSeriesOption(i,t,"lineSmooth"),showPoint:n.getSeriesOption(i,t,"showPoint"),showLine:n.getSeriesOption(i,t,"showLine"),showArea:n.getSeriesOption(i,t,"showArea"),areaBase:n.getSeriesOption(i,t,"areaBase")},p=("function"==typeof f.lineSmooth?f.lineSmooth:f.lineSmooth?n.Interpolation.cardinal():n.Interpolation.none())(u,h);if(f.showPoint&&p.pathElements.forEach(function(e){var a=l.elem("line",{x1:e.x,y1:e.y,x2:e.x+.01,y2:e.y},t.classNames.point).attr({value:[e.data.value.x,e.data.value.y].filter(function(t){return t}).join(","),meta:e.data.meta},n.xmlNs.uri);this.eventEmitter.emit("draw",{type:"point",value:e.data.value,index:e.data.valueIndex,meta:e.data.meta,series:i,seriesIndex:s,axisX:o,axisY:r,group:l,element:a,x:e.x,y:e.y})}.bind(this)),f.showLine){var d=l.elem("path",{d:p.stringify()},t.classNames.line,!0);this.eventEmitter.emit("draw",{type:"line",values:e.normalized[s],path:p.clone(),chartRect:c,index:s,series:i,seriesIndex:s,axisX:o,axisY:r,group:l,element:d})}if(f.showArea&&r.range){var g=Math.max(Math.min(f.areaBase,r.range.max),r.range.min),m=c.y1-r.projectValue(g);p.splitByCommand("M").filter(function(t){return t.pathElements.length>1}).map(function(t){var e=t.pathElements[0],n=t.pathElements[t.pathElements.length-1];return t.clone(!0).position(0).remove(1).move(e.x,m).line(e.x,e.y).position(t.pathElements.length+1).line(n.x,m)}).forEach(function(a){var u=l.elem("path",{d:a.stringify()},t.classNames.area,!0).attr({values:e.normalized[s]},n.xmlNs.uri);this.eventEmitter.emit("draw",{type:"area",values:e.normalized[s],path:a.clone(),series:i,seriesIndex:s,axisX:o,axisY:r,chartRect:c,index:s,group:l,element:u})}.bind(this))}}.bind(this)),this.eventEmitter.emit("created",{bounds:r.bounds,chartRect:c,axisX:o,axisY:r,svg:this.svg,options:t})}})}(window,document,t),function(t,e,n){"use strict";var i={axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:n.noop,scaleMinSpace:30,onlyInteger:!1},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:n.noop,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,high:void 0,low:void 0,onlyInteger:!1,chartPadding:{top:15,right:15,bottom:5,left:10},seriesBarDistance:15,stackBars:!1,horizontalBars:!1,distributeSeries:!1,reverseData:!1,classNames:{chart:"ct-chart-bar",horizontalBars:"ct-horizontal-bars",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",bar:"ct-bar",grid:"ct-grid",gridGroup:"ct-grids",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}};n.Bar=n.Base.extend({constructor:function(t,e,o,r){n.Bar.super.constructor.call(this,t,e,i,n.extend({},i,o),r)},createChart:function(t){var e,o={raw:this.data,normalized:t.distributeSeries?n.getDataArray(this.data,t.reverseData,t.horizontalBars?"x":"y").map(function(t){return[t]}):n.getDataArray(this.data,t.reverseData,t.horizontalBars?"x":"y")};this.svg=n.createSvg(this.container,t.width,t.height,t.classNames.chart+(t.horizontalBars?" "+t.classNames.horizontalBars:""));var r=this.svg.elem("g").addClass(t.classNames.gridGroup),s=this.svg.elem("g"),a=this.svg.elem("g").addClass(t.classNames.labelGroup);if(t.stackBars){var l=n.serialMap(o.normalized,function(){return Array.prototype.slice.call(arguments).map(function(t){return t}).reduce(function(t,e){return{x:t.x+e.x||0,y:t.y+e.y||0}},{x:0,y:0})});e=n.getHighLow([l],n.extend({},t,{referenceValue:0}),t.horizontalBars?"x":"y")}else e=n.getHighLow(o.normalized,n.extend({},t,{referenceValue:0}),t.horizontalBars?"x":"y");e.high=+t.high||(0===t.high?0:e.high),e.low=+t.low||(0===t.low?0:e.low);var c,u,h,f,p,d=n.createChartRect(this.svg,t,i.padding);u=t.distributeSeries&&t.stackBars?o.raw.labels.slice(0,1):o.raw.labels,t.horizontalBars?(c=f=void 0===t.axisX.type?new n.AutoScaleAxis(n.Axis.units.x,o,d,n.extend({},t.axisX,{highLow:e,referenceValue:0})):t.axisX.type.call(n,n.Axis.units.x,o,d,n.extend({},t.axisX,{highLow:e,referenceValue:0})),h=p=void 0===t.axisY.type?new n.StepAxis(n.Axis.units.y,o,d,{ticks:u}):t.axisY.type.call(n,n.Axis.units.y,o,d,t.axisY)):(h=f=void 0===t.axisX.type?new n.StepAxis(n.Axis.units.x,o,d,{ticks:u}):t.axisX.type.call(n,n.Axis.units.x,o,d,t.axisX),c=p=void 0===t.axisY.type?new n.AutoScaleAxis(n.Axis.units.y,o,d,n.extend({},t.axisY,{highLow:e,referenceValue:0})):t.axisY.type.call(n,n.Axis.units.y,o,d,n.extend({},t.axisY,{highLow:e,referenceValue:0})));var g=t.horizontalBars?d.x1+c.projectValue(0):d.y1-c.projectValue(0),m=[];h.createGridAndLabels(r,a,this.supportsForeignObject,t,this.eventEmitter),c.createGridAndLabels(r,a,this.supportsForeignObject,t,this.eventEmitter),o.raw.series.forEach(function(e,i){var r,a,l=i-(o.raw.series.length-1)/2;r=t.distributeSeries&&!t.stackBars?h.axisLength/o.normalized.length/2:t.distributeSeries&&t.stackBars?h.axisLength/2:h.axisLength/o.normalized[i].length/2,(a=s.elem("g")).attr({"series-name":e.name,meta:n.serialize(e.meta)},n.xmlNs.uri),a.addClass([t.classNames.series,e.className||t.classNames.series+"-"+n.alphaNumerate(i)].join(" ")),o.normalized[i].forEach(function(s,u){var v,b,y,w;if(w=t.distributeSeries&&!t.stackBars?i:t.distributeSeries&&t.stackBars?0:u,v=t.horizontalBars?{x:d.x1+c.projectValue(s&&s.x?s.x:0,u,o.normalized[i]),y:d.y1-h.projectValue(s&&s.y?s.y:0,w,o.normalized[i])}:{x:d.x1+h.projectValue(s&&s.x?s.x:0,w,o.normalized[i]),y:d.y1-c.projectValue(s&&s.y?s.y:0,u,o.normalized[i])},h instanceof n.StepAxis&&(h.options.stretch||(v[h.units.pos]+=r*(t.horizontalBars?-1:1)),v[h.units.pos]+=t.stackBars||t.distributeSeries?0:l*t.seriesBarDistance*(t.horizontalBars?-1:1)),y=m[u]||g,m[u]=y-(g-v[h.counterUnits.pos]),void 0!==s){var x={};x[h.units.pos+"1"]=v[h.units.pos],x[h.units.pos+"2"]=v[h.units.pos],x[h.counterUnits.pos+"1"]=t.stackBars?y:g,x[h.counterUnits.pos+"2"]=t.stackBars?m[u]:v[h.counterUnits.pos],x.x1=Math.min(Math.max(x.x1,d.x1),d.x2),x.x2=Math.min(Math.max(x.x2,d.x1),d.x2),x.y1=Math.min(Math.max(x.y1,d.y2),d.y1),x.y2=Math.min(Math.max(x.y2,d.y2),d.y1),b=a.elem("line",x,t.classNames.bar).attr({value:[s.x,s.y].filter(function(t){return t}).join(","),meta:n.getMetaData(e,u)},n.xmlNs.uri),this.eventEmitter.emit("draw",n.extend({type:"bar",value:s,index:u,meta:n.getMetaData(e,u),series:e,seriesIndex:i,axisX:f,axisY:p,chartRect:d,group:a,element:b},x))}}.bind(this))}.bind(this)),this.eventEmitter.emit("created",{bounds:c.bounds,chartRect:d,axisX:f,axisY:p,svg:this.svg,options:t})}})}(window,document,t),function(t,e,n){"use strict";function i(t,e,n){var i=e.x>t.x;return i&&"explode"===n||!i&&"implode"===n?"start":i&&"implode"===n||!i&&"explode"===n?"end":"middle"}var o={width:void 0,height:void 0,chartPadding:5,classNames:{chartPie:"ct-chart-pie",chartDonut:"ct-chart-donut",series:"ct-series",slicePie:"ct-slice-pie",sliceDonut:"ct-slice-donut",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelPosition:"inside",labelInterpolationFnc:n.noop,labelDirection:"neutral",reverseData:!1};n.Pie=n.Base.extend({constructor:function(t,e,i,r){n.Pie.super.constructor.call(this,t,e,o,n.extend({},o,i),r)},createChart:function(t){var e,r,s,a,l,c=[],u=t.startAngle,h=n.getDataArray(this.data,t.reverseData);this.svg=n.createSvg(this.container,t.width,t.height,t.donut?t.classNames.chartDonut:t.classNames.chartPie),r=n.createChartRect(this.svg,t,o.padding),s=Math.min(r.width()/2,r.height()/2),l=t.total||h.reduce(function(t,e){return t+e},0),s-=t.donut?t.donutWidth/2:0,a="outside"===t.labelPosition||t.donut?s:"center"===t.labelPosition?0:s/2,a+=t.labelOffset;var f={x:r.x1+r.width()/2,y:r.y2+r.height()/2},p=1===this.data.series.filter(function(t){return t.hasOwnProperty("value")?0!==t.value:0!==t}).length;t.showLabel&&(e=this.svg.elem("g",null,null,!0));for(var d=0;d<this.data.series.length;d++){var g=this.data.series[d];c[d]=this.svg.elem("g",null,null,!0),c[d].attr({"series-name":g.name},n.xmlNs.uri),c[d].addClass([t.classNames.series,g.className||t.classNames.series+"-"+n.alphaNumerate(d)].join(" "));var m=u+h[d]/l*360;m-u==360&&(m-=.01);var v=n.polarToCartesian(f.x,f.y,s,u-(0===d||p?0:.2)),b=n.polarToCartesian(f.x,f.y,s,m),y=new n.Svg.Path(!t.donut).move(b.x,b.y).arc(s,s,0,m-u>180,0,v.x,v.y);t.donut||y.line(f.x,f.y);var w=c[d].elem("path",{d:y.stringify()},t.donut?t.classNames.sliceDonut:t.classNames.slicePie);if(w.attr({value:h[d],meta:n.serialize(g.meta)},n.xmlNs.uri),t.donut&&w.attr({style:"stroke-width: "+ +t.donutWidth+"px"}),this.eventEmitter.emit("draw",{type:"slice",value:h[d],totalDataSum:l,index:d,meta:g.meta,series:g,group:c[d],element:w,path:y.clone(),center:f,radius:s,startAngle:u,endAngle:m}),t.showLabel){var x=n.polarToCartesian(f.x,f.y,a,u+(m-u)/2),E=t.labelInterpolationFnc(this.data.labels?this.data.labels[d]:h[d],d);if(E||0===E){var T=e.elem("text",{dx:x.x,dy:x.y,"text-anchor":i(f,x,t.labelDirection)},t.classNames.label).text(""+E);this.eventEmitter.emit("draw",{type:"label",index:d,group:e,element:T,text:""+E,x:x.x,y:x.y})}}u=m}this.eventEmitter.emit("created",{chartRect:r,svg:this.svg,options:t})},determineAnchorPosition:i})}(window,document,t),t});var Arrive=function(t,e,n){"use strict";function i(t,e,n){s.addMethod(e,n,t.unbindEvent),s.addMethod(e,n,t.unbindEventWithSelectorOrCallback),s.addMethod(e,n,t.unbindEventWithSelectorAndCallback)}function o(t){t.arrive=c.bindEvent,i(c,t,"unbindArrive"),t.leave=u.bindEvent,i(u,t,"unbindLeave")}if(t.MutationObserver&&"undefined"!=typeof HTMLElement){var r=0,s=(p=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector,{matchesSelector:function(t,e){return t instanceof HTMLElement&&p.call(t,e)},addMethod:function(t,e,i){var o=t[e];t[e]=function(){return i.length==arguments.length?i.apply(this,arguments):"function"==typeof o?o.apply(this,arguments):n}},callCallbacks:function(t,e){e&&e.options.onceOnly&&1==e.firedElems.length&&(t=[t[0]]);for(var n,i=0;n=t[i];i++)n&&n.callback&&n.callback.call(n.elem,n.elem);e&&e.options.onceOnly&&1==e.firedElems.length&&e.me.unbindEventWithSelectorAndCallback.call(e.target,e.selector,e.callback)},checkChildNodesRecursively:function(t,e,n,i){for(var o,r=0;o=t[r];r++)n(o,e,i)&&i.push({callback:e.callback,elem:o}),o.childNodes.length>0&&s.checkChildNodesRecursively(o.childNodes,e,n,i)},mergeArrays:function(t,e){var n,i={};for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&(i[n]=e[n]);return i},toElementsArray:function(e){return n===e||"number"==typeof e.length&&e!==t||(e=[e]),e}}),a=((f=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null}).prototype.addEvent=function(t,e,n,i){var o={target:t,selector:e,options:n,callback:i,firedElems:[]};return this._beforeAdding&&this._beforeAdding(o),this._eventsBucket.push(o),o},f.prototype.removeEvent=function(t){for(var e,n=this._eventsBucket.length-1;e=this._eventsBucket[n];n--)if(t(e)){this._beforeRemoving&&this._beforeRemoving(e);var i=this._eventsBucket.splice(n,1);i&&i.length&&(i[0].callback=null)}},f.prototype.beforeAdding=function(t){this._beforeAdding=t},f.prototype.beforeRemoving=function(t){this._beforeRemoving=t},f),l=function(e,i){var o=new a,r=this,l={fireOnAttributesModification:!1};return o.beforeAdding(function(n){var o,s=n.target;(s===t.document||s===t)&&(s=document.getElementsByTagName("html")[0]),o=new MutationObserver(function(t){i.call(this,t,n)});var a=e(n.options);o.observe(s,a),n.observer=o,n.me=r}),o.beforeRemoving(function(t){t.observer.disconnect()}),this.bindEvent=function(t,e,n){e=s.mergeArrays(l,e);for(var i=s.toElementsArray(this),r=0;r<i.length;r++)o.addEvent(i[r],t,e,n)},this.unbindEvent=function(){var t=s.toElementsArray(this);o.removeEvent(function(e){for(var i=0;i<t.length;i++)if(this===n||e.target===t[i])return!0;return!1})},this.unbindEventWithSelectorOrCallback=function(t){var e,i=s.toElementsArray(this),r=t;e="function"==typeof t?function(t){for(var e=0;e<i.length;e++)if((this===n||t.target===i[e])&&t.callback===r)return!0;return!1}:function(e){for(var o=0;o<i.length;o++)if((this===n||e.target===i[o])&&e.selector===t)return!0;return!1},o.removeEvent(e)},this.unbindEventWithSelectorAndCallback=function(t,e){var i=s.toElementsArray(this);o.removeEvent(function(o){for(var r=0;r<i.length;r++)if((this===n||o.target===i[r])&&o.selector===t&&o.callback===e)return!0;return!1})},this},c=new function(){function t(t,e){return!(!s.matchesSelector(t,e.selector)||(t._id===n&&(t._id=r++),-1!=e.firedElems.indexOf(t._id))||(e.firedElems.push(t._id),0))}var e={fireOnAttributesModification:!1,onceOnly:!1,existing:!1},i=(c=new l(function(t){var e={attributes:!1,childList:!0,subtree:!0};return t.fireOnAttributesModification&&(e.attributes=!0),e},function(e,n){e.forEach(function(e){var i=e.addedNodes,o=e.target,r=[];null!==i&&i.length>0?s.checkChildNodesRecursively(i,n,t,r):"attributes"===e.type&&t(o,n)&&r.push({callback:n.callback,elem:o}),s.callCallbacks(r,n)})})).bindEvent;return c.bindEvent=function(t,o,r){n===r?(r=o,o=e):o=s.mergeArrays(e,o);var a=s.toElementsArray(this);if(o.existing){for(var l=[],c=0;c<a.length;c++)for(var u=a[c].querySelectorAll(t),h=0;h<u.length;h++)l.push({callback:r,elem:u[h]});if(o.onceOnly&&l.length)return r.call(l[0].elem,l[0].elem);setTimeout(s.callCallbacks,1,l)}i.call(this,t,o,r)},c},u=new function(){function t(t,e){return s.matchesSelector(t,e.selector)}var e={},i=(u=new l(function(){return{childList:!0,subtree:!0}},function(e,n){e.forEach(function(e){var i=e.removedNodes,o=[];null!==i&&i.length>0&&s.checkChildNodesRecursively(i,n,t,o),s.callCallbacks(o,n)})})).bindEvent;return u.bindEvent=function(t,o,r){n===r?(r=o,o=e):o=s.mergeArrays(e,o),i.call(this,t,o,r)},u};e&&o(e.fn),o(HTMLElement.prototype),o(NodeList.prototype),o(HTMLCollection.prototype),o(HTMLDocument.prototype),o(Window.prototype);var h={};return i(c,h,"unbindAllArrive"),i(u,h,"unbindAllLeave"),h}var f,p}(window,"undefined"==typeof jQuery?null:jQuery,void 0);!function t(e,n,i){function o(s,a){if(!n[s]){if(!e[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(r)return r(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){var n=e[s][1][t];return o(n||t)},u,u.exports,t,e,n,i)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(t,e,n){"use strict";function i(t){t.fn.perfectScrollbar=function(t){return this.each(function(){if("object"==typeof t||void 0===t){var e=t;r.get(this)||o.initialize(this,e)}else{var n=t;"update"===n?o.update(this):"destroy"===n&&o.destroy(this)}})}}var o=t("../main"),r=t("../plugin/instances");if("function"==typeof define&&define.amd)define(["jquery"],i);else{var s=window.jQuery?window.jQuery:window.$;void 0!==s&&i(s)}e.exports=i},{"../main":7,"../plugin/instances":18}],2:[function(t,e,n){"use strict";n.add=function(t,e){var n,i,o;t.classList?t.classList.add(e):(i=e,(o=(n=t).className.split(" ")).indexOf(i)<0&&o.push(i),n.className=o.join(" "))},n.remove=function(t,e){var n,i,o,r;t.classList?t.classList.remove(e):(i=e,o=(n=t).className.split(" "),(r=o.indexOf(i))>=0&&o.splice(r,1),n.className=o.join(" "))},n.list=function(t){return t.classList?Array.prototype.slice.apply(t.classList):t.className.split(" ")}},{}],3:[function(t,e,n){"use strict";var i={e:function(t,e){var n=document.createElement(t);return n.className=e,n},appendTo:function(t,e){return e.appendChild(t),t}};i.css=function(t,e,n){return"object"==typeof e?function(t,e){for(var n in e){var i=e[n];"number"==typeof i&&(i=i.toString()+"px"),t.style[n]=i}return t}(t,e):void 0===n?(s=t,a=e,window.getComputedStyle(s)[a]):(i=t,o=e,"number"==typeof(r=n)&&(r=r.toString()+"px"),i.style[o]=r,i);var i,o,r,s,a},i.matches=function(t,e){return void 0!==t.matches?t.matches(e):void 0!==t.matchesSelector?t.matchesSelector(e):void 0!==t.webkitMatchesSelector?t.webkitMatchesSelector(e):void 0!==t.mozMatchesSelector?t.mozMatchesSelector(e):void 0!==t.msMatchesSelector?t.msMatchesSelector(e):void 0},i.remove=function(t){void 0!==t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)},i.queryChildren=function(t,e){return Array.prototype.filter.call(t.childNodes,function(t){return i.matches(t,e)})},e.exports=i},{}],4:[function(t,e,n){"use strict";var i=function(t){this.element=t,this.events={}};i.prototype.bind=function(t,e){void 0===this.events[t]&&(this.events[t]=[]),this.events[t].push(e),this.element.addEventListener(t,e,!1)},i.prototype.unbind=function(t,e){var n=void 0!==e;this.events[t]=this.events[t].filter(function(i){return!(!n||i===e)||(this.element.removeEventListener(t,i,!1),!1)},this)},i.prototype.unbindAll=function(){for(var t in this.events)this.unbind(t)};var o=function(){this.eventElements=[]};o.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return void 0===e&&(e=new i(t),this.eventElements.push(e)),e},o.prototype.bind=function(t,e,n){this.eventElement(t).bind(e,n)},o.prototype.unbind=function(t,e,n){this.eventElement(t).unbind(e,n)},o.prototype.unbindAll=function(){for(var t=0;t<this.eventElements.length;t++)this.eventElements[t].unbindAll()},o.prototype.once=function(t,e,n){var i=this.eventElement(t),o=function(t){i.unbind(e,o),n(t)};i.bind(e,o)},e.exports=o},{}],5:[function(t,e,n){"use strict";e.exports=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}()},{}],6:[function(t,e,n){"use strict";var i=t("./class"),o=t("./dom"),r=n.toInt=function(t){return parseInt(t,10)||0},s=n.clone=function(t){if(t){if(t.constructor===Array)return t.map(s);if("object"==typeof t){var e={};for(var n in t)e[n]=s(t[n]);return e}return t}return null};n.extend=function(t,e){var n=s(t);for(var i in e)n[i]=s(e[i]);return n},n.isEditable=function(t){return o.matches(t,"input,[contenteditable]")||o.matches(t,"select,[contenteditable]")||o.matches(t,"textarea,[contenteditable]")||o.matches(t,"button,[contenteditable]")},n.removePsClasses=function(t){for(var e=i.list(t),n=0;n<e.length;n++){var o=e[n];0===o.indexOf("ps-")&&i.remove(t,o)}},n.outerWidth=function(t){return r(o.css(t,"width"))+r(o.css(t,"paddingLeft"))+r(o.css(t,"paddingRight"))+r(o.css(t,"borderLeftWidth"))+r(o.css(t,"borderRightWidth"))},n.startScrolling=function(t,e){i.add(t,"ps-in-scrolling"),void 0!==e?i.add(t,"ps-"+e):(i.add(t,"ps-x"),i.add(t,"ps-y"))},n.stopScrolling=function(t,e){i.remove(t,"ps-in-scrolling"),void 0!==e?i.remove(t,"ps-"+e):(i.remove(t,"ps-x"),i.remove(t,"ps-y"))},n.env={isWebKit:"WebkitAppearance"in document.documentElement.style,supportsTouch:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsIePointer:null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(t,e,n){"use strict";var i=t("./plugin/destroy"),o=t("./plugin/initialize"),r=t("./plugin/update");e.exports={initialize:o,update:r,destroy:i}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(t,e,n){"use strict";e.exports={handlers:["click-rail","drag-scrollbar","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,useBothWheelAxes:!1,wheelPropagation:!1,wheelSpeed:1,theme:"default"}},{}],9:[function(t,e,n){"use strict";var i=t("../lib/helper"),o=t("../lib/dom"),r=t("./instances");e.exports=function(t){var e=r.get(t);e&&(e.event.unbindAll(),o.remove(e.scrollbarX),o.remove(e.scrollbarY),o.remove(e.scrollbarXRail),o.remove(e.scrollbarYRail),i.removePsClasses(t),r.remove(t))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(t,e,n){"use strict";var i=t("../instances"),o=t("../update-geometry"),r=t("../update-scroll");e.exports=function(t){!function(t,e){function n(t){return t.getBoundingClientRect()}var i=function(t){t.stopPropagation()};e.event.bind(e.scrollbarY,"click",i),e.event.bind(e.scrollbarYRail,"click",function(i){var s=i.pageY-window.pageYOffset-n(e.scrollbarYRail).top>e.scrollbarYTop?1:-1;r(t,"top",t.scrollTop+s*e.containerHeight),o(t),i.stopPropagation()}),e.event.bind(e.scrollbarX,"click",i),e.event.bind(e.scrollbarXRail,"click",function(i){var s=i.pageX-window.pageXOffset-n(e.scrollbarXRail).left>e.scrollbarXLeft?1:-1;r(t,"left",t.scrollLeft+s*e.containerWidth),o(t),i.stopPropagation()})}(t,i.get(t))}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(t,e,n){"use strict";function i(t,e){var n=null,i=null,o=function(o){(function(i){var o=n+i*e.railXRatio,s=Math.max(0,e.scrollbarXRail.getBoundingClientRect().left)+e.railXRatio*(e.railXWidth-e.scrollbarXWidth);e.scrollbarXLeft=o<0?0:o>s?s:o;var a=r.toInt(e.scrollbarXLeft*(e.contentWidth-e.containerWidth)/(e.containerWidth-e.railXRatio*e.scrollbarXWidth))-e.negativeScrollAdjustment;c(t,"left",a)})(o.pageX-i),l(t),o.stopPropagation(),o.preventDefault()},a=function(){r.stopScrolling(t,"x"),e.event.unbind(e.ownerDocument,"mousemove",o)};e.event.bind(e.scrollbarX,"mousedown",function(l){i=l.pageX,n=r.toInt(s.css(e.scrollbarX,"left"))*e.railXRatio,r.startScrolling(t,"x"),e.event.bind(e.ownerDocument,"mousemove",o),e.event.once(e.ownerDocument,"mouseup",a),l.stopPropagation(),l.preventDefault()})}function o(t,e){var n=null,i=null,o=function(o){(function(i){var o=n+i*e.railYRatio,s=Math.max(0,e.scrollbarYRail.getBoundingClientRect().top)+e.railYRatio*(e.railYHeight-e.scrollbarYHeight);e.scrollbarYTop=o<0?0:o>s?s:o;var a=r.toInt(e.scrollbarYTop*(e.contentHeight-e.containerHeight)/(e.containerHeight-e.railYRatio*e.scrollbarYHeight));c(t,"top",a)})(o.pageY-i),l(t),o.stopPropagation(),o.preventDefault()},a=function(){r.stopScrolling(t,"y"),e.event.unbind(e.ownerDocument,"mousemove",o)};e.event.bind(e.scrollbarY,"mousedown",function(l){i=l.pageY,n=r.toInt(s.css(e.scrollbarY,"top"))*e.railYRatio,r.startScrolling(t,"y"),e.event.bind(e.ownerDocument,"mousemove",o),e.event.once(e.ownerDocument,"mouseup",a),l.stopPropagation(),l.preventDefault()})}var r=t("../../lib/helper"),s=t("../../lib/dom"),a=t("../instances"),l=t("../update-geometry"),c=t("../update-scroll");e.exports=function(t){var e=a.get(t);i(t,e),o(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(t,e,n){"use strict";function i(t,e){var n=!1;e.event.bind(t,"mouseenter",function(){n=!0}),e.event.bind(t,"mouseleave",function(){n=!1});e.event.bind(e.ownerDocument,"keydown",function(i){if(!(i.isDefaultPrevented&&i.isDefaultPrevented()||i.defaultPrevented)){var s=r.matches(e.scrollbarX,":focus")||r.matches(e.scrollbarY,":focus");if(n||s){var c=document.activeElement?document.activeElement:e.ownerDocument.activeElement;if(c){if("IFRAME"===c.tagName)c=c.contentDocument.activeElement;else for(;c.shadowRoot;)c=c.shadowRoot.activeElement;if(o.isEditable(c))return}var u=0,h=0;switch(i.which){case 37:u=i.metaKey?-e.contentWidth:i.altKey?-e.containerWidth:-30;break;case 38:h=i.metaKey?e.contentHeight:i.altKey?e.containerHeight:30;break;case 39:u=i.metaKey?e.contentWidth:i.altKey?e.containerWidth:30;break;case 40:h=i.metaKey?-e.contentHeight:i.altKey?-e.containerHeight:-30;break;case 33:h=90;break;case 32:h=i.shiftKey?90:-90;break;case 34:h=-90;break;case 35:h=i.ctrlKey?-e.contentHeight:-e.containerHeight;break;case 36:h=i.ctrlKey?t.scrollTop:e.containerHeight;break;default:return}l(t,"top",t.scrollTop-h),l(t,"left",t.scrollLeft+u),a(t),function(n,i){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&i>0||o>=e.contentHeight-e.containerHeight&&i<0)return!e.settings.wheelPropagation}var r=t.scrollLeft;if(0===i){if(!e.scrollbarXActive)return!1;if(0===r&&n<0||r>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}(u,h)&&i.preventDefault()}}})}var o=t("../../lib/helper"),r=t("../../lib/dom"),s=t("../instances"),a=t("../update-geometry"),l=t("../update-scroll");e.exports=function(t){i(t,s.get(t))}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(t,e,n){"use strict";function i(t,e){function n(n){var o,a,l,c=(a=(o=n).deltaX,l=-1*o.deltaY,void 0!==a&&void 0!==l||(a=-1*o.wheelDeltaX/6,l=o.wheelDeltaY/6),o.deltaMode&&1===o.deltaMode&&(a*=10,l*=10),a!=a&&l!=l&&(a=0,l=o.wheelDelta),o.shiftKey?[-l,-a]:[a,l]),u=c[0],h=c[1];(function(e,n){var i=t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");if(i){if(!window.getComputedStyle(i).overflow.match(/(scroll|auto)/))return!1;var o=i.scrollHeight-i.clientHeight;if(o>0&&!(0===i.scrollTop&&n>0||i.scrollTop===o&&n<0))return!0;var r=i.scrollLeft-i.clientWidth;if(r>0&&!(0===i.scrollLeft&&e<0||i.scrollLeft===r&&e>0))return!0}return!1})(u,h)||(i=!1,e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(s(t,"top",h?t.scrollTop-h*e.settings.wheelSpeed:t.scrollTop+u*e.settings.wheelSpeed),i=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(s(t,"left",u?t.scrollLeft+u*e.settings.wheelSpeed:t.scrollLeft-h*e.settings.wheelSpeed),i=!0):(s(t,"top",t.scrollTop-h*e.settings.wheelSpeed),s(t,"left",t.scrollLeft+u*e.settings.wheelSpeed)),r(t),(i=i||function(n,i){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&i>0||o>=e.contentHeight-e.containerHeight&&i<0)return!e.settings.wheelPropagation}var r=t.scrollLeft;if(0===i){if(!e.scrollbarXActive)return!1;if(0===r&&n<0||r>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}(u,h))&&(n.stopPropagation(),n.preventDefault()))}var i=!1;void 0!==window.onwheel?e.event.bind(t,"wheel",n):void 0!==window.onmousewheel&&e.event.bind(t,"mousewheel",n)}var o=t("../instances"),r=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){i(t,o.get(t))}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(t,e,n){"use strict";var i=t("../instances"),o=t("../update-geometry");e.exports=function(t){var e,n=i.get(t);e=t,n.event.bind(e,"scroll",function(){o(e)})}},{"../instances":18,"../update-geometry":19}],15:[function(t,e,n){"use strict";function i(t,e){function n(){i&&(clearInterval(i),i=null),o.stopScrolling(t)}var i=null,l={top:0,left:0},c=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){var e;t.contains(0===(e=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"").toString().length?null:e.getRangeAt(0).commonAncestorContainer)?c=!0:(c=!1,n())}),e.event.bind(window,"mouseup",function(){c&&(c=!1,n())}),e.event.bind(window,"keyup",function(){c&&(c=!1,n())}),e.event.bind(window,"mousemove",function(e){if(c){var u=e.pageX,h=e.pageY,f=t.offsetLeft,p=t.offsetLeft+t.offsetWidth,d=t.offsetTop,g=t.offsetTop+t.offsetHeight;u<f+3?(l.left=-5,o.startScrolling(t,"x")):u>p-3?(l.left=5,o.startScrolling(t,"x")):l.left=0,h<d+3?(l.top=d+3-h<5?-5:-20,o.startScrolling(t,"y")):h>g-3?(l.top=h-g+3<5?5:20,o.startScrolling(t,"y")):l.top=0,0===l.top&&0===l.left?n():i||(i=setInterval(function(){return r.get(t)?(a(t,"top",t.scrollTop+l.top),a(t,"left",t.scrollLeft+l.left),void s(t)):void clearInterval(i)},50))}})}var o=t("../../lib/helper"),r=t("../instances"),s=t("../update-geometry"),a=t("../update-scroll");e.exports=function(t){i(t,r.get(t))}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(t,e,n){"use strict";function i(t,e,n,i){function o(e,n){a(t,"top",t.scrollTop-n),a(t,"left",t.scrollLeft-e),s(t)}function l(){y=!0}function c(){y=!1}function u(t){return t.targetTouches?t.targetTouches[0]:t}function h(t){return!(!t.targetTouches||1!==t.targetTouches.length)||!(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE)}function f(t){if(h(t)){w=!0;var e=u(t);g.pageX=e.pageX,g.pageY=e.pageY,m=(new Date).getTime(),null!==b&&clearInterval(b),t.stopPropagation()}}function p(n){if(!w&&e.settings.swipePropagation&&f(n),!y&&w&&h(n)){var i=u(n),r={pageX:i.pageX,pageY:i.pageY},s=r.pageX-g.pageX,a=r.pageY-g.pageY;o(s,a),g=r;var l=(new Date).getTime(),c=l-m;c>0&&(v.x=s/c,v.y=a/c,m=l),function(n,i){var o=t.scrollTop,r=t.scrollLeft,s=Math.abs(n),a=Math.abs(i);if(a>s){if(i<0&&o===e.contentHeight-e.containerHeight||i>0&&0===o)return!e.settings.swipePropagation}else if(s>a&&(n<0&&r===e.contentWidth-e.containerWidth||n>0&&0===r))return!e.settings.swipePropagation;return!0}(s,a)&&(n.stopPropagation(),n.preventDefault())}}function d(){!y&&w&&(w=!1,clearInterval(b),b=setInterval(function(){return r.get(t)&&(v.x||v.y)?Math.abs(v.x)<.01&&Math.abs(v.y)<.01?void clearInterval(b):(o(30*v.x,30*v.y),v.x*=.8,void(v.y*=.8)):void clearInterval(b)},10))}var g={},m=0,v={},b=null,y=!1,w=!1;n&&(e.event.bind(window,"touchstart",l),e.event.bind(window,"touchend",c),e.event.bind(t,"touchstart",f),e.event.bind(t,"touchmove",p),e.event.bind(t,"touchend",d)),i&&(window.PointerEvent?(e.event.bind(window,"pointerdown",l),e.event.bind(window,"pointerup",c),e.event.bind(t,"pointerdown",f),e.event.bind(t,"pointermove",p),e.event.bind(t,"pointerup",d)):window.MSPointerEvent&&(e.event.bind(window,"MSPointerDown",l),e.event.bind(window,"MSPointerUp",c),e.event.bind(t,"MSPointerDown",f),e.event.bind(t,"MSPointerMove",p),e.event.bind(t,"MSPointerUp",d)))}var o=t("../../lib/helper"),r=t("../instances"),s=t("../update-geometry"),a=t("../update-scroll");e.exports=function(t){(o.env.supportsTouch||o.env.supportsIePointer)&&i(t,r.get(t),o.env.supportsTouch,o.env.supportsIePointer)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(t,e,n){"use strict";var i=t("../lib/helper"),o=t("../lib/class"),r=t("./instances"),s=t("./update-geometry"),a={"click-rail":t("./handler/click-rail"),"drag-scrollbar":t("./handler/drag-scrollbar"),keyboard:t("./handler/keyboard"),wheel:t("./handler/mouse-wheel"),touch:t("./handler/touch"),selection:t("./handler/selection")},l=t("./handler/native-scroll");e.exports=function(t,e){e="object"==typeof e?e:{},o.add(t,"ps-container");var n=r.add(t);n.settings=i.extend(n.settings,e),o.add(t,"ps-theme-"+n.settings.theme),n.settings.handlers.forEach(function(e){a[e](t)}),l(t),s(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(t,e,n){"use strict";function i(t){return t.getAttribute("data-ps-id")}var o=t("../lib/helper"),r=t("../lib/class"),s=t("./default-setting"),a=t("../lib/dom"),l=t("../lib/event-manager"),c=t("../lib/guid"),u={};n.add=function(t){var e,n=c();return e=n,t.setAttribute("data-ps-id",e),u[n]=new function(t){function e(){r.add(t,"ps-focus")}function n(){r.remove(t,"ps-focus")}var i,c,u=this;u.settings=o.clone(s),u.containerWidth=null,u.containerHeight=null,u.contentWidth=null,u.contentHeight=null,u.isRtl="rtl"===a.css(t,"direction"),u.isNegativeScroll=(c=t.scrollLeft,t.scrollLeft=-1,i=t.scrollLeft<0,t.scrollLeft=c,i),u.negativeScrollAdjustment=u.isNegativeScroll?t.scrollWidth-t.clientWidth:0,u.event=new l,u.ownerDocument=t.ownerDocument||document,u.scrollbarXRail=a.appendTo(a.e("div","ps-scrollbar-x-rail"),t),u.scrollbarX=a.appendTo(a.e("div","ps-scrollbar-x"),u.scrollbarXRail),u.scrollbarX.setAttribute("tabindex",0),u.event.bind(u.scrollbarX,"focus",e),u.event.bind(u.scrollbarX,"blur",n),u.scrollbarXActive=null,u.scrollbarXWidth=null,u.scrollbarXLeft=null,u.scrollbarXBottom=o.toInt(a.css(u.scrollbarXRail,"bottom")),u.isScrollbarXUsingBottom=u.scrollbarXBottom==u.scrollbarXBottom,u.scrollbarXTop=u.isScrollbarXUsingBottom?null:o.toInt(a.css(u.scrollbarXRail,"top")),u.railBorderXWidth=o.toInt(a.css(u.scrollbarXRail,"borderLeftWidth"))+o.toInt(a.css(u.scrollbarXRail,"borderRightWidth")),a.css(u.scrollbarXRail,"display","block"),u.railXMarginWidth=o.toInt(a.css(u.scrollbarXRail,"marginLeft"))+o.toInt(a.css(u.scrollbarXRail,"marginRight")),a.css(u.scrollbarXRail,"display",""),u.railXWidth=null,u.railXRatio=null,u.scrollbarYRail=a.appendTo(a.e("div","ps-scrollbar-y-rail"),t),u.scrollbarY=a.appendTo(a.e("div","ps-scrollbar-y"),u.scrollbarYRail),u.scrollbarY.setAttribute("tabindex",0),u.event.bind(u.scrollbarY,"focus",e),u.event.bind(u.scrollbarY,"blur",n),u.scrollbarYActive=null,u.scrollbarYHeight=null,u.scrollbarYTop=null,u.scrollbarYRight=o.toInt(a.css(u.scrollbarYRail,"right")),u.isScrollbarYUsingRight=u.scrollbarYRight==u.scrollbarYRight,u.scrollbarYLeft=u.isScrollbarYUsingRight?null:o.toInt(a.css(u.scrollbarYRail,"left")),u.scrollbarYOuterWidth=u.isRtl?o.outerWidth(u.scrollbarY):null,u.railBorderYWidth=o.toInt(a.css(u.scrollbarYRail,"borderTopWidth"))+o.toInt(a.css(u.scrollbarYRail,"borderBottomWidth")),a.css(u.scrollbarYRail,"display","block"),u.railYMarginHeight=o.toInt(a.css(u.scrollbarYRail,"marginTop"))+o.toInt(a.css(u.scrollbarYRail,"marginBottom")),a.css(u.scrollbarYRail,"display",""),u.railYHeight=null,u.railYRatio=null}(t),u[n]},n.remove=function(t){delete u[i(t)],t.removeAttribute("data-ps-id")},n.get=function(t){return u[i(t)]}},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(t,e,n){"use strict";function i(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}var o=t("../lib/helper"),r=t("../lib/class"),s=t("../lib/dom"),a=t("./instances"),l=t("./update-scroll");e.exports=function(t){var e,n=a.get(t);n.containerWidth=t.clientWidth,n.containerHeight=t.clientHeight,n.contentWidth=t.scrollWidth,n.contentHeight=t.scrollHeight,t.contains(n.scrollbarXRail)||((e=s.queryChildren(t,".ps-scrollbar-x-rail")).length>0&&e.forEach(function(t){s.remove(t)}),s.appendTo(n.scrollbarXRail,t)),t.contains(n.scrollbarYRail)||((e=s.queryChildren(t,".ps-scrollbar-y-rail")).length>0&&e.forEach(function(t){s.remove(t)}),s.appendTo(n.scrollbarYRail,t)),!n.settings.suppressScrollX&&n.containerWidth+n.settings.scrollXMarginOffset<n.contentWidth?(n.scrollbarXActive=!0,n.railXWidth=n.containerWidth-n.railXMarginWidth,n.railXRatio=n.containerWidth/n.railXWidth,n.scrollbarXWidth=i(n,o.toInt(n.railXWidth*n.containerWidth/n.contentWidth)),n.scrollbarXLeft=o.toInt((n.negativeScrollAdjustment+t.scrollLeft)*(n.railXWidth-n.scrollbarXWidth)/(n.contentWidth-n.containerWidth))):n.scrollbarXActive=!1,!n.settings.suppressScrollY&&n.containerHeight+n.settings.scrollYMarginOffset<n.contentHeight?(n.scrollbarYActive=!0,n.railYHeight=n.containerHeight-n.railYMarginHeight,n.railYRatio=n.containerHeight/n.railYHeight,n.scrollbarYHeight=i(n,o.toInt(n.railYHeight*n.containerHeight/n.contentHeight)),n.scrollbarYTop=o.toInt(t.scrollTop*(n.railYHeight-n.scrollbarYHeight)/(n.contentHeight-n.containerHeight))):n.scrollbarYActive=!1,n.scrollbarXLeft>=n.railXWidth-n.scrollbarXWidth&&(n.scrollbarXLeft=n.railXWidth-n.scrollbarXWidth),n.scrollbarYTop>=n.railYHeight-n.scrollbarYHeight&&(n.scrollbarYTop=n.railYHeight-n.scrollbarYHeight),function(t,e){var n={width:e.railXWidth};e.isRtl?n.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth-e.contentWidth:n.left=t.scrollLeft,e.isScrollbarXUsingBottom?n.bottom=e.scrollbarXBottom-t.scrollTop:n.top=e.scrollbarXTop+t.scrollTop,s.css(e.scrollbarXRail,n);var i={top:t.scrollTop,height:e.railYHeight};e.isScrollbarYUsingRight?e.isRtl?i.right=e.contentWidth-(e.negativeScrollAdjustment+t.scrollLeft)-e.scrollbarYRight-e.scrollbarYOuterWidth:i.right=e.scrollbarYRight-t.scrollLeft:e.isRtl?i.left=e.negativeScrollAdjustment+t.scrollLeft+2*e.containerWidth-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:i.left=e.scrollbarYLeft+t.scrollLeft,s.css(e.scrollbarYRail,i),s.css(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),s.css(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}(t,n),n.scrollbarXActive?r.add(t,"ps-active-x"):(r.remove(t,"ps-active-x"),n.scrollbarXWidth=0,n.scrollbarXLeft=0,l(t,"left",0)),n.scrollbarYActive?r.add(t,"ps-active-y"):(r.remove(t,"ps-active-y"),n.scrollbarYHeight=0,n.scrollbarYTop=0,l(t,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(t,e,n){"use strict";var i,o,r=t("./instances"),s=function(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e};e.exports=function(t,e,n){if(void 0===t)throw"You must provide an element to the update-scroll function";if(void 0===e)throw"You must provide an axis to the update-scroll function";if(void 0===n)throw"You must provide a value to the update-scroll function";"top"===e&&n<=0&&(t.scrollTop=n=0,t.dispatchEvent(s("ps-y-reach-start"))),"left"===e&&n<=0&&(t.scrollLeft=n=0,t.dispatchEvent(s("ps-x-reach-start")));var a=r.get(t);"top"===e&&n>=a.contentHeight-a.containerHeight&&((n=a.contentHeight-a.containerHeight)-t.scrollTop<=1?n=t.scrollTop:t.scrollTop=n,t.dispatchEvent(s("ps-y-reach-end"))),"left"===e&&n>=a.contentWidth-a.containerWidth&&((n=a.contentWidth-a.containerWidth)-t.scrollLeft<=1?n=t.scrollLeft:t.scrollLeft=n,t.dispatchEvent(s("ps-x-reach-end"))),i||(i=t.scrollTop),o||(o=t.scrollLeft),"top"===e&&n<i&&t.dispatchEvent(s("ps-scroll-up")),"top"===e&&n>i&&t.dispatchEvent(s("ps-scroll-down")),"left"===e&&n<o&&t.dispatchEvent(s("ps-scroll-left")),"left"===e&&n>o&&t.dispatchEvent(s("ps-scroll-right")),"top"===e&&(t.scrollTop=i=n,t.dispatchEvent(s("ps-scroll-y"))),"left"===e&&(t.scrollLeft=o=n,t.dispatchEvent(s("ps-scroll-x")))}},{"./instances":18}],21:[function(t,e,n){"use strict";var i=t("../lib/helper"),o=t("../lib/dom"),r=t("./instances"),s=t("./update-geometry"),a=t("./update-scroll");e.exports=function(t){var e=r.get(t);e&&(e.negativeScrollAdjustment=e.isNegativeScroll?t.scrollWidth-t.clientWidth:0,o.css(e.scrollbarXRail,"display","block"),o.css(e.scrollbarYRail,"display","block"),e.railXMarginWidth=i.toInt(o.css(e.scrollbarXRail,"marginLeft"))+i.toInt(o.css(e.scrollbarXRail,"marginRight")),e.railYMarginHeight=i.toInt(o.css(e.scrollbarYRail,"marginTop"))+i.toInt(o.css(e.scrollbarYRail,"marginBottom")),o.css(e.scrollbarXRail,"display","none"),o.css(e.scrollbarYRail,"display","none"),s(t),a(t,"top",t.scrollTop),a(t,"left",t.scrollLeft),o.css(e.scrollbarXRail,"display",""),o.css(e.scrollbarYRail,"display",""))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?t(require("jquery")):t(jQuery)}(function(t){var e={element:"body",position:null,type:"info",allow_dismiss:!0,allow_duplicates:!0,newest_on_top:!1,showProgressbar:!1,placement:{from:"top",align:"right"},offset:20,spacing:10,z_index:1031,delay:5e3,timer:1e3,url_target:"_blank",mouse_over:null,animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"},onShow:null,onShown:null,onClose:null,onClosed:null,icon_type:"class",template:'<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><i data-notify="icon" class="material-icons"></i><span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'};function n(n,i,o){var r,s,a={content:{message:"object"==typeof i?i.message:i,title:i.title?i.title:"",icon:i.icon?i.icon:"",url:i.url?i.url:"#",target:i.target?i.target:"-"}};o=t.extend(!0,{},a,o),this.settings=t.extend(!0,{},e,o),this._defaults=e,"-"===this.settings.content.target&&(this.settings.content.target=this.settings.url_target),this.animations={start:"webkitAnimationStart oanimationstart MSAnimationStart animationstart",end:"webkitAnimationEnd oanimationend MSAnimationEnd animationend"},"number"==typeof this.settings.offset&&(this.settings.offset={x:this.settings.offset,y:this.settings.offset}),(this.settings.allow_duplicates||!this.settings.allow_duplicates&&(r=this,s=!1,t('[data-notify="container"]').each(function(e,n){var i=t(n),o=i.find('[data-notify="title"]').text().trim(),a=i.find('[data-notify="message"]').html().trim(),l=o===t("<div>"+r.settings.content.title+"</div>").html().trim(),c=a===t("<div>"+r.settings.content.message+"</div>").html().trim(),u=i.hasClass("alert-"+r.settings.type);return l&&c&&u&&(s=!0),!s}),!s))&&this.init()}String.format=function(){for(var t=arguments[0],e=1;e<arguments.length;e++)t=t.replace(RegExp("\\{"+(e-1)+"\\}","gm"),arguments[e]);return t},t.extend(n.prototype,{init:function(){var t=this;this.buildNotify(),this.settings.content.icon&&this.setIcon(),"#"!=this.settings.content.url&&this.styleURL(),this.styleDismiss(),this.placement(),this.bind(),this.notify={$ele:this.$ele,update:function(e,n){var i={};"string"==typeof e?i[e]=n:i=e;for(var o in i)switch(o){case"type":this.$ele.removeClass("alert-"+t.settings.type),this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-"+t.settings.type),t.settings.type=i[o],this.$ele.addClass("alert-"+i[o]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-"+i[o]);break;case"icon":var r=this.$ele.find('[data-notify="icon"]');"class"===t.settings.icon_type.toLowerCase()?r.html(i[o]):(r.is("img")||r.find("img"),r.attr("src",i[o]));break;case"progress":var s=t.settings.delay-t.settings.delay*(i[o]/100);this.$ele.data("notify-delay",s),this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow",i[o]).css("width",i[o]+"%");break;case"url":this.$ele.find('[data-notify="url"]').attr("href",i[o]);break;case"target":this.$ele.find('[data-notify="url"]').attr("target",i[o]);break;default:this.$ele.find('[data-notify="'+o+'"]').html(i[o])}var a=this.$ele.outerHeight()+parseInt(t.settings.spacing)+parseInt(t.settings.offset.y);t.reposition(a)},close:function(){t.close()}}},buildNotify:function(){var e=this.settings.content;this.$ele=t(String.format(this.settings.template,this.settings.type,e.title,e.message,e.url,e.target)),this.$ele.attr("data-notify-position",this.settings.placement.from+"-"+this.settings.placement.align),this.settings.allow_dismiss||this.$ele.find('[data-notify="dismiss"]').css("display","none"),(this.settings.delay<=0&&!this.settings.showProgressbar||!this.settings.showProgressbar)&&this.$ele.find('[data-notify="progressbar"]').remove()},setIcon:function(){this.$ele.addClass("alert-with-icon"),"class"===this.settings.icon_type.toLowerCase()?this.$ele.find('[data-notify="icon"]').html(this.settings.content.icon):this.$ele.find('[data-notify="icon"]').is("img")?this.$ele.find('[data-notify="icon"]').attr("src",this.settings.content.icon):this.$ele.find('[data-notify="icon"]').append('<img src="'+this.settings.content.icon+'" alt="Notify Icon" />')},styleDismiss:function(){this.$ele.find('[data-notify="dismiss"]').css({position:"absolute",right:"10px",top:"50%",marginTop:"-13px",zIndex:this.settings.z_index+2})},styleURL:function(){this.$ele.find('[data-notify="url"]').css({backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",height:"100%",left:0,position:"absolute",top:0,width:"100%",zIndex:this.settings.z_index+1})},placement:function(){var e=this,n=this.settings.offset.y,i={display:"inline-block",margin:"0px auto",position:this.settings.position?this.settings.position:"body"===this.settings.element?"fixed":"absolute",transition:"all .5s ease-in-out",zIndex:this.settings.z_index},o=!1,r=this.settings;switch(t('[data-notify-position="'+this.settings.placement.from+"-"+this.settings.placement.align+'"]:not([data-closing="true"])').each(function(){n=Math.max(n,parseInt(t(this).css(r.placement.from))+parseInt(t(this).outerHeight())+parseInt(r.spacing))}),!0===this.settings.newest_on_top&&(n=this.settings.offset.y),i[this.settings.placement.from]=n+"px",this.settings.placement.align){case"left":case"right":i[this.settings.placement.align]=this.settings.offset.x+"px";break;case"center":i.left=0,i.right=0}this.$ele.css(i).addClass(this.settings.animate.enter),t.each(Array("webkit-","moz-","o-","ms-",""),function(t,n){e.$ele[0].style[n+"AnimationIterationCount"]=1}),t(this.settings.element).append(this.$ele),!0===this.settings.newest_on_top&&(n=parseInt(n)+parseInt(this.settings.spacing)+this.$ele.outerHeight(),this.reposition(n)),t.isFunction(e.settings.onShow)&&e.settings.onShow.call(this.$ele),this.$ele.one(this.animations.start,function(){o=!0}).one(this.animations.end,function(){t.isFunction(e.settings.onShown)&&e.settings.onShown.call(this)}),setTimeout(function(){o||t.isFunction(e.settings.onShown)&&e.settings.onShown.call(this)},600)},bind:function(){var e=this;if(this.$ele.find('[data-notify="dismiss"]').on("click",function(){e.close()}),this.$ele.mouseover(function(){t(this).data("data-hover","true")}).mouseout(function(){t(this).data("data-hover","false")}),this.$ele.data("data-hover","false"),this.settings.delay>0){e.$ele.data("notify-delay",e.settings.delay);var n=setInterval(function(){var t=parseInt(e.$ele.data("notify-delay"))-e.settings.timer;if("false"===e.$ele.data("data-hover")&&"pause"===e.settings.mouse_over||"pause"!=e.settings.mouse_over){var i=(e.settings.delay-t)/e.settings.delay*100;e.$ele.data("notify-delay",t),e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow",i).css("width",i+"%")}t<=-e.settings.timer&&(clearInterval(n),e.close())},e.settings.timer)}},close:function(){var e=this,n=parseInt(this.$ele.css(this.settings.placement.from)),i=!1;this.$ele.data("closing","true").addClass(this.settings.animate.exit),e.reposition(n),t.isFunction(e.settings.onClose)&&e.settings.onClose.call(this.$ele),this.$ele.one(this.animations.start,function(){i=!0}).one(this.animations.end,function(){t(this).remove(),t.isFunction(e.settings.onClosed)&&e.settings.onClosed.call(this)}),setTimeout(function(){i||(e.$ele.remove(),e.settings.onClosed&&e.settings.onClosed(e.$ele))},600)},reposition:function(e){var n=this,i='[data-notify-position="'+this.settings.placement.from+"-"+this.settings.placement.align+'"]:not([data-closing="true"])',o=this.$ele.nextAll(i);!0===this.settings.newest_on_top&&(o=this.$ele.prevAll(i)),o.each(function(){t(this).css(n.settings.placement.from,e),e=parseInt(e)+parseInt(n.settings.spacing)+t(this).outerHeight()})}}),t.notify=function(t,e){return new n(this,t,e).notify},t.notifyDefaults=function(n){return e=t.extend(!0,{},e,n)},t.notifyClose=function(e){void 0===e||"all"===e?t("[data-notify]").find('[data-notify="dismiss"]').trigger("click"):t('[data-notify-position="'+e+'"]').find('[data-notify="dismiss"]').trigger("click")}}),window.google=window.google||{},google.maps=google.maps||{},function(){var t=google.maps.modules={};google.maps.__gjsload__=function(e,n){t[e]=n},google.maps.Load=function(t){delete google.maps.Load,t([.009999999776482582,[null,[["https://khms0.googleapis.com/kh?v=748&hl=vi&","https://khms1.googleapis.com/kh?v=748&hl=vi&"],null,null,null,1,"748",["https://khms0.google.com/kh?v=748&hl=vi&","https://khms1.google.com/kh?v=748&hl=vi&"]],null,null,null,null,[["https://cbks0.googleapis.com/cbk?","https://cbks1.googleapis.com/cbk?"]],[["https://khms0.googleapis.com/kh?v=112&hl=vi&","https://khms1.googleapis.com/kh?v=112&hl=vi&"],null,null,null,null,"112",["https://khms0.google.com/kh?v=112&hl=vi&","https://khms1.google.com/kh?v=112&hl=vi&"]],[["https://mts0.googleapis.com/mapslt?hl=vi&","https://mts1.googleapis.com/mapslt?hl=vi&"]],null,null,null,[["https://mts0.googleapis.com/mapslt?hl=vi&","https://mts1.googleapis.com/mapslt?hl=vi&"]]],["vi","US",null,0,null,null,"https://maps.gstatic.com/mapfiles/","https://csi.gstatic.com","https://maps.googleapis.com","https://maps.googleapis.com",null,"https://maps.google.com","https://gg.google.com","https://maps.gstatic.com/maps-api-v3/api/images/","https://www.google.com/maps",0,"https://www.google.com"],["https://maps.googleapis.com/maps-api-v3/api/js/31/6/intl/vi_ALL","3.31.6"],[4158212174],1,null,null,null,null,null,"",null,null,1,"https://khms.googleapis.com/mz?v=748&","YOUR_KEY_HERE","https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"https://mts.googleapis.com/maps/vt/icon",[["https://maps.googleapis.com/maps/vt"],["https://maps.googleapis.com/maps/vt"],null,null,null,null,null,null,null,null,null,null,["https://www.google.com/maps/vt"],"/maps/vt",408e6,408],2,500,[null,null,null,null,"https://www.google.com/maps/preview/log204","","https://static.panoramio.com.storage.googleapis.com/photos/",["https://geo0.ggpht.com/cbk","https://geo1.ggpht.com/cbk","https://geo2.ggpht.com/cbk","https://geo3.ggpht.com/cbk"],"https://maps.googleapis.com/maps/api/js/GeoPhotoService.GetMetadata","https://maps.googleapis.com/maps/api/js/GeoPhotoService.SingleImageSearch",["https://lh3.ggpht.com/","https://lh4.ggpht.com/","https://lh5.ggpht.com/","https://lh6.ggpht.com/"]],null,null,null,null,"/maps/api/js/ApplicationService.GetEntityDetails",0,null,null,[null,null,null,null,null,null,null,null,null,[0,0]],null,[],["31.6"]],e)};var e=(new Date).getTime()}(),function(t){var e,n,i,o,r,s,a,l,c,u,h,f,p,d,g,m,v,b,y,w,x,E,T,S,C,A,L,k,O,I,N,_,R,M,D,j,$,P,W,F,H,B,z,X,Y,U,q,V,G,K,Q,J,Z,tt,et,nt,it,ot,rt,st,at,lt,ct,ut,ht,ft,pt,dt,gt,mt,vt,bt,yt,wt,xt,Et,Tt,St,Ct,At,Lt,kt,Ot,It,Nt,_t,Rt,Mt,Dt,jt,$t,Pt,Wt,Ft,Ht,Bt,zt,Xt,Yt,Ut,qt,Vt,Gt,Kt,Qt,Jt,Zt,te,ee,ne,ie,oe,re,se,ae,le,ce,ue,he,fe,pe,de,ge,me,ve,be,ye,we,xe,Ee,Te,Se,Ce;if(t.ba="ERROR",t.ca="INVALID_REQUEST",t.da="MAX_DIMENSIONS_EXCEEDED",t.ea="MAX_ELEMENTS_EXCEEDED",t.fa="MAX_WAYPOINTS_EXCEEDED",t.ha="NOT_FOUND",t.ia="OK",t.ka="OVER_QUERY_LIMIT",t.la="REQUEST_DENIED",t.ma="UNKNOWN_ERROR",t.na="ZERO_RESULTS",t.oa=function(){return function(t){return t}},t.k=function(){return function(){}},t.pa=function(t){return function(e){this[t]=e}},t.qa=function(t){return function(){return this[t]}},t.ra=function(t){return function(){return t}},t.ua=function(e){return function(){return t.sa[e].apply(this,arguments)}},e=function(){e=t.k(),t.wa.Symbol||(t.wa.Symbol=we)},n=function(){e();var o=t.wa.Symbol.iterator;o||(o=t.wa.Symbol.iterator=t.wa.Symbol("iterator")),"function"!=typeof Array.prototype[o]&&ye(Array.prototype,o,{configurable:!0,writable:!0,value:function(){return i(this)}}),n=t.k()},i=function(t){var e=0;return o(function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}})},o=function(e){return n(),(e={next:e})[t.wa.Symbol.iterator]=function(){return this},e},t.Ca=function(t){n();var e=t[window.Symbol.iterator];return e?e.call(t):i(t)},r=function(e,n){if(n){var i=t.wa;e=e.split(".");for(var o=0;o<e.length-1;o++){var r=e[o];r in i||(i[r]={}),i=i[r]}(n=n(o=i[e=e[e.length-1]]))!=o&&null!=n&&ye(i,e,{configurable:!0,writable:!0,value:n})}},s=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},t.p=function(t){return void 0!==t},t.Fa=function(t){return"string"==typeof t},t.Ga=function(t){return"number"==typeof t},t.Ha=t.k(),t.Ia=function(t){var e=typeof t;if("object"==e){if(!t)return"null";if(t instanceof Array)return"array";if(t instanceof Object)return e;var n=Object.prototype.toString.call(t);if("[object Window]"==n)return"object";if("[object Array]"==n||"number"==typeof t.length&&void 0!==t.splice&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("splice"))return"array";if("[object Function]"==n||void 0!==t.call&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("call"))return"function"}else if("function"==e&&void 0===t.call)return"object";return e},t.Ja=function(e){return"array"==t.Ia(e)},t.Ka=function(e){var n=t.Ia(e);return"array"==n||"object"==n&&"number"==typeof e.length},t.La=function(e){return"function"==t.Ia(e)},t.Ma=function(t){var e=typeof t;return"object"==e&&null!=t||"function"==e},t.Pa=function(t){return t[xe]||(t[xe]=++Ee)},a=function(t,e,n){return t.call.apply(t.bind,arguments)},l=function(t,e,n){if(!t)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,i),t.apply(e,n)}}return function(){return t.apply(e,arguments)}},t.t=function(e,n,i){return Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?t.t=a:t.t=l,t.t.apply(null,arguments)},t.Sa=function(){return+new Date},t.v=function(t,e){function n(){}n.prototype=e.prototype,t.vb=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.af=function(t,n,i){for(var o=Array(arguments.length-2),r=2;r<arguments.length;r++)o[r-2]=arguments[r];e.prototype[n].apply(t,o)}},t.Ta=function(e,n,i){if(i=null==i?0:0>i?Math.max(0,e.length+i):i,t.Fa(e))return t.Fa(n)&&1==n.length?e.indexOf(n,i):-1;for(;i<e.length;i++)if(i in e&&e[i]===n)return i;return-1},t.x=function(e,n,i){for(var o=e.length,r=t.Fa(e)?e.split(""):e,s=0;s<o;s++)s in r&&n.call(i,r[s],s,e)},c=function(e,n){for(var i=e.length,o=t.Fa(e)?e.split(""):e,r=0;r<i;r++)if(r in o&&n.call(void 0,o[r],r,e))return r;return-1},t.Wa=function(e,n){var i;return(i=0<=(n=t.Ta(e,n)))&&t.Va(e,n),i},t.Va=function(t,e){Array.prototype.splice.call(t,e,1)},t.Xa=function(t,e,n){return 2>=arguments.length?Array.prototype.slice.call(t,e):Array.prototype.slice.call(t,e,n)},t.Za=function(){return-1!=t.Ya.toLowerCase().indexOf("webkit")},t.$a=function(e){return-1!=t.Ya.indexOf(e)},t.ab=function(t,e,n){for(var i in t)e.call(n,t[i],i,t)},t.bb=function(){return t.$a("Trident")||t.$a("MSIE")},t.eb=function(){return t.$a("Safari")&&!(u()||t.$a("Coast")||t.$a("Opera")||t.$a("Edge")||t.$a("Silk")||t.$a("Android"))},u=function(){return(t.$a("Chrome")||t.$a("CriOS"))&&!t.$a("Edge")},t.fb=function(){return t.$a("Android")&&!(u()||t.$a("Firefox")||t.$a("Opera")||t.$a("Silk"))},t.gb=function(){return t.$a("iPhone")&&!t.$a("iPod")&&!t.$a("iPad")},t.hb=function(e){return t.hb[" "](e),e},h=function(){var e=t.ib.document;return e?e.documentMode:void 0},f=function(t,e){this.j=t,this.l=e,this.f=0,this.b=null},t.lb=t.oa(),p=function(e){t.ib.setTimeout(function(){throw e},0)},d=function(){var e=t.nb.f;e=We(e),!t.La(t.ib.setImmediate)||t.ib.Window&&t.ib.Window.prototype&&!t.$a("Edge")&&t.ib.Window.prototype.setImmediate==t.ib.setImmediate?(De||(De=g()),De(e)):t.ib.setImmediate(e)},g=function(){var e=t.ib.MessageChannel;if(void 0===e&&"undefined"!=typeof window&&window.postMessage&&window.addEventListener&&!t.$a("Presto")&&(e=function(){var e=window.document.createElement("IFRAME");e.style.display="none",e.src="",window.document.documentElement.appendChild(e);var n=e.contentWindow;(e=n.document).open(),e.write(""),e.close();var i="callImmediate"+Math.random(),o="file:"==n.location.protocol?"*":n.location.protocol+"//"+n.location.host;e=(0,t.t)(function(t){"*"!=o&&t.origin!=o||t.data!=i||this.port1.onmessage()},this),n.addEventListener("message",e,!1),this.port1={},this.port2={postMessage:function(){n.postMessage(i,o)}}}),void 0!==e&&!t.bb()){var n=new e,i={},o=i;return n.port1.onmessage=function(){if(t.p(i.next)){var e=(i=i.next).bh;i.bh=null,e()}},function(t){o.next={bh:t},o=o.next,n.port2.postMessage(0)}}return void 0!==window.document&&"onreadystatechange"in window.document.createElement("SCRIPT")?function(t){var e=window.document.createElement("SCRIPT");e.onreadystatechange=function(){e.onreadystatechange=null,e.parentNode.removeChild(e),e=null,t(),t=null},window.document.documentElement.appendChild(e)}:function(e){t.ib.setTimeout(e,0)}},m=function(){this.f=this.b=null},v=function(){this.next=this.b=this.Hc=null},t.nb=function(e,n){t.nb.b||t.nb.m(),t.nb.j||(t.nb.b(),t.nb.j=!0),t.nb.l.add(e,n)},t.vb=function(t){return t*Math.PI/180},t.wb=function(t){return 180*t/Math.PI},t.xb=function(t){return t?t.length:0},t.zb=function(e,n){t.yb(n,function(t){e[t]=n[t]})},t.Ab=function(t){for(var e in t)return!1;return!0},t.Bb=function(t,e,n){return null!=e&&(t=Math.max(t,e)),null!=n&&(t=Math.min(t,n)),t},t.Cb=function(t,e,n){return((t-e)%(n-=e)+n)%n+e},t.Db=function(t,e,n){return Math.abs(t-e)<=(n||1e-9)},t.Eb=function(e,n){for(var i=[],o=t.xb(e),r=0;r<o;++r)i.push(n(e[r],r));return i},t.Gb=function(e,n){for(var i=t.Fb(void 0,t.xb(n)),o=t.Fb(void 0,0);o<i;++o)e.push(n[o])},t.Hb=function(t){return"number"==typeof t},t.Ib=function(t){return"object"==typeof t},t.Fb=function(t,e){return null==t?e:t},t.Jb=function(t){return"string"==typeof t},t.Kb=function(t){return t===!!t},t.yb=function(t,e){for(var n in t)e(n,t[n])},t.Mb=function(e){return function(){var n=this,i=arguments;t.Lb(function(){e.apply(n,i)})}},t.Lb=function(t){return window.setTimeout(t,0)},b=function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]},t.Pb=function(t){window.console&&window.console.error&&window.console.error(t)},y=function(t){this.message=t,this.name="InvalidValueError",this.stack=Error().stack},t.Rb=function(t,e){var n="";if(null!=e){if(!(e instanceof y))return e;n=": "+e.message}return new y(t+n)},t.Sb=function(e){if(!(e instanceof y))throw e;t.Pb(e.name+": "+e.message)},t.Tb=function(e,n){var i=i?i+": ":"";return function(o){if(!o||!t.Ib(o))throw t.Rb(i+"not an Object");var r,s={};for(r in o)if(s[r]=o[r],!n&&!e[r])throw t.Rb(i+"unknown property "+r);for(r in e)try{var a=e[r](s[r]);(t.p(a)||Object.prototype.hasOwnProperty.call(o,r))&&(s[r]=e[r](s[r]))}catch(e){throw t.Rb(i+"in property "+r,e)}return s}},w=function(t){try{return!!t.cloneNode}catch(t){return!1}},t.Vb=function(e,n,i){return i?function(i){if(i instanceof e)return i;try{return new e(i)}catch(e){throw t.Rb("when calling new "+n,e)}}:function(i){if(i instanceof e)return i;throw t.Rb("not an instance of "+n)}},t.Wb=function(e){return function(n){for(var i in e)if(e[i]==n)return n;throw t.Rb(n)}},t.Xb=function(e){return function(n){if(!t.Ja(n))throw t.Rb("not an Array");return t.Eb(n,function(n,i){try{return e(n)}catch(e){throw t.Rb("at index "+i,e)}})}},t.Yb=function(e,n){return function(i){if(e(i))return i;throw t.Rb(n||""+i)}},t.Zb=function(e){return function(n){for(var i=[],o=0,r=e.length;o<r;++o){var s=e[o];try{(s.og||s)(n)}catch(t){if(!(t instanceof y))throw t;i.push(t.message);continue}return(s.then||s)(n)}throw t.Rb(i.join("; and "))}},t.$b=function(t,e){return function(n){return e(t(n))}},t.ac=function(t){return function(e){return null==e?e:t(e)}},x=function(e){return function(n){if(n&&null!=n[e])return n;throw t.Rb("no "+e+" property")}},t.y=function(t,e){this.x=t,this.y=e},E=function(e){if(e instanceof t.y)return e;try{t.Tb({x:t.cc,y:t.cc},!0)(e)}catch(e){throw t.Rb("not a Point",e)}return new t.y(e.x,e.y)},t.z=function(t,e,n,i){this.width=t,this.height=e,this.f=n||"px",this.b=i||"px"},T=function(e){if(e instanceof t.z)return e;try{t.Tb({height:t.cc,width:t.cc},!0)(e)}catch(e){throw t.Rb("not a Size",e)}return new t.z(e.width,e.height)},t.fc=function(t,e){this.b=t,this.f=e},S=function(t){this.b=t,t=Math.cos(0*Math.PI/180);var e=Math.cos(0*Math.PI/180),n=Math.sin(0*Math.PI/180);this.m11=this.b*e,this.m12=this.b*n,this.m21=-this.b*t*n,this.m22=this.b*t*e,this.f=this.m11*this.m22-this.m12*this.m21},C=function(e,n){return new t.fc((e.m22*n.Ka-e.m12*n.La)/e.f,(-e.m21*n.Ka+e.m11*n.La)/e.f)},t.ic=function(e){this.J=this.I=window.Infinity,this.L=this.K=-window.Infinity,t.x(e||[],this.extend,this)},t.kc=function(e,n,i,o){var r=new t.ic;return r.I=e,r.J=n,r.K=i,r.L=o,r},A=function(t,e){-180==t&&180!=e&&(t=180),-180==e&&180!=t&&(e=180),this.b=t,this.f=e},t.mc=function(t){return t.b>t.f},t.nc=function(t,e){var n=e-t;return 0<=n?n:e+180-(t-180)},t.oc=function(e){return e.isEmpty()?0:t.mc(e)?360-(e.b-e.f):e.f-e.b},L=function(t,e){this.b=t,this.f=e},t.D=function(e,n,i){if(e&&(void 0!==e.lat||void 0!==e.lng))try{He(e),n=e.lng,e=e.lat,i=!1}catch(e){t.Sb(e)}e-=0,n-=0,i||(e=t.Bb(e,-90,90),180!=n&&(n=t.Cb(n,-180,180))),this.lat=function(){return e},this.lng=function(){return n}},t.tc=function(e){return t.vb(e.lat())},t.uc=function(e){return t.vb(e.lng())},k=function(t,e){return e=Math.pow(10,e),Math.round(t*e)/e},t.wc=function(e){try{return e instanceof t.D?e:(e=He(e),new t.D(e.lat,e.lng))}catch(e){throw t.Rb("not a LatLng or LatLngLiteral",e)}},t.xc=function(e,n){if(e=e&&t.wc(e),n=n&&t.wc(n),e){n=n||e;var i=t.Bb(e.lat(),-90,90),o=t.Bb(n.lat(),-90,90);this.f=new L(i,o),e=e.lng(),360<=(n=n.lng())-e?this.b=new A(-180,180):(e=t.Cb(e,-180,180),n=t.Cb(n,-180,180),this.b=new A(e,n))}else this.f=new L(1,-1),this.b=new A(180,-180)},t.yc=function(e,n,i,o){return new t.xc(new t.D(e,n,!0),new t.D(i,o,!0))},t.Ac=function(e){if(e instanceof t.xc)return e;try{return e=ze(e),t.yc(e.south,e.west,e.north,e.east)}catch(e){throw t.Rb("not a LatLngBounds or LatLngBoundsLiteral",e)}},t.Dc=function(e){e=e||window.event,t.Bc(e),t.Cc(e)},t.Bc=function(t){t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation()},t.Cc=function(e){e.preventDefault&&t.p(e.defaultPrevented)?e.preventDefault():e.returnValue=!1},t.Ec=function(t){t.handled=!0,void 0===t.bubbles&&(t.returnValue="handled")},O=function(t,e){return t.__e3_||(t.__e3_={}),(t=t.__e3_)[e]||(t[e]={}),t[e]},I=function(e,n){var i=e.__e3_||{};if(n)e=i[n]||{};else for(n in e={},i)t.zb(e,i[n]);return e},N=function(t,e){return function(n){return e.call(t,n,this)}},_=function(e,n,i){return function(o){var r=[n,e];t.Gb(r,arguments),t.F.trigger.apply(this,r),i&&t.Ec.apply(null,arguments)}},R=function(t,e,n,i){this.f=t,this.j=e,this.b=n,this.l=i,this.id=++Be,O(t,e)[this.id]=this},M=function(t){return function(e){if(e||(e=window.event),e&&!e.target)try{e.target=e.srcElement}catch(t){}var n=t.b.apply(t.f,[e]);return(!e||"click"!=e.type||!(e=e.srcElement)||"A"!=e.tagName||"javascript:void(0)"!=e.href)&&n}},t.Rc=function(t,e){this.f=t||0,this.j=e||0},t.Sc=function(e){return""+(t.Ma(e)?t.Pa(e):e)},t.G=t.k(),D=function(e,n){var i=n+"_changed";e[i]?e[i]():e.changed(n),i=$(e,n);for(var o in i){var r=i[o];D(r.Jc,r.ub)}t.F.trigger(e,n.toLowerCase()+"_changed")},t.Wc=function(t){return Xe[t]||(Xe[t]=t.substr(0,1).toUpperCase()+t.substr(1))},j=function(t){return t.gm_accessors_||(t.gm_accessors_={}),t.gm_accessors_},$=function(t,e){return t.gm_bindings_||(t.gm_bindings_={}),t.gm_bindings_.hasOwnProperty(e)||(t.gm_bindings_[e]={}),t.gm_bindings_[e]},P=function(e){this.M=[],this.b=e&&e.sd||t.Ha,this.f=e&&e.ud||t.Ha},t.$c=function(e,n,i,o){function r(){t.x(s,function(e){n.call(i||null,function(n){if(e.once){if(e.once.Zg)return;e.once.Zg=!0,t.Wa(a.M,e),a.M.length||a.b()}e.Hc.call(e.context,n)})})}var s=e.M.slice(0),a=e;o&&o.sync?r():Ye(r)},W=function(t,e){return function(n){return n.Hc==t&&n.context==(e||null)}},t.bd=function(){this.M=new P({sd:(0,t.t)(this.sd,this),ud:(0,t.t)(this.ud,this)})},t.cd=function(t){return function(){return this.get(t)}},t.dd=function(e,n){return n?function(i){try{this.set(e,n(i))}catch(n){t.Sb(t.Rb("set"+t.Wc(e),n))}}:function(t){this.set(e,t)}},t.ed=function(e,n){t.yb(n,function(n,i){var o=t.cd(n);e["get"+t.Wc(n)]=o,i&&(i=t.dd(n,i),e["set"+t.Wc(n)]=i)})},t.gd=function(t){this.b=t||[],F(this)},F=function(t){t.set("length",t.b.length)},t.hd=function(){this.f={},this.j=0},t.id=function(e,n){var i=e.f,o=t.Sc(n);i[o]||(i[o]=n,++e.j,t.F.trigger(e,"insert",n),e.b&&e.b(n))},t.jd=t.pa("b"),t.kd=function(e,n,i){this.heading=e,this.pitch=t.Bb(n,-90,90),this.zoom=Math.max(0,i)},t.ld=function(){this.__gm=new t.G,this.l=null},t.md=function(e){t.bd.call(this),this.m=!!e},t.od=function(t){return new H(t,void 0)},H=function(e,n){t.md.call(this,n),this.b=e},B=t.k(),t.qd=function(t,e){return t[e]||(t[e]=[]),t[e]},t.ud=function(t,e){if(null==t||null==e)return null==t==(null==e);if(t.constructor!=Array&&t.constructor!=Object)throw Error("Invalid object type passed into jsproto.areObjectsEqual()");if(t===e)return!0;if(t.constructor!=e.constructor)return!1;for(var n in t)if(!(n in e&&z(t[n],e[n])))return!1;for(var i in e)if(!(i in t))return!1;return!0},z=function(e,n){return e===n||!(!0!==e&&1!==e||!0!==n&&1!==n)||!(!1!==e&&0!==e||!1!==n&&0!==n)||e instanceof Object&&n instanceof Object&&!!t.ud(e,n)},X=function(t,e,n,i){this.type=t,this.label=e,this.ol=n,this.Ec=i},Y=function(t){switch(t){case"d":case"f":case"i":case"j":case"u":case"v":case"x":case"y":case"g":case"h":case"n":case"o":case"e":return 0;case"s":case"z":case"B":return"";case"b":return!1;default:return null}},t.xd=function(e,n,i){return new X(e,1,t.p(n)?n:Y(e),i)},t.yd=function(e,n,i){return new X(e,2,t.p(n)?n:Y(e),i)},t.zd=function(e){return t.xd("i",e)},t.Ad=function(e){return t.xd("v",e)},t.Bd=function(e){return t.xd("b",e)},t.Cd=function(e){return t.xd("e",e)},t.J=function(e,n){return t.xd("m",e,n)},t.Dd=function(t){return new X("m",3,void 0,t)},U=t.k(),q=function(t,e,n){for(var i=1;i<e.A.length;++i){var o=e.A[i],r=t[i+e.b];if(o&&null!=r)if(3==o.label)for(var s=0;s<r.length;++s)V(r[s],i,o,n);else V(r,i,o,n)}},V=function(t,e,n,i){if("m"==n.type){var o=i.length;q(t,n.Ec,i),i.splice(o,0,[e,"m",i.length-o].join(""))}else"b"==n.type&&(t=t?"1":"0"),t=[e,n.type,(0,window.encodeURIComponent)(t)].join(""),i.push(t)},t.K=function(t){this.data=t||[]},t.Hd=function(t,e,n){return null!=(t=t.data[e])?t:n},t.Kd=function(e,n,i){return t.Hd(e,n,i||0)},t.L=function(e,n,i){return t.Hd(e,n,i||0)},t.M=function(e,n,i){return t.Hd(e,n,i||"")},t.N=function(t,e){var n=t.data[e];return n||(n=t.data[e]=[]),n},t.Ld=function(e,n){return t.qd(e.data,n)},t.Md=function(e,n,i){t.Ld(e,n).push(i)},t.Nd=function(e,n,i){return t.Ld(e,n)[i]},t.Od=function(e,n){var i=[];return t.Ld(e,n).push(i),i},t.Pd=function(t,e){return t.data[e]?t.data[e].length:0},G=t.k(),t.Rd=t.pa("__gm"),K=t.k(),t.Td=function(e){this.b=t.wc(e)},Q=function(e){if(e instanceof K)return e;try{return new t.Td(t.wc(e))}catch(t){}throw t.Rb("not a Geometry or LatLng or LatLngLiteral object")},t.Vd=function(e,n){return e?function(){--e||n()}:(n(),t.Ha)},t.Wd=function(t,e,n){var i=t.getElementsByTagName("head")[0];return(t=t.createElement("script")).type="text/javascript",t.charset="UTF-8",t.src=e,n&&(t.onerror=n),i.appendChild(t),t},J=function(t){for(var e="",n=0,i=arguments.length;n<i;++n){var o=arguments[n];o.length&&"/"==o[0]?e=o:(e&&"/"!=e[e.length-1]&&(e+="/"),e+=o)}return e},Z=function(t){this.j=window.document,this.b={},this.f=t},tt=function(){this.l={},this.f={},this.m={},this.b={},this.j=new it},et=function(e,n){e.l[n]||(e.l[n]=!0,ot(e.j,function(i){for(var o=i.b[n],r=o?o.length:0,s=0;s<r;++s){var a=o[s];e.b[a]||et(e,a)}(i=i.j).b[n]||t.Wd(i.j,J(i.f,n)+".js")}))},nt=function(t,e){var n=en;this.j=t,this.b=n,t={};for(var i in n)for(var o=n[i],r=0,s=o.length;r<s;++r){var a=o[r];t[a]||(t[a]=[]),t[a].push(i)}this.l=t,this.f=e},it=function(){this.b=[]},ot=function(t,e){t.f?e(t.f):t.b.push(e)},t.O=function(t,e,n){var i=tt.b();t=""+t,i.b[t]?e(i.b[t]):((i.f[t]=i.f[t]||[]).push(e),n||et(i,t))},t.ge=function(t,e){tt.b().b[""+t]=e},rt=function(e,n,i){var o=[],r=t.Vd(e.length,function(){n.apply(null,o)});t.x(e,function(e,n){t.O(e,function(t){o[n]=t,r()},i)})},t.ie=function(e){e=e||{},this.j=e.id,this.b=null;try{this.b=e.geometry?Q(e.geometry):null}catch(e){t.Sb(e)}this.f=e.properties||{}},st=function(){this.b={},this.j={},this.f={}},at=function(){this.b={}},lt=function(e){this.b=new at;var n=this;t.F.addListenerOnce(e,"addfeature",function(){t.O("data",function(t){t.b(n,e,n.b)})})},t.ne=function(e){this.b=[];try{this.b=Ve(e)}catch(e){t.Sb(e)}},t.pe=function(e){this.b=(0,t.oe)(e)},t.qe=function(e){this.b=(0,t.oe)(e)},t.se=function(t){this.b=Qe(t)},t.te=function(e){this.b=(0,t.oe)(e)},t.ve=function(t){this.b=Je(t)},t.xe=function(t){this.b=Ze(t)},t.ye=function(e,n,i){function o(e){if(!e)throw t.Rb("not a Feature");if("Feature"!=e.type)throw t.Rb('type != "Feature"');var n=e.geometry;try{n=null==n?null:r(n)}catch(e){throw t.Rb('in property "geometry"',e)}var o=e.properties||{};if(!t.Ib(o))throw t.Rb("properties is not an Object");var s=i.idPropertyName;if(null!=(e=s?o[s]:e.id)&&!t.Hb(e)&&!t.Jb(e))throw t.Rb((s||"id")+" is not a string or number");return{id:e,geometry:n,properties:o}}function r(e){if(null==e)throw t.Rb("is null");var n=(e.type+"").toLowerCase(),i=e.coordinates;try{switch(n){case"point":return new t.Td(l(i));case"multipoint":return new t.te(u(i));case"linestring":return a(i);case"multilinestring":return new t.se(h(i));case"polygon":return s(i);case"multipolygon":return new t.xe(p(i))}}catch(e){throw t.Rb('in property "coordinates"',e)}if("geometrycollection"==n)try{return new t.ne(d(e.geometries))}catch(e){throw t.Rb('in property "geometries"',e)}throw t.Rb("invalid type")}function s(e){return new t.ve(f(e))}function a(e){return new t.pe(u(e))}function l(e){return e=c(e),t.wc({lat:e[1],lng:e[0]})}if(!n)return[];i=i||{};var c=t.Xb(t.cc),u=t.Xb(l),h=t.Xb(a),f=t.Xb(function(e){if(!(e=u(e)).length)throw t.Rb("contains no elements");if(!e[0].W(e[e.length-1]))throw t.Rb("first and last positions are not equal");return new t.qe(e.slice(0,-1))}),p=t.Xb(s),d=t.Xb(r),g=t.Xb(o);if("FeatureCollection"==n.type){n=n.features;try{return t.Eb(g(n),function(t){return e.add(t)})}catch(e){throw t.Rb('in property "features"',e)}}if("Feature"==n.type)return[e.add(o(n))];throw t.Rb("not a Feature or FeatureCollection")},ct=function(e){var n=this;e=e||{},this.setValues(e),this.b=new st,t.F.forward(this.b,"addfeature",this),t.F.forward(this.b,"removefeature",this),t.F.forward(this.b,"setgeometry",this),t.F.forward(this.b,"setproperty",this),t.F.forward(this.b,"removeproperty",this),this.f=new lt(this.b),this.f.bindTo("map",this),this.f.bindTo("style",this),t.x(t.ze,function(e){t.F.forward(n.f,e,n)}),this.j=!1},ut=function(e){e.j||(e.j=!0,t.O("drawing_impl",function(t){t.em(e)}))},ht=function(e){if(!e)return null;if(t.Fa(e)){var n=window.document.createElement("div");n.style.overflow="auto",n.innerHTML=e}else e.nodeType==window.Node.TEXT_NODE?(n=window.document.createElement("div"),n.appendChild(e)):n=e;return n},ft=function(t){var e=Ln,n=tt.b().j;t=n.f=new nt(new Z(t),e),e=0;for(var i=n.b.length;e<i;++e)n.b[e](t);n.b.length=0},pt=function(e){(e=e||{}).clickable=t.Fb(e.clickable,!0),e.visible=t.Fb(e.visible,!0),this.setValues(e),t.O("marker",t.Ha)},t.Ie=function(t){this.__gm={set:null,Yd:null,Zb:{map:null,Ae:null}},pt.call(this,t)},dt=function(e,n){this.b=e,this.f=n,e.addListener("map_changed",(0,t.t)(this.fn,this)),this.bindTo("map",e),this.bindTo("disableAutoPan",e),this.bindTo("maxWidth",e),this.bindTo("position",e),this.bindTo("zIndex",e),this.bindTo("internalAnchor",e,"anchor"),this.bindTo("internalContent",e,"content"),this.bindTo("internalPixelOffset",e,"pixelOffset")},gt=function(t,e,n,i){n?t.bindTo(e,n,i):(t.unbind(e),t.set(e,void 0))},t.Le=function(e){function n(){r||(r=!0,t.O("infowindow",function(t){t.Mk(o)}))}window.setTimeout(function(){t.O("infowindow",t.Ha)},100);var i=!!(e=e||{}).b;delete e.b;var o=new dt(this,i),r=!1;t.F.addListenerOnce(this,"anchor_changed",n),t.F.addListenerOnce(this,"map_changed",n),this.setValues(e)},t.Ne=function(e){t.Me&&e&&t.Me.push(e)},mt=function(t){this.setValues(t)},vt=t.k(),bt=t.k(),yt=t.k(),t.Se=function(){t.O("geocoder",t.Ha)},t.Te=function(e,n,i){this.G=null,this.set("url",e),this.set("bounds",t.ac(t.Ac)(n)),this.setValues(i)},wt=function(e,n){t.Jb(e)?(this.set("url",e),this.setValues(n)):this.setValues(e)},t.Ve=function(){var e=this;t.O("layers",function(t){t.b(e)})},xt=function(e){this.setValues(e);var n=this;t.O("layers",function(t){t.f(n)})},Et=function(){var e=this;t.O("layers",function(t){t.j(e)})},t.Ze=function(){this.b="",this.f=t.Ye},t.$e=function(e){var n=new t.Ze;return n.b=e,n},t.bf=function(){this.tf="",this.jk=t.af,this.b=null},t.cf=function(e,n){var i=new t.bf;return i.tf=e,i.b=n,i},t.df=function(t,e){e.parentNode&&e.parentNode.insertBefore(t,e.nextSibling)},t.ef=function(t){t&&t.parentNode&&t.parentNode.removeChild(t)},Tt=t.k(),St=function(t,e,n,i,o){this.b=!!e,this.node=null,this.f=0,this.j=!1,this.l=!n,t&&this.setPosition(t,i),this.depth=void 0!=o?o:this.f||0,this.b&&(this.depth*=-1)},Ct=function(t,e,n,i){St.call(this,t,e,n,null,i)},At=function(t){this.data=t||[]},Lt=function(t){this.data=t||[]},kt=function(t){this.data=t||[]},Ot=function(t){this.data=t||[]},t.pf=function(t){this.data=t||[]},It=function(t){this.data=t||[]},Nt=function(t){this.data=t||[]},_t=function(t){this.data=t||[]},t.tf=function(e){return t.M(e,0)},t.uf=function(e){return t.M(e,1)},t.vf=function(){return t.M(t.Q,16)},t.wf=function(t){return new Ot(t.data[2])},Rt=function(e,n,i,o,r){var s=t.M(t.wf(t.Q),7);this.b=e,this.f=o,this.j=t.p(r)?r:t.Sa();var a=s+"/csi?v=2&s=mapsapi3&v3v="+t.M(new _t(t.Q.data[36]),0)+"&action="+e;t.ab(i,function(t,e){a+="&"+(0,window.encodeURIComponent)(e)+"="+(0,window.encodeURIComponent)(t)}),n&&(a+="&e="+n),this.l=a},t.zf=function(e,n){var i={};i[n]=void 0,t.yf(e,i)},t.yf=function(e,n){var i="";t.ab(n,function(e,n){var o=(null!=e?e:t.Sa())-this.j;i&&(i+=","),i+=n+"."+Math.round(o),null==e&&window.performance&&window.performance.mark&&window.performance.mark("mapsapi:"+this.b+":"+n)},e),n=e.l+"&rt="+i,e.f.createElement("img").src=n,(e=t.ib.__gm_captureCSI)&&e(n)},t.Af=function(e,n){var i=(n=n||{}).yn||{},o=t.Ld(t.Q,12).join(",");o&&(i.libraries=o),o=t.M(t.Q,6);var r=new At(t.Q.data[33]),s=[];return o&&s.push(o),t.x(r.data,function(e,n){e&&t.x(e,function(t,e){null!=t&&s.push(n+1+"_"+(e+1)+"_"+t)})}),n.Bl&&(s=s.concat(n.Bl)),new Rt(e,s.join(","),i,n.document||window.document,n.startTime)},Mt=function(){this.f=t.Af("apiboot2",{startTime:t.Bf}),t.zf(this.f,"main"),this.b=!1},Dt=function(){var e=fn;e.b||(e.b=!0,t.zf(e.f,"firstmap"))},t.Ff=function(t,e,n){this.size=t,this.b=e,this.heading=n,this.f=Math.cos(this.b/180*Math.PI)},t.Gf=function(){this.b=new t.y(128,128),this.j=256/360,this.l=256/(2*Math.PI),this.f=!0},t.Hf=function(t,e,n){return(t=t.fromLatLngToPoint(e))&&(n=Math.pow(2,n),t.x*=n,t.y*=n),t},t.If=function(e,n){var i=e.lat()+t.wb(n);90<i&&(i=90);var o=e.lat()-t.wb(n);-90>o&&(o=-90),n=Math.sin(n);var r=Math.cos(t.vb(e.lat()));return 90==i||-90==o||1e-6>r?new t.xc(new t.D(o,-180),new t.D(i,180)):(n=t.wb(Math.asin(n/r)),new t.xc(new t.D(o,e.lng()-n),new t.D(i,e.lng()+n)))},jt=function(e,n){t.ld.call(this),t.Ne(e),this.__gm=new t.G,this.f=null,n&&n.client&&(this.f=t.Jf[n.client]||null);var i=this.controls=[];t.yb(t.Kf,function(e,n){i[n]=new t.gd}),this.j=!0,this.b=e,this.m=!1,this.__gm.Eb=n&&n.Eb||new t.hd,this.set("standAlone",!0),this.setPov(new t.kd(0,0,1)),n&&n.re&&(e=n.re,t.Hb(e.zoom)||(e.zoom=t.Hb(n.zoom)?n.zoom:1)),this.setValues(n),void 0==this.getVisible()&&this.setVisible(!0),t.F.addListenerOnce(this,"pano_changed",t.Mb(function(){t.O("marker",(0,t.t)(function(t){t.b(this.__gm.Eb,this)},this))}))},$t=function(){this.l=[],this.j=this.b=this.f=null},Pt=function(e,n,i,o,r){this.S=n,this.R=r,this.b=t.od(new t.jd([])),this.D=new t.hd,new t.gd,this.j=new t.hd,this.m=new t.hd,this.l=new t.hd;var s=this.Eb=new t.hd;s.b=function(){delete s.b,t.O("marker",t.Mb(function(t){t.b(s,e)}))},this.B=new jt(i,{visible:!1,enableCloseButton:!0,Eb:s}),this.B.bindTo("reportErrorControl",e),this.B.j=!1,this.f=new $t,this.overlayLayer=null},t.Of=function(){this.M=new P},t.Pf=function(e){this.bl=e||0,t.F.bind(this,"forceredraw",this,this.B)},t.Qf=function(t,e){(t=t.style).width=e.width+e.f,t.height=e.height+e.b},t.Rf=function(e){return new t.z(e.offsetWidth,e.offsetHeight)},t.Tf=function(){var e=[],n=t.ib.google&&t.ib.google.maps&&t.ib.google.maps.fisfetsz;return n&&Array.isArray(n)&&t.Sf[15]&&n.forEach(function(n){t.Hb(n)&&e.push(n)}),e},Wt=function(t){this.data=t||[]},Ft=function(){return pn||(pn={b:-1,A:[,t.Wf,t.Wf,t.Wf,t.Wf]}),pn},Ht=function(t){this.data=t||[]},Bt=function(t){this.data=t||[]},zt=function(t){this.data=t||[]},Xt=function(t){this.data=t||[]},Yt=function(t){this.data=t||[]},Ut=function(t){this.data=t||[]},qt=function(e){if(!yn){var n=yn={b:-1,A:[]},i=new Xt([]);vn||(vn={b:-1,A:[,t.R,t.R]}),i=t.J(i,vn);var o=new Yt([]);bn||((bn={b:-1,A:[]}).A=[,t.S,t.S,t.Cd(1)]),o=t.J(o,bn);var r=new zt([]);if(!mn){var s=[];mn={b:-1,A:s},s[1]=t.T,s[2]=t.U,s[3]=t.U,s[5]=t.V,s[6]=t.V,dn||((dn={b:-1,A:[]}).A=[,t.T,t.Cd(1),t.rg,t.J(new Wt([]),Ft()),t.U,t.rg,t.rg,t.T,t.J(new Wt([]),Ft()),t.rg]),s[8]=t.Dd(dn);var a=new Bt([]);gn||(gn={b:-1,A:[,t.tg,t.U]}),s[9]=t.J(a,gn),s[10]=t.U,s[11]=t.U,s[12]=t.U,s[13]=t.tg,s[14]=t.ug,s[100]=t.U}if(r=t.J(r,mn),s=new At([]),!cn){a=cn={b:-1,A:[]};var l=new kt([]);hn||(hn={b:-1,A:[,t.U,t.U]}),l=t.J(l,hn);var c=new Lt([]);un||(un={b:-1,A:[,t.U]}),a.A=[,,,,,,,,,,l,,t.J(c,un)]}n.A=[,i,t.T,t.S,o,r,t.J(s,cn)]}return t.yg.b(e.data,yn)},Vt=function(e,n,i,o,r){t.Pf.call(this),this.H=n,this.F=new t.Gf,this.O=i+"/maps/api/js/StaticMapService.GetMapImage",this.b=this.f=null,this.C=o,this.j=r?new H(null,void 0):null,this.l=null,this.m=!1,this.set("div",e),this.set("loading",!0)},Gt=function(e){var n=e.get("tilt")||t.xb(e.get("styles"));return e=e.get("mapTypeId"),n?null:xn[e]},Kt=function(t){t.parentNode&&t.parentNode.removeChild(t)},Qt=function(e,n){var i=e.b;i.onload=null,i.onerror=null;var o=e.get("size");o&&(n&&(i.parentNode||e.f.appendChild(i),e.j||t.Qf(i,o),t.F.trigger(e,"staticmaploaded"),e.C.set(t.Sa())),e.set("loading",!1))},Jt=function(e,n,i,o,r){var s=new Ut,a=new Xt(t.N(s,0));a.data[0]=n.I,a.data[1]=n.J,s.data[1]=r,s.setZoom(i),(i=new Yt(t.N(s,3))).data[0]=n.K-n.I,i.data[1]=n.L-n.J;var l=new zt(t.N(s,4));return l.data[0]=o,l.data[4]=t.tf(t.wf(t.Q)),l.data[5]=t.uf(t.wf(t.Q)).toLowerCase(),l.data[9]=!0,t.Tf().forEach(function(e){0>t.Ld(l,13).indexOf(e)&&t.Md(l,13,e)}),l.data[11]=!0,t.Sf[13]&&((n=new Ht(t.Od(l,7))).data[0]=33,n.data[1]=3,n.data[7]=1),s=e.O+(0,window.unescape)("%3F")+qt(s),e.H(s)},Zt=function(t,e){var n=t.b;e!=n.src?(t.j||Kt(n),n.onload=function(){Qt(t,!0)},n.onerror=function(){Qt(t,!1)},n.src=e):!n.parentNode&&e&&t.f.appendChild(n)},t.Ig=function(e){for(var n;n=e.firstChild;)t.Hg(n),e.removeChild(n)},t.Hg=function(e){e=new Ct(e);try{for(;;){var n=e.next();n&&t.F.clearInstanceListeners(n)}}catch(t){if(t!==wn)throw t}},te=function(e,n){var i=t.Sa();fn&&Dt();var o=new t.Of,r=n||{};r.noClear||t.Ig(e);var s,a=void 0===window.document?null:window.document.createElement("div");if(a&&e.appendChild&&(e.appendChild(a),a.style.width=a.style.height="100%"),![].forEach)throw t.O("controls",function(t){t.jg(e)}),Error("The Google Maps API does not support this browser.");n=new window.Promise(function(t){s=t}),t.Rd.call(this,new Pt(this,e,a,o,n)),t.p(r.mapTypeId)||(r.mapTypeId="roadmap"),this.setValues(r),this.Z=t.Sf[15]&&r.noControlsOrLogging,this.mapTypes=new G,this.features=new t.G,t.Ne(a),this.notify("streetView"),n=t.Rf(a);var l=null;ee(r.useStaticMap,n)&&(l=new Vt(a,t.Lg,t.M(t.wf(t.Q),9),new H(null,void 0),!1),t.F.forward(l,"staticmaploaded",this),l.set("size",n),l.bindTo("center",this),l.bindTo("zoom",this),l.bindTo("mapTypeId",this),l.bindTo("styles",this)),this.overlayMapTypes=new t.gd;var c=this.controls=[];t.yb(t.Kf,function(e,n){c[n]=new t.gd});var u=this,h=!0;t.O("map",function(t){u.getDiv()&&a&&t.f(u,r,a,l,h,i,o,s)}),h=!1,this.data=new ct({map:this})},ee=function(e,n){return!(!t.Q||2==t.Kd(t.Q,37))&&(t.p(e)?!!e:384e3>=(e=n.width)*(n=n.height)&&800>=e&&800>=n)},ne=function(){t.O("maxzoom",t.Ha)},ie=function(e,n){!e||t.Jb(e)||t.Hb(e)?(this.set("tableId",e),this.setValues(n)):this.setValues(e)},t.Pg=t.k(),oe=function(e){return(e=e||{}).visible=t.Fb(e.visible,!0),e},t.Rg=function(t){return t&&t.radius||6378137},re=function(e){return e instanceof t.gd?Tn(e):new t.gd((0,t.oe)(e))},se=function(e){if(t.Ja(e)||e instanceof t.gd)if(0==t.xb(e))var n=!0;else n=e instanceof t.gd?e.getAt(0):e[0],n=t.Ja(n)||n instanceof t.gd;else n=!1;return n?e instanceof t.gd?ae(Tn)(e):new t.gd(t.Xb(re)(e)):new t.gd([re(e)])},ae=function(e){return function(n){if(!(n instanceof t.gd))throw t.Rb("not an MVCArray");return n.forEach(function(n,i){try{e(n)}catch(e){throw t.Rb("at index "+i,e)}}),n}},t.ah=function(e){this.setValues(oe(e)),t.O("poly",t.Ha)},le=function(e){this.set("latLngs",new t.gd([new t.gd])),this.setValues(oe(e)),t.O("poly",t.Ha)},t.ch=function(t){le.call(this,t)},t.dh=function(t){le.call(this,t)},t.eh=function(e){this.setValues(oe(e)),t.O("poly",t.Ha)},ce=function(){this.b=null},t.gh=function(){this.b=null},t.hh=function(e){var n=this;this.tileSize=e.tileSize||new t.z(256,256),this.name=e.name,this.alt=e.alt,this.minZoom=e.minZoom,this.maxZoom=e.maxZoom,this.j=(0,t.t)(e.getTileUrl,e),this.b=new t.hd,this.f=null,this.set("opacity",e.opacity),t.O("map",function(e){var i=n.f=e.b,o=n.tileSize||new t.z(256,256);n.b.forEach(function(e){var r=e.__gmimt,s=r.$,a=r.zoom,l=n.j(s,a);r.ac=i({V:s.x,X:s.y,aa:a},o,e,l,function(){return t.F.trigger(e,"load")})})})},ue=function(t){return"number"==typeof(t=t.get("opacity"))?t:1},t.jh=function(){t.jh.af(this,"constructor")},t.kh=function(e,n){t.kh.af(this,"constructor"),this.set("styles",e),e=n||{},this.f=e.baseMapTypeId||"roadmap",this.minZoom=e.minZoom,this.maxZoom=e.maxZoom||20,this.name=e.name,this.alt=e.alt,this.projection=null,this.tileSize=new t.z(256,256)},t.lh=function(e,n){t.Yb(w,"container is not a Node")(e),this.setValues(n),t.O("controls",(0,t.t)(function(t){t.wm(this,e)},this))},he=t.pa("b"),fe=function(t,e,n){for(var i=Array(e.length),o=0,r=e.length;o<r;++o)i[o]=e.charCodeAt(o);for(i.unshift(n),t=t.b,n=e=0,o=i.length;n<o;++n)e*=1729,e+=i[n],e%=t;return e},pe=function(){var e=t.L(new It(t.Q.data[4]),0),n=new he(131071),i=(0,window.unescape)("%26%74%6F%6B%65%6E%3D");return function(t){var o=(t=t.replace(An,"%27"))+i;return Cn||(Cn=/(?:https?:\/\/[^/]+)?(.*)/),t=Cn.exec(t),o+fe(n,t&&t[1],e)}},de=function(){var t=new he(2147483647);return function(e){return fe(t,e,0)}},ge=function(e){for(var n=e.split("."),i=window,o=window,r=0;r<n.length;r++)if(o=i,i=i[n[r]],!i)throw t.Rb(e+" is not a function");return function(){i.apply(o)}},me=function(){for(var t in Object.prototype)window.console&&window.console.error("This site adds property <"+t+"> to Object.prototype. Extending Object.prototype breaks JavaScript for..in loops, which are used heavily in Google Maps API v3.")},ve=function(t){return(t="version"in t)&&window.console&&window.console.error("You have included the Google Maps API multiple times on this page. This may cause unexpected errors."),t},t.sa=[],t.wa="undefined"!=typeof window&&window===this?this:void 0!==window.global&&null!=window.global?window.global:this,t.vh="function"==typeof Object.create?Object.create:function(t){function e(){}return e.prototype=t,new e},"function"==typeof Object.setPrototypeOf)be=Object.setPrototypeOf;else{var Ae;t:{var Le={};try{Le.__proto__={Ik:!0},Ae=Le.Ik;break t}catch(t){}Ae=!1}be=Ae?function(t,e){if(t.__proto__=e,t.__proto__!==e)throw new TypeError(t+" is not extensible");return t}:null}t.Ah=be,ye="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){t!=Array.prototype&&t!=Object.prototype&&(t[e]=n.value)},Te=0,we=function(t){return"jscomp_symbol_"+(t||"")+Te++},r("Array.prototype.findIndex",function(t){return t||function(t,e){t:{var n=this;n instanceof String&&(n=String(n));for(var i=n.length,o=0;o<i;o++)if(t.call(e,n[o],o,n)){t=o;break t}t=-1}return t}}),r("Object.is",function(t){return t||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}}),r("Array.prototype.includes",function(t){return t||function(t,e){var n=this;n instanceof String&&(n=String(n));var i=n.length;for(e=e||0;e<i;e++)if(n[e]==t||Object.is(n[e],t))return!0;return!1}}),r("Promise",function(e){function n(t){this.b=0,this.j=void 0,this.f=[];var e=this.l();try{t(e.resolve,e.reject)}catch(t){e.reject(t)}}function i(){this.b=null}function o(t){return t instanceof n?t:new n(function(e){e(t)})}if(e)return e;i.prototype.f=function(t){null==this.b&&(this.b=[],this.l()),this.b.push(t)},i.prototype.l=function(){var t=this;this.j(function(){t.B()})};var r=t.wa.setTimeout;i.prototype.j=function(t){r(t,0)},i.prototype.B=function(){for(;this.b&&this.b.length;){var t=this.b;this.b=[];for(var e=0;e<t.length;++e){var n=t[e];delete t[e];try{n()}catch(t){this.m(t)}}}this.b=null},i.prototype.m=function(t){this.j(function(){throw t})},n.prototype.l=function(){function t(t){return function(i){n||(n=!0,t.call(e,i))}}var e=this,n=!1;return{resolve:t(this.H),reject:t(this.m)}},n.prototype.H=function(t){if(t===this)this.m(new TypeError("A Promise cannot resolve to itself"));else if(t instanceof n)this.O(t);else{t:switch(typeof t){case"object":var e=null!=t;break t;case"function":e=!0;break t;default:e=!1}e?this.F(t):this.B(t)}},n.prototype.F=function(t){var e=void 0;try{e=t.then}catch(t){return void this.m(t)}"function"==typeof e?this.R(e,t):this.B(t)},n.prototype.m=function(t){this.C(2,t)},n.prototype.B=function(t){this.C(1,t)},n.prototype.C=function(t,e){if(0!=this.b)throw Error("Cannot settle("+t+", "+e|"): Promise already settled in state"+this.b);this.b=t,this.j=e,this.D()},n.prototype.D=function(){if(null!=this.f){for(var t=this.f,e=0;e<t.length;++e)t[e].call(),t[e]=null;this.f=null}};var s=new i;return n.prototype.O=function(t){var e=this.l();t.Ld(e.resolve,e.reject)},n.prototype.R=function(t,e){var n=this.l();try{t.call(e,n.resolve,n.reject)}catch(t){n.reject(t)}},n.prototype.then=function(t,e){function i(t,e){return"function"==typeof t?function(e){try{o(t(e))}catch(t){r(t)}}:e}var o,r,s=new n(function(t,e){o=t,r=e});return this.Ld(i(t,o),i(e,r)),s},n.prototype.catch=function(t){return this.then(void 0,t)},n.prototype.Ld=function(t,e){function n(){switch(i.b){case 1:t(i.j);break;case 2:e(i.j);break;default:throw Error("Unexpected state: "+i.b)}}var i=this;null==this.f?s.f(n):this.f.push(function(){s.f(n)})},n.resolve=o,n.reject=function(t){return new n(function(e,n){n(t)})},n.race=function(e){return new n(function(n,i){for(var r=t.Ca(e),s=r.next();!s.done;s=r.next())o(s.value).Ld(n,i)})},n.all=function(e){var i=t.Ca(e),r=i.next();return r.done?o([]):new n(function(t,e){function n(e){return function(n){s[e]=n,0==--a&&t(s)}}var s=[],a=0;do{s.push(void 0),a++,o(r.value).Ld(n(s.length-1),e),r=i.next()}while(!r.done)})},n}),r("Array.from",function(e){return e||function(e,i,o){n(),i=null!=i?i:t.oa();var r=[],s=e[window.Symbol.iterator];if("function"==typeof s)for(e=s.call(e);!(s=e.next()).done;)r.push(i.call(o,s.value));else{s=e.length;for(var a=0;a<s;a++)r.push(i.call(o,e[a]))}return r}}),r("Math.sign",function(t){return t||function(t){return 0===(t=Number(t))||(0,window.isNaN)(t)?t:0<t?1:-1}}),r("WeakMap",function(i){function o(i){if(this.b=(c+=Math.random()+1).toString(),i){e(),n(),i=t.Ca(i);for(var o;!(o=i.next()).done;)o=o.value,this.set(o[0],o[1])}}function r(t){s(t,l)||ye(t,l,{value:{}})}function a(t){var e=Object[t];e&&(Object[t]=function(t){return r(t),e(t)})}if(function(){if(!i||!Object.seal)return!1;try{var t=Object.seal({}),e=Object.seal({}),n=new i([[t,2],[e,3]]);return 2==n.get(t)&&3==n.get(e)&&(n.delete(t),n.set(e,4),!n.has(t)&&4==n.get(e))}catch(t){return!1}}())return i;var l="$jscomp_hidden_"+Math.random();a("freeze"),a("preventExtensions"),a("seal");var c=0;return o.prototype.set=function(t,e){if(r(t),!s(t,l))throw Error("WeakMap key fail: "+t);return t[l][this.b]=e,this},o.prototype.get=function(t){return s(t,l)?t[l][this.b]:void 0},o.prototype.has=function(t){return s(t,l)&&s(t[l],this.b)},o.prototype.delete=function(t){return!(!s(t,l)||!s(t[l],this.b))&&delete t[l][this.b]},o}),r("Map",function(i){function r(){var t={};return t.Jb=t.next=t.head=t}function a(t,e){var n=t.b;return o(function(){if(n){for(;n.head!=t.b;)n=n.Jb;for(;n.next!=n.head;)return n=n.next,{done:!1,value:e(n)};n=null}return{done:!0,value:void 0}})}function l(t,e){var n=e&&typeof e;"object"==n||"function"==n?u.has(e)?n=u.get(e):(n=""+ ++h,u.set(e,n)):n="p_"+e;var i=t.f[n];if(i&&s(t.f,n))for(t=0;t<i.length;t++){var o=i[t];if(e!=e&&o.key!=o.key||e===o.key)return{id:n,list:i,index:t,Ra:o}}return{id:n,list:i,index:-1,Ra:void 0}}function c(e){if(this.f={},this.b=r(),this.size=0,e){e=t.Ca(e);for(var n;!(n=e.next()).done;)n=n.value,this.set(n[0],n[1])}}if(function(){if(!i||!i.prototype.entries||"function"!=typeof Object.seal)return!1;try{var e=Object.seal({x:4}),n=new i(t.Ca([[e,"s"]]));if("s"!=n.get(e)||1!=n.size||n.get({x:4})||n.set({x:4},"t")!=n||2!=n.size)return!1;var o=n.entries(),r=o.next();return!r.done&&r.value[0]==e&&"s"==r.value[1]&&!((r=o.next()).done||4!=r.value[0].x||"t"!=r.value[1]||!o.next().done)}catch(t){return!1}}())return i;e(),n();var u=new window.WeakMap;c.prototype.set=function(t,e){var n=l(this,t);return n.list||(n.list=this.f[n.id]=[]),n.Ra?n.Ra.value=e:(n.Ra={next:this.b,Jb:this.b.Jb,head:this.b,key:t,value:e},n.list.push(n.Ra),this.b.Jb.next=n.Ra,this.b.Jb=n.Ra,this.size++),this},c.prototype.delete=function(t){return!(!(t=l(this,t)).Ra||!t.list)&&(t.list.splice(t.index,1),t.list.length||delete this.f[t.id],t.Ra.Jb.next=t.Ra.next,t.Ra.next.Jb=t.Ra.Jb,t.Ra.head=null,this.size--,!0)},c.prototype.clear=function(){this.f={},this.b=this.b.Jb=r(),this.size=0},c.prototype.has=function(t){return!!l(this,t).Ra},c.prototype.get=function(t){return(t=l(this,t).Ra)&&t.value},c.prototype.entries=function(){return a(this,function(t){return[t.key,t.value]})},c.prototype.keys=function(){return a(this,function(t){return t.key})},c.prototype.values=function(){return a(this,function(t){return t.value})},c.prototype.forEach=function(t,e){for(var n,i=this.entries();!(n=i.next()).done;)n=n.value,t.call(e,n[1],n[0],this)},c.prototype[window.Symbol.iterator]=c.prototype.entries;var h=0;return c}),r("Array.prototype.fill",function(t){return t||function(t,e,n){var i=this.length||0;for(0>e&&(e=Math.max(0,i+e)),(null==n||n>i)&&(n=i),0>(n=Number(n))&&(n=Math.max(0,i+n)),e=Number(e||0);e<n;e++)this[e]=t;return this}}),t.ib=this,xe="closure_uid_"+(1e9*Math.random()>>>0),Ee=0;t:{var ke=t.ib.navigator;if(ke){var Oe=ke.userAgent;if(Oe){t.Ya=Oe;break t}}t.Ya=""}t.hb[" "]=t.Ha,t.Dh=t.$a("Opera"),t.Eh=t.bb(),t.Fh=t.$a("Edge"),t.Gh=t.$a("Gecko")&&!(t.Za()&&!t.$a("Edge"))&&!(t.$a("Trident")||t.$a("MSIE"))&&!t.$a("Edge"),t.Hh=t.Za()&&!t.$a("Edge"),t.Ih=t.$a("Macintosh"),t.Jh=t.$a("Windows"),t.Kh=t.$a("Linux")||t.$a("CrOS"),t.Lh=t.$a("Android"),t.Mh=t.gb(),t.Nh=t.$a("iPad"),t.Oh=t.$a("iPod");t:{var Ie="",Ne=(Ce=t.Ya,t.Gh?/rv:([^\);]+)(\)|;)/.exec(Ce):t.Fh?/Edge\/([\d\.]+)/.exec(Ce):t.Eh?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(Ce):t.Hh?/WebKit\/(\S+)/.exec(Ce):t.Dh?/(?:Version)[ \/]?(\S+)/.exec(Ce):void 0);if(Ne&&(Ie=Ne?Ne[1]:""),t.Eh){var _e=h();if(null!=_e&&_e>(0,window.parseFloat)(Ie)){Se=String(_e);break t}}Se=Ie}t.Th=Se;var Re,Me=t.ib.document;t.Uh=Me&&t.Eh?h()||("CSS1Compat"==Me.compatMode?(0,window.parseInt)(t.Th,10):5):void 0,t.Wh=t.$a("Firefox"),t.Xh=t.gb()||t.$a("iPod"),t.Yh=t.$a("iPad"),t.Zh=t.fb(),t.$h=u(),t.ai=t.eb()&&!(t.gb()||t.$a("iPad")||t.$a("iPod")),Re=t.Gh||t.Hh&&!t.ai||t.Dh,t.ci=Re||"function"==typeof t.ib.btoa,t.di=Re||!t.ai&&!t.Eh&&"function"==typeof t.ib.atob,f.prototype.get=function(){if(0<this.f){this.f--;var t=this.b;this.b=t.next,t.next=null}else t=this.j();return t};var De,je,$e,Pe=function(){return null},We=t.lb,Fe=new f(function(){return new v},function(t){t.reset()});m.prototype.add=function(t,e){var n=Fe.get();n.set(t,e),this.f?this.f.next=n:this.b=n,this.f=n},m.prototype.remove=function(){var t=null;return this.b&&(t=this.b,this.b=this.b.next,this.b||(this.f=null),t.next=null),t},v.prototype.set=function(t,e){this.Hc=t,this.b=e,this.next=null},v.prototype.reset=function(){this.next=this.b=this.Hc=null},t.nb.m=function(){if(-1!=String(t.ib.Promise).indexOf("[native code]")){var e=t.ib.Promise.resolve(void 0);t.nb.b=function(){e.then(t.nb.f)}}else t.nb.b=function(){d()}},t.nb.B=function(e){t.nb.b=function(){d(),e&&e(t.nb.f)}},t.nb.j=!1,t.nb.l=new m,t.nb.f=function(){for(var e;e=t.nb.l.remove();){try{e.Hc.call(e.b)}catch(t){p(t)}var n=Fe;n.l(e),100>n.f&&(n.f++,e.next=n.b,n.b=e)}t.nb.j=!1},t.gi={ROADMAP:"roadmap",SATELLITE:"satellite",HYBRID:"hybrid",TERRAIN:"terrain"},t.Kf={TOP_LEFT:1,TOP_CENTER:2,TOP:2,TOP_RIGHT:3,LEFT_CENTER:4,LEFT_TOP:5,LEFT:5,LEFT_BOTTOM:6,RIGHT_TOP:7,RIGHT:7,RIGHT_CENTER:8,RIGHT_BOTTOM:9,BOTTOM_LEFT:10,BOTTOM_CENTER:11,BOTTOM:11,BOTTOM_RIGHT:12,CENTER:13},t.v(y,Error),t.cc=t.Yb(t.Hb,"not a number"),je=t.$b(t.cc,function(e){if((0,window.isNaN)(e))throw t.Rb("NaN is not an accepted value");return e}),t.ii=t.Yb(t.Jb,"not a string"),$e=t.Yb(t.Kb,"not a boolean"),t.ki=t.ac(t.cc),t.li=t.ac(t.ii),t.mi=t.ac($e),t.ni=new t.y(0,0),t.y.prototype.toString=function(){return"("+this.x+", "+this.y+")"},t.y.prototype.W=function(t){return!!t&&(t.x==this.x&&t.y==this.y)},t.y.prototype.equals=t.y.prototype.W,t.y.prototype.round=function(){this.x=Math.round(this.x),this.y=Math.round(this.y)},t.y.prototype.ce=t.ua(0),t.oi=new t.z(0,0),t.z.prototype.toString=function(){return"("+this.width+", "+this.height+")"},t.z.prototype.W=function(t){return!!t&&(t.width==this.width&&t.height==this.height)},t.z.prototype.equals=t.z.prototype.W,t.fc.prototype.W=function(t){return!!t&&(this.b==t.b&&this.f==t.f)},S.prototype.W=function(t){return!!t&&(this.m11==t.m11&&this.m12==t.m12&&this.m21==t.m21&&this.m22==t.m22)},t.ic.prototype.isEmpty=function(){return!(this.I<this.K&&this.J<this.L)},t.ic.prototype.extend=function(t){t&&(this.I=Math.min(this.I,t.x),this.K=Math.max(this.K,t.x),this.J=Math.min(this.J,t.y),this.L=Math.max(this.L,t.y))},t.ic.prototype.getCenter=function(){return new t.y((this.I+this.K)/2,(this.J+this.L)/2)},t.ic.prototype.W=function(t){return!!t&&(this.I==t.I&&this.J==t.J&&this.K==t.K&&this.L==t.L)},t.pi=t.kc(-window.Infinity,-window.Infinity,window.Infinity,window.Infinity),t.qi=t.kc(0,0,0,0),t.m=A.prototype,t.m.isEmpty=function(){return 360==this.b-this.f},t.m.intersects=function(e){var n=this.b,i=this.f;return!this.isEmpty()&&!e.isEmpty()&&(t.mc(this)?t.mc(e)||e.b<=this.f||e.f>=n:t.mc(e)?e.b<=i||e.f>=n:e.b<=i&&e.f>=n)},t.m.contains=function(e){-180==e&&(e=180);var n=this.b,i=this.f;return t.mc(this)?(e>=n||e<=i)&&!this.isEmpty():e>=n&&e<=i},t.m.extend=function(e){this.contains(e)||(this.isEmpty()?this.b=this.f=e:t.nc(e,this.b)<t.nc(this.f,e)?this.b=e:this.f=e)},t.m.W=function(e){return 1e-9>=Math.abs(e.b-this.b)%360+Math.abs(t.oc(e)-t.oc(this))},t.m.Sb=function(){var e=(this.b+this.f)/2;return t.mc(this)&&(e=t.Cb(e+180,-180,180)),e},t.m=L.prototype,t.m.isEmpty=function(){return this.b>this.f},t.m.intersects=function(t){var e=this.b,n=this.f;return e<=t.b?t.b<=n&&t.b<=t.f:e<=t.f&&e<=n},t.m.contains=function(t){return t>=this.b&&t<=this.f},t.m.extend=function(t){this.isEmpty()?this.f=this.b=t:t<this.b?this.b=t:t>this.f&&(this.f=t)},t.m.W=function(t){return this.isEmpty()?t.isEmpty():1e-9>=Math.abs(t.b-this.b)+Math.abs(this.f-t.f)},t.m.Sb=function(){return(this.f+this.b)/2};var He=t.Tb({lat:t.cc,lng:t.cc},!0);t.D.prototype.toString=function(){return"("+this.lat()+", "+this.lng()+")"},t.D.prototype.toJSON=function(){return{lat:this.lat(),lng:this.lng()}},t.D.prototype.W=function(e){return!!e&&(t.Db(this.lat(),e.lat())&&t.Db(this.lng(),e.lng()))},t.D.prototype.equals=t.D.prototype.W,t.D.prototype.toUrlValue=function(e){return e=t.p(e)?e:6,k(this.lat(),e)+","+k(this.lng(),e)},t.oe=t.Xb(t.wc),t.m=t.xc.prototype,t.m.getCenter=function(){return new t.D(this.f.Sb(),this.b.Sb())},t.m.toString=function(){return"("+this.getSouthWest()+", "+this.getNorthEast()+")"},t.m.toJSON=function(){return{south:this.f.b,west:this.b.b,north:this.f.f,east:this.b.f}},t.m.toUrlValue=function(t){var e=this.getSouthWest(),n=this.getNorthEast();return[e.toUrlValue(t),n.toUrlValue(t)].join()},t.m.W=function(e){return!!e&&(e=t.Ac(e),this.f.W(e.f)&&this.b.W(e.b))},t.xc.prototype.equals=t.xc.prototype.W,t.m=t.xc.prototype,t.m.contains=function(e){return e=t.wc(e),this.f.contains(e.lat())&&this.b.contains(e.lng())},t.m.intersects=function(e){return e=t.Ac(e),this.f.intersects(e.f)&&this.b.intersects(e.b)},t.m.extend=function(e){return e=t.wc(e),this.f.extend(e.lat()),this.b.extend(e.lng()),this},t.m.union=function(e){return!(e=t.Ac(e))||e.isEmpty()?this:(this.extend(e.getSouthWest()),this.extend(e.getNorthEast()),this)},t.m.getSouthWest=function(){return new t.D(this.f.b,this.b.b,!0)},t.m.getNorthEast=function(){return new t.D(this.f.f,this.b.f,!0)},t.m.toSpan=function(){var e=this.f;return e=e.isEmpty()?0:e.f-e.b,new t.D(e,t.oc(this.b),!0)},t.m.isEmpty=function(){return this.f.isEmpty()||this.b.isEmpty()};var Be,ze=t.Tb({south:t.cc,west:t.cc,north:t.cc,east:t.cc},!1);t.F={addListener:function(t,e,n){return new R(t,e,n,0)},hasListeners:function(e,n){return!!e&&(!!(n=(e=e.__e3_)&&e[n])&&!t.Ab(n))},removeListener:function(t){t&&t.remove()},clearListeners:function(e,n){t.yb(I(e,n),function(t,e){e&&e.remove()})},clearInstanceListeners:function(e){t.yb(I(e),function(t,e){e&&e.remove()})},trigger:function(e,n,i){if(t.F.hasListeners(e,n)){var o,r=t.Xa(arguments,2),s=I(e,n);for(o in s){var a=s[o];a&&a.b.apply(a.f,r)}}},addDomListener:function(t,e,n,i){var o=i?4:1;return!t.addEventListener&&t.attachEvent?(n=new R(t,e,n,2),t.attachEvent("on"+e,M(n)),n):(t.addEventListener&&t.addEventListener(e,n,i),new R(t,e,n,o))},addDomListenerOnce:function(e,n,i,o){var r=t.F.addDomListener(e,n,function(){return r.remove(),i.apply(this,arguments)},o);return r},Y:function(e,n,i,o){return t.F.addDomListener(e,n,N(i,o))},bind:function(e,n,i,o){return t.F.addListener(e,n,(0,t.t)(o,i))},addListenerOnce:function(e,n,i){var o=t.F.addListener(e,n,function(){return o.remove(),i.apply(this,arguments)});return o},forward:function(e,n,i){return t.F.addListener(e,n,_(n,i))},Za:function(e,n,i,o){return t.F.addDomListener(e,n,_(n,i,!o))}},Be=0,R.prototype.remove=function(){if(this.f){if(this.f.removeEventListener)switch(this.l){case 1:this.f.removeEventListener(this.j,this.b,!1);break;case 4:this.f.removeEventListener(this.j,this.b,!0)}delete O(this.f,this.j)[this.id],this.b=this.f=null}},t.Rc.prototype.heading=t.qa("f"),t.Rc.prototype.b=t.qa("j"),t.Rc.prototype.toString=function(){return this.f+","+this.j},t.ri=new t.Rc,t.m=t.G.prototype,t.m.get=function(e){var n=j(this);if(n=b(n,e+=""),t.p(n)){if(n){e=n.ub,n=n.Jc;var i="get"+t.Wc(e);return n[i]?n[i]():n.get(e)}return this[e]}},t.m.set=function(e,n){var i=j(this),o=b(i,e+="");o?(e=o.ub,(o=o.Jc)[i="set"+t.Wc(e)]?o[i](n):o.set(e,n)):(this[e]=n,i[e]=null,D(this,e))},t.m.notify=function(t){var e=j(this);(e=b(e,t+=""))?e.Jc.notify(e.ub):D(this,t)},t.m.setValues=function(e){for(var n in e){var i=e[n],o="set"+t.Wc(n);this[o]?this[o](i):this.set(n,i)}},t.m.setOptions=t.G.prototype.setValues,t.m.changed=t.k();var Xe={};t.G.prototype.bindTo=function(e,n,i,o){e+="",i=(i||e)+"",this.unbind(e);var r={Jc:this,ub:e},s={Jc:n,ub:i,Yg:r};j(this)[e]=s,$(n,i)[t.Sc(r)]=r,o||D(this,e)},t.G.prototype.unbind=function(e){var n=j(this),i=n[e];i&&(i.Yg&&delete $(i.Jc,i.ub)[t.Sc(i.Yg)],this[e]=this.get(e),n[e]=null)},t.G.prototype.unbindAll=function(){var e,n=(0,t.t)(this.unbind,this),i=j(this);for(e in i)n(e)},t.G.prototype.addListener=function(e,n){return t.F.addListener(this,e,n)},P.prototype.addListener=function(e,n,i){i=i?{Zg:!1}:null;var o=!this.M.length,r=this.M,s=c(r,W(e,n));return(r=0>s?null:t.Fa(r)?r.charAt(s):r[s])?r.once=r.once&&i:this.M.push({Hc:e,context:n||null,once:i}),o&&this.f(),e},P.prototype.addListenerOnce=function(t,e){return this.addListener(t,e,!0),t},P.prototype.removeListener=function(e,n){if(this.M.length){var i=this.M;0<=(e=c(i,W(e,n)))&&t.Va(i,e),this.M.length||this.b()}};var Ye=t.nb;t.m=t.bd.prototype,t.m.ud=t.k(),t.m.sd=t.k(),t.m.addListener=function(t,e){return this.M.addListener(t,e)},t.m.addListenerOnce=function(t,e){return this.M.addListenerOnce(t,e)},t.m.removeListener=function(t,e){return this.M.removeListener(t,e)},t.m.notify=function(e){t.$c(this.M,function(t){t(this.get())},this,e)},t.v(t.gd,t.G),t.m=t.gd.prototype,t.m.getAt=function(t){return this.b[t]},t.m.indexOf=function(t){for(var e=0,n=this.b.length;e<n;++e)if(t===this.b[e])return e;return-1},t.m.forEach=function(t){for(var e=0,n=this.b.length;e<n;++e)t(this.b[e],e)},t.m.setAt=function(e,n){var i=this.b[e],o=this.b.length;if(e<o)this.b[e]=n,t.F.trigger(this,"set_at",e,i),this.l&&this.l(e,i);else{for(i=o;i<e;++i)this.insertAt(i,void 0);this.insertAt(e,n)}},t.m.insertAt=function(e,n){this.b.splice(e,0,n),F(this),t.F.trigger(this,"insert_at",e),this.f&&this.f(e)},t.m.removeAt=function(e){var n=this.b[e];return this.b.splice(e,1),F(this),t.F.trigger(this,"remove_at",e,n),this.j&&this.j(e,n),n},t.m.push=function(t){return this.insertAt(this.b.length,t),this.b.length},t.m.pop=function(){return this.removeAt(this.b.length-1)},t.m.getArray=t.qa("b"),t.m.clear=function(){for(;this.get("length");)this.pop()},t.ed(t.gd.prototype,{length:null}),t.hd.prototype.remove=function(e){var n=this.f,i=t.Sc(e);n[i]&&(delete n[i],--this.j,t.F.trigger(this,"remove",e),this.onRemove&&this.onRemove(e))},t.hd.prototype.contains=function(e){return!!this.f[t.Sc(e)]},t.hd.prototype.forEach=function(t){var e,n=this.f;for(e in n)t.call(this,n[e])},t.jd.prototype.mb=t.ua(1),t.jd.prototype.forEach=function(e,n){t.x(this.b,function(t,i){e.call(n,t,i)})};var Ue,qe=t.Tb({zoom:t.ac(je),heading:je,pitch:je});t.v(t.ld,t.G),t.v(t.md,t.bd),t.md.prototype.set=function(t){this.m&&this.get()===t||(this.yi(t),this.notify())},t.v(H,t.md),H.prototype.get=t.qa("b"),H.prototype.yi=t.pa("b"),t.v(B,t.G),t.rg=t.xd("d",void 0),t.ti=t.xd("f",void 0),t.R=t.zd(),t.ui=t.yd("i",void 0),t.ug=new X("i",3,void 0,void 0),t.vi=new X("j",3,"",void 0),t.S=t.xd("u",void 0),t.Wf=t.yd("u",void 0),t.wi=new X("u",3,void 0,void 0),t.xi=t.Ad(),t.U=t.Bd(),t.T=t.Cd(),t.tg=new X("e",3,void 0,void 0),t.V=t.xd("s",void 0),t.yi=t.yd("s",void 0),t.zi=new X("s",3,void 0,void 0),t.Ai=t.xd("B",void 0),t.Bi=t.xd("x",void 0),t.Ci=t.yd("x",void 0),t.Di=new X("x",3,void 0,void 0),t.Ei=new X("y",3,void 0,void 0),t.yg=new U,Ue=/'/g,U.prototype.b=function(t,e){var n=[];return q(t,e,n),n.join("&").replace(Ue,"%27")},t.K.prototype.W=function(e){return t.ud(this.data,e?(e&&e).data:null)},t.K.prototype.Li=t.ua(2),t.v(G,t.G),G.prototype.set=function(e,n){if(null!=n&&!(n&&t.Hb(n.maxZoom)&&n.tileSize&&n.tileSize.width&&n.tileSize.height&&n.getTile&&n.getTile.apply))throw Error("Giá trị kỳ vọng để triển khai google.maps.MapType");return t.G.prototype.set.apply(this,arguments)},t.v(t.Rd,t.G),t.v(t.Td,K),t.Td.prototype.getType=t.ra("Point"),t.Td.prototype.forEachLatLng=function(t){t(this.b)},t.Td.prototype.get=t.qa("b");var Ve=t.Xb(Q);tt.f=void 0,tt.b=function(){return tt.f?tt.f:tt.f=new tt},tt.prototype.na=function(e,n){if(!this.b[e]){var i=this,o=i.m;ot(i.j,function(r){for(var s=r.b[e]||[],a=r.l[e]||[],l=o[e]=t.Vd(s.length,function(){delete o[e],n(r.f);for(var t=i.f[e],s=t?t.length:0,l=0;l<s;++l)t[l](i.b[e]);for(delete i.f[e],l=0,t=a.length;l<t;++l)s=a[l],o[s]&&o[s]()}),c=0,u=s.length;c<u;++c)i.b[s[c]]&&l()})}},t.m=t.ie.prototype,t.m.getId=t.qa("j"),t.m.getGeometry=t.qa("b"),t.m.setGeometry=function(e){var n=this.b;try{this.b=e?Q(e):null}catch(e){return void t.Sb(e)}t.F.trigger(this,"setgeometry",{feature:this,newGeometry:this.b,oldGeometry:n})},t.m.getProperty=function(t){return b(this.f,t)},t.m.setProperty=function(e,n){if(void 0===n)this.removeProperty(e);else{var i=this.getProperty(e);this.f[e]=n,t.F.trigger(this,"setproperty",{feature:this,name:e,newValue:n,oldValue:i})}},t.m.removeProperty=function(e){var n=this.getProperty(e);delete this.f[e],t.F.trigger(this,"removeproperty",{feature:this,name:e,oldValue:n})},t.m.forEachProperty=function(t){for(var e in this.f)t(this.getProperty(e),e)},t.m.toGeoJson=function(e){var n=this;t.O("data",function(t){t.f(n,e)})};var Ge={mp:"Point",ip:"LineString",POLYGON:"Polygon"},Ke={CIRCLE:0,FORWARD_CLOSED_ARROW:1,FORWARD_OPEN_ARROW:2,BACKWARD_CLOSED_ARROW:3,BACKWARD_OPEN_ARROW:4};t.m=st.prototype,t.m.contains=function(e){return this.b.hasOwnProperty(t.Sc(e))},t.m.getFeatureById=function(t){return b(this.f,t)},t.m.add=function(e){if(e=(e=e||{})instanceof t.ie?e:new t.ie(e),!this.contains(e)){var n=e.getId();if(n){var i=this.getFeatureById(n);i&&this.remove(i)}i=t.Sc(e),this.b[i]=e,n&&(this.f[n]=e);var o=t.F.forward(e,"setgeometry",this),r=t.F.forward(e,"setproperty",this),s=t.F.forward(e,"removeproperty",this);this.j[i]=function(){t.F.removeListener(o),t.F.removeListener(r),t.F.removeListener(s)},t.F.trigger(this,"addfeature",{feature:e})}return e},t.m.remove=function(e){var n=t.Sc(e),i=e.getId();this.b[n]&&(delete this.b[n],i&&delete this.f[i],(i=this.j[n])&&(delete this.j[n],i()),t.F.trigger(this,"removefeature",{feature:e}))},t.m.forEach=function(t){for(var e in this.b)t(this.b[e])},t.ze="click dblclick mousedown mousemove mouseout mouseover mouseup rightclick".split(" "),at.prototype.get=function(t){return this.b[t]},at.prototype.set=function(e,n){var i=this.b;i[e]||(i[e]={}),t.zb(i[e],n),t.F.trigger(this,"changed",e)},at.prototype.reset=function(e){delete this.b[e],t.F.trigger(this,"changed",e)},at.prototype.forEach=function(e){t.yb(this.b,e)},t.v(lt,t.G),lt.prototype.overrideStyle=function(e,n){this.b.set(t.Sc(e),n)},lt.prototype.revertStyle=function(e){e?this.b.reset(t.Sc(e)):this.b.forEach((0,t.t)(this.b.reset,this.b))},t.v(t.ne,K),t.m=t.ne.prototype,t.m.getType=t.ra("GeometryCollection"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(function(e){e.forEachLatLng(t)})},t.v(t.pe,K),t.m=t.pe.prototype,t.m.getType=t.ra("LineString"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(t)};var Qe=t.Xb(t.Vb(t.pe,"google.maps.Data.LineString",!0));t.v(t.qe,K),t.m=t.qe.prototype,t.m.getType=t.ra("LinearRing"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(t)};var Je=t.Xb(t.Vb(t.qe,"google.maps.Data.LinearRing",!0));t.v(t.se,K),t.m=t.se.prototype,t.m.getType=t.ra("MultiLineString"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(function(e){e.forEachLatLng(t)})},t.v(t.te,K),t.m=t.te.prototype,t.m.getType=t.ra("MultiPoint"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(t)},t.v(t.ve,K),t.m=t.ve.prototype,t.m.getType=t.ra("Polygon"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(function(e){e.forEachLatLng(t)})};var Ze=t.Xb(t.Vb(t.ve,"google.maps.Data.Polygon",!0));t.v(t.xe,K),t.m=t.xe.prototype,t.m.getType=t.ra("MultiPolygon"),t.m.getLength=function(){return this.b.length},t.m.getAt=function(t){return this.b[t]},t.m.getArray=function(){return this.b.slice()},t.m.forEachLatLng=function(t){this.b.forEach(function(e){e.forEachLatLng(t)})},t.Ii=t.ac(t.Vb(t.Rd,"Map")),t.v(ct,t.G),t.m=ct.prototype,t.m.contains=function(t){return this.b.contains(t)},t.m.getFeatureById=function(t){return this.b.getFeatureById(t)},t.m.add=function(t){return this.b.add(t)},t.m.remove=function(t){this.b.remove(t)},t.m.forEach=function(t){this.b.forEach(t)},t.m.addGeoJson=function(e,n){return t.ye(this.b,e,n)},t.m.loadGeoJson=function(e,n,i){var o=this.b;t.O("data",function(t){t.El(o,e,n,i)})},t.m.toGeoJson=function(e){var n=this.b;t.O("data",function(t){t.Al(n,e)})},t.m.overrideStyle=function(t,e){this.f.overrideStyle(t,e)},t.m.revertStyle=function(t){this.f.revertStyle(t)},t.m.controls_changed=function(){this.get("controls")&&ut(this)},t.m.drawingMode_changed=function(){this.get("drawingMode")&&ut(this)},t.ed(ct.prototype,{map:t.Ii,style:t.lb,controls:t.ac(t.Xb(t.Wb(Ge))),controlPosition:t.ac(t.Wb(t.Kf)),drawingMode:t.ac(t.Wb(Ge))}),t.Ji={METRIC:0,IMPERIAL:1},t.Ki={DRIVING:"DRIVING",WALKING:"WALKING",BICYCLING:"BICYCLING",TRANSIT:"TRANSIT"},t.Li={BEST_GUESS:"bestguess",OPTIMISTIC:"optimistic",PESSIMISTIC:"pessimistic"},t.Mi={BUS:"BUS",RAIL:"RAIL",SUBWAY:"SUBWAY",TRAIN:"TRAIN",TRAM:"TRAM"},t.Ni={LESS_WALKING:"LESS_WALKING",FEWER_TRANSFERS:"FEWER_TRANSFERS"};var tn=t.Tb({routes:t.Xb(t.Yb(t.Ib))},!0),en={main:[],common:["main"],util:["common"],adsense:["main"],controls:["util"],data:["util"],directions:["util","geometry"],distance_matrix:["util"],drawing:["main"],drawing_impl:["controls"],elevation:["util","geometry"],geocoder:["util"],geojson:["main"],imagery_viewer:["main"],geometry:["main"],infowindow:["util"],kml:["onion","util","map"],layers:["map"],map:["common"],marker:["util"],maxzoom:["util"],onion:["util","map"],overlay:["common"],panoramio:["main"],places:["main"],places_impl:["controls"],poly:["util","map","geometry"],search:["main"],search_impl:["onion"],stats:["util"],streetview:["util","geometry"],usage:["util"],visualization:["main"],visualization_impl:["onion"],weather:["main"],zombie:["main"]},nn=t.ib.google.maps,on=tt.b(),rn=(0,t.t)(on.na,on);nn.__gjsload__=rn,t.yb(nn.modules,rn),delete nn.modules;var sn=t.Tb({source:t.ii,webUrl:t.li,iosDeepLinkId:t.li}),an=t.$b(t.Tb({placeId:t.li,query:t.li,location:t.wc}),function(e){if(e.placeId&&e.query)throw t.Rb("cannot set both placeId and query");if(!e.placeId&&!e.query)throw t.Rb("must set one of placeId or query");return e});t.v(pt,t.G),t.ed(pt.prototype,{position:t.ac(t.wc),title:t.li,icon:t.ac(t.Zb([t.ii,{og:x("url"),then:t.Tb({url:t.ii,scaledSize:t.ac(T),size:t.ac(T),origin:t.ac(E),anchor:t.ac(E),labelOrigin:t.ac(E),path:t.Yb(function(t){return null==t})},!0)},{og:x("path"),then:t.Tb({path:t.Zb([t.ii,t.Wb(Ke)]),anchor:t.ac(E),labelOrigin:t.ac(E),fillColor:t.li,fillOpacity:t.ki,rotation:t.ki,scale:t.ki,strokeColor:t.li,strokeOpacity:t.ki,strokeWeight:t.ki,url:t.Yb(function(t){return null==t})},!0)}])),label:t.ac(t.Zb([t.ii,{og:x("text"),then:t.Tb({text:t.ii,fontSize:t.li,fontWeight:t.li,fontFamily:t.li},!0)}])),shadow:t.lb,shape:t.lb,cursor:t.li,clickable:t.mi,animation:t.lb,draggable:t.mi,visible:t.mi,flat:t.lb,zIndex:t.ki,opacity:t.ki,place:t.ac(an),attribution:t.ac(sn)});var ln=t.ac(t.Vb(t.ld,"StreetViewPanorama"));t.v(t.Ie,pt),t.Ie.prototype.map_changed=function(){this.__gm.set&&this.__gm.set.remove(this);var e=this.get("map");this.__gm.set=e&&e.__gm.Eb,this.__gm.set&&t.id(this.__gm.set,this)},t.Ie.MAX_ZINDEX=1e6,t.ed(t.Ie.prototype,{map:t.Zb([t.Ii,ln])}),t.v(dt,t.G),t.m=dt.prototype,t.m.internalAnchor_changed=function(){var e=this.get("internalAnchor");gt(this,"attribution",e),gt(this,"place",e),gt(this,"internalAnchorMap",e,"map"),gt(this,"internalAnchorPoint",e,"anchorPoint"),e instanceof t.Ie?gt(this,"internalAnchorPosition",e,"internalPosition"):gt(this,"internalAnchorPosition",e,"position")},t.m.internalAnchorPoint_changed=dt.prototype.internalPixelOffset_changed=function(){var e=this.get("internalAnchorPoint")||t.ni,n=this.get("internalPixelOffset")||t.oi;this.set("pixelOffset",new t.z(n.width+Math.round(e.x),n.height+Math.round(e.y)))},t.m.internalAnchorPosition_changed=function(){var t=this.get("internalAnchorPosition");t&&this.set("position",t)},t.m.internalAnchorMap_changed=function(){this.get("internalAnchor")&&this.b.set("map",this.get("internalAnchorMap"))},t.m.fn=function(){var t=this.get("internalAnchor");!this.b.get("map")&&t&&t.get("map")&&this.set("internalAnchor",null)},t.m.internalContent_changed=function(){this.set("content",ht(this.get("internalContent")))},t.m.trigger=function(e){t.F.trigger(this.b,e)},t.m.close=function(){this.b.set("map",null)},t.v(t.Le,t.G),t.ed(t.Le.prototype,{content:t.Zb([t.li,t.Yb(w)]),position:t.ac(t.wc),size:t.ac(T),map:t.Zb([t.Ii,ln]),anchor:t.ac(t.Vb(t.G,"MVCObject")),zIndex:t.ki}),t.Le.prototype.open=function(t,e){this.set("anchor",e),e?!this.get("map")&&t&&this.set("map",t):this.set("map",t)},t.Le.prototype.close=function(){this.set("map",null)},t.Me=[],t.v(mt,t.G),mt.prototype.changed=function(e){if("map"==e||"panel"==e){var n=this;t.O("directions",function(t){t.fm(n,e)})}"panel"==e&&t.Ne(this.getPanel())},t.ed(mt.prototype,{directions:tn,map:t.Ii,panel:t.ac(t.Yb(w)),routeIndex:t.ki}),vt.prototype.route=function(e,n){t.O("directions",function(t){t.xi(e,n,!0)})},bt.prototype.getDistanceMatrix=function(e,n){t.O("distance_matrix",function(t){t.b(e,n)})},yt.prototype.getElevationAlongPath=function(e,n){t.O("elevation",function(t){t.getElevationAlongPath(e,n)})},yt.prototype.getElevationForLocations=function(e,n){t.O("elevation",function(t){t.getElevationForLocations(e,n)})},t.bj=t.Vb(t.xc,"LatLngBounds"),t.Se.prototype.geocode=function(e,n){t.O("geocoder",function(t){t.geocode(e,n)})},t.v(t.Te,t.G),t.Te.prototype.map_changed=function(){var e=this;t.O("kml",function(t){t.b(e)})},t.ed(t.Te.prototype,{map:t.Ii,url:null,bounds:null,opacity:t.ki}),t.dj={UNKNOWN:"UNKNOWN",OK:t.ia,INVALID_REQUEST:t.ca,DOCUMENT_NOT_FOUND:"DOCUMENT_NOT_FOUND",FETCH_ERROR:"FETCH_ERROR",INVALID_DOCUMENT:"INVALID_DOCUMENT",DOCUMENT_TOO_LARGE:"DOCUMENT_TOO_LARGE",LIMITS_EXCEEDED:"LIMITS_EXECEEDED",TIMED_OUT:"TIMED_OUT"},t.v(wt,t.G),t.m=wt.prototype,t.m.Gd=function(){var e=this;t.O("kml",function(t){t.f(e)})},t.m.url_changed=wt.prototype.Gd,t.m.driveFileId_changed=wt.prototype.Gd,t.m.map_changed=wt.prototype.Gd,t.m.zIndex_changed=wt.prototype.Gd,t.ed(wt.prototype,{map:t.Ii,defaultViewport:null,metadata:null,status:null,url:t.li,screenOverlays:t.mi,zIndex:t.ki}),t.v(t.Ve,t.G),t.ed(t.Ve.prototype,{map:t.Ii}),t.v(xt,t.G),t.ed(xt.prototype,{map:t.Ii}),t.v(Et,t.G),t.ed(Et.prototype,{map:t.Ii}),t.Ze.prototype.Zd=!0,t.Ze.prototype.Hb=t.ua(4),t.Ze.prototype.Nh=!0,t.Ze.prototype.Wd=t.ua(6),t.Ye={},t.$e("about:blank"),t.bf.prototype.Nh=!0,t.bf.prototype.Wd=t.ua(5),t.bf.prototype.Zd=!0,t.bf.prototype.Hb=t.ua(3),t.af={},t.cf("<!DOCTYPE html>",0),t.cf("",0),t.cf("<br>",0);var cn,un,hn,fn,pn,dn,gn,mn,vn,bn,yn,wn="StopIteration"in t.ib?t.ib.StopIteration:{message:"StopIteration",stack:""};Tt.prototype.next=function(){throw wn},t.v(St,Tt),St.prototype.setPosition=function(e,n,i){(this.node=e)&&(this.f=t.Ga(n)?n:1!=this.node.nodeType?0:this.b?-1:1),t.Ga(i)&&(this.depth=i)},St.prototype.next=function(){if(this.j){if(!this.node||this.l&&0==this.depth)throw wn;var t=this.node,e=this.b?-1:1;if(this.f==e){var n=this.b?t.lastChild:t.firstChild;n?this.setPosition(n):this.setPosition(t,-1*e)}else(n=this.b?t.previousSibling:t.nextSibling)?this.setPosition(n):this.setPosition(t.parentNode,-1*e);this.depth+=this.f*(this.b?-1:1)}else this.j=!0;if(t=this.node,!this.node)throw wn;return t},St.prototype.W=function(t){return t.node==this.node&&(!this.node||t.f==this.f)},St.prototype.splice=function(e){var n=this.node,i=this.b?1:-1;this.f==i&&(this.f=-1*i,this.depth+=this.f*(this.b?-1:1)),this.b=!this.b,St.prototype.next.call(this),this.b=!this.b;for(var o=(i=t.Ka(arguments[0])?arguments[0]:arguments).length-1;0<=o;o--)t.df(i[o],n);t.ef(n)},t.v(Ct,St),Ct.prototype.next=function(){do{Ct.vb.next.call(this)}while(-1==this.f);return this.node},t.v(At,t.K),t.v(Lt,t.K),t.v(kt,t.K),t.v(Ot,t.K),t.v(t.pf,t.K),t.v(It,t.K),t.v(Nt,t.K),t.v(_t,t.K),t.Sf={},t.Ff.prototype.W=function(e){return this==e||e instanceof t.Ff&&this.size.W(e.size)&&this.heading==e.heading&&this.b==e.b},t.fj=new t.Ff(new t.fc(256,256),0,0),t.Gf.prototype.fromLatLngToPoint=function(e,n){n=n||new t.y(0,0);var i=this.b;return n.x=i.x+e.lng()*this.j,e=t.Bb(Math.sin(t.vb(e.lat())),-(1-1e-15),1-1e-15),n.y=i.y+.5*Math.log((1+e)/(1-e))*-this.l,n},t.Gf.prototype.fromPointToLatLng=function(e,n){var i=this.b;return new t.D(t.wb(2*Math.atan(Math.exp((e.y-i.y)/-this.l))-Math.PI/2),(e.x-i.x)/this.j,n)},t.Jf={japan_prequake:20,japan_postquake2010:24},t.gj={NEAREST:"nearest",BEST:"best"},t.hj={DEFAULT:"default",OUTDOOR:"outdoor"},t.v(jt,t.ld),jt.prototype.visible_changed=function(){var e=this;!e.m&&e.getVisible()&&(e.m=!0,t.O("streetview",function(t){if(e.f)var n=e.f;t.wn(e,n)}))},t.ed(jt.prototype,{visible:t.mi,pano:t.li,position:t.ac(t.wc),pov:t.ac(qe),motionTracking:$e,photographerPov:null,location:null,links:t.Xb(t.Yb(t.Ib)),status:null,zoom:t.ki,enableCloseButton:t.mi}),jt.prototype.registerPanoProvider=function(t,e){this.set("panoProvider",{ni:t,options:e||{}})},t.v(Pt,B),t.Of.prototype.addListener=function(t,e){this.M.addListener(t,e)},t.Of.prototype.addListenerOnce=function(t,e){this.M.addListenerOnce(t,e)},t.Of.prototype.removeListener=function(t,e){this.M.removeListener(t,e)},t.Of.prototype.b=t.ua(7),t.v(t.Pf,t.G),t.Pf.prototype.P=function(){var e=this;e.wa||(e.wa=t.ib.setTimeout(function(){e.wa=void 0,e.da()},e.bl))},t.Pf.prototype.B=function(){this.wa&&t.ib.clearTimeout(this.wa),this.wa=void 0,this.da()},t.v(Wt,t.K),t.v(Ht,t.K),t.v(Bt,t.K),t.v(zt,t.K),t.v(Xt,t.K),t.v(Yt,t.K),t.v(Ut,t.K),Ut.prototype.getZoom=function(){return t.L(this,2)},Ut.prototype.setZoom=function(t){this.data[2]=t},t.v(Vt,t.Pf);var xn={roadmap:0,satellite:2,hybrid:3,terrain:4},En={0:1,2:2,3:2,4:2};t.m=Vt.prototype,t.m.yh=t.cd("center"),t.m.Lg=t.cd("zoom"),t.m.changed=function(){var t=this.yh(),e=this.Lg(),n=Gt(this);(t&&!t.W(this.D)||this.R!=e||this.U!=n)&&(this.j||Kt(this.b),this.P(),this.R=e,this.U=n),this.D=t},t.m.da=function(){var e=Gt(this);if(this.j&&this.m)this.l!=e&&Kt(this.b);else{var n="",i=this.yh(),o=this.Lg(),r=this.get("size");if(r){if(i&&(0,window.isFinite)(i.lat())&&(0,window.isFinite)(i.lng())&&1<o&&null!=e&&r&&r.width&&r.height&&this.f){if(t.Qf(this.f,r),i=t.Hf(this.F,i,o)){var s=new t.ic;s.I=Math.round(i.x-r.width/2),s.K=s.I+r.width,s.J=Math.round(i.y-r.height/2),s.L=s.J+r.height,i=s}else i=null;s=En[e],i&&(this.m=!0,this.l=e,this.j&&this.b&&(n=Math.pow(2,Math.round(o))/256,n=new S(Math.round(Math.pow(2,o)/n)*n),this.j.set({ib:this.b,Ia:{min:C(n,{Ka:i.I,La:i.J}),max:C(n,{Ka:i.K,La:i.L})},size:{width:r.width,height:r.height}})),n=Jt(this,i,o,e,s))}this.b&&(t.Qf(this.b,r),Zt(this,n))}}},t.m.div_changed=function(){var e=this.get("div"),n=this.f;if(e)if(n)e.appendChild(n);else{(n=this.f=window.document.createElement("div")).style.overflow="hidden";var i=this.b=window.document.createElement("img");t.F.addDomListener(n,"contextmenu",function(e){t.Cc(e),t.Ec(e)}),i.ontouchstart=i.ontouchmove=i.ontouchend=i.ontouchcancel=function(e){t.Dc(e),t.Ec(e)},t.Qf(i,t.oi),e.appendChild(n),this.da()}else n&&(Kt(n),this.f=null)},t.v(te,t.Rd),t.m=te.prototype,t.m.streetView_changed=function(){var t=this.get("streetView");t?t.set("standAlone",!1):this.set("streetView",this.__gm.B)},t.m.getDiv=function(){return this.__gm.S},t.m.panBy=function(e,n){var i=this.__gm;t.O("map",function(){t.F.trigger(i,"panby",e,n)})},t.m.panTo=function(e){var n=this.__gm;e=t.wc(e),t.O("map",function(){t.F.trigger(n,"panto",e)})},t.m.panToBounds=function(e){var n=this.__gm,i=t.Ac(e);t.O("map",function(){t.F.trigger(n,"pantolatlngbounds",i)})},t.m.fitBounds=function(e,n){var i=this;e=t.Ac(e),t.O("map",function(t){t.fitBounds(i,e,n)})},t.ed(te.prototype,{bounds:null,streetView:ln,center:t.ac(t.wc),zoom:t.ki,mapTypeId:t.li,projection:null,heading:t.ki,tilt:t.ki,clickableIcons:$e}),ne.prototype.getMaxZoomAtLatLng=function(e,n){t.O("maxzoom",function(t){t.getMaxZoomAtLatLng(e,n)})},t.v(ie,t.G),ie.prototype.changed=function(e){if("suppressInfoWindows"!=e&&"clickable"!=e){var n=this;t.O("onion",function(t){t.b(n)})}},t.ed(ie.prototype,{map:t.Ii,tableId:t.ki,query:t.ac(t.Zb([t.ii,t.Yb(t.Ib,"not an Object")]))}),t.v(t.Pg,t.G),t.Pg.prototype.map_changed=function(){var e=this;t.O("overlay",function(t){t.Ok(e)})},t.ed(t.Pg.prototype,{panes:null,projection:null,map:t.Zb([t.Ii,ln])});var Tn=ae(t.Vb(t.D,"LatLng"));t.v(t.ah,t.G),t.ah.prototype.map_changed=t.ah.prototype.visible_changed=function(){var e=this;t.O("poly",function(t){t.b(e)})},t.ah.prototype.center_changed=function(){t.F.trigger(this,"bounds_changed")},t.ah.prototype.radius_changed=t.ah.prototype.center_changed,t.ah.prototype.getBounds=function(){var e=this.get("radius"),n=this.get("center");if(n&&t.Hb(e)){var i=this.get("map");return i=i&&i.__gm.get("baseMapType"),t.If(n,e/t.Rg(i))}return null},t.ed(t.ah.prototype,{center:t.ac(t.wc),draggable:t.mi,editable:t.mi,map:t.Ii,radius:t.ki,visible:t.mi}),t.v(le,t.G),le.prototype.map_changed=le.prototype.visible_changed=function(){var e=this;t.O("poly",function(t){t.f(e)})},le.prototype.getPath=function(){return this.get("latLngs").getAt(0)},le.prototype.setPath=function(e){try{this.get("latLngs").setAt(0,re(e))}catch(e){t.Sb(e)}},t.ed(le.prototype,{draggable:t.mi,editable:t.mi,map:t.Ii,visible:t.mi}),t.v(t.ch,le),t.ch.prototype.Sa=!0,t.ch.prototype.getPaths=function(){return this.get("latLngs")},t.ch.prototype.setPaths=function(t){this.set("latLngs",se(t))},t.v(t.dh,le),t.dh.prototype.Sa=!1,t.v(t.eh,t.G),t.eh.prototype.map_changed=t.eh.prototype.visible_changed=function(){var e=this;t.O("poly",function(t){t.j(e)})},t.ed(t.eh.prototype,{draggable:t.mi,editable:t.mi,bounds:t.ac(t.Ac),map:t.Ii,visible:t.mi}),t.v(ce,t.G),ce.prototype.map_changed=function(){var e=this;t.O("streetview",function(t){t.Nk(e)})},t.ed(ce.prototype,{map:t.Ii}),t.gh.prototype.getPanorama=function(e,n){var i=this.b||void 0;t.O("streetview",function(o){t.O("geometry",function(t){o.Kl(e,n,t.computeHeading,t.computeOffset,i)})})},t.gh.prototype.getPanoramaByLocation=function(t,e,n){this.getPanorama({location:t,radius:e,preference:50>(e||0)?"best":"nearest"},n)},t.gh.prototype.getPanoramaById=function(t,e){this.getPanorama({pano:t},e)},t.v(t.hh,t.G),t.m=t.hh.prototype,t.m.getTile=function(e,n,i){if(!e||!i)return null;var o=i.createElement("div");i={$:e,zoom:n,ac:null},o.__gmimt=i,t.id(this.b,o);var r=ue(this);if(1!=r&&(o.style.opacity=r),this.f){r=this.tileSize||new t.z(256,256);var s=this.j(e,n);i.ac=this.f({V:e.x,X:e.y,aa:n},r,o,s,function(){t.F.trigger(o,"load")})}return o},t.m.releaseTile=function(t){t&&this.b.contains(t)&&(this.b.remove(t),(t=t.__gmimt.ac)&&t.release())},t.m.mf=t.ua(8),t.m.opacity_changed=function(){var t=ue(this);this.b.forEach(function(e){return e.style.opacity=t})},t.m.Tc=!0,t.ed(t.hh.prototype,{opacity:t.ki}),t.v(t.jh,t.G),t.jh.prototype.getTile=Pe,t.jh.prototype.tileSize=new t.z(256,256),t.jh.prototype.Tc=!0,t.v(t.kh,t.jh),t.v(t.lh,t.G),t.ed(t.lh.prototype,{attribution:t.ac(sn),place:t.ac(an)});var Sn={Animation:{BOUNCE:1,DROP:2,op:3,jp:4},Circle:t.ah,ControlPosition:t.Kf,Data:ct,GroundOverlay:t.Te,ImageMapType:t.hh,InfoWindow:t.Le,LatLng:t.D,LatLngBounds:t.xc,MVCArray:t.gd,MVCObject:t.G,Map:te,MapTypeControlStyle:{DEFAULT:0,HORIZONTAL_BAR:1,DROPDOWN_MENU:2,INSET:3,INSET_LARGE:4},MapTypeId:t.gi,MapTypeRegistry:G,Marker:t.Ie,MarkerImage:function(t,e,n,i,o){this.url=t,this.size=e||o,this.origin=n,this.anchor=i,this.scaledSize=o,this.labelOrigin=null},NavigationControlStyle:{DEFAULT:0,SMALL:1,ANDROID:2,ZOOM_PAN:3,pp:4,yk:5},OverlayView:t.Pg,Point:t.y,Polygon:t.ch,Polyline:t.dh,Rectangle:t.eh,ScaleControlStyle:{DEFAULT:0},Size:t.z,StreetViewPreference:t.gj,StreetViewSource:t.hj,StrokePosition:{CENTER:0,INSIDE:1,OUTSIDE:2},SymbolPath:Ke,ZoomControlStyle:{DEFAULT:0,SMALL:1,LARGE:2,yk:3},event:t.F};t.zb(ct,{Feature:t.ie,Geometry:t.k(),GeometryCollection:t.ne,LineString:t.pe,LinearRing:t.qe,MultiLineString:t.se,MultiPoint:t.te,MultiPolygon:t.xe,Point:t.Td,Polygon:t.ve}),t.zb(Sn,{BicyclingLayer:t.Ve,DirectionsRenderer:mt,DirectionsService:vt,DirectionsStatus:{OK:t.ia,UNKNOWN_ERROR:t.ma,OVER_QUERY_LIMIT:t.ka,REQUEST_DENIED:t.la,INVALID_REQUEST:t.ca,ZERO_RESULTS:t.na,MAX_WAYPOINTS_EXCEEDED:t.fa,NOT_FOUND:t.ha},DirectionsTravelMode:t.Ki,DirectionsUnitSystem:t.Ji,DistanceMatrixService:bt,DistanceMatrixStatus:{OK:t.ia,INVALID_REQUEST:t.ca,OVER_QUERY_LIMIT:t.ka,REQUEST_DENIED:t.la,UNKNOWN_ERROR:t.ma,MAX_ELEMENTS_EXCEEDED:t.ea,MAX_DIMENSIONS_EXCEEDED:t.da},DistanceMatrixElementStatus:{OK:t.ia,NOT_FOUND:t.ha,ZERO_RESULTS:t.na},ElevationService:yt,ElevationStatus:{OK:t.ia,UNKNOWN_ERROR:t.ma,OVER_QUERY_LIMIT:t.ka,REQUEST_DENIED:t.la,INVALID_REQUEST:t.ca,fp:"DATA_NOT_AVAILABLE"},FusionTablesLayer:ie,Geocoder:t.Se,GeocoderLocationType:{ROOFTOP:"ROOFTOP",RANGE_INTERPOLATED:"RANGE_INTERPOLATED",GEOMETRIC_CENTER:"GEOMETRIC_CENTER",APPROXIMATE:"APPROXIMATE"},GeocoderStatus:{OK:t.ia,UNKNOWN_ERROR:t.ma,OVER_QUERY_LIMIT:t.ka,REQUEST_DENIED:t.la,INVALID_REQUEST:t.ca,ZERO_RESULTS:t.na,ERROR:t.ba},KmlLayer:wt,KmlLayerStatus:t.dj,MaxZoomService:ne,MaxZoomStatus:{OK:t.ia,ERROR:t.ba},SaveWidget:t.lh,StreetViewCoverageLayer:ce,StreetViewPanorama:jt,StreetViewService:t.gh,StreetViewStatus:{OK:t.ia,UNKNOWN_ERROR:t.ma,ZERO_RESULTS:t.na},StyledMapType:t.kh,TrafficLayer:xt,TrafficModel:t.Li,TransitLayer:Et,TransitMode:t.Mi,TransitRoutePreference:t.Ni,TravelMode:t.Ki,UnitSystem:t.Ji}),t.ge("main",{});var Cn,An=/'/g,Ln=arguments[0];window.google.maps.Load(function(e,n){var i=window.google.maps;me();var o=ve(i);for(t.Q=new Nt(e),t.kj=Math.random()<t.L(t.Q,0,1),t.lj=Math.round(1e15*Math.random()).toString(36),t.Lg=pe(),t.cj=de(),t.ej=new t.gd,t.Bf=n,e=0;e<t.Pd(t.Q,8);++e)t.Sf[t.Nd(t.Q,8,e)]=!0;e=new t.pf(t.Q.data[3]),ft(t.M(e,0)),t.yb(Sn,function(t,e){i[t]=e}),i.version=t.M(e,1),window.setTimeout(function(){rt(["util","stats"],function(e,n){e.f.b(),e.j(),o&&n.b.b({ev:"api_alreadyloaded",client:t.M(t.Q,6),key:t.vf()})})},5e3),fn=new Mt,(e=t.M(t.Q,11))&&rt(t.Ld(t.Q,12),ge(e),!0)})}.call(this,{}),isWindows=navigator.platform.indexOf("Win")>-1,isWindows?($(".sidebar .sidebar-wrapper, .main-panel").perfectScrollbar(),$("html").addClass("perfect-scrollbar-on")):$("html").addClass("perfect-scrollbar-off");var searchVisible=0,transparent=!0,transparentDemo=!0,fixedTop=!1,mobile_menu_visible=0,mobile_menu_initialized=!1,toggle_initialized=!1,bootstrap_nav_initialized=!1,seq=0,delays=80,durations=500,seq2=0,delays2=80,durations2=500;function debounce(t,e,n){var i;return function(){var o=this,r=arguments;clearTimeout(i),i=setTimeout(function(){i=null,n||t.apply(o,r)},e),n&&!i&&t.apply(o,r)}}$(document).ready(function(){$sidebar=$(".sidebar"),$.material.init(),window_width=$(window).width(),md.initSidebarsCheck(),md.checkSidebarImage(),$('[rel="tooltip"]').tooltip(),$(".form-control").on("focus",function(){$(this).parent(".input-group").addClass("input-group-focus")}).on("blur",function(){$(this).parent(".input-group").removeClass("input-group-focus")})}),$(document).on("click",".navbar-toggle",function(){$toggle=$(this),1==mobile_menu_visible?($("html").removeClass("nav-open"),$(".close-layer").remove(),setTimeout(function(){$toggle.removeClass("toggled")},400),mobile_menu_visible=0):(setTimeout(function(){$toggle.addClass("toggled")},430),div='<div id="bodyClick"></div>',$(div).appendTo("body").click(function(){$("html").removeClass("nav-open"),mobile_menu_visible=0,setTimeout(function(){$toggle.removeClass("toggled"),$("#bodyClick").remove()},550)}),$("html").addClass("nav-open"),mobile_menu_visible=1)}),$(window).resize(function(){md.initSidebarsCheck(),seq=seq2=0}),md={misc:{navbar_menu_visible:0,active_collapse:!0,disabled_collapse_init:0},checkSidebarImage:function(){$sidebar=$(".sidebar"),image_src=$sidebar.data("image"),void 0!==image_src&&(sidebar_container='<div class="sidebar-background" style="background-image: url('+image_src+') "/>',$sidebar.append(sidebar_container))},checkScrollForTransparentNavbar:debounce(function(){$(document).scrollTop()>260?transparent&&(transparent=!1,$(".navbar-color-on-scroll").removeClass("navbar-transparent")):transparent||(transparent=!0,$(".navbar-color-on-scroll").addClass("navbar-transparent"))},17),initSidebarsCheck:function(){$(window).width()<=991&&0!=$sidebar.length&&md.initRightMenu()},initRightMenu:debounce(function(){$sidebar_wrapper=$(".sidebar-wrapper"),mobile_menu_initialized?$(window).width()>991&&($sidebar_wrapper.find(".navbar-form").remove(),$sidebar_wrapper.find(".nav-mobile-menu").remove(),mobile_menu_initialized=!1):($navbar=$("nav").find(".navbar-collapse").children(".navbar-nav.navbar-right"),mobile_menu_content="",nav_content=$navbar.html(),nav_content='<ul class="nav nav-mobile-menu">'+nav_content+"</ul>",navbar_form=$("nav").find(".navbar-form").get(0).outerHTML,$sidebar_nav=$sidebar_wrapper.find(" > .nav"),$nav_content=$(nav_content),$navbar_form=$(navbar_form),$nav_content.insertBefore($sidebar_nav),$navbar_form.insertBefore($nav_content),$(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(t){t.stopPropagation()}),window.dispatchEvent(new Event("resize")),mobile_menu_initialized=!0)},200),startAnimationForLineChart:function(t){t.on("draw",function(t){"line"===t.type||"area"===t.type?t.element.animate({d:{begin:600,dur:700,from:t.path.clone().scale(1,0).translate(0,t.chartRect.height()).stringify(),to:t.path.clone().stringify(),easing:Chartist.Svg.Easing.easeOutQuint}}):"point"===t.type&&(seq++,t.element.animate({opacity:{begin:seq*delays,dur:durations,from:0,to:1,easing:"ease"}}))}),seq=0},startAnimationForBarChart:function(t){t.on("draw",function(t){"bar"===t.type&&(seq2++,t.element.animate({opacity:{begin:seq2*delays2,dur:durations2,from:0,to:1,easing:"ease"}}))}),seq2=0}},type=["","info","success","warning","danger"],demo={initPickColor:function(){$(".pick-class-label").click(function(){var t=$(this).attr("new-class"),e=$("#display-buttons").attr("data-class"),n=$("#display-buttons");if(n.length){var i=n.find(".btn");i.removeClass(e),i.addClass(t),n.attr("data-class",t)}})},initDocumentationCharts:function(){dataDailySalesChart={labels:["M","T","W","T","F","S","S"],series:[[12,17,7,17,23,18,38]]},optionsDailySalesChart={lineSmooth:Chartist.Interpolation.cardinal({tension:0}),low:0,high:50,chartPadding:{top:0,right:0,bottom:0,left:0}};var t=new Chartist.Line("#dailySalesChart",dataDailySalesChart,optionsDailySalesChart);md.startAnimationForLineChart(t)},initDashboardPageCharts:function(){dataDailySalesChart={labels:["M","T","W","T","F","S","S"],series:[[12,17,7,17,23,18,38]]},optionsDailySalesChart={lineSmooth:Chartist.Interpolation.cardinal({tension:0}),low:0,high:50,chartPadding:{top:0,right:0,bottom:0,left:0}};var t=new Chartist.Line("#dailySalesChart",dataDailySalesChart,optionsDailySalesChart);md.startAnimationForLineChart(t),dataCompletedTasksChart={labels:["12am","3pm","6pm","9pm","12pm","3am","6am","9am"],series:[[230,750,450,300,280,240,200,190]]},optionsCompletedTasksChart={lineSmooth:Chartist.Interpolation.cardinal({tension:0}),low:0,high:1e3,chartPadding:{top:0,right:0,bottom:0,left:0}};var e=new Chartist.Line("#completedTasksChart",dataCompletedTasksChart,optionsCompletedTasksChart);md.startAnimationForLineChart(e);var n=Chartist.Bar("#emailsSubscriptionChart",{labels:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],series:[[542,443,320,780,553,453,326,434,568,610,756,895]]},{axisX:{showGrid:!1},low:0,high:1e3,chartPadding:{top:0,right:5,bottom:0,left:0}},[["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(t){return t[0]}}}]]);md.startAnimationForBarChart(n)},initGoogleMaps:function(){var t=new google.maps.LatLng(40.748817,-73.985428),e={zoom:13,center:t,scrollwheel:!1,styles:[{featureType:"water",stylers:[{saturation:43},{lightness:-11},{hue:"#0088ff"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{hue:"#ff0000"},{saturation:-100},{lightness:99}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#808080"},{lightness:54}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{color:"#ece2d9"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#ccdca1"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#767676"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#b8cb93"}]},{featureType:"poi.park",stylers:[{visibility:"on"}]},{featureType:"poi.sports_complex",stylers:[{visibility:"on"}]},{featureType:"poi.medical",stylers:[{visibility:"on"}]},{featureType:"poi.business",stylers:[{visibility:"simplified"}]}]},n=new google.maps.Map(document.getElementById("map"),e);new google.maps.Marker({position:t,title:"Hello World!"}).setMap(n)},showNotification:function(t,e){color=Math.floor(4*Math.random()+1),$.notify({icon:"notifications",message:"Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."},{type:type[color],timer:4e3,placement:{from:t,align:e}})}};
$(document).ready(function(){
  $(".checkbox input[type=checkbox]").click(function() {
    $("#update-slide-status").trigger("click");
  });
});




