<template>
  <div class="params-box">
    <Alert type="warning" show-icon>注意:只允许为第三级分类设置参数</Alert>
    <div class="classify-box">
      <a>请选择商品分类</a>
      <Cascader
        :data="categories"
        @on-visible-change="getParams"
        @on-change="getCascaderValue"
        change-on-select
      ></Cascader>
    </div>
    <Tabs value="name1">
      <TabPane label="动态参数" name="name1">
        <div class="center-box">
          <Button type="success":disabled="cat_id===0?true:false" class="add-btn" @click="showModal('添加动态参数')">添加动态参数</Button>
          <Table :columns="columns1" height="350" :data="queryParams"></Table>
        </div>
      </TabPane>
      <TabPane label="静态参数" name="name2">
        <div class="center-box">
          <Button type="success":disabled="cat_id===0?true:false" class="add-btn"@click="showModal('添加静态参数')">添加静态参数</Button>
          <Table :columns="columns2" height="350" :data="goodsParams"></Table>
        </div>
      </TabPane>
    </Tabs>
    <Modal v-model="modal1" :title="addType" @on-ok="toAddAttribute">
      <div class="add-box">
        <p>参数名称:</p>
        <Input placeholder="classifyName" v-model="attr_name" />
      </div>
      <div class="add-box"v-if="addType==='添加动态参数'">
        <p>参数值:</p>
        <Input placeholder="多个参数值以逗号分隔" v-model="attr_vals" />
      </div>
      <div class="add-box"v-else>
        <p>参数值:</p>
        <Input placeholder="attr_vals" v-model="attr_vals" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { editAttributes, addAttributes } from "../../api/http";
