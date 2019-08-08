<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <Button type="error" @click="del">删除全部</Button>
      <Button type="error" @click="collect">采集</Button>
    </Col>
    <Col :span="24">
      <Table border stripe :columns="columns" :data="ip_addresses"></Table>
    </Col>
    <Col :span="24">
      <Page :total="total" :current="current_page" show-total show-elevator @on-change="page" />
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Button, Page } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Button,
    Page
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
          key: "created_at",
          sortable: true
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
                      this.$router.push(`/ip_addresses/${params.row.id}`);
                      console.log(params.row.id)
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      ip_addresses: [],
      total: 0,
      current_page: 1
    };
  },
  created() {
    this.$http.get(`/ip_addresses`).then(res => {
      this.ip_addresses = res.data.ip_addresses;
      this.total = res.data.total;
      this.current_page = res.data.current_page;
    });
  },
  methods: {
    del() {
      this.$http.delete(`/ip_addresses/deleteall`).then(res => {
        if (res.data.status === 1) {
          this.ip_addresses = [];
          alert(res.data.notice);
        }
      });
    },
    collect() {
      this.$http.get(`/ip_addresses/collect_ip`).then(res => {
        if (res.data.status === 1) {
          alert(res.data.notice);
          console.log(res);
        } else {
          alert(res.data.notice);
        }
      });
    },
    page(page){
      this.$http.get(`/ip_addresses?page=${page}`).then(res =>{
        this.ip_addresses = res.data.ip_addresses
      })
    }
  }
};
</script>
