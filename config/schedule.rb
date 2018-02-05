set :environment, "production"

every 5.minutes do
  rake "monthly_admin_email"
end
