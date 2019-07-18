<template>
  <div class="categories-box">
    <Button type="success" class="add-btn" @click="showModal">添加分类</Button>
    <Modal v-model="modal1" title="添加分类" @on-ok="toAddCategories">
      <div class="add-box">
        <p>分类名称:</p>
        <Input placeholder="classifyName" v-model="classifyName" />
      </div>
      <div class="add-box">
        <p>分类:</p>
        <Cascader :data="selectCategories.result" @on-change="getCascaderValue" change-on-select></Cascader>
      </div>
    </Modal>
    <Table :columns="columns1" height="422" :data="categories.result"></Table>
    <div class="page-box">
      <Page
        :total="categories.total"
        :page-size="pagesize"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        :page-size-opts="opts"
        show-total
        show-elevator
        show-sizer
      />
    </div>
  </div>
</template>

<script>
import {
  getCategories,
  addCategories,
  editCategories,
  deleteCategories
} from "../../api/http";
window.selfs = {};
export default {
  name: "Categories-box",
  data() {
    return {
      categories: [],
      selectCategories: [],
      modal1: false,
      cat_pid: "",
      classify: "",
      level: "",
      classifyName: "",
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
                    var cat_name = "";
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
                                    fontSize: "15px"
                                  }
                                },
                                "修改商品分类"
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "分类名称 :"),
                              h("Input", {
                                props: {
                                  value: params.row.cat_name,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    cat_name = val;
                                  }
                                }
                              })
                            ]
                          )
                        ]);
                      },
                      onOk: () => {
                        editCategories({
                          id: params.row.cat_id,
                          cat_name: cat_name
                        }).then(res => {
                          this.getCategories();
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
                    this.$Modal.confirm({
                      title: "提示",
                      content: "<p>此操作将永久删除该分类，是否继续？</p>",
                      okText: "OK",
                      cancelText: "Cancel",
                      onOk: () => {
                        deleteCategories({
                          id: params.row.cat_pid
                        }).then(res => {
                          this.getCategories();
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
      opts: [5, 10, 15, 20],
      pagesize: 10,
      pagenum: 1
    };
  },
  created() {
    this.getCategories(this.pagesize, this.pagenum);
    selfs = this;
  },
  methods: {
    //商品分类列表
    getCategories(pagesize, pagenum) {
      this.$store
        .dispatch("getCategories", {
          pagesize: pagesize,
          pagenum: pagenum,
          type: 3
        })
        .then(res => {
          this.categories = res;
        });
      this.$store
        .dispatch("getCategories", {
          pagesize: pagesize,
          pagenum: pagenum,
          type: 2
        })
        .then(res => {
          this.selectCategories = res;
        });
    },
    toAddCategories() {
      addCategories({
        cat_pid: this.cat_pid,
        cat_name: this.classifyName,
        cat_level: this.level
      }).then(res => {
        this.getCategories(this.pagesize, this.pagenum);
      });
    },
    paintTable(table_data, h) {
      return this.returnTable(table_data, h);
    },
    returnTable(table_data, h) {
      return h("Table", {
        props: {
          data: table_data.children,
          showHeader: false,
          columns: [
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
                        var cat_name = "";
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
                                    "修改商品分类"
                                  )
                                ]
                              ),
                              h(
                                "div",
                                {
                                  class: "my-div"
                                },
                                [
                                  h("a", "分类名称 :"),
                                  h("Input", {
                                    props: {
                                      value: params.row.cat_name,
                                      autofocus: true
                                    },
                                    on: {
                                      input: val => {
                                        cat_name = val;
                                      }
                                    }
                                  })
                                ]
                              )
                            ]);
                          },
                          onOk: () => {
                            editCategories({
                              id: params.row.cat_id,
                              cat_name: cat_name
                            }).then(res => {
                              this.getCategories(this.pagesize, this.pagenum);
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
                        this.$Modal.confirm({
                          title: "提示",
                          content: "<p>此操作将永久删除该分类，是否继续？</p>",
                          okText: "OK",
                          cancelText: "Cancel",
                          onOk: () => {
                            console.log("删除---", params.row);
                            deleteCategories({
                              id: params.row.cat_id
                            }).then(res => {
                              this.getCategories(this.pagesize, this.pagenum);
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
    //显示添加角色输入框
    showModal() {
      this.classify = "";
      this.classifyName = "";
      this.modal1 = true;
    },
    //获取并处理多级联动选择的值
    getCascaderValue(value, selectedData) {
      this.cat_pid = selectedData[selectedData.length - 1].cat_id;
      this.level = selectedData[selectedData.length - 1].cat_level + 1;
    },
    changePageSize(pagesize) {
      this.pagesize = pagesize;
      this.getCategories(this.pagesize, this.pagenum);
    },
    changePage(pagenum) {
      this.pagenum = pagenum;
      this.getCategories(this.pagesize, this.pagenum);
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
  padding-left: 12px;
  background: #f8f8f9;
}
.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  color: rgba(164, 84, 110, 0.7);
}
.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: rgba(164, 84, 110, 0.7);
}

.addgoods-box .ivu-card-body {
  padding: 10px;
}
.addgoods-box .ivu-col-span-12 {
  display: block;
  width: 100%;
}
.addgoods-box .ivu-row {
  width: 100%;
}
.addgoods-box .demo-tabs-style1 {
  background: #eee;
  padding: 16px;
}
.addgoods-box .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  margin-top: -16px;
}

.addgoods-box
  .demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-content
  > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.addgoods-box
  .demo-tabs-style1
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab {
  border-color: transparent;
}

.addgoods-box
  .demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-color: #fff;
}
.addgoods-box
  .demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.addgoods-box .ivu-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}

.addgoods-box .ivu-input-wrapper {
  width: 100%;
  float: right;
}
.addgoods-box .ivu-cascader {
  width: 75%;
}

.addgoods-box .ivu-upload-drag {
  width: 90px;
}

.addgoods-box .demo-upload-list {
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
.addgoods-box .demo-upload-list img {
  width: 100%;
  height: 100%;
}
.addgoods-box .demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.addgoods-box .demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.addgoods-box .demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
