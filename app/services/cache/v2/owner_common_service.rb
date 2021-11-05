class Cache::V2::OwnerCommonService < ApplicationService 
  include AvatarHelper
  attr_reader :owner_id, :name
  attr_accessor :owner, :login, :email

  def initialize(owner_id, params={})
    @owner_id = owner_id
    @email = params[:email]
    @name = params[:name]
    @avatar_url = params[:avatar_url]
  end

  def read  
    owner_common
  end

  def call 
    set_owner_common
  end

  def reset 
    reset_owner_common
  end

  def clear 
    clear_owner_common
  end

  private 
  def load_owner 
    @owner = Owner.find_by_id @owner_id
    @login = @owner&.login
    @email ||= @owner&.mail
  end

  def owner_common_key
    "v2-owner-common:#{@login}-#{@email.to_s}"
  end

  def owner_common_key_by_id
    "v2-owner-common:#{@owner&.id}"
  end

  def owner_common
    result = $redis_cache.hgetall(owner_common_key_by_id)
    result.blank? ? reset_owner_common : result
  end

  def set_owner_common
    if $redis_cache.hgetall(owner_common_key_by_id).blank?
      reset_owner_common
      return
    else
      load_owner
      return if @owner.nil?
      if @name.present?
        if $redis_cache.hget(owner_common_key, "name").nil?
          reset_owner_name
        else
          $redis_cache.hset(owner_common_key, "name", @name)   
          $redis_cache.hset(owner_common_key_by_id, "name", @name) 
        end
      end
      if @email.present?
        if $redis_cache.hget(owner_common_key, "email").nil?
          reset_owner_email
        else
          # 更改邮箱这里把旧数据删除
          $redis_cache.del("v2-owner-common:#{@login}-*")
          $redis_cache.hset(owner_common_key, "email", @email) 
          $redis_cache.hset(owner_common_key_by_id, "email", @email) 
        end    
      end
      if @avatar_url.present?
        if $redis_cache.hget(owner_common_key, "avatar_url").nil?
          reset_owner_avatar_url
        else
          $redis_cache.hset(owner_common_key, "avatar_url", @avatar_url) 
          $redis_cache.hset(owner_common_key_by_id, "avatar_url", @avatar_url)
        end

      end
    end

    $redis_cache.hgetall(owner_common_key)
  end
  def reset_owner_id
    $redis_cache.hset(owner_common_key, "id", owner&.id) 
    $redis_cache.hset(owner_common_key_by_id, "id", owner&.id) 
  end

  def reset_owner_type 
    $redis_cache.hset(owner_common_key, "type", owner&.type) 
    $redis_cache.hset(owner_common_key_by_id, "type", owner&.type) 
  end

  def reset_owner_login 
    $redis_cache.hset(owner_common_key, "login", owner&.login) 
    $redis_cache.hset(owner_common_key_by_id, "login", owner&.login) 
  end

  def reset_owner_email 
    $redis_cache.hset(owner_common_key, "email", owner&.mail) 
    $redis_cache.hset(owner_common_key_by_id, "email", owner&.mail) 
  end

  def reset_owner_name 
    $redis_cache.hset(owner_common_key, "name", owner&.real_name) 
    $redis_cache.hset(owner_common_key_by_id, "name", owner&.real_name) 
  end

  def reset_owner_avatar_url 
    $redis_cache.hset(owner_common_key, "avatar_url", url_to_avatar(owner)) 
    $redis_cache.hset(owner_common_key_by_id, "avatar_url", url_to_avatar(owner)) 
  end

  def reset_owner_common
    clear_owner_common
    reset_owner_id
    reset_owner_type
    reset_owner_login
    reset_owner_email
    reset_owner_name
    reset_owner_avatar_url

    $redis_cache.hgetall(owner_common_key)
  end

  def clear_owner_common
    load_owner
    return if @owner.nil?
    $redis_cache.del(owner_common_key)
    $redis_cache.del(owner_common_key_by_id)
  end
end