require 'rails_helper'

RSpec.describe "sponsorships/index", type: :view do
  before(:each) do
    assign(:sponsorships, [
      Sponsorship.create!(
        :amount => 2,
        :visible => 3,
        :sponsor_id => 4,
        :developer_id => 5
      ),
      Sponsorship.create!(
        :amount => 2,
        :visible => 3,
        :sponsor_id => 4,
        :developer_id => 5
      )
    ])
  end

  it "renders a list of sponsorships" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => 5.to_s, :count => 2
  end
end
