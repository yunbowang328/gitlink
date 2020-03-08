class WeappSettings::Advert < WeappSetting
  default_scope { order(position: :asc) }
end