<template>
  <div>
    <el-page-header @back="goBack" content="编辑通知单"> </el-page-header>
    <div class="warp">
    <div class="resulting">
      <div class="resulting_list">
        <label>通知单名称：</label>
        <el-input
          class="edit_input"
          v-model="monthname"
          placeholder="请输入内容"
        ></el-input>
      </div>
     <!-- <div class="resulting_list" style="width:50%">
        <label>时间范围：</label>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="data"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>-->
    </div>

    <div class="picklisttable">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="印刷工序" name="first" :key="'first'">
          <CreateOrderTabsFirst :data="data" :monthname="id" ref="CreateOrderTabsFirst"></CreateOrderTabsFirst>
        </el-tab-pane>
        <el-tab-pane label="烫金工序" name="second" :key="'second'">
          <CreateOrderTabsSecond :data="data" :monthname="id" ref="CreateOrderTabsSecond"></CreateOrderTabsSecond>
        </el-tab-pane>
        <el-tab-pane label="分切工序" name="third" :key="'third'">
          <CreateOrderTabsThird :data="data" :monthname="id" ref="CreateOrderTabsThird"></CreateOrderTabsThird>
        </el-tab-pane>
        <el-tab-pane label="打孔工序" name="fourth" :key="'fourth'">
          <CreateOrderTabsFourth :data="data" :monthname="id" ref="CreateOrderTabsFourth"></CreateOrderTabsFourth>
        </el-tab-pane>
        <el-tab-pane label="复卷工序" name="five" :key="'five'">
          <CreateOrderTabsFive :data="data" :monthname="id" ref="CreateOrderTabsFive"></CreateOrderTabsFive>
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
    noticeget,noticeUpdate
  } from "../../../api";
  import CreateOrderTabsFirst from "./CreateOrderTabsFirst"
  import CreateOrderTabsSecond from "./CreateOrderTabsSecond"
  import CreateOrderTabsThird from "./CreateOrderTabsThird"
  import CreateOrderTabsFourth from "./CreateOrderTabsFourth"
  import CreateOrderTabsFive from "./CreateOrderTabsFive"
  export default {
    components:{
      CreateOrderTabsFirst,
      CreateOrderTabsSecond,
      CreateOrderTabsThird,
      CreateOrderTabsFourth,
      CreateOrderTabsFive
    },
    data() {
      return {
        id:this.$route.query.id,
        data:'',
        monthname:'',
        activeName:'first',
      };
    },created() {
      this.init();
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      handleClick(){

      },
      init(){
        noticeget(this.$route.query.id).then(res => {
          this.id = res.data.data.id;
          this.monthname = res.data.data.name;
        })
      },
      onSubmit() {
        var submitData = [];
        if(this.$refs.CreateOrderTabsFirst != undefined){
          for(var deviceId in this.$refs.CreateOrderTabsFirst.deviceVal)
          {
            var deviceData = this.$refs.CreateOrderTabsFirst.deviceVal[deviceId]
            for(var i = 0;i<deviceData.length;i++){
              submitData.push({
                'processId': 1,
                'deviceId':deviceId,
                'productId':deviceData[i].id,
                'unit':'t',
                'productNum':deviceData[i].productNum,
              });
            }
          }
        }
        if(this.$refs.CreateOrderTabsSecond != undefined){
          for(var deviceId in this.$refs.CreateOrderTabsSecond.deviceVal)
          {
            var deviceData = this.$refs.CreateOrderTabsSecond.deviceVal[deviceId]
            for(var i = 0;i<deviceData.length;i++){
              submitData.push({
                'processId': 2,
                'deviceId':deviceId,
                'productId':deviceData[i].id,
                'unit':'t',
                'productNum':deviceData[i].productNum,
              });
            }
          }
        }
        if(this.$refs.CreateOrderTabsThird != undefined){
          for(var deviceId in this.$refs.CreateOrderTabsThird.deviceVal)
          {
            var deviceData = this.$refs.CreateOrderTabsThird.deviceVal[deviceId]
            for(var i = 0;i<deviceData.length;i++){
              submitData.push({
                'processId': 3,
                'deviceId':deviceId,
                'productId':deviceData[i].id,
                'unit':'t',
                'productNum':deviceData[i].productNum,
              });
            }
          }
        }
        if(this.$refs.CreateOrderTabsFourth != undefined){
          for(var deviceId in this.$refs.CreateOrderTabsFourth.deviceVal)
          {
            var deviceData = this.$refs.CreateOrderTabsFourth.deviceVal[deviceId]
            for(var i = 0;i<deviceData.length;i++){
              submitData.push({
                'processId': 4,
                'deviceId':deviceId,
                'productId':deviceData[i].id,
                'unit':'t',
                'productNum':deviceData[i].productNum,
              });
            }
          }
        }
        if(this.$refs.CreateOrderTabsFive != undefined){
          for(var deviceId in this.$refs.CreateOrderTabsFive.deviceVal)
          {
            var deviceData = this.$refs.CreateOrderTabsFive.deviceVal[deviceId]
            for(var i = 0;i<deviceData.length;i++){
              submitData.push({
                'processId': 5,
                'deviceId':deviceId,
                'productId':deviceData[i].id,
                'unit':'t',
                'productNum':deviceData[i].productNum,
              });
            }
          }
        }
        if(this.monthname != ""){
           var subData = {'id':this.id,'name':this.monthname,'detaileds':submitData};
        
        noticeUpdate(subData).then((res) => {
           this.$message({
              message: "修改成功",
              type: "success",
            });
          this.$router.go(-1);
        });
        }else{
          this.$message({
              message: "通知单名称不能为空",
              type: "error",
            });
        }
       
       
      },
    },
    mounted() {
    },
  };
</script>

<style scoped>
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
