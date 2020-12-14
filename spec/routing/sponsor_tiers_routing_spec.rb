require "rails_helper"

RSpec.describe SponsorTiersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/api/sponsor_tiers").to route_to("sponsor_tiers#index")
    end

    it "routes to #show" do
      expect(:get => "/api/sponsor_tiers/1").to route_to("sponsor_tiers#show", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/api/sponsor_tiers").to route_to("sponsor_tiers#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/api/sponsor_tiers/1").to route_to("sponsor_tiers#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/api/sponsor_tiers/1").to route_to("sponsor_tiers#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/sponsor_tiers/1").to route_to("sponsor_tiers#destroy", :id => "1")
    end
  end
end
