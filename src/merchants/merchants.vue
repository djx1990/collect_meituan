<template>
  <Row type="flex" :gitter="24">
    <Col>
      <Table border stripe :columns="columns" :data="merchants"></Table>
    </Col>
  </Row>
</template>
<script>
import { Table, Row, Col, Input } from "iview";
export default {
  components: {
    Table,
    Row,
    Col,
    Input
  },
  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "城市",
          key: "city_name"
        },
        {
          title: "区域",
          key: "areaname"
        },
        {
          title: "平均价格",
          key: "avgprice",
          sortable: true
        },
        {
          title: "平均评分",
          key: "avgscore",
          sortable: true
        },
        {
          title: "分类名称",
          key: "catename"
        },
        {
          title: "商家地址",
          key: "address"
        },
        {
          title: "商家名称",
          key: "name"
        },
        {
          title: "商家电话",
          key: "phone"
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
                  props: {
                    type: "parime"
                  },
                  on: {
                    click: () => {
                      this.show(params.row.id);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      merchants: []
    };
  },
  created() {
    this.$http.get("/merchants").then(res => {
      this.merchants = res.data.merchants;
      console.log(merchants);
    });
  },
  methods: {
    show(merchant_id) {
      console.log(merchant_id);
      this.$router.push(`merchants/${merchant_id}`);
    }
  }
};
</script>
