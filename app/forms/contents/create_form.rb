class Contents::CreateForm < BaseForm
  attr_accessor :filepath, :branch, :new_branch, :content

  validates :filepath, presence: true

  validate :check_branch

  # validate :dun_content_check  敏感词过滤

  def check_branch
    raise "branch和new_branch必须存在一个 " if branch.blank? && new_branch.blank?
    # raise "branch和new_branch只能存在一个" if !branch.blank? && !new_branch.blank?
  end

  def dun_content_check
    if content.present? 
      check_result = DunCheck::TextCheck.new({title: "", content: content}).call
      if check_result[:status].to_i == -1
        raise "内容含有：#{check_result[:extra_params][:infos]}，请修改"
      end
    end
  end

end
