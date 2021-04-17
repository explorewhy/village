<template>
  <div class="populationChartCon">
    <div id="myChart3"></div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      MAX: {},
      MIN: {}
    };
  },
  created () {
  },

  mounted () {
    this.drawLine3();
    const myChart = this.$echarts.init(document.getElementById('myChart3'));

    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine3: function () {
      const that = this;
      // console.log('MAX', this.MAX)
      // console.log('MIN', this.MIN)
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
              title: '显示到地图',
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
                that.$emit('farmViewer_peo');
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
            data: [
              { value: 1002.12, name: '南阳市' },
              { value: 956.90, name: '郑州市' },
              { value: 880.92, name: '周口市' },
              { value: 727.39, name: '商丘市' },
              { value: 695.55, name: '驻马店市' },
              { value: 674.30, name: '洛阳市' },
              { value: 640.00, name: '信阳市' },
              { value: 572.10, name: '新乡市' },
              { value: 511.70, name: '安阳市' },
              { value: 496.00, name: '平顶山市' },
              { value: 454.26, name: '开封市' },
              { value: 434.15, name: '许昌市' },
              { value: 361.00, name: '濮阳市' },
              { value: 353.40, name: '焦作市' },
              { value: 262.50, name: '漯河市' },
              { value: 224.65, name: '三门峡市' },
              { value: 160.60, name: '鹤壁市' },
              { value: 72.90, name: '济源市' }
            ].sort(function (a, b) {
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
