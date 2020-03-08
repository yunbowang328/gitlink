class Compose < ApplicationRecord
  #组织
  belongs_to :user
  has_many :compose_projects
  has_many :compose_users

  validates :title, presence: {message: "组织名称不能为空"}, uniqueness: {message: "组织名称已存在"}

  scope :compose_includes, ->{includes(:compose_projects, :compose_users, :user)}

end

