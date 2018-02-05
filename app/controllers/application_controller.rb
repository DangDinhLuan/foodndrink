class ApplicationController < ActionController::Base
  include SessionsHelper
  protect_from_forgery with: :exception
  before_action :store_url

  def load_slides
    @slides = Slide.activated
  end

  def load_menu
    @menu = Category.recent
  end

  def filtering_params
    result = Hash.new
    price_param_values = {"1" => "< 5", "2" => "5 and 10", "3" => "10 and 20", "4" => "20 and 30", "5" => "> 30"}
    if params["price_level"].present?
      price_query = Array.new
      params["price_level"].keys.each do |key|
        if key == "1" || key == "5"
          price_query.push("price " + price_param_values[key])
        else
          price_query.push("price between " + price_param_values[key])
        end
      end
      result[:price_between] = price_query.join " or "
    end

    if params["rating_level"].present?
      result[:rating_in] = "avg_rate in (" + params["rating_level"].keys.join(", ") + ")"
    end

    result[:order_by_price] = params["order_by_price"] ? params["order_by_price"] : "asc"
    result[:filter_by_category] = params["filter_by_category"] if params["filter_by_category"]
    result
  end


end
