module Repositories
  class GetInteractor
    def self.call(user, repo)
      interactor = new(user, repo)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(user, repo)
      @user = user
      @repo = repo
    end

    def success?
      @error.nil?
    end

    def result
      @result
    end

    def run
      @result = Gitea::Repository::GetService.new(@user, @repo.identifier).call
    rescue Exception => exception
      fail!(exception.message)
    end

    private

    attr_reader :user, :repo

    def fail!(error)
      @error = error
    end

  end
end
