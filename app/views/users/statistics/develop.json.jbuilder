json.platform do 
  json.influence @platform_influence
  json.contribution @platform_contribution
  json.activity @platform_activity
  json.experience @platform_experience
  json.language @platform_language
  json.languages_percent @platform_languages_percent
  json.each_language_score @platform_each_language_score
end

json.user do 
  json.influence @influence
  json.contribution @contribution
  json.activity @activity
  json.experience @experience
  json.language @language
  json.languages_percent @languages_percent
  json.each_language_score @each_language_score
end