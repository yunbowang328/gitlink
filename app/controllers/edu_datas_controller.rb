class EduDatasController < ApplicationController
  before_action :find_game
  skip_before_action :user_setup
  skip_before_action :setup_laboratory
  # layout :false
  include GitHelper

  # params[:game_id]
  def game
    @shixun = @challenge.shixun
    @shixun_env = @shixun.mirror_name
    @shixun_tags = @challenge.challenge_tags.map(&:name)
  end

  def code_lines
    path = @challenge.path
    myshixun = @game.myshixun
    # content = git_fle_content(myshixun.repo_path, path) || ""
    @content = {"content":"#coding=utf-8\n\n#请在此处添加代码完成输出“Hello Python”,注意要区分大小写！\n###### Begin ######\n\n\n\n###### End ######\n\n"}
    @content[:content].include?("Begin")
  end

  private
  def find_game
    game_id = params[:game_id]
    @game = Game.find(game_id)
    @challenge = @game.challenge
  end
end
