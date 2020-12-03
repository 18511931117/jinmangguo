<template>
  <div class="login-container">
    <div class="login-warp">
      <div class="login-img login">
        <div class="icon-title"></div>
      </div>
      <div class="login-mian login">
        <div class="input-warp2">
          <el-form ref="form" :model="form" class="login-form">
            <h2 class="login-title">账号登录</h2>
            <el-form-item label="">
              <el-input prefix-icon="el-icon-user" v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input prefix-icon="el-icon-lock" show-password v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item class="el-top">
              <el-button type="primary" class="btn" @click="onSubmit">{{logintitle}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">管理系统</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{logintitle}}</el-button>
      </el-form-item>
    </el-form>-->
  </div>
</template>
  <script>
import { loginApi,getMenu } from "../../api";

import axios from "axios"
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      logintitle: "登录",
    };
  },

  methods: {
    onSubmit() {
      //  this.$http.post('api/permission/getMenu',this.form).then(res =>{
      //   console.log(res.data.data.menus)
      //   this.$store.commit('setMenu',res.data.data.menus)
      //   this.$store.commit("addMenu", this.$router);
      //   // this.$store.commit("setUserName",this.form.username)
      //   sessionStorage.setItem('userName',this.form.username)
      //   this.$router.push({
      //     name:'Index'
      //   })
      // })
      loginApi({
        username:this.form.username,
        password:this.form.password
      }).then(res => {
          
        if(res.data.status == 0){
           this.$store.commit("getUsername", this.form.username);
           getMenu().then(res =>{
             this.$store.commit("clearMenu");
            this.$store.commit('setMenu',res.data.data)
           // this.$store.commit("getUsername", this.form.username);
            //sessionStorage.setItem('userName',this.form.username);
            this.$store.commit("addMenu", this.$router);
          })
          this.$router.push({
            name:'Index'
          })
        }else{
           if(this.form.username == "" || this.form.password == ""){
            this.$message.error("请输入用户名或密码");
          }else{
              this.$message.error("用户名或密码错误");
          }
        }
      })
      
      }
    
     
  },
};
</script>

<style acoped>
/* .login-form {
  width: 350px;
  margin: 160px auto; 
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px; 
} */

/* 背景 */
.login-container {
  width: 100%;
  height: 100%;
  background: #e6e6e6;
  position: relative;
  /* position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../../assets/tu.png") no-repeat; */
}
.login-warp {
  width: 1000px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -500px;
  /* background: red; */
  display: flex;
}
.login {
  flex: 1;
 
}
.login-img {
  /* background: yellow; */
  background: url("../../assets/tu.png") no-repeat;
  /* width: 400px;
  height: 400px; */
  background-size: cover;
}
.icon-title{
  width: 290px;
  height: 170px;
  background: url("../../assets/t2.png") no-repeat;
  background-size: cover;
  margin: 90px auto 0;
  
}
.login-mian{
  background: #fff;
   display: flex;
  align-items: center;
  justify-content: center;
}
.input-warp2 {
  width: 300px;
  height: 300px;
  /* background: blue; */
}
.btn{
  width: 300px;
}
/* 标题 */
.login-title {
  color: #303133;
  font-size: 28px;
  font-weight: 400;
  position: relative;
  margin-bottom: 15px;
}
.login-title::before{
  content: ''; 
  position: absolute;
  top: 40px;
  width: 60px;
  height: 4px;
  background: #1890FF;

}
.el-top{
  margin-top: 60px;
}
</style> -->