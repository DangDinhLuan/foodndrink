class Admin::CommentsController < AdminController
  before_action :load_comment, only: :destroy
  before_action :verify_admin, only: [:index, :show, :destroy]

  def index
    @comments = Comment.order(created_at: :desc).includes([:product, :user])
      .page(params[:page]).per Settings.page.per_page
  end

  def show
    @comments = Comment.includes([:product, :user]).comment_product(params[:id])
      .page(params[:page]).per Settings.page.per_page
  end

  def destroy
    if @comment.destroy
      flash[:success] = t "admin.comment.delete.success"
    else
      @messages = @comment.errors
    end
    redirect_to admin_comments_url
  end

  private
  def load_comment
    @comment = Comment.find_by id: params[:id]
    if @comment.nil?
      flash[:danger] = t "admin.comment.danger"
      redirect_to admin_comments_url
    end
  end
end
