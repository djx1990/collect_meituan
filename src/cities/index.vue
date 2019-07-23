<template>
  <Row type="flex" :gutter="16">
    <Col>
      <Table border strip :columns="columns" :data="cities"></Table>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table } from "iview";
export default {
  components:{
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
          title: "美团城市id",
          key: "ci"
        },
        {
          title: "城市",
          key: "name"
        },
        {
          title: "城市拼音",
          key: "citypinyin"
        },
        {
          title: "创建时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "aciton",
          render:(h,params) =>{
            return h('div',[
              h(
                "Button",{
                  on:{
                    click:()=>{
                      this.$router(`/cities/${params.row.id}`)
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      cities: []
    };
  },
  created() {
    this.$http.get(`/cities`).then(res => {
      this.cities = res.data.cities;
    });
  }
};
</script>

