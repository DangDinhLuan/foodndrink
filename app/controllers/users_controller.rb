class UsersController < ApplicationController
  layout "simple", only: [:new]
  
  def index;end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      UserMailer.account_activation(@user).deliver
      flash[:success] = t "signup.success"
      redirect_to root_url
    else
      @messages = @user.errors
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit :name, :email, :password, :password_confirmation
  end
end
