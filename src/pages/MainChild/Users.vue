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
      <Button type="success" class="add-btn" @click="showModal">添加用户</Button>
    </div>
    <Table :columns="columns1" :data="users_list"></Table>
    <Modal v-model="modal1" title="添加用户" @on-ok="addUser">
      <div class="add-box">
        <p>用户名:</p>
        <Input placeholder="Username" v-model="username" />
      </div>
      <div class="add-box">
        <p>密码:</p>
        <Input placeholder="Password" v-model="password" />
      </div>
      <div class="add-box">
        <p>邮箱:</p>
        <Input placeholder="Email" v-model="email" />
      </div>
      <div class="add-box">
        <p>电话:</p>
        <Input placeholder="Phone" v-model="mobile" />
      </div>
    </Modal>
    <div class="page-box">
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
    </div>
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
  getRoleById,
  addUser
} from "@/api/http";
export default {
  name: "Box",
  data() {
    return {
      modal1: false,
      rolesList: [],
      columns1: [
        {
          title: "#",
          type: "index",
          width:50
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
                                    fontSize: "15px"
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
                          this.getUsers(this.pageNum,this.pageSize);
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
                          this.getUsers(this.pageNum,this.pageSize);
                        });
                      }
                    });
                  }
                }
              }),
              //设置用户角色
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
                    var rid="";
                    getRoles().then(res => {
                      this.rolesList = res;
                      this.rolesList.map(item => {
                        if (item.roleName === params.row.role_name) {
                          rid = item.id;
                        }
                      });
                    });
                    console.log("this.parent",this.$parent)
                    this.$Modal.confirm({
                      render: h => {
                        return h("div", 
                        {
                            style:{
                              width: "60%",
                              margin: "0 auto"
                            }
                          },[
                          
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
                            this.getUsers(this.pageNum,this.pageSize);
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
      searchText: "",
      username: "",
      password: "",
      email: "",
      mobile: "",
      opts: [2, 4, 6, 8],
      pageSize: 4,
      pageNum:1
    };
  },
  created() {
    this.getUsers(this.pageNum,this.pageSize);
  },
  methods: {
    //用户列表
    getUsers(pageNum,pageSize) {
      this.pageNum=pageNum;
      this.pageSize=pageSize;
      getUsers({
        pagenum: pageNum,
        pagesize:pageSize
      }).then(res => {
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
    //添加用户
    addUser() {
      addUser({
        username: this.username,
        password: this.password,
        email: this.email,
        mobile: this.mobile
      }).then(res => {
        this.getUsers();
      });
    },
    //显示添加用户输入框
    showModal() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.mobile = "";
      this.modal1 = true;
    },
    changePageSize(pageSize) {
      this.pageSize=pageSize;
      this.getUsers(this.pageNum,this.pageSize);
    },
    changePage(pageNum) {
      this.pageNum=pageNum;
      this.getUsers(this.pageNum,this.pageSize);
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  display: flex;
  flex-direction: column;
}
</style>
<style>
.my-div {
  display: flex;
  justify-content: space-between;
}
.ivu-input-wrapper {
  width: 80%;
}
</style>


