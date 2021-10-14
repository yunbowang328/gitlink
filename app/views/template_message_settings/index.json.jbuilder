json.partial! "commons/success"
json.setting_types do 

  json.array! @group_settings.keys.each do |k|
    json.partial! "detail", type: k, count: @group_settings[k]
  end

  # json.array! @group_settings, partial: 'detail', as: :type


end