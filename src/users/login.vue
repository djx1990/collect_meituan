<template>
  <div style="width:50%">
    <Form ref="auth" :model="auth" :rules="ruleInline" :label-width="300">
      <FormItem prop="email">
        账号：
        <Input type="text" v-model="auth.email" placeholder="请输入您的邮箱账号"></Input>
      </FormItem>
      <FormItem prop="password">
        密码：
        <Input type="password" v-model="auth.password"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="login">登录</Button>
        <Button type="primary" long to="/users/add">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { Form, FormItem, Input, Button } from "iview";
export default {
  components: { Form, FormItem, Input, Button },
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      ruleInline: {
        email: [{ requried: true, message: "请输入邮箱账号", trigger: "blur" }],
        password: [{ requried: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    login() {
      this.$http.post(`/users/sign_in`, { auth: this.auth }).then(res => {
        let authorization = res.data.jwt;
        if (!authorization) {
          this.$message.error(res.data.notice);
          return;
        }
      });
      this.$router.push(`/App`);
    }
  }
};
</script>

