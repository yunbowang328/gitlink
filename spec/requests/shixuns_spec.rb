require "rails_helper"


RSpec.describe "实训页面测试", type: :request do

  context "实训首页" do
    it "默认参数" do
      ecget shixuns_url
      expect(JSON.parse(response.body).size).to be > 0
    end


    it "分类选择" do
      ecget shixuns_url, {tag_level: 1, tag_id: 1}
      expect(JSON.parse(response.body).size).to be > 0
    end

    it "搜索关键字" do
      keyword = "abc"
      ecget shixuns_url, {keyword: keyword}

      shixuns = JSON.parse(response.body)
      expect(shixuns.size).to be > 0
    end

    it "筛选 状态" do
      ecget shixuns_url, {status: 2}
      shixuns = JSON.parse(response.body)
      expect(shixuns.size).to be > 0
    end

    it "筛选 难度" do
      ecget shixuns_url, {diff: 1}
      expect(JSON.parse(response.body).size).to be > 0
    end

    it "是否隐藏我的实训" do
      ecget shixuns_url, {hidemy: true}
      expect(JSON.parse(response.body).size).to be > 0
    end

    it "排序参数" do
      ecget shixuns_url, {order_by: "hot"}
      expect(JSON.parse(response.body)[0]["id"]).to eq(70)
    end

    it "分页参数" do
      ecget shixuns_url, {page: 1, limit: 5}
      expect(JSON.parse(response.body).size).to eq(5)
    end
  end


  it "获取顶部菜单" do
    ecget menus_shixuns_url
    expect(JSON.parse(response.body).size).to be > 0
  end


  it "实训详情" do
    ecget shixun_url(identifier: 'WQ9ROKFX')
    expect(JSON.parse(response.body)["identifier"]).to eq('WQ9ROKFX')
  end


  it "排行榜" do
    ecget ranking_list_shixun_url(identifier: 'nf9ja46l')
    expect(JSON.parse(response.body).size).to be > 0
  end

  it "评论" do
    ecget discusses_shixun_url(identifier: 'nf9ja46l')
    expect(JSON.parse(response.body).size).to be > 0
  end

  it "任务" do
    ecget tasks_shixun_url(identifier: 'nf9ja46l')
    expect(JSON.parse(response.body).size).to be > 0
  end

  it "合作者" do
    ecget collaborators_shixun_url(identifier: 'WQ9ROKFX')
    expect(JSON.parse(response.body).size).to be > 0
  end
end
