<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      标题：
      <Input search size="small" v-model="query" @on-search="search" style="width:200px"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <Table border stripe :columns="columns" :data="daijinjuans"></Table>
    </Col>
    <Page
    :total="total"
    :current="current_page"
    :page-size="20"
    show-total
    show-elevator
    @on-change="page"
    />
  </Row>
</template>
<script>
import { Row, Col, Table, Input, Divider, Page } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Input,
    Divider,
    Page
  },
  data() {
    return {
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
          sortable: true
        },
        {
          title: "现价",
          key: "price",
          sortable: true
        },
        {
          title: "已售数量",
          key: "solds",
          sortable: true
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
      total:0,
      current_page:1
    };
  },
  created() {
    this.$http.get(`/daijinjuans`).then(res => {
      this.daijinjuans = res.data.daijinjuans;
      this.total = res.data.total
      this.current_page = res.data.current_page
    });
  },
  methods: {
    search() {
      if (this.query == "") {
        this.$http.get(`/daijinjuans?query=${this.query}`).then(res => {
          this.daijinjuans = res.data.daijinjuans;
        });
      } else {
        this.daijinjuans = this.daijinjuans.filter(val => {
          return val.title.includes(this.query);
        });
      }
    },
    page(page){
      this.$http.get(`/daijinjuans?page=${page}`).then(res =>{
        this.daijinjuans = res.data.daijinjuans
      })
    }
  }
};
</script>