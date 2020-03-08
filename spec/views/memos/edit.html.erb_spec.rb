require 'rails_helper'

RSpec.describe "memos/edit", type: :view do
  before(:each) do
    @memo = assign(:memo, Memo.create!())
  end

  it "renders the edit memo form" do
    render

    assert_select "form[action=?][method=?]", memo_path(@memo), "post" do
    end
  end
end
