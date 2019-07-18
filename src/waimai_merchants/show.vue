<template>
  <Row type="flex" :gutter="12">
    <Col :span="24">
      <p>ID</p>
      <Input disabled v-model="waimaiMerchant.id" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>商户名</p>
      <Input disabled v-model="waimaiMerchant.shop_name" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>商户地址</p>
      <Input disabled v-model="waimaiMerchant.address" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>商户电话</p>
      <Input disabled v-model="waimaiMerchant.phone" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>商户描述</p>
      <Input disabled v-model="waimaiMerchant.desc" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>商户id(外卖商户id)</p>
      <Input disabled v-model="waimaiMerchant.mt_wm_poi_id" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>月售</p>
      <Input disabled v-model="waimaiMerchant.month_sales_tip" />
    </Col>
    <Divider />
    <Col :span="24">
      <p>创建时间</p>
      <Input disabled v-model="waimaiMerchant.created_at" />
    </Col>
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
      waimaiMerchant: {
        id: "",
        shop_name: "",
        address:'',
        phone:'',
        desc:'',
        mt_wm_poi_id:'',
        month_sales_tip:'',
        created_at:''
      }
    };
  },
  created() {
    this.$http.get(`/waimai_merchants/${this.$route.params.id}`).then(res => {
      this.waimaiMerchant = res.data.waimai_merchant;
    });
  }
};
</script>

