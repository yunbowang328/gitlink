class DevOps::LanguagesController < ApplicationController
  # TODO 需要开启权限认证，只有该项目devops初始化成功后才能获取语言列表
  before_action :require_login
  before_action :find_langugae, only: :show

  def index
    @languages = DevOps::Language.by_usage_amount_desc
  end

  def show
  end

  def common
    @languages = DevOps::Language.six_common
  end

  private
    def find_langugae
      @language = DevOps::Language.find params[:id]
    end
end
