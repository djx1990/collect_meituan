
<template>
  <div v-if="merchant">
    <div>
      <h3>{{ formTitle }}</h3>
    </div>
    <Form :model="merchant" :label-width="100" ref="merchant" :rules="ruleInline">
      <FormItem label="商店名称" prop="shop_name">
        <Input v-model="merchant.shop_name" placeholder="请输入商店名"></Input>
      </FormItem>
      <FormItem label="联系人" prop="real_name">
        <Input v-model="merchant.real_name" placeholder="请输入联系人"></Input>
      </FormItem>
      <FormItem label="店铺地址" prop="address">
        <Input v-model="merchant.address" placeholder="请输入店铺地址"></Input>
      </FormItem>
      <FormItem label="是否支持微信支付" prop="weiChatPay">
        <i-switch v-model="merchant.weiChatPay" :true-value="true" :false-value="false">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem label='标签' prop="tags_array">
        <Select v-model="merchant.tags_array" multiple style="width:30%">
          <Option
            v-for="(tags,index) in tags_array"
            :value="tags.value"
            :key="index"
          >{{ tags.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="logo或者门头" prop="logo">
        <img :src="merchant.logo" alt v-if="merchant.logo !== null" />
        <Upload action="Url+'/pictrues'"  name="picture[image]" :on-success="imgUpload">
          <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </FormItem>
      <FormItem label="提现管理员" prop="manager_id" v-if="this.$route.name === 'merchantsMEdit'">
        <Select v-model="merchant.manager_id" style="width: 30%">
          <Option
            v-for="(manager,index) in managers"
            :value="manager.id"
            :key="index"
          >{{ manager.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="提现人真实名字" prop="withdraw_user_name">
        <Input v-model="merchant.withdraw_user_naem" placeholder="请填写真实名字"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit('merchant')">提交</Button>
        <Button @click="back" type="default" style="margin-left:1rem">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { Button, Input, Select, Option, Form, FormItem, Upload } from "iview";
export default {
  components: { Button, Input, Select, Option, Form, FormItem, Upload },
  data() {
    return {
      merchant: {
        shop_name: null,
        real_name: null,
        mobile: null,
        address: null,
        weiChatPay: null,
        tags_array: [],
        manager_id: null,
        withdraw_user_name: null,
        logo: null
      },
      tags_array: [
        {
          value: "WIFI",
          label: "wifi"
        },
        {
          value: "停车",
          label: "停车"
        },
        {
          value: "清真",
          label: "清真"
        },
        {
          value: "火锅",
          label: "火锅"
        }
      ],
      ruleInline: {
        shop_name: [{ required: true, message: "请填写店铺名" }],
        weChatPay: [{ required: true, message: "请选择是否能微信支付" }],
        tags_array: [{ required: true, message: "请选择标签" }],
        logo: [{ required: true, message: "请上传门头" }]
      },
      managers: [],
      formTitle: "",
      headers: ''
    };
  },
  created() {
    if (this.$route.name === "merchantsMNew") {
      this.formTitle = "新建商户";
    } else {
      this.formTitle = "修改商户";
      this.$http
        .get(`/merchantsMList/${this.$route.params.id}/managers`)
        .then(res => {
          this.managers = res.data.managers;
        });
      this.$http.get(`merchantsMList/${this.$route.params.id}`).then(res => {
        this.merchant = res.data.merchant;
      });
    }
  },
  methods: {
    imgUpload(res) {
      this.merchant.logo = res.picture.image_url;
    },
    back() {
      this.$router.go(-1);
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.commitSave();
        }
      });
    },
    commitSave() {
      if (this.$route.name === "merchantsMNew") {
        this.$http
          .post("/merchantsMList", { merchant: this.merchant })
          .then(res => {
            if (res.data.status === 1) {
              this.$Message.success("新建成功");
            } else {
              this.$Message.error(res.data.notice);
            }
          });
      } else {
        this.$http
          .put(`/merchantsMList/${this.$route.params.id}`, {
            merchant: this.merchant
          })
          .then(res => {
            if (res.data.status === 1) {
              this.$Message.success("修改成功");
            } else {
              this.$Message.error(res.data.notice);
            }
          });
      }
    }
  }
};
</script>