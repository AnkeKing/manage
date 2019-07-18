
<template>
  <div class="tree">
    <Tag
      :name="a"
      color="rgb(102, 143, 108)"
      closable
      @on-close="handleDelete"
      v-for="a in attrArr"
      v-if="row.attr_vals!=''"
      :key="a"
    >{{ a }}</Tag>
    <Button
      icon="ios-add"
      type="dashed"
      size="small"
      @click="writeBool=true"
      v-show="!writeBool"
    >New Tag</Button>
    <input
      type="text"
      v-show="writeBool"
      placeholder="tag-content"
      v-model="addValue"
      @keyup.enter="handleAdd"
    />
  </div>
</template>
<script>
import { editAttributes } from "../api/http";
export default {
  name: "Tree",
  data() {
    return {
      attrArr: "",
      writeBool: false,
      addValue: ""
    };
  },
  props: {
    row: Object
  },
  methods: {
    editAttributes(newArr) {
      editAttributes({
        id: this.row.cat_id,
        attrId: this.row.attr_id,
        attr_name: this.row.attr_name,
        attr_sel: "many",
        attr_vals: newArr
      }).then(res => {
        this.$emit("getVal", "更新");
      });
    },
    handleDelete(event, name) {
      for (var n in this.attrArr) {
        if (this.attrArr[n] === name) {
          this.attrArr.splice(n, 1);
        }
      }
      this.editAttributes(this.attrArr.join(","));
    },
    handleAdd() {
      if (this.addValue.trim() != "") {
        this.attrArr.push(this.addValue);
        this.editAttributes(this.attrArr.join(","));
      } else {
        this.$Message.error("参数不能为空!");
      }
    },
    returnNewArr() {
      return this.row.attr_vals.split(",").filter((v, i, a) => {
        return v != "";
      });
    }
  },
  created() {
    this.attrArr = this.returnNewArr();
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
  .none {
    display: flex;
    justify-content: center;
    color: rgb(102, 143, 108);
    font-weight: bold;
  }
}
</style>