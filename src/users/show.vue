<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <h1>用户详情</h1>
    </Col>
    <Divider />
    <Col :span="24">
      <p>id</p>
      <Input disabled v-model="user.id"></Input>
    </Col>
    <Divider dashed />
    <Col :span="24">
      <p>邮箱</p>
      <Input disabled v-model="user.email"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>注册时间</p>
      <Input disabled v-model="user.created_at"></Input>
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
      user: {}
    };
  },
  created() {
    this.$http.get(`/users/${this.$route.id}`).then(res => {
      this.user = res.data.user;
    });
  },
  methods: {
    save() {
      this.$router.push(`/users`);
    }
  }
};
</script>
