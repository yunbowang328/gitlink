module ApplicationDecorator
  def display_time_method(*columns, format: '%Y-%m-%d %H:%M:%S')
    columns.each do |column_name|
      define_method "display_#{column_name}" do
        public_send(column_name)&.strftime(format)
      end
    end
  end
end