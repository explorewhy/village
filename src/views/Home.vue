<template>
  <div class="home">
    <Header :inputName="pageName"></Header>
    <div class="centre">
      <div class="leftSide" :style="{width:leftWidth,height:centreHeight}">
        <div class="Ltop">
          <div class="leftTop">
            <span class="topTitle">监测信息</span>
            <div class="bottomCentre">
              <p class="bottomTitle">本页面是{{acquisitionTime}}-8-15的监测数据</p>
              <el-row>
                <el-col :span="12" class="jcsj">目前的监测数据是</el-col>
                <el-col class="blue" :span="12">
                  <el-row style="margin-top: 12px">
                    <el-col :span="16">第{{monitoringTimes}}次数据</el-col>
                    <el-col :span="4" style="margin-top: 2px">
                      <el-row>
                        <el-col :span="12" class="lastTime"><i class="el-icon-caret-left" @click="reduction"></i></el-col>
                        <el-col :span="12" class="nextTime"><i class="el-icon-caret-right" @click="add"></i></el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="leftTop">
            <span class="topTitle">预警级别统计个数</span>
            <div class="bottomCentre">
              <div class="warningLevel">
                <warningLevel></warningLevel>
              </div>
              <div class="warningLevel">
                <el-carousel height="30px" direction="vertical" :autoplay="true">
                  <el-carousel-item v-for="item in warningLevel" :key="item.id">
                    <span class="medium">{{ item.details }}</span>
                  </el-carousel-item>
                </el-carousel>
                <span class="blue blue1" style="margin-top: 10px">3项</span>
              </div>
            </div>
          </div>
        </div>
        <div class="leftBottom">
          <div class="bottomTop">
            <GDPChart></GDPChart>
          </div>
          <div class="bottomBottom">
            <span>GDP</span>
            <div class="bottomxsj"></div>
          </div>
          <div class="bottomTop">
            <airChart></airChart>
          </div>
          <div class="bottomBottom">
            <span>综合指数</span>
            <div class="bottomxsj"></div>
          </div>
        </div>
      </div>

      <div class="viewer" :style="{width:viewerWidth,height:centreHeight}">
        <div class="viewer1" :style="{width:viewerWidth,height:centreHeight}">
          <el-row class="viewerTop">
            <el-col :span="6" class="warningText">
              <p>消息通知</p>
            </el-col>
            <el-col :span="18">
              <el-carousel height="70px" direction="vertical" :autoplay="true"
                           style="line-height: 70px;font-size: 16px;">
                <el-carousel-item v-for="item in warningDetails" :key="item.id">
                  <span class="medium warningDetails">{{ item.details }}</span>
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
          <!--地图视口-->
          <div class="viewerLeft" :style="{width:viewerWidth,height:centreHeight}">
            <home-viewer></home-viewer>
            <ol-map v-show="false"></ol-map>
          </div>
        </div>
        <div class="viewerRight"></div>
      </div>

      <div class="rightSide" :style="{width:rightWidth,height:centreHeight}">
        <div class="rightTop">
          <dxsAndZslChart></dxsAndZslChart>
        </div>
        <div class="rightBottom">
          <div class="bottomTop">
            <foodChart></foodChart>
            <div class="bottomBottom">
              <span>粮食产量</span>
              <div class="bottomxsj"></div>
            </div>
          </div>
          <div class="bottomTop">
            <populationChart></populationChart>
            <div class="bottomBottom">
              <span>人口总数</span>
              <div class="bottomxsj"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/home/Header';
import Footer from '../components/home/footer/Footer';
import GDPChart from '../components/home/GDPChart/GDPChart';
import airChart from '../components/home/airChart/AirChart';
import dxsAndZslChart from '../components/home/dxsAndZslChart/DxsAndZslChart';
// import loadingAnimation from '../components/home/loadingAnimation/loadingAnimation';
import warningLevel from '../components/home/warningLevel/WarningLevel';
import foodChart from '../components/home/foodChart/FoodChart';
import populationChart from '../components/home/populationChart/PopulationChart';
import HomeViewer from '../components/home/viewer/HomeViewer';
import OlMap from '../components/home/viewer/OlMap';

