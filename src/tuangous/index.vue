<template>
  <Row type="flex" :gutter="16">
    <Col>
      <Table border stripe :columns="columns" :data="tuangous"></Table>
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
          title: "团购商户id",
          key: "merchant_id"
        },
        {
          title: "原价",
          key: "originprice"
        },
        {
          title: "现价",
          key: "price"
        },
        {
          title: "已售数量",
          key: "solds"
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
          render:(h,params)=>{
            return h('div',[
              h('Button',{
                on:{
                  click:()=>{
                    this.$router.push(`/tuangous/${params.row.id}`)
                  }
                }
              },
              '查看')
            ])
          }
        }
      ],
      tuangous: []
    };
  },
  created() {
    this.$http.get(`/tuangous`).then(res => {
      this.tuangous = res.data.tuangous;
    });
  }
};
</script>

