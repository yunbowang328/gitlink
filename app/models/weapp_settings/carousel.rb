class WeappSettings::Carousel < WeappSetting
  default_scope { order(position: :asc) }
end