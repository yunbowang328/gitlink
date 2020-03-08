class TagDisciplinesController < ApplicationController
  before_action :require_login

  def create
    sub_discipline = SubDiscipline.find_by!(id: params[:sub_discipline_id])
    tip_exception("重复的知识点") if sub_discipline.tag_disciplines.exists?(name: params[:name].to_s.strip)
    tag_discipline = TagDiscipline.create!(name: params[:name].to_s.strip, sub_discipline: sub_discipline, user_id: current_user.id,
                                           position: sub_discipline.tag_disciplines.pluck(:position).max + 1)
    render_ok({tag_discipline_id: tag_discipline.id})
  end
end