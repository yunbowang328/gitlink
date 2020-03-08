json.categories @categories.each do |category|
  json.(category, :id, :name)
end