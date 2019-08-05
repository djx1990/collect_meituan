<template>
  <div style="width:50%">
    <Form ref="auth" :model="auth" :rules="ruleInline" :labe-wodth="500" ;>
      <FormItem prop="email">
        账号：
        <Input type="text" v-model="auth.email" placeholder="请输入您的邮箱账号"></Input>
      </FormItem>
      <FormItem prop="password">
        密码：
        <Input type="password" v-model="auth.email"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long>登录</Button>
        <Button type="primary" long>注册</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { From, FromItem, Input, Button } from "iview";
export default {
  components: { From, FromItem, Input, Button },
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      ruleInline: {
        email: [{ requried: true, messge: "请输入邮箱账号", trigger: "blur" }],
        password: [{ requried: true, messge: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    login() {
      this.$http.post(`/users/sign_in`, { auth: this.auth }).then(res =>{
        let authorization = rea.data.jwt;
        if(!authorzation){
          this.$message.error(res.data.notice);
          return;
        }
      })
      this.$router.push(`/App`)
    }
  }
};
</script>

