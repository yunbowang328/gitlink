module Searchable::Subject
  extend ActiveSupport::Concern

  included do
    searchkick language: 'chinese', callbacks: :async

    scope :search_import, -> { includes(:users, :stages, user: { user_extension: :school }) }
  end

  def searchable_title
    name
  end

  def should_index?
    !hidden? && status == 2 # published
  end

  def search_data
    {
      name: name,
      status: status,
      hidden: hidden,
      description: Util.extract_content(description)[0..Searchable::MAXIMUM_LENGTH],
      shixuns_count: shixuns_count,
      myshixuns_count: member_count,
    }.merge!(searchable_user_data)
      .merge!(searchable_stages_data)
  end

  def searchable_user_data
    {
      author_name: user.real_name,
      author_school_name: user.school_name,
      member_user_names: users.map(&:real_name).join(' ')
    }
  end

  def searchable_stages_data
    subject_stages = stages.map { |stage| "#{stage.name} #{Util.extract_content(stage.description)}"[0..Searchable::MAXIMUM_LENGTH] }

    { subject_stages: subject_stages.join('<br/>') }
  end

  def to_searchable_json
    {
      id: id,
      author_name: user.real_name,
      author_school_name: user.school_name,
      visits_count: visits,
      stage_count: stages_count,
      stage_shixuns_count: stage_shixuns_count,
      shixuns_count: shixuns_count,
      myshixuns_count: member_count
    }
  end

  module ClassMethods
    def searchable_includes
      { user: { user_extension: :school } }
    end
  end
end
