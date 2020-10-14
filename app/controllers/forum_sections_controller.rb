class ForumSectionsController < ApplicationController

  def index 
    targets = ForumSectionsService.new.index params
    render json: targets
  end

  def select_sections
    targets = ForumSectionsService.new.select_sections
    render json: targets
  end

  def user_apply
    targets = ForumSectionsService.new.user_apply params, current_user, current_user_ip
    render json: targets
  end

  def edit_notice
    targets = ForumSectionsService.new.edit_notice params
    render json: targets
  end

  def forum_section_header
    targets = ForumSectionsService.new.forum_section_header params, current_user
    render json: targets
  end

  def create 
    targets = ForumSectionsService.new.create params, current_user
    render json: targets
  end

  def rename 
    targets = ForumSectionsService.new.rename params, current_user
    render json: targets
  end

  def destroy_forum 
    targets = ForumSectionsService.new.destroy params, current_user
    render json: targets
  end

  def order_forums
    targets = ForumSectionsService.new.order_forums params, current_user
    render json: targets
  end

  def search_users
    targets = ForumSectionsService.new.search_users params, current_user
    render json: targets
  end

  def add_users
    targets = ForumSectionsService.new.add_users params, current_user
    render json: targets
  end

  def managements
    targets = ForumSectionsService.new.managements params, current_user
    render json: targets
  end

  def applied_forums
    targets = ForumSectionsService.new.applied_forums params, current_user
    render json: targets
  end

  def deal_applies
    targets = ForumSectionsService.new.deal_applies params, current_user
    render json: targets
  end

  def destroy_moderator
    targets = ForumSectionsService.new.destroy_moderator params, current_user
    render json: targets
  end

  def unchecked_memos
    targets = ForumSectionsService.new.unchecked_memos params, current_user
    render json: targets
  end

  def unchecked_replies
    targets = ForumSectionsService.new.unchecked_replies params, current_user
    render json: targets
  end

  def checked_memos
    targets = ForumSectionsService.new.checked_memos params, current_user
    render json: targets
  end

  private 

  def current_user_ip
    env['REMOTE_ADDR']
  end



end