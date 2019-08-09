<template>
  <Row type="flex" :gutter="16">
    <Col :span="12" offset="6">
      <p>新邮箱</p>
      <Input type="email" v-model="user.email"></Input>
    </Col>
    <Divider/>
    <Col :span="12" offset="6">
      <p>新密码</p>
      <Input type="password" v-model="user.password"></Input>
    </Col>
     <Divider/>
    <Col :span="12" offset="6">
      <p>确认密码</p>
      <Input type="password" v-model="user.password_confirmation"></Input>
    </Col>
     <Divider/>
    <Col :span="12" offset="6">
      <Button type="primary" @click="save">保存</Button>
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
      user: {
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
          this.$router.push(`/users/login`);
        alert(res.data.notice);
      });
    }
  }
};
</script>