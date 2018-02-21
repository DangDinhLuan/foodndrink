class OrdersController < ApplicationController
  before_action :load_order, only: :show
  before_action :verify_user, only: :show

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
<<<<<<< HEAD
      checkout_cart @order
=======
      save_cart @order
      UserMailer.custommer_order(@order).deliver
      destroy_cart
>>>>>>> edcd4c2... Send mail to custommer
      flash[:info] = t "order.success"
      redirect_to root_path
    else
      @messages = @order.errors
      render :new
    end
  end

  private
  def checkout_cart order
    save_cart_items order
    UserMailer.custommer_order(order).deliver
    send_chatwork_message if loged_in?
    destroy_cart
  end
  
  private
<<<<<<< HEAD
  def load_order
    @order = Order.find_by id: params[:id]
    if @order.nil?
      flash[:danger] = t "admin.order.danger"
      redirect_back
=======
  def send_chatwork_message
    room_id = ENV["CHATWORK_ROOM_ID"]
    admin_id = ENV["CHATWORK_ADMIN_ID"]
    member_ids = ChatWork::Member.get(room_id: room_id)
      .collect{|member| member.account_id} - [admin_id.to_i]
    if member_ids.exclude? current_user.chatwork_id
      member_ids.push current_user.chatwork_id
      ChatWork::Member.update_all room_id: room_id,
        members_admin_ids: admin_id, members_member_ids: member_ids
    end
    chatwork_user = ChatWork::Member.get(room_id: room_id)
      .find{|member| member.account_id.to_s == current_user.chatwork_id}
    return unless chatwork_user
    body = "[TO:#{chatwork_user.account_id}] #{chatwork_user.name}\n#{t('chatwork.message.body')}"
    begin
      ChatWork::Message.create room_id: room_id, body: body
    rescue
      return
>>>>>>> 59e9162bf674120c64041e0bddbebf28f48f56c4
    end
  end
  
<<<<<<< 7f292043bdf931c85e02c19fcea7d88effab9f59
=======
  def send_chatwork_message
    room_id = ENV["CHATWORK_ROOM_ID"]
    admin_id = ENV["CHATWORK_ADMIN_ID"]
    member_ids = ChatWork::Member.get(room_id: room_id)
      .collect{|member| member.account_id} - [admin_id.to_i]
    if member_ids.exclude? current_user.chatwork_id
      member_ids.push current_user.chatwork_id
      ChatWork::Member.update_all room_id: room_id,
        members_admin_ids: admin_id, members_member_ids: member_ids
    end
    chatwork_user = ChatWork::Member.get(room_id: room_id)
      .find{|member| member.account_id.to_s == current_user.chatwork_id}
    return unless chatwork_user
    body = "[TO:#{chatwork_user.account_id}] #{chatwork_user.name}\n#{t('chatwork.message.body')}"
    begin
      ChatWork::Message.create room_id: room_id, body: body
    rescue
      return
    end
  end
  
>>>>>>> Admin filter order
  private
  def save_cart_items order
    if cart_available?
      cart_items.each do |item|
        item.order_id = order.id
        item.save
      end
    end
  end

  private
  def load_order
    return if @order = Order.find_by(id: params[:id])
    flash[:danger] = t "admin.order.danger"
    redirect_back
  end

  private
  def order_params
    params.require(:order).permit :name, :address, :phone, :email, :note
  end
end
