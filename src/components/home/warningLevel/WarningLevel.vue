<template>
  <div class="warningLevelCon">
    <div id="myChart10"></div>
  </div>
</template>

<script>
import { getWarningLevel } from '../../../network/echarts';

export default {
  data () {
    return {};
  },
  created () {
    const _this = this;
    _this.$nextTick(() => {
      getWarningLevel().then(data => {
        _this.drawLine(data.data);
      });
    });
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('myChart10'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine (data) {
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
            data: data
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
