<template>
  <div class="box">
    <h1>商品分类</h1>
  </div>
</template>

<script>
import {getGoods,} from '@/api/http';
export default {
  name: "Box",
  data() {
    return {
      columns1: [
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "姓名",
          key: "username"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "电话",
          key: "mobile"
        },
        {
          title: "创建日期",
          key: "create_time"
        },
        {
          title: "用户状态",
          key: "mg_state",
          render: (h, params) => {
            // 重点
            let _this = this;
            return h("i-switch", {
              //按钮的话是：button自行替换
              props: {
                //这里可以设置它的属性
                value: params.row.mg_state, //设置它的值比如：true或false
                disabled: false // 设置是否可以操作，变灰
              },
              on: {
                //操作事件
                input: function(event) {
                  //这里会起到监听的作用
                  if (event) {
                    params.row.status = true;
                  } else {
                    params.row.status = false;
                  }
                },
                "on-change": function() {
                  //值发生了改变调用方法
                  setUserState({
                    uid: params.row.id,
                    type: params.row.status
                  });
                }
              }
            });
          }
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
  created(){
    this.getGoods(1,7);
  },
  methods: {
      //商品数据列表
      getGoods(pageNum,pageSize){
          getGoods({
              pageNum:pageNum,
              pageSize:pageSize
          }).then(res=>{
              console.log("商品数据",res);
          })
      },
    
    //显示添加商品输入框
    showModal() {
      // this.username = "";
      // this.password = "";
      // this.email = "";
      // this.mobile = "";
      // this.modal1 = true;
    },
    //搜索
    toSearch() {
      this.users_list = this.searchResult();
    },
    searchResult() {
      var that = this;
      return this.users_data.users.filter(function(v, i, a) {
        return v.username.indexOf(that.searchText) != -1;
      });
    },

  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
