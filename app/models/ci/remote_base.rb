class Ci::RemoteBase < Ci::Database
  self.abstract_class = true

  def generate_code
    [*'a'..'z',*'0'..'9',*'A'..'Z'].sample(32).join
  end

end
