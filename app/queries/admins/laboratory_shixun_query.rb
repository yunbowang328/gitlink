class Admins::LaboratoryShixunQuery < ApplicationQuery
  attr_reader :laboratory, :params

  def initialize(laboratory, params)
    @laboratory = laboratory
    @params     = params
  end

  def call
    laboratory_shixuns = laboratory.laboratory_shixuns.joins(:shixun)

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      like_sql = 'shixuns.name LIKE :keyword OR CONCAT(users.lastname, users.firstname) LIKE :keyword OR users.nickname LIKE :keyword'
      laboratory_shixuns = laboratory_shixuns.joins(shixun: :user).where(like_sql, keyword: "%#{keyword}%")
    end

    # 实训状态
    laboratory_shixuns = laboratory_shixuns.where(shixuns: { status: params[:status] }) if params[:status].present?

    # 技术平台
    if params[:tag_id].present?
      laboratory_shixuns = laboratory_shixuns.joins(shixun: :shixun_mirror_repositories)
                             .where(shixun_mirror_repositories: { mirror_repository_id: params[:tag_id] })
    end

    # 首页展示、单位自建
    %i[homepage ownership].each do |column|
      if params[column].present? && params[column].to_s == 'true'
        laboratory_shixuns = laboratory_shixuns.where(column => true)
      end
    end

    laboratory_shixuns
  end
end