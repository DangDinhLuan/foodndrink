class CategoriesController < ApplicationController
  layout "default"
  before_action :load_category

  def show
    @home = Supports::HomeSupport.new
  end

  private
  def load_category
    if Category.exists? params[:id]
      @category = Supports::CategoriesSupport.new(params[:id], params[:page])
    else
      redirect_to root_path
    end
  end
end
