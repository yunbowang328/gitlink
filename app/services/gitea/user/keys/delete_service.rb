class Gitea::User::Keys::DeleteService < Gitea::ClientService
  attr_reader :token, :key_id

  def initialize(token, key_id)
    @token = token
    @key_id = key_id
  end

  def call
    delete(url, params)
  end

  private

  def params
    Hash.new.merge(token: token)
  end

  def url
    "/user/keys/#{key_id}".freeze
  end
end
