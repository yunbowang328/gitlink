module StagesHelper

  # 章节实训的通关情况
  def stage_myshixun_status myshixun
    # myshixun = Myshixun.where(user_id: user.id, shixun_id: shixun.id).take
    myshixun.try(:status) == 1 ? 1 : 0
  end

  # 实训路径详情列表，右侧实训的状态显示栏
  def stage_shixun_status subject_status, shixun_status, shixun_hidden
    status = if shixun_hidden
               '暂未公开'
             else
               if subject_status < 2
                 case shixun_status
                 when 0, 1
                   '暂未公开'
                 when 2
                   '已发布'
                 when 3
                   '已关闭'
                 end
               else
                 if shixun_status != 2
                   case shixun_status
                   when 0, 1
                     '暂未公开'
                   when 3
                     '已关闭'
                   end
                 else
                   ''
                 end
               end
             end
    return status
  end

  # 开启挑战的path
  def stage_tpi_path shixun, user, subject_id
    path = ""
    if shixun.status == 2 || user.manager_of_shixun?(shixun)
      myshixun = Myshixun.where(user_id: user.id, shixun_id: shixun.id).first
      if myshixun.present?
        if user.try(:mail).blank?
          path = security_settings_path
        elsif shixun.challenges_count > 0
          is_modify = ShixunModify.where(:myshixun_id => myshixun.try(:id), :shixun_id => shixun.try(:id), :status => 1).first
          if is_modify.blank?
            path = shixun_exec_shixun_path(shixun, :is_subject => subject_id)
          else
            path = myshixun_reset_myshixun_path(myshixun, :is_subject => subject_id)
          end
        end
      end
    end
    return path
  end
end
