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