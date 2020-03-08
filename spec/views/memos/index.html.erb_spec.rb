require 'rails_helper'

RSpec.describe "memos/index", type: :view do
  before(:each) do
    assign(:memos, [
      Memo.create!(),
      Memo.create!()
    ])
  end

  it "renders a list of memos" do
    render
  end
end
