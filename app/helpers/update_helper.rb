module UpdateHelper
  def old_value_to_hash(old_value, params)
    params = params.dup.stringify_keys
    old_value.attributes.select { |key, value| params.key?(key) }
  end
end