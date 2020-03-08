module ElasticsearchAble
  extend ActiveSupport::Concern

  private

  def default_options
    {
      debug: Rails.env.development?,
      highlight: highlight_options,
      body_options: body_options,
      page: page,
      per_page: 20
    }
  end

  def keyword
    params[:keyword].to_s.strip.presence || '*'
  end

  def highlight_options
    {
      fragment_size: EduSetting.get('es_highlight_fragment_size') || 30,
      tag: '<span class="highlight">',
      fields: {
        '*' => { type: 'plain', number_of_fragments: 3 }
      }
    }
  end

  def body_options
    hash = {}

    hash[:min_score] = (EduSetting.get('es_min_score') || 10) if keyword != '*'

    hash
  end

  def per_page
    per_page = params[:per_page].to_s.strip.presence || params[:limit].to_s.strip.presence
    per_page.to_i <= 0 || per_page.to_i > 20 ? 20 : per_page.to_i
  end

  def page
    params[:page].to_i <= 0 ? 1 : params[:page].to_i
  end
end
