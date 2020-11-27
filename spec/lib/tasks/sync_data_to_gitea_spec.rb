require 'rails_helper'
require 'rake'

# RSpec.describe CommitExercsieNotifyJobJob, type: :job do
#   pending "add some examples to (or delete) #{__FILE__}"
# end





describe "test tasks" do
  before :all do
    @rake = Rake::Application.new
    Rake.application = @rake
    Rake.application.rake_require 'lib/tasks/sync_data_to_gitea', [Rails.root.to_s]
    Rake::Task.define_task :environment
  end

  describe "demo:test" do
    it"runs" do
      @rake["sync_data_to_gitea:users"].invoke
    end
  end
end
