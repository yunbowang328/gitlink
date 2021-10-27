json.partial! "commons/success"
json.projects do 

  json.array! @project_rank.each do |item|
    json.partial! "detail", locals: {item: item}
  end

end