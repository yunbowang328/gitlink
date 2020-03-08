class ProjectPackages::SaveService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :package, :params

  def initialize(package, params)
    @package = package
    @params  = params
  end

  def call
    ProjectPackages::SaveForm.new(params).validate!

    check_code_valid! if need_check_code?

    is_create = package.new_record?
    raise Error, '类型不存在' unless ProjectPackageCategory.where(id: params[:category_id]).exists?
    params[:project_package_category_id] = params.delete(:category_id).to_i

    raise Error, '竞标截止时间不能小于当前时间' if params[:deadline_at].present? && params[:deadline_at].to_time < Time.now

    if params[:min_price].blank? && params[:max_price].present?
      params[:min_price] = params[:max_price]
      params[:max_price] = nil
    end

    ActiveRecord::Base.transaction do
      columns = %i[project_package_category_id title content deadline_at
                   min_price max_price contact_name contact_phone]
      package.assign_attributes(params.slice(*columns))
      package.save!

      # 处理附件
      deal_attachments

      send_create_notify! if is_create

      ProjectPackages::ApplyPublishService.call(package) if with_publish?
    end

    package
  rescue ProjectPackages::ApplyPublishService::Error => ex
    raise Error, ex.message
  end

  private

  def need_check_code?
    (package.new_record? && params[:contact_phone] != package.creator.phone) ||
      (!package.new_record? && package.contact_phone != params[:contact_phone])
  end

  def check_code_valid!
    raise Error, '验证码不能为空' if params[:code].blank?

    code = VerificationCode.where(phone: params[:contact_phone], code_type: 9, code: params[:code]).last
    raise Error, '无效的验证码' if code.blank? || !code.effective?
  end

  def deal_attachments
    attachment_ids = Array.wrap(params[:attachment_ids]).compact.map(&:to_i) || []
    old_attachment_ids = package.attachments.pluck(:id)

    destroy_ids = old_attachment_ids - attachment_ids
    package.attachments.where(id: destroy_ids).delete_all

    new_ids = attachment_ids - old_attachment_ids
    if new_ids.present?
      Attachment.where(id: new_ids, container_id: nil).update_all(container_id: package.id, container_type: 'ProjectPackage')
    end
  end

  def send_create_notify!
    Tiding.create!(user_id: package.creator_id, trigger_user_id: 0,
                   container_id: package.id, container_type: 'ProjectPackage', tiding_type: 'Created')
  end

  def with_publish?
    params[:publish].to_s == 'true'
  end
end