export default {
  name: 'farmHom',
  data () {
    return {
      pageName: 'home',
      // 当前屏幕的高度和宽度
      screenHeight: null,
      screenWidth: null,
      // 中间部分的高度和高度
      centreHeight: 'calc(100% - 90px)',
      centreWidth: null,
      // 左边部分的宽度
      leftWidth: null,
      // viewer部分的宽度
      viewerWidth: null,
      // 右边部分的宽度
      rightWidth: null,
      // 预警详细信息
      warningDetails: [{
        id: 1,
        details: '今晚八点所有干部到村委会开会！'
      }, {
        id: 2,
        details: '2020-12-24日举行美丽乡村活动，通知到所有人'
      }, {
        id: 3,
        details: '2020-12-17晚上7点十字街有电影放映'
      }, {
        id: 4,
        details: '2021-1-25日有村小学有一批玩具引入'
      }],
      // 检测次数
      monitoringTimes: 8,
      // 监测采集时间
      acquisitionTime: 2019,
      // 当前年份
      currentYear: 0,
      // 预警等级信息
      warningLevel: [{
        id: 1,
        details: '未超载：14个'
      }, {
        id: 2,
        details: '临界超载:3个'
      }, {
        id: 3,
        details: '超载:1个'
      }]
    };
  },
  components: {
    HomeViewer,
    OlMap,
    Header,
    Footer,
    GDPChart,
    airChart,
    dxsAndZslChart,
    // loadingAnimation: loadingAnimation,
    warningLevel,
    foodChart,
    populationChart
  },
  created () {
    const that = this;
    that.screenHeight = document.body.clientHeight;
    that.screenWidth = document.body.clientWidth;
    that.centreHeight = `${(that.screenHeight - 90)} px`;
    that.centreWidth = `${that.screenWidth} px`;
    that.selfAdaptive();

    const time = new Date();
    that.currentYear = time.getFullYear();
  },
  mounted () {
    const that = this;
    that.screenHeight = document.body.clientHeight;
    that.screenWidth = document.body.clientWidth;
    that.centreHeight = `${(that.screenHeight - 90)} px`;
    that.centreWidth = `${that.screenWidth} px`;
    window.onresize = () => {
      return (() => {
        that.selfAdaptive();
      })();
    };
  },
  methods: {
    // 监测数据点击切换到下一次监测数据
    add () {
      this.monitoringTimes++;
      this.acquisitionTime++;
      if (this.acquisitionTime > this.currentYear) {
        this.monitoringTimes = 10;
        this.acquisitionTime = this.currentYear;

        return [this.acquisitionTime, this.monitoringTimes];
      }
    },
    // 监测数据点击切换到上一次监测数据
    reduction () {
      this.monitoringTimes--;
      this.acquisitionTime--;
      if (this.monitoringTimes === 0) {
        this.monitoringTimes = 1;
        this.acquisitionTime = 2012;

        return [this.acquisitionTime, this.monitoringTimes];
      }
    },
    // 获得当前屏幕，自适应
    selfAdaptive () {
      this.leftWidth = `${(this.screenWidth / 100) * 18} px`;
      this.viewerWidth = `${(this.screenWidth / 100) * 63} px`;
      this.rightWidth = `${(this.screenWidth / 100) * 19} px`;
    }
  }
};
</script>

