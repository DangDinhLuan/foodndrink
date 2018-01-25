class PasswordResetsController < ApplicationController
  before_action :load_user, only: [:edit, :update]
  before_action :valid_user, only: [:edit, :update]
  before_action :valid_request, only: [:edit, :update]
  
  layout "simple"

  def new; end

  def create
    if @user = User.find_by(email: params[:password_reset][:email])
      @user.create_password_reset_digest
      UserMailer.password_reset(@user).deliver
      flash[:info] = t "password_resets.send_mail_info"
      redirect_to root_url
    else
      @messages = [t("password_resets.send_mail_error")]
      render :new
    end
  end
  
  def edit; end

  def update
    if params[:user][:password].present?
      if @user.update_attributes user_params
        flash[:success] = t "password_reset.success"
        redirect_to root_url
      else
        @user.errors.messages[:reset].push t("password_resets.error")
        @messages = @user.errors
        render :edit
      end
    else
      @user.errors.messages[:password].push t("password_resets.blank")
      @messages = @user.errors
      render :edit
    end
  end
  
  def load_user
    @user = User.find_by email: params[:email]
  end

  def valid_user
    unless @user && @user.activated? && @user.authenticated?(:password_reset, params[:id])
      redirect_to root_url
    end
  end

  def valid_request
    if @user.password_reset_expired?
      flash[:danger] = t "password_resets.expired"
      redirect_to new_password_reset_url
    end
  end

  def user_params
    params.require(:user).permit :password, :password_confirmation
  end
  
end
