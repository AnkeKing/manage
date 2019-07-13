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
          <div class="title-box" v-if="$route.name!='default'">
            <span v-for="t in $route.query.titleArr">{{t}}</span>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenus,addUser } from "../api/http";
export default {
  name: "Box",
  data() {
    return {
      value3: "1",
      menus: []
    };
  },
  methods: {
    select(parentTitle, child) {
      console.log("query", this.$route.query.titleArr);
      this.$router.replace({
        name: child.path,
        query: {
          titleArr: ["首页", parentTitle, child.authName]
        }
      });
    }
  },
  created() {
    getMenus().then(res => {
      this.menus = res;
    });
    addUser({
      username: "admin",
      password: "123456",
      email: "123456",
      mobile: "56789"
    }).then(res => {
      console.log("添加用户", res);
    });
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/home.min");
</style>
