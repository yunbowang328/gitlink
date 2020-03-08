module VideoDecorator
  extend ApplicationDecorator

  display_time_method :published_at, :created_at, :updated_at
end