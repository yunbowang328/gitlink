class Admins::SalesmanChannelsController < Admins::BaseController
  before_action :set_salesman

  def index
    @channels = @salesman.salesman_channels
    if params[:keyword].present?
      @channels = @channels.joins(:school).where("schools.name like ?", "%#{params[:keyword]}%")
    end
    @start_time = params[:start_date]
    @end_time = params[:end_date].blank? ? Time.now : params[:end_date]
  end

  def batch_add
    channel_ids = @salesman.salesman_channels.pluck(:school_id)
    school_ids = params[:school_ids] - channel_ids
    school_ids.each do |school_id|
      school = School.find_by(id: school_id)
      next if school.blank? || @salesman.salesman_channels.where(school_id: school.id).exists?
      @salesman.salesman_channels.create!(school_id: school.id)
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def destroy
    @salesman.salesman_channels.find_by!(id: params[:id]).destroy
  end

  private

  def set_salesman
    @salesman = Salesman.find params[:salesman_id]
  end
end
