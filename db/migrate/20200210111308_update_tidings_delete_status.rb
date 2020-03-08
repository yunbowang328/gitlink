class UpdateTidingsDeleteStatus < ActiveRecord::Migration[5.2]
  def change
    # Tiding.where.not(container_type: 'DeleteCourse').where(belong_container_type: "Course", belong_container_id: Course.where(is_delete: 1).pluck(:id)).update_all(is_delete: 1)
  end
end
