class UserMailer < ApplicationMailer
  def account_activation user
    @user = user
    mail to: @user.email, subject: I18n.t("user_mailer.activation.subject") 
  end

  def password_reset user
    @user = user
    mail to: @user.email, subject: I18n.t("user_mailer.password_reset.subject") 
  end

  def custommer_order order
    @order = order
    @items = @order.items
    mail to: @order.email, subject: I18n.t("user_mailer.custommer_order.subject")
  end
end
