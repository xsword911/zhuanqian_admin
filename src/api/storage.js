import util from "@/utils/util.js";

const token			= "token";				//token
const uid				= "uid";				//用户uid

//封装保存本地数据操作
module.exports = {
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
}
