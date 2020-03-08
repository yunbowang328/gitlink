json.extract! observed_user, :id, :nickname, :show_realname

json.phone observed_user.hidden_phone
json.mail observed_user.hidden_mail
json.avatar_url url_to_avatar(observed_user)
user = ActiveDecorator::Decorator.instance.decorate(observed_user)
json.name user.name
json.authentication user.authentication_status
json.professional_certification user.professional_certification_status

extension = observed_user.user_extension
json.gender extension&.gender
json.location extension&.location
json.location_city extension&.location_city

json.identity extension&.identity
json.technical_title extension&.technical_title
json.student_id extension&.student_id

json.school_id extension&.school_id
json.school_name extension&.school&.name

json.department_id extension&.department_id
json.department_name extension&.department&.name

json.base_info_completed user.profile_completed?
json.all_certified user.all_certified?

json.has_password user.hashed_password.present?

json.open_users do
  json.array! user.open_users do |open_user|
    json.extract! open_user, :id, :en_type, :nickname
  end
end
