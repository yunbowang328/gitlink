class TrustieHackathon < ApplicationRecord
  #validates_length_of :description, maximum: 10000
  has_many :trustie_hacks, :dependent => :destroy

end
