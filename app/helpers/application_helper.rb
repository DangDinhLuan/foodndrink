module ApplicationHelper
  def error_messages errors
    if errors.class.to_s == "ActiveModel::Errors"
      errors.messages.each do |field, error|
        field = field.to_s.capitalize.sub "_", " "
        message = error.first
        yield (field + " " + message)
      end
    else
      errors.each do |error|
        yield error
      end
    end
  end

  def flash_messages flash
    result = Array.new
    flash.each do |type, message|
      icon = "info_outline"
      case type.to_s.downcase
      when "info"
        icon = "info_outline"
      when "success"
        icon = "check"
      when "warning"
        icon = "warning"
      when "danger"
        icon = "error_outline"
      else
        type = "info"
      end
      result.push [type, message, icon]
    end
    result
  end

  def number_to_currency number, options = {}
    options[:locale] = I18n.locale
    super number, options
  end

  def currency_for model
    if model.is_a? Numeric
      number = model
    else
      number = (model.price if model.methods.include? :price) || (model.total if model.methods.include? :total)
    end
    number_to_currency number if number.present?
  end

  def excerp text
    text.truncate Settings.product.description.excerp, saparator: /\s/
  end

  def current_class? input_path
    "active" if request.path == input_path
  end

  def product_collunm
    controller.controller_name == "categories" ? "col-md-4" : "col-md-3"
  end

  def current_controller controller_name
    controller.controller_name == controller_name
  end

  def navbar_class
    if controller.controller_name =~ /home|categories/i
      "navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll"
    else
      "navbar navbar-fixed-top"
    end
  end
end
