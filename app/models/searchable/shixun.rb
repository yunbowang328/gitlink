module Searchable::Shixun
  extend ActiveSupport::Concern

  included do
    searchkick language: 'chinese', callbacks: :async

    scope :search_import, -> { includes(:shixun_info, :challenges, :challenge_tags, :users, user: { user_extension: :school }) }
  end

  def searchable_title
    name
  end

  def search_data
    {
      name: name,
      description: Util.extract_content(description)[0..Searchable::MAXIMUM_LENGTH],
      status: status,
      myshixuns_count: myshixuns_count,
      created_at: created_at,
      publish_time: publish_time,
      is_wechat_support: is_wechat_support
    }.merge!(searchable_user_data)
      .merge!(searchable_challenge_data)
  end

  def searchable_user_data
    {
      author_name: user&.real_name,
      author_school_name: user&.school_name,
    }
  end

  def searchable_challenge_data
    challenge_names = Util.map_or_pluck(challenges, :subject)
                        .each_with_index.map { |subject, index| "第#{index + 1}关 #{subject}" }

    {
      challenge_names: challenge_names.join(' '),
      challenge_tag_names: Util.map_or_pluck(challenge_tags, :name).uniq.join(' ')
    }
  end

  def should_index?
    !hidden? && [0, 1, 2].include?(status) # published
  end

  def to_searchable_json
    {
      id: id,
      identifier: identifier,
      author_name: user.real_name,
      author_school_name: user.school_name,
      visits_count: visits,
      challenges_count: challenges_count,
      study_count: myshixuns_count,
      star: averge_star,
      level: shixun_level,
      is_jupyter: is_jupyter
    }
  end

  module ClassMethods
    def searchable_includes
      [ :shixun_info, user: { user_extension: :school } ]
    end
  end
end
