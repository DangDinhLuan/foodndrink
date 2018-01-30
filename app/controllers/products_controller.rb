class ProductsController < ApplicationController
  def show
    if @product = Product.find_by(id: params[:id])
      @product_support = Supports::ProductsSupport.new params[:id], current_user
      @rating = @product_support.rating
    else
      redirect_to root_path
    end
  end
end
