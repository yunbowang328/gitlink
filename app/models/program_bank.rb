class ProgramBank < ApplicationRecord

  def oj_language
    result = case language
             when '1'
             then 'C'
             when '2'
             then 'C++'
             when '3'
             then 'Python'
             when '4'
             then 'Java'
             end
    result
  end

  def strip_description
    strip_html description
  end

  def oj_sub_discipline_id
    result = case language
             when '1'
             then 3
             when '2'
             then 4
             when '3'
             then 5
             when '4'
             then 2
             end
    result
  end
end
