
module Gitea
  module Repository
    class GetBranchAndTagTotalNumService < Gitea::ClientService
      attr_reader :owner, :repo, :token

      def initialize(owner, repo, token=nil)
        @owner = owner
        @repo  = repo
        @token = token
      end

      def call
        response = get(url, params)
        render_result(response)
      end

      private
      def params
        Hash.new.merge(token: token)
      end

      def url
        "/repos/#{owner}/#{repo}/branch_tag_count".freeze
      end

      def render_result(response)
        case response.status
        when 200
          JSON.parse(response.body)
        else
          {}
        end
      end
    end
  end
end
