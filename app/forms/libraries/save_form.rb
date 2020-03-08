class Libraries::SaveForm
  include ActiveModel::Model

  attr_accessor :title, :content, :author_name, :author_school_name, :cover_id,
                :publish, :attachment_ids, :tag_ids

  validates :title, presence: true, length: { maximum: 255 }
  validates :content, presence: true
  validates :author_name, presence: true, length: { maximum: 10 }
  validates :author_school_name, presence: true, length: { maximum: 50 }
  validates :attachment_ids, presence: true
end