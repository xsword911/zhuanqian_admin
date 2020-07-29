<template>
  <div class="index-container">
<!--         <vab-query-form-right-panel>
           <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
              >添加
            </el-button>
            <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
              >删除
            </el-button>
            <el-button type="primary" @click="testMessage">baseMessage</el-button>
            <el-button type="primary" @click="testALert">baseAlert</el-button>
            <el-button type="primary" @click="testConfirm">baseConfirm</el-button>
            <el-button type="primary" @click="testNotify">baseNotify</el-button>
          </vab-query-form-right-panel> -->
    <el-row v-if="nodeEnv == '!development'" :gutter="15">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>
          <div slot="header">
            开源版本
            <el-button style="float: right; padding: 3px 0;" type="text"
              >永久免费</el-button
            >
          </div>
          <div>
            <ul>
              <li>永久开源免费</li>
              <li>
                开源地址
                <a
                  target="_blank"
                  href="https://github.com/chuzhixin/vue-admin-beautiful"
                  >支持白嫖，也请给个star</a
                >
              </li>
              <li>提供问题讨论群972435319</li>
              <li>
                提供
                <a href="https://chu1204505056.gitee.io/vab-bookmarks/"
                  >讨论群专属文档</a
                >
              </li>
              <li>
                只需保留控制台打印的框架信息即可免费商用
              </li>
            </ul>
            <img src="@/assets/ewm.png" alt="" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>
          <div slot="header">
            商业用途 随意修改版权 提供vip群
            <el-button style="float: right; padding: 3px 0;" type="text"
              >￥299+￥100</el-button
            >
          </div>
          <div>
            <ul>
              <li>支持以上所有特权</li>
              <li>提供VIP讨论群805808910，群主每周定时授课</li>
              <li>
                提供vip群专属文档加群获取，可快速入手框架，并迅速学会脚手架搭建，webpack打包优化
              </li>
              <li>
                可随意变更版权，但仅限自己团队使用，一旦发现恶意传播，二次售卖，不再提供更新支持
              </li>
              <li>你会得到意想不到的回报</li>
              <li>QQ咨询 1204505056</li>
            </ul>
            <img src="@/assets/ewm_vip.png" alt="" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>
          <div slot="header">
            商业用途 永久更新维护 免费附带vip群（可加4名员工）
            <el-button style="float: right; padding: 3px 0;" type="text"
              >￥1499</el-button
            >
          </div>
          <div>
            <ul>
              <li>支持以上所有特权</li>
              <li>永久更新</li>
              <li>优先问题解答</li>
              <li>提供低价外包合作机会</li>
            </ul>
            <img src="@/assets/ewm_vip.png" alt="" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      nodeEnv: process.env.NODE_ENV,
    };
  },
  created() {},
  mounted() {
     // this.login();
  },
  methods: {
    // login(){
    //   api.login({"account": "admin1", "pwd": "111111", "type": 1}, (res) => {
    //     let code = api.getCode(res);
    //     let msg = api.getMsg(res);
    //     if (code == 0) {
    //       let uid = api.getUid(res);
    //       let token = api.getToken(res);
    //       storage.setToken(token);
    //       storage.setUid(uid);
    //     }
    //   })
    // },
    testMessage() {
      this.$baseMessage("test1", "success");
    },
    testALert() {
      this.$baseAlert("11");
      this.$baseAlert("11", "自定义标题", () => {
        /* 可以写回调; */
      });
      this.$baseAlert("11", null, () => {
        /* 可以写回调; */
      });
    },
    testConfirm() {
      this.$baseConfirm(
        "你确定要执行该操作?",
        null,
        () => {
          /* 可以写回调; */
        },
        () => {
          /* 可以写回调; */
        }
      );
    },
    testNotify() {
      this.$baseNotify("测试消息提示", "test", "success", "bottom-right");
    },
    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    handleEdit(row) {
      this.$refs["edit"].showEdit(row);
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await doDelete({ ids: row.id });
          this.$baseMessage(msg, "success");
          this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join();
          this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            const { msg } = await doDelete({ ids: ids });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          this.$baseMessage("未选中任何行", "error");
          return false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index-container {
  ::v-deep {
    .el-card__body {
      > div {
        min-height: 70vh;
        padding: 20px;

        > ul {
          > li {
            line-height: 30px;
          }
        }

        > img {
          display: block;
          margin: 40px auto;
          border: 1px solid #dedede;
        }
      }
    }
  }
}
</style>
