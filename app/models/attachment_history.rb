# == Schema Information
#
# Table name: attachment_histories
#
#  id             :integer          not null, primary key
#  container_id   :integer
#  container_type :string(255)
#  filename       :string(255)      default("")
#  disk_filename  :string(255)      default("")
#  filesize       :integer          default("0")
#  content_type   :string(255)      default("")
#  digest         :string(60)       default("")
#  downloads      :integer          default("0")
#  author_id      :integer
#  created_on     :datetime
#  description    :text(65535)
#  disk_directory :string(255)
#  attachtype     :integer
#  is_public      :integer
#  copy_from      :integer
#  quotes         :integer
#  version        :integer
#  attachment_id  :integer
#  is_publish     :integer          default("1")
#  publish_time   :date
#  cloud_url      :string(255)      default("")
#

class AttachmentHistory < ApplicationRecord
  include Publishable
  include Publicable

  belongs_to :attachment, foreign_key: 'attachment_id'

  def title
    filename
  end

  def downloads_count
    downloads
  end

  def quotes_count
    quotes.nil? ? 0 : quotes
  end

  def public?
    is_public == 1
  end

  def is_history_pdf?
    is_pdf = false
    file_content_type = content_type
    file_ext_type = File.extname(filename).strip.downcase[1..-1]
    if (file_content_type.present? && file_content_type.downcase.include?("pdf")) || (file_ext_type.present? && file_ext_type.include?("pdf"))
      is_pdf = true
    end
    is_pdf
  end

end
