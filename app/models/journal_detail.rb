# == Schema Information
#
# Table name: journal_details
#
#  id         :integer          not null, primary key
#  journal_id :integer          default("0"), not null
#  property   :string(30)       default(""), not null
#  prop_key   :string(30)       default(""), not null
#  old_value  :text(65535)
#  value      :text(65535)
#
# Indexes
#
#  journal_details_journal_id  (journal_id)
#

class JournalDetail < ApplicationRecord
  belongs_to :journal
end
