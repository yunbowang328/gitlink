class Admins::DisciplinesController < Admins::BaseController

  def index
    @disciplines = Discipline.all
  end

  def create
    name = params[:name].to_s.strip
    return render_error('名称重复') if Discipline.where(name: name).exists?
    Discipline.create!(name: name, position: Discipline.all.pluck(:position).max + 1)
    render_ok
  end

  def edit
    @discipline = current_discipline
  end

  def update
    begin
      if params[:discipline] && params[:discipline][:name]
        name = params[:discipline][:name].to_s.strip
        current_discipline.update_attributes!(name: name)
      else
        ActiveRecord::Base.transaction do
          current_discipline.update_attributes!(setting_params)
          current_discipline.sub_disciplines.each do |sub|
            sub.tag_disciplines.each do |tag|
              tag.update_attributes!(setting_params)
            end
            sub.update_attributes!(setting_params)
          end
        end
      end
    rescue Exception => e
      @message = e.message
    end
    @disciplines = Discipline.all
  end

  def destroy
    @discipline_id = params[:id]
    ActiveRecord::Base.transaction do
      Discipline.where("position > #{current_discipline.position}").update_all("position=position-1")
      current_discipline.destroy!
    end
  end

  def adjust_position
    max_position = Discipline.all.pluck(:position).max
    opr = params[:opr] || "down"
    if (params[:opr] == "up" && current_discipline.position == 1) || (params[:opr] == "down" && current_discipline.position == max_position)
      @message = "超出范围"
    else
      ActiveRecord::Base.transaction do
        if opr == "up"
          Discipline.find_by("position = #{current_discipline.position - 1}")&.update!(position: current_discipline.position)
          current_discipline.update!(position: current_discipline.position - 1)
        else
          Discipline.find_by("position = #{current_discipline.position + 1}")&.update!(position: current_discipline.position)
          current_discipline.update!(position: current_discipline.position + 1)
        end
      end
    end
    @disciplines = Discipline.all
  rescue Exception => e
    @message = e.message
  end

  private
  def current_discipline
    @_current_discipline = Discipline.find params[:id]
  end

  def setting_params
    params.permit(:shixun, :subject, :question)
  end
end