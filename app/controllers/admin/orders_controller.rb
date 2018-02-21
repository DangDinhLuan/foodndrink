class Admin::OrdersController < AdminController
  before_action :load_order, only: [:show, :edit, :update]

  def index
    @to_date = params[:to_date] ? params[:to_date] : Date.current.end_of_day
    if params[:term]
      @orders = Order.search_by_title(params[:term], "name").order(id: :desc)
      .page(params[:page]).per Settings.page.per_page
    else
      if params[:from_date]
        @orders = Order.time_in_range(params[:from_date], @to_date).order(id: :desc).page(params[:page]).per Settings.page.per_page
      else
        @orders = Order.order(id: :desc).page(params[:page]).per Settings.page.per_page
      end
    end
    respond_to do |format|
      format.html
      format.js
      format.xlsx
    end
  end

  def show
    @items = Item.includes(:product).item params[:id]
    if @items.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_to admin_orders_url
    end
  end

  def edit; end

  def update
    if @order.update_attributes order_params
      flash[:success] = t "admin.order.edit.success"
      redirect_to admin_orders_url
    else
      @messages = @category.errors
      render :edit
    end
  end

  private
  def order_params
    params.require(:order).permit :status
  end

  def load_order
    @order = Order.find_by id: params[:id]
    if @order.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_to admin_orders_url
    end
  end
end
