class ChangeMemosRepliesCount < ActiveRecord::Migration[5.2]
  def change
    memos = Memo.all 
    memos.each do |s|
      puts s.id
      new_replies_count = (s.replies_count.to_i / 2).to_i
      s.update_attribute(:replies_count, new_replies_count)
    end
  end
end
