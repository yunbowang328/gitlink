class MigrateUserLocation < ActiveRecord::Migration[5.2]
  def change
    # UserExtension.where("location like '%省'").each do |ue|
    #   ue.update_column("location", ue.location.chop)
    # end

    # UserExtension.where("location_city like '%市'").each do |ue|
    #   ue.update_column("location_city", ue.location_city.chop)
    # end
  end
end
