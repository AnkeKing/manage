<template>
  <div class="box">
    <Button type="success" class="add-btn" @click="showModal">添加角色</Button>
    <Table :columns="columns1" :data="rolesList" height="377"></Table>
    <Modal v-model="modal1" title="添加角色" @on-ok="addRole">
      <div class="add-box">
        <p>角色名称:</p>
        <Input placeholder="RoleDesc" v-model="roleName" />
      </div>
      <div class="add-box">
        <p>角色描述:</p>
        <Input placeholder="RoleDesc" v-model="roleDesc" />
      </div>
    </Modal>
    <Modal v-model="modal2" title="分配权限" @on-ok="setRoleRights">
      <Tree :data="rights" show-checkbox @on-check-change="checkRights"></Tree>
    </Modal>
  </div>
</template>

<script>
import {
  getRoles,
  addRole,
  editRole,
  deleteRole,
  getRights,
  getRoleById,
  setRoleRights,
  deleteRoleRights
} from "../../api/http";
import axios from "axios";
export default {
  name: "Box",
  data() {
    return {
      modal1: false,
      modal2: false,
      value3: "1",
      roleName: "",
      roleDesc: "",
      rids: {},
      currentRoleId: 0,
      rolesList: [],
      rights: [],
      columns1: [
        {
          width: 30,
          type: "expand",
          render: (h, params) => {
            // console.log("params", params);
            var parentArr = [];
            var childArr = [];
            var grandSonArr = [];
            if (params.row.children.length > 0) {
              params.row.children.map(item => {
                parentArr.push(
                  h(
                    "Tag",
                    {
                      props: {
                        color: "rgb(102, 143, 108)",
                        closable: true,
                        name: item.id
                      },
                      on: {
                        "on-close": (val, name) => {
                          console.log("关闭。。。", val, name);
                          deleteRoleRights({
                            roleId: params.row.id,
                            rightId: name
                          }).then(res => {
                            console.log("删除指定权限", res);
                            this.getRoles();
                          });
                        }
                      }
                    },
                    item.authName
                  )
                );
                item.children.map(child => {
                  childArr.push(
                    h(
                      "Tag",
                      {
                        props: {
                          color: "rgb(96, 133, 174)",
                          closable: true,
                          name: child.id
                        },
                        on: {
                          "on-close": (val, name) => {
                            console.log("关闭。。。", val, name);
                            deleteRoleRights({
                              roleId: params.row.id,
                              rightId: name
                            }).then(res => {
                              console.log("删除指定权限", res);
                              this.getRoles();
                            });
                          }
                        }
                      },
                      child.authName
                    )
                  );
                  child.children.map(grandSon => {
                    grandSonArr.push(
                      h(
                        "Tag",
                        {
                          props: {
                            color: "rgb(179, 131, 172)",
                            closable: true,
                            name: grandSon.id,
                            size: "small"
                          },
                          on: {
                            "on-close": (val, name) => {
                              console.log("关闭。。。", val, name);
                              deleteRoleRights({
                                roleId: params.row.id,
                                rightId: name
                              }).then(res => {
                                console.log("删除指定权限", res);
                                this.getRoles();
                              });
                            }
                          }
                        },
                        grandSon.authName
                      )
                    );
                  });
                });
              });
              return h("div",{style:{display:"flex",justifyContent:"center"}}, [
                h("div",{style:{width:"100px"}},[parentArr]),
                h("div",{style:{width:"100px"}},[childArr]),
                h("div",{style:{width:"370px"}},[grandSonArr])]);
            } else {
              return h(
                "div",
                {
                  style: {
                    color: "rgb(179, 131, 172)",
                    fontWeight: "bold"
                  }
                },
                "此角色暂无任何权限"
              );
            }
          }
        },
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "角色名称",
          key: "roleName"
        },
        {
          title: "角色描述",
          key: "roleDesc"
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
                    let roleName = params.row.roleName;
                    let roleDesc = params.row.roleDesc;
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
                                "编辑角色"
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "角色名称 :"),
                              h("Input", {
                                props: {
                                  value: params.row.roleName,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    roleName = val;
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
                              h("a", "角色描述 :"),
                              h("Input", {
                                props: {
                                  value: params.row.roleDesc,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    roleDesc = val;
                                  }
                                }
                              })
                            ]
                          )
                        ]);
                      },
                      onOk: () => {
                        editRole({
                          id: params.row.id,
                          roleName: roleName,
                          roleDesc: roleDesc
                        }).then(res => {
                          this.getRoles();
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
                      content: "<p>此操作将永久删除该角色，是否继续？</p>",
                      okText: "OK",
                      cancelText: "Cancel",
                      onOk: () => {
                        deleteRole({
                          id: params.row.id
                        }).then(res => {
                          this.getRoles();
                        });
                      }
                    });
                  }
                }
              }),
              //设置角色权限
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
                    this.getRoles();
                    this.modal2 = true;
                    this.currentRoleId = params.row.id;
                    console.log("this.params", params);
                    // if (params.row.children.length > 0) {
                    //     this.setRights(params.row.children);
                    // }else{
                    //     this.getRights();
                    // }
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
    this.getRoles();
    this.getRights();
  },
  methods: {
    //获取角色列表
    getRoles() {
      getRoles().then(res => {
        // console.log("角色列表", res);
        this.rolesList = res;
      });
    },
    //根据 ID 查询角色
    getRoleById(id) {
      getRoleById({
        id: id
      }).then(res => {
        console.log("根据 ID 查询角色", res);
      });
    },
    //获取所有权限列表
    getRights() {
      var that = this;
      getRights({
        type: "tree"
      }).then(res => {
        console.log("所有权限", res);
        var rights = res;
        for (var r in rights) {
          var parent = rights[r];
          parent.title = parent.authName;
          for (var c in parent.children) {
            var child = parent.children[c];
            child.title = child.authName;
            for (var s in child.children) {
              var grandSon = child.children[s];
              grandSon.title = grandSon.authName;
              grandSon.checked = false;
            }
          }
        }
        this.rights = rights;
      });
    },
    //设置权限是否选中
    setRights(currentRoleRights) {
      // console.log("???", currentRoleRights);
      // var rights = JSON.parse(JSON.stringify(this.rights));
      // var allGrandSonArr = [];
      // for (var r in rights) {
      //   var parent = rights[r];
      //   for (var c in parent.children) {
      //     var child = parent.children[c];
      //     for (var s in child.children) {
      //       var grandSon = child.children[s];
      //       grandSon.checked = false;
      //       allGrandSonArr.push(grandSon);
      //     }
      //   }
      // }
      //   console.log("所有数组", allGrandSonArr);
      //   var currentGrandSonArr = [];
      //   for (var r in currentRoleRights) {
      //     var currentParent = currentRoleRights[r];
      //     for (var c in currentParent.children) {
      //       var currentChild = currentParent.children[c];
      //       for (var s in currentChild.children) {
      //         var currentGrandSon = currentChild.children[s];
      //         currentGrandSonArr.push(currentGrandSon);
      //       }
      //     }
      //   }
      //   console.log("当前新数组", currentGrandSonArr);
      //   for (var curr in currentGrandSonArr) {
      //     for (var all in allGrandSonArr) {
      //       if (allGrandSonArr[all].id === currentGrandSonArr[curr].id) {
      //         for (var r in rights) {
      //           var parent = rights[r];
      //           for (var c in parent.children) {
      //             var child = parent.children[c];
      //             child.children[all].checked = true;
      //           }
      //         }
      //       }
      //     }
      //   }
      // this.rights = rights;
    },
    //显示添加角色输入框
    showModal() {
      this.roleName = "";
      this.roleDesc = "";
      this.modal1 = true;
    },
    //添加角色
    addRole() {
      addRole({
        roleName: this.roleName,
        roleDesc: this.roleDesc
      }).then(res => {
        this.getRoles();
      });
    },
    //角色授权
    setRoleRights() {
      //bug
      setRoleRights({
        roleId: this.currentRoleId,
        rids: this.rids
      }).then(res => {
        this.getRoles();
      });
    },
    //选中权限
    checkRights(event) {
      var str = "";
      for (var e in event) {
        if (e != event.length - 1) {
          str = str + event[e].id + ",";
        } else {
          str = str + event[e].id;
        }
      }
      this.rids = { rids: str };
      // console.log("事件触发", event);
      // console.log("拼接形成", this.rids);
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../static/css/roles.min");
</style>
<style>
.ivu-table-expanded-cell {
}
</style>