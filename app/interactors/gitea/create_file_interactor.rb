module Gitea
  class CreateFileInteractor
    def self.call(user, params={})
      interactor = new(user, params)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(user, params)
      @user   = user
      @params = params
    end

    def success?
      @error.nil?
    end

    def result
      @result
    end

    def run
      Contents::CreateForm.new(valid_params).validate!
      response = Gitea::Repository::Entries::CreateService.new(user, @params[:identifier], @params[:filepath], file_params).call
      render_result(response)
    rescue Exception => exception
      Rails.logger.info "Exception ===========> #{exception.message}"
      fail!(exception.message)
    end


    private

    attr_reader :params, :user

    def fail!(error)
      @error = error
    end

    def render_result(response)
      @result = response
    end

    def valid_params
      {
        filepath: @params[:filepath],
        branch: @params[:branch],
        new_branch: @params[:new_branch]
      }
    end

    def file_params
      file_params = {}
      file_params = file_params.merge(branch: @params[:branch]) unless @params[:branch].blank?
      file_params = file_params.merge(new_branch: @params[:new_branch]) unless @params[:new_branch].blank?
      file_params = file_params.merge(content: Base64.encode64(@params[:content]))
      file_params = file_params.merge(message: @params[:message]) unless @params[:message].blank?
      file_params
    end
  end
end
