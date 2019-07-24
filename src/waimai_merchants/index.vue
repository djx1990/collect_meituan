<template>
  <Row type="flex" :gutter="12">
    <Col :span="24">
      商户名：
      <Input search v-model="query1" @on-search="search1" style="width:200px"></Input>
    </Col>
    <Select filterable @on-change="searchByCity">
      <Option v-for="city in cities" :value="city.id" :key="city.id" :label="city.name"></Option>
    </Select>
    <Select filterable>
      <Option
        v-for="category in categories"
        :value="category.id"
        :key="category.id"
        :label="category.name"
      ></Option>
    </Select>
    <Divider dashed />
    <Col :span="24">
      <Table border stripe :columns="columns" :data="waimai_merchants"></Table>
    </Col>
    <Col>
      <Page
        :total="total"
        :current="current_page"
        show-tatal
        show-elevator
        page-size="10"
        @on-change="page"
      />
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Page, Input, Divider, Select, Option } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Page,
    Input,
    Divider,
    Select,
    Option
  },
  data() {
    return {
      categories: [],
      query: "",
      query1: "",
      citiesFilter: [],
      cities: [],
      loading: false,
      columns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "商户名",
          key: "shop_name"
        },
        {
          title: "商户地址",
          key: "address"
        },
        {
          title: "商户电话",
          key: "phone"
        },
        {
          title: "商户描述",
          key: "desc"
        },
        {
          title: "商户id(外买商户id)",
          key: "mt_wm_poi_id"
        },
        {
          title: "月售",
          key: "month_sales_tip",
          sortable: true
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(`/waimai_merchants/${params.row.id}`);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  style: {
                    marginRight: "5px"
                  },
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        `/waimai_merchants/${params.row.id}/edit`
                      );
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      waimai_merchants: [],
      total: '',
      current_page: 1
    };
  },
  created() {
    this.$http.get("/cities/list").then(res => {
      this.cities = res.data.cities;
    });
    this.$http.get("/waimai_merchants").then(res => {
      this.waimai_merchants = res.data.waimai_merchants;
      this.total = res.data.total;
      this.current_page = res.data.current_page;
      console.log(res.data.total);
    });
  },
  methods: {
    page(page) {
      this.$http.get(`/waimai_merchants?page=${page}`).then(res => {
        this.waimai_merchants = res.data.waimai_merchants;
        this.total = res.data.total
        this.current_page = res.data.current_page;
        
      });
    },
    remove(index) {
      let waimai_merchants = this.waimai_merchants[index];
      this.$http
        .delete(`/waimai_merchants/${waimai_merchants.id}`)
        .then(res => {
          if (res.data.status === 1) {
            this.waimai_merchants.splice(index, 1);
            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    },
    search1() {
      if (this.query1 == "") {
        this.$http.get(`/waimai_merchants?query1=${this.query1}`).then(res => {
          this.waimai_merchants = res.data.waimai_merchants;
        });
      } else {
        this.waimai_merchants = this.waimai_merchants.filter(val => {
          return val.shop_name.includes(this.query1);
        });
      }
    },
    searchByCity(value) {
      this.$http.get(`/categories/list?city_id=${value}`).then(res => {
        this.categories = res.data.categories;
        console.log(this.categories);
      });
    }
    // get_selected() {
    //   let cities1 = this.cities.map(item => {
    //     return {
    //       value: item.id,
    //       label: item.name
    //     };
    //   });
    //   console.log(cities1, 11);
    //   this.citiesFilter = cities1.filter(val => {
    //     return val;
    //   });
    //   // console.log(this.citiesFilter,this.cities)
    // },
    // search(query) {
    //   if (query !== "") {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       console.log("远程搜索");
    //     }, 200);
    //   }
    // }
  }
};
</script>

