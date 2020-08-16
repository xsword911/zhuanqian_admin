import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },

  {
    path: "/user",
    component: Layout,
    // redirect: "noRedirect",
    name: "PersonnelManagement",
    meta: { title: "人员", icon: "user-alt", permissions: ["admin"] },
    children: [
      {
        path: "userManagement",
        name: "UserManagement",
        component: () => import("@/views/user/table/index"),
        meta: { title: "用户管理" },
      },
      {
        path: "userRegister",
        name: "UserRegister",
        component: () => import("@/views/user/form/index"),
        meta: { title: "用户注册" },
      },
    ],
  },

  {
    path: "/sign",
    component: Layout,
    // redirect: "noRedirect",
    name: "sign",
    meta: {
      title: "签到管理",
      icon: "calendar-check",
      permissions: ["admin"],
    },
    children: [
      {
        path: "signAward",
        name: "SignAward",
        component: () => import("@/views/sign/awardTable/index"),
        meta: { title: "签到设置" },
      },
      {
        path: "signRecord",
        name: "SignRecord",
        component: () => import("@/views/sign/recordTable/index"),
        meta: { title: "签到记录" },
      }
    ],
  },


  {
    path: "/luckDraw",
    component: Layout,
    // redirect: "noRedirect",
    name: "luckDraw",
    meta: {
      title: "幸运抽奖",
      icon: "gift",
      permissions: ["admin"],
    },
    children: [
      {
        path: "luckDrawManagement",
        name: "LuckDrawManagement",
        component: () => import("@/views/luckDraw/awardTable/index"),
        meta: { title: "抽奖设置" },
      },
      {
        path: "luckDrawTable",
        name: "LuckDrawTable",
        component: () => import("@/views/luckDraw/recordTable/index"),
        meta: { title: "抽奖记录" },
      }
    ],
  },


  {
    path: "/work",
    component: Layout,
    // redirect: "noRedirect",
    name: "work",
    meta: {
      title: "任务管理",
      icon: "tasks",
      permissions: ["admin"],
    },
    children: [
      {
        path: "workManagement",
        name: "WorkManagement",
        component: () => import("@/views/work/awardTable/index"),
        meta: { title: "任务设置" },
      },
      {
        path: "workTable",
        name: "WorkTable",
        component: () => import("@/views/work/recordTable/index"),
        meta: { title: "任务记录" },
      }
    ],
  },


  {
    path: "/finance",
    component: Layout,
    // redirect: "noRedirect",
    name: "finance",
    meta: {
      title: "财务管理",
      icon: "scroll",
      permissions: ["admin"],
    },
    children: [
      {
        path: "recharge",
        name: "Recharge",
        redirect: "noRedirect",
        alwaysShow: true,
        component: EmptyLayout,
        meta: { title: "收款设置" },

        children: [
          {
            path: "bankTable",
            name: "BankTable",
            component: () => import("@/views/finance/recharge/bankTable/index"),
            meta: { title: "银行设置" },
          },
          {
            path: "rechargeType",
            name: "RechargeType",
            component: () => import("@/views/finance/recharge/rechargeType/index"),
            meta: { title: "渠道大类" },
          },
          {
            path: "rechargeWay",
            name: "RechargeWay",
            component: () => import("@/views/finance/recharge/rechargeWay/index"),
            meta: { title: "充值渠道" },
          },



          {
            path: "rechargeAccount",
            name: "RechargeAccount",
            component: () => import("@/views/finance/recharge/rechargeAccount/index"),
            meta: { title: "收款账户" },
          }


        ],
      },
      {
        path: "rechargeExamine",
        name: "RechargeExamine",
        component: () => import("@/views/finance/recharge/rechargeTable/index"),
        meta: { title: "充值审核" },
      },
      {
        path: "welfare",
        name: "Welfare",
        component: () => import("@/views/finance/examineTable/index"),
        meta: { title: "提现审核" },
      },
      {
        path: "change",
        name: "Change",
        component: () => import("@/views/finance/changeTable/index"),
        meta: { title: "额度转换" },
      },
      {
        path: "goldTable",
        name: "GoldTable",
        component: () => import("@/views/finance/goldTable/index"),
        meta: { title: "金币明细" },
      },
      {
        path: "moneyTable",
        name: "MoneyTable",
        component: () => import("@/views/finance/moneyTable/index"),
        meta: { title: "账变明细" },
      }
    ],
  },

  {
    path: "/statistics",
    component: Layout,
    // redirect: "noRedirect",
    name: "statistics",
    meta: {
      title: "统计报表",
      icon: "chart-area",
      permissions: ["admin"],
    },
    children: [
      {
        path: "roleManagement",
        name: "RoleManagement",
        component: () => import("@/views/statistics/userTable/index"),
        meta: { title: "个人概览" },
      },
      {
        path: "dayStatisticsTable",
        name: "DayStatisticsTable",
        component: () => import("@/views/statistics/todayTable/index"),
        meta: { title: "日报表" },
      },
      {
        path: "monthStatisticsTable",
        name: "MonthStatisticsTable",
        component: () => import("@/views/statistics/monthTable/index"),
        meta: { title: "月报表" },
      }
    ],
  },

  {
    path: "/notice",
    component: Layout,
    // redirect: "noRedirect",
    name: "notice",
    meta: {
      title: "通知设置",
      icon: "volume-up",
      permissions: ["admin"],
    },
    children: [
      {
        path: "tran",
        name: "Tran",
        component: () => import("@/views/notice/tran/index"),
        meta: { title: "轮播图" },
      },
      {
        path: "runHorse",
        name: "RunHorse",
        component: () => import("@/views/notice/runHorse/index"),
        meta: { title: "跑马灯" },
      },
      {
        path: "notice",
        name: "Notice",
        component: () => import("@/views/notice/notice/index"),
        meta: { title: "公告" },
      },
      {
        path: "userMessage",
        name: "UserMessage",
        component: () => import("@/views/notice/userMessage/index"),
        meta: { title: "站内信" },
      },
      {
        path: "systemMessage",
        name: "SystemMessage",
        component: () => import("@/views/notice/systemMessage/index"),
        meta: { title: "系统消息" },
      },
    ],
  },

  {
    path: "/assist",
    component: Layout,
    // redirect: "noRedirect",
    name: "assist",
    meta: {
      title: "资讯设置",
      icon: "envelope",
      permissions: ["admin"],
    },
    children: [
      {
        path: "msg",
        name: "Msg",
        component: () => import("@/views/information/msg/index"),
        meta: { title: "资讯" },
      },
      {
        path: "question",
        name: "Question",
        component: () => import("@/views/information/question/index"),
        meta: { title: "常见问题" },
      },
      {
        path: "agent",
        name: "Agent",
        component: () => import("@/views/information/agent/index"),
        meta: { title: "代理分佣" },
      },
      {
        path: "guide",
        name: "Guide",
        component: () => import("@/views/information/guide/index"),
        meta: { title: "新手指南" },
      }
    ],
  },


  {
    path: "/setting",
    component: Layout,
    // redirect: "noRedirect",
    name: "setting",
    meta: {
      title: "系统参数",
      icon: "cogs",
      permissions: ["admin"],
    },
    children: [
      {
        path: "settingLogin",
        name: "SettingLogin",
        component: () => import("@/views/setting/table/index"),
        meta: { title: "系统配置" },
      },
      {
        path: "settingAdd",
        name: "SettingAdd",
        component: () => import("@/views/setting/form/index"),
        meta: { title: "添加系统配置" },
      }
    ],
  },


  {
    path: "/admin",
    component: Layout,
    // redirect: "noRedirect",
    name: "admin",
    meta: {
      title: "系统管理",
      icon: "users-cog",
      permissions: ["admin"],
    },
    children: [
      {
        path: "adminManagement",
        name: "AdminManagement",
        component: () => import("@/views/admin/table/index"),
        meta: { title: "管理员" },
      },
      {
        path: "adminRegister",
        name: "AdminRegister",
        component: () => import("@/views/admin/form/index"),
        meta: { title: "管理员注册" },
      }
    ],
  },



  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: "hash",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
