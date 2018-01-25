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
    number = (model.price if model.methods.include? :price) || (model.total if model.methods.include? :total)
    number_to_currency number if number.present?
  end
end
