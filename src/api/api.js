import httpUtil from "@/api/httpUtil.js";
import config from "@/static/app/config.js";
//网络操作封装
const api = {
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

  //取返回数据内,uid数据
  getUid: function (res) {
    return res.data;
  },

  //取返回数据内,token数据
  getToken: function (res) {
    return res.token;
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


	//管理员注册用户
	registerByAdmin: function(path, funSuccess) {
    httpUtil.post('user/registerByAdmin', path, funSuccess);
  },

  //查询全部用户详细信息
  getUser: function (path, funSuccess) {
    httpUtil.post("user/getUser", path, funSuccess);
  },

  //根据uid查询某个用户详细信息
  getUserByUid: function(path, funSuccess) {httpUtil.post('user/getUserByUid', path, funSuccess);},

  //修改用户信息
  setUser: function (path, funSuccess) {
    httpUtil.post("user/setUser", path, funSuccess);
  },

  //管理员查询签到奖励
  getSign: function (path, funSuccess) {
    httpUtil.post("activity/getSign", path, funSuccess);
  },

  //管理员查询玩家签到情况
  getSignDetails: function (path, funSuccess) {
    httpUtil.post("activity/getSignDetails", path, funSuccess);
  },

  //批量删除签到领取情况
  delSignDetailsArr: function (path, funSuccess) {
    httpUtil.post("activity/delSignDetailsArr", path, funSuccess);
  },

  //添加签到奖励
  addSign: function (path, funSuccess) {
    httpUtil.post("activity/addSign", path, funSuccess);
  },

  //修改签到奖励
  updSign: function (path, funSuccess) {
    httpUtil.post("activity/updSign", path, funSuccess);
  },

  //批量删除签到奖励
  delSignArr: function (path, funSuccess) {
    httpUtil.post("activity/delSignArr", path, funSuccess);
  },

  //管理员查询抽奖列表
  getLucky: function (path, funSuccess) {
    httpUtil.post("activity/getLucky", path, funSuccess);
  },

  //添加抽奖配置
  addLucky: function (path, funSuccess) {
    httpUtil.post("activity/addLucky", path, funSuccess);
  },

  //修改抽奖配置
  updLucky: function (path, funSuccess) {
    httpUtil.post("activity/updLucky", path, funSuccess);
  },

  //批量删除抽奖配置
  delLuckyArr: function (path, funSuccess) {
    httpUtil.post("activity/delLuckyArr", path, funSuccess);
  },

  //管理员查询玩家抽奖记录
  getLuckyDetails: function (path, funSuccess) {
    httpUtil.post("activity/getLuckyDetails", path, funSuccess);
  },

  //管理员删除玩家抽奖记录
  delLuckyDetailsArr: function (path, funSuccess) {
    httpUtil.post("activity/delLuckyDetailsArr", path, funSuccess);
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

  //批量删除任务完成情况
  delTaskDetails: function (path, funSuccess) {
    httpUtil.post("activity/delTaskDetails", path, funSuccess);
  },

  //管理员查询玩家任务完成情况
  getTaskDetails: function (path, funSuccess) {
    httpUtil.post("activity/getTaskDetails", path, funSuccess);
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
  getMoneyDraw: function (path, funSuccess) {
    httpUtil.post("money/getMoneyDraw", path, funSuccess);
  },

  //审核提现记录
  updMoneyDraw: function (path, funSuccess) {
    httpUtil.post("money/updMoneyDraw", path, funSuccess);
  },

  //管理员查询玩家额度转换记录
  getMoneyTran: function (path, funSuccess) {
    httpUtil.post("money/getMoneyTran", path, funSuccess);
  },

  //管理员查询玩家日报表
  getStatisticsDay: function (path, funSuccess) {
    httpUtil.post("statistics/getStatisticsDay", path, funSuccess);
  },

  //管理员查询玩家月报表
  getStatisticsMonth: function (path, funSuccess) {
    httpUtil.post("statistics/getStatisticsMonth", path, funSuccess);
  },

  //用户活跃统计
  getUserStatistics: function (path, funSuccess) {
    httpUtil.post("statistics/getUserStatistics", path, funSuccess);
  },

  //查询充值记录
  getMoneyRecharge: function (path, funSuccess) {
    httpUtil.post("money/getMoneyRecharge", path, funSuccess);
  },

  //查询资讯列表
  getInformation: function (path, funSuccess) {
    httpUtil.post("message/getInformation", path, funSuccess);
  },

  //修改资讯
  updInformation: function (path, funSuccess) {
    httpUtil.post("message/updInformation", path, funSuccess);
  },

  //添加资讯
  addInformation: function (path, funSuccess) {
    httpUtil.post("message/addInformation", path, funSuccess);
  },

  //删除资讯
  delInformationArr: function (path, funSuccess) {
    httpUtil.post("message/delInformationArr", path, funSuccess);
  },

  //查询通知设置列表
  getNotice: function (path, funSuccess) {
    httpUtil.post("message/getNotice", path, funSuccess);
  },

  //查询通知设置列表
  updNotice: function (path, funSuccess) {
    httpUtil.post("message/updNotice", path, funSuccess);
  },

  //添加通知设置
  addNotice: function (path, funSuccess) {
    httpUtil.post("message/addNotice", path, funSuccess);
  },

  //删除通知设置
  delNoticeArr: function (path, funSuccess) {
    httpUtil.post("message/delNoticeArr", path, funSuccess);
  },

  //查询消息列表
  getMssage: function (path, funSuccess) {
    httpUtil.post("message/getMsg", path, funSuccess);
  },

  //删除消息记录
  delMsgArr: function (path, funSuccess) {
    httpUtil.post("message/delMsgArr", path, funSuccess);
  },

  //发消息
  sendMsg: function (path, funSuccess) {
    httpUtil.post("message/sendMsg", path, funSuccess);
  },

  //查询充值渠道
  getRechargeWay: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/getRechargeWay", path, funSuccess);
  },

  //修改充值渠道
  updRechargeWay: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/updRechargeWay", path, funSuccess);
  },

  //添加充值渠道
  addRechargeWay: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/addRechargeWay", path, funSuccess);
  },

  //批量删除充值渠道
  delRechargeWayArr: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/delRechargeWayArr", path, funSuccess);
  },

  //查询充值渠道大类
  getRechargeType: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/getRechargeType", path, funSuccess);
  },

  //添加充值渠道大类
  addRechargeType: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/addRechargeType", path, funSuccess);
  },

  //修改充值渠道大类
  updRechargeType: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/updRechargeType", path, funSuccess);
  },

  //批量删除充值渠道大类
  delRechargeTypeArr: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/delRechargeTypeArr", path, funSuccess);
  },

  //查询收款账户
  getRechargeAccount: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/getRechargeAccount", path, funSuccess);
  },

  //添加充值收款账户
  addRechargeAccount: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/addRechargeAccount", path, funSuccess);
  },

  //修改充值收款账户
  updRechargeAccount: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/updRechargeAccount", path, funSuccess);
  },

  //批量删除充值收款账户
  delRechargeAccountArr: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/delRechargeAccountArr", path, funSuccess);
  },

  //查询银行
  getBank: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/getBank", path, funSuccess);
  },

  //添加银行
  addBank: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/addBank", path, funSuccess);
  },

  //修改银行
  updBank: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/updBank", path, funSuccess);
  },

  //批量删除银行
  delBankArr: function (path, funSuccess) {
    httpUtil.post("money/rechargeWay/delBankArr", path, funSuccess);
  },

  //返回会员等级下拉信息
  getLevelDesc: function (path, funSuccess) {
    httpUtil.post("user/getLevelDesc", path, funSuccess);
  },

  //查询等级信息
  getUserLevel: function (path, funSuccess) {
    httpUtil.post("user/getUserLevel", path, funSuccess);
  },

  //修改等级信息
  updUserLevel: function (path, funSuccess) {
    httpUtil.post("user/updUserLevel", path, funSuccess);
  },

  //添加等级信息
  addUserLevel: function (path, funSuccess) {
    httpUtil.post("user/addUserLevel", path, funSuccess);
  },

  //批量删除等级信息
  delUserLevelArr: function (path, funSuccess) {
    httpUtil.post("user/delUserLevelArr", path, funSuccess);
  },

  //查询存款利率
  getPlanRate: function (path, funSuccess) {
    httpUtil.post("activity/planRate/getPlanRate", path, funSuccess);
  },

  //添加存款利率
  addPlanRate: function (path, funSuccess) {
    httpUtil.post("activity/planRate/addPlanRate", path, funSuccess);
  },

  //修改存款利率
  updPlanRate: function (path, funSuccess) {
    httpUtil.post("activity/planRate/updPlanRate", path, funSuccess);
  },

  //批量删除存款利率
  delPlanRateArr: function (path, funSuccess) {
    httpUtil.post("activity/planRate/delPlanRateArr", path, funSuccess);
  },

  //查询余额宝存款记录
  getPlanMoney: function (path, funSuccess) {
    httpUtil.post("activity/planRate/getPlanMoney", path, funSuccess);
  },

  //批量删除存钱记录
  delPlanMoneyArr: function (path, funSuccess) {
    httpUtil.post("activity/planRate/delPlanMoneyArr", path, funSuccess);
  },

  //查询任务类型
  getTaskType: function (path, funSuccess) {
    httpUtil.post("activity/getTaskType", path, funSuccess);
  },

  //禁用，解冻账户账户
  userStopOrCommon: function (path, funSuccess) {
    httpUtil.post("user/userStopOrCommon", path, funSuccess);
  },

  //查询任务大类
  getTaskBigClassify: function (path, funSuccess) {
    httpUtil.post("activity/task/getTaskBigClassify", path, funSuccess);
  },

  //添加任务大类
  addTaskBigClassify: function (path, funSuccess) {
    httpUtil.post("activity/task/addTaskBigClassify", path, funSuccess);
  },

  //修改任务大类
  updTaskBigClassify: function (path, funSuccess) {
    httpUtil.post("activity/task/updTaskBigClassify", path, funSuccess);
  },

  //批量删除任务大类
  delTaskBigClassifyArr: function (path, funSuccess) {
    httpUtil.post("activity/task/delTaskBigClassifyArr", path, funSuccess);
  },

  //查询任务分类
  getTaskClassify: function (path, funSuccess) {
    httpUtil.post("activity/task/getTaskClassify", path, funSuccess);
  },

  //添加任务分类
  addTaskClassify: function (path, funSuccess) {
    httpUtil.post("activity/task/addTaskClassify", path, funSuccess);
  },

  //修改任务分类
  updTaskClassify: function (path, funSuccess) {
    httpUtil.post("activity/task/updTaskClassify", path, funSuccess);
  },

  //批量删除任务分类
  delTaskClassifyArr: function (path, funSuccess) {
    httpUtil.post("activity/task/delTaskClassifyArr", path, funSuccess);
  },

  //审核任务记录
  auditTaskDetails: function (path, funSuccess) {
    httpUtil.post("activity/auditTaskDetails", path, funSuccess);
  },

  //审核充值记录
  updMoneyRecharge: function (path, funSuccess) {
    httpUtil.post("money/updMoneyRecharge", path, funSuccess);
  },

  //价款扣款
  moneyChange: function (path, funSuccess) {
    httpUtil.post("money/moneyChange", path, funSuccess);
  },

  //查询未审核充值记录总数
  getRechargeUnknownSum: function (path, funSuccess) {
    httpUtil.post("money/getRechargeUnknownSum", path, funSuccess);
  },

  //查询未审核提现记录总数
  getDrawUnknownSum: function (path, funSuccess) {
    httpUtil.post("money/getDrawUnknownSum", path, funSuccess);
  },

  //查询用户绑定银行表
  getUserBank: function (path, funSuccess) {
    httpUtil.post("user/getUserBank", path, funSuccess);
  },

  //修改用户绑定银行表
  updUserBank: function (path, funSuccess) {
    httpUtil.post("user/updUserBank", path, funSuccess);
  },

  //添加用户绑定银行表
  addUserBank: function (path, funSuccess) {
    httpUtil.post("user/addUserBank", path, funSuccess);
  },

  //批量删除用户绑定银行
  delUserBankArr: function (path, funSuccess) {
    httpUtil.post("user/delUserBankArr", path, funSuccess);
  },

  //修改资金密码
  updCashPwd: function (path, funSuccess) {
    httpUtil.post("user/updCashPwd", path, funSuccess);
  },

  //修改直属上级
  updUpper: function (path, funSuccess) {
    httpUtil.post("user/updUpper", path, funSuccess);
  },

  //后台查询系统配置
  getConfigByInfo: function (path, funSuccess) {
    httpUtil.post("system/getConfigByInfo", path, funSuccess);
  },

  //团队总览
  getStatisticsMonthGroup: function (path, funSuccess) {
    httpUtil.post("statistics/getStatisticsMonthGroup", path, funSuccess);
  },

  //团队总览
  getStatisticsMonth: function (path, funSuccess) {
    httpUtil.post("statistics/getStatisticsMonth", path, funSuccess);
  },

  //团队总览
  getStatisticsMonth: function (path, funSuccess) {
    httpUtil.post("statistics/getStatisticsMonth", path, funSuccess);
  },
  
  //查询未审核充值记录最大id
  getRechargeUnknownIdMax: function (path, funSuccess) {
    httpUtil.post("money/getRechargeUnknownIdMax", path, funSuccess);
  },
  
  //查找未审核现现记录的最大id
  getDrawUnknownIdMax: function (path, funSuccess) {
    httpUtil.post("money/getDrawUnknownIdMax", path, funSuccess);
  },
};

export default api;
