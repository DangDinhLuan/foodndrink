class Admin::UsersController < AdminController
  before_action :load_user, only: [:show, :destroy]
  before_action :verify_admin, only: [:index, :show, :destroy]

  def index
    if params[:term]
      @users = User.search_by_title(params[:term]).order(created_at: :desc).page(params[:page]).per Settings.page.per_page
    else
      @users = User.order(created_at: :desc).page(params[:page]).per Settings.page.per_page
    end
  end

  def show
    @orders_user = Order.order_user_id(params[:id]).page(params[:page]).per Settings.page.per_page
  end

  def destroy
    if @user.destroy
      flash[:success] = t "admin.user.success"
    else
      @messages = @user.errors
    end
    redirect_to admin_users_url
  end

  private
  def load_user
    return if @user = User.find_by(id: params[:id])
    flash[:danger] = t "admin.user.danger"
    redirect_to admin_users_url
  end
end
