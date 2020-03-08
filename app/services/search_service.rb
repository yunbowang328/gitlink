class SearchService < ApplicationService
  include ElasticsearchAble

  attr_reader :params

  def initialize(params)
    @params = params
  end

  def call
    # return [] if keyword.blank?

    modal_name.search(keyword, search_options)
  end

  private

  def modal_name
    @_modal_name ||=
      case params[:type].to_s.strip
      when 'shixun'  then Shixun
      when 'course'  then Course
      when 'subject' then Subject
      when 'memo'    then Memo
      else Shixun
      end
  end

  def search_options
    model_options = {
      includes: modal_name.searchable_includes
    }
    model_options.deep_merge!(extra_options)

    model_options.deep_merge!(default_options)
    model_options
  end

  def extra_options
    case params[:type].to_s.strip
    when 'shixun' then
      { where: { id: Laboratory.current.shixuns.where(public: 2, status: 2, fork_from: nil).or(Laboratory.current.shixuns.where(status: 2, id: User.current.shixuns)).pluck(:id) } }
    when 'subject' then
      { where: { id: Laboratory.current.subjects.where(public: 2, status: 2)
                         .or( Laboratory.current.subjects.where(status: 2, id: User.current.subjects)).pluck(:id) } }
    when 'course' then
      { where: { id: Laboratory.current.all_courses.pluck(:id) } }
    else
      {}
    end
  end
end