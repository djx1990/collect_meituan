<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <h1>团购详情</h1>
    </Col>
    <Divider dashed />
    <Col :span="24">
      <p>id</p>
      <Input disabled v-model="tuangou.id"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>团购商户id</p>
      <Input disabled v-model="tuangou.merchant_id"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>原价</p>
      <Input disabled v-model="tuangou.originprice"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>现价</p>
      <Input disabled v-model="tuangou.price"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>已售数量</p>
      <Input disabled v-model="tuangou.solds"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>标题</p>
      <Input disabled v-model="tuangou.title"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>创建时间</p>
      <Input disabled v-model="tuangou.created_at"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <Button type="primary" @click="save">返回</Button>
    </Col>
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
      tuangou: {}
    };
  },
  created() {
    this.$http.get(`/tuangous/${this.$route.params.id}`).then(res => {
      this.tuangou = res.data.tuangou;
    });
  },
  methods:{
    save(){
      this.$router.push(`/tuangous`)
    }
  }
};
</script>