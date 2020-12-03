<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
.el-container{
  height: 100%;
}

.el-pagination{
  padding: 0;
}
.el-table__header tr th{
  color: #000;
  font-weight: 600;
}

/* 滚动条样式 */

.el-aside::-webkit-scrollbar{
  display:none;
}

/* .el-button--primary{
  background: #E85F49!important;
  border-color:#E85F49!important;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #EC7865!important;
    border-color: #EC7865!important;
    color: #FFF;
} */
/* .el-button--text span{
  color: #EC7865!important;
} */
.el-menu{
  border: none;
}
.el-page-header__left{
  margin-left: 30px;
}
.el-form{
  padding: 1px;
}

 .el-menu-item.is-active {
  background: #1890FF !important;
}
 .el-submenu__title.is-active {
  background: #1890FF !important;
}

.el-submenu__title:hover{
  background-color: #1890FF !important;
}
.el-menu-item:hover{
  background-color:#1890FF!important;
}
.horizontal-collapse-transition { 
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out; 
    } 
.edit_input{
  width: 40%;
}
.warp{
  padding: 24px 30px;
}
.el-page-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
}
.el-page-header__content{
  font-size: 16px;
}

.timeline{
  width: 80%;
}
.el-timeline-item__tail{
  position: absolute;
    left: 4px;
    height: 100%;
    border-left: 2px solid #1890FF;
}
.el-dialog__header {

    border-bottom: 1px solid #e6e6e6;
}
.vxe-radio{
  margin-left: 10px;
  margin-top: 10px;
}

@media print {
  .code{
    position: relative;
    top: 40px;
  }
  .code2{
    position: relative;
    top: 0;
  }
  .code-warp{
  padding-top: 30px;
}
  .code_content2{
    padding: 0 15px;
  }
  .code1{
    position: relative;
    top: 10px;
  }

  .left_user_info1 ul li{
    padding-left: 10px;
  }
  .QRcode1{
    padding-right: 10px;
  }
 
}
</style>
