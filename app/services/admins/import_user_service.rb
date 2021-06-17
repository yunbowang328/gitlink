class Admins::ImportUserService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :file, :school, :prefix, :result

  def initialize(file)
    @file   = file
    @result = { success: 0, fail: [] }
  end

  def call
    raise Error, '文件不存在' if file.blank?

    excel = Admins::ImportUserExcel.new(file)
    @school = excel.school
    @prefix = excel.identifier

    excel.read_each(&method(:save_user))

    result
  rescue ApplicationImport::Error => ex
    raise Error, ex.message
  end

  private

  def save_user(data)
    user = find_user(data)

    if user.blank?
      create_user(data)
    else
      user.update_column(:certification, 1)
    end

    result[:success] += 1
  rescue Exception => ex
    fail_data = data.as_json
    fail_data[:data] = fail_data.values.join(',')
    fail_data[:message] = ex.message

    result[:fail] << fail_data
  end

  def create_user(data)
    department = school.departments.find_by(name: data.department_name)

    attr = {
      type: 'User',
      status: User::STATUS_ACTIVE,
      login: "#{prefix}#{data.student_id}",
      firstname: '',
      lastname: data.name,
      nickname: data.name,
      professional_certification: 1,
      certification: 1,
      password: '12345678',
      phone: data.phone,
      mail: "#{prefix}#{data.student_id}@qq.com",
      profile_completed: true
    }
    ActiveRecord::Base.transaction do
      user = User.create!(attr)

      extension_attr = {
        school_id: school.id, location: school.province, location_city: school.city,
        gender: 0, identity: data.identity.to_i, department_id: department&.id, student_id: data.student_id
      }

      extension_attr[:technical_title] =
        case data.identity.to_i
        when 0 then %w(教授 副教授 讲师 助教).include?(data.technical_title) ? data.technical_title : '讲师'
        when 2 then %w(企业管理者 部门管理者 高级工程师 工程师 助理工程师).include?(data.technical_title) ? data.technical_title : '助理工程师'
        else nil
        end

      user.create_user_extension!(extension_attr)
    end
  end

  def find_user(data)
    users = User.joins(:user_extension).where(user_extensions: { identity: data.identity, school_id: school.id })

    if data.identity.to_i == 1
      users = users.where(user_extensions: { student_id: data.student_id })
    else
      users = users.where(user_extensions: { technical_title: data.technical_title }).where('CONCAT(users.lastname,users.firstname) = ? OR users.nickname = ?', data.name, data.name)
    end

    users.first
  end
end