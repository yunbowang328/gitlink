require 'rails_helper'

RSpec.describe "memos/show", type: :view do
  before(:each) do
    @memo = assign(:memo, Memo.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
