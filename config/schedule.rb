set :environment, "development"

every 5.minutes do
  rake "monthly_admin_email"
end