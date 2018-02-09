class Supports::AdminSupport
  def order_current_day
    Order.report_order Date.current.beginning_of_day, Date.current.end_of_day
  end

  def product_current_day
    Product.product_report Date.current.beginning_of_day, Date.current.end_of_day    
  end

  def order_current_month
    Order.report_order Date.current.beginning_of_month, Date.current.end_of_day
  end

  def product_current_month
    Product.product_report Date.current.beginning_of_month, Date.current.end_of_day    
  end

  def order_current_3month
    Order.report_order (Date.current - 3.months).beginning_of_day, Date.current.end_of_day
  end

  def product_current_3month
    Product.product_report (Date.current - 3.months).beginning_of_day, Date.current.end_of_day   
  end
end
