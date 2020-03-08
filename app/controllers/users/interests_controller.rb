class Users::InterestsController < Users::BaseController
  skip_before_action :check_observed_user_exists!
  before_action :require_login

  def create
    return render_forbidden if current_user.user_extension&.identity.present?
    identity = params[:identity].to_s.strip

    extension = current_user.user_extension || current_user.build_user_extension
    return render_error('请选择职业') unless %w(teacher student professional).include?(identity)

    # interest_ids = Array.wrap(params[:interest_ids]).map(&:to_i)
    # return render_error('请选择兴趣') if interest_ids.blank?

    ActiveRecord::Base.transaction do
      extension.update_column(:identity, identity)

      # 兴趣
      # UserInterest.bulk_insert(:user_id, :repertoire_id) do |worker|
      #   (Repertoire.pluck(:id) & interest_ids).each do |repertoire_id|
      #     worker.add(user_id: current_user.id, repertoire_id: repertoire_id)
      #   end
      # end
    end

    render_ok
  end
end