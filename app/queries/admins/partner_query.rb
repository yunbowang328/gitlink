class Admins::PartnerQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    partners = Partner.all

    keyword = params[:keyword].to_s.strip
    partners = partners.joins(:school).where('schools.name LIKE ?', "%#{keyword}%") if keyword.present?

    custom_sort(partners, params[:sort_by], params[:sort_direction])
  end
end