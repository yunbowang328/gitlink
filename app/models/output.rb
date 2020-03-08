# 字段说明：
# code：-1表示评测未通过，0表示评测成功，实质是status的值
# mes：
# out_put：
# test_set_position: 测试集序号（排序）
# actual_output：
# result:
# is_public：测试集是否是公开
# query_index：评测次数
# compile_success:
# text_scor:
# sec_key：每次评测的唯一标识
class Output < ApplicationRecord
  belongs_to :game
end
