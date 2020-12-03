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
            <th>标准</th>
            <th>判定</th>
          </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in tableData" >
          <tr :key="index">
            <!--<td class="w" v-bind:rowspan="index">{{index}}{{item.processName}}</td>-->
           <td class="w" v-bind:rowspan="item.count" v-if="index == 0 || tableData[index - 1].processName != tableData[index].processName">{{tableData[index].processName}}</td>
           <td class="w" >{{item.indicatorName}}</td>
            <td>{{item.indicatorStandard}}</td>
            <td>
              <el-radio-group v-model="tableData[index].radio">
                <el-radio @change="changeRadio(item.id,'1')" v-bind:label="1">合格</el-radio>
                <el-radio @change="changeRadio(item.id,'0')" v-bind:label="0">不合格</el-radio>
              </el-radio-group>
            </td>
          </tr>
        </template>
          <tr>
            <td colspan="1">生产日期</td>
            <td colspan="3" v-text="productionDate"></td>
          </tr>
         <!--<tr>
            <td colspan="1">入库信息：</td>
            <td colspan="3">2019-2-2</td>
          </tr>-->
          <tr>
            <td colspan="1">检测日期</td>
            <td colspan="3" v-text="createDate"></td>
          </tr>
          <tr>
            <td colspan="1">备注</td>
            <td colspan="3">
              <el-input v-model="remarks"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
  import {qualityFinishDetailsGet, qualityFinishDetailsUpdate, qualityOnlineOptionGetAll} from "../../../api"
export default {
  data() {
    return {
      id: "",
      input: "",
      humidity: "",
      temperature: "",
      remarks: "",
      productionDate: "",
      username:'',
      createDate: "",
      radio: 1,
      tableData:[],
      radioCheck:{},
    };
  },
  created() {  //进页面加载
    this.getIdData();
  },
  methods: {
      onSave(){ //保存
        qualityFinishDetailsUpdate({'temperature':this.temperature,'humidity':this.humidity,'remarks':this.remarks,'id':this.id,content:JSON.stringify(this.radioCheck)}).then(res => {
          this.$router.go(-1);
        })
      },
      changeRadio(id,src){
        this.radioCheck[id] = parseInt(src);
       
      },
      getIdData(){
        qualityFinishDetailsGet(this.$route.query.id).then(res => {
       
          var jsonObj = eval('(' + res.data.data.content + ')');
          this.id = res.data.data.id;
          this.radioCheck = jsonObj;
          this.humidity = res.data.data.humidity;
          this.temperature = res.data.data.temperature;
          this.username = res.data.data.userName;
          this.remarks = res.data.data.remarks;
          this.productionDate = res.data.data.productionDate;
          this.createDate = res.data.data.createDate;
          this.getProcessOptionData(jsonObj);
        })
      },
     getProcessOptionData(jsonObj){
       qualityOnlineOptionGetAll({'type':1}).then(res => {
         for (var i = 0; i < res.data.data.length;i++){
           res.data.data[i]['radio'] = jsonObj[res.data.data[i].id];
           this.tableData.push(res.data.data[i]);
         }

         this.tableData = res.data.data;
         var index = [];
         for (var i = 0; i < this.tableData.length;i++){
           if(i == 0 || this.tableData[i].processName != this.tableData[i-1].processName){
             index.push(i);
           }
         }

         for (var i = 0;i<index.length;i++){
           if(i != index.length-1){
             this.tableData[index[i]]['count'] = (index[i+1] - index[i])
           }else{
             this.tableData[index[i]]['count'] = 4
           }
         }
       })
      },
      goBack() {
         this.$router.go(-1);
      },
  },
};
</script>

<style>
.onSave{
  position: absolute;
    right: 40px;
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
