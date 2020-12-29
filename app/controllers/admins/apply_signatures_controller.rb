class Admins::ApplySignaturesController < Admins::BaseController

    def index
      sort_by = params[:sort_by] ||= 'created_on'
      sort_direction = params[:sort_direction] ||= 'desc'

      @apply_signatures = paginate ApplySignature.waiting.includes(:attachments)
    end

    def update
      ActiveRecord::Base.transaction do
        begin
          apply_signature = ApplySignature.find_by!(id: params[:id])
          apply_signature.update_attributes!(apply_signatures_params)
          if apply_signature.status == "passed"
            Projects::AddMemberInteractor.call(apply_signature.project.owner, apply_signature.project, apply_signature.user, "read", true)
          end
          redirect_to admins_apply_signatures_path
          flash[:success] = "更新成功"
        rescue => e
          raise ActiveRecord::Rollback
          redirect_to admins_apply_signatures_path
          flash[:danger] = "更新失败"
        end
      end
    end

    private
    def apply_signatures_params
      params.permit(:status)
    end
  end
