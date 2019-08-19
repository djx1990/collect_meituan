<template>
  <Row type="flex" :gutter="16">
    <h3>查看商家</h3>
    <Divider />
    <Col :span="24">
      <p>区域</p>
      <Input v-model="merchant.areaname"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>平均价格</p>
      <Input v-model="merchant.avgprice"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>平均评分</p>
      <Input v-model="merchant.avgscore"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>分类</p>
      <Input v-model="merchant.catename"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>店名</p>
      <Input v-model="merchant.name"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>商家地址</p>
      <Input v-model="merchant.address"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>商家电话</p>
      <Input v-model="merchant.phone"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>商家图片</p>
      <Input v-model="merchant.frontimg"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>分类名称</p>
      <Input v-model="merchant.channel"></Input>
    </Col>
    <Divider />
    <Button type="primary" @click="save">保存</Button>
  </Row>
</template>
<script>
import { Row, Col, Input, Divider, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Input,
    Divider,
    Button
  },
  data() {
    return {
      merchant: []
    };
  },
  created() {
    this.$http.get(`/merchants/${this.$route.params.id}`).then(res => {
      this.merchant = res.data.merchant;
    });
  },
  methods: {
    save() {
      this.$http.put(`merchants/${this.$route.params.id}`).then(res => {
        if (res.data.status === 1) {
          this.$router.push(`/merchants`);
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    }
  }
};
</script>