!function(e,t){function n(e){var t=e.length,n=ce.type(e);return ce.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}function r(e){var t=ke[e]={};return ce.each(e.match(pe)||[],function(e,n){t[n]=!0}),t}function i(e,n,r,i){if(ce.acceptData(e)){var o,a,s=ce.expando,u=e.nodeType,l=u?ce.cache:e,c=u?e[s]:e[s]&&s;if(c&&l[c]&&(i||l[c].data)||r!==t||"string"!=typeof n)return c||(c=u?e[s]=te.pop()||ce.guid++:s),l[c]||(l[c]=u?{}:{toJSON:ce.noop}),("object"==typeof n||"function"==typeof n)&&(i?l[c]=ce.extend(l[c],n):l[c].data=ce.extend(l[c].data,n)),a=l[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[ce.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[ce.camelCase(n)])):o=a,o}}function o(e,t,n){if(ce.acceptData(e)){var r,i,o=e.nodeType,a=o?ce.cache:e,u=o?e[ce.expando]:ce.expando;if(a[u]){if(t&&(r=n?a[u]:a[u].data)){ce.isArray(t)?t=t.concat(ce.map(t,ce.camelCase)):t in r?t=[t]:(t=ce.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;for(;i--;)delete r[t[i]];if(n?!s(r):!ce.isEmptyObject(r))return}(n||(delete a[u].data,s(a[u])))&&(o?ce.cleanData([e],!0):ce.support.deleteExpando||a!=a.window?delete a[u]:a[u]=null)}}}function a(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(Se,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:Ee.test(r)?ce.parseJSON(r):r}catch(o){}ce.data(e,n,r)}else r=t}return r}function s(e){var t;for(t in e)if(("data"!==t||!ce.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function u(){return!0}function l(){return!1}function c(){try{return G.activeElement}catch(e){}}function f(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function p(e,t,n){if(ce.isFunction(t))return ce.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return ce.grep(e,function(e){return e===t!==n});if("string"==typeof t){if($e.test(t))return ce.filter(t,e,n);t=ce.filter(t,e)}return ce.grep(e,function(e){return ce.inArray(e,t)>=0!==n})}function d(e){var t=Ue.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function h(e,t){return ce.nodeName(e,"table")&&ce.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function g(e){return e.type=(null!==ce.find.attr(e,"type"))+"/"+e.type,e}function m(e){var t=it.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function y(e,t){for(var n,r=0;null!=(n=e[r]);r++)ce._data(n,"globalEval",!t||ce._data(t[r],"globalEval"))}function v(e,t){if(1===t.nodeType&&ce.hasData(e)){var n,r,i,o=ce._data(e),a=ce._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)ce.event.add(t,n,s[n][r])}a.data&&(a.data=ce.extend({},a.data))}}function b(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!ce.support.noCloneEvent&&t[ce.expando]){i=ce._data(t);for(r in i.events)ce.removeEvent(t,r,i.handle);t.removeAttribute(ce.expando)}"script"===n&&t.text!==e.text?(g(t).text=e.text,m(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),ce.support.html5Clone&&e.innerHTML&&!ce.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&tt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function x(e,n){var r,i,o=0,a=typeof e.getElementsByTagName!==Y?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==Y?e.querySelectorAll(n||"*"):t;if(!a)for(a=[],r=e.childNodes||e;null!=(i=r[o]);o++)!n||ce.nodeName(i,n)?a.push(i):ce.merge(a,x(i,n));return n===t||n&&ce.nodeName(e,n)?ce.merge([e],a):a}function w(e){tt.test(e.type)&&(e.defaultChecked=e.checked)}function T(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Nt.length;i--;)if(t=Nt[i]+n,t in e)return t;return r}function C(e,t){return e=t||e,"none"===ce.css(e,"display")||!ce.contains(e.ownerDocument,e)}function N(e,t){for(var n,r,i,o=[],a=0,s=e.length;s>a;a++)r=e[a],r.style&&(o[a]=ce._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&C(r)&&(o[a]=ce._data(r,"olddisplay",A(r.nodeName)))):o[a]||(i=C(r),(n&&"none"!==n||!i)&&ce._data(r,"olddisplay",i?n:ce.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}function k(e,t,n){var r=yt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function E(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=ce.css(e,n+Ct[o],!0,i)),r?("content"===n&&(a-=ce.css(e,"padding"+Ct[o],!0,i)),"margin"!==n&&(a-=ce.css(e,"border"+Ct[o]+"Width",!0,i))):(a+=ce.css(e,"padding"+Ct[o],!0,i),"padding"!==n&&(a+=ce.css(e,"border"+Ct[o]+"Width",!0,i)));return a}function S(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=ct(e),a=ce.support.boxSizing&&"border-box"===ce.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=ft(e,t,o),(0>i||null==i)&&(i=e.style[t]),vt.test(i))return i;r=a&&(ce.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+E(e,t,n||(a?"border":"content"),r,o)+"px"}function A(e){var t=G,n=xt[e];return n||(n=j(e,t),"none"!==n&&n||(lt=(lt||ce("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(lt[0].contentWindow||lt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=j(e,t),lt.detach()),xt[e]=n),n}function j(e,t){var n=ce(t.createElement(e)).appendTo(t.body),r=ce.css(n[0],"display");return n.remove(),r}function D(e,t,n,r){var i;if(ce.isArray(t))ce.each(t,function(t,i){n||Et.test(e)?r(e,i):D(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==ce.type(t))r(e,t);else for(i in t)D(e+"["+i+"]",t[i],n,r)}function L(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(pe)||[];if(ce.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function H(e,t,n,r){function i(s){var u;return o[s]=!0,ce.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||a||o[l]?a?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},a=e===It;return i(t.dataTypes[0])||!o["*"]&&i("*")}function q(e,n){var r,i,o=ce.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&ce.extend(!0,e,r),e}function _(e,n,r){for(var i,o,a,s,u=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):void 0}function M(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(a=l[u+" "+o]||l["* "+o],!a)for(i in l)if(s=i.split(" "),s[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){a===!0?a=l[i]:l[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(f){return{state:"parsererror",error:a?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}function O(){try{return new e.XMLHttpRequest}catch(t){}}function F(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function B(){return setTimeout(function(){Kt=t}),Kt=ce.now()}function P(e,t,n){for(var r,i=(on[t]||[]).concat(on["*"]),o=0,a=i.length;a>o;o++)if(r=i[o].call(n,t,e))return r}function R(e,t,n){var r,i,o=0,a=rn.length,s=ce.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Kt||B(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:ce.extend({},t),opts:ce.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Kt||B(),duration:n.duration,tweens:[],createTween:function(t,n){var r=ce.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(W(c,l.opts.specialEasing);a>o;o++)if(r=rn[o].call(l,e,c,l.opts))return r;return ce.map(c,P,l),ce.isFunction(l.opts.start)&&l.opts.start.call(e,l),ce.fx.timer(ce.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function W(e,t){var n,r,i,o,a;for(n in e)if(r=ce.camelCase(n),i=t[r],o=e[n],ce.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=ce.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function $(e,t,n){var r,i,o,a,s,u,l=this,c={},f=e.style,p=e.nodeType&&C(e),d=ce._data(e,"fxshow");n.queue||(s=ce._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,u=s.empty.fire,s.empty.fire=function(){s.unqueued||u()}),s.unqueued++,l.always(function(){l.always(function(){s.unqueued--,ce.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],"inline"===ce.css(e,"display")&&"none"===ce.css(e,"float")&&(ce.support.inlineBlockNeedsLayout&&"inline"!==A(e.nodeName)?f.zoom=1:f.display="inline-block")),n.overflow&&(f.overflow="hidden",ce.support.shrinkWrapBlocks||l.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],en.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(p?"hide":"show"))continue;c[r]=d&&d[r]||ce.style(e,r)}if(!ce.isEmptyObject(c)){d?"hidden"in d&&(p=d.hidden):d=ce._data(e,"fxshow",{}),o&&(d.hidden=!p),p?ce(e).show():l.done(function(){ce(e).hide()}),l.done(function(){var t;ce._removeData(e,"fxshow");for(t in c)ce.style(e,t,c[t])});for(r in c)a=P(p?d[r]:0,r,l),r in d||(d[r]=a.start,p&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function I(e,t,n,r,i){return new I.prototype.init(e,t,n,r,i)}function z(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Ct[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function X(e){return ce.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var U,V,Y=typeof t,J=e.location,G=e.document,Q=G.documentElement,K=e.jQuery,Z=e.$,ee={},te=[],ne="1.10.2",re=te.concat,ie=te.push,oe=te.slice,ae=te.indexOf,se=ee.toString,ue=ee.hasOwnProperty,le=ne.trim,ce=function(e,t){return new ce.fn.init(e,t,V)},fe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,pe=/\S+/g,de=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,he=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ge=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,me=/^[\],:{}\s]*$/,ye=/(?:^|:|,)(?:\s*\[)+/g,ve=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,be=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,xe=/^-ms-/,we=/-([\da-z])/gi,Te=function(e,t){return t.toUpperCase()},Ce=function(e){(G.addEventListener||"load"===e.type||"complete"===G.readyState)&&(Ne(),ce.ready())},Ne=function(){G.addEventListener?(G.removeEventListener("DOMContentLoaded",Ce,!1),e.removeEventListener("load",Ce,!1)):(G.detachEvent("onreadystatechange",Ce),e.detachEvent("onload",Ce))};ce.fn=ce.prototype={jquery:ne,constructor:ce,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:he.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof ce?n[0]:n,ce.merge(this,ce.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:G,!0)),ge.test(i[1])&&ce.isPlainObject(n))for(i in n)ce.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=G.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=G,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):ce.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),ce.makeArray(e,this))},selector:"",length:0,toArray:function(){return oe.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=ce.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return ce.each(this,e,t)},ready:function(e){return ce.ready.promise().done(e),this},slice:function(){return this.pushStack(oe.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(ce.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:ie,sort:[].sort,splice:[].splice},ce.fn.init.prototype=ce.fn,ce.extend=ce.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||ce.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(ce.isPlainObject(r)||(n=ce.isArray(r)))?(n?(n=!1,a=e&&ce.isArray(e)?e:[]):a=e&&ce.isPlainObject(e)?e:{},s[i]=ce.extend(c,a,r)):r!==t&&(s[i]=r));return s},ce.extend({expando:"jQuery"+(ne+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===ce&&(e.$=Z),t&&e.jQuery===ce&&(e.jQuery=K),ce},isReady:!1,readyWait:1,holdReady:function(e){e?ce.readyWait++:ce.ready(!0)},ready:function(e){if(e===!0?!--ce.readyWait:!ce.isReady){if(!G.body)return setTimeout(ce.ready);ce.isReady=!0,e!==!0&&--ce.readyWait>0||(U.resolveWith(G,[ce]),ce.fn.trigger&&ce(G).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===ce.type(e)},isArray:Array.isArray||function(e){return"array"===ce.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?String(e):"object"==typeof e||"function"==typeof e?ee[se.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==ce.type(e)||e.nodeType||ce.isWindow(e))return!1;try{if(e.constructor&&!ue.call(e,"constructor")&&!ue.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(ce.support.ownLast)for(n in e)return ue.call(e,n);for(n in e);return n===t||ue.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||G;var r=ge.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=ce.buildFragment([e],t,i),i&&ce(i).remove(),ce.merge([],r.childNodes))},parseJSON:function(t){return e.JSON&&e.JSON.parse?e.JSON.parse(t):null===t?t:"string"==typeof t&&(t=ce.trim(t),t&&me.test(t.replace(ve,"@").replace(be,"]").replace(ye,"")))?new Function("return "+t)():void ce.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||ce.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&ce.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(xe,"ms-").replace(we,Te)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;a>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;a>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:le&&!le.call("\ufeff ")?function(e){return null==e?"":le.call(e)}:function(e){return null==e?"":(e+"").replace(de,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?ce.merge(r,"string"==typeof e?[e]:e):ie.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(ae)return ae.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else for(;n[o]!==t;)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),u=[];if(s)for(;a>o;o++)i=t(e[o],o,r),null!=i&&(u[u.length]=i);else for(o in e)i=t(e[o],o,r),null!=i&&(u[u.length]=i);return re.apply([],u)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),ce.isFunction(e)?(r=oe.call(arguments,2),i=function(){return e.apply(n||this,r.concat(oe.call(arguments)))},i.guid=e.guid=e.guid||ce.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===ce.type(r)){o=!0;for(u in r)ce.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,ce.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(ce(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),ce.ready.promise=function(t){if(!U)if(U=ce.Deferred(),"complete"===G.readyState)setTimeout(ce.ready);else if(G.addEventListener)G.addEventListener("DOMContentLoaded",Ce,!1),e.addEventListener("load",Ce,!1);else{G.attachEvent("onreadystatechange",Ce),e.attachEvent("onload",Ce);var n=!1;try{n=null==e.frameElement&&G.documentElement}catch(r){}n&&n.doScroll&&!function i(){if(!ce.isReady){try{n.doScroll("left")}catch(e){return setTimeout(i,50)}Ne(),ce.ready()}}()}return U.promise(t)},ce.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){ee["[object "+t+"]"]=t.toLowerCase()}),V=ce(G),function(e,t){function n(e,t,n,r){var i,o,a,s,u,l,c,f,h,g;if((t?t.ownerDocument||t:R)!==H&&L(t),t=t||H,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(_&&!r){if(i=be.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&B(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return ee.apply(n,t.getElementsByTagName(e)),n;if((a=i[3])&&C.getElementsByClassName&&t.getElementsByClassName)return ee.apply(n,t.getElementsByClassName(a)),n}if(C.qsa&&(!M||!M.test(e))){if(f=c=P,h=t,g=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(l=p(e),(c=t.getAttribute("id"))?f=c.replace(Te,"\\$&"):t.setAttribute("id",f),f="[id='"+f+"'] ",u=l.length;u--;)l[u]=f+d(l[u]);h=de.test(e)&&t.parentNode||t,g=l.join(",")}if(g)try{return ee.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{c||t.removeAttribute("id")}}}return w(e.replace(le,"$1"),t,n,r)}function r(){function e(n,r){return t.push(n+=" ")>k.cacheLength&&delete e[t.shift()],e[n]=r}var t=[];return e}function i(e){return e[P]=!0,e}function o(e){var t=H.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function a(e,t){for(var n=e.split("|"),r=e.length;r--;)k.attrHandle[n[r]]=t}function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||J)-(~e.sourceIndex||J);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function u(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return i(function(t){return t=+t,i(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(){}function p(e,t){var r,i,o,a,s,u,l,c=z[e+" "];if(c)return t?0:c.slice(0);for(s=e,u=[],l=k.preFilter;s;){(!r||(i=fe.exec(s)))&&(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),r=!1,(i=pe.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(le," ")}),s=s.slice(r.length));for(a in k.filter)!(i=ye[a].exec(s))||l[a]&&!(i=l[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}return t?s.length:s?n.error(e):z(e,u).slice(0)}function d(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=$++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,u,l,c=W+" "+o;if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i)if(l=t[P]||(t[P]={}),(u=l[r])&&u[0]===c){if((s=u[1])===!0||s===N)return s===!0}else if(u=l[r]=[c],u[1]=e(t,n,a)||N,u[1]===!0)return!0}}function g(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function y(e,t,n,r,o,a){return r&&!r[P]&&(r=y(r)),o&&!o[P]&&(o=y(o,a)),i(function(i,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=i||x(t||"*",s.nodeType?[s]:s,[]),y=!e||!i&&t?g:m(g,p,e,s,u),v=n?o||(i?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r)for(l=m(v,d),r(l,[],s,u),c=l.length;c--;)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f));if(i){if(o||e){if(o){for(l=[],c=v.length;c--;)(f=v[c])&&l.push(y[c]=f);o(null,v=[],l,u)}for(c=v.length;c--;)(f=v[c])&&(l=o?ne.call(i,f):p[c])>-1&&(i[l]=!(a[l]=f))}}else v=m(v===a?v.splice(h,v.length):v),o?o(null,a,v,u):ee.apply(a,v)})}function v(e){for(var t,n,r,i=e.length,o=k.relative[e[0].type],a=o||k.relative[" "],s=o?1:0,u=h(function(e){return e===t},a,!0),l=h(function(e){return ne.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>s;s++)if(n=k.relative[e[s].type])c=[h(g(c),n)];else{if(n=k.filter[e[s].type].apply(null,e[s].matches),n[P]){for(r=++s;i>r&&!k.relative[e[r].type];r++);return y(s>1&&g(c),s>1&&d(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(le,"$1"),n,r>s&&v(e.slice(s,r)),i>r&&v(e=e.slice(r)),i>r&&d(e))}c.push(n)}return g(c)}function b(e,t){var r=0,o=t.length>0,a=e.length>0,s=function(i,s,u,l,c){var f,p,d,h=[],g=0,y="0",v=i&&[],b=null!=c,x=j,w=i||a&&k.find.TAG("*",c&&s.parentNode||s),T=W+=null==x?1:Math.random()||.1;for(b&&(j=s!==H&&s,N=r);null!=(f=w[y]);y++){if(a&&f){for(p=0;d=e[p++];)if(d(f,s,u)){l.push(f);break}b&&(W=T,N=++r)}o&&((f=!d&&f)&&g--,i&&v.push(f))}if(g+=y,o&&y!==g){for(p=0;d=t[p++];)d(v,h,s,u);if(i){if(g>0)for(;y--;)v[y]||h[y]||(h[y]=K.call(l));h=m(h)}ee.apply(l,h),b&&!i&&h.length>0&&g+t.length>1&&n.uniqueSort(l)}return b&&(W=T,j=x),v};return o?i(s):s}function x(e,t,r){for(var i=0,o=t.length;o>i;i++)n(e,t[i],r);return r}function w(e,t,n,r){var i,o,a,s,u,l=p(e);if(!r&&1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&C.getById&&9===t.nodeType&&_&&k.relative[o[1].type]){if(t=(k.find.ID(a.matches[0].replace(Ce,Ne),t)||[])[0],!t)return n;e=e.slice(o.shift().value.length)}for(i=ye.needsContext.test(e)?0:o.length;i--&&(a=o[i],!k.relative[s=a.type]);)if((u=k.find[s])&&(r=u(a.matches[0].replace(Ce,Ne),de.test(o[0].type)&&t.parentNode||t))){if(o.splice(i,1),e=r.length&&d(o),!e)return ee.apply(n,r),n;break}}return A(e,l)(r,t,!_,n,de.test(e)),n}var T,C,N,k,E,S,A,j,D,L,H,q,_,M,O,F,B,P="sizzle"+-new Date,R=e.document,W=0,$=0,I=r(),z=r(),X=r(),U=!1,V=function(e,t){return e===t?(U=!0,0):0},Y=typeof t,J=1<<31,G={}.hasOwnProperty,Q=[],K=Q.pop,Z=Q.push,ee=Q.push,te=Q.slice,ne=Q.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},re="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ie="[\\x20\\t\\r\\n\\f]",oe="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ae=oe.replace("w","w#"),se="\\["+ie+"*("+oe+")"+ie+"*(?:([*^$|!~]?=)"+ie+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+ae+")|)|)"+ie+"*\\]",ue=":("+oe+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+se.replace(3,8)+")*)|.*)\\)|)",le=new RegExp("^"+ie+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ie+"+$","g"),fe=new RegExp("^"+ie+"*,"+ie+"*"),pe=new RegExp("^"+ie+"*([>+~]|"+ie+")"+ie+"*"),de=new RegExp(ie+"*[+~]"),he=new RegExp("="+ie+"*([^\\]'\"]*)"+ie+"*\\]","g"),ge=new RegExp(ue),me=new RegExp("^"+ae+"$"),ye={ID:new RegExp("^#("+oe+")"),CLASS:new RegExp("^\\.("+oe+")"),TAG:new RegExp("^("+oe.replace("w","w*")+")"),ATTR:new RegExp("^"+se),PSEUDO:new RegExp("^"+ue),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ie+"*(even|odd|(([+-]|)(\\d*)n|)"+ie+"*(?:([+-]|)"+ie+"*(\\d+)|))"+ie+"*\\)|)","i"),bool:new RegExp("^(?:"+re+")$","i"),needsContext:new RegExp("^"+ie+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ie+"*((?:-\\d)?\\d*)"+ie+"*\\)|)(?=[^-]|$)","i")},ve=/^[^{]+\{\s*\[native \w/,be=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xe=/^(?:input|select|textarea|button)$/i,we=/^h\d$/i,Te=/'|\\/g,Ce=new RegExp("\\\\([\\da-f]{1,6}"+ie+"?|("+ie+")|.)","ig"),Ne=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{ee.apply(Q=te.call(R.childNodes),R.childNodes),Q[R.childNodes.length].nodeType}catch(ke){ee={apply:Q.length?function(e,t){Z.apply(e,te.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}S=n.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},C=n.support={},L=n.setDocument=function(e){var t=e?e.ownerDocument||e:R,n=t.defaultView;return t!==H&&9===t.nodeType&&t.documentElement?(H=t,q=t.documentElement,_=!S(t),n&&n.attachEvent&&n!==n.top&&n.attachEvent("onbeforeunload",function(){L()}),C.attributes=o(function(e){return e.className="i",!e.getAttribute("className")}),C.getElementsByTagName=o(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),C.getElementsByClassName=o(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),C.getById=o(function(e){return q.appendChild(e).id=P,!t.getElementsByName||!t.getElementsByName(P).length}),C.getById?(k.find.ID=function(e,t){if(typeof t.getElementById!==Y&&_){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},k.filter.ID=function(e){var t=e.replace(Ce,Ne);return function(e){return e.getAttribute("id")===t}}):(delete k.find.ID,k.filter.ID=function(e){var t=e.replace(Ce,Ne);return function(e){var n=typeof e.getAttributeNode!==Y&&e.getAttributeNode("id");return n&&n.value===t}}),k.find.TAG=C.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==Y?t.getElementsByTagName(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},k.find.CLASS=C.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==Y&&_?t.getElementsByClassName(e):void 0},O=[],M=[],(C.qsa=ve.test(t.querySelectorAll))&&(o(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||M.push("\\["+ie+"*(?:value|"+re+")"),e.querySelectorAll(":checked").length||M.push(":checked")}),o(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&M.push("[*^$]="+ie+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||M.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),M.push(",.*:")})),(C.matchesSelector=ve.test(F=q.webkitMatchesSelector||q.mozMatchesSelector||q.oMatchesSelector||q.msMatchesSelector))&&o(function(e){C.disconnectedMatch=F.call(e,"div"),F.call(e,"[s!='']:x"),O.push("!=",ue)}),M=M.length&&new RegExp(M.join("|")),O=O.length&&new RegExp(O.join("|")),B=ve.test(q.contains)||q.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},V=q.compareDocumentPosition?function(e,n){if(e===n)return U=!0,0;var r=n.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(n);return r?1&r||!C.sortDetached&&n.compareDocumentPosition(e)===r?e===t||B(R,e)?-1:n===t||B(R,n)?1:D?ne.call(D,e)-ne.call(D,n):0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,a=n.parentNode,u=[e],l=[n];if(e===n)return U=!0,0;if(!o||!a)return e===t?-1:n===t?1:o?-1:a?1:D?ne.call(D,e)-ne.call(D,n):0;if(o===a)return s(e,n);for(r=e;r=r.parentNode;)u.unshift(r);for(r=n;r=r.parentNode;)l.unshift(r);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===R?-1:l[i]===R?1:0},t):H},n.matches=function(e,t){return n(e,null,null,t)},n.matchesSelector=function(e,t){if((e.ownerDocument||e)!==H&&L(e),t=t.replace(he,"='$1']"),C.matchesSelector&&_&&(!O||!O.test(t))&&(!M||!M.test(t)))try{var r=F.call(e,t);if(r||C.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return n(t,H,null,[e]).length>0},n.contains=function(e,t){return(e.ownerDocument||e)!==H&&L(e),B(e,t)},n.attr=function(e,n){(e.ownerDocument||e)!==H&&L(e);var r=k.attrHandle[n.toLowerCase()],i=r&&G.call(k.attrHandle,n.toLowerCase())?r(e,n,!_):t;return i===t?C.attributes||!_?e.getAttribute(n):(i=e.getAttributeNode(n))&&i.specified?i.value:null:i},n.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},n.uniqueSort=function(e){var t,n=[],r=0,i=0;if(U=!C.detectDuplicates,D=!C.sortStable&&e.slice(0),e.sort(V),U){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return e},E=n.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=E(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=E(t);return n},k=n.selectors={cacheLength:50,createPseudo:i,match:ye,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Ce,Ne),e[3]=(e[4]||e[5]||"").replace(Ce,Ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||n.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&n.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return ye.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&ge.test(r)&&(n=p(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Ce,Ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=I[e+" "];return t||(t=new RegExp("(^|"+ie+")"+e+"("+ie+"|$)"))&&I(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==Y&&e.getAttribute("class")||"")})},ATTR:function(e,t,r){return function(i){var o=n.attr(i,e);return null==o?"!="===t:t?(o+="","="===t?o===r:"!="===t?o!==r:"^="===t?r&&0===o.indexOf(r):"*="===t?r&&o.indexOf(r)>-1:"$="===t?r&&o.slice(-r.length)===r:"~="===t?(" "+o+" ").indexOf(r)>-1:"|="===t?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;
return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){for(c=m[P]||(m[P]={}),l=c[e]||[],d=l[0]===W&&l[1],p=l[0]===W&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[W,d,p];break}}else if(v&&(l=(t[P]||(t[P]={}))[e])&&l[0]===W)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++p||(v&&((f[P]||(f[P]={}))[e]=[W,p]),f!==t)););return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,t){var r,o=k.pseudos[e]||k.setFilters[e.toLowerCase()]||n.error("unsupported pseudo: "+e);return o[P]?o(t):o.length>1?(r=[e,e,"",t],k.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,n){for(var r,i=o(e,t),a=i.length;a--;)r=ne.call(e,i[a]),e[r]=!(n[r]=i[a])}):function(e){return o(e,0,r)}):o}},pseudos:{not:i(function(e){var t=[],n=[],r=A(e.replace(le,"$1"));return r[P]?i(function(e,t,n,i){for(var o,a=r(e,null,i,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:i(function(e){return function(t){return n(e,t).length>0}}),contains:i(function(e){return function(t){return(t.textContent||t.innerText||E(t)).indexOf(e)>-1}}),lang:i(function(e){return me.test(e||"")||n.error("unsupported lang: "+e),e=e.replace(Ce,Ne).toLowerCase(),function(t){var n;do if(n=_?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===q},focus:function(e){return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!k.pseudos.empty(e)},header:function(e){return we.test(e.nodeName)},input:function(e){return xe.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},k.pseudos.nth=k.pseudos.eq;for(T in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})k.pseudos[T]=u(T);for(T in{submit:!0,reset:!0})k.pseudos[T]=l(T);f.prototype=k.filters=k.pseudos,k.setFilters=new f,A=n.compile=function(e,t){var n,r=[],i=[],o=X[e+" "];if(!o){for(t||(t=p(e)),n=t.length;n--;)o=v(t[n]),o[P]?r.push(o):i.push(o);o=X(e,b(i,r))}return o},C.sortStable=P.split("").sort(V).join("")===P,C.detectDuplicates=U,L(),C.sortDetached=o(function(e){return 1&e.compareDocumentPosition(H.createElement("div"))}),o(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||a("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),C.attributes&&o(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||a("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),o(function(e){return null==e.getAttribute("disabled")})||a(re,function(e,t,n){var r;return n?void 0:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),ce.find=n,ce.expr=n.selectors,ce.expr[":"]=ce.expr.pseudos,ce.unique=n.uniqueSort,ce.text=n.getText,ce.isXMLDoc=n.isXML,ce.contains=n.contains}(e);var ke={};ce.Callbacks=function(e){e="string"==typeof e?ke[e]||r(e):ce.extend({},e);var n,i,o,a,s,u,l=[],c=!e.once&&[],f=function(t){for(i=e.memory&&t,o=!0,s=u||0,u=0,a=l.length,n=!0;l&&a>s;s++)if(l[s].apply(t[0],t[1])===!1&&e.stopOnFalse){i=!1;break}n=!1,l&&(c?c.length&&f(c.shift()):i?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;!function r(t){ce.each(t,function(t,n){var i=ce.type(n);"function"===i?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==i&&r(n)})}(arguments),n?a=l.length:i&&(u=t,f(i))}return this},remove:function(){return l&&ce.each(arguments,function(e,t){for(var r;(r=ce.inArray(t,l,r))>-1;)l.splice(r,1),n&&(a>=r&&a--,s>=r&&s--)}),this},has:function(e){return e?ce.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],a=0,this},disable:function(){return l=c=i=t,this},disabled:function(){return!l},lock:function(){return c=t,i||p.disable(),this},locked:function(){return!c},fireWith:function(e,t){return!l||o&&!c||(t=t||[],t=[e,t.slice?t.slice():t],n?c.push(t):f(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!o}};return p},ce.extend({Deferred:function(e){var t=[["resolve","done",ce.Callbacks("once memory"),"resolved"],["reject","fail",ce.Callbacks("once memory"),"rejected"],["notify","progress",ce.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return ce.Deferred(function(n){ce.each(t,function(t,o){var a=o[0],s=ce.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&ce.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?ce.extend(e,r):r}},i={};return r.pipe=r.then,ce.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=oe.call(arguments),a=o.length,s=1!==a||e&&ce.isFunction(e.promise)?a:0,u=1===s?e:ce.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?oe.call(arguments):i,r===t?u.notifyWith(n,r):--s||u.resolveWith(n,r)}};if(a>1)for(t=new Array(a),n=new Array(a),r=new Array(a);a>i;i++)o[i]&&ce.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--s;return s||u.resolveWith(r,o),u.promise()}}),ce.support=function(t){var n,r,i,o,a,s,u,l,c,f=G.createElement("div");if(f.setAttribute("className","t"),f.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=f.getElementsByTagName("*")||[],r=f.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;o=G.createElement("select"),s=o.appendChild(G.createElement("option")),i=f.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==f.className,t.leadingWhitespace=3===f.firstChild.nodeType,t.tbody=!f.getElementsByTagName("tbody").length,t.htmlSerialize=!!f.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!i.value,t.optSelected=s.selected,t.enctype=!!G.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==G.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,i.checked=!0,t.noCloneChecked=i.cloneNode(!0).checked,o.disabled=!0,t.optDisabled=!s.disabled;try{delete f.test}catch(p){t.deleteExpando=!1}i=G.createElement("input"),i.setAttribute("value",""),t.input=""===i.getAttribute("value"),i.value="t",i.setAttribute("type","radio"),t.radioValue="t"===i.value,i.setAttribute("checked","t"),i.setAttribute("name","t"),a=G.createDocumentFragment(),a.appendChild(i),t.appendChecked=i.checked,t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,f.attachEvent&&(f.attachEvent("onclick",function(){t.noCloneEvent=!1}),f.cloneNode(!0).click());for(c in{submit:!0,change:!0,focusin:!0})f.setAttribute(u="on"+c,"t"),t[c+"Bubbles"]=u in e||f.attributes[u].expando===!1;f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===f.style.backgroundClip;for(c in ce(t))break;return t.ownLast="0"!==c,ce(function(){var n,r,i,o="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",a=G.getElementsByTagName("body")[0];a&&(n=G.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(f),f.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=f.getElementsByTagName("td"),i[0].style.cssText="padding:0;margin:0;border:0;display:none",l=0===i[0].offsetHeight,i[0].style.display="",i[1].style.display="none",t.reliableHiddenOffsets=l&&0===i[0].offsetHeight,f.innerHTML="",f.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",ce.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===f.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(f,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(f,null)||{width:"4px"}).width,r=f.appendChild(G.createElement("div")),r.style.cssText=f.style.cssText=o,r.style.marginRight=r.style.width="0",f.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof f.style.zoom!==Y&&(f.innerHTML="",f.style.cssText=o+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===f.offsetWidth,f.style.display="block",f.innerHTML="<div></div>",f.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==f.offsetWidth,t.inlineBlockNeedsLayout&&(a.style.zoom=1)),a.removeChild(n),n=f=i=r=null)}),n=o=a=s=r=i=null,t}({});var Ee=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,Se=/([A-Z])/g;ce.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?ce.cache[e[ce.expando]]:e[ce.expando],!!e&&!s(e)},data:function(e,t,n){return i(e,t,n)},removeData:function(e,t){return o(e,t)},_data:function(e,t,n){return i(e,t,n,!0)},_removeData:function(e,t){return o(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&ce.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),ce.fn.extend({data:function(e,n){var r,i,o=null,s=0,u=this[0];if(e===t){if(this.length&&(o=ce.data(u),1===u.nodeType&&!ce._data(u,"parsedAttrs"))){for(r=u.attributes;s<r.length;s++)i=r[s].name,0===i.indexOf("data-")&&(i=ce.camelCase(i.slice(5)),a(u,i,o[i]));ce._data(u,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){ce.data(this,e)}):arguments.length>1?this.each(function(){ce.data(this,e,n)}):u?a(u,e,ce.data(u,e)):null},removeData:function(e){return this.each(function(){ce.removeData(this,e)})}}),ce.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=ce._data(e,t),n&&(!r||ce.isArray(n)?r=ce._data(e,t,ce.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=ce.queue(e,t),r=n.length,i=n.shift(),o=ce._queueHooks(e,t),a=function(){ce.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return ce._data(e,n)||ce._data(e,n,{empty:ce.Callbacks("once memory").add(function(){ce._removeData(e,t+"queue"),ce._removeData(e,n)})})}}),ce.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),arguments.length<r?ce.queue(this[0],e):n===t?this:this.each(function(){var t=ce.queue(this,e,n);ce._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&ce.dequeue(this,e)})},dequeue:function(e){return this.each(function(){ce.dequeue(this,e)})},delay:function(e,t){return e=ce.fx?ce.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=ce.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};for("string"!=typeof e&&(n=e,e=t),e=e||"fx";s--;)r=ce._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var Ae,je,De=/[\t\r\n\f]/g,Le=/\r/g,He=/^(?:input|select|textarea|button|object)$/i,qe=/^(?:a|area)$/i,_e=/^(?:checked|selected)$/i,Me=ce.support.getSetAttribute,Oe=ce.support.input;ce.fn.extend({attr:function(e,t){return ce.access(this,ce.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){ce.removeAttr(this,e)})},prop:function(e,t){return ce.access(this,ce.prop,e,t,arguments.length>1)},removeProp:function(e){return e=ce.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(ce.isFunction(e))return this.each(function(t){ce(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(pe)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(De," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");n.className=ce.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(ce.isFunction(e))return this.each(function(t){ce(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(pe)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(De," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");n.className=e?ce.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):ce.isFunction(e)?this.each(function(n){ce(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var t,r=0,i=ce(this),o=e.match(pe)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===Y||"boolean"===n)&&(this.className&&ce._data(this,"__className__",this.className),this.className=this.className||e===!1?"":ce._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(De," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=ce.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,ce(this).val()):e,null==o?o="":"number"==typeof o?o+="":ce.isArray(o)&&(o=ce.map(o,function(e){return null==e?"":e+""})),r=ce.valHooks[this.type]||ce.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=ce.valHooks[o.type]||ce.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(Le,""):null==n?"":n)}}}),ce.extend({valHooks:{option:{get:function(e){var t=ce.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;s>u;u++)if(n=r[u],(n.selected||u===i)&&(ce.support.optDisabled?!n.disabled:null===n.getAttribute("disabled"))&&(!n.parentNode.disabled||!ce.nodeName(n.parentNode,"optgroup"))){if(t=ce(n).val(),o)return t;a.push(t)}return a},set:function(e,t){for(var n,r,i=e.options,o=ce.makeArray(t),a=i.length;a--;)r=i[a],(r.selected=ce.inArray(ce(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var i,o,a=e.nodeType;if(e&&3!==a&&8!==a&&2!==a)return typeof e.getAttribute===Y?ce.prop(e,n,r):(1===a&&ce.isXMLDoc(e)||(n=n.toLowerCase(),i=ce.attrHooks[n]||(ce.expr.match.bool.test(n)?je:Ae)),r===t?i&&"get"in i&&null!==(o=i.get(e,n))?o:(o=ce.find.attr(e,n),null==o?t:o):null!==r?i&&"set"in i&&(o=i.set(e,r,n))!==t?o:(e.setAttribute(n,r+""),r):void ce.removeAttr(e,n))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(pe);if(o&&1===e.nodeType)for(;n=o[i++];)r=ce.propFix[n]||n,ce.expr.match.bool.test(n)?Oe&&Me||!_e.test(n)?e[r]=!1:e[ce.camelCase("default-"+n)]=e[r]=!1:ce.attr(e,n,""),e.removeAttribute(Me?n:r)},attrHooks:{type:{set:function(e,t){if(!ce.support.radioValue&&"radio"===t&&ce.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!ce.isXMLDoc(e),a&&(n=ce.propFix[n]||n,o=ce.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=ce.find.attr(e,"tabindex");return t?parseInt(t,10):He.test(e.nodeName)||qe.test(e.nodeName)&&e.href?0:-1}}}}),je={set:function(e,t,n){return t===!1?ce.removeAttr(e,n):Oe&&Me||!_e.test(n)?e.setAttribute(!Me&&ce.propFix[n]||n,n):e[ce.camelCase("default-"+n)]=e[n]=!0,n}},ce.each(ce.expr.match.bool.source.match(/\w+/g),function(e,n){var r=ce.expr.attrHandle[n]||ce.find.attr;ce.expr.attrHandle[n]=Oe&&Me||!_e.test(n)?function(e,n,i){var o=ce.expr.attrHandle[n],a=i?t:(ce.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return ce.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[ce.camelCase("default-"+n)]?n.toLowerCase():null}}),Oe&&Me||(ce.attrHooks.value={set:function(e,t,n){return ce.nodeName(e,"input")?void(e.defaultValue=t):Ae&&Ae.set(e,t,n)}}),Me||(Ae={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},ce.expr.attrHandle.id=ce.expr.attrHandle.name=ce.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},ce.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:Ae.set},ce.attrHooks.contenteditable={set:function(e,t,n){Ae.set(e,""===t?!1:t,n)}},ce.each(["width","height"],function(e,t){ce.attrHooks[t]={set:function(e,n){return""===n?(e.setAttribute(t,"auto"),n):void 0}}})),ce.support.hrefNormalized||ce.each(["href","src"],function(e,t){ce.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),ce.support.style||(ce.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),ce.support.optSelected||(ce.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),ce.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ce.propFix[this.toLowerCase()]=this}),ce.support.enctype||(ce.propFix.enctype="encoding"),ce.each(["radio","checkbox"],function(){ce.valHooks[this]={set:function(e,t){return ce.isArray(t)?e.checked=ce.inArray(ce(e).val(),t)>=0:void 0}},ce.support.checkOn||(ce.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Fe=/^(?:input|select|textarea)$/i,Be=/^key/,Pe=/^(?:mouse|contextmenu)|click/,Re=/^(?:focusinfocus|focusoutblur)$/,We=/^([^.]*)(?:\.(.+)|)$/;ce.event={global:{},add:function(e,n,r,i,o){var a,s,u,l,c,f,p,d,h,g,m,y=ce._data(e);if(y){for(r.handler&&(l=r,r=l.handler,o=l.selector),r.guid||(r.guid=ce.guid++),(s=y.events)||(s=y.events={}),(f=y.handle)||(f=y.handle=function(e){return typeof ce===Y||e&&ce.event.triggered===e.type?t:ce.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(pe)||[""],u=n.length;u--;)a=We.exec(n[u])||[],h=m=a[1],g=(a[2]||"").split(".").sort(),h&&(c=ce.event.special[h]||{},h=(o?c.delegateType:c.bindType)||h,c=ce.event.special[h]||{},p=ce.extend({type:h,origType:m,data:i,handler:r,guid:r.guid,selector:o,needsContext:o&&ce.expr.match.needsContext.test(o),namespace:g.join(".")},l),(d=s[h])||(d=s[h]=[],d.delegateCount=0,c.setup&&c.setup.call(e,i,g,f)!==!1||(e.addEventListener?e.addEventListener(h,f,!1):e.attachEvent&&e.attachEvent("on"+h,f))),c.add&&(c.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),o?d.splice(d.delegateCount++,0,p):d.push(p),ce.event.global[h]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,m=ce.hasData(e)&&ce._data(e);if(m&&(c=m.events)){for(t=(t||"").match(pe)||[""],l=t.length;l--;)if(s=We.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=ce.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=c[d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=p.length;o--;)a=p[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(p.splice(o,1),a.selector&&p.delegateCount--,f.remove&&f.remove.call(e,a));u&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||ce.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)ce.event.remove(e,d+t[l],n,r,!0);ce.isEmptyObject(c)&&(delete m.handle,ce._removeData(e,"events"))}},trigger:function(n,r,i,o){var a,s,u,l,c,f,p,d=[i||G],h=ue.call(n,"type")?n.type:n,g=ue.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||G,3!==i.nodeType&&8!==i.nodeType&&!Re.test(h+ce.event.triggered)&&(h.indexOf(".")>=0&&(g=h.split("."),h=g.shift(),g.sort()),s=h.indexOf(":")<0&&"on"+h,n=n[ce.expando]?n:new ce.Event(h,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=g.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:ce.makeArray(r,[n]),c=ce.event.special[h]||{},o||!c.trigger||c.trigger.apply(i,r)!==!1)){if(!o&&!c.noBubble&&!ce.isWindow(i)){for(l=c.delegateType||h,Re.test(l+h)||(u=u.parentNode);u;u=u.parentNode)d.push(u),f=u;f===(i.ownerDocument||G)&&d.push(f.defaultView||f.parentWindow||e)}for(p=0;(u=d[p++])&&!n.isPropagationStopped();)n.type=p>1?l:c.bindType||h,a=(ce._data(u,"events")||{})[n.type]&&ce._data(u,"handle"),a&&a.apply(u,r),a=s&&u[s],a&&ce.acceptData(u)&&a.apply&&a.apply(u,r)===!1&&n.preventDefault();if(n.type=h,!o&&!n.isDefaultPrevented()&&(!c._default||c._default.apply(d.pop(),r)===!1)&&ce.acceptData(i)&&s&&i[h]&&!ce.isWindow(i)){f=i[s],f&&(i[s]=null),ce.event.triggered=h;try{i[h]()}catch(m){}ce.event.triggered=t,f&&(i[s]=f)}return n.result}},dispatch:function(e){e=ce.event.fix(e);var n,r,i,o,a,s=[],u=oe.call(arguments),l=(ce._data(this,"events")||{})[e.type]||[],c=ce.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=ce.event.handlers.call(this,e,l),n=0;(o=s[n++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,a=0;(i=o.handlers[a++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((ce.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?ce(r,this).index(l)>=0:ce.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return u<n.length&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[ce.expando])return e;var t,n,r,i=e.type,o=e,a=this.fixHooks[i];for(a||(this.fixHooks[i]=a=Pe.test(i)?this.mouseHooks:Be.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new ce.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||G),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,a.filter?a.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,a=n.button,s=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||G,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?n.toElement:s),e.which||a===t||(e.which=1&a?1:2&a?3:4&a?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==c()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===c()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return ce.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(e){return ce.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=ce.extend(new ce.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?ce.event.trigger(i,null,t):ce.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},ce.removeEvent=G.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===Y&&(e[r]=null),e.detachEvent(r,n))},ce.Event=function(e,t){return this instanceof ce.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?u:l):this.type=e,t&&ce.extend(this,t),this.timeStamp=e&&e.timeStamp||ce.now(),void(this[ce.expando]=!0)):new ce.Event(e,t)},ce.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u,this.stopPropagation()}},ce.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){ce.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!ce.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),ce.support.submitBubbles||(ce.event.special.submit={setup:function(){return ce.nodeName(this,"form")?!1:void ce.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=ce.nodeName(n,"input")||ce.nodeName(n,"button")?n.form:t;r&&!ce._data(r,"submitBubbles")&&(ce.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),ce._data(r,"submitBubbles",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&ce.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return ce.nodeName(this,"form")?!1:void ce.event.remove(this,"._submit")}}),ce.support.changeBubbles||(ce.event.special.change={setup:function(){return Fe.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(ce.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),ce.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),ce.event.simulate("change",this,e,!0)})),!1):void ce.event.add(this,"beforeactivate._change",function(e){var t=e.target;Fe.test(t.nodeName)&&!ce._data(t,"changeBubbles")&&(ce.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||ce.event.simulate("change",this.parentNode,e,!0)}),ce._data(t,"changeBubbles",!0))})},handle:function(e){var t=e.target;return this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type?e.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return ce.event.remove(this,"._change"),!Fe.test(this.nodeName)}}),ce.support.focusinBubbles||ce.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){ce.event.simulate(t,e.target,ce.event.fix(e),!0)};ce.event.special[t]={setup:function(){0===n++&&G.addEventListener(e,r,!0)},teardown:function(){0===--n&&G.removeEventListener(e,r,!0)}}}),ce.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=l;else if(!i)return this;return 1===o&&(s=i,i=function(e){return ce().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=ce.guid++)),this.each(function(){ce.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,ce(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=l),this.each(function(){ce.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){ce.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?ce.event.trigger(e,t,n,!0):void 0}});var $e=/^.[^:#\[\.,]*$/,Ie=/^(?:parents|prev(?:Until|All))/,ze=ce.expr.match.needsContext,Xe={children:!0,contents:!0,next:!0,prev:!0};ce.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(ce(e).filter(function(){for(t=0;i>t;t++)if(ce.contains(r[t],this))return!0}));for(t=0;i>t;t++)ce.find(e,r[t],n);return n=this.pushStack(i>1?ce.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=ce(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(ce.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(p(this,e||[],!0))},filter:function(e){return this.pushStack(p(this,e||[],!1))},is:function(e){return!!p(this,"string"==typeof e&&ze.test(e)?ce(e):e||[],!1).length},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=ze.test(e)||"string"!=typeof e?ce(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&ce.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?ce.unique(o):o)},index:function(e){return e?"string"==typeof e?ce.inArray(this[0],ce(e)):ce.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?ce(e,t):ce.makeArray(e&&e.nodeType?[e]:e),r=ce.merge(this.get(),n);return this.pushStack(ce.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ce.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null;
},parents:function(e){return ce.dir(e,"parentNode")},parentsUntil:function(e,t,n){return ce.dir(e,"parentNode",n)},next:function(e){return f(e,"nextSibling")},prev:function(e){return f(e,"previousSibling")},nextAll:function(e){return ce.dir(e,"nextSibling")},prevAll:function(e){return ce.dir(e,"previousSibling")},nextUntil:function(e,t,n){return ce.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return ce.dir(e,"previousSibling",n)},siblings:function(e){return ce.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return ce.sibling(e.firstChild)},contents:function(e){return ce.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:ce.merge([],e.childNodes)}},function(e,t){ce.fn[e]=function(n,r){var i=ce.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=ce.filter(r,i)),this.length>1&&(Xe[e]||(i=ce.unique(i)),Ie.test(e)&&(i=i.reverse())),this.pushStack(i)}}),ce.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ce.find.matchesSelector(r,e)?[r]:[]:ce.find.matches(e,ce.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){for(var i=[],o=e[n];o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!ce(o).is(r));)1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});var Ue="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Ve=/ jQuery\d+="(?:null|\d+)"/g,Ye=new RegExp("<(?:"+Ue+")[\\s/>]","i"),Je=/^\s+/,Ge=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Qe=/<([\w:]+)/,Ke=/<tbody/i,Ze=/<|&#?\w+;/,et=/<(?:script|style|link)/i,tt=/^(?:checkbox|radio)$/i,nt=/checked\s*(?:[^=]|=\s*.checked.)/i,rt=/^$|\/(?:java|ecma)script/i,it=/^true\/(.*)/,ot=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,at={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ce.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},st=d(G),ut=st.appendChild(G.createElement("div"));at.optgroup=at.option,at.tbody=at.tfoot=at.colgroup=at.caption=at.thead,at.th=at.td,ce.fn.extend({text:function(e){return ce.access(this,function(e){return e===t?ce.text(this):this.empty().append((this[0]&&this[0].ownerDocument||G).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=h(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=h(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?ce.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||ce.cleanData(x(n)),n.parentNode&&(t&&ce.contains(n.ownerDocument,n)&&y(x(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&ce.cleanData(x(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&ce.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return ce.clone(this,e,t)})},html:function(e){return ce.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(Ve,""):t;if("string"==typeof e&&!et.test(e)&&(ce.support.htmlSerialize||!Ye.test(e))&&(ce.support.leadingWhitespace||!Je.test(e))&&!at[(Qe.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(Ge,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(ce.cleanData(x(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=ce.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),ce(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=re.apply([],e);var r,i,o,a,s,u,l=0,c=this.length,f=this,p=c-1,d=e[0],h=ce.isFunction(d);if(h||!(1>=c||"string"!=typeof d||ce.support.checkClone)&&nt.test(d))return this.each(function(r){var i=f.eq(r);h&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(u=ce.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=u.firstChild,1===u.childNodes.length&&(u=r),r)){for(a=ce.map(x(u,"script"),g),o=a.length;c>l;l++)i=u,l!==p&&(i=ce.clone(i,!0,!0),o&&ce.merge(a,x(i,"script"))),t.call(this[l],i,l);if(o)for(s=a[a.length-1].ownerDocument,ce.map(a,m),l=0;o>l;l++)i=a[l],rt.test(i.type||"")&&!ce._data(i,"globalEval")&&ce.contains(s,i)&&(i.src?ce._evalUrl(i.src):ce.globalEval((i.text||i.textContent||i.innerHTML||"").replace(ot,"")));u=r=null}return this}}),ce.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){ce.fn[e]=function(e){for(var n,r=0,i=[],o=ce(e),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),ce(o[r])[t](n),ie.apply(i,n.get());return this.pushStack(i)}}),ce.extend({clone:function(e,t,n){var r,i,o,a,s,u=ce.contains(e.ownerDocument,e);if(ce.support.html5Clone||ce.isXMLDoc(e)||!Ye.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(ut.innerHTML=e.outerHTML,ut.removeChild(o=ut.firstChild)),!(ce.support.noCloneEvent&&ce.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ce.isXMLDoc(e)))for(r=x(o),s=x(e),a=0;null!=(i=s[a]);++a)r[a]&&b(i,r[a]);if(t)if(n)for(s=s||x(e),r=r||x(o),a=0;null!=(i=s[a]);a++)v(i,r[a]);else v(e,o);return r=x(o,"script"),r.length>0&&y(r,!u&&x(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){for(var i,o,a,s,u,l,c,f=e.length,p=d(t),h=[],g=0;f>g;g++)if(o=e[g],o||0===o)if("object"===ce.type(o))ce.merge(h,o.nodeType?[o]:o);else if(Ze.test(o)){for(s=s||p.appendChild(t.createElement("div")),u=(Qe.exec(o)||["",""])[1].toLowerCase(),c=at[u]||at._default,s.innerHTML=c[1]+o.replace(Ge,"<$1></$2>")+c[2],i=c[0];i--;)s=s.lastChild;if(!ce.support.leadingWhitespace&&Je.test(o)&&h.push(t.createTextNode(Je.exec(o)[0])),!ce.support.tbody)for(o="table"!==u||Ke.test(o)?"<table>"!==c[1]||Ke.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;i--;)ce.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l);for(ce.merge(h,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=p.lastChild}else h.push(t.createTextNode(o));for(s&&p.removeChild(s),ce.support.appendChecked||ce.grep(x(h,"input"),w),g=0;o=h[g++];)if((!r||-1===ce.inArray(o,r))&&(a=ce.contains(o.ownerDocument,o),s=x(p.appendChild(o),"script"),a&&y(s),n))for(i=0;o=s[i++];)rt.test(o.type||"")&&n.push(o);return s=null,p},cleanData:function(e,t){for(var n,r,i,o,a=0,s=ce.expando,u=ce.cache,l=ce.support.deleteExpando,c=ce.event.special;null!=(n=e[a]);a++)if((t||ce.acceptData(n))&&(i=n[s],o=i&&u[i])){if(o.events)for(r in o.events)c[r]?ce.event.remove(n,r):ce.removeEvent(n,r,o.handle);u[i]&&(delete u[i],l?delete n[s]:typeof n.removeAttribute!==Y?n.removeAttribute(s):n[s]=null,te.push(i))}},_evalUrl:function(e){return ce.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),ce.fn.extend({wrapAll:function(e){if(ce.isFunction(e))return this.each(function(t){ce(this).wrapAll(e.call(this,t))});if(this[0]){var t=ce(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return ce.isFunction(e)?this.each(function(t){ce(this).wrapInner(e.call(this,t))}):this.each(function(){var t=ce(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=ce.isFunction(e);return this.each(function(n){ce(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){ce.nodeName(this,"body")||ce(this).replaceWith(this.childNodes)}).end()}});var lt,ct,ft,pt=/alpha\([^)]*\)/i,dt=/opacity\s*=\s*([^)]*)/,ht=/^(top|right|bottom|left)$/,gt=/^(none|table(?!-c[ea]).+)/,mt=/^margin/,yt=new RegExp("^("+fe+")(.*)$","i"),vt=new RegExp("^("+fe+")(?!px)[a-z%]+$","i"),bt=new RegExp("^([+-])=("+fe+")","i"),xt={BODY:"block"},wt={position:"absolute",visibility:"hidden",display:"block"},Tt={letterSpacing:0,fontWeight:400},Ct=["Top","Right","Bottom","Left"],Nt=["Webkit","O","Moz","ms"];ce.fn.extend({css:function(e,n){return ce.access(this,function(e,n,r){var i,o,a={},s=0;if(ce.isArray(n)){for(o=ct(e),i=n.length;i>s;s++)a[n[s]]=ce.css(e,n[s],!1,o);return a}return r!==t?ce.style(e,n,r):ce.css(e,n)},e,n,arguments.length>1)},show:function(){return N(this,!0)},hide:function(){return N(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){C(this)?ce(this).show():ce(this).hide()})}}),ce.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=ft(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":ce.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=ce.camelCase(n),l=e.style;if(n=ce.cssProps[u]||(ce.cssProps[u]=T(l,u)),s=ce.cssHooks[n]||ce.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=bt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(ce.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||ce.cssNumber[u]||(r+="px"),ce.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=ce.camelCase(n);return n=ce.cssProps[u]||(ce.cssProps[u]=T(e.style,u)),s=ce.cssHooks[n]||ce.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=ft(e,n,i)),"normal"===a&&n in Tt&&(a=Tt[n]),""===r||r?(o=parseFloat(a),r===!0||ce.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(ct=function(t){return e.getComputedStyle(t,null)},ft=function(e,n,r){var i,o,a,s=r||ct(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||ce.contains(e.ownerDocument,e)||(u=ce.style(e,n)),vt.test(u)&&mt.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):G.documentElement.currentStyle&&(ct=function(e){return e.currentStyle},ft=function(e,n,r){var i,o,a,s=r||ct(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),vt.test(u)&&!ht.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u}),ce.each(["height","width"],function(e,t){ce.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&gt.test(ce.css(e,"display"))?ce.swap(e,wt,function(){return S(e,t,r)}):S(e,t,r):void 0},set:function(e,n,r){var i=r&&ct(e);return k(e,n,r?E(e,t,r,ce.support.boxSizing&&"border-box"===ce.css(e,"boxSizing",!1,i),i):0)}}}),ce.support.opacity||(ce.cssHooks.opacity={get:function(e,t){return dt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=ce.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===ce.trim(o.replace(pt,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=pt.test(o)?o.replace(pt,i):o+" "+i)}}),ce(function(){ce.support.reliableMarginRight||(ce.cssHooks.marginRight={get:function(e,t){return t?ce.swap(e,{display:"inline-block"},ft,[e,"marginRight"]):void 0}}),!ce.support.pixelPosition&&ce.fn.position&&ce.each(["top","left"],function(e,t){ce.cssHooks[t]={get:function(e,n){return n?(n=ft(e,t),vt.test(n)?ce(e).position()[t]+"px":n):void 0}}})}),ce.expr&&ce.expr.filters&&(ce.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0||!ce.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||ce.css(e,"display"))},ce.expr.filters.visible=function(e){return!ce.expr.filters.hidden(e)}),ce.each({margin:"",padding:"",border:"Width"},function(e,t){ce.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Ct[r]+t]=o[r]||o[r-2]||o[0];return i}},mt.test(e)||(ce.cssHooks[e+t].set=k)});var kt=/%20/g,Et=/\[\]$/,St=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;ce.fn.extend({serialize:function(){return ce.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=ce.prop(this,"elements");return e?ce.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!ce(this).is(":disabled")&&jt.test(this.nodeName)&&!At.test(e)&&(this.checked||!tt.test(e))}).map(function(e,t){var n=ce(this).val();return null==n?null:ce.isArray(n)?ce.map(n,function(e){return{name:t.name,value:e.replace(St,"\r\n")}}):{name:t.name,value:n.replace(St,"\r\n")}}).get()}}),ce.param=function(e,n){var r,i=[],o=function(e,t){t=ce.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=ce.ajaxSettings&&ce.ajaxSettings.traditional),ce.isArray(e)||e.jquery&&!ce.isPlainObject(e))ce.each(e,function(){o(this.name,this.value)});else for(r in e)D(r,e[r],n,o);return i.join("&").replace(kt,"+")},ce.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){ce.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),ce.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Dt,Lt,Ht=ce.now(),qt=/\?/,_t=/#.*$/,Mt=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ft=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Bt=/^(?:GET|HEAD)$/,Pt=/^\/\//,Rt=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Wt=ce.fn.load,$t={},It={},zt="*/".concat("*");try{Lt=J.href}catch(Xt){Lt=G.createElement("a"),Lt.href="",Lt=Lt.href}Dt=Rt.exec(Lt.toLowerCase())||[],ce.fn.load=function(e,n,r){if("string"!=typeof e&&Wt)return Wt.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),ce.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&ce.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?ce("<div>").append(ce.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},ce.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ce.fn[t]=function(e){return this.on(t,e)}}),ce.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Lt,type:"GET",isLocal:Ft.test(Dt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":zt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":ce.parseJSON,"text xml":ce.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?q(q(e,ce.ajaxSettings),t):q(ce.ajaxSettings,e)},ajaxPrefilter:L($t),ajaxTransport:L(It),ajax:function(e,n){function r(e,n,r,i){var o,f,v,b,w,C=n;2!==x&&(x=2,u&&clearTimeout(u),c=t,s=i||"",T.readyState=e>0?4:0,o=e>=200&&300>e||304===e,r&&(b=_(p,T,r)),b=M(p,b,T,o),o?(p.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(ce.lastModified[a]=w),w=T.getResponseHeader("etag"),w&&(ce.etag[a]=w)),204===e||"HEAD"===p.type?C="nocontent":304===e?C="notmodified":(C=b.state,f=b.data,v=b.error,o=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(n||C)+"",o?g.resolveWith(d,[f,C,T]):g.rejectWith(d,[T,C,v]),T.statusCode(y),y=t,l&&h.trigger(o?"ajaxSuccess":"ajaxError",[T,p,o?f:v]),m.fireWith(d,[T,C]),l&&(h.trigger("ajaxComplete",[T,p]),--ce.active||ce.event.trigger("ajaxStop")))}"object"==typeof e&&(n=e,e=t),n=n||{};var i,o,a,s,u,l,c,f,p=ce.ajaxSetup({},n),d=p.context||p,h=p.context&&(d.nodeType||d.jquery)?ce(d):ce.event,g=ce.Deferred(),m=ce.Callbacks("once memory"),y=p.statusCode||{},v={},b={},x=0,w="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!f)for(f={};t=Ot.exec(s);)f[t[1].toLowerCase()]=t[2];t=f[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?s:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=b[n]=b[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)y[t]=[y[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||w;return c&&c.abort(t),r(0,t),this}};if(g.promise(T).complete=m.add,T.success=T.done,T.error=T.fail,p.url=((e||p.url||Lt)+"").replace(_t,"").replace(Pt,Dt[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=ce.trim(p.dataType||"*").toLowerCase().match(pe)||[""],null==p.crossDomain&&(i=Rt.exec(p.url.toLowerCase()),p.crossDomain=!(!i||i[1]===Dt[1]&&i[2]===Dt[2]&&(i[3]||("http:"===i[1]?"80":"443"))===(Dt[3]||("http:"===Dt[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=ce.param(p.data,p.traditional)),H($t,p,n,T),2===x)return T;l=p.global,l&&0===ce.active++&&ce.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Bt.test(p.type),a=p.url,p.hasContent||(p.data&&(a=p.url+=(qt.test(a)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=Mt.test(a)?a.replace(Mt,"$1_="+Ht++):a+(qt.test(a)?"&":"?")+"_="+Ht++)),p.ifModified&&(ce.lastModified[a]&&T.setRequestHeader("If-Modified-Since",ce.lastModified[a]),ce.etag[a]&&T.setRequestHeader("If-None-Match",ce.etag[a])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&T.setRequestHeader("Content-Type",p.contentType),T.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+zt+"; q=0.01":""):p.accepts["*"]);for(o in p.headers)T.setRequestHeader(o,p.headers[o]);if(p.beforeSend&&(p.beforeSend.call(d,T,p)===!1||2===x))return T.abort();w="abort";for(o in{success:1,error:1,complete:1})T[o](p[o]);if(c=H(It,p,n,T)){T.readyState=1,l&&h.trigger("ajaxSend",[T,p]),p.async&&p.timeout>0&&(u=setTimeout(function(){T.abort("timeout")},p.timeout));try{x=1,c.send(v,r)}catch(C){if(!(2>x))throw C;r(-1,C)}}else r(-1,"No Transport");return T},getJSON:function(e,t,n){return ce.get(e,t,n,"json")},getScript:function(e,n){return ce.get(e,t,n,"script")}}),ce.each(["get","post"],function(e,n){ce[n]=function(e,r,i,o){return ce.isFunction(r)&&(o=o||i,i=r,r=t),ce.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),ce.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return ce.globalEval(e),e}}}),ce.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),ce.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=G.head||ce("head")[0]||G.documentElement;return{send:function(t,i){n=G.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Ut=[],Vt=/(=)\?(?=&|$)|\?\?/;ce.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Ut.pop()||ce.expando+"_"+Ht++;return this[e]=!0,e}}),ce.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Vt.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=ce.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Vt,"$1"+o):n.jsonp!==!1&&(n.url+=(qt.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||ce.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Ut.push(o)),s&&ce.isFunction(a)&&a(s[0]),s=a=t}),"script"):void 0});var Yt,Jt,Gt=0,Qt=e.ActiveXObject&&function(){var e;for(e in Yt)Yt[e](t,!0)};ce.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&O()||F()}:O,Jt=ce.ajaxSettings.xhr(),ce.support.cors=!!Jt&&"withCredentials"in Jt,Jt=ce.support.ajax=!!Jt,Jt&&ce.ajaxTransport(function(n){if(!n.crossDomain||ce.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,f;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=ce.noop,Qt&&delete Yt[a]),i)4!==u.readyState&&u.abort();else{f={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(f.text=u.responseText);try{c=u.statusText}catch(p){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=f.text?200:404}}catch(d){i||o(-1,d)}f&&o(s,c,f,l)},n.async?4===u.readyState?setTimeout(r):(a=++Gt,Qt&&(Yt||(Yt={},ce(e).unload(Qt)),Yt[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Kt,Zt,en=/^(?:toggle|show|hide)$/,tn=new RegExp("^(?:([+-])=|)("+fe+")([a-z%]*)$","i"),nn=/queueHooks$/,rn=[$],on={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=tn.exec(t),o=i&&i[3]||(ce.cssNumber[e]?"":"px"),a=(ce.cssNumber[e]||"px"!==o&&+r)&&tn.exec(ce.css(n.elem,e)),s=1,u=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,ce.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--u)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};ce.Animation=ce.extend(R,{tweener:function(e,t){ce.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],on[n]=on[n]||[],on[n].unshift(t)},prefilter:function(e,t){t?rn.unshift(e):rn.push(e)}}),ce.Tween=I,I.prototype={constructor:I,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ce.cssNumber[n]?"":"px")},cur:function(){var e=I.propHooks[this.prop];return e&&e.get?e.get(this):I.propHooks._default.get(this)},run:function(e){var t,n=I.propHooks[this.prop];return this.options.duration?this.pos=t=ce.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):I.propHooks._default.set(this),this}},I.prototype.init.prototype=I.prototype,I.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=ce.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){ce.fx.step[e.prop]?ce.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[ce.cssProps[e.prop]]||ce.cssHooks[e.prop])?ce.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},I.propHooks.scrollTop=I.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ce.each(["toggle","show","hide"],function(e,t){var n=ce.fn[t];ce.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(z(t,!0),e,r,i)}}),ce.fn.extend({fadeTo:function(e,t,n,r){return this.filter(C).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=ce.isEmptyObject(e),o=ce.speed(t,n,r),a=function(){var t=R(this,ce.extend({},e),o);(i||ce._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=ce.timers,a=ce._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&nn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&ce.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=ce._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=ce.timers,a=r?r.length:0;for(n.finish=!0,ce.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),ce.each({slideDown:z("show"),slideUp:z("hide"),slideToggle:z("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){ce.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),ce.speed=function(e,t,n){var r=e&&"object"==typeof e?ce.extend({},e):{complete:n||!n&&t||ce.isFunction(e)&&e,duration:e,easing:n&&t||t&&!ce.isFunction(t)&&t};return r.duration=ce.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in ce.fx.speeds?ce.fx.speeds[r.duration]:ce.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){ce.isFunction(r.old)&&r.old.call(this),r.queue&&ce.dequeue(this,r.queue)},r},ce.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},ce.timers=[],ce.fx=I.prototype.init,ce.fx.tick=function(){var e,n=ce.timers,r=0;for(Kt=ce.now();r<n.length;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||ce.fx.stop(),Kt=t},ce.fx.timer=function(e){e()&&ce.timers.push(e)&&ce.fx.start()},ce.fx.interval=13,ce.fx.start=function(){Zt||(Zt=setInterval(ce.fx.tick,ce.fx.interval))},ce.fx.stop=function(){clearInterval(Zt),Zt=null},ce.fx.speeds={slow:600,fast:200,_default:400},ce.fx.step={},ce.expr&&ce.expr.filters&&(ce.expr.filters.animated=function(e){return ce.grep(ce.timers,function(t){return e===t.elem}).length}),ce.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){ce.offset.setOffset(this,e,t)});var n,r,i={top:0,left:0},o=this[0],a=o&&o.ownerDocument;if(a)return n=a.documentElement,ce.contains(n,o)?(typeof o.getBoundingClientRect!==Y&&(i=o.getBoundingClientRect()),r=X(a),{top:i.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:i.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):i},ce.offset={setOffset:function(e,t,n){var r=ce.css(e,"position");"static"===r&&(e.style.position="relative");var i,o,a=ce(e),s=a.offset(),u=ce.css(e,"top"),l=ce.css(e,"left"),c=("absolute"===r||"fixed"===r)&&ce.inArray("auto",[u,l])>-1,f={},p={};c?(p=a.position(),i=p.top,o=p.left):(i=parseFloat(u)||0,o=parseFloat(l)||0),ce.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(f.top=t.top-s.top+i),null!=t.left&&(f.left=t.left-s.left+o),"using"in t?t.using.call(e,f):a.css(f)}},ce.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===ce.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),ce.nodeName(e[0],"html")||(n=e.offset()),n.top+=ce.css(e[0],"borderTopWidth",!0),n.left+=ce.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-ce.css(r,"marginTop",!0),left:t.left-n.left-ce.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||Q;e&&!ce.nodeName(e,"html")&&"static"===ce.css(e,"position");)e=e.offsetParent;return e||Q})}}),ce.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);ce.fn[e]=function(i){return ce.access(this,function(e,i,o){var a=X(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:void(a?a.scrollTo(r?ce(a).scrollLeft():o,r?o:ce(a).scrollTop()):e[i]=o)},e,i,arguments.length,null)}}),ce.each({Height:"height",Width:"width"},function(e,n){ce.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){ce.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return ce.access(this,function(n,r,i){var o;return ce.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?ce.css(n,r,s):ce.style(n,r,i,s)},n,a?i:t,a,null)}})}),ce.fn.size=function(){return this.length},ce.fn.andSelf=ce.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=ce:(e.jQuery=e.$=ce,"function"==typeof define&&define.amd&&define("jquery",[],function(){return ce}))}(window);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);


 var color = '';
!function( $ ) {

  // Picker object

  var Datepicker = function(element, options){
    this.element = $(element);
    this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
    this.picker = $(DPGlobal.template)
              .appendTo('body')
              .on({
                click: $.proxy(this.click, this)//,
                //mousedown: $.proxy(this.mousedown, this)
              });
    this.isInput = this.element.is('input');
    this.component = this.element.is('.date') ? this.element.find('.add-on') : false;

    if (this.isInput) {
      this.element.on({
        focus: $.proxy(this.show, this),
        //blur: $.proxy(this.hide, this),
        keyup: $.proxy(this.update, this)
      });
    } else {
      if (this.component){
        this.component.on('click', $.proxy(this.show, this));
      } else {
        this.element.on('click', $.proxy(this.show, this));
      }
    }

    this.minViewMode = options.minViewMode||this.element.data('date-minviewmode')||0;
    if (typeof this.minViewMode === 'string') {
      switch (this.minViewMode) {
        case 'months':
          this.minViewMode = 1;
          break;
        case 'years':
          this.minViewMode = 2;
          break;
        default:
          this.minViewMode = 0;
          break;
      }
    }
    this.viewMode = options.viewMode||this.element.data('date-viewmode')||0;
    if (typeof this.viewMode === 'string') {
      switch (this.viewMode) {
        case 'months':
          this.viewMode = 1;
          break;
        case 'years':
          this.viewMode = 2;
          break;
        default:
          this.viewMode = 0;
          break;
      }
    }
    this.color = options.color||'azure';
    this.startViewMode = this.viewMode;
    this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
    this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
    this.onRender = options.onRender;
    this.fillDow();
    this.fillMonths();
    this.update();
    this.showMode();

  };



  Datepicker.prototype = {
    constructor: Datepicker,

    show: function(e) {
        var datepicker = this.picker;

      this.picker.show();
      this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
      this.place();
      $(window).on('resize', $.proxy(this.place, this));
      if (e ) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (!this.isInput) {
      }
      var that = this;
      $(document).on('mousedown', function(ev){
        if ($(ev.target).closest('.datepicker').length == 0) {
          that.hide();
        }
      });
      this.element.trigger({
        type: 'show',
        date: this.date
      });

      setTimeout(function(){
          datepicker.addClass('open');
      }, 170);
    },

    hide: function(){
      var datepicker = this.picker;
      datepicker.removeClass('open');

      setTimeout(function(){
          this.picker.hide();
      }, 500);

      $(window).off('resize', this.place);
      this.viewMode = this.startViewMode;
      this.showMode();
      if (!this.isInput) {
        $(document).off('mousedown', this.hide);
      }
      //this.set();
      this.element.trigger({
        type: 'hide',
        date: this.date
      });

      },

    set: function() {
      var formated = DPGlobal.formatDate(this.date, this.format);
      if (!this.isInput) {
        if (this.component){
          this.element.find('input').prop('value', formated);
        }
        this.element.data('date', formated);
      } else {
        this.element.prop('value', formated);
      }
    },

    setValue: function(newDate) {
      if (typeof newDate === 'string') {
        this.date = DPGlobal.parseDate(newDate, this.format);
      } else {
        this.date = new Date(newDate);
      }
      this.set();
      this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
      this.fill();
    },

    place: function(){
      var offset = this.component ? this.component.offset() : this.element.offset();
      this.picker.css({
        top: offset.top + this.height,
        left: offset.left
      });
    },

    update: function(newDate){
      this.date = DPGlobal.parseDate(
        typeof newDate === 'string' ? newDate : (this.isInput ? this.element.prop('value') : this.element.data('date')),
        this.format
      );
      this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
      this.fill();
    },

    fillDow: function(){
      var dowCnt = this.weekStart;
      var html = '<tr>';
      while (dowCnt < this.weekStart + 7) {
        html += '<th class="dow">'+DPGlobal.dates.daysMin[(dowCnt++)%7]+'</th>';
      }
      html += '</tr>';
      this.picker.find('.datepicker-days thead').append(html);
    },

    fillMonths: function(){
      var html = '';
      var i = 0
      while (i < 12) {
        html += '<span class="month">'+DPGlobal.dates.monthsShort[i++]+'</span>';
      }
      this.picker.find('.datepicker-months td').append(html);
    },

    fill: function() {
      var d = new Date(this.viewDate),
        year = d.getFullYear(),
        month = d.getMonth(),
        currentDate = this.date.valueOf();
      this.picker.find('.datepicker-days th:eq(1)')
            .text(DPGlobal.dates.months[month]+' '+year);
      var prevMonth = new Date(year, month-1, 28,0,0,0,0),
        day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
      prevMonth.setDate(day);
      prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
      var nextMonth = new Date(prevMonth);
      nextMonth.setDate(nextMonth.getDate() + 42);
      nextMonth = nextMonth.valueOf();
      var html = [];
      var clsName,
        prevY,
        prevM;
      while(prevMonth.valueOf() < nextMonth) {
        if (prevMonth.getDay() === this.weekStart) {
          html.push('<tr>');
        }
        clsName = this.onRender(prevMonth);
        prevY = prevMonth.getFullYear();
        prevM = prevMonth.getMonth();
        if ((prevM < month &&  prevY === year) ||  prevY < year) {
          clsName += ' old';
        } else if ((prevM > month && prevY === year) || prevY > year) {
          clsName += ' new';
        }
        if (prevMonth.valueOf() === currentDate) {
          clsName += ' active ' + this.color;
        }
        html.push('<td class="day '+clsName+'"><p>'+prevMonth.getDate() + '</p></td>');
        if (prevMonth.getDay() === this.weekEnd) {
          html.push('</tr>');
        }
        prevMonth.setDate(prevMonth.getDate()+1);
      }
      this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
      var currentYear = this.date.getFullYear();

      var months = this.picker.find('.datepicker-months')
            .find('th:eq(1)')
              .text(year)
              .end()
            .find('span').removeClass('active');
      if (currentYear === year) {
        months.eq(this.date.getMonth()).addClass('active').addClass(this.color);
      }

      html = '';
      year = parseInt(year/10, 10) * 10;
      var yearCont = this.picker.find('.datepicker-years')
                .find('th:eq(1)')
                  .text(year + '-' + (year + 9))
                  .end()
                .find('td');
      year -= 1;
      for (var i = -1; i < 11; i++) {
        html += '<span class="year'+(i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active ' : '')+ this.color + '">'+year+'</span>';
        year += 1;
      }
      yearCont.html(html);
    },

    click: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var target = $(e.target).closest('span, td, th');
      if (target.length === 1) {
        switch(target[0].nodeName.toLowerCase()) {
          case 'th':
            switch(target[0].className) {
              case 'switch-datepicker':
                this.showMode(1);
                break;
              case 'prev':
              case 'next':
                this.viewDate['set'+DPGlobal.modes[this.viewMode].navFnc].call(
                  this.viewDate,
                  this.viewDate['get'+DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                  DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1)
                );
                this.fill();
                this.set();
                break;
            }
            break;
          case 'span':
            if (target.is('.month')) {
              var month = target.parent().find('span').index(target);
              this.viewDate.setMonth(month);
            } else {
              var year = parseInt(target.text(), 10)||0;
              this.viewDate.setFullYear(year);
            }
            if (this.viewMode !== 0) {
              this.date = new Date(this.viewDate);
              this.element.trigger({
                type: 'changeDate',
                date: this.date,
                viewMode: DPGlobal.modes[this.viewMode].clsName
              });
            }
            this.showMode(-1);
            this.fill();
            this.set();
            break;
          case 'td':
            if (target.is('.day') && !target.is('.disabled')){
              var day = parseInt(target.text(), 10)||1;
              var month = this.viewDate.getMonth();
              if (target.is('.old')) {
                month -= 1;
              } else if (target.is('.new')) {
                month += 1;
              }
              var year = this.viewDate.getFullYear();
              this.date = new Date(year, month, day,0,0,0,0);
              this.viewDate = new Date(year, month, Math.min(28, day),0,0,0,0);
              this.fill();
              this.set();
              this.element.trigger({
                type: 'changeDate',
                date: this.date,
                viewMode: DPGlobal.modes[this.viewMode].clsName
              });
            }
            break;
        }
      }
    },

    mousedown: function(e){
      e.stopPropagation();
      e.preventDefault();
    },

    showMode: function(dir) {
      if (dir) {
        this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
      }
      this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
    }
  };

  $.fn.datepicker = function ( option, val ) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('datepicker'),
        options = typeof option === 'object' && option;
      if (!data) {
        $this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
      }
      if (typeof option === 'string') data[option](val);
    });
  };

  $.fn.datepicker.defaults = {
    onRender: function(date) {
      return '';
    }
  };
  $.fn.datepicker.Constructor = Datepicker;

  var DPGlobal = {
    modes: [
      {
        clsName: 'days',
        navFnc: 'Month',
        navStep: 1
      },
      {
        clsName: 'months',
        navFnc: 'FullYear',
        navStep: 1
      },
      {
        clsName: 'years',
        navFnc: 'FullYear',
        navStep: 10
    }],
    dates:{
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      daysMin: ["S", "M", "T", "W", "T", "F", "S", "S"],
      months: ["JAN.", "FEB.", "MAR.", "APR.", "MAY", "JUN.", "JUL.", "AUG.", "SEPT.", "OCT.", "NOV.", "DEC."],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    isLeapYear: function (year) {
      return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
    },
    getDaysInMonth: function (year, month) {
      return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    },
    parseFormat: function(format){
      var separator = format.match(/[.\/\-\s].*?/),
        parts = format.split(/\W+/);
      if (!separator || !parts || parts.length === 0){
        throw new Error("Invalid date format.");
      }
      return {separator: separator, parts: parts};
    },
    parseDate: function(date, format) {
      var parts = date.split(format.separator),
        date = new Date(),
        val;
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      if (parts.length === format.parts.length) {
        var year = date.getFullYear(), day = date.getDate(), month = date.getMonth();
        for (var i=0, cnt = format.parts.length; i < cnt; i++) {
          val = parseInt(parts[i], 10)||1;
          switch(format.parts[i]) {
            case 'dd':
            case 'd':
              day = val;
              date.setDate(val);
              break;
            case 'mm':
            case 'm':
              month = val - 1;
              date.setMonth(val - 1);
              break;
            case 'yy':
              year = 2000 + val;
              date.setFullYear(2000 + val);
              break;
            case 'yyyy':
              year = val;
              date.setFullYear(val);
              break;
          }
        }
        date = new Date(year, month, day, 0 ,0 ,0);
      }
      return date;
    },
    formatDate: function(date, format){
      var val = {
        d: date.getDate(),
        m: date.getMonth() + 1,
        yy: date.getFullYear().toString().substring(2),
        yyyy: date.getFullYear()
      };
      val.dd = (val.d < 10 ? '0' : '') + val.d;
      val.mm = (val.m < 10 ? '0' : '') + val.m;
      var date = [];
      for (var i=0, cnt = format.parts.length; i < cnt; i++) {
        date.push(val[format.parts[i]]);
      }
      return date.join(format.separator);
    },
    headTemplate: '<thead>'+
              '<tr>'+
                '<th class="prev"><p>&lsaquo;</p></th>'+
                '<th colspan="5" class="switch-datepicker"></th>'+
                '<th class="next"><p>&rsaquo;</p></th>'+
              '</tr>'+
            '</thead>',
    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
  };

  DPGlobal.template = '<div class="datepicker dropdown-menu">'+
              '<div class="datepicker-days">'+
                '<table class=" table-condensed">'+
                  DPGlobal.headTemplate+
                  '<tbody></tbody>'+
                '</table>'+
              '</div>'+
              '<div class="datepicker-months">'+
                '<table class="table-condensed">'+
                  DPGlobal.headTemplate+
                  DPGlobal.contTemplate+
                '</table>'+
              '</div>'+
              '<div class="datepicker-years">'+
                '<table class="table-condensed">'+
                  DPGlobal.headTemplate+
                  DPGlobal.contTemplate+
                '</table>'+
              '</div>'+
            '</div>';

}( window.jQuery );
!function(t){function o(t){return"undefined"==typeof t.which?!0:"number"==typeof t.which&&t.which>0?!t.ctrlKey&&!t.metaKey&&!t.altKey&&8!=t.which&&9!=t.which&&13!=t.which&&16!=t.which&&17!=t.which&&20!=t.which&&27!=t.which:!1}function i(o){var i=t(o);i.prop("disabled")||i.closest(".form-group").addClass("is-focused")}function n(o){o.closest("label").hover(function(){var o=t(this).find("input");o.prop("disabled")||i(o)},function(){e(t(this).find("input"))})}function e(o){t(o).closest(".form-group").removeClass("is-focused")}t.expr[":"].notmdproc=function(o){return t(o).data("mdproc")?!1:!0},t.material={options:{validate:!0,input:!0,ripples:!0,checkbox:!0,togglebutton:!0,radio:!0,arrive:!0,autofill:!1,withRipples:[".btn:not(.btn-link)",".card-image",".navbar a:not(.withoutripple)",".footer a:not(.withoutripple)",".dropdown-menu a",".nav-tabs a:not(.withoutripple)",".withripple",".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","),inputElements:"input.form-control, textarea.form-control, select.form-control",checkboxElements:".checkbox > label > input[type=checkbox]",togglebuttonElements:".togglebutton > label > input[type=checkbox]",radioElements:".radio > label > input[type=radio]"},checkbox:function(o){var i=t(o?o:this.options.checkboxElements).filter(":notmdproc").data("mdproc",!0).after("<span class='checkbox-material'><span class='check'></span></span>");n(i)},togglebutton:function(o){var i=t(o?o:this.options.togglebuttonElements).filter(":notmdproc").data("mdproc",!0).after("<span class='toggle'></span>");n(i)},radio:function(o){var i=t(o?o:this.options.radioElements).filter(":notmdproc").data("mdproc",!0).after("<span class='circle'></span><span class='check'></span>");n(i)},input:function(o){t(o?o:this.options.inputElements).filter(":notmdproc").data("mdproc",!0).each(function(){var o=t(this),i=o.closest(".form-group");0===i.length&&(o.wrap("<div class='form-group'></div>"),i=o.closest(".form-group")),o.attr("data-hint")&&(o.after("<p class='help-block'>"+o.attr("data-hint")+"</p>"),o.removeAttr("data-hint"));var n={"input-lg":"form-group-lg","input-sm":"form-group-sm"};if(t.each(n,function(t,n){o.hasClass(t)&&(o.removeClass(t),i.addClass(n))}),o.hasClass("floating-label")){var e=o.attr("placeholder");o.attr("placeholder",null).removeClass("floating-label");var a=o.attr("id"),r="";a&&(r="for='"+a+"'"),i.addClass("label-floating"),o.after("<label "+r+"class='control-label'>"+e+"</label>")}(null===o.val()||"undefined"==o.val()||""===o.val())&&i.addClass("is-empty"),i.append("<span class='material-input'></span>"),i.find("input[type=file]").length>0&&i.addClass("is-fileinput")})},attachInputEventHandlers:function(){var n=this.options.validate;t(document).on("change",".checkbox input[type=checkbox]",function(){t(this).blur()}).on("keydown paste",".form-control",function(i){o(i)&&t(this).closest(".form-group").removeClass("is-empty")}).on("keyup change",".form-control",function(){var o=t(this),i=o.closest(".form-group"),e="undefined"==typeof o[0].checkValidity||o[0].checkValidity();""===o.val()?i.addClass("is-empty"):i.removeClass("is-empty"),n&&(e?i.removeClass("has-error"):i.addClass("has-error"))}).on("focus",".form-control, .form-group.is-fileinput",function(){i(this)}).on("blur",".form-control, .form-group.is-fileinput",function(){e(this)}).on("change",".form-group input",function(){var o=t(this);if("file"!=o.attr("type")){var i=o.closest(".form-group"),n=o.val();n?i.removeClass("is-empty"):i.addClass("is-empty")}}).on("change",".form-group.is-fileinput input[type='file']",function(){var o=t(this),i=o.closest(".form-group"),n="";t.each(this.files,function(t,o){n+=o.name+", "}),n=n.substring(0,n.length-2),n?i.removeClass("is-empty"):i.addClass("is-empty"),i.find("input.form-control[readonly]").val(n)})},ripples:function(o){t(o?o:this.options.withRipples).ripples()},autofill:function(){var o=setInterval(function(){t("input[type!=checkbox]").each(function(){var o=t(this);o.val()&&o.val()!==o.attr("value")&&o.trigger("change")})},100);setTimeout(function(){clearInterval(o)},1e4)},attachAutofillEventHandlers:function(){var o;t(document).on("focus","input",function(){var i=t(this).parents("form").find("input").not("[type=file]");o=setInterval(function(){i.each(function(){var o=t(this);o.val()!==o.attr("value")&&o.trigger("change")})},100)}).on("blur",".form-group input",function(){clearInterval(o)})},init:function(o){this.options=t.extend({},this.options,o);var i=t(document);t.fn.ripples&&this.options.ripples&&this.ripples(),this.options.input&&(this.input(),this.attachInputEventHandlers()),this.options.checkbox&&this.checkbox(),this.options.togglebutton&&this.togglebutton(),this.options.radio&&this.radio(),this.options.autofill&&(this.autofill(),this.attachAutofillEventHandlers()),document.arrive&&this.options.arrive&&(t.fn.ripples&&this.options.ripples&&i.arrive(this.options.withRipples,function(){t.material.ripples(t(this))}),this.options.input&&i.arrive(this.options.inputElements,function(){t.material.input(t(this))}),this.options.checkbox&&i.arrive(this.options.checkboxElements,function(){t.material.checkbox(t(this))}),this.options.radio&&i.arrive(this.options.radioElements,function(){t.material.radio(t(this))}),this.options.togglebutton&&i.arrive(this.options.togglebuttonElements,function(){t.material.togglebutton(t(this))}))}}}(jQuery),function(t,o,i,n){"use strict";function e(o,i){r=this,this.element=t(o),this.options=t.extend({},s,i),this._defaults=s,this._name=a,this.init()}var a="ripples",r=null,s={};e.prototype.init=function(){var i=this.element;i.on("mousedown touchstart",function(n){if(!r.isTouch()||"mousedown"!==n.type){i.find(".ripple-container").length||i.append('<div class="ripple-container"></div>');var e=i.children(".ripple-container"),a=r.getRelY(e,n),s=r.getRelX(e,n);if(a||s){var l=r.getRipplesColor(i),p=t("<div></div>");p.addClass("ripple").css({left:s,top:a,"background-color":l}),e.append(p),function(){return o.getComputedStyle(p[0]).opacity}(),r.rippleOn(i,p),setTimeout(function(){r.rippleEnd(p)},500),i.on("mouseup mouseleave touchend",function(){p.data("mousedown","off"),"off"===p.data("animating")&&r.rippleOut(p)})}}})},e.prototype.getNewSize=function(t,o){return Math.max(t.outerWidth(),t.outerHeight())/o.outerWidth()*2.5},e.prototype.getRelX=function(t,o){var i=t.offset();return r.isTouch()?(o=o.originalEvent,1===o.touches.length?o.touches[0].pageX-i.left:!1):o.pageX-i.left},e.prototype.getRelY=function(t,o){var i=t.offset();return r.isTouch()?(o=o.originalEvent,1===o.touches.length?o.touches[0].pageY-i.top:!1):o.pageY-i.top},e.prototype.getRipplesColor=function(t){var i=t.data("ripple-color")?t.data("ripple-color"):o.getComputedStyle(t[0]).color;return i},e.prototype.hasTransitionSupport=function(){var t=i.body||i.documentElement,o=t.style,e=o.transition!==n||o.WebkitTransition!==n||o.MozTransition!==n||o.MsTransition!==n||o.OTransition!==n;return e},e.prototype.isTouch=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},e.prototype.rippleEnd=function(t){t.data("animating","off"),"off"===t.data("mousedown")&&r.rippleOut(t)},e.prototype.rippleOut=function(t){t.off(),r.hasTransitionSupport()?t.addClass("ripple-out"):t.animate({opacity:0},100,function(){t.trigger("transitionend")}),t.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){t.remove()})},e.prototype.rippleOn=function(t,o){var i=r.getNewSize(t,o);r.hasTransitionSupport()?o.css({"-ms-transform":"scale("+i+")","-moz-transform":"scale("+i+")","-webkit-transform":"scale("+i+")",transform:"scale("+i+")"}).addClass("ripple-on").data("animating","on").data("mousedown","on"):o.animate({width:2*Math.max(t.outerWidth(),t.outerHeight()),height:2*Math.max(t.outerWidth(),t.outerHeight()),"margin-left":-1*Math.max(t.outerWidth(),t.outerHeight()),"margin-top":-1*Math.max(t.outerWidth(),t.outerHeight()),opacity:.2},500,function(){o.trigger("transitionend")})},t.fn.ripples=function(o){return this.each(function(){t.data(this,"plugin_"+a)||t.data(this,"plugin_"+a,new e(this,o))})}}(jQuery,window,document);

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Datepicker
    if($('.datepicker').length != 0){
        $('.datepicker').datepicker({
             weekStart:1
        });
    }

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
    if($('.navbar-color-on-scroll').length != 0){
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
	$('.carousel').carousel({
      interval: 400000
    });

});

materialKit = {
    misc:{
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > 260 ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
    }, 17),

    initSliders: function(){
        // Sliders for demo purpose
        $('#sliderRegular').noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                min: 0,
                max: 100
            }
        });

        $('#sliderDouble').noUiSlider({
            start: [20, 60] ,
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

materialKitDemo = {
    checkScrollForParallax: debounce(function(){
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform':'translate3d(0,' + oVal +'px,0)',
            '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
            '-ms-transform':'translate3d(0,' + oVal +'px,0)',
            '-o-transform':'translate3d(0,' + oVal +'px,0)'
        });

    }, 6)

}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};



var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Datepicker
    if($('.datepicker').length != 0){
        $('.datepicker').datepicker({
             weekStart:1
        });
    }

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
    if($('.navbar-color-on-scroll').length != 0){
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
    $('.carousel').carousel({
      interval: 400000
    });

});

materialKit = {
    misc:{
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > 260 ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
    }, 17),

    initSliders: function(){
        // Sliders for demo purpose
        $('#sliderRegular').noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                min: 0,
                max: 100
            }
        });

        $('#sliderDouble').noUiSlider({
            start: [20, 60] ,
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

materialKitDemo = {
    checkScrollForParallax: debounce(function(){
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform':'translate3d(0,' + oVal +'px,0)',
            '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
            '-ms-transform':'translate3d(0,' + oVal +'px,0)',
            '-o-transform':'translate3d(0,' + oVal +'px,0)'
        });

    }, 6)

}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


(function(c){function m(a,c,d){if((a[c]||a[d])&&a[c]===a[d])throw Error("(Link) '"+c+"' can't match '"+d+"'.'");}function r(a){void 0===a&&(a={});if("object"!==typeof a)throw Error("(Format) 'format' option must be an object.");var h={};c(u).each(function(c,n){if(void 0===a[n])h[n]=A[c];else if(typeof a[n]===typeof A[c]){if("decimals"===n&&(0>a[n]||7<a[n]))throw Error("(Format) 'format.decimals' option must be between 0 and 7.");h[n]=a[n]}else throw Error("(Format) 'format."+n+"' must be a "+typeof A[c]+
".");});m(h,"mark","thousand");m(h,"prefix","negative");m(h,"prefix","negativeBefore");this.r=h}function k(a,h){"object"!==typeof a&&c.error("(Link) Initialize with an object.");return new k.prototype.p(a.target||function(){},a.method,a.format||{},h)}var u="decimals mark thousand prefix postfix encoder decoder negative negativeBefore to from".split(" "),A=[2,".","","","",function(a){return a},function(a){return a},"-","",function(a){return a},function(a){return a}];r.prototype.a=function(a){return this.r[a]};
r.prototype.L=function(a){function c(a){return a.split("").reverse().join("")}a=this.a("encoder")(a);var d=this.a("decimals"),n="",k="",m="",r="";0===parseFloat(a.toFixed(d))&&(a="0");0>a&&(n=this.a("negative"),k=this.a("negativeBefore"));a=Math.abs(a).toFixed(d).toString();a=a.split(".");this.a("thousand")?(m=c(a[0]).match(/.{1,3}/g),m=c(m.join(c(this.a("thousand"))))):m=a[0];this.a("mark")&&1<a.length&&(r=this.a("mark")+a[1]);return this.a("to")(k+this.a("prefix")+n+m+r+this.a("postfix"))};r.prototype.w=
function(a){function c(a){return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g,"\\$&")}var d;if(null===a||void 0===a)return!1;a=this.a("from")(a);a=a.toString();d=a.replace(RegExp("^"+c(this.a("negativeBefore"))),"");a!==d?(a=d,d="-"):d="";a=a.replace(RegExp("^"+c(this.a("prefix"))),"");this.a("negative")&&(d="",a=a.replace(RegExp("^"+c(this.a("negative"))),"-"));a=a.replace(RegExp(c(this.a("postfix"))+"$"),"").replace(RegExp(c(this.a("thousand")),"g"),"").replace(this.a("mark"),".");a=this.a("decoder")(parseFloat(d+
a));return isNaN(a)?!1:a};k.prototype.K=function(a,h){this.method=h||"html";this.j=c(a.replace("-tooltip-","")||"<div/>")[0]};k.prototype.H=function(a){this.method="val";this.j=document.createElement("input");this.j.name=a;this.j.type="hidden"};k.prototype.G=function(a){function h(a,c){return[c?null:a,c?a:null]}var d=this;this.method="val";this.target=a.on("change",function(a){d.B.val(h(c(a.target).val(),d.t),{link:d,set:!0})})};k.prototype.p=function(a,h,d,k){this.g=d;this.update=!k;if("string"===
typeof a&&0===a.indexOf("-tooltip-"))this.K(a,h);else if("string"===typeof a&&0!==a.indexOf("-"))this.H(a);else if("function"===typeof a)this.target=!1,this.method=a;else{if(a instanceof c||c.zepto&&c.zepto.isZ(a)){if(!h){if(a.is("input, select, textarea")){this.G(a);return}h="html"}if("function"===typeof h||"string"===typeof h&&a[h]){this.method=h;this.target=a;return}}throw new RangeError("(Link) Invalid Link.");}};k.prototype.write=function(a,c,d,k){if(!this.update||!1!==k)if(this.u=a,this.F=a=
this.format(a),"function"===typeof this.method)this.method.call(this.target[0]||d[0],a,c,d);else this.target[this.method](a,c,d)};k.prototype.q=function(a){this.g=new r(c.extend({},a,this.g instanceof r?this.g.r:this.g))};k.prototype.J=function(a){this.B=a};k.prototype.I=function(a){this.t=a};k.prototype.format=function(a){return this.g.L(a)};k.prototype.A=function(a){return this.g.w(a)};k.prototype.p.prototype=k.prototype;c.Link=k})(window.jQuery||window.Zepto);/*

$.fn.noUiSlider - WTFPL - refreshless.com/nouislider/ */
(function(c){function m(e){return"number"===typeof e&&!isNaN(e)&&isFinite(e)}function r(e){return c.isArray(e)?e:[e]}function k(e,b){e.addClass(b);setTimeout(function(){e.removeClass(b)},300)}function u(e,b){return 100*b/(e[1]-e[0])}function A(e,b){if(b>=e.d.slice(-1)[0])return 100;for(var a=1,c,f,d;b>=e.d[a];)a++;c=e.d[a-1];f=e.d[a];d=e.c[a-1];c=[c,f];return d+u(c,0>c[0]?b+Math.abs(c[0]):b-c[0])/(100/(e.c[a]-d))}function a(e,b){if(100<=b)return e.d.slice(-1)[0];for(var a=1,c,f,d;b>=e.c[a];)a++;c=
e.d[a-1];f=e.d[a];d=e.c[a-1];c=[c,f];return 100/(e.c[a]-d)*(b-d)*(c[1]-c[0])/100+c[0]}function h(a,b){for(var c=1,g;(a.dir?100-b:b)>=a.c[c];)c++;if(a.m)return g=a.c[c-1],c=a.c[c],b-g>(c-g)/2?c:g;a.h[c-1]?(g=a.h[c-1],c=a.c[c-1]+Math.round((b-a.c[c-1])/g)*g):c=b;return c}function d(a,b){if(!m(b))throw Error("noUiSlider: 'step' is not numeric.");a.h[0]=b}function n(a,b){if("object"!==typeof b||c.isArray(b))throw Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
c.each(b,function(b,g){var d;"number"===typeof g&&(g=[g]);if(!c.isArray(g))throw Error("noUiSlider: 'range' contains invalid value.");d="min"===b?0:"max"===b?100:parseFloat(b);if(!m(d)||!m(g[0]))throw Error("noUiSlider: 'range' value isn't numeric.");a.c.push(d);a.d.push(g[0]);d?a.h.push(isNaN(g[1])?!1:g[1]):isNaN(g[1])||(a.h[0]=g[1])});c.each(a.h,function(b,c){if(!c)return!0;a.h[b]=u([a.d[b],a.d[b+1]],c)/(100/(a.c[b+1]-a.c[b]))})}function E(a,b){"number"===typeof b&&(b=[b]);if(!c.isArray(b)||!b.length||
2<b.length)throw Error("noUiSlider: 'start' option is incorrect.");a.b=b.length;a.start=b}function I(a,b){a.m=b;if("boolean"!==typeof b)throw Error("noUiSlider: 'snap' option must be a boolean.");}function J(a,b){if("lower"===b&&1===a.b)a.i=1;else if("upper"===b&&1===a.b)a.i=2;else if(!0===b&&2===a.b)a.i=3;else if(!1===b)a.i=0;else throw Error("noUiSlider: 'connect' option doesn't match handle count.");}function D(a,b){switch(b){case "horizontal":a.k=0;break;case "vertical":a.k=1;break;default:throw Error("noUiSlider: 'orientation' option is invalid.");
}}function K(a,b){if(2<a.c.length)throw Error("noUiSlider: 'margin' option is only supported on linear sliders.");a.margin=u(a.d,b);if(!m(b))throw Error("noUiSlider: 'margin' option must be numeric.");}function L(a,b){switch(b){case "ltr":a.dir=0;break;case "rtl":a.dir=1;a.i=[0,2,1,3][a.i];break;default:throw Error("noUiSlider: 'direction' option was not recognized.");}}function M(a,b){if("string"!==typeof b)throw Error("noUiSlider: 'behaviour' must be a string containing options.");var c=0<=b.indexOf("snap");
a.n={s:0<=b.indexOf("tap")||c,extend:0<=b.indexOf("extend"),v:0<=b.indexOf("drag"),fixed:0<=b.indexOf("fixed"),m:c}}function N(a,b,d){a.o=[b.lower,b.upper];a.g=b.format;c.each(a.o,function(a,e){if(!c.isArray(e))throw Error("noUiSlider: 'serialization."+(a?"upper":"lower")+"' must be an array.");c.each(e,function(){if(!(this instanceof c.Link))throw Error("noUiSlider: 'serialization."+(a?"upper":"lower")+"' can only contain Link instances.");this.I(a);this.J(d);this.q(b.format)})});a.dir&&1<a.b&&a.o.reverse()}
function O(a,b){var f={c:[],d:[],h:[!1],margin:0},g;g={step:{e:!1,f:d},start:{e:!0,f:E},connect:{e:!0,f:J},direction:{e:!0,f:L},range:{e:!0,f:n},snap:{e:!1,f:I},orientation:{e:!1,f:D},margin:{e:!1,f:K},behaviour:{e:!0,f:M},serialization:{e:!0,f:N}};a=c.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},a);a.serialization=c.extend({lower:[],upper:[],format:{}},a.serialization);c.each(g,function(c,d){if(void 0===a[c]){if(d.e)throw Error("noUiSlider: '"+c+"' is required.");
return!0}d.f(f,a[c],b)});f.style=f.k?"top":"left";return f}function P(a,b){var d=c("<div><div/></div>").addClass(f[2]),g=["-lower","-upper"];a.dir&&g.reverse();d.children().addClass(f[3]+" "+f[3]+g[b]);return d}function Q(a,b){b.j&&(b=new c.Link({target:c(b.j).clone().appendTo(a),method:b.method,format:b.g},!0));return b}function R(a,b){var d,f=[];for(d=0;d<a.b;d++){var k=f,h=d,m=a.o[d],n=b[d].children(),r=a.g,s=void 0,v=[],s=new c.Link({},!0);s.q(r);v.push(s);for(s=0;s<m.length;s++)v.push(Q(n,m[s]));
k[h]=v}return f}function S(a,b,c){switch(a){case 1:b.addClass(f[7]);c[0].addClass(f[6]);break;case 3:c[1].addClass(f[6]);case 2:c[0].addClass(f[7]);case 0:b.addClass(f[6])}}function T(a,b){var c,d=[];for(c=0;c<a.b;c++)d.push(P(a,c).appendTo(b));return d}function U(a,b){b.addClass([f[0],f[8+a.dir],f[4+a.k]].join(" "));return c("<div/>").appendTo(b).addClass(f[1])}function V(d,b,m){function g(){return t[["width","height"][b.k]]()}function n(a){var b,c=[q.val()];for(b=0;b<a.length;b++)q.trigger(a[b],
c)}function u(d,p,e){var g=d[0]!==l[0][0]?1:0,H=x[0]+b.margin,k=x[1]-b.margin;e&&1<l.length&&(p=g?Math.max(p,H):Math.min(p,k));100>p&&(p=h(b,p));p=Math.max(Math.min(parseFloat(p.toFixed(7)),100),0);if(p===x[g])return 1===l.length?!1:p===H||p===k?0:!1;d.css(b.style,p+"%");d.is(":first-child")&&d.toggleClass(f[17],50<p);x[g]=p;b.dir&&(p=100-p);c(y[g]).each(function(){this.write(a(b,p),d.children(),q)});return!0}function B(a,b,c){c||k(q,f[14]);u(a,b,!1);n(["slide","set","change"])}function w(a,c,d,e){a=
a.replace(/\s/g,".nui ")+".nui";c.on(a,function(a){var c=q.attr("disabled");if(q.hasClass(f[14])||void 0!==c&&null!==c)return!1;a.preventDefault();var c=0===a.type.indexOf("touch"),p=0===a.type.indexOf("mouse"),F=0===a.type.indexOf("pointer"),g,k,l=a;0===a.type.indexOf("MSPointer")&&(F=!0);a.originalEvent&&(a=a.originalEvent);c&&(g=a.changedTouches[0].pageX,k=a.changedTouches[0].pageY);if(p||F)F||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=
document.documentElement.scrollTop),g=a.clientX+window.pageXOffset,k=a.clientY+window.pageYOffset;l.C=[g,k];l.cursor=p;a=l;a.l=a.C[b.k];d(a,e)})}function C(a,c){var b=c.b||l,d,e=!1,e=100*(a.l-c.start)/g(),f=b[0][0]!==l[0][0]?1:0;var k=c.D;d=e+k[0];e+=k[1];1<b.length?(0>d&&(e+=Math.abs(d)),100<e&&(d-=e-100),d=[Math.max(Math.min(d,100),0),Math.max(Math.min(e,100),0)]):d=[d,e];e=u(b[0],d[f],1===b.length);1<b.length&&(e=u(b[1],d[f?0:1],!1)||e);e&&n(["slide"])}function s(a){c("."+f[15]).removeClass(f[15]);
a.cursor&&c("body").css("cursor","").off(".nui");G.off(".nui");q.removeClass(f[12]);n(["set","change"])}function v(a,b){1===b.b.length&&b.b[0].children().addClass(f[15]);a.stopPropagation();w(z.move,G,C,{start:a.l,b:b.b,D:[x[0],x[l.length-1]]});w(z.end,G,s,null);a.cursor&&(c("body").css("cursor",c(a.target).css("cursor")),1<l.length&&q.addClass(f[12]),c("body").on("selectstart.nui",!1))}function D(a){var d=a.l,e=0;a.stopPropagation();c.each(l,function(){e+=this.offset()[b.style]});e=d<e/2||1===l.length?
0:1;d-=t.offset()[b.style];d=100*d/g();B(l[e],d,b.n.m);b.n.m&&v(a,{b:[l[e]]})}function E(a){var c=(a=a.l<t.offset()[b.style])?0:100;a=a?0:l.length-1;B(l[a],c,!1)}var q=c(d),x=[-1,-1],t,y,l;if(q.hasClass(f[0]))throw Error("Slider was already initialized.");t=U(b,q);l=T(b,t);y=R(b,l);S(b.i,q,l);(function(a){var b;if(!a.fixed)for(b=0;b<l.length;b++)w(z.start,l[b].children(),v,{b:[l[b]]});a.s&&w(z.start,t,D,{b:l});a.extend&&(q.addClass(f[16]),a.s&&w(z.start,q,E,{b:l}));a.v&&(b=t.find("."+f[7]).addClass(f[10]),
a.fixed&&(b=b.add(t.children().not(b).children())),w(z.start,b,v,{b:l}))})(b.n);d.vSet=function(){var a=Array.prototype.slice.call(arguments,0),d,e,g,h,m,s,t=r(a[0]);"object"===typeof a[1]?(d=a[1].set,e=a[1].link,g=a[1].update,h=a[1].animate):!0===a[1]&&(d=!0);b.dir&&1<b.b&&t.reverse();h&&k(q,f[14]);a=1<l.length?3:1;1===t.length&&(a=1);for(m=0;m<a;m++)h=e||y[m%2][0],h=h.A(t[m%2]),!1!==h&&(h=A(b,h),b.dir&&(h=100-h),!0!==u(l[m%2],h,!0)&&c(y[m%2]).each(function(a){if(!a)return s=this.u,!0;this.write(s,
l[m%2].children(),q,g)}));!0===d&&n(["set"]);return this};d.vGet=function(){var a,c=[];for(a=0;a<b.b;a++)c[a]=y[a][0].F;return 1===c.length?c[0]:b.dir?c.reverse():c};d.destroy=function(){c.each(y,function(){c.each(this,function(){this.target&&this.target.off(".nui")})});c(this).off(".nui").removeClass(f.join(" ")).empty();return m};q.val(b.start)}function W(a){if(!this.length)throw Error("noUiSlider: Can't initialize slider on empty selection.");var b=O(a,this);return this.each(function(){V(this,
b,a)})}function X(a){return this.each(function(){var b=c(this).val(),d=this.destroy(),f=c.extend({},d,a);c(this).noUiSlider(f);d.start===f.start&&c(this).val(b)})}function B(){return this[0][arguments.length?"vSet":"vGet"].apply(this[0],arguments)}var G=c(document),C=c.fn.val,z=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",
end:"mouseup touchend"},f="noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" ");c.fn.val=function(){var a=arguments,b=c(this[0]);return arguments.length?this.each(function(){(c(this).hasClass(f[0])?B:C).apply(c(this),a)}):(b.hasClass(f[0])?B:C).call(b)};c.noUiSlider={Link:c.Link};c.fn.noUiSlider=function(a,b){return(b?X:W).call(this,
a)}})(window.jQuery||window.Zepto);
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
$(document).ready(function(){
  $( ".avatar .camera" ).on( "click", function() {
    $( "#avatar" ).trigger( "click" );
  });

  $("#avatar").on("change", function(){
    readURL(avatar,"img-avatar");
  });

  $(document).on('click', '.browse', function(){
    var file = $(this).parent().parent().parent().find('.file');
    file.trigger('click');
  });
  
  $(document).on('change', '.file', function(){
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
  });

  $(document).on("click", function(){
    setTimeout(function() {
      $(".number-floating").animate({opacity: "0"});
      $(".add-to-cart").animate({opacity: "0"});
    }, 2000);
  });

  $(".btn-cart").on("click", function() {
    var numberFloating = $(this).siblings(".number-floating");
    var addToCart = $(this).siblings(".add-to-cart");
    floatingNumber(numberFloating, "240px");
    floatingNumber(addToCart, "130px");
    return 0;
  });
});

