module Gitea
  class DeleteFileInteractor
    def self.call(token, owner, params={})
      interactor = new(token, owner, params)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(token, owner, params)
      @token  = token
      @owner   = owner
      @params = params
    end

    def success?
      @error.nil?
    end

    def result
      @result
    end

    def run
      Contents::DeleteForm.new(valid_params).validate!
      response = Gitea::Repository::Entries::DeleteService.new(token, owner, @params[:identifier], @params[:filepath], file_params).call
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
        sha: @params[:sha]
      }
    end

    def file_params
      Hash.new.merge(
        branch: @params[:branch],
        sha: @params[:sha],
        new_branch: @params[:new_branch],
        message: @params[:message],
      ).compact
    end
  end
end
