<template>
  <Row type="flex" :gutter="16">
    <h3>查看商家</h3>
    <Divider /> 
    <Col :span="24">
      <p>城市</p>
      <Input disabled v-model="merchant.city_name"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>区域</p>
      <Input disabled v-model="merchant.areaname"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>平均价格</p>
      <Input disabled v-model="merchant.avgprice"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>平均评分</p>
      <Input disabled v-model="merchant.avgscore"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>分类</p>
      <Input disabled v-model="merchant.catename"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>店名</p>
      <Input disabled v-model="merchant.name"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>商家地址</p>
      <Input disabled v-model="merchant.address"></Input>
    </Col>
    <Divider />
        <Col :span="24">
      <p>商家电话</p>
      <Input disabled v-model="merchant.phone"></Input>
    </Col>
    <Divider />
        <Col :span="24">
      <p>商家图片</p>
      <Input disabled v-model="merchant.frontimg"></Input>
    </Col>
    <Divider />
  </Row>
</template>
<script>
import { Row, Col, Input, Divider } from "iview";
export default {
  components: {
    Row,
    Col,
    Input,
    Divider
  },
  data() {
    return {
      merchant: []
    };
  },
  created() {
    this.$http.get(`/merchants/${this.$route.id}`).then(res => {
      this.merchant = res.data.merchant;
    });
  }
};
</script>

