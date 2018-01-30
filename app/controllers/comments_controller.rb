class CommentsController < ApplicationController
  def create
    if loged_in? && Product.exists?(params[:comment][:product_id])
      @comment = current_user.comments.build
      @comment.product_id = params[:comment][:product_id]
      @comment.content = params[:comment][:content]
      if @comment.save
        respond_to do |format|
          format.html {redirect_to @product}
          format.js
        end
      else
        @comment = nil
      end
    else
      redirect_path = !loged_in? ? login_path : root_path
      respond_to do |format|
        format.js {render :js => "window.location.href='#{redirect_path}'"}
      end
    end
  end

  def destroy
    if (@comment = Comment.find_by id: params[:id]) && loged_in?
      if current_user?(@comment.user) &&  @comment.destroy
        respond_to do |format|
          format.html {redirect_to @comment.product}
          format.js
        end
      end
    else
      respond_to do |format|
        format.js {render :js => "window.location.href='#{products_path(@comment.product)}'"}
      end
    end
  end

end
