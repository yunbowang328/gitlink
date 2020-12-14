require "rails_helper"

RSpec.describe SponsorshipsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/api/sponsorships").to route_to("sponsorships#index")
    end

    it "routes to stopped" do
      expect(:get => "/api/sponsorships/stopped").to route_to("sponsorships#stopped")
    end

    it "routes to sponsoring" do
      expect(:get => "/api/sponsorships/sponsoring").to route_to("sponsorships#sponsoring")
    end

    it "routes to stopped_sponsoring" do
      expect(:get => "/api/sponsorships/stopped_sponsoring").to route_to("sponsorships#stopped_sponsoring")
    end

    it "routes to sponsored" do
      expect(:get => "/api/sponsorships/sponsored").to route_to("sponsorships#sponsored")
    end

    it "routes to stopped_sponsored" do
      expect(:get => "/api/sponsorships/stopped_sponsored").to route_to("sponsorships#stopped_sponsored")
    end

    it "routes to #show" do
      expect(:get => "/api/sponsorships/1").to route_to("sponsorships#show", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/api/sponsorships").to route_to("sponsorships#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/api/sponsorships/1").to route_to("sponsorships#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/api/sponsorships/1").to route_to("sponsorships#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/sponsorships/1").to route_to("sponsorships#destroy", :id => "1")
    end
  end
end
