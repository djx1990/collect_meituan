<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <Table border stripe :columns="columns" :data="maidans"></Table>
    </Col>
    <Col :span="24">
      <Page :total="total" :current="current_page" show-total show-elevator @on-change="page" :page-size="20" />
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Page } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Page
  },
  data() {
    return {
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "商家id",
          key: "merchant_id"
        },
        {
          title: "描述",
          key: "content"
        },
        {
          title: "操作",
          key: "Action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.$router.push(`/maidans/${params.row.id}`);
                      console.log(params.row.id)
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      maidans: [],
      total: 0,
      current_page: 1
    };
  },
  created() {
    this.$http.get(`/maidans`).then(res => {
      this.maidans = res.data.maidans;
      this.total = res.data.total;
      this.current_page = res.data.current_page;
    });
  },
  methods: {
    page(page) {
      this.$http.get(`/maidans?page=${page}`).then(res => {
        this.maidans = res.data.maidans;
      });
    }
  }
};
</script>
