require 'rails_helper'

RSpec.describe "sponsor_tiers/new", type: :view do
  before(:each) do
    assign(:sponsor_tier, SponsorTier.new(
      :tier => 1
    ))
  end

  it "renders new sponsor_tier form" do
    render

    assert_select "form[action=?][method=?]", sponsor_tiers_path, "post" do

      assert_select "input[name=?]", "sponsor_tier[tier]"
    end
  end
end
