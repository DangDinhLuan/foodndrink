class Admin::DashboardsController < AdminController
  def index
    @from_date = params[:from_date] ? params[:from_date] : Date.today.beginning_of_month
    @to_date = params[:to_date] ? params[:to_date] : Date.today
    @dashboards = Supports::DashboardsSupport.new(@from_date, @to_date)
    respond_to do |format|
      format.html
      format.js
    end
  end
end
