# == Schema Information
#
# Table name: users
#
#  id                         :integer          not null, primary key
#  login                      :string(255)      default(""), not null
#  hashed_password            :string(40)       default(""), not null
#  firstname                  :string(30)       default(""), not null
#  lastname                   :string(255)      default(""), not null
#  mail                       :string(60)
#  admin                      :boolean          default("0"), not null
#  status                     :integer          default("1"), not null
#  last_login_on              :datetime
#  language                   :string(5)        default("")
#  auth_source_id             :integer
#  created_on                 :datetime
#  updated_on                 :datetime
#  type                       :string(255)
#  identity_url               :string(255)
#  mail_notification          :string(255)      default(""), not null
#  salt                       :string(64)
#  gid                        :integer
#  visits                     :integer          default("0")
#  excellent_teacher          :integer          default("0")
#  excellent_student          :integer          default("0")
#  phone                      :string(255)
#  authentication             :boolean          default("0")
#  grade                      :integer          default("0")
#  experience                 :integer          default("0")
#  nickname                   :string(255)
#  show_realname              :boolean          default("1")
#  professional_certification :boolean          default("0")
#  ID_number                  :string(255)
#  certification              :integer          default("0")
#  homepage_teacher           :boolean          default("0")
#  homepage_engineer          :boolean          default("0")
#  is_test                    :integer          default("0")
#  ecoder_user_id             :integer          default("0")
#  business                   :boolean          default("0")
#  profile_completed          :boolean          default("0")
#  laboratory_id              :integer
#  platform                   :string(255)      default("0")
#  gitea_token                :string(255)
#  gitea_uid                  :integer
#  is_shixun_marker           :boolean          default("0")
#  is_sync_pwd                :boolean          default("1")
#  watchers_count             :integer          default("0")
#  devops_step                :integer          default("0")
#
# Indexes
#
#  index_users_on_ecoder_user_id     (ecoder_user_id)
#  index_users_on_homepage_engineer  (homepage_engineer)
#  index_users_on_homepage_teacher   (homepage_teacher)
#  index_users_on_laboratory_id      (laboratory_id)
#  index_users_on_login              (login)
#  index_users_on_mail               (mail)
#  index_users_on_type               (type)
#

class Owner < ApplicationRecord
  self.abstract_class = true
  self.table_name = "users"

  include ProjectAbility

  has_many :projects, foreign_key: :user_id, dependent: :destroy
  has_many :repositories, foreign_key: :user_id, dependent: :destroy
  has_many :applied_transfer_projects, dependent: :destroy

end
