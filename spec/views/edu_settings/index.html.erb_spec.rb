require 'rails_helper'

RSpec.describe "edu_settings/index", type: :view do
  before(:each) do
    assign(:edu_settings, [
      EduSetting.create!(
        :name => "Name",
        :value => "Value"
      ),
      EduSetting.create!(
        :name => "Name",
        :value => "Value"
      )
    ])
  end

  it "renders a list of edu_settings" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Value".to_s, :count => 2
  end
end
