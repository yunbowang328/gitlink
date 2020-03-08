require 'rails_helper'

RSpec.describe "edu_settings/new", type: :view do
  before(:each) do
    assign(:edu_setting, EduSetting.new(
      :name => "MyString",
      :value => "MyString"
    ))
  end

  it "renders new edu_setting form" do
    render

    assert_select "form[action=?][method=?]", edu_settings_path, "post" do

      assert_select "input[name=?]", "edu_setting[name]"

      assert_select "input[name=?]", "edu_setting[value]"
    end
  end
end
