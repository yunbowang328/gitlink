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
