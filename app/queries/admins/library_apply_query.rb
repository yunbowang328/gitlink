class Admins::LibraryApplyQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :updated_at, default_by: :updated_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    status =
        case params[:status]
        when 'processed' then %w(agreed refused)
        else params[:status]
        end
    applies = LibraryApply.where(status: status) if status.present?

    # 关键字模糊查询
    keyword = params[:keyword].to_s.strip
    if keyword.present?
      applies = applies.joins(:library)
                    .where('title LIKE :keyword OR uuid LIKE :keyword', keyword: "%#{keyword}%")
    end

    custom_sort(applies, params[:sort_by], params[:sort_direction])
  end
end