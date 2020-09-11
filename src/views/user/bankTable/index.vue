<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">

      <vab-query-form-left-panel style="max-width:168px;">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
          >添加</el-button
        >
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
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
            <el-input v-model="queryForm.uid" placeholder="uid"  clearable/>
          </el-form-item>

          <el-form-item>
            <el-input v-model="queryForm.bank" placeholder="银行"  clearable/>
          </el-form-item>

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
    >
      <el-table-column type="selection" width="55"></el-table-column>
<!--      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column prop="uid" label="uid"></el-table-column>
      <el-table-column prop="bank" label="银行"></el-table-column>
      <el-table-column prop="bankBranch" label="开户支行"></el-table-column>
      <el-table-column prop="bankCode" label="银行卡号"></el-table-column>
      <el-table-column prop="bankUserName" label="开户人姓名"></el-table-column>
      <el-table-column prop="addTime" label="绑定时间"></el-table-column>
      <!-- <el-table-column prop="pwd" label="提现密码"></el-table-column> -->
      <el-table-column prop="pwdError" label="密码错误次数"></el-table-column>
      <el-table-column prop="desc" label="备注"></el-table-column>

      <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="handleEdit(scope.row, bank)"
            >编辑
          </el-button> -->
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
<!--         <el-button type="text" @click="handleUpdPwd(scope.row)"
             >修改密码
         </el-button> -->
         <el-button style="padding:0;margin:0 0 0 10px;border: none;">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">操作</span>
              <el-dropdown-menu slot="dropdown">
<!--                <el-dropdown-item :command="beforeHandleCommand('解冻', 0 ,scope.row)">解冻</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand('禁用', 2 ,scope.row)">禁用</el-dropdown-item> -->
                <el-dropdown-item :command="beforeHandleCommand(0 ,scope.row)">编辑</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(1 ,scope.row)">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
<!--            <el-button type="text" v-if="scope.row.state == 0" @click="handleUpdState(scope.row)"
               >冻结
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
    ></el-pagination>
    <upd-table-edit ref="updEdit" @refreshList="fetchData"></upd-table-edit>
    <check-table-edit ref="checkEdit"></check-table-edit>
    <upd-pwd ref="updPwd" @refreshList="fetchData"></upd-pwd>
    <add-table-edit ref="edit" @refreshList="fetchData"></add-table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
import updPwd from "./components/updPwd";
import addTableEdit from "./components/addTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit,
    updPwd,
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

      bank: [{
        bank:[]
      }],   //银行列表

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
        count: 10
      },
    };
  },
  created() {
    this.fetchData();  //查询用户列表
    this.getBank();  //获取银行列表
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //获取银行列表
    getBank(){
      api.getBank({page: 1, count: 20}, (res)=>{
        let data = api.getData(res);
        data.forEach((item,index) =>{
          item.value = item.bankId;
          item.label = item.bankName;
        });
        this.bank[0].bank = data;
      });
    },

    //封装下拉菜单传入参数  type 0编辑 1修改密码操作
    beforeHandleCommand(type, row){
      if(type == 0) return {'type': 0, 'row': row};
      else if(type == 1) return {'type': 1, 'row': row,};
    },
    //下拉菜单操作
    handleCommand(command){
      if(command.type == 0)  this.handleEdit(command.row)   //编辑
      else if(command.type == 1)  this.handleUpdPwd(command.row)   //修改密码
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
    handleEdit(row, bank) {
      this.$refs["updEdit"].showEdit(row, bank);
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleUpdPwd(row) {
      this.$refs["updPwd"].showEdit(row);
    },
    handleDelete(row) {
      if(util.isEmpty(this.selectRows)){
        this.$baseMessage("未选中任何行", "error");
        return false;
      }else {
        this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            let delById = [];
            this.selectRows.forEach((item, index) =>{
              let obj = {};
              obj.id = item.id;
              delById.push(obj);
            });
            let delArr = {
              arr: delById
            };
            api.delUserBankArr(delArr, (res)=>{
              let code = api.getCode(res);
              if(code == 0){
                this.$baseMessage("删除成功", "success");
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
      this.fetchData();
    },
    //查询用户列表
    fetchData() {
      this.listLoading = true;
      api.getUserBank(this.queryForm, (res)=>{
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
