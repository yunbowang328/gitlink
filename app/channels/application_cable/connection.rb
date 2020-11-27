module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.id
    end

    private
      def find_verified_user
        puts "############### cookies.signed[:user_id]: #{cookies.signed[:user_id]}"
        if current_user = User.find_by(id: cookies.signed[:user_id])
          puts "############### find_verified_user success! ###############"
          current_user
        else
          reject_unauthorized_connection
        end
      end
  end
end
