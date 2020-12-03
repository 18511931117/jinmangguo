<template>
  <div class="index_bg">
    <div class="input-warp">
      <div class="input-left">
        <div class="input-left-top">
          <p>生产流程</p>
        </div>
        <div class="input-left-bottom">
          <label>生产编号：</label
          ><el-input
            v-model="code"
            size="medium"
            placeholder="请输入内容"
            style="width: 300px;vertical-align: middle;"
          ></el-input>
          <el-button type="primary" size="small" @click="toTimeLine"
            >确认</el-button
          >
        </div>
      </div>
      <!-- <div class="code-right">
        <img :src="imgA" alt="风景" width="80px" height="80px">
      </div> -->
    </div>
    <div class="title-info-warp">
      <div class="title-info">
        <p>今日生产概况</p>
      </div>

      <div class="title-top">
        <div class="box">
          <div class="box-left">
            <p class="text">今日生产数量</p>
            <p class="count">{{ todayPack }}</p>
            <span>KG</span>
          </div>
          <div class="box-right">
            <i class="fill"></i>
          </div>
        </div>
        <div class="box item2">
          <div class="box-left">
            <p class="text">今日计划数量</p>
            <p class="count">{{ todaySend * 1000 }}</p>
            <span>KG</span>
          </div>
          <div class="box-right">
            <i class="car_green"></i>
          </div>
        </div>
        <div class="box item2">
          <div class="box-left">
            <p class="text">今日入库数量</p>
            <p class="count">{{ totalPack }}</p>
            <span>卷</span>
          </div>
          <div class="box-right">
            <i class="home"></i>
          </div>
        </div>
        <div class="box item2">
          <div class="box-left">
            <p class="text">今日出库数量</p>
            <p class="count">{{ totalSend }}</p>
            <span>卷</span>
          </div>
          <div class="box-right">
            <i class="car_red"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="echarts-center">
      <div class="echarts-center-left">
        <div class="center-left-top">
          <div class="center-left-top-title">生产统计</div>
          <div class="center-left-top-title-tabs">
            <ul>
              <li :class="{ active: lineDay == 1 }" @click="getlineYear">年</li>
              <li :class="{ active: lineDay == 2 }" @click="getlineMoun">月</li>
              <li :class="{ active: lineDay == 3 }"  @click="getlineDay">日</li>
            </ul>
          </div>
        </div>
        <div class="echarts_line_warp">
          <div class="echarts_line_title">
            <p>{{linedate}}生产总数：<span>{{linedateCount}}</span></p>
          </div>
          <div id="line" ref="line" style="width: 100%; height: 340px"></div>
        </div>
      </div>
      <div class="echarts-center-right">
        <div class="center-left-top">
          <div class="center-left-top-title">生产工序对比</div>
          <div class="center-left-top-title-tabs">
            <ul>
              <li :class="{ active: picDay == 1 }" @click="getpicYear">当年</li>
              <li :class="{ active: picDay == 2 }" @click="getpicMoun">当月</li>
              <li :class="{ active: picDay == 3 }" @click="getpicDay">当日</li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="pic"
            id="pic"
            ref="pic"
            style="width: 100%; height: 340px"
          ></div>
        </div>
      </div>
    </div>
    <div class="echarts-bottom">
      <div class="echarts-text">
        <div class="ecarts-left">
          <p>出入库统计</p>
        </div>
        <div class="ecarts-right">
          <div class="tabs">
             <ul>
              <li :class="{ active: line2Day == 1 }" @click="getline2Year">年</li>
              <li :class="{ active: line2Day == 2 }" @click="getline2Moun">月</li>
              <li :class="{ active: line2Day == 3 }" @click="getline2Day">日</li>
            </ul>
          </div>
          <!-- <div class="blockTime">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="selectTime"
            ></el-date-picker>
          </div> -->
        </div>
      </div>
      <div class="echats-warp">
        <div class="count-text">
          <p>
            {{ text }}出库总数： <span>{{ monOutNum }}</span>卷

          </p>
          <p style="margin-left:15px">
            {{ text }}入库总数： <span>{{ monInNum }}</span>卷
          </p>
        </div>
        <div id="box" ref="box" style="width: 100%; height: 340px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getIndexData,
  getIndexgetYearSumCount,
  getIndexgetMonthSumCount,
  getIndexgetDaySumCount,
  getIndexgetDayProcessCount,
  getIndexgetYearStockCount,
  getIndexgetMonthStockCount,
  getIndexgetDayStockCount,
  getIndexgetMonthProcessCount,
  getIndexgetYearProcessCount
} from "../../api";
import imgE from "../../assets/timg.jpg";
export default {
  data() {
    return {
      imgA: imgE,
      value1: "",
      lineDay: 1,
      linedate:'',
      linedateCount:'',
      picDay:1,
      line2Day: 1,

      todayPack: "",
      todaySend: "",
      totalPack: "",
      totalSend: "",
      text: "",
      code: "",
      dateList: [],
      data: [],
      monOutNum:'',
      monInNum:'',
      lineYearArr:[],
      lineDataArr:[],
      picYearArr:[],
      picDataArr:[],
      countPic:'',
      line2DataArr:[],
      monthStockInDataList:[],
      monthStockOutDataList:[],

    };
  },
  created() {
    /*this.init();
    this.$nextTick(function(){
      this.getlineYear()
      this.getpicYear()
      this.getline2Year()
    })*/
    this.init();
    this.$nextTick(function(){
      this.getlineYear()
      this.getpicYear()
      this.getline2Year()
    })
  },
  mounted() {},
  methods: {
    init() {
      getIndexData({
        starDate:'',
        endDate:''
      }).then((res) => {
        this.todayPack = res.data.data.num,
         this.todaySend = res.data.data.planNum,
        this.totalPack = res.data.data.stockInNum;
        this.totalSend = res.data.data.stockOutNum;
      });
    },
    getlineYear(){
      this.lineDay = 1
      this.linedate = "本年"
      getIndexgetYearSumCount({}).then(res => {
        console.log(res)
        this.lineYearArr = res.data.data.MonthDataList //数据
        this.lineDataArr = res.data.data.dateList //日期
        this.linedateCount = res.data.data.totalCount
        this.lineTop();
      })
    },

    getlineMoun(){
      this.lineDay = 2
      this.linedate = "本月"
      getIndexgetMonthSumCount({}).then(res => {
        console.log(res)
        this.lineYearArr = res.data.data.data //数据
        this.lineDataArr = res.data.data.dateList //日期
        this.linedateCount = res.data.data.totalSUm
        this.lineTop();
      })
    },
    getlineDay(){
      this.lineDay = 3
      this.linedate = "本日"
      getIndexgetDaySumCount({}).then(res =>{

         this.lineYearArr = res.data.data.dataLists //数据
        this.lineDataArr = res.data.data.dateList //日期
         this.linedateCount = res.data.data.totalCount
        this.lineTop();
      })

    },
    getpicYear(){
      this.picDay = 1
       var total = 0; //各科正确率总和
      getIndexgetYearProcessCount().then(res => {
        this.picDataArr = res.data.data.data
        this.picYearArr = res.data.data.dataList
        for(var i = 0;i<this.picYearArr.length;i++){
          total += this.picYearArr[i].value
        }
         this.leftPic(total)
      })
    },
    getpicMoun(){
      this.picDay = 2
      var total = 0; //各科正确率总和
      getIndexgetMonthProcessCount().then(res => {
        console.log(res)
        this.picDataArr = res.data.data.data
        this.picYearArr = res.data.data.dataList
        for(var i = 0;i<this.picYearArr.length;i++){
          total += this.picYearArr[i].value
        }
         this.leftPic(total)
      })
    },
    getpicDay(){
      this.picDay = 3
      var total = 0; //各科正确率总和
      getIndexgetDayProcessCount().then(res => {
        console.log(res)
        this.picDataArr = res.data.data.data
        this.picYearArr = res.data.data.dataList
        for(var i = 0;i<this.picYearArr.length;i++){
          total += this.picYearArr[i].value
        }
        this.leftPic(total)
      })
    },
    getline2Year() {
      this.line2Day = 1
      this.text = "本年"
      getIndexgetYearStockCount().then(res => {
        console.log(res)
        this.line2DataArr = res.data.data.dateList //日期
        this.monthStockInDataList = res.data.data.monthStockInDataList //入库
        this.monthStockOutDataList = res.data.data.monthStockOutDataList //出库
        this.monInNum = res.data.data.stockInTotalSum
        this.monOutNum = res.data.data.stockOutTotalSum
        this.drawLine()
      })
    },
    getline2Moun() {
      this.line2Day = 2
      this.text = "本月"
      getIndexgetMonthStockCount().then(res => {
        console.log(res)
        this.line2DataArr = res.data.data.dateList //日期
        this.monthStockInDataList = res.data.data.inData //入库
        this.monthStockOutDataList = res.data.data.outData //出库
        this.monInNum = res.data.data.monInNum
        this.monOutNum = res.data.data.monOutNum
        this.drawLine()
      })
    },
    getline2Day(){
      this.line2Day = 3
      this.text = "本日"
      getIndexgetDayStockCount().then(res => {
        console.log(res)
        this.line2DataArr = res.data.data.dateList //日期
        this.monthStockInDataList = res.data.data.dataInList //入库
        this.monthStockOutDataList = res.data.data.dataOutList //出库
        this.monInNum = res.data.data.stockInTotalCount
        this.monOutNum = res.data.data.stockOutTotalCount
        this.drawLine()
      })
    },
    toTimeLine() {
      this.$router.push({
        name: "timeline",
        query: {
          code: this.code,
        },
      });
    },
    boxIndex() {},
    handleClick(tab, event) {},
    leftWeek() {
      this.show = 1;
      this.text = "本周";
      this.weekData();
    },
    leftMonth(total) {
      this.show = 2;
      this.text = "本月";
      this.monData();
    },
    leftPic(total) {
      let myChart = this.$echarts.init(this.$refs.pic);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },

        animation: true,
        title: {
          text: total.toFixed(2),
          subtext: "总产量",
          x: "center",
          y: "center",
          textStyle: {
            color: "#000",
            fontSize: 28,
            fontWeight: "normal"
          },
          subtextStyle: {
            color:"rgba(0,0,0,0.6)",
            fontSize: 14,
            fontWeight: "normal"
          },
        },
        legend: {
          left: "center",
          textStyle: {
            color:"rgba(0,0,0,0.6)",
            fontSize: 16,
          },

          icon: "circle",
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          right: "0",
          bottom: "20",
          data: this.picDataArr,
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "53%"],
            label: {
              show: false,
            },
            color: ["#3ba0ff", "#36cbcb", "#Fad337", "#f2637b", "#975fe4"],
            data: this.picYearArr
          },
        ],
      });
    },

    lineTop() {
      let myChart = this.$echarts.init(this.$refs.line);
      myChart.setOption({
        backgroundColor: "#fff",
        grid: {
          left: "6%",
          right: "5%",
          top: "25%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#1890FF",
            },
          },
        },
        legend: {
          show: true,

          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color:"rgba(0,0,0,0.6)",
          },
          right: "10",
          top: "2%",
          data: ["生产数"],
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: 40,
              color:"rgba(0,0,0,0.6)",
            },
            axisLine: {
              show: true,
              lineStyle: {
                 color:"#e8e8e8",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color:"rgba(0,0,0,0.6)",
              },
            },
            data: this.lineDataArr,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "KG",
            nameTextStyle:{
              color:"rgba(0,0,0,0.6)",
            },
            // min: 0,
            // max: 500,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color:"rgba(0,0,0,0.6)",
              },
            },
            axisLine: {
              lineStyle: {
                color:"#e8e8e8",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(232,232,232)",
                type: "dotted",
              },
            },
          },
        ],
        series: [
          {
            name: "生产数",
            type: "line",
            stack: "总量",
            smooth: true, //是否平滑
            symbol: "circle",
            symbolSize: 2,
            tooltip: {
              show: true,
            },
            itemStyle: {
              normal: {
                color: "#1890FF",
                lineStyle: {
                  color: "#1890FF",
                  width: 2,
                },
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(24, 144, 255, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(24, 144, 255, 0)",
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: this.lineYearArr,
          },
        ],
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例，所以只能在mounted中调用
      let myChart = this.$echarts.init(this.$refs.box);
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#fff",
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "5%",
          containLabel: true,
        },
        // tooltip: {
        //   show: true,
        //   trigger: "item",
        // },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#1890FF",
            },
          },
        },
        legend: {
          show: true,

          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color:"rgba(0,0,0,0.6)",
          },
          right: "10",
          top: "2%",
          data: ["出库数","入库数"],
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: 40,
              color:"rgba(0,0,0,0.6)",
            },
            axisLine: {
              show: true,
              lineStyle: {
                 color:"#e8e8e8",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,0,0,0.6)",
              },
            },
            data: this.line2DataArr,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "卷",
            nameTextStyle:{
              color:"rgba(0,0,0,0.6)",
            },
            // min: 0,
            // max: 500,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color:"rgba(0,0,0,0.6)",
              },
            },
            axisLine: {
              lineStyle: {
                 color:"#e8e8e8",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(232,232,232)",
                type: "dotted",
              },
            },
          },
        ],
        series: [
          {
            name: "出库数",
            type: "line",
            // stack: "总量",
            symbol: "circle",
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: "#1890ff",
                lineStyle: {
                  color: "#1890ff",
                  width: 1,
                },
              },
            },
            data: this.monthStockOutDataList,
          },
          {
            name: "入库数",
            type: "line",
           // stack: "总量",
            symbol: "circle",
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: "#2FC25B",
                lineStyle: {
                  color: "#2FC25B",
                  width: 1,
                },
              },
            },
            data: this.monthStockInDataList,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.index_bg {
  background: #e9eef3;
}
.echarts-center {
  height: 414px;
  display: flex;
  width: 100%;
  margin-top: 15px;
}
.echarts-center-left {
  flex: 1;
  height: 414px;
  background: #fff;
  /* padding: 5px; */
  box-sizing: border-box;
}
.echarts-center-right {
  width: 430px;
  height: 414px;
  background: #fff;
  margin-left: 15px;
  /* padding: 5px; */
  box-sizing: border-box;
}
.center-left-top-title-tabs{
  padding-right: 15px;
}
.center-left-top {
  height: 56px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}
