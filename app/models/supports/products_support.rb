class Supports::ProductsSupport
  def initialize id, user
    @product = Product.find_by id: id
    @user = user
  end

  def instance
    @product
  end

  def rating
    return if @user.nil?
    Rating.find_by user_id: @user.id, product_id: @product.id
  end

  def comments
    Comment.recent(@product.id).includes(:user)
  end

  def relateds
    Product.related(@product).limit Settings.product.related.limit
  end

end
