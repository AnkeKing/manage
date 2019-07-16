<template>
  <div class="box">
    <Button type="success" class="add-btn" @click="toAddCategories">添加分类</Button>
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
import { getCategories } from "../../api/http";
export default {
  name: "Box",
  data() {
    return {
      categories: [],
      columns1: [
        {
          width: 30,
          type: "expand",
          render(h, params) {
            console.log("...", params);
             console.log("this", this);
            this.paintTable(params.row);
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
  },
  methods: {
    //商品分类列表
    getCategories() {
      getCategories().then(res => {
        console.log("商品分类", res);
        this.FOR(res);
        this.categories = res;
      });
    },
    FOR(newData) {
      for (var r in newData) {
        if (newData[r].cat_level === 0) {
          newData[r].font_level = "一级";
        } else if (newData[r].cat_level === 1) {
          newData[r].font_level = "二级";
        } else {
          newData[r].font_level = "三级";
        }
        if (!newData[r].cat_deleted) {
          newData[r].valid = "有效";
        } else {
          newData[r].valid = "无效";
        }
        if (newData[r].children) {
          this.FOR(newData[r].children);
        }
      }
    },
    toAddCategories() {
      console.log();
    },
    paintTable(table_data) {
      if (table_data.children) {
        return h("Table", {
          props: {
            data: table_data.children,
            showHeader: false,
            columns: [
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
                            content:
                              "<p>此操作将永久删除该用户，是否继续？</p>",
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
      }
    }
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
  padding-left: 10px;
  background: #f8f8f9;
}
</style>
