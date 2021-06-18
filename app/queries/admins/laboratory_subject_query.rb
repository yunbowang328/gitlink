class Admins::LaboratorySubjectQuery < ApplicationQuery
  attr_reader :laboratory, :params

  def initialize(laboratory, params)
    @laboratory = laboratory
    @params     = params
  end

  def call
    laboratory_subjects = laboratory.laboratory_subjects.joins(:subject)

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      like_sql = 'subjects.name LIKE :keyword OR CONCAT(users.lastname, users.firstname) LIKE :keyword OR users.nickname LIKE :keyword'
      laboratory_subjects = laboratory_subjects.joins(subject: :user).where(like_sql, keyword: "%#{keyword}%")
    end

    # 状态
    laboratory_subjects = laboratory_subjects.where(subjects: { status: params[:status] }) if params[:status].present?

    # 创建者单位
    if params[:school_id].present?
      laboratory_subjects = laboratory_subjects.joins(subjects: { user: :user_extension })
                              .where(user_extensions: { school_id: params[:school_id] })
    end

    # 首页展示、单位自建
    %i[homepage ownership].each do |column|
      if params[column].present? && params[column].to_s == 'true'
        laboratory_subjects = laboratory_subjects.where(column => true)
      end
    end

    laboratory_subjects
  end
end