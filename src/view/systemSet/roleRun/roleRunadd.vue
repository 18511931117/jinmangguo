<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>

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
import { roleInsert, getTree } from "../../../api";
export default {
  data() {
    return {
      roleFrom: {
        name: "",
        textarea: "",
        menuIds: "",
      },
      powerList: [],
      defaultIsall: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        textarea: [{ required: true, message: "请输入描述", trigger: "blur" }],
        
      },
    };
  },
  created() {
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
          roleInsert(
            {
              name: this.roleFrom.name,
              describe: this.roleFrom.textarea,
              powerList: menutsArr,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((res) => {
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

      // this.$router.go(-1);
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