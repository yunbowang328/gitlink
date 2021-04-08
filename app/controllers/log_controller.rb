class LogController < ApplicationController
  def list
    path = "#{Rails.root}/log"
    @file_list = []
    Dir.foreach(path) do |file|
      @file_list << file
    end
    @file_list = @file_list.sort
  end

  def download
    path = "#{Rails.root}/log/#{params[:filename]}"
    if params[:filename] && File.exist?(path) && File.file?(path)
      send_file(path, filename: params[:filename])
    else
      render json: { message: 'no such file!' }
    end
  end
end
