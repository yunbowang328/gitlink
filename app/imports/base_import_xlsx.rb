class BaseImportXlsx < ApplicationImport

  attr_reader :sheet

  def initialize(path)
    raise Error, '只支持xlsx格式' unless !path.is_a?(String) || path.end_with?('.xlsx')

    begin
      @sheet = Roo::Excelx.new(path)
    rescue Exception => ex
      Util.logger_error(ex)
      raise Error, '打开文件失败'
    end

    check_sheet_valid!
  end

  def read_each(&block);end

  private

  def check_sheet_valid!;end
end