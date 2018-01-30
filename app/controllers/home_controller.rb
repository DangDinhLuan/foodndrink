class HomeController < ApplicationController
  def index
    @slides = Slide.activated
    @top_new_products = Product.top_news limit: Settings.home.product.limit
    @top_rated_products = Product.top_news limit: Settings.home.product.limit
  end
end
