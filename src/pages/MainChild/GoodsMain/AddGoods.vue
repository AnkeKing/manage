<template>
  <div class="box">
    <div class="title-box">
      <Card :bordered="false">
        <p>
          {{$route.query.btnType}}信息
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
              <Cascader :data="categories" @on-change="getCascaderValue" change-on-select></Cascader>
            </div>
          </TabPane>
          <TabPane :label="stepArr[1].title" class="center-box">
            <Input v-model="params" placeholder="params" clearable style="width: 75%" />
          </TabPane>
          <TabPane :label="stepArr[2].title" class="center-box">
            <Input v-model="attr" placeholder="attrs" clearable style="width: 75%" />
          </TabPane>
          <TabPane :label="stepArr[3].title" class="center-box">
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url" />
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              :headers="headers"
              type="drag"
              action="http://localhost:8888/api/private/v1/upload"
              style="display: inline-block;width:90px;"
            >
              <div style="width: 90px;height:90px;line-height: 90px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              />
            </Modal>
          </TabPane>
          <TabPane :label="stepArr[4].title" class="center-box">
            <Button type="success" class="add-btn" @click="toAddGoods">{{$route.query.btnType}}</Button>
            <div class="edit_container">
              <quill-editor
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
              ></quill-editor>
            </div>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { addGoods, editGoods} from "../../../api/http";
export default {
  name: "Box",
  data() {
    return {
      editorOption: {},
      name: "",
      price: "",
      weight: "",
      count: "",
      classify: "",
      introduce: "",
      pics: [],
      attr: "",
      attrs: [],
      params: "",
      imgUrls: [],
      current: 0,
      categories: [],
      upload_data: {},
      goods_query: {},
      headers: { Authorization: "" },
      stepArr: [
        { title: "基本信息" },
        { title: "商品参数" },
        { title: "商品属性" },
        { title: "商品图片" },
        { title: "商品内容" }
      ],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  created() {
    if (this.$store.state.token) {
      this.headers.Authorization = this.$store.state.token;
    }
    this.getCategories();
    this.goods_query = this.$route.query.goods_data;
    if (this.goods_query) {
      this.name = this.goods_query.goods_name;
      this.count = this.goods_query.goods_number;
      this.price = this.goods_query.goods_price;
      this.weight = this.goods_query.goods_weight;
    }
  },
  methods: {
    next(name) {
      if (name !== 0 && this.classify.length <= 0) {
        this.$Message.error("请选择商品的三级分类");
      }
      this.current = name;
    },
    addGoods() {
      addGoods({
        goods_name: this.name,
        goods_cat: this.classify,
        goods_price: this.price,
        goods_number: this.count,
        goods_weight: this.weight,
        goods_introduce: this.introduce,
        pics: this.pics,
        attrs: this.attrs
      });
    },
    editGoods() {
      editGoods({
        id: this.goods_query.goods_id,
        goods_cat: this.classify,
        goods_name: this.name,
        goods_price: this.price,
        goods_number: this.count,
        goods_weight: this.weight,
        goods_introduce: this.introduce,
        pics: this.pics,
        attrs: this.attrs
      });
    },
    //商品分类列表
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
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      let {
        data: { tmp_path, url },
        msg
      } = res;
      file.url = url;
      file.name = tmp_path;
      this.pics.push({pic:tmp_path})
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    removeImg(index) {
      this.imgUrls.splice(index, 1);
    },
    onEditorChange(val) {
      this.introduce = val.text;
    },
    toAddGoods() {
      if (this.$route.query.btnType == "添加商品") {
        this.addGoods();
      } else {
        this.editGoods();
      }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },

  components: {
    quillEditor
  }
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
  .center-box {
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-of-type(5) {
      flex-direction: column;
    }
  }
  .add-btn {
    margin-bottom: 20px;
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

.ivu-input-wrapper {
  width: 100%;
  float: right;
}
.ivu-cascader {
  width: 75%;
}

.ivu-upload-drag {
  width: 90px;
}

.demo-upload-list {
  display: inline-block;
  width: 90px;
  height: 90px;
  text-align: center;
  line-height: 90px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
