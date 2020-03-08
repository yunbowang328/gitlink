module GraduationTopicsHelper

  # 课题类型
  def topic_type
    [{id: 1, name: "设计"}, {id: 2, name: "论文"}, {id: 3, name: "创作"}]
  end

  # 课程来源
  def topic_source
    [{id: 1, name: "生产/社会实际"}, {id: 2, name:"结合科研"}, {id: 3, name: "其它"}]
  end

  # 课题性质1
  def topic_property_first
    [{id: 1, name: "真题"}, {id: 2, name:"模拟题"}]
  end

  # 课题性质2
  def topic_property_second
    [{id: 1, name: "纵向课题"}, {id: 2, name:"横向课题"}, {id: 3, name: "自选"}]
  end

  # 课题重复
  def topic_repeat
    [{id: 1, name: "新题"}, {id: 2, name:"往届题，有新要求"}, {id: 3, name: "往届题，无新要求"}]
  end



end
