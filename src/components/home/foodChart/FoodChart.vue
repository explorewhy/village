<template>
  <div class="foodChart">
    <div id="myChart7"></div>
  </div>
</template>

<script>
import { getGrainProduction } from '../../../network/echarts';

export default {
  name: 'hello',
  data () {
    return {
      rows1: {},
      dlmcArr: []
    };
  },
  created () {
    const _this = this;
    _this.$nextTick(() => {
      getGrainProduction().then(data => {
        this.drawLine7(data.data);
        this.$store.commit('addFoodChartData', data.data);
      });
    });
  },

  mounted () {
    const myChart = this.$echarts.init(document.getElementById('myChart7'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine7 (data) {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart7'));
      // 绘制图表
      myChart.setOption({
        color: ['#40f6ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        dataZoom: [{
          type: 'slider',
          height: 12,
          bottom: '0%',
          show: true, // flase直接隐藏图形
          xAxisIndex: [0],
          left: '17%', // 滚动条靠左侧的百分比
          start: 0, // 滚动条的起始位置
          end: 30, // 滚动条的截止位置（按比例分割你的柱状图x轴长度）
          textStyle: {
            color: '#FCFCFC',
            fontSize: 10
          }
        }],
        toolbox: {
          show: true,
          orient: 'vertical',
          right: 5,
          top: 'top',
          feature: {
            myTool1: { // 必须要my开头
              show: true,
              title: '详情分析',
              iconStyle: {
                borderColor: '#ffffff'
              },
              icon: `path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,
              0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,
              432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,
              0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,
              5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,
              589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,
              3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,
              421.146,591.891L421.146,591.891zM421.146,591.891`,
              onclick: function () {
                that.$router.push('/foodDataSourceStatistics');
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          data: data.city,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: '{value} (万吨)'
          }
        },
        series: [{
          data: data.series,
          type: 'bar',
          showBackground: true,
          barWidth: 30,
          backgroundStyle: {
            color: '#00DE8F,red'
          }
        }]
      });
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .foodChart {
    width: 100%;
    height: 80%;

    #myChart7 {
      width: 100%;
      height: 100%;
    }
  }
</style>
