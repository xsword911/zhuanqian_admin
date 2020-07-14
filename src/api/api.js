import httpUtil from "@/api/httpUtil.js";
//网络操作封装
module.exports = {
  //取返回数据内,code数据
  getCode: function (res) {
    return res.code;
  },

  //取返回数据内,msg数据
  getMsg: function (res) {
    return res.msg;
  },

  //取返回数据内,data数据
  getData: function (res) {
    return res.data.data;
  },

  //取返回数据内,total数据
  getTotal: function (res) {
    return res.data.total;
  },

  //获取图片路径
  getFileUrl(postData) {
    let url =
      config.baseUrl +
      "/File/FetchFile?pc=" +
      postData.pc +
      "&openId=" +
      postData.openId;
    return url;
  },

  //取返回数据内,page分页的列表数据.只返回分页列表数据,不返回总页数等数据
  getPageList: function (res) {
    return res.data.data;
  },

  //登录
  login: function (path, funSuccess) {
    httpUtil.post("user/login", path, funSuccess);
  },

  //注册
  register: function (path, funSuccess) {
    httpUtil.post("user/register", path, funSuccess);
  },

  //查询全部用户详细信息
  getUser: function (path, funSuccess) {
    httpUtil.post("user/getUser", path, funSuccess);
  },

  //修改用户信息
  setUser: function (path, funSuccess) {
    httpUtil.post("user/setUser", path, funSuccess);
  },

  //查询账变记录
  getMoney: function (path, funSuccess) {
    httpUtil.post("money/getMoney", path, funSuccess);
  },

  //查询金币账变记录
  getGold: function (path, funSuccess) {
    httpUtil.post("money/getGold", path, funSuccess);
  },
};
