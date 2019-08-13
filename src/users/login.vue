<template>
  <div style="width:50%">
    <Form ref="auth" :model="auth" :rules="ruleInline" :label-width="300">
      <FormItem prop="email">
        账号：
        <Input type="text" v-model="auth.email" placeholder="请输入您的邮箱账号"></Input>
      </FormItem>
      <FormItem prop="password">
        密码：
        <Input type="password" v-model="auth.password" @keyup.enter.native="submitForm(auth)"></Input>
      </FormItem>
      <FormItem>
         <Checkbox v-model="checked">记住密码</Checkbox>
        <Button type="primary" long @click="login(auth)">登录</Button>
        <Button type="primary" long to="/users/add">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import cookie from "vue-cookies"
import { Form, FormItem, Input, Button, Checkbox } from "iview";
export default {
  components: { Form, FormItem, Input, Button, Checkbox },
  data() {
    return {
      checked:false,
      auth: {
        email: "",
        password: ""
      },
      ruleInline: {
        email: [{ required: true, message: "请输入邮箱账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      
    };
  },
  created() {},
  mounted() {
    this.getCookie();
  },
  methods: {
    login(formName) {
      
      if (this.checked == true) {
        console.log("checked == true");
        this.setCookie(this.auth.email, this.auth.password);
      } else {
        console.log("清空缓存");
        this.clearCookie;
      }
      this.$http.post(`/users/sign_in`, { auth: this.auth }).then(res => {
        let authorization = res.data.jwt;
        if (!authorization) {
          this.$message.error(res.data.notice);
          return;
        }
        // else{
        //   $this.$http.commit("SET_TOKEN",res.data.return.session_id)
        // }
        this.$http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authorization}`;
        this.loadUser().then(() => {
          console.log("fdsa");
          this.$router.push("/cities");
        });
      });
    },
    setCookie(c_email, c_password, exdays) {
      let exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "authEmail" + "=" + c_email + ";path=/expires=" + exdate.toGMTString();
      window.documnet.cookie =
        "authPassword" +
        "=" +
        c_password +
        ";path=/expires" +
        exdate.toGMTString();
    },
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split(';');
        console(arr)
        for( var i = 0; i<arr; i++){
          let arr2 = arr[i].split('=');
          if(arr2[0] == "authEmail"){
            this.auth.email = arr[1]
          }else if(arr2[0] == "authPassword"){
            this.auth.password = arr2[1]  
          }
        }
      }
    },
    ...mapActions(["loadUser"])
  }
};
</script>

