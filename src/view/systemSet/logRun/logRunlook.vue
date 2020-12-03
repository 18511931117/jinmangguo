<template>
  <div class="warp">
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <el-form ref="trayFrom" :model="trayFrom" label-width="100px">
        <el-form-item label="用户姓名：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="响应数据：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="响应信息：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="请求链接：">
          <el-input v-model="trayFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="日志类型：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit"
            >确认</el-button
          >
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
      trayFrom: {
        code: "",
        epc: "",
        rfid: "",
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
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
.tray {
  width: 50%;
  margin: 24px auto 0;
}
</style>