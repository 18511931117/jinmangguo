<template>
  <div>
    <el-page-header @back="goBack" content="编辑"> </el-page-header>
    <div class="tray">
      <el-form
        ref="userFrom"
        :rules="rules"
        :model="userFrom"
        label-width="100px"
      >
        <el-form-item label="登录账号：" prop="loginname">
          <el-input v-model="userFrom.loginname"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" prop="name">
          <el-input v-model="userFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" >
          <el-input v-model="userFrom.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="部门ID：" prop="orgId">
          <el-select v-model="userFrom.orgId" placeholder="请选择">
            <el-option
              v-for="item in org"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色ID：" prop="roleId">
          <el-select v-model="userFrom.roleId" placeholder="请选择">
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit('userFrom')"
            >确认</el-button
          >
          <el-button size="small" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userEdit, userEditSubmit, orggetAll, rolegetAll } from "../../../api";
export default {
  data() {
    return {
      userFrom: {
        loginname: "",
        name: "",
        password: "",
        orgId: "",
        roleId: "",
      },
      org: [],
      role: [],
      rules: {
        loginname: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        orgId: [{ required: true, message: "请选择部门ID", trigger: "change" }],
        roleId: [
          { required: true, message: "请选择角色Id", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getIdData();
    this.initOrgSelect();
    this.initRoleSelect();
  },
  methods: {
    initOrgSelect() {
      orggetAll({}).then((res) => {
        this.org = res.data.data;
      });
    },
    initRoleSelect() {
      rolegetAll({}).then((res) => {
        this.role = res.data.data;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    getIdData() {
      userEdit(this.$route.query.id).then((res) => {
        this.userFrom.loginname = res.data.data.loginname;
        this.userFrom.name = res.data.data.name;
        this.userFrom.password = res.data.data.password;
        this.userFrom.orgId = String(res.data.data.orgId);
        this.userFrom.roleId = String(res.data.data.roleId);
      });
    },
    onSubmit(userFrom) {
      this.$refs[userFrom].validate((valid) => {
        if (valid) {
          userEditSubmit({
            id: this.$route.query.id,
            loginname: this.userFrom.loginname,
            name: this.userFrom.name,
            password: this.userFrom.password,
            orgId: this.userFrom.orgId,
            roleId: this.userFrom.roleId,
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
</style>
