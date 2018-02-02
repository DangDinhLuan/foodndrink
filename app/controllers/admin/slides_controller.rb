class Admin::SlidesController < AdminController
  before_action :load_all_slides, only: [:index, :new, :edit, :create]
  before_action :load_slide, only: [:edit, :update, :destroy]
  
  def new
    @slide = Slide.new
  end

  def edit; end

  def create
    @slide = Slide.new slide_params
    if @slide.save
      flash[:success] = t "admin.slide.create.success"
      redirect_to admin_slides_path
    else
      @messages = @slide.errors
      render :new
    end
  end

  def update
    if @slide.update_attributes slide_params
      flash[:success] = t "admin.slide.update.success"
      redirect_to admin_slides_path
    else
      @messages = @slide.errors
      render :edit
    end
  end

  def destroy
    if @slide.destroy
      flash[:success] = t "admin.slide.delete.success"
    else
      flash[:danger] = t "admin.slide.delete.error"
    end
    redirect_to admin_slides_path
  end

  def update_status
    slides = params[:slides].collect{|id| id.to_i} if params[:slides]
    if slides
      slides.each do |id|
        if slide = Slide.find_by(id: id)
          slide.status = params[:status] ? params[:status][id.to_s].present? : false
          slide.save
        end
      end
    end
    redirect_to admin_slides_path
  end

  def load_slide
    @slide = Slide.find_by id: params[:id]
    if @slide.nil?
      flash[:danger] = t "admin.slide.not_exist"
      redirect_to admin_slides_path
    end
  end

  def load_all_slides
    if params[:term]
      @slides = Slide.search_by_title(params[:term]).order(status: :desc, created_at: :desc)
    else
      @slides = Slide.order(status: :desc, created_at: :desc)
    end
  end

  private
  def slide_params
    params.require(:slide).permit :image, :title, :status
  end
end
