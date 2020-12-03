class Ci::LocalBase < ApplicationRecord
  self.abstract_class = true

  def self.table_name_prefix
    "ci_"
  end
end
