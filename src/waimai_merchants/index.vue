<template>
  <Row type="flex" :gutter="12">
    <Col :span="24">
      <Table border stripe :columns="columns" :data="waimai_merchants"></Table>
    </Col>
    <Col>
      <Page :total="100" show-elevator @on-change="page" />
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
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(`/waimai_merchants/${params.row.id}`);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                'Button',{
                  style:{
                   marginRight:'5px'
                  },
                  on:{
                    click:()=>{
                      this.$router.push(`/waimai_merchants/${params.row.id}/edit`)
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      waimai_merchants: []
    };
  },
  created() {
    this.$http.get("/waimai_merchants").then(res => {
      this.waimai_merchants = res.data.waimai_merchants;
    });
  },
  methods: {
    page(page) {
      this.$http.get(`/waimai_merchants?page=${page}`).then(res => {
        this.waimai_merchants = res.data.waimai_merchants;
      });
    },
    remove(index) {
      let waimai_merchants = this.waimai_merchants[index];
      this.$http
        .delete(`/waimai_merchants/${waimai_merchants.id}`)
        .then(res => {
          if (res.data.status === 1) {
            this.waimai_merchants.splice(index, 1);
            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    }
  }
};
</script>

