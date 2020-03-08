json.user_account @user.phone.present? ? @user.phone : (@user.mail.present? ? @user.mail : @user.login)
