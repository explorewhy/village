<template>
  <div class="dxsAndZslCon">
    <div id="myChart"></div>
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
    const myChart = this.$echarts.init(document.getElementById('myChart'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine () {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        color: ['#00a3f4', '#32C5E9'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {c}'
        },
        legend: {
          x: 'left',
          y: ' left',
          padding: [30, 0, 0, 10],
          textStyle: { // 图例文字的样式
            color: '#fff',
            fontSize: 14
          }
        },
        dataset: {
          source: [
            ['product', '地下水资源量', '水资源总量'],
            ['郑州市', 5.29, 6.64],
            ['开封市', 7.07, 7.89],
            ['洛阳市', 9.36, 15.93],
            ['平顶山市', 5.21, 7.91],
            ['安阳市', 5.17, 6.64],
            ['鹤壁市', 1.62, 1.76],
            ['新乡市', 7.97, 6.84],
            ['焦作市', 3.74, 5.15],
            ['濮阳市', 4.74, 2.83],
            ['许昌市', 4.02, 5.38],
            ['漯河市', 3.30, 3.87],
            ['三门峡市', 6.94, 10.52],
            ['南阳市', 14.71, 21.54],
            ['商丘市', 5.38, 10.04],
            ['信阳市', 14.31, 28.06],
            ['周口市', 9.04, 12.30],
            ['驻马店市', 9.85, 13.20],
            ['济源市', 1.75, 2.42]
          ]
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          right: '10px',
          top: '24px',
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
                that.$emit('farmViewer_dxs');
              }
            }
          }
        },
        dataZoom: [{
          type: 'slider',
          height: 14,
          bottom: '4%',
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
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .dxsAndZslCon {
    width: 100%;
    height: 100%;

    #myChart {
      width: 100%;
      height: 100%;
    }
  }
</style>
