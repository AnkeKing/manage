<template>
  <div class="order-box">
    <Table :columns="columns1" height="422" :data="orders.goods"></Table>
    <div class="page-box">
      <Page
        :total="orders.total"
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
import { getOrders,editOrders,} from "../../api/http";
export default {
  name: "Order-box",
  data() {
    return {
      columns1: [
        {
          title: "#",
          type: "index",
          width: 50
        },
        {
          title: "订单编号",
          key: "order_number",
          width:270
        },
        {
          title: "订单价格",
          key: "order_price"
        },
        {
          title: "是否付款",
          key: "font_pay",
          render: (h, params) => {
            if (params.row.order_pay == 0) {
              return h(
                "Tag",
                {
                  style: {
                    border: "1px solid rgba(164, 84, 110, 0.7)",
                    color: "#fff",
                    backgroundColor: "rgba(164, 84, 110, 0.7)"
                  }
                },
                params.row.font_pay
              );
            } else {
              return h(
                "Tag",
                {
                  style: {
                    border: "1px solid rgb(102, 143, 108)",
                    color: "#fff",
                    backgroundColor: "rgb(102, 143, 108)"
                  }
                },
                params.row.font_pay
              );
            }
          }
        },
        {
          title: "是否发货",
          key: "is_send"
        },
        {
          title: "下单时间",
          key: "create_time"
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
                    var is_send = params.row.is_send;
                    var order_pay = params.row.order_pay;
                    var order_price = params.row.order_price;
                    var order_number = params.row.order_number;
                    var pay_status = params.row.pay_status;
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
                                "编辑订单"
                              )
                            ]
                          ),
                          h(
                            "div",
                            {
                              class: "my-div"
                            },
                            [
                              h("a", "支付状态 :"),
                              h("Input", {
                                props: {
                                  value: pay_status,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    pay_status = val;
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
                              h("a", "订单是否发货 :"),
                              h("Input", {
                                props: {
                                  value: is_send,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    is_send = val;
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
                              h("a", "订单支付 :"),
                              h("Input", {
                                props: {
                                  value: order_pay,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    order_pay = val;
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
                              h("a", "订单价格 :"),
                              h("Input", {
                                props: {
                                  value: order_price,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    order_price = val;
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
                              h("a", "订单数量 :"),
                              h("Input", {
                                props: {
                                  value: order_number,
                                  autofocus: true
                                },
                                on: {
                                  input: val => {
                                    order_number = val;
                                  }
                                }
                              })
                            ]
                          )
                        ]);
                      },
                      onOk: () => {
                        editOrders({
                          id:params.row.order_id,
                          is_send: is_send,
                          order_pay: order_pay,
                          order_price: order_price,
                          order_number: order_number,
                          pay_status: pay_status
                        }).then(res=>{
                          this.getOrders(this.pagesize, this.pagenum);
                        })
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
      orders: [],
      opts: [10, 20, 30, 40],
      pagesize: 10,
      pagenum: 1
    };
  },
  methods: {
    changePageSize(pagesize) {
      this.pagesize = pagesize;
      this.getOrders(this.pagesize, this.pagenum);
    },
    changePage(pagenum) {
      this.pagenum = pagenum;
      this.getOrders(this.pagesize, this.pagenum);
    },
    getOrders(pagesize, pagenum) {
      var that = this;
      getOrders({
        pagenum: pagenum,
        pagesize: pagesize
      }).then(res => {
        that.orders = that.FOR(res);
      });
    },
    FOR(res) {
      for (var g in res.goods) {
        res.goods[g].create_time = new Date(
          res.goods[g].create_time
        ).toLocaleDateString();
        if (res.goods[g].order_pay == 0) {
          res.goods[g].font_pay = "未付款";
        } else {
          res.goods[g].font_pay = "已付款";
        }
      }
      return res;
    }
  },
  created() {
    this.getOrders(this.pagesize, this.pagenum);
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
<style>
.order-box .ivu-tag-text {
  color: #fff;
}
.ivu-input-wrapper {
    width: 70%;
}
</style>