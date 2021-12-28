class AddTeamUserToMembers < ActiveRecord::Migration[5.2]
  def change
    add_reference :members, :team_user
  end
end
