class ProductsController < ApplicationController
  def show
    if @product = Product.find_by(id: params[:id])
      @product_support = Supports::ProductsSupport.new params[:id], current_user
      @rating = @product_support.rating
    else
      redirect_to root_path
    end
  end

  def search
    if params["key_word"].present?
      @products = Product.search(params["key_word"])
        .page(params[:page]).per Settings.search.per_page
    else
      redirect_back
    end
  end
end
