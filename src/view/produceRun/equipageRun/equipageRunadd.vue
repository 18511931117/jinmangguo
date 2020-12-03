<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <div>
        <el-form
          ref="deviceFrom"
          :rules="rules"
          :model="deviceFrom"
          label-width="100px"
        >
          <el-form-item label="设备名称：" prop="name">
            <el-input v-model="deviceFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="设备编码：" prop="code">
            <el-input v-model="deviceFrom.code"></el-input>
          </el-form-item>
          <el-form-item label="所属车间：" prop="farmId">
            <!--<el-input v-model="deviceFrom.farmId"></el-input>-->
            <el-select v-model="deviceFrom.farmId" placeholder="请选择">
              <el-option
                v-for="item in farmOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属产线：" prop="lineId">
            <!--<el-input v-model="deviceFrom.lineId"></el-input>-->
            <el-select v-model="deviceFrom.lineId" placeholder="请选择">
              <el-option
                v-for="item in lineOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="图片地址：">
            <el-input v-model="deviceFrom.photoUrl"></el-input>
          </el-form-item>-->
          <el-form-item label="负责工序：" prop="processId">
            <el-select v-model="deviceFrom.processId" placeholder="请选择">
              <el-option
                v-for="item in processOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="设备编码：">
            <el-select v-model="code" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="人员：" prop="userId">
            <el-select v-model="deviceFrom.userId" multiple placeholder="请选择">
              <el-option
                v-for="item in userOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="onSubmit('deviceFrom')"
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
import {
  deviceinsertDevice,
  getFarmSelectAll,
  getLineSelectAll,
  processgetPage,
  usergetAll,
} from "../../../api";
export default {
  data() {
    return {
      deviceFrom: {
        name: "",
        code: "",
        farmId: "",
        lineId: "",
        processId: "",
        userId: "",
      },
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入设备编码", trigger: "blur" }],
        farmId: [
          { required: true, message: "请选择所属车间", trigger: "change" },
        ],
        lineId: [
          { required: true, message: "请选择所属产线", trigger: "change" },
        ],
        processId: [
          { required: true, message: "请选择负责工序", trigger: "change" },
        ],
        userId: [{ required: true, message: "请选择人员", trigger: "blur" }],
      },

      lineOptions: [],
      farmOptions: [],
      processOptions: [],
      userOptions: [],
    };
  },
  created() {
    this.initLineSelect();
    this.initFarmSelect();
    this.initProcessSelect();
     this.initUserSelect();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    initUserSelect() {
      usergetAll({}).then((res) => {
        this.userOptions = res.data.data;
      });
    },
    initProcessSelect() {
      processgetPage({}).then((res) => {
        this.processOptions = res.data.data;
      });
    },
    initLineSelect() {
      getLineSelectAll({}).then((res) => {
        this.lineOptions = res.data.data;
      });
    },
    initFarmSelect() {
      getFarmSelectAll({}).then((res) => {
        this.farmOptions = res.data.data;
      });
    },
    onSubmit(deviceFrom) {
      // var userId = this.deviceFrom.userId.join(',')
      // console.log(userId)
      this.$refs[deviceFrom].validate((valid) => {
        if (valid) {
          deviceinsertDevice({
            name: this.deviceFrom.name,
            code: this.deviceFrom.code,
            farmId: this.deviceFrom.farmId,
            lineId: this.deviceFrom.lineId,
            userIds: this.deviceFrom.userId,
            processId: this.deviceFrom.processId,
          },{
        headers: {
        'Content-Type': 'application/json'
      }
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
