<template>
  <div class="warp">
    <el-page-header @back="goBack" content="详情"> </el-page-header>
    <div class="resulting">
      <div class="resulting_list">
        <label>入库单号：</label
        ><el-input
          style="width: 150px"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>库房：</label
        ><el-input
          style="width: 150px"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>入库时间：</label
        ><el-input
          style="width: 150px"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>入库人员：</label
        ><el-input
          style="width: 150px"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
     
    </div>
    <div class="resulting2">
      <h2>新增明细</h2>
      <div class="resulting_list">
        <label>产品：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
     
      <div class="resulting_list">
        <label>产品编号：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>产品编码：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>数量：</label
        ><el-input
         class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>主单位：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="resulting_list">
        <label>副单位：</label
        ><el-input
          class="edit_input"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
       
    </div>
    <!-- <div>
          <div class="resulting_list2">
        <label>备注：</label
        ><el-input
          type="textarea"
          :rows="4"
          style="vertical-align: middle;width:76%"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
    </div> -->
    <div class="picklistbtn">
        <el-button type="primary" size="mini">确认</el-button>
        <el-button   size="mini">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      textarea:''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {},
  },
};
</script>

<style>
.resulting,.resulting2 {
  overflow: hidden;
}
.resulting_list {
  width: 33%;
  float: left;
  margin-bottom: 15px;
/*   
  margin-top: 15px; */
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
.picklistbtn{
    margin-top: 40px;
    width: 100%;
    text-align: center;
}
</style>