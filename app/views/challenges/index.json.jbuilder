# 公共接口,新建关卡任务
# json.partial! 'challenges/new_link', shixun_identifier: @shixun.identifier
json.description @shixun.description
json.power @editable
json.shixun_identifier @shixun.identifier
json.shixun_status @shixun.status
json.is_jupyter @shixun.is_jupyter?
json.allow_skip @shixun.task_pass


# 列表
if @challenges.present?
  json.challenge_list @challenges do |challenge|
    json.challenge_id challenge.id
    json.position challenge.position
    json.st challenge.st
    json.name challenge.subject
    json.score challenge.score
    json.passed_count challenge.user_passed_count
    json.playing_count challenge.playing_count
    json.name_url shixun_challenge_path(challenge, shixun_identifier: @shixun.identifier)
    #json.open_game challenge.open_game(@user.id, @shixun)
    if @editable
      json.edit_url edit_shixun_challenge_path(challenge, shixun_identifier: @shixun.identifier)
      json.delete_url shixun_challenge_path(challenge, shixun_identifier: @shixun.identifier)
      json.up_url index_up_shixun_challenge_path(challenge, :shixun_identifier =>  @shixun.identifier) unless challenge.position < 2
      json.down_url index_down_shixun_challenge_path(challenge, :shixun_identifier =>  @shixun.identifier) if @shixun.challenges_count != challenge.position
    end
    #json.passed challenge.has_passed?(@user.id)
    json.status challenge.user_tpi_status @user.id
  end
end
