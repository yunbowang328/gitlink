module DunCheckAble
  extend ActiveSupport::Concern

  included do
    # validate :check_text_able # 敏感词过滤
  end

  def check_text_able
    dun_check_params = get_model    
    if dun_check_params[:is_change]
      dun_check_params.delete(:is_change)
      check_result = DunCheck::TextCheck.new(dun_check_params).call
      if check_result[:status].to_i == -1
        errors.add(:base, "内容含有：#{check_result[:extra_params][:infos]}，请修改")
        # raise ActiveRecord::RecordInvalid.new(self)
      end
    end
  end

  def get_model
    dun_model = self.class.name
    case dun_model
    when "Issue"
      check_params = {
        title: self.subject,
        content: self.description,
        is_change: (self.subject_changed? || self.description_changed?) && self.subject.present? &&  self.description.present?
      }
    when "PullRequest"
      check_params = {
        title: "",
        content: self.body,
        is_change: self.body_changed? && self.body.present?
      }
    when "Journal"
      check_params = {
        title: "",
        content: self.notes,
        is_change: self.notes_changed? && self.notes.present?
      }
    when "Version"
      check_params = {
        title: self.name,
        content: self.description,
        is_change: (self.name_changed? || self.description_changed?) &&  self.name.present? &&  self.description.present?
      }
    end
    return check_params
  end
end
