class ProductsController < ApplicationController
  def show
    if @product = Product.find_by(id: params[:id])
      @comments = Comment.recent(@product.id).includes(:user)
      @relateds = Product.related(@product).limit Settings.product.related.limit
    else
      redirect_to root_path
    end
  end
end
