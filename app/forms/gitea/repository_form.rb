class Gitea::RepositoryForm
  include ActiveModel::Model
  attr_accessor :name, :description, :auto_init, :gitignores,
                :issue_labels, :license, :private, :readme

  validates :name, presence: true
  # validates :name, uniqueness: true

end
