<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">
      <vab-query-form-left-panel style="max-width:84px;">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd"
        >
          添加
        </el-button>
      </vab-query-form-left-panel>

      <vab-query-form-right-panel style="flex: 1;">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input
              v-model="queryForm.bankUserName"
              placeholder="开户人姓名"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="queryForm.account"
              placeholder="用户名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="queryForm.uid"
              placeholder="用户uid"
              clearable
            />
          </el-form-item>

          <!--          <el-form-item>
            <el-input v-model="queryForm.upper" placeholder="直属上级uid" clearable/>
          </el-form-item> -->

          <el-form-item>
            <el-select
              v-model="queryForm.level"
              placeholder="等级"
              clearable
            >
              <el-option-group
                v-for="group in level"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="queryForm.subType"
              placeholder="下级"
              clearable
            >
              <el-option-group
                v-for="group in branch"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.branch"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>

          <!--          <el-form-item>
            <el-input v-model="queryForm.code" placeholder="邀请码" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.upper" placeholder="直属上级" />
          </el-form-item> -->
          <el-form-item>
            <el-select
              v-model="value"
              placeholder="账号状态"
              clearable
            >
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
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
      <el-table-column
        prop="uid"
        label="uid"
        sortable
      >
        <template slot-scope="scope">
          <a
            :class="{'allSubSum': scope.row.allSubSum > 0}"
            @click="querySub(scope.row)"
          >{{ scope.row.uid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="用户名"
        sortable
      />
      <!-- <el-table-column prop="deviceId" label="登录设备"></el-table-column> -->
      <el-table-column
        prop="nick"
        label="昵称"
        sortable
      />
      <el-table-column
        prop="tel"
        label="手机号"
        sortable
      />
      <el-table-column
        prop="upper"
        label="直属上级"
        sortable
      >
        <template slot-scope="scope">
          <a
            class="allSubSum"
            @click="queryUpper(scope.row)"
          >{{ scope.row.upper }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="邀请码"
        sortable
      />
      <el-table-column
        prop="subSum"
        label="直属下级"
        sortable
      />
      <el-table-column
        prop="allSubSum"
        label="所有下级"
        sortable
      />

      <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag
              :type="scope.row.status | statusFilter"
            >
              {{ scope.row.stateTest }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginTime"
        label="最后登录时间"
        sortable
      />
      <el-table-column
        prop="ip"
        label="最后登录ip"
        sortable
      />
      <el-table-column
        prop="loginNum"
        label="登录次数"
        sortable
      />
      <el-table-column
        label="操作"
        width="100px"
        fixed="right"
      >
        <template slot-scope="scope">
          <!--          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button> -->
          <el-button
            type="text"
            @click="handleCheckEdit(scope.row)"
          >
            查看
          </el-button>
          <!--          <el-button type="text" @click="handleUpdPwd(scope.row)">
            修改密码
          </el-button> -->
          <el-button style="padding:0; margin:0 0 0 10px; border: none;">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">操作</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeHandleCommand(3, scope.row)">
                  编辑
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(5, scope.row)">
                  邀请码
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(0, scope.row, '解冻', 0)">
                  解冻
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(0, scope.row, '禁用', 2)">
                  禁用
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(4, scope.row, '解冻', 0)">
                  批量解冻
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(4, scope.row, '禁用', 2)">
                  批量禁用
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(1, scope.row)">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(2, scope.row)">
                  修改上级
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
          <!--            <el-button type="text" v-if="scope.row.state == 0" @click="handleUpdState(scope.row)">
              冻结
            </el-button> -->
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
    />
    <upd-table-edit
      ref="updEdit"
      @refreshList="fetchData"
    />
    <check-table-edit ref="checkEdit" />
    <upd-pwd
      ref="updPwd"
      @refreshList="fetchData"
    />
    <upd-code
      ref="updCode"
      @refreshList="fetchData"
    />
    <upd-state
      ref="updState"
      @refreshList="fetchData"
    />
    <add-table-edit
      ref="edit"
      @refreshList="fetchData"
    />
    <upd-upper
      ref="updUpper"
      @refreshList="fetchData"
    />
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
import updPwd from "./components/updPwd";
import updState from "./components/updState";
import addTableEdit from "./components/addTableEdit";
import updUpper from "./components/updUpper";
import updCode from "./components/updCode";
import api from "@/api/api.js";
import util from "@/utils/util.js";
import Vue from 'vue';

export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit,
    updPwd,
    updState,
    addTableEdit,
    updUpper,
    updCode
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
      options: [{
        options: [{
          value: 0,
          label: '正常'
        },{
          value: 1,
          label: '冻结'
        },{
          value: 2,
          label: '管理员封号'
        }]
      }],
      value: '',      //交易类型

      branch:[{
        branch:[{
          label: "自己",
          value: 0
        },{
          label: "直系下属",
          value: 1
        },{
          label: "所有下属",
          value: 2
        },{
          label: "代理链",
          value: 3
        }]
      }],
      branchValue: null,

      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        type: 0,
        level: null
      },
      level:[{
        level:[]
      }]
    };
  },
  created() {
    this.getLevel();   //获取等级列表
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //获取等级列表
    getLevel(){
      api.getLevelDesc({}, (res)=>{
        let data = res.data;
        data.forEach((item) =>{
          item.value = parseInt(item.key);
          item.label = item.val;
        });
        this.level[0].level = data;
        this.fetchData();  //查询用户列表
      });
    },
    //查看下级用户
    querySub(data){
      if(data.allSubSum <= 0) return;
      this.queryForm.page = 1;
      Vue.set(this.queryForm, "uid", data.uid);//修改复杂对象必须使用set方法
      Vue.set(this.queryForm, "subType", this.branch[0].branch[1].value);//修改复杂对象必须使用set方法
      this.fetchData();
    },

    //查看上级用户自己的数据
    queryUpper(data){
      this.queryForm.page = 1;
      Vue.set(this.queryForm, "uid", data.upper);//修改复杂对象必须使用set方法
      Vue.set(this.queryForm, "subType", this.branch[0].branch[0].value);//修改复杂对象必须使用set方法
      this.fetchData();
    },

    //封装下拉菜单传入参数  type 0解冻封号操作 1修改密码操作 2修改上级操作 3编辑 4批量解冻封号操作 5修改邀请码
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
        else if(type == 2) return {'type': 2, 'row': row,};
        else if(type == 3) return {'type': 3, 'row': row,};
        else if(type == 4){
          return {
            'test': test,
            'stateCode': stateCode,
            'row': row,
            'type': 4
          }
        }
        else if(type == 5) return {'type': 5, 'row': row,};
    },
    //下拉菜单操作  command.type  0解冻封号操作 1修改密码操作 2修改上级操作 3编辑 4批量解冻封号操作 5修改邀请码
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

      else if(command.type == 1)  this.handleUpdPwd(command.row);     //修改密码
      else if(command.type == 2)  this.handleUpdUpper(command.row);   //修改上级
      else if(command.type == 3)  this.handleEdit(command.row);       //编辑
      else if(command.type == 5)  this.handleUpdCode(command.row);       //修改邀请码
      if(command.type == 4)
      {
        this.$baseConfirm("你确定要" + command.test + "该账号及其代理线下的所有账号？", null, async () => {
          let data = {
            upper: command.row.uid,
            state: command.stateCode
          };
          api.userStopOrCommonByUpperAll(data, (res)=>{
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
    },
    //添加用户
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
    handleUpdCode(row) {
      this.$refs["updCode"].showEdit(row);
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
    handleUpdUpper(row) {
      this.$refs["updUpper"].showEdit(row);
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
      this.queryForm.page = 1;

      //账号类型筛选不为空时添加账号类型属性
      if(!util.isEmpty(this.value)){
        this.queryForm.state = this.value;
      }else{   //账号类型筛选为空时删除账号类型属性
        delete this.queryForm.state;
      };

      //等级类型筛选为空时删除等级属性
      if(util.isEmpty(this.queryForm.level)) delete this.queryForm.level;

      this.fetchData();
    },
    //查询用户列表
    fetchData() {
      this.listLoading = true;
      api.getUserByAdmin(this.queryForm, (res)=>{
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

             //获取等级名称
             this.level[0].level.forEach((item1) =>{
               item1.key = parseInt(item1.key);
               if(item1.key === item.level) item.levelText = item1.val;
             });

           });
           this.total = api.getTotal(res);
           this.list = data;
           console.log(this.list);
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
  a{
    color:#000;
  }
  .allSubSum{
    text-decoration: underline;
    color:blue;
    cursor:pointer;
  }
</style>
