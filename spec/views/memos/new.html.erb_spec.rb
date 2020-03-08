require 'rails_helper'

RSpec.describe "memos/new", type: :view do
  before(:each) do
    assign(:memo, Memo.new())
  end

  it "renders new memo form" do
    render

    assert_select "form[action=?][method=?]", memos_path, "post" do
    end
  end
end
