<template>
  <div >
    <el-page-header @back="goBack" content="新增"> </el-page-header>
  
    <div class="tray">
      <div>
        <el-form
          ref="infoFrom"
          :rules="rules"
          :model="infoFrom"
          label-width="120px"
        >
          <el-form-item label="产品类型：" prop="typeId">
            <!-- <el-input v-model="infoFrom.typeId"></el-input>-->
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
          <el-form-item label="产品名称：" prop="name">
            <el-input v-model="infoFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="产品编号：" prop="code">
            <el-input v-model="infoFrom.code"></el-input>
          </el-form-item>

          <el-form-item label="主单位：" prop="mainUnit">
            <el-input v-model="infoFrom.mainUnit"></el-input>
          </el-form-item>

          <el-form-item label="主单位比例：" prop="mainUnitRatio">
            <el-input v-model="infoFrom.mainUnitRatio"></el-input>
          </el-form-item>
          <el-form-item label="副单位：" prop="viceUnit">
            <el-input v-model="infoFrom.viceUnit"></el-input>
          </el-form-item>
          <el-form-item label="副单位比例：" prop="viceUnitRatio">
            <el-input v-model="infoFrom.viceUnitRatio"></el-input>
          </el-form-item>
          <el-form-item label="规格：" prop="specs">
            <el-input v-model="infoFrom.specs"></el-input>
          </el-form-item>
          <el-form-item label="成品克重：" prop="productWeight">
            <el-input v-model="infoFrom.productWeight"></el-input>
          </el-form-item>

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
import { infoInsertApi, typegetAllApi } from "../../../api";
export default {
  data() {
    return {
      infoFrom: {
        typeId: "",
        name: "",
        code: "",
        tion: "",
        mainUnit: "",
        mainUnitRatio: "",
        viceUnit: "",
        viceUnitRatio: "",

        productWeight: "",
      },
      rules: {
        typeId: [
          { required: true, message: "请选择产品类型", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入产品编号", trigger: "blur" }],
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }],
        mainUnit: [
          { required: true, message: "请输入主单位", trigger: "blur" },
        ],
        mainUnitRatio: [
          { required: true, message: "请输入主单位比例", trigger: "blur" },
        ],
        viceUnit: [
          { required: true, message: "请输入副单位", trigger: "blur" },
        ],
        viceUnitRatio: [
          { required: true, message: "请输入副单位比例", trigger: "blur" },
        ],
        productWeight: [
          { required: true, message: "请输入成品克重", trigger: "blur" },
        ],
      },
      options: [],
    };
  },
  created() {
    this.createProductTypeSelect();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    createProductTypeSelect() {
      typegetAllApi({}).then((res) => {
       
        this.options = res.data.data;
      });
    },

    onSubmit(infoFrom) {
      this.$refs[infoFrom].validate((valid) => {
        if (valid) {
          infoInsertApi({
            name: this.infoFrom.name,
            code: this.infoFrom.code,
            typeId: this.infoFrom.typeId,
            mainUnit: this.infoFrom.mainUnit,
            mainUnitRatio: this.infoFrom.mainUnitRatio,
            viceUnitRatio: this.infoFrom.viceUnitRatio,
            viceUnit: this.infoFrom.viceUnit,
            specs: this.infoFrom.specs,
            productWeight: this.infoFrom.productWeight,
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
h2 {
  font-size: 20px;
}
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
