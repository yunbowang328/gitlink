class Admins::SchoolQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :users_count, :created_at, default_by: :created_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    schools = School.all

    keyword = strip_param(:keyword)
    Rails.logger.info("###########{keyword}")
    if keyword
      schools = schools.where('schools.name LIKE ?', "%#{keyword}%")
    end
    schools = schools.left_joins(:user_extensions).select('schools.*, IFNULL(count(user_extensions.user_id),0) users_count').group('schools.id')
    custom_sort schools, params[:sort_by], params[:sort_direction]
  end
end