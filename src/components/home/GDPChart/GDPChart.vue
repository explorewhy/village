<template>
  <div class="gdpCon">
    <div id="myChart1"></div>
  </div>
</template>

<script>
import { getGDP } from '../../../network/echarts';

export default {
  name: 'weatherCon',
  data () {
    return {};
  },
  created () {
    const _this = this;
    _this.$nextTick(() => {
      getGDP().then(data => {
        _this.drawLine(data.data);
        _this.$store.commit('addGDPChartData', data.data);
      });
    });
  },

  mounted () {
    const myChart1 = this.$echarts.init(document.getElementById('myChart1'));
    window.addEventListener('resize', function () {
      myChart1.resize();
    });
  },
  methods: {
    drawLine (data) {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.$echarts.init(document.getElementById('myChart1'));
      // 绘制图表
      myChart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '95%',
            width: 12,
            start: 0, // 数据窗口范围的起始百分比
            end: 15,
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 0,
            end: 100.0
          }
        ],
        legend: {
          data: ['2018年GDP', '2019年GDP'],
          x: 'left',
          y: ' left',
          padding: [30, 0, 0, 10],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '2%',
          right: '6%',
          bottom: '1%',
          containLabel: true
        },
        color: ['#37D8FF', '#00a3f4'],
        toolbox: {
          show: true,
          orient: 'vertical',
          right: '0px',
          top: '24px',
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
                that.$router.push('/gdpDataStatistics');
              }
            }
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: data.city,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: '2018年GDP',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: data.series1
          },
          {
            name: '2019年GDP',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: data.series2
          }
        ]
      });
    }
    // 数据自动刷新，必然需要一个监听机制告诉Echarts重新设置数据
  },
  watch: {
    // 观察option的变化
    echarts1_option: {
      handler (newVal, oldVal) {
        if (this.myChart1) {
          if (newVal) {
            this.myChart1.setOption(newVal);
          } else {
            this.myChart1.setOption(oldVal);
          }
        } else {
          this.init();
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .gdpCon {
    width: 100%;
    height: 100%;

    #myChart1 {
      width: 100%;
      height: 100%;
    }
  }
</style>
