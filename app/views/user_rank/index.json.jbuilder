json.partial! "commons/success"
json.users do 

  json.array! @user_rank.each do |item|
    json.partial! "detail", locals: {item: item}
  end

end