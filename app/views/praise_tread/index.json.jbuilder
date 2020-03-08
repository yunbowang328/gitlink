json.total_count @praises.size
json.praises do
  json.partial! 'praise', collection: @praises, as: :praise
end
