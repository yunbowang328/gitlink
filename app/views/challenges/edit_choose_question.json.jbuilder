json.(@challenge_choose, :challenge_id, :subject, :answer,
    :standard_answer, :score, :difficult,
    :position, :category)
json.st @challenge.st
# 选项的参数
json.choose_contents @challenge_choose.challenge_questions do |question|
  json.(question, :option_name, :position, :right_key)
end

json.tags @challenge_choose.challenge_tags.map(&:name)

