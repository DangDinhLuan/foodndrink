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
      respond_to do |format|
        format.html {redirect_to home_path}
        format.js
      end
    end
  end

  def update
    if params[:product].present?
      params[:product].each do |id, quantity|
        if session[:cart].include? id
          session[:cart][id]["quantity"] = quantity.to_i > 0 ? quantity : 1
        end
        respond_to do |format|
          format.html {redirect_to root_path}
          format.js
        end
      end
    end
  end

  def destroy
    if session[:cart][params[:id]].present?
      session[:cart].delete params[:id]
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js
      end
    end
  end
end
