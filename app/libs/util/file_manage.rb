module Util::FileManage
  module_function

  # 不同的类型扩展不同的目录
  def relative_path
    "avatars"
  end

  def storage_path
    File.join(Rails.root, "public", "images", relative_path)
  end

  def disk_filename(source_type, source_id, suffix=nil)
    File.join(storage_path, "#{source_type}", "#{source_id}#{suffix}")
  end

  def source_disk_filename(source, suffix=nil)
    disk_filename(source.class.name, source.id, suffix)
  end

  def exist?(source_type, source_id, suffix=nil)
    File.exist?(disk_filename(source_type, source_id, suffix))
  end

  def exists?(source, suffix=nil)
    File.exist?(disk_filename(source.class, source.id, suffix))
  end

  def disk_file_url(source_type, source_id, suffix = nil)
    t = ctime(source_type, source_id, suffix)
    File.join('/images', relative_path, "#{source_type}", "#{source_id}#{suffix}") + "?t=#{t}"
  end

  def source_disk_file_url(source, suffix=nil)
    disk_file_url(source.class, source.id, suffix)
  end

  def ctime(source_type, source_id, suffix)
    return nil unless exist?(source_type, source_id, suffix)

    File.ctime(disk_filename(source_type, source_id, suffix)).to_i
  end

  def disk_auth_filename(source_type, source_id, type)
    File.join(storage_path, "#{source_type}", "#{source_id}#{type}")
  end

  def disk_real_name_auth_filename(source_id)
    disk_auth_filename('UserAuthentication', source_id, 'ID')
  end

  def auth_file_url(source_type, source_id, type)
    disk_file_url(source_type, source_id, type)
  end

  def real_name_auth_file_url(source_id)
    auth_file_url('UserAuthentication', source_id, 'ID')
  end

  def disk_professional_auth_filename(source_id)
    disk_auth_filename('UserAuthentication', source_id, 'PRO')
  end

  def professional_auth_file_url(source_id)
    auth_file_url('UserAuthentication', source_id, 'PRO')
  end
end