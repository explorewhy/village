<template>
  <div class="warningLevelCon">
    <div id="myChart10"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  created () {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('myChart10'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine () {
      // let that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart10'));
      // 绘制图表
      myChart.setOption({
        color: ['#0569ff', '#40f6ff', '#00a3f4'],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1, name: '超载' },
              { value: 14, name: '未超载' },
              { value: 3, name: '临界超载' }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .warningLevelCon {
    width: 100%;
    height: 100%;

    #myChart10 {
      width: 100%;
      height: 100%;
    }
  }
</style>
