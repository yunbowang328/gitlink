require 'rails_helper'

RSpec.describe "sponsor_tiers/show", type: :view do
  before(:each) do
    @sponsor_tier = assign(:sponsor_tier, SponsorTier.create!(
      :tier => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2/)
  end
end
