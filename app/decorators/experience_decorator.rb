module ExperienceDecorator
  def container_type_text
    I18n.t("experience.container_type.#{container_type.to_s.underscore}")
  end

  def content
    case container_type.to_s.underscore
    when 'game' then
      game = Game.find_by(id: container_id)
      game.present? ? "通过实训“#{game.challenge.shixun.name}”的第#{game.challenge.position}关获得的奖励" : ''
    when 'shixun_publish' then
      shixun = Shixun.find_by(id: container_id)
      shixun.present? ? "发布实训“#{shixun.name}”获得的奖励" : ''
    end
  end
end