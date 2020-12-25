# == Schema Information
#
# Table name: composes
#
#  id                     :integer          not null, primary key
#  user_id                :integer
#  title                  :string(255)
#  description            :text(65535)
#  show_mode              :integer          default("0")
#  compose_mode           :boolean          default("0")
#  compose_users_count    :integer          default("0")
#  compose_projects_count :integer          default("0")
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_composes_on_user_id_and_show_mode_and_compose_mode  (user_id,show_mode,compose_mode)
#

class Compose < ApplicationRecord
  #组织
  belongs_to :user
  has_many :compose_projects
  has_many :compose_users

  validates :title, presence: {message: "组织名称不能为空"}, uniqueness: {message: "组织名称已存在"}

  scope :compose_includes, ->{includes(:compose_projects, :compose_users, :user)}

end

