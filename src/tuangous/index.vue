<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      标题：
      <Input search v-model="query" @on-search="search" style="width:200px" small></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <Table border stripe :columns="columns" :data="tuangous"></Table>
    </Col>
    <Col :span="24">
      <Page :total="total" :current="current_page" show-total show-elevator @on-change="page" />
    </Col>
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
          title: "id",
          key: "id"
        },
        {
          title: "团购商户id",
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
                      this.$router.push(`/tuangous/${params.row.id}`);
                      
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
                      this.$router.push(`/tuangous/${params.row.id}/edit`);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      tuangous: [],
      total: 0,
      current_page: 1
    };
  },
  created() {
    this.$http.get(`/tuangous`).then(res => {
      this.tuangous = res.data.tuangous;
      this.total = res.data.total;
      this.current_page = res.data.current_page;
    });
  },
  methods: {
    search() {
      if (this.query == "") {
        this.$http.get(`/tuangous?query=${this.query}`).then(res => {
          this.tuangous = res.data.tuangous;
        });
      } else {
        this.tuangous = this.tuangous.filter(val => {
          return val.title.includes(this.query);
        });
      }
    },
    page(page) {
      this.$http.get(`/tuangous?page=${page}`).then(res => {
        this.tuangous = res.data.tuangous;
      });
    }
  }
};
</script>

