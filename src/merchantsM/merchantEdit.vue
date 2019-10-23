<template>
  <div v-if="merchant">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="merchant" :label-width="100" ref="merchant" :rules="ruleInline">
      <FormItem label="店铺名" prop="shop_name">
        <Input v-model="merchant.shop_name" placeholder="请填写店铺名"></Input>
      </FormItem>
      <FormItem label="姓名" prop="real_name">
        <Input v-model="merchant.real_name" placeholder="请填写姓名"></Input>
      </FormItem>
      <FormItem label="手机" prop="mobile">
        <Input v-model="merchant.mobile" placeholder="请填写手机"></Input>
      </FormItem>
      <FormItem label="地址" prop="address">
        <Input v-model="merchant.address" placeholder="请填写地址"></Input>
      </FormItem>
      <FormItem label="能否微信支付" prop="weChatPay">
        <i-switch v-model="merchant.weChatPay" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem label="标签" prop="tags_array">
        <Select v-model="merchant.tags_array" style="width:400px" multiple>
          <Option v-for="(tag, index) in tags_array" :value="tag.value" :key="index">{{ tag.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="门头" prop="logo">
        <img :src="merchant.logo" v-if="merchant.logo !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="imgUpload" :format="['jpg','jpeg','png','gif']" :on-format-error="uploadFormatError" :before-Upload="beforeUpload">
          <Button type="default" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="提现管理员" prop="manager_id" v-if="this.$route.name === 'MerchantEdit'">
        <Select v-model="merchant.manager_id" style="width:400px">
          <Option v-for="(manager, index) in managers" :value="manager.id" :key="index">{{ manager.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="提现人真实姓名" prop="withdraw_user_name">
        <Input v-model="merchant.withdraw_user_name" placeholder="请填写提现人真实姓名"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('merchant')">提交</Button>
        <Button type="default" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      merchant: {
        shop_name: null,
        real_name: null,
        mobile: null,
        address: null,
        weChatPay: false,
        tags_array: [],
        logo: null,
        manager_id: null,
        withdraw_user_name: null
      },
      tags_array: [
        {
          label: 'WIFI',
          value: 'wifi'
        },
        {
          label: '停车',
          value: 'p'
        },
        {
          label: '清真',
          value: 'qz'
        }
      ],
      ruleInline: {
        shop_name: [
          { required: true, message: '请填写店铺名' }
        ],
        weChatPay: [
          { required: true, message: '请选择是否能微信支付' }
        ],
        tags_array: [
          { required: true, message: '请选择标签' }
        ],
        logo: [
          { required: true, message: '请上传门头' }
        ]
      },
      managers: [],
      formTitle: ''
    }
  },
  created () {
    if (this.$route.name === 'MerchantNew') {
      this.formTitle = '新建商户'
    } else {
      this.formTitle = '编辑商户'
      this.$http.get('/merchants/' + this.$route.params.id + '/managers').then((res) => {
        this.managers = res.data.managers
      })
      this.$http.get('/merchants/' + this.$route.params.id).then((res) => {
        this.merchant = res.data.merchant
      })
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'MerchantNew') {
        this.$http.post('/merchants', { merchant: this.merchant }).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
            this.$router.push(`/merchants/${res.data.merchant_id}/shops`)
          } else {
            this.$Message.error(res.data.notice)
          }
        })
      } else {
        this.$http.put('/merchants/' + this.$route.params.id, { merchant: this.merchant }).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
            this.$router.go(-1)
          } else {
            this.$Message.error(res.data.notice)
          }
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    imgUpload (res) {
      this.merchant.logo = res.picture.image_url
    },
    uploadFormatError (file) {
      this.$Notice.warning({
        title: '图片类型错误',
        desc: '文件  ' + file.name + ' 不是图片格式, 请选择jpg、png、jpeg、gig 格式文件.'
      })
    },
    beforeUpload () {
      let fileId = this.img_file_id(this.merchant.logo)
      this.del_file_img(fileId, this.merchant.logo)
    }
  }
}
</script>
