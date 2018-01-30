class RatingsController < ApplicationController
  before_action :require_loged_in

  def create
    @rating = Rating.new rating_params
    @rating.user_id = current_user.id
    if @rating.save
      @product = @rating.product
      @product.update_ratings
      respond_to do |format|
        format.html {redirect_to @rating.product}
        format.js
      end
    end
  end

  def update
    if @rating = Rating.current(current_user.id, params[:rating][:product_id]).first
      @rating.point = params[:rating][:point]
      @rating.save
      @product = @rating.product
      @product.update_ratings
      respond_to do |format|
        format.html {redirect_back}
        format.js
      end
    end
  end

  def require_loged_in
    unless loged_in?
      respond_to do |format|
        format.js {render :js => "window.location.href='#{login_path}'"}
      end
    end
  end

  private
  def rating_params
    params.require(:rating).permit :product_id, :point
  end

end
