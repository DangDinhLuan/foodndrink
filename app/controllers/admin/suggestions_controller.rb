class Admin::SuggestionsController < AdminController
  before_action :load_suggestion, only: [:show, :examine, :destroy]

  def index
    if params[:term]
      @suggestions = Suggestion.search_by_title(params[:term]).order(created_at: :desc).includes(:user, :category)
      .page(params[:page]).per Settings.page.per_page
    else
      @suggestions = Suggestion.order(created_at: :desc).includes(:user, :category)
        .page(params[:page]).per Settings.page.per_page
    end
  end

  def examine
    @product = Product.new
    @product.title = @suggestion.title
    @product.category_id = @suggestion.category_id
    @product.price = @suggestion.price
    @product.description = @suggestion.description
  end

  def accept
    if @suggestion = Suggestion.find_by(id: params[:suggestion_id])
      @product = Product.new product_params
      @product.image = @suggestion.image if product_params[:image].blank?
      if @product.save
        @suggestion.accept
        flash[:success] = t "admin.suggestion.accept.success"
        redirect_to [:admin, @product]
      else
        @messages = @product.errors
        render :examine
      end
    else
      flash[:danger] = t "admin.suggestion.not_exist"
    end
  end


  def show; end

  def destroy
    if @suggestion.destroy
      flash[:success] = t "admin.suggestion.delete.success"
      redirect_to admin_suggestions_path
    else
      flash[:danger] = t "admin.suggestion.delete.error"
    end
  end

  private
  def load_suggestion
    @suggestion = Suggestion.find_by id: params[:id]
    if @suggestion.nil?
      flash[:danger] = t "admin.suggestion.not_exist"
      redirect_to admin_suggestions_path
    end
  end

  private
  def product_params
    params.require(:product).permit(:title, :category_id, :quantity,
      :price, :image, :description)
  end
end
