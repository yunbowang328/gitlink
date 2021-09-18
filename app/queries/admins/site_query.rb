class Admins::SiteQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :id, default_by: :id, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    collection = Site.all
    collection = filter_sites(collection)

    custom_sort collection, params[:sort_by], params[:sort_direction]
  end

  def filter_sites(collection)
    collection = by_search(collection)
    collection = by_stie_type(collection)
    collection
  end

  def by_search(collection)
    keyword = strip_param(:search)
    collection.by_search(keyword)
  end

  def by_stie_type(collection)
    site_type = strip_param(:site_type)
    collection.by_site_type(site_type)
  end
  
end