# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rails g active_record:session_migration")
# Rails.application.config.session_store :active_record_store

# Be sure to restart your server when you modify this file.
Rails.application.config.session_store :cache_store, :expire_after => 24.hours, :httponly => true, :secure => false, key: '_educoder_session', domain: :all

