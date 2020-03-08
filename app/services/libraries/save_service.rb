class Libraries::SaveService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :library, :user, :params

  def initialize(library, user, params)
    @library = library
    @user    = user
    @params  = params
  end

  def call
    Libraries::SaveForm.new(params).validate!

    if library.new_record?
      library.user_id = user.id
      library.generate_uuid
    end

    ActiveRecord::Base.transaction do
      library.assign_attributes(library_params)
      library.save!

      deal_library_tag!
      deal_attachments!

      Libraries::SubmitService.call(library) if with_publish?
    end

    library
  rescue Libraries::SubmitService::Error => ex
    raise Error, ex.message
  end

  private

  def deal_library_tag!
    new_tag_ids = LibraryTag.where(id: Array.wrap(params[:tag_ids]).compact).pluck(:id)
    old_tag_ids = library.library_library_tags.pluck(:library_tag_id)

    # 删除标签
    destroy_ids = old_tag_ids - new_tag_ids
    library.library_library_tags.where(library_tag_id: destroy_ids).delete_all

    # 创建标签
    created_ids = new_tag_ids - old_tag_ids
    created_ids.each do |id|
      library.library_library_tags.create!(library_tag_id: id)
    end
  end

  def deal_attachments!
    attachment_ids = Array.wrap(params[:attachment_ids]).compact.map(&:to_i)
    old_attachment_id = library.attachments.pluck(:id)

    destroy_ids = old_attachment_id - attachment_ids
    library.attachments.where(id: destroy_ids).delete_all

    Attachment.where(id: attachment_ids, author_id: user.id).update_all(container_type: library.class.to_s, container_id: library.id)
  end

  def library_params
    params.slice(*%i[title content author_name author_school_name cover_id])
  end

  def with_publish?
    params[:publish].to_s == 'true'
  end
end
