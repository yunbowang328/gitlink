class Ci::RemoteBase < ApplicationRecord
  self.abstract_class = true

  establish_connection Rails.configuration.database_configuration[Rails.env]["ci_server_db"]

  def generate_code
    [*'a'..'z',*'0'..'9',*'A'..'Z'].sample(32).join
  end
  
end
