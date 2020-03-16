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
      response = Gitea::User::RegisterService.new(params).call
      render_result(response)
    rescue Exception => exception
      Rails.logger.info "Exception ===========> #{exception.message}"
      failed_dic = "public/sync_failed_users.dic"
      File.open(failed_dic,"a") do |file|
        file.puts "user_info---#{params},errors--#{exception.message}"
      end
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
  end
end
