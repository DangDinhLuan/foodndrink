class Admin::ProductsController < AdminController
  before_action :load_product, only: [:show, :edit, :update, :destroy]

  def index
    if params[:category_id]
      if params[:term]
        @products = Product.search_by_title(params[:term], "title").filter(params[:category_id]).includes(:category, :items)
        .page(params[:page]).per Settings.page.per_page
      else
        @products = Product.filter(params[:category_id]).includes(:category, :items)
        .page(params[:page]).per Settings.page.per_page
      end
    else
      if params[:term]
        @products = Product.search_by_title(params[:term], "title").order(created_at: :desc).includes(:category, :items)
        .page(params[:page]).per Settings.page.per_page
      else
        @products = Product.order(created_at: :desc).includes(:category, :items)
        .page(params[:page]).per Settings.page.per_page
      end
    end
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new product_params
    if @product.save
      flash[:success] = t "admin.product.create.success"
      redirect_to admin_products_path
    else
      @messages = @product.errors
      render :new
    end
  end

  def import
    if params[:file].nil
      redirect_to admin_products_path, notice: t("admin.product.create.error")
    else
      Product.import params[:file]
      redirect_to admin_products_path, notice: t("admin.product.create.success")
    end
  end

  def edit; end

  def update
    if @product.update_attributes product_params
      flash[:success] = t "admin.product.update.success"
      redirect_to admin_products_path
    else
      @messages = @product.errors
      render :edit
    end
  end

  def show; end

  def destroy
    if @product.destroy
      flash[:success] = t "admin.product.delete.success"
      redirect_to admin_products_path
    else
      flash[:danger] = t "admin.product.delete.error"
    end
  end

  private
  def load_product
    @product = Product.find_by id: params[:id]
    if @product.nil?
      flash[:danger] = t "admin.product.not_exist"
      redirect_to admin_products_path
    end
  end

  private
  def product_params
    params.require(:product).permit(:title, :category_id, :quantity,
      :price, :image, :description)
  end

end
