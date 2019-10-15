<template>
  <div>
    <Row>
      <Input v-model="city.id" clearable placeholder="请输入城市名字"></Input>
      <Button type="primary" @click="getWaimai_order(1)">搜索</Button>
    </Row>
    <Row>
      <Col>
        <Table border :columns="column" :data="waimai_order"></Table>
      </Col>
      <Col>
        <Page
          :total="total"
          :current="current_page"
          show-total
          show-elevator
          :page-size="25"
          @on-change="getWaimai_order"
        ></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import { Table, Row, Col, Button, Page, Input } from "iview";
export default {
  components: {
    Table,
    Row,
    Col,
    Button,
    Page,
    Input
  },
  data() {
    return {
      city:{
        id:''
      },
      waimai_order: [],
      total: null,
      current_page: null,
      column: [
        {
          title: "区域",
          key: "city_name"
        },
        {
          title: "订单号",
          key: "id"
        },
        {
          title: "商店名字",
          key: "shop_name"
        },
        {
          title: "配送员",
          key: "marki"
        },
        {
          title: "配送元电话",
          key: "marki_phone"
        },
        {
          title: "下单时间",
          key: "created_at"
        },
        // {
        //   title: "操作",
        //   key: "action",
        //   render: (h, params) => {
        //     return h("div", [
        //       h("button", {
        //         on: {
        //           click: () => {
        //             this.remove(params.row.index);
        //           }
        //         }
        //       })
        //     ])
        //   }
        // }
      ]
    };
  },
  activated(){
    this.getWaimai_order(1)
  },
  methods:{
    getWaimai_order(page){
      let url = `/waimai_order?page=${page}`
      if(this.city.id){
        url += `&city_id=${this.city.id}`
      }
      this.$http.get(url).then(res =>{
        console.log(res)
        this.waimai_order = res.data.waimai_order
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    }
  }
};
</script>>