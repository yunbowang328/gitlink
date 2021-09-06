module RepositoriesHelper
  def render_permission(user, project)
    return "Admin" if user&.admin?
    project.get_premission(user)
  end

  def render_decode64_content(str)
    return nil if str.blank?
    Base64.decode64(str).force_encoding("UTF-8")
  end

  def download_type(str)
    default_type = %w(xlsx xls ppt pptx pdf zip 7z rar exe pdb obj idb png jpg gif tif psd svg RData rdata doc docx mpp vsdx dot otf eot ttf woff woff2)
    default_type.include?(str&.downcase)
  end

  def image_type?(str)
    default_type = %w(png jpg gif tif psd svg gif bmp webp jpeg)
    default_type.include?(str&.downcase)
  end

  def is_readme?(type, str)
    return false if type != 'file' || str.blank?
    readme_types = ["readme.md", "readme", "readme_en.md", "readme_zh.md", "readme_en", "readme_zh"]
    readme_types.include?(str.to_s.downcase)
  end

  def render_commit_author(author_json)
    return nil if author_json.blank? || author_json["id"].blank?
    # find_user_by_login author_json['name']
    find_user_by_gitea_uid author_json['id']
  end

  def readme_render_decode64_content(str, path)
    return nil if str.blank?
    begin
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
    rescue
      return str
    end
  end

  # unix_time values for example: 1604382982
  def render_format_time_with_unix(unix_time)
    Time.at(unix_time).strftime("%Y-%m-%d %H:%M")
  end

  # date for example: 2020-11-01T19:57:27+08:00
  def render_format_time_with_date(date)
    date.to_time.strftime("%Y-%m-%d %H:%M")
  end

  def decode64_content(entry, owner, repo, ref, path=nil)
    if is_readme?(entry['type'], entry['name'])
      content = Gitea::Repository::Entries::GetService.call(owner, repo.identifier, entry['path'], ref: ref)['content']
      readme_render_decode64_content(content, path)
    else
      file_type = File.extname(entry['name'].to_s)[1..-1]
      if download_type(file_type)
        return entry['content'].nil? ? Gitea::Repository::Entries::GetService.call(owner, repo.identifier, entry['path'], ref: ref)['content'] : entry['content']  
      end
      render_decode64_content(entry['content'])
    end
  end

  def base64_to_image(path, content)
    # generate to https://git.trusite.net/pawm36ozq/-/raw/branch/master/entrn.png"
    content      = Base64.decode64(content)
    File.open(path, 'wb') { |f| f.write(content) }
  end
  
  def render_download_image_url(dir_path, file_path, content)
    full_path = file_path.starts_with?("/") ? [dir_path, file_path].join("") : [dir_path, file_path].join("/")
    file_name = full_path.split("/")[-1]
    # 用户名/项目标识/文件路径
    dir_path = generate_dir_path(full_path.split("/"+file_name)[0])

    file_path = [dir_path, file_name].join('/')

    puts "##### render_download_image_url file_path: #{file_path}"
    base64_to_image(file_path, content)
    file_path = file_path[6..-1]
    File.join(base_url, file_path)
  end
  
  def generate_dir_path(dir_path)
    # tmp_dir_path
    # eg: jasder/forgeplus/raw/branch/ref
    dir_path = ["public", tmp_dir, dir_path].join('/')
    puts "#### dir_path: #{dir_path}"
    unless Dir.exists?(dir_path)
      FileUtils.mkdir_p(dir_path) ##不成功这里会抛异常
    end
    dir_path
  end

  def tmp_dir
    "repo"
  end
  
end
