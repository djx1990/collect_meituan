<template>
  <Row type="flex" :gutter="16">
    <Col>
      <Table border stripe :columns="columns" :data="ip_addresses"></Table>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table } from "iview";
export default {
  components: {
    Row,
    Col,
    Table
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
          title: "",
          key: ""
        }
      ],
      ip_addresses: []
    };
  },
  created() {
    this.$http.get(`/ip_addresses`).then(res => {
      this.ip_addresses = res.data.ip_addresses;
    });
  }
};
</script>
