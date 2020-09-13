require "rails_helper"

RSpec.describe SponsorTiersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/sponsor_tiers").to route_to("sponsor_tiers#index")
    end

    it "routes to #new" do
      expect(:get => "/sponsor_tiers/new").to route_to("sponsor_tiers#new")
    end

    it "routes to #show" do
      expect(:get => "/sponsor_tiers/1").to route_to("sponsor_tiers#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/sponsor_tiers/1/edit").to route_to("sponsor_tiers#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/sponsor_tiers").to route_to("sponsor_tiers#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/sponsor_tiers/1").to route_to("sponsor_tiers#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/sponsor_tiers/1").to route_to("sponsor_tiers#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/sponsor_tiers/1").to route_to("sponsor_tiers#destroy", :id => "1")
    end
  end
end
