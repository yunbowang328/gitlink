class HelpsController < ApplicationController
  before_action :require_login, only: [:feedback]

  helper_method :current_help

  def about
    render_ok(content: current_help&.about_us)
  end

  def contact
    @cooperations = Cooperation.all.group(:user_type)
  end

  def cooperatives
    @data = { 'alliance_coop' => [], 'com_coop' => [], 'edu_coop' => [] }
    @data = @data.merge CooImg.all.group_by(&:img_type)
  end

  def agreement
    render_ok(content: current_help&.agreement)
  end

  def help_center
    render_ok(content: current_help&.help_center)
  end

  def feedback
    if params[:url].blank?
      content = "[#{params[:question_kind]}]<br>#{params[:description]}<br>"
      if params[:attachment_ids]
        params[:attachment_ids].each do |attachment_id|
          content += "![](/api/attachments/#{attachment_id})<br>"
        end
      end
    else
      content = "[#{params[:question_kind]}]<br>问题页面网址：#{params[:url]}<br>#{params[:description]}"
    end

    ActiveRecord::Base.transaction do
      attr = { sender_id: User.current.id, receiver_id: 1, content: content, send_time: Time.now }
      PrivateMessage.create!(attr.merge(user_id: User.current.id, target_id: 1, status: 1))
      PrivateMessage.create!(attr.merge(user_id: 1, target_id: User.current.id, status: 0))
    end

    render_ok
  end

  private

  def current_help
    @_current_help ||= Help.first
  end
end