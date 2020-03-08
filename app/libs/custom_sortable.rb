module CustomSortable
  extend ActiveSupport::Concern

  included do |base|
    base.instance_variable_set("@_sort_options", {})
    base.instance_variable_set("@_sort_columns", [])
    base.instance_variable_set("@_sort_directions", %w(asc desc))
  end

  def custom_sort(relations, sort_by, sort_direction)
    sort_by = self.class.sort_options[:default_by] if sort_by.blank?
    sort_direction = self.class.sort_options[:default_direction] if sort_direction.blank?

    return relations unless self.class.check_sort_parameter_validate(sort_by.to_s, sort_direction.to_s)

    order_method = self.class.sort_options[:reorder] ? :reorder : :order

    default_table = self.class.sort_options[:default_table]
    if default_table.present?
      relations.send(order_method, "#{default_table}.#{sort_by} #{sort_direction}")
    else
      relations.send(order_method, "#{sort_by} #{sort_direction}")
    end
  end

  module ClassMethods
    def sort_columns(*columns)
      opts = columns.extract_options!
      @_sort_options[:default_by]        = opts[:default_by].to_s
      @_sort_options[:default_direction] = opts[:default_direction].to_s
      @_sort_options[:reorder]           = opts[:reorder]
      @_sort_options[:default_table]     = opts[:default_table]

      @_sort_columns = columns.map(&:to_s)
    end

    def check_sort_parameter_validate(sort_by, sort_direction)
      (sort_by.blank? || @_sort_columns.include?(sort_by)) && @_sort_directions.include?(sort_direction)
    end

    def sort_options
      @_sort_options
    end
  end
end
