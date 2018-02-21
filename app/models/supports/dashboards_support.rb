class Supports::DashboardsSupport
  def initialize from_date, to_date
    @from_date = from_date
    @to_date = to_date
  end

  def total_users
    User.count :id
  end

  def total_products
    Product.count :id
  end

  def total_quantities
    Item.time_in_range(@from_date, @to_date).total_quantities
  end

  def total_price
    Order.time_in_range(@from_date, @to_date).total_price
  end

  def order_each_day
    Order.time_in_range(@from_date, @to_date).group_by_day
  end

  def product_in_each_category
    Product.in_each_category
  end

  def product_in_each_category_type
    Product.in_each_category_type
  end

  def product_with_total_quantity
    Product.select("SUM(items.quantity)")
      .joins(:items)
      .group("products.price")
      .pluck("products.price", "sum(items.quantity)")
  end

  def total_quantity_sold_of_each_category
    Category.joins(products: :items)
      .where("items.created_at between ? and ?", @from_date, @to_date)
      .group("categories.title")
      .sum("items.quantity")
  end

  def total_price_sold_of_each_category
    Category.joins(products: :items)
      .where("items.created_at between ? and ?", @from_date, @to_date)
      .group("categories.title")
      .sum("items.price * items.quantity")
  end

  def top_product_of_month
    Product.select("SUM(items.quantity)")
      .joins(:items)
      .group("products.title")
      .where("items.created_at between ? and ?", @from_date, @to_date)
      .order("sum(items.quantity) desc")
      .limit(Settings.dashboard.top_product_limit)
      .pluck("products.title", "sum(items.quantity)")
  end
end
