<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">
      <vab-query-form-left-panel style="max-width:84px;">
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
        </el-button>
      </vab-query-form-left-panel>
     <vab-query-form-right-panel style="flex: 1;">
<!--       <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
       style="position: absolute; left: 0px; top:34%;display:block; transform: translateY(-50%);"
         >删除
       </el-button> -->
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
            <el-input v-model="queryForm.title" placeholder="任务名称"  clearable/>
          </el-form-item>
<!--          <el-form-item>
            <el-input v-model="queryForm.admin" placeholder="审核人"  clearable/>
          </el-form-item> -->

          <el-form-item>
               <el-select v-model="typeValue" placeholder="任务类型" clearable>
                 <el-option-group
                   v-for="group in type"
                   :key="group.label"
                   :label="group.label">
                   <el-option
                     v-for="item in group.type"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-option-group>
               </el-select>
           </el-form-item>

           <el-form-item>
                <el-select v-model="levelValue" placeholder="任务等级" clearable>
                  <el-option-group
                    v-for="group in level"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.level"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
            </el-form-item>

         <el-form-item>
              <el-select v-model="stateValue" placeholder="任务状态" clearable>
                <el-option-group
                  v-for="group in state"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.state"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
          </el-form-item>

          <el-form-item>
                <div class="block">
                  <el-date-picker
                    v-model="searchTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </div>
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
      <el-table-column prop="uid" label="发布者"></el-table-column>
      <el-table-column prop="doneUid" label="完成者"></el-table-column>
      <el-table-column prop="sn" label="订单号"></el-table-column>
      <el-table-column prop="title" label="任务名称"></el-table-column>
      <el-table-column prop="awardTypeTest" label="任务类型"></el-table-column>
      <el-table-column prop="classifyName" label="子类名称"></el-table-column>
      <el-table-column prop="levelTest" label="任务等级"></el-table-column>
      <el-table-column prop="award" label="奖励金额"></el-table-column>
      <el-table-column prop="finishTime" label="完成时间"></el-table-column>
      <el-table-column prop="stateTest" label="状态"></el-table-column>
<!--      <el-table-column prop="updTime" label="审核时间"></el-table-column>
      <el-table-column prop="auditName" label="审核人"></el-table-column> -->
      <el-table-column prop="auditTime" label="备注"></el-table-column>

      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
         <el-button type="text" @click="handleEdit(scope.row)">
           审核
          </el-button>
<!--          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
          </el-button> -->
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
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
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
import api from "@/api/api.js";
import util from "@/utils/util.js";
export default {
  // name: "ComprehensiveTable",
  components: {
    checkTableEdit,
    updTableEdit
  },
  filters: {
    statusFilter(status) {
      if(status == 1) return "success";
      if(status == 0) return "danger";
    }
  },
  data() {
    return {
      level: [{
        level: []
      }],
      levelValue: '',      //选中的任务等级

      type: [{
        type: []
      }],
      typeValue: '',      //选中的任务类型

      state: [{
        state: [{
          value: 0,
          label: '进行中'
        },{
          value: 1,
          label: '未审核'
        },{
          value: 2,
          label: '已完成'
        },{
          value: 3,
          label: '任务失败'
        },{
          value: 10,
          label: '任务取消'
        }]
      }],
      stateValue: '',      //选中的状态类型

      searchTime: '', //筛选的时间范围
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
        state: null,
      },
      levelDescList: [],  //全部任务会员类型
      taskClassifyList: [],  //任务子类
    };
  },
  created() {
    this.getTaskClassify();  //获取任务子类
    this.getTaskType();  //获取任务类型
    this.getLevelDesc(); //获取全部任务会员类型
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //获取全部任务会员类型
    getLevelDesc(){
      api.getLevelDesc({}, (res)=>{
         let data = res.data;
         this.levelDescList = data;  //保存全部任务会员类型
         data.forEach((item) =>{
           item.value = parseInt(item.key);
           item.label = item.val;
         });
         this.level[0].level = data;
         this.fetchData();
      });
    },
    //获取任务类型
    getTaskType(){
      api.getTaskType({}, (res)=>{
        let data = res.data;
        data.forEach((item) =>{
          item.value = parseInt(item.key);
          item.label = item.val;
        });
        this.type[0].type = data;
      });
    },
    //获取任务子类
    getTaskClassify(){
      api.getTaskClassify({page: 1, count: 99}, (res)=>{
        let data = api.getData(res);
        this.taskClassifyList = data;
      });
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
            api.delTaskDetails(delArr, (res)=>{
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
      //任务等级筛选不为空时添加任务等级属性
      if(!util.isEmpty(this.levelValue)){
        this.queryForm.taskLv = this.levelValue;
      }else{   //任务等级筛选为空时删除任务等级属性
        delete this.queryForm.taskLv;
      };

      //奖励类型筛选不为空时添加奖励类型属性
      if(!util.isEmpty(this.typeValue)){
        this.queryForm.type = this.typeValue;
      }else{   //奖励类型筛选为空时删除奖励类型属性
        delete this.queryForm.type;
      };
      //时间筛选不为空时添加时间属性
      if(!util.isEmpty(this.searchTime)){
        this.queryForm.begFinishTime = this.searchTime[0];
        this.queryForm.endFinishTime = this.searchTime[1];
      }else{   //时间筛选为空时删除时间属性
        delete this.queryForm.begFinishTime;
        delete this.queryForm.endFinishTime;
      };

      //状态类型筛选不为空时添加状态类型属性
      if(!util.isEmpty(this.stateValue)){
        this.queryForm.state = this.stateValue;
      }else{   //状态类型筛选为空时删除状态类型属性
        delete this.queryForm.state;
      };
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      api.getTaskDetails(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              switch (item.state){
                case 0:
                  item.stateTest = "进行中";
                  break;
                case 1:
                  item.stateTest = "未审核";
                  break;
                case 2:
                  item.stateTest = "已完成";
                  break;
                case 3:
                  item.stateTest = "任务失败";
                  break;

                case 10:
                  item.stateTest = "任务取消";
                  break;
                default:
                  break;
              };
              this.type[0].type.forEach((item3, index3) =>{
                  if(item3.value == item.type) item.awardTypeTest = item3.label;
              });
              this.taskClassifyList.forEach((item2, index2) =>{
                  if(item2.classifyId == item.classify) item.classifyName = item2.name;
              });
              //获取任务等级
              this.levelDescList.forEach((item1, index1) =>{
                  item1.key = parseInt(item1.key);
                  if(item1.key == item.taskLv) item.levelTest = item1.val;
              });
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
    //获取当前月份一共有几天
    mGetDate(){
         var date = new Date();
         var year = date.getFullYear();
         var month = date.getMonth()+1;
         var d = new Date(year, month, 0);
         return d.getDate();
    }
  },
};
</script>
