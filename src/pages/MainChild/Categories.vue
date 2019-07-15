<template>
  <div class="box">
    <h1>商品分类</h1>
  </div>
</template>

<script>
import {getCategories} from '../../api/http';
export default {
  name: "Box",
  data() {
    return {};
  },
  created(){
    this.getCategories();
  },
  methods:{
    //商品分类列表
    getCategories(){
      getCategories().then(res=>{
        console.log("商品分类",res);
      })
    },
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
