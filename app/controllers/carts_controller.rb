class CartsController < ApplicationController

  def create
    session[:cart] ||= Hash.new
    id = params[:product_id]
    if @product = Product.find_by(id: id)
      if session[:cart][id].present?
        session[:cart][id]["quantity"] += 1
      else
        session[:cart][id] = Hash.new
        session[:cart][id] = {"quantity" => 1}
      end
      @item = Item.new product_id: @product.id, price: @product.price,
          quantity: session[:cart][id]["quantity"]
      respond_to do |format|
        format.html {redirect_to home_path}
        format.js
      end
    end
  end

  def update; end

  def destroy; end
  
end
