class SessionsController < ApplicationController
  layout "simple"

  def new
    @slides = Slide.all
    redirect_to root_url if loged_in?
  end

  def create
    @user = User.find_by(email: params[:session][:email])
    if @user && @user.authenticate(params[:session][:password])
      login @user
      remember @user if params[:session][:remember] == "1"
      flash[:success] = t "login.success"
      redirect_to root_url
    else
      @messages = [t("login.error")]
      render :new
    end
  end

  def destroy
    log_out
    redirect_to root_path
  end
end
