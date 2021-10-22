class Admins::EduSettingQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :id, default_by: :id, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    collection = EduSetting.all
    collection = filter_settings(collection)

    custom_sort collection, params[:sort_by], params[:sort_direction]
  end

  def filter_settings(collection)
    by_search(collection)
  end

  def by_search(collection)
    keyword = strip_param(:search)
    collection.by_search(keyword)
  end

end