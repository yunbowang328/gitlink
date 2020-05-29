module RepositoriesHelper
  def render_decode64_content(str)
    return nil if str.blank?
    Base64.decode64(str)
  end

  def download_type(str)
    default_type = %w(xlsx xls ppt pptx pdf zip 7z rar exe pdb obj idb png jpg gif tif psd svg)
    default_type.include?(str&.downcase)
  end

  def render_commit_author(author_json)
    return nil if author_json.blank?
    find_user_by_login author_json['login']
  end
end
