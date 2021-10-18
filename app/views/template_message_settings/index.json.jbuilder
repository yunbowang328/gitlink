json.partial! "commons/success"
json.setting_types do 

  json.array! @group_settings.keys.sort_by{|i| i.constantize.order_index}.each do |k|
    json.partial! "detail", type: k, count: @group_settings[k]
  end

  # json.array! @group_settings, partial: 'detail', as: :type


end