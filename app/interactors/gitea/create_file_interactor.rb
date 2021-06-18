module Gitea
  class CreateFileInteractor
    def self.call(token, owner, params={})
      interactor = new(token, owner, params)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(token, owner, params)
      @token  = token
      @owner  = owner
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
      result = Gitea::Repository::Entries::CreateService.call(token, 
        owner, @params[:identifier], @params[:filepath], file_params)

      if result[:status] == :success
        @result = result[:body]
      else
        fail!(result[:message])
      end
    rescue Exception => exception
      Rails.logger.info "Exception ===========> #{exception.message}"
      fail!(exception.message)
    end


    private

    attr_reader :params, :owner, :token

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
        new_branch: @params[:new_branch],
        content: @params[:content]
      }
    end

    def file_params
      file_params = {}
      file_params = file_params.merge(branch: @params[:branch]) unless @params[:branch].blank?
      file_params = file_params.merge(new_branch: @params[:new_branch]) unless @params[:new_branch].blank?
      file_params = file_params.merge(content: Base64.encode64(@params[:content]))
      file_params = file_params.merge(message: @params[:message]) unless @params[:message].blank?
      file_params = file_params.merge(committer: @params[:committer])
      file_params
    end
  end
end
