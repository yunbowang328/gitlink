class HomeController < ApplicationController

  def index
    # banner图
    images = current_laboratory.portal_images.only_online.order(position: :asc)
    images = default_laboratory.portal_images.only_online.order(position: :asc) if images.blank? # 未设置时使用EduCoder的轮播图

    @images_url = []
    images.each do |image|
      @images_url << {path: image.link, image_url: Util::FileManage.source_disk_file_url(image)}
    end

    # 目录分级
    @rep_list = current_laboratory.shixun_repertoires

    shixuns = current_laboratory.shixuns
    subjects = current_laboratory.subjects

    if current_laboratory.main_site?
      shixuns = shixuns.where(homepage_show: true)
      subjects = subjects.where(homepage_show: true)
    else
      shixuns = shixuns.joins(:laboratory_shixuns).where(laboratory_shixuns: { homepage: true, laboratory_id: current_laboratory.id})
      subjects = subjects.joins(:laboratory_subjects).where(laboratory_subjects: { homepage: true, laboratory_id: current_laboratory.id})
    end

    @shixuns = shixuns.includes(:tag_repertoires, :challenges).limit(8)
    @subjects = subjects.includes(:repertoire, :shixuns).limit(8)

    @main_shixuns = Shixun.where(homepage_show: true).includes(:tag_repertoires, :challenges).limit(8)
    @main_subjects = Subject.where(homepage_show: true).includes(:shixuns, :repertoire).limit(8)

    # if current_laboratory.main_site?
    #   @tea_users = User.where(homepage_teacher: 1).includes(:user_extension).limit(10).order("experience desc")
    #   @stu_users = User.where(is_test: 0).includes(:user_extension).where(user_extensions: {identity: 1}).limit(10).order("experience desc")
    # end
  end

  def search
    @fuzzy_searchs = params[:keyword].split(" ").join("%")
    @shixuns = Shixun.where("name like ?", "%#{@fuzzy_searchs}%")
    @total_count = @shixuns.count
  end
end
