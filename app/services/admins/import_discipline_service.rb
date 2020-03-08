class Admins::ImportDisciplineService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :file, :result

  def initialize(file)
    @file   = file
    @result = { success: 0, fail: [] }
  end

  def call
    raise Error, '文件不存在' if file.blank?

    excel = Admins::ImportDisciplineExcel.new(file)
    excel.read_each(&method(:save_discipline))

    result
  rescue ApplicationImport::Error => ex
    raise Error, ex.message
  end

  private

  def save_discipline(data)
    count = 0
    discipline_name = data.discipline_name.to_s.strip
    sub_discipline_name = data.sub_discipline_name.to_s.strip

    return unless discipline_name.present?
    discipline = Discipline.find_by(name: discipline_name)
    if discipline.blank?
      discipline = Discipline.create!(name: discipline_name, position: Discipline.all.pluck(:position).max + 1)
      count += 1
    end

    if sub_discipline_name.present?
      sub_discipline = SubDiscipline.find_by(name: discipline_name, discipline: discipline)
      if sub_discipline.blank?
        SubDiscipline.create!(name: sub_discipline_name, discipline: discipline, position: discipline.sub_disciplines.pluck(:position).max + 1)
        count += 1
      end
    end

    result[:success] += count
  rescue Exception => ex
    fail_data = data.as_json
    fail_data[:data] = fail_data.values.join(',')
    fail_data[:message] = ex.message

    result[:fail] << fail_data
  end
end