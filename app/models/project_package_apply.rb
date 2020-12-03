# == Schema Information
#
# Table name: project_package_applies
#
#  id                 :integer          not null, primary key
#  project_package_id :integer
#  status             :string(255)
#  reason             :string(255)
#  refused_at         :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_project_package_applies_on_project_package_id  (project_package_id)
#

class ProjectPackageApply < ApplicationRecord
  include AASM

  belongs_to :project_package

  aasm(:status) do
    state :pending, initial: true
    state :refused
    state :agreed

    event :refuse do
      transitions from: :pending, to: :refused
    end

    event :agree do
      transitions from: :pending, to: :agreed
    end
  end
end
