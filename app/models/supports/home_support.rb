class Supports::HomeSupport

  def initialize filtering_params
    @filtering_params = filtering_params
  end

  def recent_products
    Product.filter_by_params(@filtering_params).recent.limit Settings.home.product.recent.limit
  end

  def rated_products
    Product.filter_by_params(@filtering_params).top_rated.limit Settings.home.product.top_rated.limit
  end
end
