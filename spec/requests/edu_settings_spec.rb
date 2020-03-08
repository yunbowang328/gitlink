require 'rails_helper'

RSpec.describe "EduSettings", type: :request do
  describe "GET /edu_settings" do
    it "works! (now write some real specs)" do
      get edu_settings_path
      expect(response).to have_http_status(200)
    end
  end
end
