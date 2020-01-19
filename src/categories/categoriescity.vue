<template>
  <div>
    <Row type="flex" :gutter="2">
      <Col :span="20">
        <Select filterable clearable v-model="city_id" placeholder="请选择城市" style="width: 20%; margin-right: 1rem">
          <Option v-for="city in cities" :value="city.id" :key="city.id" :label="city.name"></Option>
        </Select>
        <Button @click='getCategories(1)' type="primary">搜索</Button>
      </Col>
    </Row>
    <Table border stripe :columns="columns" :data="categories"></Table>
    <Page :total="total" :current="current_page" show-total show-elevator :page-size="25" @on-change="page" />
  </div>
</template>
<script>
import { Row, Col, Table, Select, Option, Page, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Select,
    Option,
    Page,
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
          title: "分类名称",
          key: "name"
        },
        {
          title: "分类数量",
          key: "number"
        },
        {
          title: "美团分类id",
          key: "cate_id"
        },
        {
          title: "创建时间",
          key: "created_at"
        },
        {
          title: "分类下的商户数量",
          key: "merchant_count"
        }
      ],
      categories: [],
      cities: [],
      city_id: null,
      total: 0,
      current_page: 1
    };
  },
  created() {
    this.getCategories(this.current_page)
    this.$http.get(`/cities`).then(res => {
      this.cities = res.data.cities;
    });
    this.city_id = this.$route.params.id;
  },
  methods: {
    getCategories (page) {
      this.$http.get(`/categories?page=${page}&city_id=${this.city_id}`).then(res => {
        this.categories = res.data.categories;
        this.total = res.data.total;
        this.current_page = res.data.current_page
      })
    },
    searchByCity(value) {
      this.$http.get(`/categories?city_id=${value}`).then(res => {
        this.categories = res.data.categories;
        this.total = res.data.total;
      });
    },
    clear() {
      this.$http.get(`/categories`).then(res => {
        this.categories = res.data.categories;
        this.total = res.data.total;
      });
      // this.$router.push("/categories").then(res =>{
      //   this.categories = res.data.categories;
      // })
    },
    page(page) {
      this.$http
        .get(`/categories?city_id=${this.city_id || ""}&page=${page}`)
        .then(res => {
          this.categories = res.data.categories;
          this.total = res.data.total;
        });
    }
  }
};
</script>
