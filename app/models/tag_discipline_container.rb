class TagDisciplineContainer < ApplicationRecord
  belongs_to :tag_discipline

  belongs_to :container, polymorphic: true, optional: true, touch: true
end
