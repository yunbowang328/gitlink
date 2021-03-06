class Contents::CreateForm < BaseForm
  attr_accessor :filepath, :branch, :new_branch

  validates :filepath, presence: true

  validate :check_branch

  def check_branch
    raise "branch和new_branch必须存在一个 " if branch.blank? && new_branch.blank?
    # raise "branch和new_branch只能存在一个" if !branch.blank? && !new_branch.blank?
  end

end
