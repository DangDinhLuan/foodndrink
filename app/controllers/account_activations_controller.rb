class AccountActivationsController < ApplicationController
  def edit
    if @user = User.find_by(email: params[:email])
      if !@user.activated? && @user.authenticated?(:activation, params[:id])
        @user.activate
        login @user
        flash[:success] = t "signup.activation.success"
        redirect_to @user
      end
    else
      redirect_to root_path
    end
  end
end
