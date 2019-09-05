<template>
  <div style="width:50%">
    <Form ref="auth" :model="auth" :rules="ruleInline" :label-width="300">
      <FormItem prop="email">
        账号：
        <Input type="text" v-model="auth.email" placeholder="请输入您的邮箱账号" @on-enter="login(auth)"></Input>
      </FormItem>
      <FormItem prop="password">
        密码：
        <Input type="password" v-model="auth.password" @on-enter="login(auth)"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="login(auth)">登录</Button>
        <Button type="primary" long to="/users/add">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import cookie from "vue-cookies";
// import { setCookies, getCookies} from "./cookie.js"
import { Form, FormItem, Input, Button, Checkbox } from "iview";
export default {
  components: { Form, FormItem, Input, Button, Checkbox },
  data() {
    return {
      checked: false,
      auth: {
        email: "",
        password: ""
      },
      ruleInline: {
        email: [{ required: true, message: "请输入邮箱账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    login() {
      this.$http.post(`/users/sign_in`, { auth: this.auth }).then(res => {
        let authorization = res.data.jwt;
        if (!authorization) {
          this.$message.error(res.data.notice);
          return;
        }
        this.$cookie.config("7h");
        this.$cookie.set("user", authorization, { expires: 7 });
        console.log("cookie", authorization);
        let ema = this.$cookie.get("user");
        console.log("user", ema);
        this.$http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authorization}`;
        this.loadUser().then(() => {
          console.log("fdsa");
          this.$router.push("/cities");
        });
      });
    },
    ...mapActions(["loadUser"])
  }
};
</script>

