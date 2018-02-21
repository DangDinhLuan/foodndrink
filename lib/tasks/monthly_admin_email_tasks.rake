desc "Send statistic to admin at end of month"
task monthly_admin_email: :environment do
  UserMailer.monthly_admin_email.deliver
end
