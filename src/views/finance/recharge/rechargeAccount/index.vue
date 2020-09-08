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
            <el-input v-model="queryForm.typeName" placeholder="渠道大类名称"  clearable/>
          </el-form-item>
         <el-form-item>
            <el-input v-model="queryForm.wayName" placeholder="渠道名称" clearable/>
          </el-form-item>

          <el-form-item>
             <el-input v-model="queryForm.account" placeholder="收款账号" clearable/>
           </el-form-item>

           <el-form-item>
              <el-input v-model="queryForm.bankName" placeholder="银行名称" clearable/>
            </el-form-item>

            <el-form-item>
               <el-input v-model="queryForm.platform" placeholder="收款平台" clearable/>
             </el-form-item>

          <el-form-item>
              <el-select v-model="value" placeholder="状态" clearable>
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
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
      <el-table-column prop="order" label="序号"></el-table-column>
      <el-table-column prop="typeName" label="类型名称"></el-table-column>
      <el-table-column prop="wayName" label="渠道名"></el-table-column>

      <el-table-column prop="platform" label="收款平台"></el-table-column>
      <el-table-column prop="account" label="收款账号"></el-table-column>

      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="owner" label="收款人姓名"></el-table-column>

      <el-table-column prop="moneySun" label="已充金额"></el-table-column>
      <el-table-column prop="updTime" label="修改时间"></el-table-column>

     <el-table-column label="状态">
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
      <el-table-column prop="desc" label="备注"></el-table-column>
      <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
          </el-button> -->
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
          <el-button type="text" @click="handleEdit(scope.row, bank, rechargeWay)"
            >编辑
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
    <add-table-edit ref="edit" @refreshList="fetchData"></add-table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import checkTableEdit from "./components/checkTableEdit";
import updTableEdit from "./components/updTableEdit";
import addTableEdit from "./components/addTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit,
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
          label: '关闭'
        },{
        value: 1,
        label: '开启'
        }]
      }],
      value: '',      //审核类型

      bank: [],   //银行列表
      rechargeWay: [],  //渠道列表

      imgShow: true,
      list: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
      },
    };
  },
  created() {
    this.fetchData();   //获取充值收款账户列表
    this.getBank();  //获取银行列表
    this.getRechargeWay();  //获取渠道列表
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    handleAdd() {
      this.$refs["edit"].showEdit(this.bank, this.rechargeWay);
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
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleEdit(row, bankData, rechargeWay) {
      this.$refs["updEdit"].showEdit(row, bankData, rechargeWay);
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
            api.delRechargeAccountArr(delArr, (res)=>{
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
      //奖励类型筛选不为空时添加奖励类型属性
      if(!util.isEmpty(this.value)){
        this.queryForm.state = this.value;
      }else{   //奖励类型筛选为空时删除奖励类型属性
        delete this.queryForm.state;
      };
      this.fetchData();
    },
    async fetchData() {

      this.listLoading = true;
      api.getRechargeAccount(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.state){
                case 0:
                  item.status = 'ban';
                  item.stateTest = "关闭";
                  break;
                case 1:
                  item.status = 'normal';
                  item.stateTest = "开启";
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
    //获取银行列表
    getBank(){
      api.getBank({page: 1, count: 20}, (res)=>{
        let data = api.getData(res);
        data.forEach((item,index) =>{
          let obj = {};
          obj.value = item.bankId;
          obj.label = item.bankName;
          this.bank.push(obj);
        });
      });
    },
    //获取渠道列表
    getRechargeWay(){
      api.getRechargeWay({page: 1, count: 20, state: 1}, (res)=>{
        let data = api.getData(res);
        data.forEach((item,index) =>{
          let obj = {};
          obj.value = item.wayId;
          obj.label = item.wayName;
          this.rechargeWay.push(obj);
        });
      });
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
