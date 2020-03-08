class Admins::SubDisciplinesController < Admins::BaseController

  def index
    @discipline = current_discipline
    @sub_disciplines = current_discipline.sub_disciplines
  end

  def create
    name = params[:name].to_s.strip
    return render_error('名称不能为空') if name.blank?
    return render_error('名称重复') if current_discipline.sub_disciplines.where(name: name).exists?
    SubDiscipline.create!(name: name, discipline_id: current_discipline.id, position: current_discipline.sub_disciplines.pluck(:position).max + 1)
    render_ok
  end

  def edit
    @sub_discipline = current_sub_discipline
  end

  def update
    begin
      if params[:sub_discipline] && params[:sub_discipline][:name]
        name = params[:sub_discipline][:name].to_s.strip
        current_sub_discipline.update_attributes!(name: name)
      else
        ActiveRecord::Base.transaction do
          current_sub_discipline.update_attributes!(setting_params)
          current_sub_discipline.tag_disciplines.each do |tag|
            tag.update_attributes!(setting_params)
          end
        end
      end
    rescue Exception => e
      @message = e.message
    end
    @sub_disciplines = current_sub_discipline.discipline&.sub_disciplines
  end

  def destroy
    @sub_discipline_id = params[:id]
    ActiveRecord::Base.transaction do
      discipline = current_sub_discipline.discipline
      discipline.sub_disciplines.where("position > #{current_sub_discipline.position}").update_all("position=position-1")
      current_sub_discipline.destroy!
    end
  end

  def adjust_position
    discipline = current_sub_discipline.discipline
    max_position = discipline.sub_disciplines.pluck(:position).max
    opr = params[:opr] || "down"
    if (params[:opr] == "up" && current_sub_discipline.position == 1) || (params[:opr] == "down" && current_sub_discipline.position == max_position)
      @message = "超出范围"
    else
      ActiveRecord::Base.transaction do
        if opr == "up"
          discipline.sub_disciplines.find_by("position = #{current_sub_discipline.position - 1}")&.update!(position: current_sub_discipline.position)
          current_sub_discipline.update!(position: current_sub_discipline.position - 1)
        else
          discipline.sub_disciplines.find_by("position = #{current_sub_discipline.position + 1}")&.update!(position: current_sub_discipline.position)
          current_sub_discipline.update!(position: current_sub_discipline.position + 1)
        end
      end
    end
    @sub_disciplines = discipline&.sub_disciplines
  rescue Exception => e
    @message = e.message
  end


  private

  def current_sub_discipline
    @_current_sub_discipline = SubDiscipline.find params[:id]
  end

  def current_discipline
    @_current_discipline = Discipline.find params[:discipline_id]
  end

  def setting_params
    params.permit(:shixun, :subject, :question)
  end
end