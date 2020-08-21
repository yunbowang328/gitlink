class Ci::LocalBase < ApplicationRecord
  def self.table_name_prefix
    "ci_"
  end
end
