<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <p>新邮箱</p>
      <Input type="email" v-model="email"></Input>
    </Col>
    <Col :span="24">
      <p>新密码</p>
      <Input type="password" v-model="password"></Input>
    </Col>
    <Col :span="24">
      <p>确认密码</p>
      <Input type="password" v-model="password_confirmation"></Input>
    </Col>
    <Col>
      <Button type="primary" @click="save">保存</Button>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Input } from "iview";
export default {
  components: {
    Row,
    Col,
    Input
  },
  data() {
    return {
      users: {
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  created() {
    this.$http.get(`/users`).then(res => {
      this.users = res.data.users;
    });
  },
  methods: {
    save() {
      this.$http.post(`/users`, { users: this.users }).then(res => {
        if (this.password === this.password_confirmation)
          this.$router.push(`/login`);
        alert(res.data.notice);
      });
    }
  }
};
</script>