<template>
  <Row type="flex" :gutter="16">
    <Col>
      <Table border stripe :columns="columns" :data="maidans"></Table>
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
          render:(h,params)=>{
            return h("div",[
              h('Button',{
                on:{
                  click:()=>{
                    this.$router.push(`/maidans/${params.row.id}`)
                  }
                }
              },"查看")
            ])
          }
        }
      ],
      maidans: []
    };
  },
  created() {
    this.$http.get(`/maidans`).then(res => {
      this.maidans = res.data.maidans;
    });
  }
};
</script>
