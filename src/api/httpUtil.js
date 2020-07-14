import axios from "axios";
import config from "@/api/config.js";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "";

const httpUtil = {
  post: function (url, postData, funSuccess) {
    return new Promise((resolve, reject) => {
      axios.post((url = config.BASE_URL + "/api/" + url), postData).then(
        (res) => {
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
