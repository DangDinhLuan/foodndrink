class UsersController < ApplicationController
  layout "simple", only: [:new]
  before_action :verify_user, only: [:edit, :update, :show]
  before_action :load_user, only: [:edit, :update, :show, :change_password]
  
  def index; end

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

  def show
    @slides = Slide.all
  end
  
  def edit; end
  
  def update
    if @user.update_attributes current_user_params
      flash[:success] = t "user_profile.update.success"
      redirect_to user_profiles_path
    else
      flash[:danger] = t "user_profile.update.success"
      redirect_back
    end
  end
  
  def change_password
    user = User.find_by_email(current_user.email).try(:authenticate, params[:current_password])
    if user && @user.update_attributes(change_password_params)
      flash[:success] = t "user_profile.update.password"
      redirect_to user_profiles_path
    else
      @messages = @user.errors
      redirect_back
    end
  end

  private
  def user_params
    params.require(:user).permit :name, :email, :password, :password_confirmation
  end

  def current_user_params
    params.require(:user).permit :name, :email, :phone, :address, :avatar
  end

  def change_password_params
    params.require(:user).permit :password, :password_confirmation
  end

  def load_user
    @user = current_user
  end
end
