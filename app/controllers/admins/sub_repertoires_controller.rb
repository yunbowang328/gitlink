class Admins::SubRepertoiresController < Admins::BaseController

  def index
    @repertoire = current_repertoire
    @sub_repertoires = current_repertoire.sub_repertoires
  end

  def create
    name = params[:name].to_s.strip
    return render_error('名称重复') if current_repertoire.sub_repertoires.where(name: name).exists?
    SubRepertoire.create!(name: name, repertoire_id: current_repertoire.id)
    render_ok
  end

  def edit
    @sub_repertoire = current_sub_repertoire
  end

  def update
    if params[:sub_repertoire] && params[:sub_repertoire][:name].present?
      name = params[:sub_repertoire][:name].to_s.strip
      current_sub_repertoire.update_attributes!(name: name)
    end
    @sub_repertoires = current_sub_repertoire.repertoire&.sub_repertoires
  end

  def destroy
    @sub_repertoire_id = params[:id]
    current_sub_repertoire.destroy!
  end

  private

  def current_sub_repertoire
    @_current_sub_repertoire = SubRepertoire.find params[:id]
  end

  def current_repertoire
    @_current_repertoire = Repertoire.find params[:repertoire_id]
  end

  def setting_params
    params.permit(:shixun, :subject, :question)
  end
end