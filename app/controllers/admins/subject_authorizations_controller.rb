class Admins::SubjectAuthorizationsController < Admins::BaseController
  def index
    params[:status] ||= 'pending'

    applies = ApplyAction.where(container_type: 'ApplySubject')

    status =
      case params[:status]
      when 'pending'   then 0
      when 'processed' then [1, 2]
      when 'agreed'    then 1
      when 'refused'   then 2
      else 0
      end
    applies = applies.where(status: status) if status.present?

    # 关键字模糊查询
    keyword = params[:keyword].to_s.strip
    if keyword.present?
      applies = applies.joins('JOIN subjects ON subjects.id = apply_actions.container_id')
                  .where('subjects.name LIKE :keyword', keyword: "%#{keyword}%")
    end

    applies = applies.order(updated_at: :desc)

    @applies = paginate applies.includes(user: :user_extension)

    subject_ids = @applies.map(&:container_id)
    @subject_map = Subject.where(id: subject_ids).each_with_object({}) { |s, h| h[s.id] = s }
    @challenge_count_map = Challenge.joins(shixun: :stage_shixuns).where(st: 0, stage_shixuns: { subject_id: subject_ids}).group('subject_id').count
  end

  def agree
    Admins::SubjectAuths::AgreeApplyService.call(current_apply, current_user)
    render_success_js
  end

  def refuse
    Admins::SubjectAuths::RefuseApplyService.call(current_apply, current_user, params)

    render_success_js
  end

  private

  def current_apply
    @_current_apply ||= ApplyAction.where(container_type: 'ApplySubject').find(params[:id])
  end
end