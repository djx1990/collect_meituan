<template>
  <div>
    <Row style="margin-bottom: 1rem" >
      <Col :span="21">
      <Input v-model="shop_name" clearable placeholder="请输入商户名字" style="width:20%"></Input>
      <DatePicker
        type="daterange"
        v-model="created_at"
        placeholder="选择日期和时间"
        split-panels
        style="width:20%; margin-left: 1rem"
      ></DatePicker>
      <Button type="primary" @click="getMerchants(1)" style="margin-left: 1rem">搜索</Button>
      </Col>
      <Col :span="3">
        <Button type= "primary" to='/merchantsM/new'>新建商户</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="merchants"></Table>
    <Page
      show-total
      show-elevator
      :page-size="25"
      :total="total"
      :current="current_page"
      @on-change="getMerchants"
    ></Page>
  </div>
</template>

<script>
import { Row, Col, Button, Table, Page, Input, DatePicker } from "iview";
export default {
  components: {
    Row,
    Col,
    Button,
    Table,
    Page,
    Input,
    DatePicker
  },
  data() {
    return {
      shop_name:null,
      created_at:null,
      total: null,
      current_page: 1,
      merchants:[],
      columns:[
        {
          title:'店名',
          key:"shop_name"
        },
        {
          title:'地址',
          key:"address"
        },
        {
          title:'联系人',
          key:"real_name"
        },
        {
          title:'电话',
          key:"mobile"
        },

        {
          title:'验证码',
          key:"secret"
        },
        {
          title:'余额',
          key:"balance",
          render:(h,params)=>{
            return h("div", this.fenChange(params.row.balance) + "元")
          }
        },
        {
          title:'验证条数',
          key:"secret_number"
        },
        {
          title:'创建时间',
          key:"created_at"
        },
        {
          title:'操作',
          key:"action",
          render:(h,params)=>{
            return h("div",[
              h("Button",{
                on:{
                  click:()=>{
                    this.$router.push(`/merchantsM/${params.row.id}/edit`)
                  }
                }
              },"编辑"),
              h("Button",{
                style:{
                  background:'red'
                },
                on:{
                  click:()=>{
                    this.remove(params.index)
                  }
                }
              },"删除")
            ])
          }
        },
      ]
    };
  },
  activated(){
    this.getMerchants(1)
  },
  methods:{
    getMerchants(page){
      let url = `/merchantsMList?page=${page}`
      if(this.shop_name){
        url += `&shop_name=${this.shop_name}`
      }
      if(this.created_at){
        url += `&created_at=${this.created_at}`
      }
      this.$http.get(url).then(res => {
        this.merchants = res.data.merchants
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    remove(index){
      let merchantsM = this.merchants[index]
      this.$http.delete(`/merchantsMList/${merchantsM.id}`).then(res =>{
        if(res.data.status === 1){
          console.log(111)
          this.merchantsM.splice(index,1)
        }
      })
    }
  }
};
</script>