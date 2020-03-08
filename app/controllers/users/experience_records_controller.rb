class Users::ExperienceRecordsController < Users::BaseController
  before_action :private_user_resources!

  def show
    experiences = observed_user.experiences.where('score > 0')

    @count = experiences.count
    @experience_records = paginate(experiences.order(created_at: :desc))
  end
end