require 'rails_helper'

RSpec.describe "Sponsorships", type: :request do
  let(:valid_session) { {www_user_id: 5} }

  describe "GET /sponsorships" do
    it "works! (now write some real specs)" do
      get sponsorships_path
      expect(response).to have_http_status(200)
    end
  end

end
