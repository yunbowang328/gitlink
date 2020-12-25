module Gitea
  class RegisterInteractor
    def self.call(params)
      interactor = new(params)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(params)
      @params = params
    end

    def success?
      @error.nil?
    end

    def result
      @result
    end

    def run
      Gitea::UserForm.new(params).validate!
      response = Gitea::User::RegisterService.call(params.merge(token: token))
      render_result(response)
    rescue Exception => exception
      Rails.logger.info "Exception ===========> #{exception.message}"
      fail!(exception.message)
    end


    private

    attr_reader :params

    def fail!(error)
      @error = error
    end

    def render_result(response)
      @result = response
    end

    def token
      {
        username: Gitea.gitea_config[:access_key_id],
        password: Gitea.gitea_config[:access_key_secret]
      }
    end
  end
end
