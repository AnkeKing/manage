<template>
  <div class="box">
    <Table :columns="columns1" :data="rights":stripe="true" height="422"></Table>
  </div>
</template>

<script>
import { getRights } from "../../api/http";
export default {
  name: "Box",
  data() {
    return {
      rights: [],
      columns1: [
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "权限名称",
          key: "authName"
        },
        {
          title: "路径",
          key: "path"
        },
        {
          title: "层级",
          key: "tier"
        }
      ]
    };
  },
  created() {
    this.getRights();
  },
  methods: {
    //获取所有权限列表
    getRights() {
      var that = this;
      getRights({
        type: "tree"
      }).then(res => {
        var rights = [];
        var parentArr = [];
        var childArr = [];
        var grandSonArr = [];
        for (var r in res) {
          var parent = res[r];
          parent.tier = "一级";
          parentArr.push(parent);
          for (var c in parent.children) {
            var child = parent.children[c];
            child.tier = "二级";
            childArr.push(child);
            for (var s in child.children) {
              var grandSon = child.children[s];
              grandSon.tier = "三级";
              grandSonArr.push(grandSon);
            }
          }
        }
        this.rights = parentArr.concat(childArr, grandSonArr);
        console.log("所有权限", rights);
      });
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
