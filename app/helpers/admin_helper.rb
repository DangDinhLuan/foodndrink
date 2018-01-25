module AdminHelper
  def number_index i
    page = params[:page].blank? ? 1 : params[:page].to_i
    (i+1) + (page - 1)*Settings.page.per_page
  end
end
