module Gitea
  class UpdateFileInteractor
    def self.call(token, owner, params={})
      interactor = new(token, owner, params)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(token, owner, params)
      @owner   = owner
      @token   = token
      @params = params
    end

    def success?
      @error.nil?
    end

    def result
      @result
    end

    def run
      Contents::UpdateForm.new(valid_params).validate!
      response = Gitea::Repository::Entries::UpdateService.new(token, owner, @params[:identifier], @params[:filepath], file_params).call
      render_result(response)
    rescue Exception => exception
      fail!(exception.message)
    end

    private

    attr_reader :params, :owner, :token

    def fail!(error)
      puts "[exception]: error"
      @error = error
    end

    def render_result(response)
      if response.status == 200
        @result = JSON.parse(response.body)
      end
    end

    def valid_params
      {
        filepath: @params[:filepath],
        branch: @params[:branch],
        new_branch: @params[:new_branch],
        sha: @params[:sha]
      }
    end

    def file_params
      Hash.new.merge(
        branch: @params[:branch],
        sha: @params[:sha],
        new_branch: @params[:new_branch],
        from_path: @params[:from_path],
        message: @params[:message],
        content: Base64.encode64(@params[:content])
      ).compact
    end
  end
end
