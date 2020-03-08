class Gitea::RepositoryInteractor
  attr_reader :error

  # params: token and repository
  def self.call(token, repository)
    interactor = new(token, repository)
    interactor.run
    interactor
  end

  def initialize(token, repository)
    @token = token
    @repository = repository
  end

  def success?
    @error.nil?
  end

  def run
    Gitea::RepositoryForm.new({name: repository&.name}).validate!
    Gitea::Repository::CreateService.new(token, repository).call
  rescue Exception => exception
    puts exception.message
    fail!(exception.message)
  end

  private

  attr_reader :token, :repository

  def fail!(error)
    @error = error
  end
end
