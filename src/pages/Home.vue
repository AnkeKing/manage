<template>
  <div class="box">
    <div class="back-box">
      <div class="top-content">
        <img src="../assets/img/yue.png"/>
        <a>Management System</a>
      </div>
      <div class="bottom-box">
        <div class="left-select-box">
        <Collapse accordion v-model="value3">
            <Panel :name="obj.name"v-for="(obj,index) in table":key="index">
              {{obj.title}}
              <div slot="content"class="select-btn"v-for="child in obj.childrens"@click="select(obj.title,child)">
                 <img src="../assets/img/snow.png"/>{{child}}
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
export default {
  name: "Box",
  data() {
    return {
      value3: "1",
      value4: "1-1",
      table:[
        {"name":"1","title":"用户管理","childrens":["用户列表"]},
        {"name":"2","title":"权限管理","childrens":["角色列表","权限列表"]},
        {"name":"3","title":"商品管理","childrens":["商品列表","分类列表","商品分类"]},
        {"name":"4","title":"订单管理","childrens":["订单列表"]},
        {"name":"5","title":"数据统计","childrens":["数据报表"]}
      ],
      titleArr:[]
    };
  },
  methods:{
    select(title,child){
      this.titleArr=[title,child];
      for(var t in this.table){
        for(var c in this.table[t].childrens){
          if(this.table[t].childrens[c]===child){
            console.log("???",child)
          }
        }
      }
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/home.min");
</style>
