<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <h1>代金券详情</h1>
    </Col>
    <Divider dashed />
    <Col :span="24">
      <p>id</p>
      <Input disabled v-model="daijinjuan.id"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>代金券id</p>
      <Input disabled v-model="daijinjuan.dealid"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>原价</p>
      <Input disabled v-model="daijinjuan.originprice"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>现价</p>
      <Input disabled v-model="daijinjuan.price"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>已售数量</p>
      <Input disabled v-model="daijinjuan.solds"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>标题</p>
      <Input disabled v-model="daijinjuan.title"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>创建时间</p>
      <Input disabled v-model="daijinjuan.created_at"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <Button type="primary" @click="save">返回</Button>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Input, Divider, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Input,
    Divider,
    Button
  },
  data() {
    return {
      daijinjuan: []
    };
  },
  created() {
    this.$http.get(`/daijinjuans/${this.$route.params.id}`).then(res => {
      this.daijinjuan = res.data.daijinjuan;
          console.log(this.$route.params.id)
    });
  },
  methods:{
    save(){
      this.$router.push(`/daijinjuans`)
    }
  }
};
</script>