import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA } from "@/config/settings";
import {handleRandomImage} from "../../mock/utils";

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function getInfo(accessToken) {
  return {
    code: 200,
    msg: "success",
    data: {
      permissions: ["admin"],
      userName: "admin",
      avatar: handleRandomImage(50, 50),
    },
  };
  // return request({
  //   url: "/user/info",
  //   method: "post",
  //   data: {
  //     accessToken,
  //   },
  // });
}

export function logout() {
  return {
    code: 200,
    msg: "success",
  };
  // return request({
  //   url: "/logout",
  //   method: "post",
  // });
}
export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
