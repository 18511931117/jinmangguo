<template>
  <div class="warp">
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <el-form ref="trayFrom" :model="trayFrom" label-width="100px">
        <el-form-item label="托盘编码：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="RFID EPC：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="RFID编码：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item>
    <el-button type="primary" size="small" @click="onSubmit">确认</el-button>
    <el-button size="small">取消</el-button>
  </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trayFrom:{
        code:'',
        epc:'',
        rfid:'',
      }
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

<style>
.tray{
  width:50%;
  margin: 24px auto 0;
}
</style>