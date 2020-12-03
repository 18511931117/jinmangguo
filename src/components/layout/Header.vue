<template>
   <div class="header-warp">
    <div class="icon" @click="toggleSidebar">
      <i :class="{'el-icon-s-fold':isIcon,'el-icon-s-unfold':!isIcon}"></i>
    </div>
    <div class="centent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'Index' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>首页</el-breadcrumb-item> -->
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-left">
      <div class="user">
        欢迎您:
        <span>{{username}}</span>
      </div>
      <div class="logout" @click="logout">
        <i class="out"></i>
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      username:''
    }
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.isCollapse,
      isIcon: (state) => state.isIcon,
      current: (state) => state.currentMenu,
    })
  },
  created(){
    this.username = localStorage.getItem('username')
  },
  methods: {
    toggleSidebar () {
      this.$store.commit('isUnfold')
    },
    logout () {
      this.$router.push({
        name:'login'
      })
      this.$store.commit('clearMenu')
      this.$store.commit('clearUsername')
      location.reload()
    }
  }
}
</script>

<style>
.header-warp {
  display: flex;
  justify-content: space-between;
}
.icon {
  font-size: 20px;
  width: 50px;
}
.user-left {
  width: 220px;
  display: flex;
}

.centent {
  flex: 1;
  display: flex;
  align-items: center;
}
.user {
  width: 150px;
  text-align: center;
}
.logout {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.user span {
  color: #000;
  font-size: 16px;
}
.out{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../../assets/out2.png") no-repeat;
  vertical-align: sub;
  background-size: cover;
}
</style>
