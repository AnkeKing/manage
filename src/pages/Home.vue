<template>
  <div class="box">
    <div class="back-box">
      <div class="top-content">
        <img src="../assets/img/yue.png" />
        <a>Management System</a>
        <img src="../assets/img/cancel.png"@click="cancel">
      </div>
      <div class="bottom-box">
        <div class="left-select-box">
          <Collapse accordion v-model="value3">
            <Panel :name="obj.order.toString()" v-for="(obj,index) in menus" :key="index">
              {{obj.authName}}
              <div
                slot="content"
                class="select-btn"
                :class="$route.name.indexOf(child.path)!=-1?'active':'default'"
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
          <div class="title-box" v-if="$route.name!=='default'">
           <router-link to="/default"tag="span">首页</router-link>
            <span v-for="t in $route.query.titleArr">{{t}}</span>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenus} from "../api/http";
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
      this.$router.replace({
        name: child.path,
        query: {
          titleArr: [parentTitle, child.authName]
        }
      });
    },
    cancel(){
      console.log("退出")
      this.$store.commit('setToken', "");
      localStorage.removeItem("vuex");
    }
  },
  created() {
    getMenus().then(res => {
      this.menus = res;
      console.log("菜单栏path",res)
    });
   
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/home.min");
</style>
