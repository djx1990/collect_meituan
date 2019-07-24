<template>
  <Row type="flex" :gutter="16">
    <Col :span='24' >
      <Button type="primary" small @click="caijiCities">采集城市</Button>
      <Button small type='error' @click="deleteAll">删除全部</Button>
    </Col :span='24'>
    <Col>
      <Table border strip :columns="columns" :data="cities" style="width:100%"></Table>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Button } from "iview";
export default {
  components:{
    Row,
    Col,
    Table,
    Button
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
                      this.$router.push(`/cities/${params.row.id}`)
                    }
                  }
                },
                '查看'
              ),
              h(
                "Button",{
                  on:{
                    click:()=>{
                      this.caiji(params.row.id)
                    }
                  }
                },
                "采集"
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
  },
  methods:{
    caiji(){
      this.$http.get(`/cities/${this.$route.id}/collect`).then(res =>{
       if(res.data.status === 1){
         alert(res.data.notice)
       }else{
         alert(res.data.notice)
       }
      })
    },
    caijiCities(){
      this.$http.get(`/cities/collectcity`).then(res =>{
        if(res.data.status === 1){
          alert(res.data.notice)
        }else{
          alert(res.data.notice)
        }
      })
    },
    deleteAll(){
      this.$http.delete(`/cities/deleteall`).then(res =>{
        if(res.data.status === 1){
          this.cities= []
          alert(res.data.notice)
        }
      })
    }
  }
};
</script>

