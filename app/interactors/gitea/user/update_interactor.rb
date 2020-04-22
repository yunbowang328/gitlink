module Gitea::User
  class UpdateInteractor
    def self.call(username, params={})
      interactor = new(username, params)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(username, params)
      @username = username
      @params  = params
    end

    def success?
      @error.nil?
    end

    def result
      @result
    end

    def run
      Gitea::User::UpdateForm.new(valid_params).validate!
      response = Gitea::User::UpdateService.new(username, params).call
      render_result(response)
    rescue Exception => exception
      Rails.logger.info "Exception ===========> #{exception.message}"
      fail!(exception.message)
    end


    private
    attr_reader :params, :username

    def fail!(error)
      @error = error
    end

    def render_result(response)
      @result = response
    end

    def valid_params
      @params.merge(username: username)
    end
  end
end
