<template>
  <Row type="flex" :gitter="24">
    <Row type="flex" :gutter='12'>
      <Col :span="2">城市:</Col>
      <Col :span="5">
        <Input v-model="merchants.city_name" size="small"></Input>
      </Col>
      <Col :span="2">店名:</Col>
      <Col :span="5">
        <Input v-model="merchants.name" size="small"></Input>
      </Col>
      <Col :span="3">商铺ID:</Col>
      <Col :span="5">
        <Input v-model="merchants.id" size="small"></Input>
      </Col>
      <Col :span="2">
        <Button type="primary" size="small">搜索</Button>
      </Col>
    </Row>
    <Divider dashed />
    <Row>
      <Col :span="6">商家列表</Col>
      <Col :span="3" :offset="15">
        <Button type="error" size="small" @click="remove_all">一键删除</Button>
        <Button type="error" size="small" @click="exportData(1)">导出为Excel</Button>
      </Col>
      <Col :span="24">
        <Table border stripe :columns="columns" :data="merchants" ref="table"></Table>
      </Col>
    </Row>
  </Row>
</template>
<script>
import { Table, Row, Col, Input, Button, Divider } from "iview";
export default {
  components: {
    Table,
    Row,
    Col,
    Input,
    Button,
    Divider
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
          sortable: true,
          
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
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                    }
                  }
                },
                "修改"
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
    },
    remove(index) {
      let merchant = this.merchants[index];
      this.$http.delete(`merchants/${merchant.id}`).then(res => {
        if (res.data.status === 1) {
          this.merchants.splice(index, 1);
          alert(res.data.notice);
        } else {
          alert(res.dasta.notice);
        }
      });
    },
    edit(merchant_id) {
      this.$router.push(`merchants/${merchant_id}/edit`);
    },
    remove_all(){
      this.$http.delete(`merchants/deleteall`).then(res =>{
        if(res.data.status === 1){
          this.merchants = []
          alert(res.data.notice)
        }else{
          alert(res.data.notice)
        }
      })
    },
    exportData(type){
      if(type === 1){
        this.$refs.table.exportCsv({
          filename: 'the original data'
        })
      }
    }
  }
};
</script>
