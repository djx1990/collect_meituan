<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <h1>ip详情</h1>
    </Col>
    <Divider />
    <Col :span="24">
      <p>id</p>
      <Input disabled v-model="ip_address.id"></Input>
    </Col>
    <Divider dashed />
    <Col :span="24">
      <p>ip</p>
      <Input disabled v-model="ip_address.url"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>端口号</p>
      <Input disabled v-model="ip_address.port"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>创建时间</p>
      <Input disabled v-model="ip_address.created_at"></Input>
    </Col>
    <Divider />
    <Col>
      <Button type="primary" @click="save" small>返回</Button>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Input, Button, Divider } from "iview";
export default {
  components: {
    Row,
    Col,
    Input,
    Button,
    Divider
  },
  data() {
    return {
      ip_address:{
        id:'',
        url:''
      }
    };
  },
  created() {
    this.$http.get(`/ip_addresses/${this.$route.params.id}`).then(res => {
      this.ip_address = res.data.ip_address;
      console.log(this.ip_address)
    });
  },
  methods: {
    save() {
      this.$router.push(`/ip`);
    }
  }
};
</script>
