<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <div>
        <el-form
          ref="infoFrom"
          :rules="rules"
          :model="infoFrom"
          label-width="140px"
        >
          <el-form-item label="物料分类：" prop="typeId">

            <el-select v-model="infoFrom.typeId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物料编号：" prop="code">
            <el-input v-model="infoFrom.code"></el-input>
          </el-form-item>
          <el-form-item label="物料名称：" prop="name">
            <el-input v-model="infoFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="克重：" prop="productWeight">
            <el-input v-model="infoFrom.productWeight"></el-input>
          </el-form-item>
         <!-- <el-form-item label="盘数：" prop="spellNum">
            <el-input v-model="infoFrom.spellNum"></el-input>
          </el-form-item>
          <el-form-item label="原纸长度：" prop="basePaperLength">
            <el-input v-model="infoFrom.basePaperLength"></el-input>
          </el-form-item>
          <el-form-item label="原纸宽度：" prop="basePaperThickness">
            <el-input v-model="infoFrom.basePaperThickness"></el-input>
          </el-form-item>
          <el-form-item label="原纸克重：" prop="basePaperGram">
            <el-input v-model="infoFrom.basePaperGram"></el-input>
          </el-form-item>-->
          <el-form-item label="规格：" prop="specs">
            <el-input v-model="infoFrom.specs"></el-input>
          </el-form-item>
          <el-form-item label="厂家及编号：" prop="manufactor">
            <el-input v-model="infoFrom.manufactor"></el-input>
          </el-form-item>
          <el-form-item label="操作实际消耗：" prop="consume">
            <el-input v-model="infoFrom.consume"></el-input>
          </el-form-item>
          <el-form-item label="主单位：" prop="mainCompany">
            <el-input v-model="infoFrom.mainCompany"></el-input>
          </el-form-item>
          <el-form-item label="主单位比例：" prop="mainCompanyRatio">
            <el-input v-model="infoFrom.mainCompanyRatio"></el-input>
          </el-form-item>
          <el-form-item label="副单位：" prop="viceCompany">
            <el-input v-model="infoFrom.viceCompany"></el-input>
          </el-form-item>
          <el-form-item label="副单位比例：" prop="viceCompanyRatio">
            <el-input v-model="infoFrom.viceCompanyRatio"></el-input>
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
            <el-button type="primary" size="small" @click="onSubmit('infoFrom')"
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
import { infoInsert,typegetAll } from "../../../api";
export default {
  data() {
    return {
      infoFrom: {
        code: "",
        name: "",
        productWeight: "",
        spellNum: "",
        basePaperLength: "",
        basePaperThickness: "",
        basePaperGram: "",
        specs: "",
        consume: "",
        typeId: "",
        manufactor: "",
        mainCompany: "",
        mainCompanyRatio: "",
        viceCompany: "",
        viceCompanyRatio: "",
      },
      options:[],
      rules: {
        code: [{ required: true, message: "请输入物料编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入物料名称", trigger: "blur" }],
        spellNum: [{ required: true, message: "请输入盘数", trigger: "blur" }],
        consume: [
          { required: true, message: "请输入操作实际消耗", trigger: "blur" },
        ],
        typeId: [
          { required: true, message: "请输入物料类型ID", trigger: "blur" },
        ],
      },
    };
  },
  created(){
    this.getSelect()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getSelect(){
      typegetAll().then(res=>{
        this.options = res.data.data
      })
    },
    onSubmit(infoFrom) {
      this.$refs[infoFrom].validate((valid) => {
        if (valid) {
          if(this.infoFrom.mainCompanyRatio != null && this.infoFrom.mainCompanyRatio != '' && this.infoFrom.mainCompanyRatio.toString().split(".")[1] != undefined && this.infoFrom.mainCompanyRatio.toString().split(".")[1].length > 2){
            this.$message({
              message: "主单位比例不符合规范",
              type: "error",
            });
            return false;
          }


          if(this.infoFrom.viceCompanyRatio != null && this.infoFrom.viceCompanyRatio != '' && this.infoFrom.viceCompanyRatio.toString().split(".")[1] != undefined && this.infoFrom.viceCompanyRatio.toString().split(".")[1].length > 2){
            this.$message({
              message: "副单位比例不符合规范",
              type: "error",
            });
            return false;
          }


          if(this.infoFrom.productWeight != null && this.infoFrom.productWeight != '' && ((this.infoFrom.productWeight.toString().split(".")[1] == undefined && this.infoFrom.productWeight >= 1000) || (this.infoFrom.productWeight.toString().split(".")[1] != undefined && this.infoFrom.productWeight.toString().split(".")[1].length > 2)) ){
            this.$message({
              message: "成品克重输入不符合规范",
              type: "error",
            });
            return false;
          }


          infoInsert({
            code: this.infoFrom.code,
            name: this.infoFrom.name,
            productWeight: this.infoFrom.productWeight,
            spellNum: this.infoFrom.spellNum,
            basePaperLength: this.infoFrom.basePaperLength,
            basePaperThickness: this.infoFrom.basePaperThickness,
            basePaperGram: this.infoFrom.basePaperGram,
            specs: this.infoFrom.specs,
            consume: this.infoFrom.consume,
            manufactor: this.infoFrom.manufactor,
            typeId: this.infoFrom.typeId,
            mainCompany: this.infoFrom.mainCompany,
            mainCompanyRatio: this.infoFrom.mainCompanyRatio,
            viceCompany: this.infoFrom.viceCompany,
            viceCompanyRatio: this.infoFrom.viceCompanyRatio,
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
