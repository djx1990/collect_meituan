<template>
  <div>
    <Row>
      <Col><Input />
        <Button type="primary" @click="save">返回</Button>
      </Col>
    </Row>
    <Row>
      111
      <Col>
        <Table border :columns="columns" :data="order"></Table>
      </Col>
      <Col>
        <Page
          :total="total"
          :current="current_page"
          show-total
          show-elevator
          :page-size="25"
          @on-change="page"
        />
      </Col>
    </Row>
  </div>
</template>
<script>
import { Row, Col, Table, Input, Page, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Page,
    Input,
    Button
  },
  data() {
    return {
      total: null,
      current_page: null,
      order: [],
      columns: [
        {
          title: "订单号",
          key: "id"
        },
        {
          title: "订单内容",
          key: "order_content"
        },
        {
          title: "数量",
          key: "order_number"
        },
        {
          title: "单价",
          key: "price"
        },
        {
          title: "总价",
          key: "total_price"
        },
        {
          title: "昵称",
          key: "name"
        },
        {
          title: "电话",
          key: "qhone"
        },
        {
          title: "购买时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "action"
        }
      ]
    };
  },
  created() {
    this.$http.get(`/order/${this.$route.params.id}`).then(res => {
      this.order = res.data.order;
      this.total = res.data.total;
      this.current_page = res.data.current_page;
    });
  },
  methods:{
    page(page){
      this.$http.get(`/order/${this.$route.params.id}?page=${page}`).then(res =>{
        console.log(res)
        this.order = res.data.order
      })
    },
    save(){
      this.$router.push("/order")
    }
  }
};
</script>