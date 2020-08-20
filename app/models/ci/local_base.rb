class Local::Base < ApplicationRecord
  def self.table_name_prefix
    "ci_"
  end
end
