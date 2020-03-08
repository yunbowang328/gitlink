class PrivateMessages::CreateService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :sender, :receiver, :params

  def initialize(sender, receiver, params)
    @sender   = sender
    @receiver = receiver
    @params   = params
  end

  def call
    validate!

    same_attr = { sender: sender, receiver: receiver, content: content, send_time: Time.now }

    message = nil
    ActiveRecord::Base.transaction do
      message = sender.private_messages.create!(same_attr.merge(target: receiver, status: 1))
      receiver.private_messages.create!(same_attr.merge(target: sender, status: 0))
    end
    message
  end

  private

  def content
    @_content ||= params[:content].to_s.strip
  end

  def validate!
    raise Error, '内容不能为空' if content.blank?
    raise Error, '内容太长' if content.size > 500
  end
end