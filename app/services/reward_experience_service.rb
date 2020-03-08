class RewardExperienceService
  attr_reader :user, :attrs

  def initialize(user, **attrs)
    @user  = user
    @attrs = attrs.slice(*%i[container_id container_type score])
  end

  def call
    return if user.experiences.exists?(attrs.except(:score))

    ActiveRecord::Base.transaction do
      experience = user.experiences.create!(attrs)

      user.increment!(:experience, experience.score)

      experience
    end
  end

  def self.call(user, **attrs)
    new(user, attrs).call
  end
end