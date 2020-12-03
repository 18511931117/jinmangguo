<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <div>
        <el-form
          ref="typeFrom"
          :model="typeFrom"
          :rules="rules"
          label-width="140px"
        >
          <el-form-item label="物料类型名称：" prop="name">
            <el-input v-model="typeFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="物料类型编号：" prop="code">
            <el-input v-model="typeFrom.code"></el-input>
          </el-form-item>
          <!-- <el-form-item label="原料照片：">
          <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item> -->
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit('typeFrom')"
              >确认</el-button
            >
            <el-button size="small" @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { typeInsert } from "../../../api";
export default {
  data() {
    return {
      typeFrom: {
        name: "",
        code: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入物料类型名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入物料类型编号", trigger: "blur" },
        ],
        /*mainCompany: [
          { required: true, message: "请输入主单位", trigger: "blur" },
        ],*/
        /*mainCompanyRatio: [
          { required: true, message: "请输入主单位比例", trigger: "blur" },
        ],
        viceCompany: [
          { required: true, message: "请输入副单位", trigger: "blur" },
        ],
        viceCompanyRatio: [
          { required: true, message: "请输入副单位比例", trigger: "blur" },
        ],*/
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
          typeInsert({
            name: this.typeFrom.name,
            code: this.typeFrom.code,
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
/* h2 {
  font-size: 20px;
} */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
