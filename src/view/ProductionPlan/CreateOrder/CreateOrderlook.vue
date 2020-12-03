<template>
  <div class="warp">
    <span>{{id}}</span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      id:''
    }
  },
  created(){
    this.id = this.$route.params.id
  }
}
</script>

<style>

</style>