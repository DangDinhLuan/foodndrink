class AdminController < ApplicationController
  layout "admin"

  def correct_user
    @user = User.find_by id: params[:id]
    redirect_to(root_url) unless current_user?(@user)
  end

  def verify_admin
    unless current_user.admin?
      flash[:danger] = t "admin.danger"
      redirect_to(root_url)
    end
  end
end
