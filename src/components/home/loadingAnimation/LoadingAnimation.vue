<template>
  <div class="lodingAnimationCon">
    <div id="toprightviewLines">
      <span class="name">{{name}}</span>
      <span class="percent">{{percent}}</span>
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loadingAnimation',
  data () {
    return {
      pieData: [
        {
          value: 170,
          name: '土地',
          itemStyle: {
            normal: {
              // color: 'rgba(42,42,187,1)'
              color: { // 图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0, // 从左到右 0-1
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#4b42f5' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#3540bb' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }, // 正常颜色
            emphasis: {
              color: 'rgba(42,42,187,0.5)'
            } // 鼠标移入颜色
          }
        },
        {
          value: 60,
          name: '水',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0, // 从左到右 0-1
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#3a48c1'
                }, {
                  offset: 1,
                  color: '#4c70c2'
                }],
                globalCoord: false
              }
            },
            emphasis: {
              color: 'rgba(66,90,193,0.5)'
            }
          }
        },
        {
          value: 22,
          name: '气',
          itemStyle: {
            normal: {
              color: 'rgba(85,132,151,1)'
            },
            emphasis: {
              color: 'rgba(85,132,151,0.5)'
            }
          }
        },
        {
          value: 12,
          name: '灾害',
          itemStyle: {
            normal: {
              color: 'rgba(87,179,180,1)'
            },
            emphasis: {
              color: 'rgba(87,179,180,0.5)'
            }
          }
        },
        {
          value: 90,
          name: '生态',
          itemStyle: {
            normal: {
              color: 'rgba(58,177,184,1)'
            },
            emphasis: {
              color: 'rgba(58,177,184,0.5)'
            }
          }
        },
        {
          value: 32,
          name: '矿产',
          itemStyle: {
            normal: {
              color: 'rgba(29,173,194,1)'
            },
            emphasis: {
              color: 'rgba(29,173,194,0.5)'
            }
          }
        }
      ],
      pieName: ['土地', '水', '气', '灾害', '生态', '矿产'],
      name: '土地',
      percent: 170
    };
  },
  created () {
    this.$nextTick(() => {
      this.drawLine();
      this.displayType();
    });
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('main'));
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  },
  methods: {
    drawLine () {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = that.$echarts.init(document.getElementById('main'));
      // 绘制图表
      const option = {
        series: [{
          name: '动图',
          type: 'pie',
          radius: ['60%', '80%'],
          itemStyle: {
            borderColor: '#0c092a', // 增加空隙，该颜色与背景色相同
            borderWidth: 5 // 空隙大小
          },
          avoidLabelOverlap: false,
          hoverAnimation: false, // 取消鼠标滑入放大的效果
          animation: false, // 取消饼图展开的效果
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: that.pieData
        }
        ]
      };

      myChart.setOption(option);

      let myChartPieIndex = 0;

      setInterval(function () {
        const dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: myChartPieIndex
        });
        myChartPieIndex = (myChartPieIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: myChartPieIndex
        });
      }, 1000);
    },
    displayType () {
      const that = this;
      console.log(that.pieData);
      setInterval(function () {
        for (let i = 0; i < that.pieName.length; i++) {
          (function (j) {
            setTimeout(function () {
              that.name = that.pieName[j];
            }, 1000 * j);
          })(i);
        }
      }, 6000);
    }
  }
};
</script>

<style lang="less" scoped>
  .lodingAnimationCon {
    width: 100%;
    height: 100%;

    #toprightviewLines {
      width: 100%;
      height: 100%;
      background-image: url("../../../assets/imgs/home/zjyxj.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .name {
        /*position: absolute;*/
        /*top: 20%;*/
        /*left: 70%;*/
        position: relative;
        top: 25%;
        left: 0;
        color: #000000;
      }

      .percent {
        position: absolute;
        top: 30%;
        left: 70%;
      }

      #main {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
