module RepositoriesHelper
  def render_decode64_content(str)
    return nil if str.blank?
    Base64.decode64(str).force_encoding("UTF-8")
  end

  def download_type(str)
    default_type = %w(xlsx xls ppt pptx pdf zip 7z rar exe pdb obj idb png jpg gif tif psd svg RData rdata doc docx mpp)
    default_type.include?(str&.downcase)
  end

  def image_type?(str)
    default_type = %w(png jpg gif tif psd svg)
    default_type.include?(str&.downcase)
  end

  def is_readme_type?(str)
    return false if str.blank?
    readme_types = ["readme.md", "readme", "readme_en.md", "readme_zh.md", "readme_en", "readme_zh"]
    readme_types.include?(str.to_s.downcase)
  end

  def render_commit_author(author_json)
    return nil if author_json.blank?
    find_user_by_login author_json['login']
  end

  def readme_render_decode64_content(str, path)
    return nil if str.blank?
    content = Base64.decode64(str).force_encoding('UTF-8')

    c_regex = /\!\[.*?\]\((.*?)\)/
    src_regex = /src=\"(.*?)\"/
    ss = content.to_s.scan(c_regex)
    ss_src = content.to_s.scan(src_regex)
    total_images = ss + ss_src
    if total_images.length > 0
      total_images.each do |s|
        image_title = /\"(.*?)\"/
        r_content = s[0]
        remove_title = r_content.to_s.scan(image_title)
        if remove_title.length > 0
          r_content = r_content.gsub(/#{remove_title[0]}/, "").strip
        end
        if r_content.include?("?")
          new_r_content = r_content + "&raw=true"
        else 
          new_r_content = r_content + "?raw=true"
        end
        unless r_content.include?("http://") || r_content.include?("https://") || r_content.include?("mailto:")
          new_r_content = "#{path}" + new_r_content
        end
        content = content.gsub(/#{r_content}/, new_r_content)
      end
    end

    return content
  end
end
