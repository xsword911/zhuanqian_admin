import util from "@/utils/util.js";

const token			= "token";				//token
const uid				= "uid";				//用户uid
const rechargeUnknownSum = 'rechargeUnknownSum'  //未审核充值记录总数
const drawUnknownSum = 'drawUnknownSum'  //未审核提现记录总数

const rechargeUnknownIdMax = 'rechargeUnknownIdMax'  //未审核充值记录最大id
const drawUnknownIdMax = 'drawUnknownIdMax'  //未审核提现记录最大id

//封装保存本地数据操作
const storage = {

	//保存我的数据
	setMyInfo: function(data) {
		localStorage.setItem(myInfo, data);
	},

	//获取我的数据
	getMyInfo: function() {
		return localStorage.getItem(myInfo);
	},

	//退出登录
	outLogin: function() {
		localStorage.removeItem({key: myInfo});
		localStorage.removeItem({key: myBankInfo});
	},

	//保存用户账号和密码
	setUserPwd: function(data) {
		localStorage.setItem(userPwd, data);
	},

	//获取用户账号和密码
	getUserPwd: function() {
		return localStorage.getItem(userPwd);
	},

	//删除用户账号和密码
	delUserPwd: function() {
		localStorage.removeItem({
			key: userPwd
		})
	},

	//保存token
	setToken(data){
		localStorage.setItem(token, data);
	},

	//获取token
	getToken(){
		return localStorage.getItem(token);
	},

	//保存uid
	setUid(data){
		localStorage.setItem(uid, data);
	},

	//获取uid
	getUid(){
		return localStorage.getItem(uid);
	},

  //保存未审核充值记录总数
  setRechargeUnknownSum(data){
  	localStorage.setItem(rechargeUnknownSum, data);
  },

  //获取未审核充值记录总数
  getRechargeUnknownSum(){
  	return localStorage.getItem(rechargeUnknownSum);
  },

  //保存未审核提现记录总数
  setDrawUnknownSum(data){
  	localStorage.setItem(drawUnknownSum, data);
  },

  //获取未审核提现记录总数
  getDrawUnknownSum(){
  	return localStorage.getItem(drawUnknownSum);
  },

  //保存未审核充值记录最大id
  setRechargeUnknownIdMax(data){
  	localStorage.setItem(rechargeUnknownIdMax, data);
  },

  //获取未审核充值记录最大id
  getRechargeUnknownIdMax(){
  	return localStorage.getItem(rechargeUnknownIdMax);
  },
  
  //保存未审核提现记录最大id
  setDrawUnknownIdMax(data){
  	localStorage.setItem(drawUnknownIdMax, data);
  },
  
  //获取未审核提现记录最大id
  getDrawUnknownIdMax(){
  	return localStorage.getItem(drawUnknownIdMax);
  },
};

export default storage;
