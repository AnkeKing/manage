<template>
  <div class="shade" v-show="loading">
    <img src="../assets/img/floor.png">
    <img src="../assets/img/floor.png">
    <img src="../assets/img/floor.png">
    <img src="../assets/img/floor.png">
    <img src="../assets/img/floor.png">
    <img src="../assets/img/floor.png">
    <img src="../assets/img/floor.png">
  </div>
</template>

<script>
export default {
  name: "Shade",
  data() {
    return {

    };
  },
  computed:{
    loading(){
      return this.$store.state.loading;
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.shade {
  /* 数据加载完成之前的遮罩动画 */
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  background-image: url("../assets/img/bk.jpg");
  background-size: cover;
  opacity: 0.7;
  > img {
    position: absolute;
    animation: floor 3s linear infinite;
    &:nth-of-type(1){
      width: 50px;
      left: 20%;
      top: 33%;
    }
    &:nth-of-type(2){
      width: 60px;
      left: 70%;
      top: 63%;
    }
    &:nth-of-type(3){
      width: 56px;
      left: 29%;
      top: 53%;
    }
    &:nth-of-type(4){
      width: 50px;
      left: 80%;
      top: 43%;
    }
    &:nth-of-type(5){
      width: 60px;
      left: 10%;
      top: 33%;
    }
    &:nth-of-type(6){
      width: 60px;
      left: 80%;
      top: 43%;
    }
    &:nth-of-type(7){
      width: 80px;
      left: 50%;
      top: 73%;
    }
  }
}

@keyframes floor {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
