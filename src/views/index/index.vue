<template>
  <div class="echarts-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card shadow="hover">
          <div slot="header">用户统计</div>
          <div>
            <vab-chart autoresize :options="chart1" />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header">昨日金额统计</div>
          <div>
            <vab-chart autoresize :options="chart2" />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header">今日金额统计</div>
          <div>
            <vab-chart autoresize :options="chart3" />
          </div>
        </el-card>
      </el-col>

<!--      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card shadow="hover">
          <div slot="header">环形图</div>
          <div>
            <vab-chart
              ref="myCircle"
              theme="vab-echarts-theme"
              :options="chart2"
              class="my-circle"
            />
          </div>
        </el-card>
      </el-col> -->
<!--      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card shadow="hover">
          <div slot="header">关系图</div>
          <div>
            <vab-chart
              ref="myLine1"
              theme="vab-echarts-theme"
              autoresize
              :options="chart3"
              class="my-line1"
            />
          </div>
        </el-card>
      </el-col> -->
<!--      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>中国地图</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="zgdt"
          />
        </el-card>
      </el-col> -->
<!--      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>世界地图</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="sjdt"
          />
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import VabChart from "@/plugins/echarts";
import api from "@/api/api.js";
import tran from "@/utils/tran.js";
import time from "@/utils/time.js";
export default {
  name: "Echarts",
  components: {
    VabChart,
  },
  data() {
    return {
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
          data: ["活跃用户数", "注册人数", "首充人数", "充值次数", "提现次数", "充值人数"], //["销售水量", "主营业务"]
        },
        xAxis: {
          // data: [
          //   "当年完成水量",
          //   "去年同期水量",
          //   "滚动目标值水量",
          //   "全年目标值水量",
          //   "当年完成金额",
          //   "去年同期金额",
          //   "滚动目标金额",
          //   "全年目标值",
          // ],
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
            name: "用户数",
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
          // {
          //   type: "value",
          //   name: "同比",
          //   position: "right",
          //   splitLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //   },
          //   axisLabel: {
          //     show: true,
          //     formatter: "{value} %", //右侧Y轴文字显示
          //   },
          // },
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
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
              },
            },
          },
        ],
        series: [
          {
            name: "活跃用户数",
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
            name: "注册人数",
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
            name: "首充人数",
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
            name: "充值次数",
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
            name: "提现次数",
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
            name: "充值人数",
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
          },
        ],
      },
      chart2:{
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['首充金额', '提现金额', '充值金额']
        },
        series: [
            {
                name: '金额统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: null, name: '首充金额'},
                    {value: null, name: '提现金额'},
                    {value: null, name: '充值金额'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      },

      chart3:{
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['首充金额', '提现金额', '充值金额']
        },
        series: [
            {
                name: '金额统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: null, name: '首充金额'},
                    {value: null, name: '提现金额'},
                    {value: null, name: '充值金额'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      },
      // chart2: {
      //   tooltip: {
      //     show: true,
      //     formatter: "{b} : {c}",
      //   },

      //   legend: {
      //     show: true,
      //     icon: "circle",
      //     top: "10%",
      //     left: "10%",
      //     width: 50,
      //     padding: [0, 5],
      //     itemGap: 25,
      //     data: ["已婚已育", "已婚未育", "未婚", "学生"],
      //     selectedMode: true,
      //     orient: "vertical",
      //   },
      //   series: [
      //     {
      //       name: "Line 4",
      //       type: "pie",
      //       clockWise: true,
      //       hoverAnimation: false,
      //       radius: ["65%", "75%"],

      //       data: [
      //         {
      //           value: 7645434,
      //           name: "已婚已育",
      //         },
      //         {
      //           value: 3612343,
      //           name: "总数",
      //           tooltip: {
      //             show: false,
      //           },
      //           itemStyle: {
      //             normal: {
      //               color: "rgba(0,0,0,0)",
      //               label: {
      //                 show: false,
      //               },
      //               labelLine: {
      //                 show: false,
      //               },
      //             },
      //             emphasis: {
      //               color: "rgba(0,0,0,0)",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "Line 3",
      //       type: "pie",
      //       clockWise: true,
      //       radius: ["50%", "60%"],
      //       itemStyle: {
      //         normal: {
      //           label: {
      //             show: false,
      //           },
      //           labelLine: {
      //             show: false,
      //           },
      //           // shadowBlur: 15,
      //           // shadowColor: 'white',
      //         },
      //       },
      //       hoverAnimation: false,

      //       data: [
      //         {
      //           value: 2632321,
      //           name: "已婚未育",
      //         },
      //         {
      //           value: 2212343,
      //           name: "总数",
      //           tooltip: {
      //             show: false,
      //           },
      //           itemStyle: {
      //             normal: {
      //               color: "rgba(0,0,0,0)",
      //               label: {
      //                 show: false,
      //               },
      //               labelLine: {
      //                 show: false,
      //               },
      //             },
      //             emphasis: {
      //               color: "rgba(0,0,0,0)",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "Line 2",
      //       type: "pie",
      //       clockWise: true,
      //       hoverAnimation: false,
      //       radius: ["35%", "45%"],
      //       itemStyle: {
      //         normal: {
      //           label: {
      //             show: false,
      //           },
      //           labelLine: {
      //             show: false,
      //           },
      //           // shadowBlur: 15,
      //           // shadowColor: 'white',
      //         },
      //       },

      //       data: [
      //         {
      //           value: 1823323,
      //           name: "未婚",
      //         },
      //         {
      //           value: 1812343,
      //           name: "总数",
      //           tooltip: {
      //             show: false,
      //           },
      //           itemStyle: {
      //             normal: {
      //               color: "rgba(0,0,0,0)",
      //               label: {
      //                 show: false,
      //               },
      //               labelLine: {
      //                 show: false,
      //               },
      //             },
      //             emphasis: {
      //               color: "rgba(0,0,0,0)",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "Line 1",
      //       type: "pie",
      //       clockWise: true,

      //       radius: ["20%", "30%"],
      //       itemStyle: {
      //         normal: {
      //           label: {
      //             show: false,
      //           },
      //           labelLine: {
      //             show: false,
      //           },
      //           // shadowBlur: 15,
      //           // shadowColor: 'white',
      //         },
      //       },
      //       hoverAnimation: false,

      //       data: [
      //         {
      //           value: 1342221,
      //           name: "学生",
      //         },
      //         {
      //           value: 1912343,
      //           name: "总数",
      //           tooltip: {
      //             show: false,
      //           },
      //           itemStyle: {
      //             normal: {
      //               color: "rgba(0,0,0,0)",
      //               label: {
      //                 show: false,
      //               },
      //               labelLine: {
      //                 show: false,
      //               },
      //             },
      //             emphasis: {
      //               color: "rgba(0,0,0,0)",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // },
      // chart3: {
      //   series: [
      //     {
      //       type: "graph",
      //       layout: "force",
      //       symbolSize: 58,
      //       draggable: true,
      //       roam: true,
      //       focusNodeAdjacency: true,
      //       categories: [
      //         {
      //           name: "公司",
      //           itemStyle: {
      //             color: "#006acc",
      //           },
      //         },
      //         {
      //           name: "董事",
      //           itemStyle: {
      //             color: "#ff7d18",
      //           },
      //         },
      //       ],
      //       edgeSymbol: ["", "arrow"],
      //       edgeLabel: {
      //         normal: {
      //           show: true,
      //           textStyle: {
      //             fontSize: 20,
      //           },
      //           formatter(x) {
      //             return x.data.name;
      //           },
      //         },
      //       },
      //       label: {
      //         show: true,
      //       },
      //       force: {
      //         repulsion: 2000,
      //         edgeLength: 120,
      //       },
      //       data: [
      //         {
      //           name: "操作系统集团",
      //         },
      //         {
      //           name: "浏览器有限公司",
      //         },
      //         {
      //           name: "HTML科技",
      //         },
      //         {
      //           name: "JavaScript科技",
      //         },
      //         {
      //           name: "CSS科技",
      //         },
      //         {
      //           name: "Chrome",
      //         },
      //         {
      //           name: "IE",
      //         },
      //         {
      //           name: "Firefox",
      //         },
      //         {
      //           name: "Safari",
      //         },
      //       ],
      //       links: [
      //         {
      //           source: "浏览器有限公司",
      //           target: "操作系统集团",
      //           name: "参股",
      //         },
      //         {
      //           source: "HTML科技",
      //           target: "浏览器有限公司",
      //           name: "参股",
      //         },
      //         {
      //           source: "CSS科技",
      //           target: "浏览器有限公司",
      //           name: "参股",
      //         },
      //         {
      //           source: "JavaScript科技",
      //           target: "浏览器有限公司",
      //           name: "参股",
      //         },
      //         {
      //           source: "Chrome",
      //           target: "浏览器有限公司",
      //           name: "董事",
      //         },
      //         {
      //           source: "IE",
      //           target: "浏览器有限公司",
      //           name: "董事",
      //         },
      //         {
      //           source: "Firefox",
      //           target: "浏览器有限公司",
      //           name: "董事",
      //         },
      //         {
      //           source: "Safari",
      //           target: "浏览器有限公司",
      //           name: "董事",
      //         },
      //         {
      //           source: "Chrome",
      //           target: "JavaScript科技",
      //           name: "法人",
      //         },
      //       ],
      //     },
      //   ],
      // },
      //中国地图
      // zgdt: {
      //   title: {
      //     text: "2099年全国GDP分布",
      //     subtext: "数据来自vue-admin-beautiful杜撰",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //   },
      //   dataRange: {
      //     orient: "horizontal",
      //     min: 0,
      //     max: 55000,
      //     text: ["高", "低"],
      //     splitNumber: 0,
      //   },
      //   series: [
      //     {
      //       name: "2099年全国GDP分布",
      //       type: "map",
      //       roam: false,
      //       mapType: "china",
      //       mapLocation: {
      //         x: "center",
      //       },
      //       selectedMode: "multiple",
      //       itemStyle: {
      //         normal: {
      //           label: {
      //             show: false,
      //           },
      //         },
      //         emphasis: {
      //           label: {
      //             show: true,
      //           },
      //         },
      //       },
      //       data: [
      //         { name: "西藏", value: 605.83 },
      //         { name: "青海", value: 1670.44 },
      //         { name: "宁夏", value: 2102.21 },
      //         { name: "海南", value: 2522.66 },
      //         { name: "甘肃", value: 5020.37 },
      //         { name: "贵州", value: 5701.84 },
      //         { name: "新疆", value: 6610.05 },
      //         { name: "云南", value: 8893.12 },
      //         { name: "重庆", value: 10011.37 },
      //         { name: "吉林", value: 10568.83 },
      //         { name: "山西", value: 11237.55 },
      //         { name: "天津", value: 11307.28 },
      //         { name: "江西", value: 11702.82 },
      //         { name: "广西", value: 11720.87 },
      //         { name: "陕西", value: 12512.3 },
      //         { name: "黑龙江", value: 12582 },
      //         { name: "内蒙古", value: 14359.88 },
      //         { name: "安徽", value: 15300.65 },
      //         { name: "北京", value: 16251.93 },
      //         { name: "福建", value: 17560.18 },
      //         { name: "上海", value: 19195.69 },
      //         { name: "湖北", value: 19632.26 },
      //         { name: "湖南", value: 19669.56 },
      //         { name: "四川", value: 21026.68 },
      //         { name: "辽宁", value: 22226.7 },
      //         { name: "河北", value: 24515.76 },
      //         { name: "河南", value: 26931.03 },
      //         { name: "浙江", value: 32318.85 },
      //         { name: "山东", value: 45361.85, selected: true },
      //         { name: "江苏", value: 49110.27 },
      //         { name: "广东", value: 53210.28 },
      //       ],
      //     },
      //   ],
      // },
      //世界地图
      // sjdt: {
      //   title: {
      //     text: "2099年世界GDP（亿元）",
      //     subtext: "数据来自vue-admin-beautiful杜撰",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //   },
      //   dataRange: {
      //     orient: "horizontal",
      //     min: 0,
      //     max: 55000,
      //     text: ["高", "低"],
      //     splitNumber: 0,
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{b}",
      //   },
      //   series: [
      //     {
      //       name: "2099年世界GDP（亿元）",
      //       type: "map",
      //       mapType: "world",
      //       selectedMode: "multiple",
      //       roam: false,
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //         emphasis: {
      //           show: true,
      //         },
      //       },
      //       data: [{ name: "China", value: 99999, selected: true }],
      //     },
      //   ],
      // },
      timeList: [], //时间列表
      dataList: [], //数据列表

      dataListCount: [],  //图形数据

      queryForm: {
        page: 1,
        count: 60,
        begFinishTime: "",
        endFinishTime: "",
      },
    };
  },
  mounted() {
    let date = time.getNowTime();
    let oldDate = time.getDateNext(date, -30);
    this.$set(this.queryForm, "endFinishTime", date);
    this.$set(this.queryForm, "begFinishTime", oldDate);
    this.getStatisticsMonthMap();  //获取用户活跃统计
  },
  methods: {
      //获取用户活跃统计
      getStatisticsMonthMap(){
        api.getStatisticsMonthMap(this.queryForm, (res)=>{
          let code = api.getCode(res);
          if(code === 0){
            let data = api.getData(res);
            if(data.length > 30) data = data.slice(-30);
            console.log(data);
            this.chart1.xAxis.data = []; //清空x轴数据
            this.chart1.series[0].data = []; //清空y轴数据
            this.chart1.series[1].data = []; //清空y轴数据
            this.chart1.series[2].data = []; //清空y轴数据
            this.chart1.series[3].data = []; //清空y轴数据
            this.chart1.series[4].data = []; //清空y轴数据
            this.chart1.series[5].data = []; //清空y轴数据
            data.forEach((item, index) =>{
              //用户统计数据
              this.chart1.xAxis.data.push(item.addTime);
              this.chart1.series[0].data.push(item.liveSum);
              this.chart1.series[1].data.push(item.registerTodayNum);
              this.chart1.series[2].data.push(item.firstRechargeMoneyPeople);
              this.chart1.series[3].data.push(item.rechargeSum);
              this.chart1.series[4].data.push(item.drawSum);
              this.chart1.series[5].data.push(item.rechargeMoneyPeople);
              //昨日金额统计
              this.chart2.series[0].data[0].value = data[data.length -2].firstRechargeMoney;
              this.chart2.series[0].data[1].value = data[data.length -2].drawMoney;
              this.chart2.series[0].data[2].value = data[data.length -2].rechargeMoney;
              //今日金额统计
              this.chart3.series[0].data[0].value = data[data.length -1].firstRechargeMoney;
              this.chart3.series[0].data[1].value = data[data.length -1].drawMoney;
              this.chart3.series[0].data[2].value = data[data.length -1].rechargeMoney;
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
