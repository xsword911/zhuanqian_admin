<template>
  <div class="echarts-container">
    <vab-query-form style="display: flex;">
      <vab-query-form-right-panel style="flex: 1;">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input
              v-model="queryForm.uid"
              placeholder="用户id"
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
            <el-select
              v-model="branchValue"
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

          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="searchTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              />
            </div>
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

    <el-row :gutter="15">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
      >
        <el-card shadow="hover">
          <div slot="header">
            金额统计
          </div>
          <div>
            <vab-chart
              autoresize
              :options="chart1"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import VabChart from "@/plugins/echarts";
  import api from "@/api/api.js";
  import tran from "@/utils/tran.js";
  import util from "@/utils/util.js";
  export default {
    name: "Echarts",
    components: {
      VabChart,
    },
    data() {
      return {
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
          },]
        }],
        branchValue: null,

        chart1: {
          grid: {
            top: "25%",
            bottom: "10%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          legend: {
            data: ["首充金额", "充值金额", "提现金额", "任务收入", "任务支出", "代理佣金"], //["销售水量", "主营业务"]
          },
          xAxis: {

            data: [

            ],
            // data: this.timeList,
            axisLine: {
              show: true, //隐藏X轴轴线
            },
            axisTick: {
              show: true, //隐藏X轴刻度
            },
            axisLabel: {
              show: true,
            },
          },
          yAxis: [
            {
              type: "value",
              name: "金额",
              splitLine: {
                show: false,
              },
              axisTick: {
                show: true,
              },
              axisLine: {
                show: true,
              },
              axisLabel: {
                show: true,
              },
            },
            {
              type: "value",
              gridIndex: 0,
              min: 50,
              max: 100,
              splitNumber: 8,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitArea: {
                show: false,
                areaStyle: {
                  color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
                },
              },
            },
          ],
          series: [
            {
              name: "首充金额",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#058cff",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
            },
            {
              name: "充值金额",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#36CBCB",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
              //data: [],
            },
            {
              name: "提现金额",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#ff0000",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
              //data: [],
            },
            {
              name: "任务收入",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#303133",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
              //data: [],
            },
            {
              name: "任务支出",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#FBD437",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
              //data: [],
            },
            {
              name: "代理佣金",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#DCB093",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
              //data: [],
            }

          ],
        },

        timeList: [], //时间列表
        dataList: [], //数据列表

        dataListCount: [],  //图形数据

        searchTime: '', //筛选的时间范围
        queryForm: {
          page: 1,
          count: 60,
        },
      };
    },
    mounted() {
      this.getStatisticsMonthMap();  //获取用户活跃统计
    },
    methods: {
      //搜索关键字
      handleQuery() {
        this.queryForm.page = 1;

        //查询下级
        if(this.branchValue == 0) this.queryForm.isSubAll = null;
        if(this.branchValue == 1) this.queryForm.isSubAll = false;
        if(this.branchValue == 2) this.queryForm.isSubAll = true;

        //时间筛选不为空时添加时间属性
        if(!util.isEmpty(this.searchTime)){
          this.queryForm.begFinishTime = this.searchTime[0];
          this.queryForm.endFinishTime = this.searchTime[1];
        }else{   //时间筛选为空时删除时间属性
          delete this.queryForm.begFinishTime;
          delete this.queryForm.endFinishTime;
        };
        this.getStatisticsMonthMap();
      },

      //获取用户活跃统计
      getStatisticsMonthMap(){
        api.getStatisticsMonthMap(this.queryForm, (res)=>{
          let code = api.getCode(res);
          if(code === 0){
            let data = api.getData(res);
            console.log(data);
            this.chart1.xAxis.data = []; //清空x轴数据
            this.chart1.series[0].data = []; //清空y轴数据
            this.chart1.series[1].data = []; //清空y轴数据
            this.chart1.series[2].data = []; //清空y轴数据
            this.chart1.series[3].data = []; //清空y轴数据
            this.chart1.series[4].data = []; //清空y轴数据
            this.chart1.series[5].data = []; //清空y轴数据

            data.forEach((item, index) =>{
              // console.log(data);
              this.chart1.xAxis.data.push(item.addTime);
              this.chart1.series[0].data.push(item.firstRechargeMoney);
              this.chart1.series[1].data.push(item.rechargeMoney);
              this.chart1.series[2].data.push(item.drawMoney);
              this.chart1.series[3].data.push(item.moneyTaskAdd);
              this.chart1.series[4].data.push(item.moneyTaskLose);
              this.chart1.series[5].data.push(item.moneyAgency);
            });

          }
        });

      },
    },
  };
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
  }
</style>


