<template>
  <Row type="flex" :gutter="16">
    <Col>
      <Select filterable @on-change="searchByCity">
        <Option v-for="city in cities" :value="city.id" :key="city.id" :label="city.name"></Option>
      </Select>
    </Col>
    <Col>
      <Table border stripe :columns="columns" :data="categories"></Table>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Select, Option } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Select,
    Option
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
      cities: []
    };
  },
  created() {
    this.$http.get(`/categories`).then(res => {
      this.categories = res.data.categories;
    });
    this.$http.get(`/cities`).then(res => {
      this.cities = res.data.cities;
    });
  },
  methods: {
    searchByCity(value) {
      this.$http.get(`/categories/list?city_id=${value}`).then(res => {
        this.categories = res.data.categories;
        console.log(this.categories);
      });
    }
  }
};
</script>
