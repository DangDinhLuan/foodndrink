class HomeController < ApplicationController
  before_action :load_slides, :load_menu
  layout "default"

  def index
    @home = Supports::HomeSupport.new filtering_params
    respond_to do |format|
      format.html {}
      format.js
    end
  end
  
end
