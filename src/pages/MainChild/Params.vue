<template>
  <div class="box">
    <Alert type="warning" show-icon>注意:只允许为第三级分类设置参数</Alert>
    <div class="classify-box">
      <a>请选择商品分类</a>
      <Cascader :data="categories" @on-change="getCascaderValue" change-on-select></Cascader>
    </div>
    <Tabs value="name1">
      <TabPane label="动态参数" name="name1">
        <!-- <Table :columns="columns1" :data="users_list"></Table> -->
      </TabPane>
      <TabPane label="静态参数" name="name2">标签二的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import { } from "../../api/http";
export default {
  name: "Box",
  data() {
    return {
      categories: [],
      classify: ""
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories(){
      this.$store.dispatch("getCategories").then(res=>{
        this.categories=res;
      })
    },
    //获取并处理多级联动选择的值
    getCascaderValue(value, selectedData) {
      // console.log("响应值", selectedData);
      this.classify =this.$store.getters.classifyArr(selectedData);
    },
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  .classify-box {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-size: 13px;
    }
  }
  .ivu-tabs {
    background: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>
<style>
.ivu-input-wrapper {
  width: 270px;
  margin-left: 20px;
}
</style>