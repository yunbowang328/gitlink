module Admins::MirrorRepositoriesHelper
  def mirror_type_tag(mirror)
    case mirror.main_type
    when '1' then '<i class="fa fa-star text-success font-16" aria-hidden="true" data-toggle="tooltip" data-title="主类别"></i>'.html_safe
    when '0' then '<i class="fa fa-star text-secondary font-16" aria-hidden="true" data-toggle="tooltip" data-title="子类别"></i>'.html_safe
    end
  end

  def mirror_status_tag(mirror)
    case mirror.status
    when 0
      '<i class="fa fa-check-circle text-secondary font-16" data-toggle="tooltip" data-title="未发布"></i>'.html_safe
    when 1
      '<i class="fa fa-check-circle text-success font-16" data-toggle="tooltip" data-title="已发布"></i>'.html_safe
    when 2, 3
      '<i class="fa fa-exclamation-circle text-danger font-16" data-toggle="tooltip" data-title="被修改"></i>'.html_safe
    when 4
      '<i class="fa fa-times-circle text-danger font-18" data-toggle="tooltip" data-title="被删除"></i>'.html_safe
    when 5
      '<i class="fa fa-exclamation-circle text-warning font-16" data-toggle="tooltip" data-title="子节点异常"></i>'.html_safe
    end
  end
end