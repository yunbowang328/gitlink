module AvatarHelper
  def relative_path
    "avatars"
  end

  def storage_path
    File.join(Rails.root, "public", "images", relative_path)
  end

  def disk_filename(source_type,source_id,image_file=nil)
    File.join(storage_path, "#{source_type}", "#{source_id}")
  end

  def url_to_avatar(source)
    if File.exist?(disk_filename(source&.class, source&.id))
      ctime = File.ctime(disk_filename(source.class, source.id)).to_i
      if %w(User Organization).include?(source.class.to_s)
        File.join("images", relative_path, ["#{source.class}", "#{source.id}"]) + "?t=#{ctime}"
      else
        File.join("images/avatars", ["#{source.class}", "#{source.id}"]) + "?t=#{ctime}"
      end
    elsif source.class.to_s == 'User'
      source.get_letter_avatar_url
    end
  end
end