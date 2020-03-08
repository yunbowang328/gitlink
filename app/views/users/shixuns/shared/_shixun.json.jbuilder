json.id shixun.id
json.identifier shixun.identifier
json.tag shixun.first_tag_repertoire&.name
json.image_url url_to_avatar(shixun)
json.name shixun.name
json.status shixun.status
json.human_status shixun.human_status
json.challenges_count shixun.challenges_count
json.finished_challenges_count @finished_challenges_count_map&.fetch(shixun.id, 0) || shixun.finished_challenges_count(user)
json.is_jupyter shixun.is_jupyter