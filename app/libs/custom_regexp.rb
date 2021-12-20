module CustomRegexp
  PHONE = /1\d{10}/
  EMAIL = /\A[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+\z/
  LOGIN = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  LASTNAME = /\A[a-zA-Z0-9\u4e00-\u9fa5]+\z/
  NICKNAME = /\A[\u4e00-\u9fa5_a-zA-Z0-9]+\z/
  PASSWORD = /\A[a-z_A-Z0-9\-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'_<>~\·`\?:;|]{8,16}\z/
  LOGIN_PASSWORD = /\A[a-z_A-Z0-9\-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'_<>~\·`\?:;|]{6,16}\z/
  URL = /\Ahttps?:\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]\z/
  IP = /^((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

  URL_REGEX = /\A(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?\z/i
  REPOSITORY_NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  
end
