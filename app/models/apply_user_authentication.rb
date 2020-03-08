# status：0 审核中 1 同意  2 拒绝  3 撤销
# auth_type：1 实名认证， 2 职业认证
class ApplyUserAuthentication < ApplicationRecord
  belongs_to :user

  has_many :tidings, :as => :container, :dependent => :destroy
  has_one :attachment, as: :container, dependent: :destroy

  scope :real_name_auth, -> { where(auth_type: 1) }
  scope :professional_auth, -> { where(auth_type: 2) }
  scope :processing, -> { where(status: 0) }
  scope :passed, -> { where(status: 1) }

  after_create :send_tiding

  def status_text
    I18n.t!("apply_user_authentication.status.#{status}")
  rescue I18n::MissingTranslationData
    nil
  end

  def revoke!
    update!(status: 3)
  end

  private

  def send_tiding
    self.tidings << Tiding.new(:user_id => '1', :status=> 0, :trigger_user_id => user_id, :belong_container_id => 1, :belong_container_type =>'User', :tiding_type => "Apply")
  end
end
