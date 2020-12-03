<template>
  <div class="warp">
    <el-page-header @back="goBack" content="详情"> </el-page-header>
    <div class="resulting">
     <div class="resulting_list">
          <label>物料编号:</label><span>123456</span>
     </div>
     <div class="resulting_list">
          <label>物料分类:</label><span>123456</span>
     </div>
     <div class="resulting_list">
          <label>物料名称:</label><span>123456</span>
     </div>
     <div class="resulting_list">
          <label>成品克重:</label><span>123456</span>
     </div>
     <div class="resulting_list">
          <label>盘数:</label><span>123456</span>
     </div>
       <div class="resulting_list">
          <label>原纸长度:</label><span>123456</span>
     </div>
      <div class="resulting_list">
          <label>规格:</label><span>123456</span>
     </div>
     <div class="resulting_list">
          <label>操作实际消耗:</label><span>123456</span>
     </div>
     <div class="resulting_list">
          <label>原纸克重:</label><span>123456</span>
     </div>
     <!-- <div class="resulting_list">
          <label>原料照片:</label><span>123456</span>
     </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit(){

    }
  },
};
</script>

<style scoped>

.resulting_list{
    width: 33%;
    float: left;
   
    margin-bottom: 15px;
}
.resulting_list label{
    display: inline-block;
    /* width: 100px;
    text-align: right; */
}
</style>