.center-left-top-title {
  height: 56px;
  line-height: 56px;
  margin-left: 20px;
  font-size: 16px;
}
.echarts_line_warp {
  position: relative;
}
.echarts_line_title {
  z-index: 2;
  position: absolute;
  top: 15px;
  left: 22px;
}
.center-left-top-title-tabs ul {
  display: flex;
  margin-top: 10px;
}
.center-left-top-title-tabs ul li {
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border: 1px solid #e6e6e6;
  color:rgba(0,0,0,0.6);
  cursor: pointer;
}
.center-left-top-title-tabs ul li:first-child {
  border-radius: 5px 0 0 5px;
}
.center-left-top-title-tabs ul li:last-child {
  border-radius: 0px 5px 5px 0;
}
.center-left-top-title-tabs ul li.active {
  border: 1px solid #1890ff;
  color: #1890ff;
}
.input-warp {
  height: 100px;
  background: #fff;
  margin-bottom: 15px;
  padding: 0 20px;
  display: flex;
}
.input-warp p {
  font-size: 16px;
  margin-top: 10px;
}
.title-top {
  display: flex;
  height: 130px;
  padding: 0 15px;
}
.title-info-warp {
  background: #fff;
}
.code-right {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
.input-left {
  width: 100%;
}

.input-left-bottom {
  margin-top: 15px;
  width: 100%;
  text-align: center;
}
.title-info {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #e6e6e6;
}
.title-info p {
  font-size: 16px;
  margin-left: 20px;
}
.box {
  flex: 1;
  /* margin-left: 15px; */
  background: #fff;
  padding: 15px;
  box-sizing: content-box;
  display: flex;
  height: 70px;
  border: 1px solid #e6e6e6;
  margin-top: 15px;
}
.box-left {
  flex: 1;
}
.box-right {
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-left .text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.box-left .count {
  display: inline-block;
  font-size: 30px;
  color: #000000;
}
.item2 {
  margin-left: 15px;
}
.fill {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../assets/icon1.png") no-repeat;
  background-size: cover;
}
.car_green {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../assets/icon2_2.png") no-repeat;
   background-size: cover;
}
.home {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../assets/icon3_2.png") no-repeat;
   background-size: cover;
}
.car_red {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../assets/icon4_2.png") no-repeat;
   background-size: cover;
}

.echarts-text {
  height: 56px;
  display: flex;
  line-height: 56px;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 5px;
}
.ecarts-left{
  margin-left: 15px;
}
.ecarts-left p {
  color: #000;
  font-size: 16px;
}
.ecarts-right {
  display: flex;
}
.echarts-bottom {
  background: #fff;
  margin-top: 15px;
}
.tabs ul {
  display: flex;
  margin-top: 12px;
  margin-right: 8px;
}
.tabs ul li {
  width: 70px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
   color:rgba(0,0,0,0.6);
}
.tabs ul li:first-child{
  border-radius: 5px 0 0 5px;

}
.tabs ul li:last-child{
  border-radius: 0px 5px 5px 0px;
}
.tabs ul li.active {
  border: 1px solid #1890ff;
  color: #1890ff;
}
.echats-warp {
  position: relative;
}
.count-text {
  display: flex;
  position: absolute;
  top: 15px;
  left: 27px;
  z-index: 2;
}

</style>
