set :environment, "production"

every 10.minutes do
  rake "monthly_admin_email"
end
