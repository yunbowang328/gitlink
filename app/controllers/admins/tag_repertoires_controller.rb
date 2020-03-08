class Admins::TagRepertoiresController < Admins::BaseController

  def index
    @sub_repertoire = current_sub_repertoire
    @tag_repertoires = current_sub_repertoire.tag_repertoires
  end

  def create
    name = params[:name].to_s.strip
    return render_error('名称重复') if current_sub_repertoire.tag_repertoires.where(name: name).exists?
    TagRepertoire.create!(name: name, sub_repertoire_id: current_sub_repertoire.id)
    render_ok
  end

  def edit
    @tag_repertoire = current_tag_repertoire
  end

  def update
    if params[:tag_repertoire] && params[:tag_repertoire][:name].present?
      name = params[:tag_repertoire][:name].to_s.strip
      current_tag_repertoire.update_attributes!(name: name)
    end
    @tag_repertoires = current_tag_repertoire.sub_repertoire&.tag_repertoires
  end

  def destroy
    @tag_repertoire_id = params[:id]
    current_tag_repertoire.destroy!
  end

  private

  def current_sub_repertoire
    @_current_sub_repertoire = SubRepertoire.find params[:sub_repertoire_id]
  end

  def current_tag_repertoire
    @_current_tag_repertoire = TagRepertoire.find params[:id]
  end


end