class TagRepertoire < ApplicationRecord
  belongs_to :sub_repertoire

  has_many :shixun_tag_repertoires, dependent: :destroy
  has_many :shixuns, through: :shixun_tag_repertoires

  has_many :memo_tag_repertoires, :dependent => :destroy
  has_many :memos, :through => :memo_tag_repertoires


  scope :field_for_list, lambda{select([:id, :name])}

end
