require 'rails_helper'

RSpec.describe "sponsor_tiers/index", type: :view do
  before(:each) do
    assign(:sponsor_tiers, [
      SponsorTier.create!(
        :tier => 2
      ),
      SponsorTier.create!(
        :tier => 2
      )
    ])
  end

  it "renders a list of sponsor_tiers" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
