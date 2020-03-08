# 新建关卡
json.choice_url new_shixun_challenge_path(shixun_identifier, st: 1) if @power == 0
json.practice_url new_shixun_challenge_path(shixun_identifier, st: 0) if @power == 0
json.go_back_url shixun_challenges_path
if @prev_challenge
  json.prev_challenge do
    json.id @prev_challenge.id
    json.st @prev_challenge.st
  end
end
if @next_challenge
  json.next_challenge do
    json.id @next_challenge.id
    json.st @next_challenge.st
  end
end
json.position @position
json.name @challenge.try(:subject)

