class Contents::DeleteForm < BaseForm
  attr_accessor :login, :repo_identifier, :filepath, :branch, :new_branch, :sha

  validates :login, :repo_identifier, :filepath, :sha, presence: true

end
