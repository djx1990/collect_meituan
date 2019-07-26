<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <Button type="error" @click="del">删除全部</Button>
    </Col>
    <Col :span='24'>
      <Table border stripe :columns="columns" :data="ip_addresses"></Table>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Button
  },
  data() {
    return {
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "ip",
          key: "url"
        },
        {
          title: "端口号",
          key: "port"
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
                      this.$router.push(`/ip_addresses/${params.row.id}`);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      ip_addresses: []
    };
  },
  created() {
    this.$http.get(`/ip_addresses`).then(res => {
      this.ip_addresses = res.data.ip_addresses;
    });
  },
  methods: {
    del() {
      this.$http.delete(`/ip_addresses/deleteall`).then(res => {
        if (res.data.status === 1) {
          this.ip_addresses = [];
          alert(res.data.notice);
        }
      });
    }
  }
};
</script>
