<template>
  <div class="air-quality-statistics">
<!--echart图表-->
    <div class="chart">
      <AirChart></AirChart>
    </div>
<!--下半页面-->
    <div class="other">
<!--导出按钮-->
      <div class="btn">
        <el-button type="primary" size="mini" @click="dialogVisible = true">导出报告</el-button>
      </div>
<!--table表格-->
      <div class="table-show">
        <el-table
            :data="tableData"
            height="450"
            style="width: 100%">
          <el-table-column
              prop="city"
              label="城市"
              align="center">
          </el-table-column>
          <el-table-column
              prop="composite"
              label="综合指数"
              align="center">
          </el-table-column>
          <el-table-column
              prop="compositeGradient"
              label="综合指数同比变化率"
              align="center">
          </el-table-column>
          <el-table-column
              prop="score"
              label="分数"
              align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--弹出对话框-->
    <el-dialog
        title="导出报告"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
      <div class="dialog-header">
        <el-tooltip class="item" effect="dark" content="开始" placement="top-start">
          <i v-if="isSuspended" class="el-icon-video-play self" @click="exportExcel"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="暂停" placement="top-start">
          <i v-if="!isSuspended" class="el-icon-video-pause self"></i>
        </el-tooltip>
        <div class="progress-bar">
          <el-progress type="circle" :width = 75 :percentage="percentage"></el-progress>
        </div>
      </div>
      <div class="dialog-main">
        <div class="select-table">
          <el-select v-model="cityValue" placeholder="选择导出城市">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="data-pick">
          <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="button-radio">
        <div style="font-size: 18px; font-weight: 700; margin-bottom: 15px">其他数据</div>
        <div style="margin-bottom: 10px"><el-checkbox size="mini" v-model="all" label="全选" border @change="selectAll"></el-checkbox></div>
        <div class="radios">
          <el-checkbox size="mini" v-model="PM25" label="空气PM2.5值" border></el-checkbox>
          <el-checkbox size="mini" v-model="So2" label="二氧化硫值" border></el-checkbox>
          <el-checkbox size="mini" v-model="Co" label="一氧化碳值" border></el-checkbox>
          <el-checkbox size="mini" v-model="No2" label="二氧化氮值" border></el-checkbox>
          <el-checkbox size="mini" v-model="O3" label="臭氧值" border></el-checkbox>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AirChart from '../../components/home/airChart/AirChart';
export default {
  name: 'AirQualityStatistics',
  components: {
    AirChart
  },
  data () {
    return {
      isSuspended: true,
      dialogVisible: false,
      options: [],
      cityValue: '',
      percentage: 0,
      tableData: [],
      value1: '',
      value2: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      all: false,
      PM25: false,
      So2: false,
      Co: false,
      No2: false,
      O3: false
    };
  },
  mounted () {
    if (this.$store.state.airChartData[0]) {
      this.options.push(
        {
          value: 'all',
          name: '全部城市'
        }
      );
      for (let i = 1; i < this.$store.state.airChartData[0].length; i++) {
        const cities = {
          value: this.$store.state.airChartData[0][i],
          name: this.$store.state.airChartData[0][i]
        };
        this.options.push(cities);
      }
      for (let j = 1; j < this.$store.state.airChartData[0].length; j++) {
        const data = {
          city: this.$store.state.airChartData[0][j],
          composite: this.$store.state.airChartData[1][j],
          compositeGradient: this.$store.state.airChartData[2][j],
          score: this.$store.state.airChartData[3][j]
        };
        this.tableData.push(data);
      }
    }
  },
  methods: {
    // tHeader是表头，filterVal 中的数据是表格的字段，
    // tableData中存放表格里的数据，类型为数组，里面存放对象，表格的每一行为一个对象
    exportExcel () {
      this.isSuspended = false;
      this.percentage = 100;
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('../../utils/Export2Excel');
        const tHeader = ['城市', '综合指数', '综合指数同比变化率', '分数'];
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['city', 'composite', 'compositeGradient', 'score'];
        // 上面的name、composite、compositeGradient是tableData里对象的属性
        const list = this.tableData; // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '结果报告');
      });
      this.isSuspended = true;
    },
    // 数据格式化
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 是否全选
    selectAll () {
      this.PM25 = !this.PM25;
      this.So2 = !this.So2;
      this.Co = !this.Co;
      this.No2 = !this.No2;
      this.O3 = !this.O3;
    }
  }
};
</script>

<style scoped>
  .air-quality-statistics {
    width: 100%;
    height: 100%;
    background-color: #5e6368;
  }
  .chart {
    width: 100%;
    height: 50%;
  }
  .other {
    position: relative;
    width: 100%;
    height: 50%;
  }
  .btn {
    position: absolute;
    top: 30px;
    right: 10px;
    z-index: 99;
  }
  .self {
    position: absolute;
    top: 100px;
    font-size: 50px;
    cursor: pointer;
  }
  /deep/ .el-dialog__body {
    height: 500px;
  }
  .progress-bar {
    position: absolute;
    right: 20px;
  }
  .dialog-header {
    width: 100%;
    height: 30%;
  }
  .dialog-main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 20%;
  }
  .button-radio {
    width: 100%;
    height: 50%;
  }
  .table-show {
    position: absolute;
    width: 100%;
    top: 20px;
  }
  /deep/ .el-table th{
    color: #fff;
    background-color: #5e6368;
  }
  /deep/ .el-table tr{
    color: #fff;
     background: #5e6368;
   }
  /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #43c5e8;
  }
  /deep/ .el-date-picker {
    margin-left: 30px;
  }
</style>
