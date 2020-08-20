class Ci::RemoteBase < ApplicationRecord
  self.abstract_class = true

  establish_connection Rails.configuration.database_configuration[Rails.env]["ci_server_db"]


end
