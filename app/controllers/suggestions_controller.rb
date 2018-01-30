class SuggestionsController < ApplicationController
  before_action :verify_user, only: [:new, :create, :edit, :update, :show, :destroy]
  before_action :load_suggestion, only: [:edit, :update, :show, :destroy]

  def index
    if loged_in?
      @slides = Slide.all
      @suggestions = Suggestion.includes(:category).suggestion_user(current_user.id)
      .page(params[:page]).per Settings.page.per_page
    else
      redirect_to login_path
    end
  end

  def new
    @slides = Slide.all
    @suggestion = Suggestion.new
  end
  
  def create
    @slides = Slide.all
    @suggestion = Suggestion.new suggestion_params
    if @suggestion.save
      flash[:success] = t "user_profile.suggestions.new.success"
      redirect_to suggestions_path
    else
      @messages = @suggestion.errors
      render :new
    end
  end
  
  def edit
    @slides = Slide.all
  end
  
  def update
    if @suggestion.update_attributes suggestion_params
      flash[:success] = t "user_profile.suggestions.edit.success"
      redirect_to suggestions_path
    else
      @messages = @suggestion.errors
      render :edit
    end
  end
  
  def destroy
    if @suggestion.destroy
      flash[:success] = t "user_profile.suggestions.delete.success"
    else
      @messages = @suggestion.errors
    end
    redirect_to suggestions_path
  end
  

  private
  def suggestion_params
    params.require(:suggestion).permit(:title, :category_id, :price,
      :user_id, :image, :description, :note)
  end

  def load_suggestion
    @suggestion = Suggestion.find_by id: params[:id]
    if @suggestion.nil?
      flash[:danger] = t "admin.suggestion.not_exist"
      redirect_to suggestions_path
    end
  end
end
