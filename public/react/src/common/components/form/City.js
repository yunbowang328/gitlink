import React,{ Component } from "react";

import {Cascader} from 'antd';


const options = [{
  value: '北京',
  label: '北京',
  children: [{
    value: "东城",
    label: '东城'
  },{
    value:"西城",
    label:"西城"
  },{
    value:"朝阳",
    label:"朝阳"
  },{
    value:"丰台",
    label:"丰台"
  },{
    value:"石景山",
    label:"石景山"
  },{
    value:"海淀",
    label:"海淀"
  },{
    value:"门头沟",
    label:"门头沟"
  },{
    value:"房山",
    label:"房山"
  },{
    value:"通州",
    label:"通州"
  },{
    value:"顺义",
    label:"顺义"
  },{
    value:"昌平",
    label:"昌平"
  },{
    value:"大兴",
    label:"大兴"
  },{
    value:"平谷",
    label:"平谷"
  },{
    value:"怀柔",
    label:"怀柔"
  },{
    value:"密云",
    label:"密云"
  },{
    value:"延庆",
    label:"延庆"
  }],
}, {
  value: '上海',
  label: '上海',
  children: [{
    value: "崇明",
    label: '崇明'
  },{
    value: '黄浦',
    label: '黄浦'
  },{
    value: '卢湾',
    label: '卢湾'
  },{
    value: '徐汇',
    label: '徐汇'
  },{
    value: '长宁',
    label: '长宁'
  },{
    value: '静安',
    label: '静安'
  },{
    value: '普陀',
    label: '普陀'
  },{
    value: '闸北',
    label: '闸北'
  },{
    value: '虹口',
    label: '虹口'
  },{
    value: '杨浦',
    label: '杨浦'
  },{
    value: '闵行',
    label: '闵行'
  },{
    value: '宝山',
    label: '宝山'
  },{
    value: '嘉定',
    label: '嘉定'
  },{
    value: '浦东',
    label: '浦东'
  },{
    value: '金山',
    label: '金山'
  },{
    value: '松江',
    label: '松江'
  },{
    value: '青浦',
    label: '青浦'
  },{
    value: '南汇',
    label: '南汇'
  },{
    value: '奉贤',
    label: '奉贤'
  }],
}, {
  value: '广东',
  label: '广东',
  children: [{
    value: "广州",
    label: '广州'
  },{
    value: '深圳',
    label: '深圳'
  },{
    value: '珠海',
    label: '珠海'
  },{
    value: '东莞',
    label: '东莞'
  },{
    value: '中山',
    label: '中山'
  },{
    value: '佛山',
    label: '佛山'
  },{
    value: '惠州',
    label: '惠州'
  },{
    value: '河源',
    label: '河源'
  },{
    value: '潮州',
    label: '潮州'
  },{
    value: '江门',
    label: '江门'
  },{
    value: '揭阳',
    label: '揭阳'
  },{
    value: '茂名',
    label: '茂名'
  },{
    value: '梅州',
    label: '梅州'
  },{
    value: '清远',
    label: '清远'
  },{
    value: '汕头',
    label: '汕头'
  },{
    value: '汕尾',
    label: '汕尾'
  },{
    value: '韶关',
    label: '韶关'
  },{
    value: '顺德',
    label: '顺德'
  },{
    value: '阳江',
    label: '阳江'
  },{
    value: '云浮',
    label: '云浮'
  },{
    value: '湛江',
    label: '湛江'
  },{
    value: '肇庆',
    label: '肇庆'
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: "南京",
    label: '南京'
  },{
    value: '常熟',
    label: '常熟'
  },{
    value: '常州',
    label: '常州'
  },{
    value: '海门',
    label: '海门'
  },{
    value: '淮安',
    label: '淮安'
  },{
    value: '江都',
    label: '江都'
  },{
    value: '江阴',
    label: '江阴'
  },{
    value: '昆山',
    label: '昆山'
  },{
    value: '连云港',
    label: '连云港'
  },{
    value: '南通',
    label: '南通'
  },{
    value: '启东',
    label: '启东'
  },{
    value: '沭阳',
    label: '沭阳'
  },{
    value: '宿迁',
    label: '宿迁'
  },{
    value: '苏州',
    label: '苏州'
  },{
    value: '太仓',
    label: '太仓'
  },{
    value: '泰州',
    label: '泰州'
  },{
    value: '同里',
    label: '同里'
  },{
    value: '无锡',
    label: '无锡'
  },{
    value: '徐州',
    label: '徐州'
  },{
    value: '盐城',
    label: '盐城'
  },{
    value: '扬州',
    label: '扬州'
  },{
    value: '宜兴',
    label: '宜兴'
  },{
    value: '仪征',
    label: '仪征'
  },{
    value: '张家港',
    label: '张家港'
  },{
    value: '镇江',
    label: '镇江'
  },{
    value: '周庄',
    label: '周庄'
  }],
}, {
  value: '重庆',
  label: '重庆',
  children: [{
    value: "万州",
    label: '万州'
  },{
    value: '涪陵',
    label: '涪陵'
  },{
    value: '渝中',
    label: '渝中'
  },{
    value: '大渡口',
    label: '大渡口'
  },{
    value: '江北',
    label: '江北'
  },{
    value: '沙坪坝',
    label: '沙坪坝'
  },{
    value: '九龙坡',
    label: '九龙坡'
  },{
    value: '南岸',
    label: '南岸'
  },{
    value: '北碚',
    label: '北碚'
  },{
    value: '万盛',
    label: '万盛'
  },{
    value: '双挢',
    label: '双挢'
  },{
    value: '渝北',
    label: '渝北'
  },{
    value: '巴南',
    label: '巴南'
  },{
    value: '黔江',
    label: '黔江'
  },{
    value: '长寿',
    label: '长寿'
  },{
    value: '綦江',
    label: '綦江'
  },{
    value: '潼南',
    label: '潼南'
  },{
    value: '铜梁',
    label: '铜梁'
  },{
    value: '大足',
    label: '大足'
  },{
    value: '荣昌',
    label: '荣昌'
  },{
    value: '壁山',
    label: '壁山'
  },{
    value: '梁平',
    label: '梁平'
  },{
    value: '城口',
    label: '城口'
  },{
    value: '丰都',
    label: '丰都'
  },{
    value: '垫江',
    label: '垫江'
  },{
    value: '武隆',
    label: '武隆'
  },{
    value: '忠县',
    label: '忠县'
  },{
    value: '开县',
    label: '开县'
  },{
    value: '云阳',
    label: '云阳'
  },{
    value: '奉节',
    label: '奉节'
  },{
    value: '巫山',
    label: '巫山'
  },{
    value: '巫溪',
    label: '巫溪'
  },{
    value: '石柱',
    label: '石柱'
  },{
    value: '秀山',
    label: '秀山'
  },{
    value: '酉阳',
    label: '酉阳'
  },{
    value: '彭水',
    label: '彭水'
  },{
    value: '江津',
    label: '江津'
  },{
    value: '合川',
    label: '合川'
  },{
    value: '永川',
    label: '永川'
  },{
    value: '南川',
    label: '南川'
  }],
}, {
  value: '安徽',
  label: '安徽',
  children: [{
    value: "合肥",
    label: '合肥'
  },{
    value: '安庆',
    label: '安庆'
  },{
    value: '蚌埠',
    label: '蚌埠'
  },{
    value: '亳州',
    label: '亳州'
  },{
    value: '巢湖',
    label: '巢湖'
  },{
    value: '滁州',
    label: '滁州'
  },{
    value: '阜阳',
    label: '阜阳'
  },{
    value: '贵池',
    label: '贵池'
  },{
    value: '淮北',
    label: '淮北'
  },{
    value: '淮化',
    label: '淮化'
  },{
    value: '淮南',
    label: '淮南'
  },{
    value: '黄山',
    label: '黄山'
  },{
    value: '九华山',
    label: '九华山'
  },{
    value: '六安',
    label: '六安'
  },{
    value: '马鞍山',
    label: '马鞍山'
  },{
    value: '宿州',
    label: '宿州'
  },{
    value: '铜陵',
    label: '铜陵'
  },{
    value: '屯溪',
    label: '屯溪'
  },{
    value: '芜湖',
    label: '芜湖'
  },{
    value: '宣城',
    label: '宣城'
  }],
}, {
  value: '福建',
  label: '福建',
  children: [{
    value: "福州",
    label: '福州'
  },{
    value: '厦门',
    label: '厦门'
  },{
    value: '泉州',
    label: '泉州'
  },{
    value: '漳州',
    label: '漳州'
  },{
    value: '龙岩',
    label: '龙岩'
  },{
    value: '南平',
    label: '南平'
  },{
    value: '宁德',
    label: '宁德'
  },{
    value: '莆田',
    label: '莆田'
  },{
    value: '三明',
    label: '三明'
  }],
}, {
  value: '甘肃',
  label: '甘肃',
  children: [{
    value: "兰州",
    label: '兰州'
  },{
    value: "嘉峪关",
    label: '嘉峪关'
  },{
    value: '白银',
    label: '白银'
  },{
    value: '定西',
    label: '定西'
  },{
    value: '敦煌',
    label: '敦煌'
  },{
    value: '甘南',
    label: '甘南'
  },{
    value: '金昌',
    label: '金昌'
  },{
    value: '酒泉',
    label: '酒泉'
  },{
    value: '临夏',
    label: '临夏'
  },{
    value: '平凉',
    label: '平凉'
  },{
    value: '天水',
    label: '天水'
  },{
    value: '武都',
    label: '武都'
  },{
    value: '武威',
    label: '武威'
  },{
    value: '西峰',
    label: '西峰'
  },{
    value: '张掖',
    label: '张掖'
  }],
}, {
  value: '广西',
  label: '广西',
  children: [{
    value: "南宁",
    label: '南宁'
  },{
    value: "来宾",
    label: '来宾'
  },{
    value: '百色',
    label: '百色'
  },{
    value: '北海',
    label: '北海'
  },{
    value: '桂林',
    label: '桂林'
  },{
    value: '防城港',
    label: '防城港'
  },{
    value: '贵港',
    label: '贵港'
  },{
    value: '河池',
    label: '河池'
  },{
    value: '贺州',
    label: '贺州'
  },{
    value: '柳州',
    label: '柳州'
  },{
    value: '钦州',
    label: '钦州'
  },{
    value: '梧州',
    label: '梧州'
  },{
    value: '玉林',
    label: '玉林'
  }],
}, {
  value: '贵州',
  label: '贵州',
  children: [{
    value: "贵阳",
    label: '贵阳'
  },{
    value: '安顺',
    label: '安顺'
  },{
    value: '毕节',
    label: '毕节'
  },{
    value: '都匀',
    label: '都匀'
  },{
    value: '凯里',
    label: '凯里'
  },{
    value: '六盘水',
    label: '六盘水'
  },{
    value: '铜仁',
    label: '铜仁'
  },{
    value: '兴义',
    label: '兴义'
  },{
    value: '玉屏',
    label: '玉屏'
  },{
    value: '遵义',
    label: '遵义'
  }],
}, {
  value: '海南',
  label: '海南',
  children: [{
    value: "海口",
    label: '海口'
  },{
    value: '儋县',
    label: '儋县'
  },{
    value: '陵水',
    label: '陵水'
  },{
    value: '琼海',
    label: '琼海'
  },{
    value: '三亚',
    label: '三亚'
  },{
    value: '通什',
    label: '通什'
  },{
    value: '万宁',
    label: '万宁'
  }],
}, {
  value: '河北',
  label: '河北',
  children: [{
    value: "石家庄",
    label: '石家庄'
  },{
    value: '保定',
    label: '保定'
  },{
    value: '北戴河',
    label: '北戴河'
  },{
    value: '沧州',
    label: '沧州'
  },{
    value: '承德',
    label: '承德'
  },{
    value: '丰润',
    label: '丰润'
  },{
    value: '邯郸',
    label: '邯郸'
  },{
    value: '衡水',
    label: '衡水'
  },{
    value: '廊坊',
    label: '廊坊'
  },{
    value: '南戴河',
    label: '南戴河'
  },{
    value: '秦皇岛',
    label: '秦皇岛'
  },{
    value: '唐山',
    label: '唐山'
  },{
    value: '新城',
    label: '新城'
  },{
    value: '邢台',
    label: '邢台'
  },{
    value: '张家口',
    label: '张家口'
  }],
}, {
  value: '黑龙江',
  label: '黑龙江',
  children: [{
    value: "哈尔滨",
    label: '哈尔滨'
  },{
    value: '北安',
    label: '北安'
  },{
    value: '大庆',
    label: '大庆'
  },{
    value: '大兴安岭',
    label: '大兴安岭'
  },{
    value: '鹤岗',
    label: '鹤岗'
  },{
    value: '黑河',
    label: '黑河'
  },{
    value: '佳木斯',
    label: '佳木斯'
  },{
    value: '鸡西',
    label: '鸡西'
  },{
    value: '牡丹江',
    label: '牡丹江'
  },{
    value: '齐齐哈尔',
    label: '齐齐哈尔'
  },{
    value: '七台河',
    label: '七台河'
  },{
    value: '双鸭山',
    label: '双鸭山'
  },{
    value: '绥化',
    label: '绥化'
  },{
    value: '伊春',
    label: '伊春'
  }],
}, {
  value: '河南',
  label: '河南',
  children: [{
    value: "郑州",
    label: '郑州'
  },{
    value: '安阳',
    label: '安阳'
  },{
    value: '鹤壁',
    label: '鹤壁'
  },{
    value: '潢川',
    label: '潢川'
  },{
    value: '焦作',
    label: '焦作'
  },{
    value: '济源',
    label: '济源'
  },{
    value: '开封',
    label: '开封'
  },{
    value: '漯河',
    label: '漯河'
  },{
    value: '洛阳',
    label: '洛阳'
  },{
    value: '南阳',
    label: '南阳'
  },{
    value: '平顶山',
    label: '平顶山'
  },{
    value: '濮阳',
    label: '濮阳'
  },{
    value: '三门峡',
    label: '三门峡'
  },{
    value: '商丘',
    label: '商丘'
  },{
    value: '新乡',
    label: '新乡'
  },{
    value: '信阳',
    label: '信阳'
  },{
    value: '许昌',
    label: '许昌'
  },{
    value: '周口',
    label: '周口'
  },{
    value: '驻马店',
    label: '驻马店'
  }],
}, {
  value: '香港',
  label: '香港',
  children: [{
    value: "香港",
    label: '香港'
  },{
    value: '九龙',
    label: '九龙'
  },{
    value: '新界',
    label: '新界'
  }],
}, {
  value: '湖北',
  label: '湖北',
  children: [{
    value: "武汉",
    label: '武汉'
  },{
    value: "天门",
    label: '天门'
  },{
    value: '恩施',
    label: '恩施'
  },{
    value: '鄂州',
    label: '鄂州'
  },{
    value: '黄冈',
    label: '黄冈'
  },{
    value: '黄石',
    label: '黄石'
  },{
    value: '荆门',
    label: '荆门'
  },{
    value: '荆州',
    label: '荆州'
  },{
    value: '潜江',
    label: '潜江'
  },{
    value: '十堰',
    label: '十堰'
  },{
    value: '随州',
    label: '随州'
  },{
    value: '武穴',
    label: '武穴'
  },{
    value: '仙桃',
    label: '仙桃'
  },{
    value: '咸宁',
    label: '咸宁'
  },{
    value: '襄阳',
    label: '襄阳'
  },{
    value: '襄樊',
    label: '襄樊'
  },{
    value: '孝感',
    label: '孝感'
  },{
    value: '宜昌',
    label: '宜昌'
  }],
}, {
  value: '湖南',
  label: '湖南',
  children: [{
    value: "长沙",
    label: '长沙'
  },{
    value: '常德',
    label: '常德'
  },{
    value: '郴州',
    label: '郴州'
  },{
    value: '衡阳',
    label: '衡阳'
  },{
    value: '怀化',
    label: '怀化'
  },{
    value: '吉首',
    label: '吉首'
  },{
    value: '娄底',
    label: '娄底'
  },{
    value: '邵阳',
    label: '邵阳'
  },{
    value: '湘潭',
    label: '湘潭'
  },{
    value: '益阳',
    label: '益阳'
  },{
    value: '岳阳',
    label: '岳阳'
  },{
    value: '永州',
    label: '永州'
  },{
    value: '张家界',
    label: '张家界'
  },{
    value: '株洲',
    label: '株洲'
  }],
}, {
  value: '江西',
  label: '江西',
  children: [{
    value: "南昌",
    label: '南昌'
  },{
    value: '抚州',
    label: '抚州'
  },{
    value: '赣州',
    label: '赣州'
  },{
    value: '吉安',
    label: '吉安'
  },{
    value: '景德镇',
    label: '景德镇'
  },{
    value: '井冈山',
    label: '井冈山'
  },{
    value: '九江',
    label: '九江'
  },{
    value: '庐山',
    label: '庐山'
  },{
    value: '萍乡',
    label: '萍乡'
  },{
    value: '上饶',
    label: '上饶'
  },{
    value: '新余',
    label: '新余'
  },{
    value: '宜春',
    label: '宜春'
  },{
    value: '鹰潭',
    label: '鹰潭'
  }],
}, {
  value: '吉林',
  label: '吉林',
  children: [{
    value: "长春",
    label: '长春'
  },{
    value: '吉林',
    label: '吉林'
  },{
    value: '白城',
    label: '白城'
  },{
    value: '白山',
    label: '白山'
  },{
    value: '珲春',
    label: '珲春'
  },{
    value: '辽源',
    label: '辽源'
  },{
    value: '梅河',
    label: '梅河'
  },{
    value: '四平',
    label: '四平'
  },{
    value: '松原',
    label: '松原'
  },{
    value: '通化',
    label: '通化'
  },{
    value: '延吉',
    label: '延吉'
  }],
}, {
  value: '辽宁',
  label: '辽宁',
  children: [{
    value: "沈阳",
    label: '沈阳'
  },{
    value: '鞍山',
    label: '鞍山'
  },{
    value: '本溪',
    label: '本溪'
  },{
    value: '朝阳',
    label: '朝阳'
  },{
    value: '大连',
    label: '大连'
  },{
    value: '丹东',
    label: '丹东'
  },{
    value: '抚顺',
    label: '抚顺'
  },{
    value: '阜新',
    label: '阜新'
  },{
    value: '葫芦岛',
    label: '葫芦岛'
  },{
    value: '锦州',
    label: '锦州'
  },{
    value: '辽阳',
    label: '辽阳'
  },{
    value: '盘锦',
    label: '盘锦'
  },{
    value: '铁岭',
    label: '铁岭'
  },{
    value: '营口',
    label: '营口'
  }],
}, {
  value: '澳门',
  label: '澳门',
  children: [{
    value: '澳门',
    label: '澳门'
  }],
}, {
  value: '内蒙古',
  label: '内蒙古',
  children: [{
    value: "呼和浩特",
    label: '呼和浩特'
  },{
    value: '阿拉善盟',
    label: '阿拉善盟'
  },{
    value: '包头',
    label: '包头'
  },{
    value: '赤峰',
    label: '赤峰'
  },{
    value: '东胜',
    label: '东胜'
  },{
    value: '海拉尔',
    label: '海拉尔'
  },{
    value: '集宁',
    label: '集宁'
  },{
    value: '临河',
    label: '临河'
  },{
    value: '通辽',
    label: '通辽'
  },{
    value: '乌海',
    label: '乌海'
  },{
    value: '乌兰浩特',
    label: '乌兰浩特'
  },{
    value: '锡林浩特',
    label: '锡林浩特'
  }],
}, {
  value: '宁夏',
  label: '宁夏',
  children: [{
    value: "银川",
    label: '银川'
  },{
    value: '固源',
    label: '固源'
  },{
    value: '石嘴山',
    label: '石嘴山'
  },{
    value: '吴忠',
    label: '吴忠'
  }],
}, {
  value: '青海',
  label: '青海',
  children: [{
    value: "西宁",
    label: '西宁'
  },{
    value: '德令哈',
    label: '德令哈'
  },{
    value: '格尔木',
    label: '格尔木'
  },{
    value: '共和',
    label: '共和'
  },{
    value: '海东',
    label: '海东'
  },{
    value: '海晏',
    label: '海晏'
  },{
    value: '玛沁',
    label: '玛沁'
  },{
    value: '同仁',
    label: '同仁'
  },{
    value: '玉树',
    label: '玉树'
  }],
}, {
  value: '山东',
  label: '山东',
  children: [{
    value: "济南",
    label: '济南'
  },{
    value: '滨州',
    label: '滨州'
  },{
    value: '兖州',
    label: '兖州'
  },{
    value: '德州',
    label: '德州'
  },{
    value: '东营',
    label: '东营'
  },{
    value: '菏泽',
    label: '菏泽'
  },{
    value: '济宁',
    label: '济宁'
  },{
    value: '莱芜',
    label: '莱芜'
  },{
    value: '聊城',
    label: '聊城'
  },{
    value: '临沂',
    label: '临沂'
  },{
    value: '蓬莱',
    label: '蓬莱'
  },{
    value: '青岛',
    label: '青岛'
  },{
    value: '曲阜',
    label: '曲阜'
  },{
    value: '日照',
    label: '日照'
  },{
    value: '泰安',
    label: '泰安'
  },{
    value: '潍坊',
    label: '潍坊'
  },{
    value: '威海',
    label: '威海'
  },{
    value: '烟台',
    label: '烟台'
  },{
    value: '枣庄',
    label: '枣庄'
  },{
    value: '淄博',
    label: '淄博'
  }],
}, {
  value: '山西',
  label: '山西',
  children: [{
    value: "太原",
    label: '太原'
  },{
    value: "吕梁",
    label: '吕梁'
  },{
    value: '长治',
    label: '长治'
  },{
    value: '大同',
    label: '大同'
  },{
    value: '候马',
    label: '候马'
  },{
    value: '晋城',
    label: '晋城'
  },{
    value: '离石',
    label: '离石'
  },{
    value: '临汾',
    label: '临汾'
  },{
    value: '宁武',
    label: '宁武'
  },{
    value: '朔州',
    label: '朔州'
  },{
    value: '忻州',
    label: '忻州'
  },{
    value: '阳泉',
    label: '阳泉'
  },{
    value: '榆次',
    label: '榆次'
  },{
    value: '运城',
    label: '运城'
  }],
}, {
  value: '陕西',
  label: '陕西',
  children: [{
    value: "西安",
    label: '西安'
  },{
    value: '安康',
    label: '安康'
  },{
    value: '宝鸡',
    label: '宝鸡'
  },{
    value: '汉中',
    label: '汉中'
  },{
    value: '渭南',
    label: '渭南'
  },{
    value: '商州',
    label: '商州'
  },{
    value: '绥德',
    label: '绥德'
  },{
    value: '铜川',
    label: '铜川'
  },{
    value: '咸阳',
    label: '咸阳'
  },{
    value: '延安',
    label: '延安'
  },{
    value: '榆林',
    label: '榆林'
  }],
}, {
  value: '四川',
  label: '四川',
  children: [{
    value: "成都",
    label: '成都'
  },{
    value: '巴中',
    label: '巴中'
  },{
    value: '达川',
    label: '达川'
  },{
    value: '德阳',
    label: '德阳'
  },{
    value: '都江堰',
    label: '都江堰'
  },{
    value: '峨眉山',
    label: '峨眉山'
  },{
    value: '涪陵',
    label: '涪陵'
  },{
    value: '广安',
    label: '广安'
  },{
    value: '广元',
    label: '广元'
  },{
    value: '九寨沟',
    label: '九寨沟'
  },{
    value: '康定',
    label: '康定'
  },{
    value: '乐山',
    label: '乐山'
  },{
    value: '泸州',
    label: '泸州'
  },{
    value: '马尔康',
    label: '马尔康'
  },{
    value: '绵阳',
    label: '绵阳'
  },{
    value: '眉山',
    label: '眉山'
  },{
    value: '南充',
    label: '南充'
  },{
    value: '内江',
    label: '内江'
  },{
    value: '攀枝花',
    label: '攀枝花'
  },{
    value: '遂宁',
    label: '遂宁'
  },{
    value: '汶川',
    label: '汶川'
  },{
    value: '西昌',
    label: '西昌'
  },{
    value: '雅安',
    label: '雅安'
  },{
    value: '宜宾',
    label: '宜宾'
  },{
    value: '自贡',
    label: '自贡'
  },{
    value: '资阳',
    label: '资阳'
  }],
}, {
  value: '台湾',
  label: '台湾',
  children: [{
    value: "台北",
    label: '台北'
  },{
    value: '基隆',
    label: '基隆'
  },{
    value: '台南',
    label: '台南'
  },{
    value: '台中',
    label: '台中'
  },{
    value: '高雄',
    label: '高雄'
  },{
    value: '屏东',
    label: '屏东'
  },{
    value: '南投',
    label: '南投'
  },{
    value: '云林',
    label: '云林'
  },{
    value: '新竹',
    label: '新竹'
  },{
    value: '彰化',
    label: '彰化'
  },{
    value: '苗栗',
    label: '苗栗'
  },{
    value: '嘉义',
    label: '嘉义'
  },{
    value: '桃园',
    label: '桃园'
  },{
    value: '宜兰',
    label: '宜兰'
  },{
    value: '台东',
    label: '台东'
  },{
    value: '金门',
    label: '金门'
  },{
    value: '马祖',
    label: '马祖'
  },{
    value: '澎湖',
    label: '澎湖'
  }],
}, {
  value: '天津',
  label: '天津',
  children: [{
    value: "天津",
    label: '天津'
  },{
    value: '和平',
    label: '和平'
  },{
    value: '东丽',
    label: '东丽'
  },{
    value: '河东',
    label: '河东'
  },{
    value: '西青',
    label: '西青'
  },{
    value: '河西',
    label: '河西'
  },{
    value: '津南',
    label: '津南'
  },{
    value: '南开',
    label: '南开'
  },{
    value: '北辰',
    label: '北辰'
  },{
    value: '河北',
    label: '河北'
  },{
    value: '武清',
    label: '武清'
  },{
    value: '红挢',
    label: '红挢'
  },{
    value: '塘沽',
    label: '塘沽'
  },{
    value: '汉沽',
    label: '汉沽'
  },{
    value: '大港',
    label: '大港'
  },{
    value: '宁河',
    label: '宁河'
  },{
    value: '静海',
    label: '静海'
  },{
    value: '宝坻',
    label: '宝坻'
  },{
    value: '蓟县',
    label: '蓟县'
  }],
}, {
  value: '新疆',
  label: '新疆',
  children: [{
    value: "乌鲁木齐",
    label: '乌鲁木齐'
  },{
    value: '阿克苏',
    label: '阿克苏'
  },{
    value: '阿勒泰',
    label: '阿勒泰'
  },{
    value: '阿图什',
    label: '阿图什'
  },{
    value: '博乐',
    label: '博乐'
  },{
    value: '昌吉',
    label: '昌吉'
  },{
    value: '东山',
    label: '东山'
  },{
    value: '哈密',
    label: '哈密'
  },{
    value: '和田',
    label: '和田'
  },{
    value: '喀什',
    label: '喀什'
  },{
    value: '克拉玛依',
    label: '克拉玛依'
  },{
    value: '库车',
    label: '库车'
  },{
    value: '库尔勒',
    label: '库尔勒'
  },{
    value: '奎屯',
    label: '奎屯'
  },{
    value: '石河子',
    label: '石河子'
  },{
    value: '塔城',
    label: '塔城'
  },{
    value: '吐鲁番',
    label: '吐鲁番'
  },{
    value: '伊宁',
    label: '伊宁'
  }],
}, {
  value: '西藏',
  label: '西藏',
  children: [{
    value: "拉萨",
    label: '拉萨'
  },{
    value: '阿里',
    label: '阿里'
  },{
    value: '昌都',
    label: '昌都'
  },{
    value: '林芝',
    label: '林芝'
  },{
    value: '那曲',
    label: '那曲'
  },{
    value: '日喀则',
    label: '日喀则'
  },{
    value: '山南',
    label: '山南'
  }],
}, {
  value: '云南',
  label: '云南',
  children: [{
    value: "昆明",
    label: '昆明'
  },{
    value: '大理',
    label: '大理'
  },{
    value: '保山',
    label: '保山'
  },{
    value: '楚雄',
    label: '楚雄'
  },{
    value: '大理',
    label: '大理'
  },{
    value: '东川',
    label: '东川'
  },{
    value: '个旧',
    label: '个旧'
  },{
    value: '景洪',
    label: '景洪'
  },{
    value: '开远',
    label: '开远'
  },{
    value: '临沧',
    label: '临沧'
  },{
    value: '丽江',
    label: '丽江'
  },{
    value: '六库',
    label: '六库'
  },{
    value: '潞西',
    label: '潞西'
  },{
    value: '曲靖',
    label: '曲靖'
  },{
    value: '思茅',
    label: '思茅'
  },{
    value: '文山',
    label: '文山'
  },{
    value: '西双版纳',
    label: '西双版纳'
  },{
    value: '玉溪',
    label: '玉溪'
  },{
    value: '中甸',
    label: '中甸'
  },{
    value: '昭通',
    label: '昭通'
  }],
}, {
  value: '浙江',
  label: '浙江',
  children: [{
    value: "杭州",
    label: '杭州'
  },{
    value: "温州",
    label: '温州'
  },{
    value: '安吉',
    label: '安吉'
  },{
    value: '慈溪',
    label: '慈溪'
  },{
    value: '定海',
    label: '定海'
  },{
    value: '奉化',
    label: '奉化'
  },{
    value: '海盐',
    label: '海盐'
  },{
    value: '黄岩',
    label: '黄岩'
  },{
    value: '湖州',
    label: '湖州'
  },{
    value: '嘉兴',
    label: '嘉兴'
  },{
    value: '金华',
    label: '金华'
  },{
    value: '临安',
    label: '临安'
  },{
    value: '临海',
    label: '临海'
  },{
    value: '丽水',
    label: '丽水'
  },{
    value: '宁波',
    label: '宁波'
  },{
    value: '瓯海',
    label: '瓯海'
  },{
    value: '平湖',
    label: '平湖'
  },{
    value: '千岛湖',
    label: '千岛湖'
  },{
    value: '衢州',
    label: '衢州'
  },{
    value: '江山',
    label: '江山'
  },{
    value: '瑞安',
    label: '瑞安'
  },{
    value: '绍兴',
    label: '绍兴'
  },{
    value: '嵊州',
    label: '嵊州'
  },{
    value: '台州',
    label: '台州'
  },{
    value: '温岭',
    label: '温岭'
  },{
    value: '余姚',
    label: '余姚'
  },{
    value: '舟山',
    label: '舟山'
  }],
}, {
  value: '海外',
  label: '海外',
  children: [{
    value: "美国",
    label: '美国'
  },{
    value: '日本',
    label: '日本'
  },{
    value: '英国',
    label: '英国'
  },{
    value: '法国',
    label: '法国'
  },{
    value: '德国',
    label: '德国'
  },{
    value: '其他',
    label: '其他'
  }],
}];

function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}
class City extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: []
    }
  }
  onChange = (r1, r2) => {
    // debugger
    this.props.onChange(r1, r2)
    this.setState({ value: r1 })
  }
  componentDidUpdate(prevProps) {
		const { item, currentReplyComment } = this.props;
    if ( this.props.value  && (!prevProps.value
          || prevProps.value[1] != this.props.value[1] || prevProps.value[0] != this.props.value[0])) {
      this.setState({ value: this.props.value })
		}
	}
  render(){
    const { defaultValue, matchInputWidth, className, popupClassName } = this.props
    const { value } = this.state
    // 这里用请选择所在省市的话，会触发chrome的地址选择
    return(
      <Cascader allowClear size="large" options={options} placeholder="请选择所在地" onChange={this.onChange}
        matchInputWidth={matchInputWidth}
        value={value}
        showSearch={{ filter }}
        className={className}
        popupClassName={popupClassName}
      ></Cascader>
    )
  }
}
export default City;