import tag from "../../components/tag";
export default {
  name: "Params-box",
  data() {
    return {
      categories: [],
      classify: "",
      cat_id: 0,
      modal1: false,
      attr_name: "",
      attr_vals: "",
      addType:"",
      goodsParams: [],
      queryParams: [],
      columns1: [
        {
          title: "",
          type: "expand",
          width: 30,
          render: (h, params) => {
            return h(tag, {
              props: {
                row: params.row
              },
              on: {
                getVal: val => {
                  this.updateAttributes();
                }
              }
            });
          }
        },
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "属性名称",
          key: "attr_name"
        },
        {
          title: "操作",
          width: 100,
          render: (h, params) => {
            return h("ButtonGroup", [
              //编辑
              h("Button", {
                props: {
                  // type: "error",
                  size: "small",
                  shape: "circle",
                  icon: "md-create"
                },
                style: {
                  width: "20px",
                  height: "20px",
                  background: "#6085AE",
                  color: "#fff"
                },
                on: {
                  click: () => {
                    let email = params.row.email;
                    let mobile = params.row.mobile;
                    this.$Modal.confirm({
                      render: h => {
                        return h("div", [
                          h(
                            "div",
                            {
                              class: "top-div",
                              style: {
                                fontWeight: "bold"
                              }
                            },
                            [
                              h(
                                "a",
                                {
                                  style: {
                                    fontSize: "18px"
                                  }
                                },
                                "编辑用户"
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "用户名 :"),
                              h("Input", {
                                props: {
                                  value: params.row.username,
                                  autofocus: true,
                                  disabled: true
                                }
                              })
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "邮箱 :"),
                              h("Input", {
                                props: {
                                  value: params.row.email,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    email = val;
                                  }
                                }
                              })
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "电话 :"),
                              h("Input", {
                                props: {
                                  value: params.row.mobile,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    mobile = val;
                                  }
                                }
                              })
                            ]
                          )
                        ]);
                      },
                      onOk: () => {
                        editUser({
                          id: params.row.id,
                          email: email,
                          mobile: mobile
                        }).then(res => {
                          this.getUsers(this.pageNum, this.pageSize);
                        });
                      },
                      onCancel: () => {}
                    });
                  }
                }
              }),
              //删除
              h("Button", {
                props: {
                  // type: "error",
                  size: "small",
                  shape: "circle",
                  icon: "md-trash"
                },
                style: {
                  width: "20px",
                  height: "20px",
                  background: "#B383AC",
                  color: "#fff"
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                    console.log("this", params);
                    this.$Modal.confirm({
                      title: "提示",
                      content: "<p>此操作将永久删除该参数，是否继续？</p>",
                      okText: "OK",
                      cancelText: "Cancel",
                      onOk: () => {
                        deleteUser({
                          id: params.row.id
                        }).then(res => {
                          this.getUsers(this.pageNum, this.pageSize);
                        });
                      }
                    });
                  }
                }
              })
            ]);
          }
        }
      ],
      columns2: [
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "属性名称",
          key: "attr_name"
        },
        {
          title: "属性值",
          key: "attr_vals"
        },
        {
          title: "操作",
          width: 100,
          render: (h, params) => {
            return h("ButtonGroup", [
              //编辑
              h("Button", {
                props: {
                  // type: "error",
                  size: "small",
                  shape: "circle",
                  icon: "md-create"
                },
                style: {
                  width: "20px",
                  height: "20px",
                  background: "#6085AE",
                  color: "#fff"
                },
                on: {
                  click: () => {
                    let email = params.row.email;
                    let mobile = params.row.mobile;
                    this.$Modal.confirm({
                      render: h => {
                        return h("div", [
                          h(
                            "div",
                            {
                              class: "top-div",
                              style: {
                                fontWeight: "bold"
                              }
                            },
                            [
                              h(
                                "a",
                                {
                                  style: {
                                    fontSize: "18px"
                                  }
                                },
                                "编辑用户"
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "用户名 :"),
                              h("Input", {
                                props: {
                                  value: params.row.username,
                                  autofocus: true,
                                  disabled: true
                                }
                              })
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "邮箱 :"),
                              h("Input", {
                                props: {
                                  value: params.row.email,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    email = val;
                                  }
                                }
                              })
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "电话 :"),
                              h("Input", {
                                props: {
                                  value: params.row.mobile,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    mobile = val;
                                  }
                                }
                              })
                            ]
                          )
                        ]);
                      },
                      onOk: () => {
                        editUser({
                          id: params.row.id,
                          email: email,
                          mobile: mobile
                        }).then(res => {
                          this.getUsers(this.pageNum, this.pageSize);
                        });
                      },
                      onCancel: () => {}
                    });
                  }
                }
              }),
              //删除
              h("Button", {
                props: {
                  // type: "error",
                  size: "small",
                  shape: "circle",
                  icon: "md-trash"
                },
                style: {
                  width: "20px",
                  height: "20px",
                  background: "#B383AC",
                  color: "#fff"
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                    console.log("this", params);
                    this.$Modal.confirm({
                      title: "提示",
                      content: "<p>此操作将永久删除该属性，是否继续？</p>",
                      okText: "OK",
                      cancelText: "Cancel",
                      onOk: () => {
                        deleteUser({
                          id: params.row.id
                        }).then(res => {
                          this.getUsers(this.pageNum, this.pageSize);
                        });
                      }
                    });
                  }
                }
              })
            ]);
          }
        }
      ]
    };
  },
  async created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$store.dispatch("getCategories", { type: 3 }).then(res => {
        this.categories = res;
      });
    },
    //获取并处理多级联动选择的值
    getCascaderValue(value, selectedData) {
      // console.log("响应值", selectedData);
      this.cat_id = selectedData[selectedData.length - 1].cat_id;
      this.classify = this.$store.getters.classifyArr(selectedData);
    },
    getParams(bool) {
      if (!bool) {
        this.updateAttributes();
      }
    },
    async updateAttributes() {
      this.goodsParams = await this.$store.dispatch("getCategoriesById", {
        id: this.cat_id,
        sel: "only"
      });
      this.queryParams = await this.$store.dispatch("queryParams", {
        sel: "many",
        id: this.cat_id
      });
    },
    toAddAttribute() {
      var that=this;
      if (this.addType === "添加动态参数") {
        addAttributes({
          id: this.cat_id,
          attr_name: this.attr_name,
          attr_sel: "many",
          attr_vals: this.attr_vals
        }).then(res => {
          that.updateAttributes();
        });
      } else {
        addAttributes({
          id: this.cat_id,
          attr_name: this.attr_name,
          attr_sel: "only",
          attr_vals: this.attr_vals
        }).then(res => {
          that.updateAttributes();
        });
      }
    },
    showModal(type){
      this.modal1=true;
      this.addType=type;
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.params-box {
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
  .center-box {
    width: 700px;
    height: 377px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .add-btn {
    margin: 0 auto;
    width: 100px;
    margin-bottom: 5px;
  }
}
</style>
<style>
.params-box .ivu-input-wrapper {
  width: 270px;
  margin-left: 20px;
}
.params-box .ivu-tabs-tabpane {
  display: flex;
  justify-content: center;
}
.params-box .ivu-tag-text {
  color: #fff;
}
.params-box .ivu-icon-ios-close:before {
  color: #fff;
}
</style>