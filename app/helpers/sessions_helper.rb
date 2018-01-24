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
  
end
