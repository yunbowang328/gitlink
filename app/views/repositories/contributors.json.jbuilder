total_count = @contributors.size 
json.list @contributors.each do |contributor|
  json.partial! 'contributor', locals: { contributor: contributor }
end
json.total_count total_count


