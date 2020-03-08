require 'open-uri'

module Util
  module_function

  def days_between(time, other_time)
    raise ArgumentError if time.blank? || other_time.blank?
    Date.parse(time.to_s) - Date.parse(other_time.to_s)
  end

  def convert_base64_image(str, **opts)
    return if str.blank?

    Base64ImageConverter.new(**opts).convert(str)
  end

  def write_file(io, path)
    dir = File.dirname(path)
    FileUtils.mkdir_p(dir) unless File.directory?(dir)

    Rails.logger.info("### save file #{path}, size: #{io.size} ~")
    File.open(path, 'wb') do |file|
      if io.respond_to?(:read)
        io.rewind
        while buffer = io.read(8192)
          file.write(buffer)
        end
      else
        file.write(io)
      end
    end
  end

  def download_file(url, save_path)
    data = open(url, &:read)
    file = File.new(save_path, 'w+')
    file.binmode
    file << data
    file.flush
    file.close
    file
  end

  def logger_error(exception)
    Rails.logger.error(exception.message)
    exception.backtrace.each { |message| Rails.logger.error(message) }
  end

  def map_or_pluck(relation, name)
    relation.is_a?(Array) || relation.loaded? ? relation.map(&name.to_sym) : relation.pluck(name)
  end

  def extract_content(str)
    return '' if str.blank?
    str.gsub(/<\/?.*?>/, '').gsub(/[\n\t\r]/, '').gsub(/&nbsp;/, '')
  end

  def conceal(str, type = nil)
    str = str.to_s
    return if str.blank?

    case type
    when :phone then "#{str[0..2]}****#{str[-4..-1]}"
    when :email then "#{str[0]}***#{str[(str.rindex('@')-1)..-1]}"
    else "#{str[0..2]}***#{str[-3..-1]}"
    end
  end

  def display_cost_time(time)
    time = time.to_i
    return  if time.zero? || time < 60

    day = time / (24 * 60 * 60)
    hour = (time % (24 * 60 * 60)) / (60 * 60)
    minute = (time % (60 * 60)) / 60

    str = ''
    str += "#{day}天" unless day.zero?
    str += "#{hour}小时" unless hour.zero?
    str += "#{minute}分" unless minute.zero?
    str
  end
end