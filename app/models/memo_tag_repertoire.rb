class MemoTagRepertoire < ApplicationRecord
  belongs_to :memo
  belongs_to :tag_repertoire
end
