<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <Table border stripe :columns="columns" :data="daijinjuans"></Table>
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
          title: "代金券id",
          key: "merchant_id"
        },
        {
          title: "原价",
          key: "originprice",
          sortable: true
        },
        {
          title: "现价",
          key: "price",
          sortable: true
        },
        {
          title: "已售数量",
          key: "solds",
          sortable: true
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
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.$router.push(`/daijinjuans/${params.row.id}`);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.$router.push(`/daijinjuans/${params.row.id}/edit`);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      daijinjuans:[]
    };
  },
  created() {
   this.$http.get(`/daijinjuans`).then(res => {
      this.daijinjuans = res.data.daijinjuans;
    });
  }
};
</script>