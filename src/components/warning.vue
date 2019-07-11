<template>
  <div class="box"v-show="$store.state.warnBool">
    <div class="warn-box">
        {{$store.state.warnText}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {};
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 99;
  .warn-box {
    padding: 15px 27px 15px 27px;
    border-radius: 10px;
    color: #ffffff;
    font-size: 17px;
    font-weight: bold;
    background: rgba(0, 0, 0,0.7);
    animation: hidden 2s linear;
  }
}
@keyframes hidden {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>
