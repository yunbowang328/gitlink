class Admins::ImportUserExcel < BaseImportXlsx
  UserData = Struct.new(:student_id, :name, :department_name, :identity, :technical_title, :phone)

  def read_each(&block)
    sheet.each_row_streaming(pad_cells: true, offset: 3) do |row|
      data = row.map(&method(:cell_value))[0..5]
      block.call UserData.new(*data)
    end
  end

  def school
    @school ||= begin
      school_id = sheet.cell(1, 1).to_s.strip
      school_name = sheet.cell(1, 2).to_s.strip

      School.find_by(id: school_id, name: school_name)
    end
  end

  def identifier
    @_identifier ||= sheet.cell(2, 1).to_s.strip
  end

  private

  def check_sheet_valid!
    raise_import_error('请按照模板格式导入') if school.blank?
  end

  def cell_value(obj)
    obj&.cell_value
  end
end
