
class SyncCreateMemoJob < ApplicationJob
  queue_as :default

  def perform(memo_params)
    all_memos = Memo.all
    memo_params.each do |m| 
      SyncLog.sync_log("==========mmeo_params============id:#{m}")
      begin     
        if all_memos.exists?(m[:id])
          memo = all_memos.where(id: m[:id]).first 
          memo.update_attributes!(m.merge(hidden: false))
        else 
          memo = Memo.new(m.merge({forum_section_id: m[:forum_id], hidden: false}))
          if memo.save!
            SyncLog.sync_log("==========create_memo_success============id:#{memo.id}")
          else 
            SyncLog.sync_log("==========create_memo_failed============id:#{m[:id]}")
          end
        end
      rescue => e
        SyncLog.sync_log("==========sync_memos_1111111_to_forge_failed============errors:#{e}")
      end
    end
  end

end
