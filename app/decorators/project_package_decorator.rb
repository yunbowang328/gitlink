module ProjectPackageDecorator
  extend ApplicationDecorator

  display_time_method :updated_at, :deadline_at, :published_at
end