function floatingNumber(elem, left) {
  left = (Number(left.replace("px", "")) - 40) + "px";
  elem.html(Number(elem.html()) + 1);
  elem.animate({opacity: "1"});
  elem.animate({left: left, fontSize: "30px"},"fast");
}

function readURL(input, imgId) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.'+imgId).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(function() {
  $(".checkbox input[type=checkbox]").click(function() {
    $("#submit").trigger("click");
  });

  var orderByPrice = $("input#order_by_price");
  var dropDownLabel = $("#dropdown-label");
  $("#price-default").click(function() {
    dropDownLabel.html($(this).html());
    orderByPrice.val("asc");
    $("#submit").trigger("click");
  });

  $("#price-up").click(function() {
    dropDownLabel.html($(this).html());
    orderByPrice.val("asc");
    $("#submit").trigger("click");
  });

  $("#price-down").click(function() {
    dropDownLabel.html($(this).html());
    orderByPrice.val("desc");
    $("#submit").trigger("click");
  });


  //===================Homepage===================
  $("#sort-default").click(function() {
    dropDownLabel.html($(this).html());
  });

  $("#sort-food").click(function() {
    dropDownLabel.html($(this).html());
  });

  $("#sort-drink").click(function() {
    dropDownLabel.html($(this).html());
  });

});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.





;
