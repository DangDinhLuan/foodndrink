class OrdersController < ApplicationController
  before_action :load_order, only: :show

  def index
    @orders_user = Order.order_user_id(current_user.id).page(params[:page]).per Settings.page.per_page
  end

  def show
    @items = Item.includes(:product).item params[:id]
    if @items.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_to admin_orders_url
    end
  end
  
  def new
    @order = Order.new
  end

  def create
    @order = Order.new order_params
    @order.total = cart_total_price
    @order.user_id = current_user.id if loged_in?
    if @order.save
      save_cart @order
      destroy_cart
      flash[:info] = t "order.success"
      redirect_to root_path
    else
      @messages = @order.errors
      render :new
    end
  end

  def verify_cart
    unless cart_available?
      flash[:warning] = t "app.cart.empty_title"
      redirect_back
    end
  end

  private
  def load_order
    @order = Order.find_by id: params[:id]
    if @order.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_back
    end
  end
  
  def save_cart order
    if cart_available?
      cart_items.each do |item|
        item.order_id = order.id
        item.save
      end
    end
  end

  private
  def order_params
    params.require(:order).permit :name, :address, :phone, :email, :note
  end
end
