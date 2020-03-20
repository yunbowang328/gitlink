class Attachment < ApplicationRecord
  include BaseModel
  include Publicable
  include Publishable
  include Lockable

  belongs_to :container, polymorphic: true, optional: true
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :course, foreign_key: :container_id, optional: true
  has_many :attachment_group_settings, :dependent => :destroy
  has_many :attachment_histories, -> { order(version: :desc) }, :dependent => :destroy
  # 二级目录
  belongs_to :course_second_category, optional: true

  scope :by_filename_or_user_name,      -> (keywords) { joins(:author).where("filename like :search or LOWER(concat(users.lastname, users.firstname)) LIKE :search",
                                                        :search => "%#{keywords.split(" ").join('|')}%") unless keywords.blank? }
  scope :by_keywords,                   -> (keywords) { where("filename LIKE ?", "%#{keywords.split(" ").join('|')}%") unless keywords.blank? }
  scope :ordered,                       -> (opts = {}) { order("#{opts[:sort_type]} #{opts[:sort] == 1 ? 'asc': 'desc'}") }
  scope :by_course_second_category_id,  -> (course_second_category_id = 0) { where(course_second_category_id: course_second_category_id) }
  scope :contains_only_course,          -> { where(container_type: 'Course') }
  scope :contains_only_project,         -> { where(container_type: 'Project') }
  scope :contains_course_and_project,   -> { contains_only_course.or(contains_only_project) }
  scope :mine,                          -> (author_id) { where(author_id: author_id) }
  scope :simple_columns,                -> { select(:id, :filename, :filesize, :created_on, :cloud_url, :author_id, :content_type, :container_type, :container_id) }
  scope :search_by_container,           -> (ids) {where(container_id: ids)}
  scope :unified_setting, -> {where("unified_setting = ? ", 1)}

  validates_length_of :description, maximum: 100, message: "不能超过100个字符"

  DCODES = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)

  def diskfile
    File.join(File.join(Rails.root, "files"), disk_directory.to_s, disk_filename.to_s)
  end

  def relative_path_filename
    File.join(disk_directory.to_s, disk_filename.to_s)
  end

  def title
    filename
    # title = filename
    # if container && container.is_a?(StudentWork) && author_id != User.current.id
    #   course = container&.homework_common&.course
    #   unless User.current.teacher_of_course?(course)
    #     title = "#{Time.now.strftime('%Y%m%d%H%M%S')}_#{DCODES.sample(8).join}" + File.extname(filename)
    #   end
    # end
    # title
  end

  def downloads_count
    downloads
  end

  def quotes_count
    quotes.nil? ? 0 : quotes
  end

  def self.associate_container(ids, container_id, container_type, attachtype=1)
    return false  if ids.blank? || !ids.is_a?(Array)
    ids.each do |id|
      attachment = Attachment.find id
      attachment.update_attributes(container_id: container_id, container_type: container_type, attachtype: attachtype)
    end
  end

  # Returns an unsaved copy of the attachment
  def copy(attributes=nil)
    copy = self.class.new
    copy.attributes = self.attributes.dup.except("id", "downloads", "quotes")
    copy.attributes = attributes if attributes
    copy
  end

  def set_publish_time(publish_time)
    self.unified_setting = 1
    if publish_time.blank?
      self.publish_time = Time.now
      self.is_publish = 1
    else
      self.is_publish = publish_time.to_s > (format_time Time.now).to_s ? 0 : 1
      self.publish_time = publish_time.to_s > (format_time Time.now).to_s ? publish_time : Time.now
    end
  end

  def set_course_group_publish_time(course, course_group_publish_times)
    self.unified_setting = 0
    min_publish_time = ""
    course_group_publish_times.each do |obj|
      if obj && obj[:course_group_id]
        publish_time = obj[:publish_time]
        if !publish_time.blank? && publish_time < min_publish_time
          min_publish_time = publish_time
        elsif publish_time.blank?
          publish_time = Time.now
        end
        attachment_group_setting = self.attachment_group_settings.where(course_group_id: obj[:course_group_id], course_id: course.id).first
        if attachment_group_setting.present?
          attachment_group_setting.update_columns(publish_time: publish_time)
        else
          self.attachment_group_settings.create(
              :course_group_id => obj[:course_group_id],
              :course_id => course.id,
              :publish_time => publish_time
          )
        end
      end
    end
    self.is_publish = min_publish_time > (format_time Time.now).to_s ? 0 : 1
    self.publish_time = min_publish_time > (format_time Time.now).to_s ? min_publish_time : self.created_on
  end

  def become_history
    history = self.attachment_histories.first
    new_attachment_history = AttachmentHistory.new(self.attributes.except("id", "resource_bank_id", "unified_setting", "course_second_category_id", "delay_publish").merge(
        attachment_id: self.id,
        version: history.nil? ? 1 :  history.version + 1,
    ))
    new_attachment_history
  end

  def copy_attributes_from_new_attachment(new_attachment)
    self.attributes = new_attachment.attributes.dup.except("id","container_id","container_type","is_public","downloads", "quotes",'is_publish','publish_time', "delay_publish")
  end

  def set_public(is_public)
    if is_public == true
      is_public = 1
    elsif is_public == false
      is_public = 0
    end
  end

  #判断是否为pdf文件
  def is_pdf?
    is_pdf = false
    file_content_type = content_type
    file_ext_type = File.extname(filename).strip.downcase[1..-1]
    if (file_content_type.present? && file_content_type.downcase.include?("pdf")) || (file_ext_type.present? && file_ext_type.include?("pdf"))
      is_pdf = true
    end
    is_pdf
  end

end
