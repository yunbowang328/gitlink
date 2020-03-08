json.count @results.total_count
json.results do
  json.array! @results.with_highlights(multiple: true) do |obj, highlights|
    json.merge! obj.to_searchable_json
    json.type obj.class.name.downcase

    json.title highlights.delete(:name)&.join('...') || obj.searchable_title
    # json.description highlights.values[0,5].each { |arr| arr.is_a?(Array) ? arr.join('...') : arr }.join('<br/>')

    # 去除开头标点符号
    reg = /^[，。？：；‘’！“”—……、]/
    # 附件的替换
    atta_reg = /!\[.*]\(\/api\/attachments\/\d+\)/
    highlights[:description]&.first&.sub!(reg, '')
    highlights[:description]&.map{|des| des.gsub!(atta_reg, '')}
    highlights[:content]&.first&.sub!(reg, '')
    highlights[:content]&.map{|des| des.gsub!(atta_reg, '')}

    json.content highlights
  end
end