set :environment, "production"

every 1.month do
  rake "monthly_admin_email"
end
