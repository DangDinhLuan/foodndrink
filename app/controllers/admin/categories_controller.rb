class Admin::CategoriesController < AdminController
  before_action :load_category, only: [:edit, :update, :destroy]

  def index
    if params[:term]
      @categories = Category.search_by_title(params[:term]).order(created_at: :desc).includes(:products)
      .page(params[:page]).per Settings.page.per_page
    else
      @categories = Category.order(created_at: :desc).includes(:products)
      .page(params[:page]).per Settings.page.per_page
    end
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new category_params
    if @category.save
      flash[:success] = t "admin.categories.addsuccess"
      redirect_to action: :index
    else
      @messages = @category.errors
      render :new
    end
  end

  def edit; end

  def update
    if @category.update_attributes category_params
      flash[:success] = t "admin.categories.editsuccess"
      redirect_to admin_categories_path
    else
      @messages = @category.errors
      render :edit
    end
  end

  def destroy
    if @category.destroy
      flash[:success] = t "admin.categories.deletesuccess"
      redirect_to admin_categories_url
    else
      @messages = @category.errors
      redirect_to admin_categories_url
    end
  end

  private
  def category_params
    params.require(:category).permit :title, :category_type
  end

  def load_category
    @category = Category.find_by id: params[:id]
    if @category.nil?
      flash[:danger] = t "admin.categories.danger"
      redirect_to admin_categories_path
    end
  end
end
