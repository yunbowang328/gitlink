module GradeDecorator
  def container_type_text
    I18n.t("grade.container_type.#{container_type.to_s.underscore}")
  end

  def content
    case container_type.to_s.underscore
    when 'avatar'         then '用户首次上传头像获得的奖励'
    when 'phone'          then '用户首次绑定手机号码获得的奖励'
    when 'mail'           then '用户首次绑定邮箱获得的奖励'
    when 'attendance'     then '用户每天签到获得的奖励'
    when 'account'        then '新用户首次填写基本资料获得的奖励'
    when 'memo'           then '发布的评论或者帖子获得平台奖励'
    when 'discusses'      then '发布的评论获得平台奖励'
    when 'star'           then '用户给实训评分获得的随机奖励'
    when 'feedback'       then '反馈的问题获得平台奖励'
    when 'authentication' then '用户首次完成实名认证获得的奖励'
    when 'professional'   then '用户首次完成职业认证获得的奖励'
    when 'answer' then
      game = Game.find_by(id: container_id)
      game.present? ? "查看实训“#{game.challenge.shixun.name}”第#{game.challenge.position}关的参考答案消耗的金币" : ''
    when 'game' then
      game = Game.find_by(id: container_id)
      game.present? ? "通过实训“#{game.challenge.shixun.name}”的第#{game.challenge.position}关获得的奖励" : ''
    when 'test_set' then
      game = Game.find_by(id: container_id)
      game.present? ? "查看实训“#{game.challenge.shixun.name}”的第#{game.challenge.position}关的隐藏测试集消耗的金币" : ''
    when 'shixun_publish' then
      shixun = Shixun.find_by(id: container_id)
      shixun.present? ? "发布实训“#{shixun.name}”获得的奖励" : ''
    when 'check_ta_answer' then
      game = Game.find_by(id: container_id)
      game.present? ? "查看实训“#{game.challenge.shixun.name}”第#{game.challenge.position}关的TA人解答消耗的金币" : ''
    when 'hack' then
      hack = Hack.find_by(id: container_id)
      hack.present? ? "完成了题目解答“#{hack.name}”，获得金币奖励：#{hack.score}" : ''
    end
  end
end