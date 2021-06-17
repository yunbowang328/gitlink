class Admins::SubjectQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc, default_table: 'subjects'

  def initialize(params)
    @params = params
  end

  def call
    subjects = Subject.all

    subjects = subjects.where(id: params[:id]) if params[:id].present?

    # 状态过滤
    status =
        case params[:status].to_s.strip
        when "editing" then {status: 0}
        when "applying" then {status: 2, public: [0, 1]}
        when "pending" then {public: 1}
        when "published" then {public: 2}
        end

    subjects = subjects.where(status) if status

    # 创建者单位
    if params[:school_id].present?
      subjects = subjects.joins(user: :user_extension).where(user_extensions: { school_id: params[:school_id] })
    end

    # 首页展示、金课
    %i[homepage_show excellent].each do |column|
      if params[column].present? && params[column].to_s == 'true'
        subjects = subjects.where(column => true)
      end
    end

    # 关键字
    keyword = params[:keyword].to_s.strip
    if keyword
      sql = 'CONCAT_WS(lastname, firstname, nickname) LIKE :keyword OR subjects.name LIKE :keyword'
      subjects = subjects.joins(:user).where(sql, keyword: "%#{keyword}%")
    end

    custom_sort(subjects, params[:sort_by], params[:sort_direction])
  end
end