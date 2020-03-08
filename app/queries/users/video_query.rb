class Users::VideoQuery < ApplicationQuery
  include CustomSortable

  sort_columns :published_at, :title, default_by: :published_at, default_direction: :desc

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    videos = user.videos

    videos =
      case params[:status]
      when 'published'  then videos.published
      when 'processing' then videos.processing
      else videos.published
      end

    keyword = params[:keyword].to_s.strip
    videos = videos.where('title LIKE ?', "%#{keyword}%") if keyword.present?

    custom_sort(videos, params[:sort_by], params[:sort_direction])
  end
end