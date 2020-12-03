<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <el-form
        ref="typeFrom"
        :rules="rules"
        :model="typeFrom"
        label-width="100px"
      >
        <el-form-item label="产品类型：" prop="name">
          <el-input v-model="typeFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="类型编号：" prop="code">
          <el-input v-model="typeFrom.code"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="typeFrom.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit('typeFrom')"
            >确认</el-button
          >
          <el-button size="small" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { typeInsertApi } from "../../../api";
export default {
  data() {
    return {
      typeFrom: {
        name: "",
        code: "",
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "请输入产品类型", trigger: "blur" }],
        code: [{ required: true, message: "请输入类型编号", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit(typeFrom) {
      this.$refs[typeFrom].validate((valid) => {
        if (valid) {
          typeInsertApi({
            name: this.typeFrom.name,
            code: this.typeFrom.code,
            remark: this.typeFrom.remark,
          }).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.go(-1);
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
