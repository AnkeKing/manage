<template>
  <div class="box">
    <div class="title-box">
      <Card :bordered="false">
        <p>
          添加商品信息
          <Icon type="md-flower" size="17" />
        </p>
      </Card>
    </div>
    <Steps :current="current">
      <Step :title="s.title" v-for="(s,index) in stepArr" :key="index"></Step>
    </Steps>
    <Row :gutter="77">
      <Col span="12" class="demo-tabs-style1">
        <Tabs type="card" @on-click="next">
          <TabPane :label="stepArr[0].title">
            <div class="input-box">
              <a>商品名称</a>
              <Input v-model="name" placeholder="Enter name..." clearable style="width:75%" />
            </div>
            <div class="input-box">
              <a>商品价格</a>
              <Input v-model="price" placeholder="Enter price..." clearable style="width:75%" />
            </div>
            <div class="input-box">
              <a>商品重量</a>
              <Input v-model="weight" placeholder="Enter weight..." clearable style="width:75%" />
            </div>
            <div class="input-box">
              <a>商品数量</a>
              <Input v-model="count" placeholder="Enter count..." clearable style="width:75%" />
            </div>
            <div class="input-box">
              <a>商品分类</a>
              <Cascader :data="categories" style="75%" change-on-select></Cascader>
            </div>
          </TabPane>
          <TabPane :label="stepArr[1].title">
            <Input v-model="name" placeholder="name" clearable style="width: 75%" />
          </TabPane>
          <TabPane :label="stepArr[2].title"></TabPane>
          <TabPane :label="stepArr[3].title"></TabPane>
          <TabPane :label="stepArr[4].title"></TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
import {addGoods,getCategories} from '../../../api/http';
export default {
  name: "Box",
  data() {
    return {
      name: "",
      price: "",
      weight: "",
      count: "",
      classify: "",
      introduce:"",
      pics:"",
      attrs:"",
      current: 0,
      categories:[],
      stepArr: [
        { title: "基本信息" },
        { title: "商品参数" },
        { title: "商品属性" },
        { title: "商品图片" },
        { title: "商品内容" }
      ],
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created(){
    this.getCategories();
  },
  methods: {
    next(name) {
      console.log("index", name);
      this.current = name;
    },
    addGoods() {
      addGoods({
        goods_name: this.name,
        goods_cat: this.introduce,
        goods_price: this.price,
        goods_number: this.count,
        goods_weight: this.weight,
        goods_introduce: this.introduce,
        pics: this.pics,
        attrs: this.attrs
      }).then(res=>{
        console.log("添加商品",res);
      });
    },
    //商品分类列表
    getCategories(){
      getCategories().then(res=>{
        console.log("商品分类",res);
        this.categories=res;
      })
    },
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title-box {
    background: #eee;
    padding: 10px;
    width: 100%;
    p {
      font-size: 13px;
      font-weight: bold;
      color: rgba(164, 84, 110, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .input-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 150px 15px 150px;
  }
}
</style>
<style>
.ivu-card-body {
  padding: 10px;
}
.ivu-col-span-12 {
  display: block;
  width: 100%;
}
.ivu-row {
  width: 100%;
}
.demo-tabs-style1 {
  background: #eee;
  padding: 16px;
}
.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  margin-top: -16px;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.ivu-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
}
.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #dcdee2;
  color: rgba(164, 84, 110, 0.7);
}
.ivu-input-wrapper {
  width: 100%;
  float: right;
}
</style>
