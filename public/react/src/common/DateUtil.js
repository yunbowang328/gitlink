import moment  from "moment";

// 处理整点 半点
// 取传入时间往后的第一个半点
export function handleDateString(dateString) {
  if (!dateString) return dateString;
  const ar = dateString.split(':')
  if (ar[1] == '00' || ar[1] == '30') {
    return dateString
  }
  const miniute = parseInt(ar[1]);
  if (miniute < 30 || miniute == 60) {
    return [ar[0], '30'].join(':')
  }
  if (miniute < 60) { 
    // 加一个小时
    const tempStr = [ar[0], '00'].join(':');
    const format = "YYYY-MM-DD HH:mm";
    const _moment = moment(tempStr, format)
    _moment.add(1, 'hours')
    return _moment.format(format)
  }
  
  return dateString
}

// 给moment对象取下一个半点或整点
export function getNextHalfHourOfMoment(moment) {
  if (!moment) {
    return moment
  }
  const minutes = moment.minutes()
  if (minutes < 30) {
    moment.minutes(30)
  } else if (minutes < 60) {
    moment.minutes(0).add(1, 'hours')
  }
  return moment
}

export function formatDuring(mss){
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	// console.log("formatDuringformatDuring");
	// console.log(days);
	// console.log(hours);
	// console.log(minutes);
	// console.log(Math.abs(days));
	// console.log(Math.abs(hours));
	// console.log(Math.abs(minutes));

	try {
		days = Math.abs(days);
	} catch (e) {

	}
	try {
		hours = Math.abs(hours);
	} catch (e) {

	}
	try {
		minutes = Math.abs(minutes);
	} catch (e) {

	}
  return days + "天" + hours + "小时" + minutes + "分";
}