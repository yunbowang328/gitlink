class Weapps::SubjectsController < Weapps::BaseController
  before_action :require_login, except: [:index, :show]
  before_action :find_subject, except: [:index]

  # 首页
  def index
    subjects = Weapps::SubjectQuery.call(current_laboratory, params)
    @subject_count = subjects.map(&:id).size
    @subjects = paginate subjects
  end

  # 详情
  def show
    # 合作团队
    Rails.logger.info("##########subject: #{@subject.id}")
    @members = @subject.subject_members.includes(:user)
    shixuns = @subject.shixuns.published.pluck(:id)
    challenge_ids = Challenge.where(shixun_id: shixuns).pluck(:id)
    # 实训路径中的所有实训标签
    @tags = ChallengeTag.where(challenge_id: challenge_ids).pluck(:name).uniq
  end

  private
  def find_subject
    @subject = Subject.find(params[:id])
  end

end
