<template>
  <div>
    <Row>
      <Input v-model="city.id" clearable placeholder="请输入城市名字" style="width:20%"></Input>
      <DatePicker
        type="daterange"
        placeholder="选择查询时间"
        style="width:20%"
        :split-panels="true"
        clearable
        v-model="searchTime"
      />
      <Button type="primary" @click="getWaimai_order(1)">搜索</Button>
    </Row>
    <Row>
      <Col>
        <Table border :columns="column" :data="waimai_order" @on-sort-change="sortableOrder"></Table>
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
import { Table, Row, Col, Button, Page, Input, DatePicker } from "iview";
export default {
  components: {
    Table,
    Row,
    Col,
    Button,
    Page,
    Input,
    DatePicker
  },
  data() {
    return {
      order: "",
      searchTime: "",
      city: {
        id: ""
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
          title: "id",
          key: "id"
        },
        {
          title: "商店名字",
          key: "shop_name"
        },
        {
          title: "订单内容",
          key: "shop_package"
        },
        {
          title: "平均价格（元）",
          key: "average_price",
          render: (h, params) => {
            return h("div", this.fenChange(params.row.average_price));
          }
        },
        {
          title: "订单数量",
          key: "order_number",
          sortable: "custom"
        },
        {
          title: "商家电话",
          key: "shop_phone"
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
                      this.$router.push(`/order/${params.row.id}`);
                    }
                  }
                },
                "查看商家订单"
              )
            ]);
          }
        }
      ]
    };
  },
  activated() {
    this.getWaimai_order(1);
  },
  methods: {
    getWaimai_order(page) {
      let url = `/waimai_order?page=${page}`;
      if (this.city.id) {
        url += `&city_id=${this.city.id}`;
      }
      if (this.searchTime) {
        url += `&searchTime=${this.searchTime}`;
      }
      if (this.order) {
        url += `&order=${this.order}`;
      }
      this.$http.get(url).then(res => {
        this.waimai_order = res.data.waimai_order;
        this.total = res.data.total;
        this.current_page = res.data.current_page;
      });
    },
    sortableOrder(params) {
      this.order = params.order;
      this.getWaimai_order(1);
    }
  }
};
</script>>