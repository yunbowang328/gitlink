class Cache::V2::OwnerCommonService < ApplicationService 
  include AvatarHelper
  attr_reader :owner_id, :login, :name, :avatar_url, :email
  attr_accessor :owner

  def initialize(login, email, params={})
    @login = login
    @email = email
    @name = params[:name]
  end

  def read  
    owner_common
  end

  def call 
    load_owner
    set_owner_common
  end

  def reset 
    reset_owner_common
  end

  private 
  def load_owner 
    @owner = User.find_by(login: @login)
  end

  def owner_common_key
    "v2-owner-common:#{@login}-#{@email.to_s}"
  end

  def owner_common_key_by_id
    "v2-owner-common:#{@owner.id}"
  end

  def owner_common
    $redis_cache.hgetall(owner_common_key).blank? ? reset_owner_common : $redis_cache.hgetall(owner_common_key)
  end

  def set_owner_common
    if $redis_cache.hgetall(owner_common_key).blank?
      reset_owner_common
      return
    end
    if @name.present?
      if $redis_cache.hget(owner_common_key, "name").nil?
        reset_owner_name
      else
        $redis_cache.hset(owner_common_key, "name", @name) 
        $redis_cache.hset(owner_common_key, "avatar_url", url_to_avatar(owner)) 

        $redis_cache.hset(owner_common_key_by_id, "name", @name) 
        $redis_cache.hset(owner_common_key_by_id, "avatar_url", url_to_avatar(owner)) 
      end
    end
    if @email.present?
      if $redis_cache.hget(owner_common_key, "email").nil?
        reset_owner_email
      else
        $redis_cache.hset(owner_common_key, "email", @email) 
        $redis_cache.hset(owner_common_key_by_id, "email", @email) 
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
    $redis_cache.hset(owner_common_key, "avatar_url", url_to_avatar(owner)) 
    $redis_cache.hset(owner_common_key_by_id, "name", owner&.real_name) 
    $redis_cache.hset(owner_common_key_by_id, "avatar_url", url_to_avatar(owner)) 
  end

  def reset_owner_common
    load_owner
    $redis_cache.del(owner_common_key)
    reset_owner_id
    reset_owner_type
    reset_owner_login
    reset_owner_email
    reset_owner_name

    $redis_cache.hgetall(owner_common_key)
  end
end