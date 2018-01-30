class CategoriesController < ApplicationController
  layout "default"
  before_action :load_slides, :load_menu, :load_category

  def show
    respond_to do |format|
      format.html {}
      format.js
    end
  end

  private
  def load_category
    if Category.exists? params[:id]
      @category = Supports::CategoriesSupport.new params[:id], params[:page], filtering_params
    else
      redirect_to root_path
    end
  end
end
