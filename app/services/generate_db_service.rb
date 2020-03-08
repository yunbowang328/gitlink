class GenerateDbService
  def initialize
  end

  def self.call(dir_url, key)
    if File::directory? dir_url
      Dir.entries(dir_url).each { |sub|
        if sub != '.' && sub != '..'
          puts "#{key} name: #{sub}"
          file_path = File.join(dir_url, sub)
          puts "#{key} path: #{file_path}"
          file_content = File.read(file_path)
          key.classify.constantize.find_or_create_by(name: sub, content: file_content)
        end
      }
    end
  end
end
