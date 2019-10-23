<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <Input search placeholder="请输入标题" v-model="search_title" style="width:200px"></Input>
      <DatePicker
        split-panels
        type="daterange"
        placeholder="请选择时间"
        v-model="search_created_at"
        style="width:200px"
      ></DatePicker>
      <Button type="primary" @click="getdaijinquan(1)">搜索</Button>
    </Col>
    <Divider />
    <Col :span="24">
      <Table border stripe :columns="columns" :data="daijinjuans" @on-sort-change="getOrder"></Table>
    </Col>
    <Page
      :total="total"
      :current="current_page"
      :page-size="20"
      show-total
      show-elevator
      @on-change="getdaijinquan"
    />
  </Row>
</template>
<script>
import {
  Row,
  Col,
  Table,
  Input,
  Divider,
  Page,
  Button,
  DatePicker
} from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Input,
    Divider,
    Page,
    Button,
    DatePicker
  },
  data() {
    return {
      search_title: "",
      search_created_at: "",
      query: "",
      columns: [
        {
          title: "代金券id",
          key: "id"
        },
        {
          title: "商户id",
          key: "merchant_id"
        },
        {
          title: "原价",
          key: "originprice",
          sortable: "custom"
        },
        {
          title: "现价",
          key: "price",
          sortable: "custom"
        },
        {
          title: "已售数量",
          key: "solds",
          sortable: "custom"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "创建时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.$router.push(`/daijinjuans/${params.row.id}`);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.$router.push(`/daijinjuans/${params.row.id}/edit`);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      daijinjuans: [],
      total: null,
      current_page: 1,
      order: ""
    };
  },
  // created() {
  //   this.$http.get(`/daijinjuans`).then(res => {
  //     this.daijinjuans = res.data.daijinjuans;
  //     this.total = res.data.total;
  //     this.current_page = res.data.current_page;
  //   });
  // },
  activated() {
    this.getdaijinquan(1);
  },
  methods: {
    //   search() {
    //     if (this.query == "") {
    //       this.$http.get(`/daijinjuans?query=${this.query}`).then(res => {
    //         this.daijinjuans = res.data.daijinjuans;
    //       });
    //     } else {
    //       this.daijinjuans = this.daijinjuans.filter(val => {
    //         return val.title.includes(this.query);
    //       });
    //     }
    //   },
    //   page(page) {
    //     this.$http.get(`/daijinjuans?page=${page}`).then(res => {
    //       this.daijinjuans = res.data.daijinjuans;
    //     });
    //   }
    // }
    getdaijinquan(page) {
      let url = `/daijinjuans?page=${page}`;
      if (this.search_title) {
        url += `&search_title=${this.search_title}`;
      }
      if (this.search_created_at) {
        url += `&search_created_at=${this.search_created_at}`;
      }
      if (this.order) {
        url += `&order=${this.order}`;
      }
      this.$http.get(url).then(res => {
        this.daijinjuans = res.data.daijinjuans;
        this.total = res.data.total;
        this.current_page = res.data.current_page;
      });
    },
    getOrder(params) {
      this.order = params.order;
      this.getdaijinquan(1);
    }
  }
};
</script>