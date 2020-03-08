# status: 0 创建镜像； 1 修改镜像ID； 2 修改镜像name  3 删除镜像 4.从主节点同步镜像到子节点（子节点发生异常）, 5. 修改镜像别名, 6. 修改镜像的状态
# user_id: -1时，证明是非人为因素造成，中间层异常导致
class MirrorOperationRecord < ActiveRecord::Base
  default_scope { order(created_at: :desc) }

  belongs_to :mirror_repository
end
