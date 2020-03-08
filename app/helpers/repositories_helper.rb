module RepositoriesHelper
  def render_decode64_content(str)
    return nil if str.blank?
    Base64.decode64(str)
  end

  def download_type(str)
    default_type = %w(xlsx xls ppt pptx pdf zip 7z rar exe)
    default_type.include?(str)
  end
end
