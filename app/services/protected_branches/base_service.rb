module ProtectedBranches
  class BaseService < ApplicationService
    include ProtectedBranchParamsAble

    Error = Class.new(StandardError)
    attr_accessor :repository, :owner, :params

    def initialize(repository, user = nil, params = {})
      @repository, @owner, @params = repository, user, params.dup
    end

    # delegate :repository, to: :project
  end

  def error(errors, award: nil, status: nil)
    errors = Array.wrap(errors)

    super(errors.to_sentence.presence, status).merge({
      award: award,
      errors: errors
    })
  end
end
