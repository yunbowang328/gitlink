json.array! @sub_entries do |entry|
  json.partial! 'repositories/simple_entry', locals: { entry: entry }
end
