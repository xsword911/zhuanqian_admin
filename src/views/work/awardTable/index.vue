<template>
  <div class="table-container">
    <vab-query-form style="display: flex;">
      <vab-query-form-left-panel style="max-width:168px;">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd(type, taskClassifyList, level)"
          >添加</el-button
        >
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
        </el-button>
      </vab-query-form-left-panel>

     <vab-query-form-right-panel style="flex: 1; position: relative">
<!--        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
        style="position: absolute; left: 0; top:34%;display:block; transform: translateY(-50%);"
           >添加
         </el-button>
         <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
         style="position: absolute; left: 80px; top:34%;display:block; transform: translateY(-50%);"
           >删除
         </el-button> -->
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
        <el-form-item>
            <el-input v-model="queryForm.uid" placeholder="发布者uid"  clearable/>
          </el-form-item>
         <el-form-item>
           <el-input v-model="queryForm.title" placeholder="任务标题"  clearable/>
         </el-form-item>

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
      <el-table-column type="selection" width="55"></el-table-column>
     <!-- <el-table-column label="序号" width="95" prop="id"> -->
<!--        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column prop="uid" label="发布者uid" sortable></el-table-column>
      <el-table-column prop="title" label="任务标题" sortable></el-table-column>
      <el-table-column prop="award" label="奖励" sortable></el-table-column>
      <el-table-column prop="classifyName" label="子类名称" sortable></el-table-column>
      <el-table-column prop="levelTest" label="任务等级" sortable></el-table-column>
      <el-table-column prop="sortTest" label="任务分类" sortable></el-table-column>
      <el-table-column prop="awardTypeTest" label="任务类型" sortable></el-table-column>
      <el-table-column prop="begTime" label="发布开始时间" sortable></el-table-column>
      <el-table-column prop="endTime" label="发布截止时间" sortable></el-table-column>
      <el-table-column prop="surplus" label="剩余数量" sortable></el-table-column>

      <!-- <el-table-column prop="admin" label="操作者"></el-table-column> -->

     <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.stateTest"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.state | statusFilter"
              >{{ scope.row.stateTest }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="desc" label="备注" sortable></el-table-column>

      <el-table-column label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckEdit(scope.row)"
            >查看
          </el-button>
          <el-button type="text" @click="handleEdit(scope.row, type, taskClassifyList, level)"
            >编辑
          </el-button>
<!--         <el-button type="text" @click="handleDelete(scope.row)"
            >删除
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
    <add-table-edit ref="edit" @refreshList="fetchData"></add-table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import updTableEdit from "./components/updTableEdit";
import checkTableEdit from "./components/checkTableEdit";
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
      if(status == 1) return "success";
      if(status == 0) return "danger";
    }
  },
  data() {
    return {
      type: [{
        type: [{
          value: 0,
          label: '邀请好友'
        },{
          value: 1,
          label: '分享朋友圈'
        },{
          value: 2,
          label: '加好友'
        },{
          value: 3,
          label: '下载app'
        },{
          value: 4,
          label: '签到任务'
        }]
      }],
      typeValue: '',      //选中的任务类型

      state: [{
        state: [{
          value: 0,
          label: '关闭'
        },{
          value: 1,
          label: '开启'
        }]
      }],
      stateValue: '',      //选中的任务状态

      level: [{
        level: []
      }],
      levelValue: '',      //选中的任务等级

      limitSum: [{
        limitSum: [{
          value: -1,
          label: '不限制'
        }]
      }],
      limitSumValue: '',    //剩余奖励数量

      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",   //删除选中的任务id
      elementLoadingText: "正在加载...",
      queryForm: {
        page: 1,
        count: 10,
        type: null,
        state: null,
      },
      levelDescList: [],  //全部任务会员类型
      taskClassifyList: [],  //任务子类
    };
  },
  created() {
    this.getTaskType();  //获取任务类型
    this.getLevelDesc(); //获取全部任务会员类型
    this.getTaskClassify();  //获取任务子类
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    //获取任务子类
    getTaskClassify(){
      api.getTaskClassify({page: 1, count: 99}, (res)=>{
        let data = api.getData(res);
        this.taskClassifyList = data;
      });
    },
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
    handleAdd(type, taskClassifyList, level) {
      this.$refs["edit"].showEdit(type, taskClassifyList, level);
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
    handleEdit(row, arrType, taskClassifyList, level) {
      this.$refs["updEdit"].showEdit(row, arrType, taskClassifyList, level);
    },
    handleCheckEdit(row) {
      this.$refs["checkEdit"].showEdit(row);
    },
    handleDelete() {
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
            api.delTaskArr(delArr, (res)=>{
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
        this.queryForm.level = this.levelValue;
      }else{   //任务等级筛选为空时删除任务等级属性
        delete this.queryForm.level;
      };

      //奖励类型筛选不为空时添加奖励类型属性
      if(!util.isEmpty(this.typeValue)){
        this.queryForm.type = this.typeValue;
      }else{   //奖励类型筛选为空时删除奖励类型属性
        delete this.queryForm.type;
      };
      //状态类型筛选不为空时添加状态类型属性
      if(!util.isEmpty(this.stateValue)){
        this.queryForm.state = this.stateValue;
      }else{   //状态类型筛选为空时删除状态类型属性
        delete this.queryForm.state;
      };
      //状态类型筛选不为空时添加状态类型属性
      if(!util.isEmpty(this.limitSumValue)){
        this.limitSumValue = parseInt(this.limitSumValue);
        this.queryForm.limitSum = this.limitSumValue;
      }else{   //状态类型筛选为空时删除状态类型属性
        delete this.queryForm.limitSum;
      };
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      api.getTaskInfo(this.queryForm, (res)=>{
         let code = api.getCode(res);
         if(code == 0){
           let data = api.getData(res);
           data.forEach((item, index) =>{
              item.surplus = item.sum - item.finishSum;  //计算任务剩余数量
              switch (item.state){
                case 0:
                  item.stateTest = "关闭";
                  break;
                case 1:
                  item.stateTest = "开启";
                  break;
                default:
                  break;
              };
              switch (item.sort){
                case 0:
                  item.sortTest = "热门活动";
                  break;
                case 1:
                  item.sortTest = "限时推荐";
                case 2:
                  item.sortTest = "赚赚";
                  break;
                default:
                  break;
              };
              //获取任务等级
              this.levelDescList.forEach((item1, index1) =>{
                  item1.key = parseInt(item1.key);
                  if(item1.key == item.level) item.levelTest = item1.val;
              });
              //获取任务子类名称
              this.taskClassifyList.forEach((item2, index2) =>{
                  if(item2.classifyId == item.classify) item.classifyName = item2.name;
              });
              //获取任务类型
              this.type[0].type.forEach((item4, index4) =>{
                  if(item4.value == item.type) item.awardTypeTest = item4.label;
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
