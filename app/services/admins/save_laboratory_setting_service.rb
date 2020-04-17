class Admins::SaveLaboratorySettingService < ApplicationService
  attr_reader :laboratory, :laboratory_setting, :params

  def initialize(laboratory, params)
    @params     = params
    @laboratory = laboratory
    @laboratory_setting = laboratory.laboratory_setting
  end

  def call
    ActiveRecord::Base.transaction do
      laboratory.identifier = strip params[:identifier]
      laboratory_setting.name = strip params[:name]
      laboratory_setting.navbar = navbar_config
      laboratory_setting.footer = strip params[:footer]

      laboratory.save!
      Rails.logger.info("####_____name____E####{laboratory_setting.name}")
      Rails.logger.info("####_____navbar____E####{laboratory_setting.navbar}")
      Rails.logger.info("####_____footer___E####{laboratory_setting.footer}")

      laboratory_setting.save!(:validate =>false)

      deal_image_file
    end

    laboratory
  end

  private

  def navbar_config
    params[:navbar].map do |nav|
      hash = {}
      hash[:name] = strip nav[:name]
      hash[:link] = strip nav[:link]
      hash[:hidden] = nav[:hidden].to_s != '0'
      hash
    end
  end

  def deal_image_file
    save_image_file(params[:nav_logo], 'nav')
    save_image_file(params[:login_logo], 'login')
    save_image_file(params[:tab_logo], 'tab')
    save_image_file(params[:subject_banner], '_subject_banner')
    save_image_file(params[:course_banner], '_course_banner')
    save_image_file(params[:competition_banner], '_competition_banner')
    save_image_file(params[:moop_cases_banner], '_moop_cases_banner')
    save_image_file(params[:oj_banner], '_oj_banner')
  end

  def save_image_file(file, type)
    return unless file.present? && file.is_a?(ActionDispatch::Http::UploadedFile)

    file_path = Util::FileManage.source_disk_filename(laboratory_setting, type)
    File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
    Util.write_file(file, file_path)
  end
end