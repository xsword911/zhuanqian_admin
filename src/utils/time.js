
//时间转换操作
module.exports = {
	//秒数转换时分秒
	timeChange(auditLong){
		if(auditLong == null) return "";
		let res = "";
		let sp = auditLong;
		let hour = parseInt(auditLong / 3600);
		if(hour > 0) res += `${hour}小时`;
		let min = parseInt([auditLong - (hour * 3600)] / 60);
		if(min > 0) res += `${min}分`;
		let second = parseInt(auditLong - [(hour * 3600) + (min * 60)]);
		if(second > 0) res += `${second}秒`;
		
		return res;
	},
	
	//倒计时(时间戳)转换时分秒
	toHHmmss (data) {
	   var time;
	   var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	   var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
	   var seconds = (data % (1000 * 60)) / 1000;
	   time = (hours < 10 ? ('0' + hours) : hours) + '小时' + (minutes < 10 ? ('0' + minutes) : minutes) + '分' + (seconds < 10 ? ('0' + seconds) : seconds)+ '秒';
	   return time;
	},
	
	//获取前n天或者后n天的日期
	getDateNext(date, day){		
		date = this.getDate2Time(date);
		let val = new Date(date + (day * 24 * 3600 * 1000));
		return this.formatYMD(val);
	},
	
	//日期字符串转时间戳
	getDate2Time(date){
		let val = new Date(date).getTime();
		return val
	},
	
	//获取当前时间  yyyy-MM-dd-HH-mm-ss
	getNowTime(){
		var date = new Date();
		//年
		var year = date.getFullYear();
		//月
		var month = date.getMonth()+1;
		if(month < 10) month = "0" + month;
		//日
		var day = date.getDate();
		if(day < 10) day = "0" + day;
		//时
		var hh = date.getHours();
		if(hh < 10) hh = "0" + hh;
		//分
		var mm = date.getMinutes();
		if(mm < 10) mm = "0" + mm;
		//秒
		var ss = date.getSeconds();
		if(ss < 10) ss = "0" + ss;
		
		var rq = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
		return rq;
	},
	
	//获取当前时间  HH-mm-ss
	getNowTimeHMS(){
		var date = new Date();
		//时
		var hh = date.getHours();
		if(hh < 10) hh = "0" + hh;
		//分
		var mm = date.getMinutes();
		if(mm < 10) mm = "0" + mm;
		//秒
		var ss = date.getSeconds();
		if(ss < 10) ss = "0" + ss;
		
		var rq = hh + ":" + mm + ":" + ss;
		return rq;
	},
	
	//获取今天的开始时间
	getNowBeg(){
		let day = new Date();
		return this.getDateBeg(day);
	},
	
	//获取今天的结束时间
	getNowEnd(){
		let day = new Date();
		return this.getDateEnd(day);
	},
	
	//
	getDateBeg(date){
		let day = this.formatYMD(date);
		return day + " 00:00:00";
	},
	
	getDateEnd(date){
		let day = this.formatYMD(date);
		return day + " 23:59:59";
	},
	
	//格式化字符串为年月日格式
	formatYMD(date){
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		if(m < 10) m = '0' + m;
		let d = date.getDate();
		if(d < 10) d = '0' + d;
		return y + '-' + m + '-' + d;
	},
}


