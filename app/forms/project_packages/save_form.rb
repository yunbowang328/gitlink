class ProjectPackages::SaveForm
  include ActiveModel::Model

  attr_accessor :category_id, :title, :content, :attachment_ids, :deadline_at,
                :min_price, :max_price, :contact_name, :contact_phone, :code, :publish

  validates :category_id, presence: true
  validates :title, presence: true, length: { maximum: 60 }
  validates :content, presence: true
  validates :deadline_at, presence: true
  validates :min_price, numericality: { greater_than: 0 }, allow_blank: true
  validates :max_price, numericality: { greater_than: ->(obj){ obj.min_price.to_i } }, allow_blank: true
  validates :contact_name, presence: true, length: { maximum: 20 }
  validates :contact_phone, presence: true, format: { with: /1\d{10}/ }
end
