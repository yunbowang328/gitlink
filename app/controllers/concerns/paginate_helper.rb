module PaginateHelper
  def paginate(objs, **opts)
    page     = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    per_page = params[:per_page].to_i > 0 && params[:per_page].to_i < 50 ? params[:per_page].to_i : opts[:per_page] || 20

    if objs.is_a?(Array)
      Kaminari.paginate_array(objs).page(page).per(per_page)
    else
      objs.page(page).per(per_page)
    end
  end
end