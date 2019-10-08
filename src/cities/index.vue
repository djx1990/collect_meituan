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
    <Col :span='3'>商户数量：</Col>
    <Col :span="4">
      <Select size='small' filterable @on-change="searchByMerchantsCount" clearable v-model="merchantCount" @on-clear="clearMerchantsCount">
        <Option 
        v-for="(merchant_count, index) in merchant_counts" 
        :value="merchant_count.value" 
        :key="merchant_count.value" 
        :label="merchant_count.lable">
        </Option>
      </Select> 
    </Col>
    <Col :span='3'>分类数量：</Col>
    <Col :span="4">
      <Select size='small' filterable @on-change="searchByCategoryCount" clearable v-model="categoryCount" @on-clear="clearCategoryCount">
        <Option 
        v-for="category_count in category_counts" 
        :value="category_count.value" 
        :key="category_count.value" 
        :label="category_count.lable">
        </Option>
      </Select> 
    </Col>
    <Col>
      <Table 
      border 
      strip 
      :columns= "columns" 
      :data= "cities" 
      style= "width:100%"
      @on-sort-change="sort"></Table>
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
import { Icon, Row, Col, Table, Button, Input, Select, Option, Divider, Page} from "iview";
export default {
  components:{
    Icon,
    Row,
    Col,
    Table,
    Button,
    Input,
    Select,
    Option,
    Divider,
    Page
  },
  data() {
    return {
      showCitiesCollect: "false",
      merchantCount: '',
      merchant_counts:[
        {
          value: 1,
          lable: "0-200"
        },
        {
          value: 2,
          lable: '200-999'
        },
        {
          value: 3,
          lable: '1000-10000'
        }
      ],
      categoryCount:'',
      category_counts:[
        {
          value: 1,
          lable: "0-99"
        },
        {
          value: 2,
          lable: '100-199'
        },
        {
          value: 3,
          lable: '200-1000'
        }
      ],
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
          title: "商家数量",
          key: 'merchants_count',
          sortable: 'custom',
          // filters:[
          //   {
          //     label:"0-200",
          //     value:1
          //   },
          //   {
          //     label:"201-999",
          //     value:2
          //   },
          //   {
          //     label:">1000",
          //     value:3
          //   }
          // ],
          // renderHeader:(h,params)=>{
          //   return h('span',[
          //     h(
          //       'button',{
          //         on:{
          //          click:()=>{
          //            this.merchantsUp(params.index)
          //          } 
          //         }
          //       },'up'),
          //     h("strong",params.column.title)
          //   ])
          // }
        },
        {
          title: "分类数量",
          key: "categories_count",
          sortable:"custom"
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
                      // this.$router.push(`/categories/${city_id}`)
                      // console.log(city_id)
                      this.showCategories(params.row.id)
                    }
                  }
                },
                '查看分类'
              ),
              h(
                "Button",
                {
                  props:{
                    type:'primary'
                  },
                  on:{
                    click:()=>{
                      this.showMerchants(params.row.id)
                    } 
                  }
                },
                "查看商家"
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
    showCategories(cityId){
      this.$router.push(`/categoriescity/${cityId}`)
      console.log(cityId,111)
    },
    showMerchants(cityId){
      this.$router.push(`/merchantscity/${cityId}`)
    },
    caijicategories(cityId){
      console.log()
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
    },
    sort(column){
      console.log(column)
      console.log(column.key, 111)
      console.log(column.order)
      if(column.key == 'merchants_count'){
        console.log(column.key, 111)
        this.$http.get(`/cities?merchants_order=${column.order}`).then(res =>{
          this.cities = res.data.cities
        })
      }else if(column.key == 'categories_count'){
        console.log(column.key, 111)
        this.$http.get(`/cities?categories_order=${column.order}`).then(res =>{
          this.cities = res.data.cities
        })
      }
    },
    searchByMerchantsCount(){
      if(this.merchantCount == 1){
        this.$http.get(`/cities?merchants_min=${0}&merchants_max=${200}`).then(res =>{
          this.cities = res.data.cities
        }) 
      }else if(this.merchantCount == 2){
        this.$http.get(`/cities?merchants_min=${201}&merchants_max=${999}`).then(res =>{
          this.cities = res.data.cities
        })
      }else if(this.merchantCount == 3){
        this.$http.get(`/cities?merchants_min=${1000}&merchants_max=${10000}`).then(res =>{
          this.cities = res.data.cities
        })
      }  
    },
    clearMerchantsCount(){
      this.$http.get('/cities').then(res =>{
        this.cities = res.data.cities
      })
    },
    searchByCategoryCount(){
      if(this.categoryCount === 1){
        this.$http.get(`/cities?categories_min=${0}&categories_max=${99}`).then(res =>{
          this.cities = res.data.cities
        })
      }else if(this.categoryCount === 2){
        this.$http.get(`/cities?categories_min=${100}&categories_max=${199}`).then(res =>{
          this.cities = res.data.cities
        })
      }else if(this.categoryCount === 3){
        this.$http.get(`/cities?categories_min=${200}&categories_max=${1000}`).then(res =>{
          this.cities = res.data.cities
        })
      }
    },
    clearCategoryCount(){
      this.$http.get('/cities').then(res =>{
        this.cities = res.data.cities
      })
    },
  },
};
</script>

