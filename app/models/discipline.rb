class Discipline < ApplicationRecord
  default_scope { order(position: :asc) }

  has_many :sub_disciplines, -> { order("sub_disciplines.position ASC") }, dependent: :destroy

  has_many :shixun_sub_disciplines, -> { where("shixun = 1") }, class_name: "SubDiscipline"
  has_many :subject_sub_disciplines, -> { where("subject = 1") }, class_name: "SubDiscipline"
  has_many :question_sub_disciplines, -> { where("question = 1") }, class_name: "SubDiscipline"

  validates_presence_of :name

end
