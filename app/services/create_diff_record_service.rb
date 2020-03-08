class CreateDiffRecordService < ApplicationService
  attr_reader :user, :obj, :column_name, :after, :before

  def initialize(user, obj, column_name, before, after)
    @user   = user
    @obj    = obj
    @before = before
    @after  = after
    @column_name = column_name
  end

  def call
    ActiveRecord::Base.transaction do
      diff_record = DiffRecord.create!(user: user, container: obj, column_name: column_name)
      diff_record.create_diff_record_content!(content: diff_content)
    end
  end

  private

  def diff_content
    content = ''

    arr = []
    index = 0
    fragment_size = 1
    Diffy::Diff.new(before, after).each do |line|
      unless line.include?("\\ 文件尾没有 newline 字符")
        unless line =~ /^[\+-]/
          if arr.empty? && index < fragment_size
            content += line
            index += 1
          else
            index = 0
            arr << line
            arr.shift if arr.size > fragment_size
          end
          next
        end

        content += arr.join('') if arr.present?
        content += line
        arr.clear
      end
    end
    content
  end
end