# == Schema Information
#
# Table name: diff_record_contents
#
#  id             :integer          not null, primary key
#  diff_record_id :integer
#  content        :text(65535)
#
# Indexes
#
#  index_diff_record_contents_on_diff_record_id  (diff_record_id)
#

class DiffRecordContent < ApplicationRecord
  belongs_to :diff_record
end
