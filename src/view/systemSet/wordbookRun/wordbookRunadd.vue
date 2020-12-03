<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <el-form
        ref="wordFrom"
        :rules="rules"
        :model="wordFrom"
        label-width="100px"
      >
        <el-form-item label="参数名称：" prop="name">
          <el-input v-model="wordFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="参数分类：" prop="type">
          <el-input v-model="wordFrom.type"></el-input>
        </el-form-item>
        <el-form-item label="参数键：" prop="key">
          <el-input v-model="wordFrom.key"></el-input>
        </el-form-item>
        <el-form-item label="参数值：" prop="value">
          <el-input v-model="wordFrom.value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit('wordFrom')"
            >确认</el-button
          >
          <el-button size="small" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { wordInsert } from "../../../api";
export default {
  data() {
    return {
      wordFrom: {
        name: "",
        type: "",
        key: "",
        value: "",
      },
      rules: {
        name: [{ required: true, message: "请输入参数名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入参数分类", trigger: "blur" }],
        key: [{ required: true, message: "请输入参数键", trigger: "blur" }],
        value: [{ required: true, message: "请输入参数值", trigger: "blur" }],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit(wordFrom) {
      this.$refs[wordFrom].validate((valid) => {
        if (valid) {
          //alert('submit!');
          wordInsert({
            name: this.wordFrom.name,
            type: this.wordFrom.type,
            key: this.wordFrom.key,
            value: this.wordFrom.value,
          }).then((res) => {
            this.$router.go(-1);
            this.$message({
              message: "添加成功",
              type: "success",
            });
          });
        } else {
          
          return false;
        }
      });
    },
  },
};
</script>

<style>
.tray {
  width: 50%;
  margin: 24px auto 0;
}
</style>