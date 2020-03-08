class Users::QuestionBankService
  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    relations = class_name.classify.constantize.all

    relations = category_filter(relations)
    relations = type_filter(relations) if params[:type].present?

    relations = relations.where(course_list_id: params[:course_list_id]) if params[:course_list_id].present?

    custom_sort(relations, params[:sort_by], params[:sort_direction])
  end

  def course_lists
    relation_name = class_name.underscore.pluralize.to_sym
    course_lists = CourseList.joins(relation_name).where.not(relation_name => { id: nil })

    category_condition =
      case params[:object_type]
      when 'normal' then { homework_type: 1 }
      when 'group' then { homework_type: 3 }
      when 'exercise' then { container_type: 'Exercise' }
      when 'poll' then { container_type: 'Poll' }
      when 'gtask', 'gtopic' then {}
      else raise ArgumentError
      end
    course_lists = course_lists.where(relation_name => category_condition) if category_condition.present?

    type_condition =
      case params[:type]
      when 'personal' then { user_id: user.id }
      when 'publicly' then { is_public: true }
      else {}
      end
    course_lists = course_lists.where(relation_name => type_condition) if type_condition.present?

    course_lists.distinct.select(:id, :name)
  end

  private

  def class_name
    @_class_name ||= begin
      case params[:object_type]
      when 'normal', 'group'  then 'HomeworkBank'
      when 'exercise', 'poll' then 'ExerciseBank'
      when 'gtask'            then 'GtaskBank'
      when 'gtopic'           then 'GtopicBank'
      else raise ArgumentError
      end
    end
  end

  def category_filter(relations)
    case params[:object_type]
    when 'normal' then
      relations.where(homework_type: 1)
    when 'group' then
      relations.where(homework_type: 3)
    when 'exercise' then
      relations.where(container_type: 'Exercise')
    when 'poll' then
      relations.where(container_type: 'Poll')
    when 'gtask', 'gtopic' then
      relations.all
    else
      raise ArgumentError
    end
  end

  def type_filter(relations)
    case params[:type]
    when 'personal' then relations.where(user_id: user.id)
    when 'publicly' then relations.where(is_public: true)
    else relations
    end
  end

  def custom_sort(relations, sort_by, sort_direction)
    case sort_by
    when 'updated_at' then
      relations.order("updated_at #{sort_direction}, id #{sort_direction}")
    when 'name' then
      relations.order("CONVERT(name USING gbk) COLLATE gbk_chinese_ci #{sort_direction}")
    when 'contributor' then
      order_sql = "CONVERT (users.lastname USING gbk) COLLATE gbk_chinese_ci #{sort_direction},"\
                  " CONVERT (users.firstname USING gbk) COLLATE gbk_chinese_ci #{sort_direction}"
      relations.joins(:user).where(users: { status: 1 }).order(order_sql)
    else
      relations
    end
  end
end
