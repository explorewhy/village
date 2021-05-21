<template>
  <div class="populationChartCon">
    <div id="myChart3"></div>
  </div>
</template>

<script>
import { getPopulationData } from '../../../network/echarts';

export default {
  name: 'hello',
  data () {
    return {
      MAX: {},
      MIN: {}
    };
  },
  created () {
    const _this = this;
    _this.$nextTick(() => {
      getPopulationData().then(data => {
        _this.drawLine3(data.data);
        _this.$store.commit('addPopulationData', data.data);
      });
    });
  },

  mounted () {
    const myChart = this.$echarts.init(document.getElementById('myChart3'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine3: function (data) {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart3'));
      let option = {};
      // 绘制图表
      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 2000,
          inRange: {
            colorLightness: [1, 0]
          }
        },
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
                that.$router.push('/populationDataStatistics');
              }
            }
          }
        },

        series: [
          {
            name: '人口数量(万人)',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: data.sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'white'
            },
            labelLine: {
              lineStyle: {
                color: 'white'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#001fff',
              shadowBlur: 200,
              shadowColor: '#32C5E9'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .populationChartCon {
    width: 100%;
    height: 80%;

    #myChart3 {
      width: 100%;
      height: 100%;
    }
  }
</style>
