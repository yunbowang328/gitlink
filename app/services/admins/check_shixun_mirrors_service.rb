class Admins::CheckShixunMirrorsService < ApplicationService
  Error = Class.new(StandardError)

  def call
    bridge_images

    ActiveRecord::Base.transaction do
      check_sync_mirrors!

      check_mirrors!
    end
  end

  private

  def mirrors
    bridge_images['images']
  end

  def sync_mirrors
    bridge_images['imagesNotSync']
  end

  def check_mirrors!
    return if mirrors.blank?
    image_names = []

    mirrors.each do |data|
      mirror = JSON.parse(data)

      name_repository = MirrorRepository.find_by(name: mirror['imageName'])
      id_repository   = MirrorRepository.find_by(mirrorID: mirror['imageID'])

      image_names << mirror['imageName']

      if name_repository.blank? && id_repository.present? # 镜像名称被修改
        id_repository.update_column(:status, 2)
        MirrorOperationRecord.create!(mirror_repository_id: id_repository.id, mirror_id: mirror['imageID'],
                                      mirror_name: mirror['imageName'], status: 2, user_id: -1)
      elsif name_repository.blank? # 镜像不存在、创建镜像
        new_repository = MirrorRepository.create!(mirrorID: mirror['imageID'], name: mirror['imageName'])
        MirrorOperationRecord.create!(mirror_repository_id: new_repository.id, mirror_id: mirror['imageID'],
                                      mirror_name: mirror['imageName'], status: 0, user_id: -1)
      elsif name_repository.mirrorID != mirror['imageID'] # 镜像ID被修改
        name_repository.update_column(:status, 2)
        MirrorOperationRecord.create!(mirror_repository_id: name_repository.id, mirror_id: mirror['imageID'],
                                      mirror_name: mirror['imageName'], status: 1, user_id: -1)
      end
    end

    # 判断中间层镜像是否被删除
    MirrorRepository.find_each do |mirror|
      next if mirror&.name.blank? || image_names.index(mirror.name)

      mirror.update_column(:status, 4)
      MirrorOperationRecord.create!(mirror_repository_id: mirror.id, mirror_id: mirror&.mirrorID,
                                    mirror_name: mirror.name, status: 3, user_id: -1)
    end
  end

  def check_sync_mirrors!
    return if sync_mirrors.blank?

    sync_mirrors.each do |data|
      mirror = JSON.parse(data)

      repository = MirrorRepository.find_by(name: mirror['imageName'])
      next if repository.blank? || repository.status != 1

      repository.update_column(:status, 5)
      MirrorOperationRecord.create!(mirror_repository_id: repository.id, mirror_id: mirror['imageID'],
                                    mirror_name: mirror['imageName'], status: 4, user_id: -1)
    end
  end

  def bridge_images
    @_bridge_images ||= begin
      url = "#{EduSetting.get('cloud_bridge')}/bridge/docker/images"
      res = Faraday.get(url)
      res = JSON.parse(res.body)
      raise Error, '拉取镜像信息异常' if res && res['code'] != 0

      res
    rescue => e
      Rails.logger.error("get response failed ! #{e.message}")
      raise Error, '实训云平台繁忙（繁忙等级：84）'
    end
  end
end