class Supports::CategoriesSupport
  def initialize id, page
    @category = Category.find_by id: id
    @page = page
  end

  def recent
    Category.recent
  end

  def products
    @category.products.recent.page(@page)
      .per Settings.categories.product.page.per_page
  end
end
