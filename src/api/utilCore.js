import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/utils/util.js";

//封装保存本地数据操作
const utilCore = {
	//设备号登录（游客登录）
	loginByDevice(){
		let device = util.getUuid();
		api.loginByOth({deviceId: device}, (res)=>{
			let uid = api.getData(res);
			let token = api.getToken(res);
			storage.setUid(uid);  //保存uid
			storage.setLoginType(0);   //保存登录方式，设备号登录
		});
	},

};

export default storage;
