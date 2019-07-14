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
  setRoleRights
} from "../../api/http";
import axios from 'axios'
export default {
  name: "Box",
  data() {
    return {
      modal1: false,
      modal2: true,
      value3: "1",
      roleName: "",
      roleDesc: "",
      currentRoleId: 0,
      rolesList: [],
      rights: [],
      columns1: [
        {
          title: "#",
          type: "index",
          width: 50,
          type: 'expand'
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
        console.log("角色列表", res);
        this.rolesList = res;
      });
    },
    getRights() {
      getRights({
        type: "tree"
      }).then(res => {
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
            }
          }
        }
        this.rights = rights;
        console.log("this.rights", this.rights);
      });
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
    setRoleRights(rids) {
      console.log("传入的rids",rids,"id",this.currentRoleId)
      setRoleRights({
        roleId: this.currentRoleId,
        rids: rids
      }).then(res => {
        console.log("角色授权返回", res);
      });
      // axios.post(
      //   "http://localhost:8888/api/private/v1/roles/42/rights",
      //   {"rids":"103,104,111"}
      // ).then(res=>{
      //   console.log("怎么肥四",res);
      // })
    },
    //选中权限
    checkRights(event) {
      console.log("选中权限？？？", event);
      var str=""
      for (var e in event) {
        if(e!=event.length-1){
          str=event[e].id+","
        }else{
          str+=event[e].id;
        }
      }
      this.setRoleRights({"rids":str});
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../static/css/roles.min");
</style>
