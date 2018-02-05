class Supports::CategoriesSupport
  def initialize category_id, page, filtering_params
    @page = page
    @filtering_params = filtering_params
    @category_id = category_id
  end

  def products
    Product.filter(@category_id).filter_by_params(@filtering_params).recent.page(@page)
      .per Settings.categories.product.page.per_page
  end
end
