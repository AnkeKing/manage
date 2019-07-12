<template>
  <div class="box">
    <div class="back-box">
      <div class="top-content">
        <img src="../assets/img/yue.png" />
        <a>Management System</a>
      </div>
      <div class="bottom-box">
        <div class="left-select-box">
          <Collapse accordion v-model="value3">
            <Panel :name="obj.order.toString()" v-for="(obj,index) in menus" :key="index">
              {{obj.authName}}{{obj.order}}
              <div
                slot="content"
                class="select-btn"
                :class="$route.name===child.path?'active':'default'"
                v-for="(child,index) in obj.children"
                @click="select(obj.authName,child)"
              >
                <img src="../assets/img/snow.png" />
                {{child.authName}}
              </div>
            </Panel>
          </Collapse>
        </div>
        <div class="right-content-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenus } from "../api/http";
export default {
  name: "Box",
  data() {
    return {
      value3: "1",
      menus: [],
      titleArr: []
    };
  },
  methods: {
    select(title, child) {
      this.titleArr = [title, child.authName];
      this.$router.replace({ name: child.path });
    }
  },
  created() {
    getMenus().then(res => {
      this.menus = res;
    });
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/home.min");
</style>
