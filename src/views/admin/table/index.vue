<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">

      <vab-query-form-left-panel style="max-width:84px;">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
          >添加</el-button
        >
      </vab-query-form-left-panel>

     <vab-query-form-right-panel style="flex: 1;">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.account" placeholder="用户名" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.uid" placeholder="用户uid" clearable />
          </el-form-item>
<!--          <el-form-item>
            <el-input v-model="queryForm.code" placeholder="邀请码" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.upper" placeholder="直属上级" />
          </el-form-item> -->
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
              >查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
      border
      stripe
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
<!--      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column prop="account" label="用户名" sortable></el-table-column>
      <el-table-column prop="uid" label="uid" sortable></el-table-column>
<!--      <el-table-column prop="deviceId" label="登录设备"></el-table-column>
      <el-table-column prop="nick" label="昵称"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column> -->
      <el-table-column prop="otpSecret" label="口令密码" sortable></el-table-column>

<!--     <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="scope.row.img"
          ></el-image>
        </template>
      </el-table-column> -->

     <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.status | statusFilter"
              >{{ scope.row.stateTest }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="最后一次登录时间" sortable></el-table-column>
     <el-table-column prop="ip" label="最后一次ip时间" sortable></el-table-column>
      <el-table-column prop="loginNum" label="登录次数" sortable></el-table-column>
      <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button> -->
         <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
<!--          <el-button type="text" @click="handleUpdPwd(scope.row)"
             >修改密码
           </el-button> -->
          <el-button style="padding:0;margin:0 0 0 10px;border: none;">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">操作</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="beforeHandleCommand(2, scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item :command="beforeHandleCommand(0, scope.row, '解冻', 0)">解冻</el-dropdown-item>
                  <!-- <el-dropdown-item command="冻结">冻结</el-dropdown-item> -->
                  <el-dropdown-item :command="beforeHandleCommand(0, scope.row, '禁用', 2)">禁用</el-dropdown-item>
                  <el-dropdown-item :command="beforeHandleCommand(1, scope.row)">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.count"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <upd-table-edit ref="updEdit" @refreshList="fetchData"></upd-table-edit>
    <check-table-edit ref="checkEdit"></check-table-edit>
    <upd-pwd ref="updPwd" @refreshList="fetchData"></upd-pwd>
    <upd-state ref="updState" @refreshList="fetchData"></upd-state>
    <add-table-edit ref="edit" @refreshList="fetchData"></add-table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
import updPwd from "./components/updPwd";
import updState from "./components/updState";
import addTableEdit from "./components/addTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit,
    updPwd,
    updState,
    addTableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: "success",
        frozen: "gray",
        ban: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: null,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        type: 1,
        account: "",
        tel: "",
        code: "",
        upper: "",
        stateTest: "",
        state: null
      },
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //封装下拉菜单传入参数  type 0解冻封号操作 1修改密码操作 2编辑
    beforeHandleCommand(type, row, test, stateCode){
        if(type == 0){
          return {
            'test': test,
            'stateCode': stateCode,
            'row': row,
            'type': 0
          }
        }
        else if(type == 1) return {'type': 1, 'row': row};
        else if(type == 2) return {'type': 2, 'row': row};
    },
    //下拉菜单操作  command.type  0解冻封号操作 1修改密码操作 2编辑
    handleCommand(command){
      if(command.type == 0)
      {
          this.$baseConfirm("你确定要" + command.test + "该账号？", null, async () => {
            let data = {
              id: command.row.id,
              state: command.stateCode
            };
            api.userStopOrCommon(data, (res)=>{
              let code = api.getCode(res);
              if(code == 0){
                this.$baseMessage(command.test + "成功", "success");
                this.$refs["form"].resetFields();
                this.dialogFormVisible = false;
                this.form = this.$options.data().form;
                this.fetchData();
              }else{
                let msg = api.getMsg(res);
                this.$message.error(msg);
              }
            });
          });
      }
      else if(command.type == 1)  this.handleUpdPwd(command.row);   //修改密码
      else if(command.type == 2)  this.handleEdit(command.row);   //编辑
    },


    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    tableSortChange() {
      const imageList = [];
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img);
      });
      this.imageList = imageList;
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleEdit(row) {
      this.$refs["updEdit"].showEdit(row);
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleUpdPwd(row) {
      this.$refs["updPwd"].showEdit(row);
    },
    handleUpdState(row) {
      this.$refs["updState"].showEdit(row);
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
    handleSizeChange(val) {
      this.queryForm.count = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.fetchData();
    },
    //搜索关键字
    handleQuery() {
      this.queryForm.state = null;
      this.queryForm.page = 1;
      if(!util.isEmpty(this.queryForm.stateTest)){
        switch (this.queryForm.stateTest){
          case '正常':
            this.queryForm.state = 0
            break;
          case '冻结':
            this.queryForm.state = 1
            break;
          case '管理员封号':
            this.queryForm.state = 2
            break;
          default:
            break;
        }
      }
      this.fetchData();
    },
    async fetchData() {

      this.listLoading = true;
      api.getUser(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.state){
                case 0:
                  item.status = 'normal';
                  item.stateTest = "正常";
                  break;
                case 1:
                  item.status = 'frozen';
                  item.stateTest = "冻结";
                  break;
                case 2:
                  item.status = 'ban';
                  item.stateTest = "管理员封号";
                  break;
                default:
                  break;
              }
           });
           this.total = api.getTotal(res);
           this.list = data;
         }
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 300);

    },
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
  },
};
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
