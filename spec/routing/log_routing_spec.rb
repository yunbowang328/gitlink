require "rails_helper"

RSpec.describe LogController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/api/log/list").to route_to("log#list")
    end
  end
end

