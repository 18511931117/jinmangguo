<template>
  <div>
    <el-page-header @back="goBack" content="编辑"> </el-page-header>
    <div class="tray">
      <div>
        <el-form
          ref="groupFrom"
          :rules="rules"
          :model="groupFrom"
          label-width="100px"
        >
          <el-form-item label="所属车间：" prop="farmId">
            <!--<el-input v-model="groupFrom.farmId"></el-input>-->
            <el-select v-model="groupFrom.farmId" placeholder="请选择">
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
            <!--<el-input v-model="groupFrom.lineId"></el-input>-->
            <el-select v-model="groupFrom.lineId" placeholder="请选择">
              <el-option
                v-for="item in lineOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="人员：" prop="userId">
            <el-select v-model="groupFrom.userId" multiple placeholder="请选择">
              <el-option
                v-for="item in userOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班组名称：" prop="name">
            <el-input v-model="groupFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="班组编号：" prop="code">
            <el-input v-model="groupFrom.code"></el-input>
          </el-form-item>
          <!-- <el-form-item label="人员数量：" prop="personnelCount">
            <el-input v-model="groupFrom.personnelCount"></el-input>
          </el-form-item> -->
          <!--<el-form-item label="URL地址：">
            <el-input v-model="groupFrom.photoUrl"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="工序ID：" prop="processId">
            <el-input v-model="groupFrom.processId"></el-input>
          </el-form-item> -->

          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="onSubmit('groupFrom')"
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
  teamEdit,
  teamEditSubmit,
  teamEditgetDto,
  getLineSelectAll,
  getFarmSelectAll,
  usergetAll,
  updateTeam
} from "../../../api";
export default {
  data() {
    return {
      groupFrom: {
        name: "",
        code: "",
        farmId: "",
        lineId: "",
        processId: "",
        personnelCount: "",
      },
      rules: {
        name: [{ required: true, message: "请输入班组名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入班组编号", trigger: "blur" }],
        personnelCount: [
          { required: true, message: "请输入人员数量", trigger: "blur" },
        ],
        processId: [
          { required: true, message: "请输入工序Id", trigger: "blur" },
        ],
        farmId: [
          { required: true, message: "请选择所属车间", trigger: "change" },
        ],
        lineId: [
          { required: true, message: "请选择所属产线", trigger: "change" },
        ],
        userId: [
          { required: true, message: "请选择人员", trigger: "blur" },
        ],
      },
      options: [],
      lineOptions: [],
      farmOptions: [],
      userOptions:[],
      value: "",
    };
  },
  created() {
    this.initLineSelect();
    this.initFarmSelect();
    this.initUserSelect()
    this.getIdData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getIdData() {
      teamEditgetDto(this.$route.query.id).then((res) => {
        var userArr = res.data.data.userIds
        for(var i = 0;i<userArr.length;i++){
          userArr[i] = String(userArr[i])
        }
        this.groupFrom.name = res.data.data.name;
        this.groupFrom.code = res.data.data.code;
        this.groupFrom.farmId = String(res.data.data.farmId);
        this.groupFrom.lineId = String(res.data.data.lineId);
        this.groupFrom.userId = userArr
      });
    },
    initUserSelect() {
      usergetAll({}).then(res => {
        this.userOptions = res.data.data
      })
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
    onSubmit(groupFrom) {
      this.$refs[groupFrom].validate((valid) => {
        if (valid) {
          updateTeam({
            id: this.$route.query.id,
            name: this.groupFrom.name,
            code: this.groupFrom.code,
            farmId: this.groupFrom.farmId,
            lineId: this.groupFrom.lineId,
            userIds:this.groupFrom.userId,
          }).then((res) => {
            this.$message({
              message: "修改成功",
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
