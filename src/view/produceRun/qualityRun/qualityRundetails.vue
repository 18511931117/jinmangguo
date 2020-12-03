<template>
  <div>
    <el-page-header @back="goBack" content="详情"> </el-page-header>
    <div class="warp">
     <div class="onSave">
        <el-button
          type="primary"
          size="small"
          @click="onSave"
          >保存</el-button
        >
      </div>
    <div class="resulting">
      <!--<h3>水松纸工段在线质量检测项目清单</h3>-->

      <div class="resulting_list">
        <label>检测人：</label
        ><el-input
        class="edit_input"
        v-model="username"
        placeholder="" disabled
      ></el-input>
      </div>
      <div class="resulting_list">
        <label>温度：</label
        ><el-input
        class="edit_input"
        v-model="temperature"
        placeholder="请输入内容"
      ></el-input>
      </div>
      <div class="resulting_list">
        <label>湿度：</label
        ><el-input
        class="edit_input"
        v-model="humidity"
        placeholder="请输入内容"
      ></el-input>
      </div>

    </div>
    <div class="vxe_table">
      <table class="gridtable" border>
        <thead>
        <tr>
          <th>工序</th>
          <th>指标名称</th>
          <th>工艺标准</th>
          <th>判定</th>
          <th>工艺纪律执行情况</th>
        </tr>
        </thead>
        <tbody >
        <template v-for="(item,index) in tableData">
          <tr :key="index">
            <td class="w" v-bind:rowspan="tableData.length" v-if="index == 0">{{item.processName}}</td>
            <td class="w" @click="onEdit">{{item.indicatorName}}</td>
            <td>{{item.indicatorStandard}}</td>
            <td>
              <el-radio-group v-model="tableData[index].radio">
                <el-radio v-bind:name="item.id" @change="changeRadio(item.id,'1')" v-bind:label="1">合格</el-radio>
                <el-radio v-bind:name="item.id" @change="changeRadio(item.id,'0')" v-bind:label="0">不合格</el-radio>
              </el-radio-group>
            </td>
            <td v-bind:rowspan="tableData.length" v-if="index == 0">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">产品标示</el-checkbox>
                <el-checkbox label="2">工艺指导卡</el-checkbox>
                <el-checkbox label="3">质量自检记录</el-checkbox>
                <el-checkbox label="4">坚守岗位</el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
        </template>
        <tr>
          <td colspan="1">备注</td>
          <td colspan="4">
            <el-input  v-model="remarks"></el-input>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
  import {qualityOnlineDetailsGet,qualityOnlineOptionGetAll,qualityOnlineDetailsUpdate} from "../../../api"
  export default {
    data() {
      return {
        value3: "3",
        input: "",
        username:'',//检测人
        temperature:"",//温度
        humidity:'',//湿度
        situations:'',//选项
        remarks:'',//选项
        id:'',//选项
        radio: 1,
        checkList: [],
        tableData:[],
        radioCheck:{},
      };
    },
    created() {  //进页面加载
      this.getIdData();
    },
    methods: {
      changeRadio(id,src){
        this.radioCheck[id] = parseInt(src);
     
      },
      getIdData(){
        var jsonObj = null;
        qualityOnlineDetailsGet(this.$route.query.id).then(res => {
          jsonObj = eval('(' + res.data.data.content + ')');
          this.humidity = res.data.data.humidity;
          this.id = res.data.data.id;
          this.temperature = res.data.data.temperature;
          this.username = res.data.data.userName;
          this.remarks = res.data.data.remarks;
          var situations =  res.data.data.situation.split(",");
          for (var i = 0;i < situations.length;i++){
            this.checkList.push(situations[i]);
          }
          this.getProcessOptionData(jsonObj);
        })

      },
      getProcessOptionData(jsonObj){
        qualityOnlineOptionGetAll({'productionProcessId':this.$route.query.processId,'type':0}).then(res => {
     
          this.radioCheck = jsonObj;
          for (var i = 0; i < res.data.data.length;i++){
            res.data.data[i]['radio'] = jsonObj[res.data.data[i].id];
            this.tableData.push(res.data.data[i]);
          }
        })
      },
      onSave(){ //保存
        var str = "";
        for(var i = 0;i<this.checkList.length;i++){
          str += "," + this.checkList[i];
        }
        qualityOnlineDetailsUpdate({'temperature':this.temperature,'humidity':this.humidity,remarks:this.remarks,id:this.id,situations:str.substring(1),content:JSON.stringify(this.radioCheck)}).then(res => {
          this.$router.go(-1);
        })
      },
      onEdit() {
        this.isShow = true;
        this.isFinish = true;
      },
      goBack() {
        this.$router.go(-1);
      },
      onSubmit() {},
    },
  };
</script>

<style>
.onSave{
  position: absolute;
    right: 30px;
    top: 90px;
}
  .resulting,
  .resulting2 {
    overflow: hidden;
  }
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
  h3 {
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
    margin-top: 15px;
  }
  table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #dedede;
    background-color: #fff;
  }
  table.gridtable td {
    border-width: 1px;
    padding: 8px;
    width: 18%;
    border-style: solid;
    border-color: #dedede;
    background-color: #ffffff;
  }
  .vxe_table {
    margin-top: 20px;
  }
</style>
