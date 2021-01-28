module Repository::LanguagesPercentagable
  extend ActiveSupport::Concern

  def languages_precentagable
    result = Gitea::Repository::Languages::ListService.call(@owner.login,
      @repository.identifier, current_user&.gitea_token)

    result[:status] === :success ? hash_transform_precentagable(result[:body]) : nil
  end

  # hash eq:{"JavaScript": 301681522,"Ruby": 1444004,"Roff": 578781}
  def hash_transform_precentagable(hash)
    total_byte_size = hash.values.sum
    hash.transform_values { |v|
      ActionController::Base.helpers
        .number_to_percentage((v * 100.0 / total_byte_size), precision: 1)
    }
  end
end
