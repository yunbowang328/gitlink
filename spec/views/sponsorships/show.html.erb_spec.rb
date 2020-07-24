require 'rails_helper'

RSpec.describe "sponsorships/show", type: :view do
  before(:each) do
    @sponsorship = assign(:sponsorship, Sponsorship.create!(
      :amount => 2,
      :visible => 3,
      :sponsor_id => 4,
      :developer_id => 5
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4/)
    expect(rendered).to match(/5/)
  end
end
