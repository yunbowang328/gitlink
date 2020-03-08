/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-20 23:10:48
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-02 14:57:02
 */
const CONST = {
  jcLabel: {
    name: '任务名称',
    language: '编程语言',
    description: '描述',
    difficult: '难易度',
    category: '课程',
    openOrNot: '公开程序',
    timeLimit: '时间限制',
    knowledge: '知识点',
    sub_discipline_id: '课程'
  },
  fontSetting: {
    title: '代码格式',
    type: 'select',
    content: [
      {
        text: '显示风格',
        type: 'style',
        value: [
          {
            key: 'dark',
            text: '黑色背景',
            value: 'dark'
          },
          {
            key: 'light',
            text: '白色背景',
            value: 'light'
          }
        ]
      },
      { 
        text: '字体大小',
        type: 'font',
        value: [
          {
            key: 1,
            text: '12px',
            value: 12
          },
          {
            key: 1,
            text: '14px',
            value: 14
          },
          {
            key: 1,
            text: '16px',
            value: 16
          },
          {
            key: 1,
            text: '18px',
            value: 18
          },
          {
            key: 1,
            text: '24px',
            value: 24
          },
          {
            key: 1,
            text: '30px',
            value: 30
          }
        ]
      }
    ]
  },
  opacitySetting: {
    title: '代码格式',
    type: 'label',
    content: [
      {
        text: '字体大小',
        value: 'CTRL + S'
      },
      {
        text: '唤出快捷键列表',
        value: 'F1/ALT + F1'
      },
      {
        text: '向左缩进',
        value: 'CTRL + ['
      },
      {
        text: '向右缩进',
        value: 'CTRL + ]'
      },
      {
        text: '跳到匹配的括号',
        value: 'CTRL + SHIFT + \\'
      },
      {
        text: '转到行首',
        value: 'HOME'
      },
      {
        text: '转到行尾',
        value: 'END'
      }
    ]
  },
  tagBackground: {
    1: '#52c41a',
    2: '#faad14',
    3: '#f5222d'
  },
  diffText: {
    1: '简单',
    2: '中等',
    3: '困难'
  },
  reviewResult: {
    '-1': '测试用例结果不匹配',
    '0': '评测通过',
    '1': '',
    '2': '评测超时',
    '3': '评测pod失败',
    '4': '编译失败',
    '5': '执行失败'
  }
}


export default CONST;

