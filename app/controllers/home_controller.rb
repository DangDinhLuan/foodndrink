class HomeController < ApplicationController
  layout "default"

  def index
    @home = Supports::HomeSupport.new
  end
  
end
