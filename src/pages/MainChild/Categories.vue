<template>
  <div class="box">
    <Button type="success" class="add-btn" @click="showModal">添加分类</Button>
    <Modal v-model="modal1" title="添加角色" @on-ok="toAddCategories">
      <div class="add-box">
        <p>分类名称:</p>
        <Input placeholder="classifyName" v-model="classifyName" />
      </div>
      <div class="add-box">
        <p>分类:</p>
        <Cascader :data="categories" @on-change="getCascaderValue" change-on-select></Cascader>
      </div>
    </Modal>
    <Table :columns="columns1" height="322" :data="categories"></Table>
    <!-- <div class="page-box">
      <Page
        :total="users_data.total"
        :page-size="pageSize"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        :page-size-opts="opts"
        show-total
        show-elevator
        show-sizer
      />
    </div>-->
  </div>
</template>

<script>
import { getCategories,addCategories } from "../../api/http";
window.selfs = {};
export default {
  name: "Box",
  data() {
    return {
      categories: [],
      modal1:false,
      classify:"",
      classifyName:"",
      columns1: [
        {
          width: 30,
          type: "expand",
          render(h, params) {
            return window.selfs.paintTable(params.row, h);
          }
        },
        {
          title: "分类名称",
          key: "cat_name"
        },
        {
          title: "级别",
          key: "font_level"
        },
        {
          title: "是否有效",
          key: "valid"
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
                      content: "<p>此操作将永久删除该用户，是否继续？</p>",
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
  created() {
    this.getCategories();
    selfs = this;
  },
  methods: {
    //商品分类列表
    getCategories(){
      this.$store.dispatch("getCategories").then(res=>{
        this.categories=res;
      })
    },
    toAddCategories() {
      console.log();
      // addCategories({
      //   cat_pid :
      //   cat_name:this.classifyName,
      //   cat_level
      // }).then(res=>{
      //   console.log("添加分类",res)
      // })
    },
    paintTable(table_data, h) {
      // if (table_data.children) {
        return this.returnTable(table_data, h);
      // }
    },
    returnTable(table_data, h) {
      return h("Table", {
        // style: window.selfs.returnTableStyle(table_data.cat_level),
        props: {
          data: table_data.children,
          showHeader: false,
          columns: [
            {
              width: 30,
              type: window.selfs.returnTableStyle(table_data.children),
              render(h, params) {
                console.log("=====", params.row.children);
                return window.selfs.paintTable(params.row, h);
              }
            },
            {
              title: "分类名称",
              key: "cat_name"
            },
            {
              title: "级别",
              key: "font_level"
            },
            {
              title: "是否有效",
              key: "valid"
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
                          content: "<p>此操作将永久删除该用户，是否继续？</p>",
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
        }
      });
    },
    returnTableStyle(children) {//无效
      console.log("table_data.children",children)
      if (children) {
        return "expand";
      } else {
        return "";
      }
    },
    //显示添加角色输入框
    showModal() {
      this.classify="";
      this.classifyName = "";
      this.modal1 = true;
    },
    //获取并处理多级联动选择的值
    getCascaderValue(value, selectedData) {
      console.log("响应值11", value);
      console.log("响应值22", selectedData);
      // this.classify =this.$store.getters.classifyArr(selectedData);
    },
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  .add-btn {
    margin: 0 0 15px 15px;
  }
}
</style>
<style>
td.ivu-table-expanded-cell {
  padding: 0px;
  padding-left: 12px;
  background: #f8f8f9;
}

.ivu-cascader-rel {
    display: inline-block;
    width: 400px;
    position: relative;
}
</style>
