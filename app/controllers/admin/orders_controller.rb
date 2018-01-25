class Admin::OrdersController < AdminController

  before_action :load_order, only: [:show, :edit, :update]

  def index
    @orders = Order.order(id: :desc).page(params[:page]).per Settings.page.per_page
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
