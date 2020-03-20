class Contents::DeleteForm < BaseForm
  attr_accessor :filepath, :branch, :new_branch, :sha

  validates :filepath, :sha, presence: true

end
