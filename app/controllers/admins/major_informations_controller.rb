class Admins::MajorInformationsController < Admins::BaseController

  def index
    disciplines = EcDiscipline.includes(ec_discipline_firsts: {ec_majors: :schools}).order("ec_disciplines.code asc")
    @disciplines = paginate disciplines
  end

end