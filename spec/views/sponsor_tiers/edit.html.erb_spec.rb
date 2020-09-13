require 'rails_helper'

RSpec.describe "sponsor_tiers/edit", type: :view do
  before(:each) do
    @sponsor_tier = assign(:sponsor_tier, SponsorTier.create!(
      :tier => 1
    ))
  end

  it "renders the edit sponsor_tier form" do
    render

    assert_select "form[action=?][method=?]", sponsor_tier_path(@sponsor_tier), "post" do

      assert_select "input[name=?]", "sponsor_tier[tier]"
    end
  end
end
