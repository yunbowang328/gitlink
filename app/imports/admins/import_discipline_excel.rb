class Admins::ImportDisciplineExcel < BaseImportXlsx
  DisciplineData = Struct.new(:discipline_name, :sub_discipline_name)

  def read_each(&block)
    sheet.each_row_streaming(pad_cells: true, offset: 2) do |row|
      data = row.map(&method(:cell_value))[1..2]
      block.call DisciplineData.new(*data)
    end
  end

  private

  def cell_value(obj)
    obj&.cell_value
  end
end
