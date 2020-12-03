module Ci
  class Database < ActiveRecord::Base
    self.abstract_class = true
    
    # Dynamically sets the database connection.
    def self.set_connection(params)
      puts "[Ci::Database] set db connection params: #{params}"
      establish_connection(
        adapter: params[:adapter],
        database: params[:database],
        port: params[:port].to_i,
        host: params[:host],
        username: params[:username],
        password: params[:password],
        encoding: "utf8"
      )
    end

    def self.get_connection_params(connect_to)
      params = Hash.new
      params[:adapter]  = "mysql2"
      params[:host]     = connect_to[:host].to_s
      params[:username] = connect_to[:username].to_s
      params[:password] = connect_to[:password].to_s
      params[:database] = connect_to[:database].to_s
      params[:port]     = connect_to[:port] || "43306"
      params[:encoding] = "utf8"
      return params
    end
  end
end
