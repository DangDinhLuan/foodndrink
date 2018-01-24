module ApplicationHelper
  def error_messages errors
    errors.messages.each do |field, error|
      field = field.to_s.capitalize.sub "_", " "
      message = error.first
      yield (field + " " + message)
    end
  end

  def flash_messages flash
    result = Array.new
    flash.each do |type, message|
      icon = "info_outline"
      case type
      when :info
        icon = "info_outline"
      when :success
        icon = "check"
      when :warning
        icon = "warning"
      when :danger
        icon = "ersror_outline"
      else
        type = :info
      end
      result.push [type, message, icon]
    end
  end
end
