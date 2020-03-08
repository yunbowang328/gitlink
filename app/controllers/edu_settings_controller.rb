class EduSettingsController < ApplicationController
  before_action :require_admin
  before_action :set_edu_setting, only: [:show, :edit, :update, :destroy]
  skip_before_action :check_sign
  # GET /edu_settings
  # GET /edu_settings.json
  def index
    @edu_settings = EduSetting.all
  end

  # GET /edu_settings/1
  # GET /edu_settings/1.json
  def show
  end

  # GET /edu_settings/new
  def new
    @edu_setting = EduSetting.new
  end

  # GET /edu_settings/1/edit
  def edit
  end

  # POST /edu_settings
  # POST /edu_settings.json
  def create
    @edu_setting = EduSetting.new(edu_setting_params)

    respond_to do |format|
      if @edu_setting.save
        format.html { redirect_to @edu_setting, notice: 'Edu setting was successfully created.' }
        format.json { render :show, status: :created, location: @edu_setting }
      else
        format.html { render :new }
        format.json { render json: @edu_setting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /edu_settings/1
  # PATCH/PUT /edu_settings/1.json
  def update
    respond_to do |format|
      if @edu_setting.update(edu_setting_params)
        format.html { redirect_to @edu_setting, notice: 'Edu setting was successfully updated.' }
        format.json { render :show, status: :ok, location: @edu_setting }
      else
        format.html { render :edit }
        format.json { render json: @edu_setting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /edu_settings/1
  # DELETE /edu_settings/1.json
  def destroy
    @edu_setting.destroy
    respond_to do |format|
      format.html { redirect_to edu_settings_url, notice: 'Edu setting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_edu_setting
      @edu_setting = EduSetting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def edu_setting_params
      params.require(:edu_setting).permit(:name, :value)
    end
end
