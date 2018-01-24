class AccountActivationsController < ApplicationController
  def edit
    if @user = User.find_by(email: params[:email])
      if !@user.activated? && @user.authenticated?(:activation, params[:id])
        @user.activate
        flash[:success] = t "signup.activation.success"
        redirect_to root_path
      elsif 
        redirect_to root_path
      end
    elsif
      redirect_to root_path
    end
  end
end
