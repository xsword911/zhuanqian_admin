import Vue from "vue";
import router from "../router";
import store from "../store";
import axios from "axios";

import config from "@/api/config.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/utils/util.js";

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/accessToken";


axios.defaults.timeout = 5000;
axios.defaults.baseURL = "";

const httpUtil = {
  getToken: function(res) {return res.data.token},
  getCode: function(res) {return res.data.code},

  post: function (url, postData, funSuccess) {
    let token = storage.getToken();
    axios.defaults.headers.common["token"] = token;
    return new Promise((resolve, reject) => {
      axios.post((url = config.BASE_URL + "/api/" + url), postData).then(
        (res) => {
            let token = this.getToken(res);

            //判断是否有token
            if(!util.isEmpty(token) && token.length == 17)
            {
              let oldToken = storage.getToken();
              //token不同时保存新token
              if(token != oldToken) storage.setToken(token);
            }

            //验证token是否失效
            let code = this.getCode(res);
            if(code == 10000)
            {
              const fullPath = router.currentRoute.fullPath;
              console.log(fullPath);

              console.log(res);
            	//清理旧数据
            	storage.setToken("");
            	storage.setUid("");

              //store.dispatch("user/logout");
              removeAccessToken();//删除token
              router.push(`/login?redirect=${fullPath}`);

            	//跳转登录界面
              //const fullPath = router.fullPath;
              //router.push(`/login?redirect=/`);
            	return;
            }
            resolve(funSuccess(res.data));
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
};

export default httpUtil;
