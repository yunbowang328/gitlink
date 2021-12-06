class Admins::PlatformPeopleController < Admins::BaseController 
  before_action :get_person, only: [:edit, :update, :destroy]
  def index
    sort_by = PlatformPerson.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    q = PlatformPerson.ransack(name_cont: params[:search])
    people = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @people = kaminari_paginate(people)
  end

  def new 
    @person = PlatformPerson.new
  end

  def create
    @person = PlatformPerson.new(person_params)
    if @person.save 
      save_image_file(params[:image], @person)
      redirect_to admins_platform_people_path 
      flash[:success] = '创建论坛动态成功'
    else
      redirect_to admins_platform_people_path 
      flash[:danger] = "创建论坛动态失败"
    end
  end

  def edit 

  end

  def update 
    @person.attributes = person_params
    if @person.save
      save_image_file(params[:image], @person)
      redirect_to admins_platform_people_path
      flash[:success] = '更新论坛动态成功'
    else 
      redirect_to admins_platform_people_path
      flash[:danger] = '更新论坛动态失败'
    end
  end

  def destroy 
    if @person.destroy 
      redirect_to admins_platform_people_path
      flash[:success] = '删除论坛动态成功'
    else
      redirect_to admins_platform_people_path
      flash[:danger] = '删除论坛动态失败'
    end
  end

  private 
  def get_person 
    @person = PlatformPerson.find_by_id(params[:id])
  end

  def person_params 
    params.require(:platform_person).permit!
  end

  def save_image_file(file, topic)
    return unless file.present? && file.is_a?(ActionDispatch::Http::UploadedFile)

    file_path = Util::FileManage.source_disk_filename(topic, 'image')
    File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
    Util.write_file(file, file_path)
  end
end