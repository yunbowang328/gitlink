class Weapps::SearchQuery < ApplicationQuery
  include ElasticsearchAble

  attr_reader :params

  def initialize(params)
    @params = params
  end

  def call
    modal_name.search(keyword, search_options)
  end

  private

  def search_options
    hash = {
      fields: [:name],
      page: page,
      per_page: per_page
    }
    hash.merge(where: { status: 2 }) if modal_name == Shixun

    hash
  end

  def modal_name
    @_modal_name ||= begin
      case params[:type].to_s
      when 'subject' then Subject
      when 'shixun'  then Shixun
      when 'course'  then Course
      else Subject
      end
    end
  end
end