<style lang="less" scoped="scoped">
  .home {
    width: 100%;
    min-width: 800px;
    position: absolute;
    left: 0;
    height: 100%;
    background-color: #000;
    overflow: hidden;

    .centre {
      height: calc(100% - 90px);
      width: 100%;
      position: fixed;
      top: 60px;
      left: 0;
      color: #ffffff;
      font-size: 14px;

      .leftSide {
        height: calc(100% - 90px);
        width: 18%;
        padding: 0 10px;
        position: fixed;
        top: 60px;
        left: 0;

        .Ltop {
          height: 35%;
          width: 100%;
          position: relative;
          top: 0;
          left: 0;

          .leftTop {
            height: 50%;
            width: 100%;
            background-image: url("../assets/imgs/home/zsjbj.svg");
            background-repeat: no-repeat;
            background-position: 2px -3px;
            /*background-size: 100% 100%;*/
            background-size: cover;
            position: relative;
            top: 0;
            left: 0;

            .topTitle {
              position: relative;
              top: 14px;
              left: 15%;
            }

            .bottomCentre {
              width: 87%;
              height: 56%;
              margin-top: 21px;
              padding: 10px;

              .bottomTitle {
                font-size: 14px;
                font-weight: bold;
                margin: 0 0 15px;
              }

              .jcsj {
                position: relative;
                top: 7px;
              }

              .blue {
                font-size: 18px;
                font-weight: bold;
                color: #0bddff;
                position: relative;
                top: 5px;
                left: 3px;
                text-shadow: 1px 1px 1px #fff;

                .lastTime,.nextTime {
                  cursor: pointer;
                  font-size: 16px;
                }
              }

              .warningLevel {
                width: 50%;
                height: 100%;
                float: left;
              }

              .blue1 {
                float: left;
                position: relative;
                left: 3px;
                top: 10px;
              }
            }
          }
        }

        .leftBottom {
          height: 65%;
          width: 100%;
          background-image: url("../assets/imgs/home/zxbj.svg");
          background-repeat: no-repeat;
          /*background-size: 100% 100%;*/
          background-size: cover;
          position: relative;
          top: 0;
          left: 0;

          .bottomTop {
            width: 95%;
            height: 41%;
          }

          .bottomBottom {
            width: 83%;
            height: 50px;
            background-image: url("../assets/imgs/home/xsz.svg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            /*background-size: cover;*/
            color: #ffffff;
            font-size: 14px;
            line-height: 50px;
            padding: 0 0 0 40px;

            .bottomxsj {
              width: 20px;
              height: 20px;
              background-image: url("../assets/imgs/home/hssj.svg");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              position: relative;
              left: 35.5%;
              top: -35px;
            }
          }
        }
      }

      .viewer {
        height: calc(100% - 90px);
        width: 62%;
        position: fixed;
        top: 60px;
        left: 19%;
        background-image: url("../assets/imgs/home/dtbj.svg");
        background-repeat: no-repeat;
        background-size: cover;
        /*background-size: 100% 100%;*/

        .viewer1 {
          height: calc(100% - 90px);
          width: 57%;
          position: fixed;
          top: 60px;
          left: 19%;
          background-image: url("../assets/imgs/home/zjbkbj.svg");
          background-repeat: no-repeat;
          background-size: cover;
          z-index: 1;
          padding: 0 15px 15px 15px;

          .viewerTop {
            width: 100%;
            height: 9.5%;

            .warningText {
              width: 23%;
              height: 80px;
              line-height: 80px;
              font-size: 24px;
              text-shadow: 3px 3px 3px #00d0ff;
            }

            .warningDetails {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }

          .viewerLeft {
            height: 91%;
            width: 100%;
            float: left;
          }
        }

        .viewerRight {
          height: 88%;
          width: 4%;
          position: absolute;
          top: 12%;
          left: 95.5%;
          background-image: url("../assets/imgs/home/zjybk.svg");
          background-repeat: no-repeat;
          /*background-size: 100% 100%;*/
          background-size: cover;
          z-index: 10;
        }
      }

      .rightSide {
        height: calc(100% - 90px);
        width: 19%;
        position: fixed;
        top: 60px;
        left: 81%;
        padding: 0 10px;

        .rightTop {
          height: 38%;
          width: 100%;
          position: relative;
          top: 0;
          left: 0;
          background-image: url("../assets/imgs/home/xbj1.svg");
          background-repeat: no-repeat;
          /*background-size: 100% 100%;*/
          background-size: cover;
        }

        .rightBottom {
          height: 63%;
          width: 100%;
          margin-top: 10px;
          position: relative;
          top: 0;
          left: 0;
          background-image: url("../assets/imgs/home/yxjbj.svg");
          background-repeat: no-repeat;
          /*background-size: 100% 100%;*/
          background-size: cover;

          .bottomTop {
            height: 50%;
            width: 100%;

            .bottomBottom {
              width: 83%;
              height: 37px;
              background-image: url("../assets/imgs/home/xsz.svg");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              /*background-size: cover;*/
              color: #ffffff;
              font-size: 14px;
              line-height: 50px;
              padding: 0 0 0 40px;
              margin-left: 10px;

              .bottomxsj {
                width: 20px;
                height: 20px;
                background-image: url("../assets/imgs/home/hssj.svg");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: relative;
                left: 35.5%;
                top: 8px;
              }
              span {
                float: left;
                line-height: 37px;
              }
              /*span::after {*/
              /*  content: "";*/
              /*  display: block;*/
              /*  height: 0;*/
              /*  clear: both;*/
              /*  visibility: hidden;*/
              /*}*/
            }

            .topLeft {
              height: 100%;
              width: 50%;
              float: left;
            }

            .topRigth {
              height: 100%;
              width: 50%;
              float: left;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .cesium-viewer-bottom {
    display: none;
  }

  .el-carousel__indicators--vertical {
    display: none;
  }
</style>
