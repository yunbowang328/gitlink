require 'rails_helper'

RSpec.describe WalletsController, type: :controller do

  describe "GET #balance" do
    it "returns http success" do
      get :balance
      expect(response).to have_http_status(:success)
    end
  end

end
