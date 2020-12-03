<template>
  <div class="warp">
    <el-page-header @back="goBack" content="编辑"> </el-page-header>
    <div class="tray">
      <el-form
        ref="roleFrom"
        :rules="rules"
        :model="roleFrom"
        label-width="100px"
      >
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="roleFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="textarea">
          <el-input type="textarea" v-model="roleFrom.textarea"></el-input>
        </el-form-item>
        <el-form-item label="角色管理：" prop="menuIds">
          <el-tree
            :data="data"
            show-checkbox
            v-model="roleFrom.menuIds"
            :default-expand-all="defaultIsall"
            node-key="id"
            check-strictly
            ref="tree"
            highlight-current
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit('roleFrom')"
            >确认</el-button
          >
          <el-button size="small" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { roleEdit, roleEditSubmit, getTree } from "../../../api";
export default {
  data() {
    return {
      roleFrom: {
        name: "",
        textarea: "",
      },
      defaultIsall: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeId: "",
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        textarea: [{ required: true, message: "请输入描述", trigger: "blur" }],
        
      },
    };
  },
  created() {
    this.getIdData();
    this.getTreeData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getTreeData() {
      getTree().then((res) => {
       
        this.data = res.data.data;
      });
    },
    getIdData() {
      roleEdit(this.$route.query.id).then((res) => {
      
        (this.roleFrom.name = res.data.data.name),
          (this.roleFrom.textarea = res.data.data.describe);
        this.treeId = res.data.data.powers;
        var treeIdArr = this.treeId.split(",");
     
        setTimeout(() => {
          this.$refs.tree.setCheckedKeys(treeIdArr, false, true);
          //  this.$refs.tree.getHalfCheckedKeys(menuListId)
        }, 100);
      });
    },
    onSubmit(roleFrom) {
      var menuts = this.$refs.tree.getCheckedKeys();
      let hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      //var newArr = menuts.concat(hafCheckedKeys)
      var menutsArr = [];
      for (var i = 0; i < menuts.length; i++) {
        menutsArr.push({
          id: menuts[i],
        });
      }
      this.$refs[roleFrom].validate((valid) => {
        if (valid) {
          roleEditSubmit({
            id: this.$route.query.id,
            name: this.roleFrom.name,
            describe: this.roleFrom.textarea,
            powerList: menutsArr,
          }).then((res) => {
            this.$message({
              message: "修改成功",
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