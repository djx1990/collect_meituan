<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <p>新邮箱</p>
      <Input type="email" v-model="user.email"></Input>
    </Col>
      <Col :span="24">
      <p>新密码</p>
      <Input type="password" v-model="user.password"></Input>
    </Col>
      <Col :span="24">
      <p>确认密码</p>
      <Input type="password" v-model="user.password_confirmation"></Input>
    </Col>
    <Col><Button type="primary" @click="save">保存</Button></Col>
  </Row>
</template>
<script>
import { Row, Col, Input, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Input,
    Button
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
    this.$http.get(`/users/${this.$route.id}`).then(res => {
      this.user = res.data.user;
    });
  },
  methods:{
    save(){
      this.$http.put(`/users/${this.$route.id}`).then(res =>{
        if(res.data.status === 1, this.password === this.password_confirmation){
          this.$router.push(`/users`),
          alert(res.data.notice)
        }
      })
    }
  }
};
</script>