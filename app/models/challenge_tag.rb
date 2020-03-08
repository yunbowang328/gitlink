class ChallengeTag < ApplicationRecord
  include Searchable::Dependents::ChallengeTag

  belongs_to :challenge, counter_cache: true
  belongs_to :challenge_choose, optional: true
end
