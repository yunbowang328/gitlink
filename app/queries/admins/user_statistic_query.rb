class Admins::UserStatisticQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :study_challenge_count, :finish_challenge_count, :study_shixun_count, :finish_shixun_count,
               default_by: :finish_shixun_count, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    users = User.where(type: 'User').group(:id)

    users = users.joins(:user_extension).where(user_extensions: { school_id: params[:school_id] }) if params[:school_id].present?

    total = users.count.count

    # 根据排序字段进行查询
    users = query_by_sort_column(users, params[:sort_by])
    users = custom_sort(users, params[:sort_by], params[:sort_direction])

    users = users.includes(user_extension: [:school, :department])
    users = users.limit(page_size).offset(offset).to_a
    # 查询并组装其它数据
    users = package_other_data(users)

    [total, users]
  end

  private

  def package_other_data(users)
    ids = users.map(&:id)

    study_myshixun   = Myshixun.where(user_id: ids)
    finish_myshixun  = Myshixun.where(user_id: ids, status: 1)
    study_challenge  = Game.where(user_id: ids).where(status: [0, 1, 2])
    finish_challenge = Game.where(user_id: ids).where(status: 2)

    if time_range.present?
      study_myshixun   = study_myshixun.where(updated_at: time_range)
      finish_myshixun  = finish_myshixun.where(updated_at: time_range)
      study_challenge  = study_challenge.where(updated_at: time_range)
      finish_challenge = finish_challenge.where(updated_at: time_range)
    end

    study_myshixun_map   = study_myshixun.reorder(nil).group(:user_id).count
    finish_myshixun_map  = finish_myshixun.reorder(nil).group(:user_id).count
    study_challenge_map  = study_challenge.reorder(nil).group(:user_id).count
    finish_challenge_map = finish_challenge.reorder(nil).group(:user_id).count
    evaluate_count_map   = study_challenge.reorder(nil).group(:user_id).sum(:evaluate_count)
    cost_time_map        = study_challenge.reorder(nil).group(:user_id).sum(:cost_time)

    users.each do |user|
      user._extra_data = {
        study_shixun_count: study_myshixun_map.fetch(user.id, 0),
        finish_shixun_count: finish_myshixun_map.fetch(user.id, 0),
        study_challenge_count: study_challenge_map.fetch(user.id, 0),
        finish_challenge_count: finish_challenge_map.fetch(user.id, 0),
        evaluate_count: evaluate_count_map.fetch(user.id, 0),
        cost_time: cost_time_map.fetch(user.id, 0),
      }
    end

    users
  end

  def query_by_sort_column(users, sort_by_column)
    base_query_column = 'users.*'

    case sort_by_column.to_s
    when 'study_shixun_count' then
      users =
        if time_range.present?
          users.joins("LEFT JOIN myshixuns ON myshixuns.user_id = users.id "\
                      "AND myshixuns.updated_at BETWEEN '#{time_range.min}' AND '#{time_range.max}'")
        else
          users.left_joins(:myshixuns)
        end

      users.select("#{base_query_column}, COUNT(*) study_shixun_count")
    when 'finish_shixun_count' then
      users =
        if time_range.present?
          users.joins("LEFT JOIN myshixuns ON myshixuns.user_id = users.id AND myshixuns.status = 1 AND "\
                      "myshixuns.updated_at BETWEEN '#{time_range.min}' AND '#{time_range.max}'")
        else
          users.joins('LEFT JOIN myshixuns ON myshixuns.user_id = users.id AND myshixuns.status = 1')
        end

      users.select("#{base_query_column}, COUNT(*) finish_shixun_count")
    when 'study_challenge_count' then
      users =
        if time_range.present?
          users.joins('LEFT JOIN myshixuns ON myshixuns.user_id = users.id')
            .joins("LEFT JOIN games ON games.myshixun_id = myshixuns.id "\
                   "AND games.status IN (0,1,2) AND games.updated_at BETWEEN '#{time_range.min}' AND '#{time_range.max}'")
        else
          users.joins('LEFT JOIN myshixuns ON myshixuns.user_id = users.id')
            .joins("LEFT JOIN games ON games.myshixun_id = myshixuns.id AND games.status IN (0,1,2)")
        end

      users.select("#{base_query_column}, COUNT(*) study_challenge_count")
    when 'finish_challenge_count' then
      users =
        if time_range.present?
          users#.joins('LEFT JOIN myshixuns ON myshixuns.user_id = users.id')
            .joins("LEFT JOIN games ON games.user_id = users.id "\
                   "AND games.status = 2 AND games.updated_at BETWEEN '#{time_range.min}' AND '#{time_range.max}'")
        else
          users#.joins('LEFT JOIN myshixuns ON myshixuns.user_id = users.id')
            .joins("LEFT JOIN games ON games.user_id = users.id AND games.status = 2")
        end

      users.select("#{base_query_column}, COUNT(*) finish_challenge_count")
    else
      users
    end
  end

  def time_range
    @_time_range ||= begin
      case params[:date]
      when 'weekly'    then 1.weeks.ago..Time.now
      when 'monthly'   then 1.months.ago..Time.now
      when 'quarterly' then 3.months.ago..Time.now
      when 'yearly'    then 1.years.ago..Time.now
      else ''
      end
    end
  end

  def page_size
    params[:per_page].to_i.zero? ? 20 : params[:per_page].to_i
  end

  def offset
    (params[:page].to_i.zero? ? 0 : params[:page].to_i - 1) * page_size
  end
end
