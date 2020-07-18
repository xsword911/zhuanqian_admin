import httpUtil from "@/api/httpUtil.js";
import config from "@/api/config.js";
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

  //返回上传文件Url
  getPostFileUrl: function (){
    return config.BASE_URL + "/api/external/uploadFileToCache";
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

  //管理员查询签到奖励
  getSign: function (path, funSuccess) {
    httpUtil.post("activity/getSign", path, funSuccess);
  },

  //管理员查询玩家签到情况
  getAdminInfo: function (path, funSuccess) {
    httpUtil.post("activity/getAdminInfo", path, funSuccess);
  },

  //管理员查询抽奖列表
  getLucky: function (path, funSuccess) {
    httpUtil.post("activity/getLucky", path, funSuccess);
  },

  //管理员查询玩家抽奖记录
  getLuckyDetailsInfo: function (path, funSuccess) {
    httpUtil.post("activity/getLuckyDetailsInfo", path, funSuccess);
  },

  //管理员添加任务
  addTask: function (path, funSuccess) {
    httpUtil.post("activity/addTask", path, funSuccess);
  },

  //管理员查询任务设置
  getTaskInfo: function (path, funSuccess) {
    httpUtil.post("activity/getTaskInfo", path, funSuccess);
  },

  //管理员修改任务
  updTask: function (path, funSuccess) {
    httpUtil.post("activity/updTask", path, funSuccess);
  },
  
  //管理员批量删除任务
  delTaskArr: function (path, funSuccess) {
    httpUtil.post("activity/delTaskArr", path, funSuccess);
  },

  //管理员查询玩家任务完成情况
  getTaskDetailsInfo: function (path, funSuccess) {
    httpUtil.post("activity/getTaskDetailsInfo", path, funSuccess);
  },

  //查询账变记录
  getMoney: function (path, funSuccess) {
    httpUtil.post("money/getMoney", path, funSuccess);
  },

  //查询金币账变记录
  getGold: function (path, funSuccess) {
    httpUtil.post("money/getGold", path, funSuccess);
  },

  //查询系统配置
  getConfig: function (path, funSuccess) {
    httpUtil.post("system/getConfig", path, funSuccess);
  },

  //添加系统配置
  addConfig: function (path, funSuccess) {
    httpUtil.post("system/addConfig", path, funSuccess);
  },

  //修改系统配置
  updConfig: function (path, funSuccess) {
    httpUtil.post("system/updConfig", path, funSuccess);
  },

  //删除系统配置
  delConfigArr: function (path, funSuccess) {
    httpUtil.post("system/delConfigArr", path, funSuccess);
  },

  //管理员查询玩家提现申请表
  getAdminMoneyDraw: function (path, funSuccess) {
    httpUtil.post("money/getAdminMoneyDraw", path, funSuccess);
  },

  //审核提现记录
  updMoneyDraw: function (path, funSuccess) {
    httpUtil.post("money/updMoneyDraw", path, funSuccess);
  },

  //管理员查询玩家额度转换记录
  getAdminMoneyTran: function (path, funSuccess) {
    httpUtil.post("money/getAdminMoneyTran", path, funSuccess);
  },
};
