module ShixunDecorator
  def human_status
    I18n.t("shixun.status.#{status}")
  end
end
