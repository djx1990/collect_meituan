<template>
  <div>
    <Row>
      <Col>
        <Select style="width: 100px" v-model="status" placeholder="请选择状态" filterable clearable>
          <Option v-for="(s,index) in statusList" :value="s.value" :key="index">{{ s.label }}</Option>
        </Select>
        <DatePicker style="margin-left: 1rem; margin-bottom: 1rem " type="daterange" placeholder="选择日期和时间" v-model="start_at" split-panels></DatePicker>
        <Button style="margin-left: 1rem" type="primary" @click="getOrder(1)">搜索</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table border :columns="columns" :data="order" @on-sort-change="sortableOrder"></Table>
      </Col>
      <Col>
        <Page
          :total="total"
          :current="current_page"
          show-total
          show-elevator
          :page-size="25"
          @on-change="getOrder"
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button type="primary" @click="save">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import { Row, Col, Table, Input, Page, Button, Select, Option, DatePicker } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Page,
    Input,
    Button,
    Select,
    Option,
    DatePicker
  },
  data() {
    return {
      status: [],
      statusList: [
        {
          value: "",
          label: "所有状态"
        },
        {
          value: "-2",
          label: "已取消"
        },
        {
          value: "-1",
          label: "已退款"
        },
        {
          value: "0",
          label: "待支付"
        },
        {
          value: "1",
          label: "已支付"
        }
      ],
      total: null,
      start_at: "",
      current_page: null,
      order_order:'',
      order: [],
      columns: [
        {
          title: "订单号",
          key: "id"
        },
        {
          title: "订单内容",
          key: "order_content"
        },
        {
          title: "数量",
          key: "order_number",
          sortable: "custom"
        },
        {
          title: "单价",
          key: "price"
        },
        {
          title: "总价",
          key: "total_price"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h(
              "div",
              ["已取消", "已退款", "待支付", "已支付"][params.row.status + 2]
            );
          }
        },
        {
          title: "昵称",
          key: "name"
        },
        {
          title: "电话",
          key: "qhone"
        },
        {
          title: "购买时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "action",
          render:(h,params)=>{
            return h("div",[
              h("button",{
                on:{
                  click:()=>{
                    this.top(params.row)
                     console.log(params.row.status)
                  }
                }
              },"置顶"
              )
            ])
            if(params.row.status === 1){
              return h("div",[
                h("Button",{
                  on:{
                    click:()=>{
                      this.showRefund(params.row)
                    }
                  }
                },"退款")
              ])
            }
          }
        }
      ]
    };
  },
  activated() {
    this.getOrder(1);
  },
  // created() {
  //   this.$http.get(`/order/${this.$route.params.id}`).then(res => {
  //     this.order = res.data.order;
  //     this.total = res.data.total;
  //     this.current_page = res.data.current_page;
  //   });
  // },
  methods: {
    // page(page) {
    //   this.$http
    //     .get(`/order/${this.$route.params.id}?page=${page}`)
    //     .then(res => {
    //       console.log(res);
    //       this.order = res.data.order;
    //     });
    // },
    getOrder(page) {
      let url = `/order/${this.$route.params.id}?page=${page}`;
      if (this.status) {
        url += `&status=${this.status}`;
      }
      if (this.start_at) {
        url += `&start_at=${this.start_at}`;
      }
      if (this.order_order) {
        url += `&order=${this.order_order}`;
      }
      this.$http.get(url).then(res => {
        this.order = res.data.order;
        this.total = res.data.total;
        this.current_page = res.data.current_page;
      });
    },
    sortableOrder(params) {
      this.order_order = params.order;
      this.getOrder(1);
    },
    save() {
      this.$router.push("/order");
    },
    top(row){
      this.$http.put(`/put/${this.$route.params.id}/${row.id}/top`).then(res =>{
        if(res.data.status === 1){
          this.order = res.data.order
        }
      })
    }
  }
};
</script>