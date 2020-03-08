require 'rails_helper'

RSpec.describe "edu_settings/edit", type: :view do
  before(:each) do
    @edu_setting = assign(:edu_setting, EduSetting.create!(
      :name => "MyString",
      :value => "MyString"
    ))
  end

  it "renders the edit edu_setting form" do
    render

    assert_select "form[action=?][method=?]", edu_setting_path(@edu_setting), "post" do

      assert_select "input[name=?]", "edu_setting[name]"

      assert_select "input[name=?]", "edu_setting[value]"
    end
  end
end
