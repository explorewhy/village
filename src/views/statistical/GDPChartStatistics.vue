<template>
  <div class="water-statistics">
    <!--echart图表-->
    <div class="chart">
      <GDPChart></GDPChart>
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
              prop="nineteenGDP"
              label="2019年GDP总量"
              align="center">
          </el-table-column>
          <el-table-column
              prop="twentyGDP"
              label="2020年GDP总量"
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
    </el-dialog>
  </div>
</template>

<script>
import GDPChart from '../../components/home/GDPChart/GDPChart';
export default {
  name: 'GDPChartStatistics',
  components: {
    GDPChart
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
      }
    };
  },
  mounted () {
    if (this.$store.state.gdpChartData.city) {
      this.options.push(
        {
          value: 'all',
          name: '全部城市'
        }
      );
      for (let i = 0; i < this.$store.state.gdpChartData.city.length; i++) {
        const cities = {
          value: this.$store.state.gdpChartData.city[i],
          name: this.$store.state.gdpChartData.city[i]
        };
        this.options.push(cities);
      }
      for (let j = 0; j < this.$store.state.gdpChartData.series1.length; j++) {
        const data = {
          city: this.$store.state.gdpChartData.city[j],
          nineteenGDP: this.$store.state.gdpChartData.series1[j],
          twentyGDP: this.$store.state.gdpChartData.series2[j]
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
        const tHeader = ['城市', '2019年GDP总量', '2020年GDP总量'];
        const filterVal = ['city', 'nineteenGDP', 'twentyGDP'];
        const list = this.tableData; // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '结果报告');
      });
      this.isSuspended = true;
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style scoped>
  .water-statistics {
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
    height: 70%;
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
