<template>
  <div>
    <el-page-header @back="goBack" content="新增"> </el-page-header>
    <div class="tray">
      <el-form
        ref="accFrom"
        :rules="rules"
        :model="accFrom"
        label-width="100px"
      >
        <el-form-item label="权限名称：" prop="label">
          <el-input v-model="accFrom.label"></el-input>
        </el-form-item>
        <el-form-item label="权限标识：" prop="code">
          <el-input v-model="accFrom.code"></el-input>
        </el-form-item>
        <el-form-item label="权限链接：" prop="url">
          <el-input v-model="accFrom.url"></el-input>
        </el-form-item>
        <el-form-item label="权限类型：" prop="type">
          <el-select v-model="accFrom.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级权限：" prop="parentId">
          <el-select v-model="accFrom.parentId" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit('accFrom')"
            >确认</el-button
          >
          <el-button size="small" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { accountInsert, accountgetAll } from "../../../api";
export default {
  data() {
    return {
      accFrom: {
        label: "",
        code: "",
        name: "",
        url: "",
        type: "",
        parentId: "",
      },
      options: [
        {
          id: 0,
          name: "菜单",
        },
        {
          id: 1,
          name: "按钮",
        },
      ],
      type: "",
      options2: [],
      parentId: "",
      rules: {
        label: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
        url: [{ required: true, message: "请输入权限链接", trigger: "blur" }],
        type: [{ required: true, message: "请选择权限类型", trigger: "change" }],
        parentId: [
          { required: true, message: "请选择上级权限", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getSelectData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getSelectData() {
      accountgetAll().then((res) => {
        this.options2 = res.data.data;
      });
    },
    onSubmit(accFrom) {
      this.$refs[accFrom].validate((valid) => {
        if (valid) {
          accountInsert({
            label: this.accFrom.label,
            code: this.accFrom.code,
            url: this.accFrom.url,
            type: this.accFrom.type,
            parentId: this.accFrom.parentId,
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
