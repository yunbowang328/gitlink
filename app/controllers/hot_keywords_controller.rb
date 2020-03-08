class HotKeywordsController < ApplicationController
  def index
    keywords = []
    keywords = HotSearchKeyword.hot(8) if HotSearchKeyword.available?
    render_ok(keywords: keywords)
  end
end