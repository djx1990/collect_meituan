<template>
  <Row type="flex" :gutter="16">
    <Col :span="24"> 
      城市:
      <Input search v-model='query' @on-search="search" style="width:200px;margin:20px"></Input>
      </Col>
      <Divider/>
    <Col :span='24' >
      <Button type="primary" small @click="caijiCities" style="margin:20px; margin-left:0px">采集城市</Button>
      <Button small type='error' @click="deleteAll" style="margin-buttom:20px">删除全部</Button>
    </Col :span='24'>
    <Col>
      <Table border strip :columns="columns" :data="cities" style="width:100%"></Table>
    </Col>
    <Col :span='24'>
      <Page 
        :total='total'
        :current="current_page"
        :page-size="20"
        show-total
        show-elevator
        @on-change="page"
      />
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Button, Input, Divider, Page } from "iview";
export default {
  components:{
    Row,
    Col,
    Table,
    Button,
    Input,
    Divider,
    Page
  },
  data() {
    return {
      query:'',
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
                      this.caijishanghu(params.row.id)
                    }
                  }
                },
                "采集商户"
              ),
              h(
                "Button",{
                  on:{
                    click:()=>{
                      this.caijicategories(params.row.id)
                    }
                  }
                },
                "采集城市分类"
              )
            ])
          }
        }
      ],
      cities: [],
      city:{
        id:''
      },
      total:0,
      current_page:1
    };
  },
  created() {
    this.$http.get(`/cities`).then(res => {
      this.cities = res.data.cities;
      this.total = res.data.total
      this.current_page = res.data.current_page
    });
  },
  methods:{
    caijicategories(cityId){
      console.log(cityId,111)
      this.$http.get(`/categories/cate_collect?city_id=${cityId}`).then(res =>{
        if(res.data.status){
          alert(res.data.notice)
        }
      })
    },
    caijishanghu(cityId){
      console.log(cityId,111)
      this.$http.get(`/cities/${cityId}/collect`).then(res =>{
        console.log(this.cities,111)
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
    },
    search(){
      if(this.query == ''){
        this.$http.get(`/cities?query=${this.query}`).then(res =>{
          this.cities = res.data.cities
        })
      }else{
        this.cities = this.cities.filter(val =>{
          return val.name.includes(this.query)
        })
      }
    },
    page(page){
      this.$http.get(`/cities?page=${page}`).then(res =>{
        this.cities = res.data.cities
      })
    }
  }
};
</script>

