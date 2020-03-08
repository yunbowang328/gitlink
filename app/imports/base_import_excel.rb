class BaseImportExcel < ApplicationImport
  Error = Class.new(StandardError)

  attr_reader :sheet

  def initialize(path)
    raise Error, '不支持的文件格式' unless path.end_with?('.xls') || path.end_with?('.xlsx')

    begin
      @sheet = Roo::Spreadsheet.open(path).sheet(0)
    rescue Exception => ex
      logger ex.message
      ex.backtrace.each(&method(:logger))
      raise Error, '打开文件失败'
    end

    check_sheet_valid!
  end

  def read_each(&block);end

  private

  def check_sheet_valid!;end

  def raise_import_error(message)
    raise Error, message
  end
end