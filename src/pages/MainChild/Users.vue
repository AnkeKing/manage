<template>
  <div class="box">
    <Table :columns="columns1" :data="users_data.users"></Table>
  </div>
</template>

<script>
import { getUsers, setUserState } from "@/api/http";
export default {
  name: "Box",
  data() {
    return {
      modal1: false,
      columns1: [
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
              h("Button", {
                //编辑
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
                    // this.remove(params.index);
                    console.log("this", params);
                    this.$Modal.confirm({
                      render: h => {
                        return h("div", [
                          h("div",{
                              class: "top-div",
                              style:{
                                fontWeight:"bold"
                              }
                            },
                            [
                            h("a", {
                              style:{
                                fontSize:"18px"
                              }
                            },"编辑用户")
                            ]
                          ,),
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
                                  disabled:true
                                }
                              })
                            ]
                          ),
                          h("div",{
                              class: "my-div"
                            }, [
                            h("a", "邮箱 :"),
                            h("Input", {
                              props: {
                                value: params.row.email,
                                autofocus: true
                              },
                              on: {
                                input: val => {
                                  this.value = val;
                                }
                              }
                            })
                          ]),
                          h("div",{
                              class: "my-div"
                            }, [
                            h("a", "电话 :"),
                            h("Input", {
                              props: {
                                value: params.row.mobile,
                                autofocus: true
                              },
                              on: {
                                input: val => {
                                  this.value = val;
                                }
                              }
                            })
                          ])
                        ]);
                      }
                    });
                  }
                }
              }),
              h("Button", {
                //删除
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
                  }
                }
              }),
              h("Button", {
                //完成
                props: {
                  // type: "error",
                  size: "small",
                  shape: "circle",
                  icon: "md-checkmark"
                },
                style: {
                  width: "20px",
                  height: "20px",
                  background: "#668F6C",
                  color: "#fff"
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                  }
                }
              })
            ]);
          }
        }
      ],
      users_data: []
    };
  },
  mounted() {
    getUsers({
      pagenum: 1,
      pagesize: 4
    }).then(res => {
      // console.log("用户列表", res);
      this.users_data = res;
    });
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
<style>
.ivu-input-wrapper {
  width: 80%;
  float: right;
}
.my-div {
  line-height: 35px;
  margin-bottom: 5px;
}
.top-div{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.ivu-input[disabled], fieldset[disabled] .ivu-input {
    background: rgba(164,84,110,0.7);
    color: #666666;
}
.ivu-input{
font-size: 16px;
}
.ivu-switch-checked {
    border-color: rgba(246,187,66,0.9);
    background-color: rgba(246,187,66,0.9);
}
.ivu-btn-primary {
    background-color: rgba(164,84,110,0.7);
    border-color: rgba(164,84,110,0.7);
}
.ivu-btn-primary:hover{
    border-color: rgba(246,187,66,0.9);
    background-color: rgba(246,187,66,0.9);
}
.ivu-btn>span{
    color: #666666;
}
.ivu-table td, .ivu-table th {
    text-align: center;
}
</style>
