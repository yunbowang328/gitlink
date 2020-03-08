# 执行示例  bundle exec rake zip_pack:shixun_pack class=Course ids=123,2323 parallel_size=4
# 执行示例  bundle exec rake zip_pack:shixun_pack class=HomeworkCommon ids=123,2323
namespace :zip_pack do
  desc "手工打包作品"
  OUTPUT_FOLDER = "#{Rails.root}/files/archiveZip"

  task :shixun_pack => :environment do

    if ENV['class'] && ENV['ids']
      parallel_size = ENV['parallel_size'] || 2
      parallel_size = parallel_size.to_i
      env_ids = ENV['ids'].split(",").map(&:to_i)
      folders = []
      if ENV['class'] == "Course"
        courses = Course.where(id: env_ids)
        courses.each do |course|
          homeworks = course.practice_homeworks.homework_published
          new_dir_name = "#{course.name.to_s.strip}_#{Time.now.strftime("%Y%m%d%H%M%S").to_s}"
          new_dir_name.gsub!(" ", "-")
          new_dir_name.gsub!("/", "_")
          new_folder = "#{OUTPUT_FOLDER}/#{new_dir_name}"
          zip_homework_pdf homeworks, new_folder, parallel_size
          folders << new_folder
        end
      else
        homeworks = HomeworkCommon.where(id: env_ids)
        new_dir_name = "#{homeworks.first&.course&.name.to_s.strip}_#{Time.now.strftime("%Y%m%d%H%M%S").to_s}"
        new_dir_name.gsub!(" ", "-")
        new_dir_name.gsub!("/", "_")
        new_folder = "#{OUTPUT_FOLDER}/#{new_dir_name}"
        zip_homework_pdf homeworks, new_folder, parallel_size
        folders << new_folder
      end

      puts "下载路径: #{folders.join(",")}"
    end
  end

  def zip_homework_pdf homeworks, folder, parallel_size
    Dir.mkdir(folder) unless File.directory?(folder)

    homeworks.includes(:score_student_works).each do |homework|
      out_file_name = "#{Time.now.strftime("%Y%m%d%H%M%S").to_s}-#{homework.course_id}-#{homework.name}.zip"
      out_file_name.gsub!(" ", "-")
      out_file_name.gsub!("/", "_")

      zipfile_name = "#{folder}/#{out_file_name}"

      student_works = homework.score_student_works

      if student_works.size > 0
        pdfs = []
        file_paths = []
        student_works.find_in_batches(batch_size: 500) do |sw|
          Parallel.each(sw, in_threads: parallel_size) do |student_work|
            export = ExportShixunReportService.new(homework, student_work)
            pdf = export.to_pdf
            pdfs << pdf
            file_paths << {filename: export.filename, path: pdf.path}
            puts "out: #{export.filename}_#{pdf.path}"
          end
        end

        Zip::File.open(zipfile_name, Zip::File::CREATE) do |zip|
          file_paths.each do |pdf|
            begin
              zip.add(pdf[:filename], pdf[:path])
            rescue => ex
              Rails.logger.error(ex.message)

              zip.get_output_stream('FILE_NOTICE.txt'){|os| os.write("文件重复:#{export.filename}") }
              next
            end
          end
        end
      else
        zipfile = {:message => "no file"}
      end
    end
  end

  # 执行示例  bundle exec rake zip_pack:homework_attach_pack args=123
  task :homework_attach_pack => :environment do
    include ExportHelper
    if ENV['args']
      homework_id = ENV['args']
      homework = HomeworkCommon.find homework_id
      zip_works = homework.student_works.where("work_status > 0")
      if zip_works.size > 0
        zipfile = zip_homework_common homework, zip_works
      else
        zipfile = {:message => "no file"}
      end
      puts "out: #{zipfile}"
    end
  end

end