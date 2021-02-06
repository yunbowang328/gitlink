module PaginateHelper

  def paginate(relation)
    limit = params[:limit] || params[:per_page]
    limit = (limit.to_i.zero? || limit.to_i > 15) ? 15 : limit.to_i
    page  = params[:page].to_i.zero? ? 1 : params[:page].to_i

    if relation.is_a?(Array)
      Kaminari.paginate_array(relation).page(page).per(limit)
    else
      relation.page(page).per(limit)
    end
  end
end