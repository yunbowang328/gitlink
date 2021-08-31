# == Schema Information
#
# Table name: reversed_keywords
#
#  id          :integer          not null, primary key
#  identifier  :string(255)
#  description :text(65535)
#  closed      :boolean          default("0")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class ReversedKeyword < ApplicationRecord

  scope :is_reversed, -> (identifier){where(identifier: identifier, closed: false) if identifier.present?}
end
