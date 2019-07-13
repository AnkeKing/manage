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
      <Button type="success" class="add-btn">添加用户</Button>
    </div>
    <Table :columns="columns1" :data="users_list"></Table>
  </div>
</template>

<script>
import {
  getUsers,
  setUserState,
  editUser,
  deleteUser,
  getRoles,
  setUserRole,
  getRoleById
} from "@/api/http";
export default {
  name: "Box",
  data() {
    return {
      modal1: false,
      rolesList: [],
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
                          this.resetUsersList(params.index, "edit",res);
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
                          this.resetUsersList(params.index, "delete",res);
                        });
                      }
                    });
                  }
                }
              }),
              //设置用户权限
              h("Button", {
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
                    getRoles().then(res => {
                      console.log("权限列表", res);
                      this.rolesList = res;
                    });
                    var rid = "";
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
                                "分配角色"
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h(
                                "a",
                                {
                                  style: {
                                    marginRight: "10px"
                                  }
                                },
                                "用户名 :"
                              ),
                              h(
                                "a",
                                {
                                  style: {
                                    color: "rgba(164,84,110,0.7)",
                                    fontWeight: "bold"
                                  }
                                },
                                params.row.username
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h(
                                "a",
                                {
                                  style: {
                                    marginRight: "20px"
                                  }
                                },
                                "角色 :"
                              ),
                              h(
                                "Select",
                                {
                                  props: {
                                    placeholder: params.row.role_name
                                  },
                                  on: {
                                    "on-change": v => {
                                      rid = v;
                                    }
                                  }
                                },
                                this.rolesList.map(item => {
                                  return h("Option", {
                                    props: {
                                      value: item.id,
                                      label: item.roleName,
                                      labelInValue: true
                                    }
                                  });
                                })
                              )
                            ]
                          )
                        ]);
                      },
                      onOk: () => {
                        setUserRole({
                          id: params.row.id,
                          rid: rid
                        }).then(res => {
                          getRoleById({
                            id: res.rid
                          }).then(res => {
                            this.resetUsersList(params.index, "setRole",res);
                          });
                        });
                      },
                      onCancel: () => {}
                    });
                  }
                }
              })
            ]);
          }
        }
      ],
      users_data: [],
      users_list: [],
      searchText: ""
    };
  },
  mounted() {
    getUsers({
      pagenum: 1,
      pagesize: 4
    }).then(res => {
      console.log("用户列表", res);
      var users_data = res;
      for (var u in users_data.users) {
        users_data.users[u].create_time = new Date(
          users_data.users[u].create_time
        ).toLocaleDateString();
      }
      this.users_data = users_data;
      this.users_list = this.users_data.users;
    });
  },
  methods: {
    resetUsersList(index, type,res) {
      var users_list = JSON.parse(JSON.stringify(this.users_list));
      if (type === "delete") {
        users_list.splice(index, 1);
      } else if (type === "edit") {
        users_list[index].email = res.email;
        users_list[index].mobile = res.mobile;
      } else if (type === "setRole") {
        users_list[index].role_name = res.roleName;
      }
      this.users_list = users_list;
      this.users_data.users = this.users_list;
    },
    toSearch() {
      console.log("this.searchText", this.searchResult());
      this.users_list=this.searchResult();
    },
    searchResult() {
      var that=this;
      return this.users_data.users.filter(function(v, i, a) {
        return v.username.indexOf(that.searchText) != -1;
      });
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../static/css/users.min");
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
.top-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  background: rgba(164, 84, 110, 0.7);
  color: #666666;
}
.ivu-input {
  font-size: 16px;
}
.ivu-switch-checked {
  border-color: rgba(246, 187, 66, 0.9);
  background-color: rgba(246, 187, 66, 0.9);
}
.ivu-btn-primary {
  background-color: rgba(164, 84, 110, 0.7);
  border-color: rgba(164, 84, 110, 0.7);
}
.ivu-btn-primary:hover {
  border-color: rgba(246, 187, 66, 0.9);
  background-color: rgba(246, 187, 66, 0.9);
}
.ivu-modal-body .ivu-btn > span {
  color: #666666;
}
.ivu-table td,
.ivu-table th {
  text-align: center;
}
.my-div .ivu-select {
  width: 50%;
}
</style>
