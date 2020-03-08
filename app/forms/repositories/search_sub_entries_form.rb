class Repositories::SearchSubEntriesForm < BaseForm
  attr_accessor :filepath, :login, :repo_identifier

  validates :filepath, :login, :repo_identifier, presence: true
end
