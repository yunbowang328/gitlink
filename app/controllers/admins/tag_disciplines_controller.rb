class Admins::TagDisciplinesController < Admins::BaseController

  def index
    @sub_discipline = current_sub_discipline
    @tag_disciplines = current_sub_discipline.tag_disciplines
  end

  def create
    name = params[:name].to_s.strip
    return render_error('名称重复') if current_sub_discipline.tag_disciplines.where(name: name).exists?
    TagDiscipline.create!(name: name, sub_discipline_id: current_sub_discipline.id, user_id: current_user.id,
                          position: current_sub_discipline.tag_disciplines.pluck(:position).max + 1)
    render_ok
  end

  def edit
    @tag_discipline = current_tag_discipline
  end

  def update
    begin
      if params[:tag_discipline] && params[:tag_discipline][:name]
        name = params[:tag_discipline][:name].to_s.strip
        current_tag_discipline.update_attributes!(name: name)
      else
        current_tag_discipline.update_attributes!(setting_params)
      end
    rescue Exception => e
      @message = e.message
    end
    @tag_disciplines = current_tag_discipline.sub_discipline&.tag_disciplines
  end

  def destroy
    @tag_discipline_id = params[:id]
    ActiveRecord::Base.transaction do
      sub_discipline = current_tag_discipline.sub_discipline
      sub_discipline.tag_disciplines.where("position > #{current_tag_discipline.position}").update_all("position=position-1")
      current_tag_discipline.destroy!
    end
  end

  def adjust_position
    sub_discipline = current_tag_discipline.sub_discipline
    max_position = sub_discipline.tag_disciplines.pluck(:position).max
    opr = params[:opr] || "down"
    if (params[:opr] == "up" && current_tag_discipline.position == 1) || (params[:opr] == "down" && current_tag_discipline.position == max_position)
      @message = "超出范围"
    else
      ActiveRecord::Base.transaction do
        if opr == "up"
          sub_discipline.tag_disciplines.find_by("position = #{current_tag_discipline.position - 1}")&.update!(position: current_tag_discipline.position)
          current_tag_discipline.update!(position: current_tag_discipline.position - 1)
        else
          sub_discipline.tag_disciplines.find_by("position = #{current_tag_discipline.position + 1}")&.update!(position: current_tag_discipline.position)
          current_tag_discipline.update!(position: current_tag_discipline.position + 1)
        end
      end
    end
    @tag_disciplines = sub_discipline&.tag_disciplines
  rescue Exception => e
    @message = e.message
  end


  private

  def current_sub_discipline
    @_current_sub_discipline = SubDiscipline.find params[:sub_discipline_id]
  end

  def current_tag_discipline
    @_current_tag_discipline = TagDiscipline.find params[:id]
  end

  def setting_params
    params.permit(:shixun, :subject, :question)
  end
end