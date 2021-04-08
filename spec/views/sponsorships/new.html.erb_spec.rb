require 'rails_helper'

RSpec.describe "sponsorships/new", type: :view do
  before(:each) do
    assign(:sponsorship, Sponsorship.new(
      :amount => 1,
      :visible => 1,
      :sponsor_id => 1,
      :developer_id => 1
    ))
  end

  it "renders new sponsorship form" do
    render

    assert_select "form[action=?][method=?]", sponsorships_path, "post" do

      assert_select "input[name=?]", "sponsorship[amount]"

      assert_select "input[name=?]", "sponsorship[visible]"

      assert_select "input[name=?]", "sponsorship[sponsor_id]"

      assert_select "input[name=?]", "sponsorship[developer_id]"
    end
  end
end
