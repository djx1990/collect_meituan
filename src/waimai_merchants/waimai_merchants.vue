<template>
  <Row>
    <Col>
      <Table border stripe :columns="columns" :data="waimai_merchants"></Table>
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
          title: "ID",
          key: "id"
        },
        {
          title: "商户名",
          key: "shop_name"
        },
        {
          title: "商户地址",
          key: "address"
        },
        {
          title: "商户电话",
          key: "phone"
        },
        {
          title: "商户描述",
          key: "desc"
        },
        {
          title: "商户id(外买商户id)",
          key: "mt_wm_poi_id"
        },
        {
          title: "月售",
          key: "month_sales_tip",
          sortable: true
        },
        {
          title: "创建时间",
          key: "created_at"
        }
      ],
      waimai_merchants: []
    };
  },
  created() {
    this.$http.get("/waimai_merchants").then(res => {
      this.waimai_merchants = res.data.waimai_merchants;
    });
  }
};
</script>

