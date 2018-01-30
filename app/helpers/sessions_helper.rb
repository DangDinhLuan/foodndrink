module SessionsHelper
  def login user
    session[:user_id] = user.id
  end

  def remember user
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  def forget user
    user.forget
    cookies.delete :user_id
    cookies.delete :remember_token
  end

  def current_user? user
    user == current_user
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find_by id: session[:user_id]
    elsif cookies.signed[:user_id] && user = User.find_by(id: cookies.signed[:user_id])
      if user.authenticated?(:remember, cookies[:remember_token])
        @current_user = user
        session[:user_id] = cookies.signed[:user_id]
      end
    end
  end

  def log_out
    if loged_in?
      session.delete :user_id
      if cookies.signed[:user_id].present?
        forget user
      end
      @current_user = nil
    end
  end

  def loged_in?
    current_user.present?
  end

  def store_url
    session[:forwarding_url] ||= request.original_url if request.get?
  end

  def redirect_back
    redirect_to(session[:forwarding_url] || root_url)
  end

  def cart_available?
    session[:cart].present?
  end

  def cart_items
    items = Array.new
    session[:cart].keys.each do |id|
      if product = Product.find_by(id: id)
        item = Item.new product_id: product.id, price: product.price,
          quantity: session[:cart][id]["quantity"]
          items.push item
      end
    end
    items
  end

  def cart_total_price
    cart_items.map{|item| item.price * item.quantity}.sum
  end

  def cart_total_items
    session[:cart].length if cart_available?
  end

  def total_price_of item
    item.price * item.quantity
  end

end
