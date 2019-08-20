<template>
  <Row type="flex" :gitter="24">
    <Row type="flex" :gutter="12">
      <!-- <Col :span="2">城市:</Col>
      <Col :span="5">
        <Input v-model="query" size="small" search @on-search="search"></Input>
      </Col>
      <Col :span="2">店名:</Col>
      <Col :span="5">
        <Input v-model="query1" size="small" search @on-search="search1"></Input>
      </Col>
      <Col :span="2">分类:</Col>
      <Col :span="5">
        <Input v-model="query2" size="small" search @on-search="search2"></Input>
      </Col>-->
      <Col :span="10">
        <Select filterable @on-change="searchByCity" clearable v-model="city.id">
          <Option v-for="city in cities" :value="city.id" :key="city.id" :label="city.name"></Option>
        </Select>
      </Col>
      <Col :span="10">
        <Select filterable clearable v-model="category.id" @on-change="searchByCategory">
          <Option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
            :label="category.name"
          ></Option>
        </Select>
      </Col>
      <Col :span="4">
        <Button @click="search">搜索</Button>
      </Col>
      <!-- <Col :span="2">
        <Button type="primary" size="small" @click="search">搜索</Button>
      </Col>-->
    </Row>
    <Divider dashed />
    <Row>
      <Col :span="6">
        <h1>商家列表</h1>
      </Col>
      <Col :span="3" :offset="15">
        <Button type="error" size="small" @click="remove_all">一键删除</Button>
        <Button type="error" size="small" @click="export1" v-if="show2" v-model="city.name">导出为Excel</Button>
        <Button type="error" size="small" @click="down" v-if="show1">下载Excel</Button>
      </Col>
      <Col :span="24">
        <Table border stripe :columns="columns" :data="merchants" ref="table"></Table>
      </Col>
    </Row>
    <Row type="flex" :gutter="24">
      <Col :span="24">
        <Page
          :total="total"
          :current="current_page"
          :page-size="20"
          show-total
          show-elevator
          @on-change="page"
        ></Page>
      </Col>
    </Row>
  </Row>
