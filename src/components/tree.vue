
<template>
  <div class="tree">
    <ul class="parent-ul"v-if="row.children.length>0">
      <li v-for="(parent,index) in row.children" :key="index">
        <Tag
          :name="parent.id"
          color="rgb(102, 143, 108)"
          closable
          @on-close="deleteRoleRights"
        >{{ parent.authName }}</Tag>
        <Icon type="md-arrow-dropdown" size="19" />
        <ul class="child-ul">
          <li v-for="(child,index) in parent.children" :key="index">
            <Tag
              :name="child.id"
              color="rgb(96, 133, 174)"
              closable
              @on-close="deleteRoleRights"
            >{{ child.authName }}</Tag>
            <Icon type="md-arrow-dropdown" size="19" />
            <ul class="grandSon-ul">
              <li v-for="(grandSon,index) in child.children" :key="index">
                <Tag
                  :name="grandSon.id"
                  color="rgb(179, 131, 172)"
                  closable
                  @on-close="deleteRoleRights"
                >{{ grandSon.authName }}</Tag>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <span class="none"v-else>暂无权限</span>
  </div>
</template>
<script>
import {deleteRoleRights } from "../api/http";
export default {
  name: "Tree",
  props: {
    row: Object
  },
  methods: {
    deleteRoleRights(event, name) {
      deleteRoleRights({
        roleId: this.row.id,
        rightId: name
      }).then(res => {
        console.log("删除指定权限", res);
        this.$emit("getVal", "啦啦啦啦");
      });
    }
  }
};
</script>
<style  rel='stylesheet/scss' lang='scss' scoped>
.tree {
  text-align: left;
  .parent-ul {
    margin-left: 20px;
    .child-ul {
      margin-left: 40px;
      .grandSon-ul {
        margin-left: 60px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  .none{
      display: flex;
      justify-content: center;
      color:rgb(102, 143, 108);
      font-weight: bold; 
  }
}
</style>