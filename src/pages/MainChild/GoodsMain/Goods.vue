<template>
  <div class="box">
     <div class="search-box">
      <Input
        search
        placeholder="favorite person"
        class="search-input"
        v-model="searchText"
        @keydown.enter.native="toSearch"
      />
      <Button type="success" class="add-btn" @click="toAddGoods">添加商品</Button>
    </div>
    <Table :columns="columns1" :stripe="true" :data="goods" height="377"></Table>
    <div class="page-box">
      <Page
        :total="goods_result.total"
        :page-size="pageSize"
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
import { getGoods } from "@/api/http";
export default {
  name: "Box",
  data() {
    return {
      goods_result: [],
      goods: [],
      opts: [10, 20, 30, 40],
      pageSize: 10,
      pageNum: 1,
      searchText:"",
      columns1: [
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "商品名称",
          key: "goods_name",
          width: 370
        },
        {
          title: "商品价格（元）",
          key: "goods_price"
        },
        {
          title: "商品重量",
          key: "goods_weight"
        },
        {
          title: "创建日期",
          key: "add_time"
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
                          // this.resetUsersList(params.index, "edit", res);
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
    this.getGoods(this.pageNum,this.pageSize);
  },
  methods: {
    //商品数据列表
    getGoods(pageNum, pageSize) {
      getGoods({
        pagenum: pageNum,
        pagesize: pageSize
      }).then(res => {
        console.log("商品数据", res);
        this.goods_result = res;
        this.goods = this.goods_result.goods;
      });
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.getGoods(this.pageNum, this.pageSize);
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.getGoods(this.pageNum, this.pageSize);
    },
    toAddGoods() {
      this.$router.replace({
        name:"goods/addGoods",

        query: {
          titleArr:this.$route.query.titleArr
        }
      })
      
    },
    //搜索
    toSearch() {
      this.goods = this.searchResult();
    },
    searchResult() {
      var that = this;
      return this.goods_result.goods.filter(function(v, i, a) {
        return v.goods_name.indexOf(that.searchText) != -1;
      });
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