</template>
<script>
import {
  Table,
  Row,
  Col,
  Input,
  Button,
  Divider,
  Page,
  Select,
  Option
} from "iview";
export default {
  components: {
    Table,
    Row,
    Col,
    Input,
    Button,
    Divider,
    Page,
    Select,
    Option
  },
  data() {
    return {
      query: "",
      query1: "",
      query2: "",
      merchantsSearch: [],
      show2: true,
      show1: false,
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
          sortable: true
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
                      this.edit(params.row.id);
                    }
                  }
                },
                "修改"
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
              )
            ]);
          }
        }
      ],
      merchants: [],
      total: 0,
      current_page: 1,
      cities: [],
      categories: [],
      category: {
        id: "",
        name: ""
      },
      city: {
        id: "",
        name: ""
      }
    };
  },
  created() {
    this.$http.get(`/cities/list`).then(res => {
      this.cities = res.data.cities;
    });
    this.$http
      .get(`/merchants?page=${1}&city_id=${this.$route.params.id}`)
      .then(res => {
        this.merchants = res.data.merchants;
        this.total = res.data.total;
        this.current_page = res.data.current_page;
      });
    // this.$http.get(`/merchants?page=${1}&city_id=${""}`).then(res =>{
    //   if(city_id === this.$route.params.id){
    //     let that = this
    //     this.$http.get(`/merchants?page=${1}&city_id=${that.$route.params.id}`).then(res =>{
    //       this.merchants = res.data.merchants
    //       this.total= res.data.total
    //     })
    //   }else{
    //     this.merchants = res.data.merchants
    //     this.total = res.data.total
    //   }
    // })
  },
  methods: {
    show(merchant_id) {
      console.log(merchant_id);
      this.$router.push(`merchants/${merchant_id}`);
    },
    remove(index) {
      let merchant = this.merchants[index];

      this.$http.delete(`merchants/${merchant.id}`).then(res => {
        console.log(111);
        if (res.data.status === 1) {
          this.merchants.splice(index, 1);
          alert(res.data.notice);
        } else {
          alert(res.dasta.notice);
        }
      });
    },
    edit(merchant_id) {
      console.log(111, merchant_id);
      this.$router.push(`merchants/${merchant_id}/edit`);
    },
    remove_all() {
      this.$http.delete(`merchants/deleteall`).then(res => {
        if (res.data.status === 1) {
          this.merchants = [];
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    },
    export1() {
      // if (type === 1) {
      //   this.$refs.table.exportCsv({
      //     filename: "the original data"
      //   });
      // }
      this.$http
        .get(`/merchants/export_excel?city_name=${this.city.name}`)
        .then(res => {
          console.log(111, this.city.name);
          if (res.data.status === 1) {
            this.show2 = false;
            this.show1 = true;
            alert(res.data.notice);
          }
        });
    },
    down() {
      this.$http
        .get(`/merchants/excel_file_path?city_id=${this.city.id}`)
        .then(res => {
          if (res.data.status === 1) {
            this.show1 = false;
            this.show2 = true;
            alert("正在下载");
          }
        });
    },
    page(page) {
      this.$http
        .get(`/merchants?city_id=${this.city.id || ""}&page=${page}`)
        .then(res => {
          this.merchants = res.data.merchants;
          this.total = res.data.total;
          console.log(this.city.id);
        });
    },
    // search() {
    //   if (this.query == "") {
    //     this.$http.get(`/merchants?query=${this.query}`).then(res => {
    //       this.merchants = res.data.merchants;
    //     });
    //   } else {
    //     this.merchants = this.merchants.filter(val => {
    //       return val.city_name.includes(this.query);
    //     });
    //   }
    // },
    // search2() {
    //   if (this.query2 == "") {
    //     this.$http.get(`/merchants?query2=${this.query2}`).then(res => {
    //       this.merchants = res.data.merchants;
    //     });
    //   } else {
    //     this.merchants = this.merchants.filter(val => {
    //       return val.catename.includes(this.query2);
    //     });
    //   }
    // },
    // search1() {
    //   if (this.query1 == "") {
    //     this.$http.get(`/merchants?query2=${this.query1}`).then(res => {
    //       this.merchants = res.data.merchants;
    //     });
    //   } else {
    //     this.merchants = this.merchants.filter(val => {
    //       return val.name.includes(this.query1);
    //     });
    //   }
    // },
    searchByCity(value) {
      this.$http.get(`/categories/list?city_id=${value || ""}`).then(res => {
        this.categories = res.data.categories;
      });
      this.$http.get(`/merchants?page=${page}&city_id=${value}`).then(res => {
        this.merchants = res.data.merchants;
        this.total = res.data.total;
      });
    },
    searchByCategory(category_id) {
      this.$http.get(`/merchants?category_id=${this.category.id}`).then(res => {
        this.merchants = res.data.merchants;
        this.total = res.data.total;
      });
    },
    // clearCategory() {
    //   this.$http
    //     .get(`/merchants?city_id=${this.city.id || ""}&category_id=${""}`)
    //     .then(res => {
    //       this.merchants = res.data.merchants;
    //       this.total = res.data.total;
    //       console.log(this.city.id, 111);
    //     });
    // },
    // clearCity() {
    //   console.log(111);
    //   this.$http.get(`/merchants`).then(res => {
    //     this.merchants = res.data.merchants;
    //     this.total = res.data.total;
    //   });
    // },
    search() {
      this.$http
        .get(
          `/merchants?city_id=${this.city.id || ""}&category_id=${this.category
            .id || ""}`
        )
        .then(res => {
          this.merchants = res.data.merchants;
          this.total = res.data.total;
        });
    }
  }
};
</script>
