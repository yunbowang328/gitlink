require 'rails_helper'

RSpec.describe "edu_settings/show", type: :view do
  before(:each) do
    @edu_setting = assign(:edu_setting, EduSetting.create!(
      :name => "Name",
      :value => "Value"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Value/)
  end
end
