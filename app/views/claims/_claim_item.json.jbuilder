json.user_name claimer.user.try(:show_real_name)
json.user_login claimer.user.try(:login)
json.user_picture url_to_avatar(claimer.user)
json.created_at time_from_now(claimer.created_at)
json.note_body claimer.note
json.claim_id claimer.id
json.visible false