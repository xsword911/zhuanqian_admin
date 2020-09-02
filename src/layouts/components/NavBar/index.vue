<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            :title="collapse ? '展开' : '收起'"
            class="fold-unfold"
            @click="handleCollapse"
          ></i>
          <breadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
         <audio controls="controls" hidden :src="require('@/assets/up.mp3')" ref="upAudio"></audio>
          <audio controls="controls" hidden :src="require('@/assets/down.mp3')" ref="downAudio"></audio>
          <div class="record" @click="toRecharge">未审核充值记录（<div class="record_sum"> {{rechargeUnknownSum}} </div>）</div>
          <div class="record" @click="toExamine" style="margin-right:10px;">未审核提现记录（<div class="record_sum"> {{drawUnknownSum}} </div>）</div>
          <error-log></error-log>
          <full-screen-bar @refresh="refreshRoute"></full-screen-bar>
          <!-- <theme-bar></theme-bar>-->
          <vab-icon
            title="重载所有路由"
            :pulse="pulse"
            :icon="['fas', 'redo']"
            @click="refreshRoute"
          ></vab-icon>
          <avatar></avatar>
<!--           <vab-icon
            title="退出系统"
            :icon="['fas', 'sign-out-alt']"
            @click="logout"
          /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import util from "@/utils/util.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import {
  Avatar,
  Breadcrumb,
  ErrorLog,
  FullScreenBar,
  ThemeBar,
} from "@/layouts/components";

export default {
  name: "NavBar",
  components: {
    Avatar,
    Breadcrumb,
    ErrorLog,
    FullScreenBar,
    ThemeBar,
  },
  data() {
    return {
      pulse: false,
      intervalId: null,  //定时器id
      rechargeUnknownSum: null, //未审核充值记录总数
      drawUnknownSum: null,  //未审核提现记录总数
    };
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
      visitedRoutes: "tagsBar/visitedRoutes",
      device: "settings/device",
      routes: "routes/routes",
    }),
  },
  mounted() {
    this.refresh();
    this.intervalId = setInterval(this.refresh, 3000);  //开启定时刷新计时器
  },
  destroyed() {
    if(util.isEmpty(this.intervalId)) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
  methods: {
    //获取未审核充值记录总数
    getRechargeUnknownSum(){
      api.getRechargeUnknownSum({}, (res)=>{
        let oldData = storage.getRechargeUnknownSum();  //获取本地未审核充值记录总数
        if(oldData != res.data){
            storage.setRechargeUnknownSum(res.data);  //保存最新未审核充值记录总数
            this.rechargeUnknownSum = res.data;
            this.rechargePlay();   //播放充值语音
        }
        else this.rechargeUnknownSum = oldData;
      });
    },
    //获取未审核提现记录总数
    getDrawUnknownSum(){
      api.getDrawUnknownSum({}, (res)=>{
        let oldData = storage.getDrawUnknownSum();  //获取本地未审核提现记录总数
        if(oldData != res.data){
          storage.setDrawUnknownSum(res.data);  //保存最新未审核提现记录总数
          this.drawUnknownSum = res.data;
          this.drawPlay();   //播放提现语音
        }
        else this.drawUnknownSum = oldData;
      });
    },
    //跳转到充值审核
    toRecharge(){
      this.$router.push({
        name: 'RechargeExamine',
        params: {
          state: 0
        }
      });
    },
    //跳转到提现审核
    toExamine(){
      this.$router.push('/finance/welfare');
    },
    //定时刷新
    refresh(){
        this.getRechargeUnknownSum();  //获取未审核充值记录总数
        this.getDrawUnknownSum();  //获取未审核提现记录总数
    },
    //播放提现语音
    drawPlay(){
      // let music = new Audio();
      // music.src = "@/assets/down.mp3";
      // music.play();
      //this.$refs.downAudio.currentTime = 0; //从头开始播放提示音
      this.$refs.downAudio.play(); //播放
    },
    //播放充值语音
    rechargePlay(){
      //this.$refs.upAudio.currentTime = 0; //从头开始播放提示音
      this.$refs.upAudio.play(); //播放
    },
    handleCollapse() {
      this.$store.dispatch("settings/changeCollapse");
    },
    async refreshRoute() {
      this.$baseEventBus.$emit("reloadRouterView");
      this.pulse = true;
      setTimeout(() => {
        this.pulse = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: relative;
  height: 50px;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 50px;
    max-height: 50px;

    .fold-unfold {
      margin-left: 10px;
      font-size: 20px;
      color: $base-color-gray;
      cursor: pointer;
    }

    ::v-deep {
      .breadcrumb-container {
        margin-left: 10px;
      }
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: 50px;

    .record{
      // background-color: #808080;

      .record_sum{
          display:inline-block;
          color:#FF0000;
      }

    }

    .record:hover{
      cursor: pointer;
    }

    ::v-deep {
      .user-avatar {
        margin-top: 2px;
        margin-right: 5px;
        font-weight: 600;
        cursor: pointer;
      }

      .user-name {
        position: relative;
        top: -14px;
        margin-right: 35px;
        margin-left: 5px;
        font-weight: 600;
        cursor: pointer;
      }

      .user-name + i {
        position: absolute;
        top: 16px;
        right: 15px;
      }

      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: $base-color-gray;
        cursor: pointer;
        fill: $base-color-gray;
      }

      button {
        svg {
          margin-right: 0;
          color: $base-color-white;
          cursor: pointer;
          fill: $base-color-white;
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
