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
      <Button type="success" class="add-btn" @click="toAddGoods('添加商品')">添加商品</Button>
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
import { getGoods, deleteGoods } from "@/api/http";
export default {
  name: "Box",
  data() {
    return {
      goods_result: [],
      goods: [],
      opts: [10, 20, 30, 40],
      pageSize: 10,
      pageNum: 1,
      searchText: "",
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
                    this.toAddGoods("编辑商品",params.row);
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
                      content: "<p>此操作将永久删除该商品，是否继续？</p>",
                      okText: "OK",
                      cancelText: "Cancel",
                      onOk: () => {
                        this.deleteGoods(params.row.goods_id);
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
    this.getGoods(this.pageNum, this.pageSize);
  },
  methods: {
    //商品数据列表
    getGoods(pageNum, pageSize) {
      getGoods({
        pagenum: pageNum,
        pagesize: pageSize
      }).then(res => {
        // console.log("商品数据", res);
        var goods_result = res;
        for (var g in goods_result.goods) {
          goods_result.goods[g].add_time = new Date(
            goods_result.goods[g].add_time
          ).toLocaleDateString();
        }
        this.goods_result = goods_result;
        this.goods = this.goods_result.goods;
      });
    },
    deleteGoods(id) {
      deleteGoods({ id: id }).then(res => {
        this.getGoods(this.pageNum, this.pageSize);
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
    toAddGoods(type,row) {
      if (type === "添加商品") {
        this.$router.replace({
          name: "goods/addGoods",
          query: {
            titleArr: this.$route.query.titleArr,
            btnType: type
          }
        });
      } else {
        this.$router.replace({
          name: "goods/addGoods",
          query: {
            titleArr: this.$route.query.titleArr,
            btnType: type,
            goods_data:row
          }
        });
      }
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
