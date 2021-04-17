<template>
  <div class="airCon">
    <div id="myChart2"></div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {};
  },
  created () {
    this.$nextTick(() => {
      this.drawLine();
    });
  },

  mounted () {
    const myChart = this.$echarts.init(document.getElementById('myChart2'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine () {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart2'));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '6%',
          containLabel: true
        },
        dataZoom: [{
          type: 'slider',
          height: 12,
          bottom: '0%',
          show: true, // flase直接隐藏图形
          xAxisIndex: [0],
          left: '9%', // 滚动条靠左侧的百分比
          start: 0, // 滚动条的起始位置
          end: 30, // 滚动条的截止位置（按比例分割你的柱状图x轴长度）
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        }],
        color: ['#001fff', '#00a3f4', '#32C5E9'],
        legend: {
          x: 'left',
          y: ' left',
          padding: [30, 0, 0, 10],
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '周口市', '三门峡市', '洛阳市', '商丘市', '驻马店市', '南阳市', '信阳市', '许昌市', '郑州市', '漯河市', '新乡市', '开封市', '濮阳市', '安阳市', '济源示范区', '平顶山市', '焦作市', '鹤壁市'],
            ['综合指数', 4.509, 4.060, 4.884, 5.035, 4.557, 4.561, 4.066, 5.084, 5.253, 5.100, 5.758, 5.312, 5.450, 6.076, 5.405, 5.473, 5.908, 5.804],
            ['综合指数同比变化率', 4.4, 7.8, -3.1, 6.6, 8.9, 12.5, 13.7, 13.3, 16.0, 17.3, 15.6, 19.4, 18.2, 16.7, 22.6, 21.6, 22.6, 22.8],
            ['分数', 2.4, 2.8, 3.0, 4.6, 4.6, 5.6, 5.6, 7.4, 10.0, 10.8, 11.4, 12.8, 13.0, 13.8, 14.4, 14.6, 16.4, 17.2]
          ]
        },
        // visualMap:{
        //   orient:'horizontal',
        //   left:'center',
        // },
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
                that.$emit('farmViewer_airScore');
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          gridIndex: 0,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        // grid: {
        //   top: '35%'
        // },
        series: [{
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .airCon {
    width: 100%;
    height: 100%;

    #myChart2 {
      width: 100%;
      height: 100%;
    }
  }
</style>
