class Supports::HomeSupport
  def slides
    Slide.activated
  end

  def categories
    Category.recent
  end

  def recent_products
    Product.recent.limit Settings.home.product.recent.limit
  end

  def rated_products
    Product.top_rated.limit Settings.home.product.top_rated.limit
  end
end
