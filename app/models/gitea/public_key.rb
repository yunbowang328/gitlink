class Gitea::PublicKey < Gitea::Base
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  # establish_connection :gitea_db
  
  self.table_name = "public_key"

  belongs_to :user, class_name: '::User', foreign_key: :gitea_uid, primary_key: :owner_id, optional: true

end
