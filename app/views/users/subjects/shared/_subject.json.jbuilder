json.id subject.id
json.name subject.name
json.tag subject.repertoire&.name
json.image_url url_to_avatar(subject)
json.owner_id subject.user.id
json.owner_name subject.user.full_name
json.visits_count subject.visits
json.can_visited subject.can_visited?
