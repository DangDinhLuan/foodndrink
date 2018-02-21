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

  def monthly_admin_email
    User.admins.each do |admin|
      self.send_statistic(admin).deliver
    end
  end

  def send_statistic admin
    @total_price = Product.total_sold_of_this_month(:price)
    @total_quantity = Product.total_sold_of_this_month(:quantity)
    @admin = admin
    mail to: @admin.email, subject: I18n.t("user_mailer.custommer_order.subject")
  end
end
