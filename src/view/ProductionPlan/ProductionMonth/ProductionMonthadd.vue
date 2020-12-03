<template>
  <div >
    <el-page-header @back="goBack" content="月计划新增"> </el-page-header>
    <div class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>月计划名称：</label>
          <el-input
          class="edit_input"
          v-model="monthname"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list" style="width:50%">
        <label>时间范围：</label>
        <el-date-picker
        value-format="yyyy-MM-dd"
        v-model="data"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
    </el-date-picker>
      </div>
    </div>

    <div class="picklisttable">
      <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="印刷工序" name="first" :key="'first'">
               <ProductionMonthTabsFirst :data="data" :monthname="monthname" ref="ProductionMonthTabsFirst"></ProductionMonthTabsFirst>
            </el-tab-pane>
            <el-tab-pane label="烫金工序" name="second" :key="'second'">
              <ProductionMonthTabsSecond :data="data" :monthname="monthname" ref="ProductionMonthTabsSecond"></ProductionMonthTabsSecond>
            </el-tab-pane>
            <el-tab-pane label="分切工序" name="third" :key="'third'">
                <ProductionMonthThird :data="data" :monthname="monthname" ref="ProductionMonthThird"></ProductionMonthThird>
            </el-tab-pane>
             <el-tab-pane label="打孔工序" name="fourth" :key="'fourth'">
                <ProductionMonthFourth :data="data" :monthname="monthname" ref="ProductionMonthFourth"></ProductionMonthFourth>
            </el-tab-pane>
              <el-tab-pane label="复卷工序" name="five" :key="'five'">
                <ProductionMonthTabsFive :data="data" :monthname="monthname" ref="ProductionMonthTabsFive"></ProductionMonthTabsFive>
            </el-tab-pane>
      </el-tabs>
    </div>
    <el-row class="row">
      <el-button size="mini" @click="goBack">取消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
    </el-row>
    </div>
  </div>
</template>

<script>
  import {
    monthPlaninsertMonthPlan,
  } from "../../../api";
import ProductionMonthTabsFirst from "./ProductionMonthadd/ProductionMonthTabsFirst"
import ProductionMonthTabsSecond from "./ProductionMonthadd/ProductionMonthTabsSecond"
import ProductionMonthThird from "./ProductionMonthadd/ProductionMonthThird"
import ProductionMonthFourth from "./ProductionMonthadd/ProductionMonthFourth"
import ProductionMonthTabsFive from "./ProductionMonthadd/ProductionMonthTabsFive"
export default {
  components:{
    ProductionMonthTabsFirst,
    ProductionMonthTabsSecond,
    ProductionMonthThird,
    ProductionMonthFourth,
    ProductionMonthTabsFive
  },
  data() {
    return {
      data:'',
      monthname:'',
      activeName:'first',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleClick(){

    },
    onSubmit() {
      var submitData = [];
      if(this.$refs.ProductionMonthTabsFirst != undefined){
        for(var deviceId in this.$refs.ProductionMonthTabsFirst.deviceVal)
        {
          var deviceData = this.$refs.ProductionMonthTabsFirst.deviceVal[deviceId]
          for(var i = 0;i<deviceData.length;i++){
            submitData.push({
              'processId': 1,
              'deviceId':deviceId,
              'productId':deviceData[i].id,
              'unit':'t',
              'productionNum':deviceData[i].productNum,
            });
          }
        }
      }
      if(this.$refs.ProductionMonthTabsSecond != undefined){
        for(var deviceId in this.$refs.ProductionMonthTabsSecond.deviceVal)
        {
          var deviceData = this.$refs.ProductionMonthTabsSecond.deviceVal[deviceId]
          for(var i = 0;i<deviceData.length;i++){
            submitData.push({
              'processId': 2,
              'deviceId':deviceId,
              'productId':deviceData[i].id,
              'unit':'t',
              'productionNum':deviceData[i].productNum,
            });
          }
        }
      }
      if(this.$refs.ProductionMonthThird != undefined){
        for(var deviceId in this.$refs.ProductionMonthThird.deviceVal)
        {
          var deviceData = this.$refs.ProductionMonthThird.deviceVal[deviceId]
          for(var i = 0;i<deviceData.length;i++){
            submitData.push({
              'processId': 3,
              'deviceId':deviceId,
              'productId':deviceData[i].id,
              'unit':'t',
              'productionNum':deviceData[i].productNum,
            });
          }
        }
      }
      if(this.$refs.ProductionMonthFourth != undefined){
        for(var deviceId in this.$refs.ProductionMonthFourth.deviceVal)
        {
          var deviceData = this.$refs.ProductionMonthFourth.deviceVal[deviceId]
          for(var i = 0;i<deviceData.length;i++){
            submitData.push({
              'processId': 4,
              'deviceId':deviceId,
              'productId':deviceData[i].id,
              'unit':'t',
              'productionNum':deviceData[i].productNum,
            });
          }
        }
      }
      if(this.$refs.ProductionMonthTabsFive != undefined){
        for(var deviceId in this.$refs.ProductionMonthTabsFive.deviceVal)
        {
          var deviceData = this.$refs.ProductionMonthTabsFive.deviceVal[deviceId]
          for(var i = 0;i<deviceData.length;i++){
            submitData.push({
              'processId': 5,
              'deviceId':deviceId,
              'productId':deviceData[i].id,
              'unit':'t',
              'productionNum':deviceData[i].productNum,
            });
          }
        }
      }
      if(this.monthname != '' && this.data != ''){
         var subData = {'name':this.monthname,'unit':'t','startDate':this.data[0],'endDate':this.data[1],'details':submitData};
      monthPlaninsertMonthPlan(subData).then((res) => {
        this.$router.go(-1);
      });
      }else{
        this.$message({
              message: "月计划名称和时间范围不能为空",
              type: "error",
            });
      }
    },
  },
  mounted() {
  },
};
</script>

<style>
.row {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.resulting,
.resulting2 {
  overflow: hidden;
}
/* .picklisttable {
  margin-top: 20px;
} */
.resulting_list {
  width: 33%;
  float: left;
  margin-bottom: 15px;
}
.resulting_list2 {
  margin-top: 15px;
}
.resulting_list label {
  display: inline-block;
  /* width: 100px;
  text-align: right; */
}
.resulting_list2 label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.picklistbtn {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}
.btnSave {
  position: absolute;
  top: 0px;
  right: 38px;
}
.picklisttable h2 {
  text-align: center;
}
table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  width: 100%;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #e6e6e6;
}
table.gridtable td {
  border-width: 1px;
  padding: 8px;
  width: 8%;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}
</style>
