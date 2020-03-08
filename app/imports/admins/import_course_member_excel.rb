class Admins::ImportCourseMemberExcel < BaseImportXlsx
  Data = Struct.new(:student_id, :name, :course_id, :role, :course_group_name, :school_id)

  def read_each(&block)
    sheet.each_row_streaming(pad_cells: true, offset: 1) do |row|
      data = row.map(&method(:cell_value))[0..5]
      block.call Data.new(*data)
    end
  end

  private

  def check_sheet_valid!
    raise_import_error('请按照模板格式导入') if sheet.row(1).size != 6
  end

  def cell_value(obj)
    obj&.cell_value&.to_s&.strip
  end
end
