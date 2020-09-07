module DunCheckImageAble
  extend ActiveSupport::Concern

  included do
    def self.check_image_able(file)
      return {status: 1}
      # original_filename = file.original_filename
      # file_extention = original_filename.split(".").last
      # check_include = %w(jpg png bmp gif webp tiff jpeg)
      
      # if file_extention && check_include.include?(file_extention)
      #   base64_file = Base64.encode64(file.open.read.force_encoding(Encoding::UTF_8))
      #   check_params = [
      #     {
      #       name: original_filename,
      #       type: 2,
      #       data: base64_file,
      #     }
      #   ]
      #   check_result = DunCheck::ImageCheck.new(check_params).call
      #   if check_result[:status].to_i == -1
      #     return {status: -1, message: check_result[:message]}
      #   else
      #     return {status: 1}
      #   end
      # else
      #   return {status: 1}
      # end
    end
  end

  

end
