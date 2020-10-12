# if Rails.env.development?
#   lib_ruby_files = Dir.glob(File.join("app/api/**", "*.rb"))
#   lib_reloader ||= ActiveSupport::FileUpdateChecker.new(lib_ruby_files) do
#     # lib_ruby_files.each do |lib_file|
#     #   puts "start require #{lib_file}"
#     #   require_dependency(lib_file) 
#     # end
#     #

#     # binding.pry
#     # if Object.const_defined?(:Mobile)
#     #   Object.send(:remove_const, :Mobile)
#     # end
#     #
#     # $".delete_if {|s| s.include?('api/mobile') }
#     # require File.join(Rails.root,"app/api/mobile/api.rb")
#     Rails.application.reload_routes!
#   end

#   ActionDispatch::Callbacks.to_prepare do
#     lib_reloader.execute_if_updated
#   end

# end


