class OrdersController < ApplicationController
  before_action :load_order, only: :show

  def index
    @slides = Slide.all
    @orders_user = Order.order_user_id(current_user.id).page(params[:page]).per Settings.page.per_page
  end

  def show
    @slides = Slide.all
    @items = Item.includes(:product).item params[:id]
    if @items.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_to admin_orders_url
    end
  end

  private
  def load_order
    @order = Order.find_by id: params[:id]
    if @order.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_to admin_orders_url
    end
  end
end
