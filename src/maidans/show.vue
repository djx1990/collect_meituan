<template>
  <Row type="flex" :gutter="16">
    <h1>买单详情</h1>
    <Divider dashed />
    <Col :span="24">
      <p>id</p>
      <Input disabled v-model="maidan.id"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>商家id</p>
      <Input disabled v-model="maidan.merchant_id"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>描述</p>
      <Input disabled v-model="maidan.content"></Input>
    </Col>
    <Divider />
    <Col><Button type="primary" @click="save">返回</Button></Col>
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
      maidan: {
        id: "",
        merchant_id: "",
        content: ""
      }
    };
  },
  created() {
    this.$http.get(`/maidans/${this.$route.id}`).then(res => {
      console.log(res);
      this.maidan = res.data.maidan;
    });
  },
  methods:{
    save(){
      this.$router.push(`/maidans`)
    }
  }
};
</script>