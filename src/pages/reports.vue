<template>
  <div class>
    <breadcrumb nav1="数据统计" nav2="数据报表"></breadcrumb>
    <div ref="report" style="width: 800px;height:500px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getReports } from "../api/http";
export default {
  name: "reports",
  components: {},
  props: {},
  data() {
    return {
      option: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    getReports().then(backData => {
      console.log(backData);
      
      for (const key in backData.data.data) {
        this.option[key] = backData.data.data[key];
        console.log('zhixingle');
        
        /* 一定会在dom更新完毕后再加载 */
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.report);
          myChart.setOption(this.option);
        });
      }
    });
  },
  mounted() {}
};
</script>
<style>
</style>