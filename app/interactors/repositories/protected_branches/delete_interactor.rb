module Repositories::ProtectedBranches
  class DeleteInteractor
    def self.call(user, identifier, filepath, **args)
      interactor = new(user, identifier, filepath, **args)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(user, identifier, filepath, **args)
      @user = user
      @identifier = identifier
      @filepath = filepath
      @args = args
    end

    def success?
      @error.nil?
    end

    def result
    end

    def run

    rescue Exception => exception
      fail!(exception.message)
    end


    private

    attr_reader :user, :identifier, :filepath, :args

    def fail!(error)
      @error = error
    end

    def render_result(response)
      @result = response
    end
  end
end
