<template>
  <div class="box">
    <div id="main"></div>
    <!-- <chart style="width: 100%;height: 13rem;position: absolute;top: -2%;" :options="line"></chart> -->
  </div>
</template>

<script>
import { getReports } from "../../api/http";
export default {
  name: "Box",
  data() {
    return {
      option: [],
      myChart: {}
    };
  },
  mounted() {
    var echarts = require("echarts");

    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("main"));
    console.log("echart", this.myChart);
    // 绘制图表
  },
  created() {
    var that = this;
    getReports({ type: 1 }).then(res => {
      console.log("数据", res);
      that.myChart.setOption(res);
    });
  },
  methods: {},
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  #main {
    width: 100%;
    height: 400px;
  }
}
</style>
