#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
class Token < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :value

  before_create :delete_previous_tokens, :generate_new_token

  @@validity_time = 1.day

  def generate_new_token
    self.value = Token.generate_token_value
  end

  def self.get_or_create_permanent_login_token(user, type)
    token = Token.get_token_from_user(user, type)
    Rails.logger.info "###### Token.get_token_from_user result: #{token&.value}"
    unless token
      token = Token.create(:user => user, :action => type)
      Rails.logger.info "###### Token.get_token_from_user is nul and agine create token: #{token&.value}"
    else
      token.update_attribute(:created_on, Time.now)
    end
    token
  end

  def self.get_token_from_user(user, action)
    token = Token.where(:action => action, :user_id => user).first
    Rails.logger.info "######  self.get_token_from_user query result: #{token&.value}"
    unless token
      token = Token.create!(user_id: user.id, action: action)
      Rails.logger.info "######  self.get_token_from_user query is nil and create result: #{token&.value}"
    end
    token
  end

  # Return true if token has expired
  def expired?
    return Time.now > self.created_on + @@validity_time
  end

  # Delete all expired tokens
  def self.destroy_expired
    Token.delete_all ["action NOT IN (?) AND created_on < ?", ['feeds', 'api', 'autologin'], Time.now - @@validity_time]
  end

  # Returns the active user who owns the key for the given action
  def self.find_active_user(action, key, validity_days=nil)
    user = find_user(action, key, validity_days)
    if user && user.active?
      user
    end
  end

  # Returns the user who owns the key for the given action
  def self.find_user(action, key, validity_days=nil)
    token = find_token(action, key, validity_days)
    if token
      token.user
    end
  end

  # Returns the token for action and key with an optional
  # validity duration (in number of days)
  def self.find_token(action, key, validity_days=nil)
    action = action.to_s
    key = key.to_s
    return nil unless action.present? && key =~ /\A[a-z0-9]+\z/i

    token = Token.where(value: key, action: action).first
    if token && (token.action == action) && (token.value == key) && token.user
      if validity_days.nil? || (token.created_on > validity_days.days.ago)
        token
      end
    end
  end

  def self.generate_token_value
    Educoder::Utils.random_hex(20)
  end

  def self.delete_user_all_tokens(user)
    Token.delete_all(user_id: user.id)
  end

  private

  # Removes obsolete tokens (same user and action)
  def delete_previous_tokens
    if user
      Token.where(['user_id = ? AND action = ?', user.id, action]).delete_all
    end
  end
end
