class Admins::ApplyUserAuthenticationQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :updated_at, default_by: :updated_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    applies = ApplyUserAuthentication.where(auth_type: params[:type].presence || 1)

    status =
      case params[:status]
      when 'pending'   then 0
      when 'processed' then [1, 2]
      when 'agreed'    then 1
      when 'refused'   then 2
      else 0
      end
    applies = applies.where(status: status) if status.present?

    # 关键字模糊查询
    keyword = params[:keyword].to_s.strip
    if keyword.present?
      applies = applies.joins(user: { user_extension: :school })
                  .where('CONCAT(lastname,firstname) LIKE :keyword OR schools.name LIKE :keyword', keyword: "%#{keyword}%")
    end

    custom_sort(applies, params[:sort_by], params[:sort_direction])
  end
end