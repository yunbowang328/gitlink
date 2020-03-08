json.keyword @fuzzy_searchs
json.total_count @total_count
json.shixuns do
  json.partial! 'shixuns/shixun', locals: {shixuns: @shixuns}
end