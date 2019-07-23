<template>
  <Row type="flex" :gutter="16">
    <Col :span="24">
      <h1>城市详情</h1>
    </Col>
    <Divider dashed />
    <Col :span="24">
      <p>id</p>
      <Input disabled v-model="city.id"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>美团采集id</p>
      <Input disabled v-model="city.ci"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>城市名</p>
      <Input disabled v-model="city.name"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>城市拼音</p>
      <Input disabled v-model="city.citypinyin"></Input>
    </Col>
    <Divider />
    <Col :span="24">
      <p>创建时间</p>
      <Input disabled v-model="city.created_at"></Input>
    </Col>
    <Divider />
    <Col><Button type='primary' small @click='save'>返回</Button></Col>
  </Row>
</template>
<script>
import { Row, Col, Divider, Input, Button } from "iview";
export default {
  components: {
    Row,
    Col,
    Divider,
    Input,
    Button
  },
  data() {
    return {
      city: {}
    };
  },
  created() {
    this.$http.get(`/cities/${this.$route.params.id}`).then(res => {
      this.city = res.data.city;
    });
  },
  methods:{
    save(){
      this.$router.push(`/cities`)
    }
  }
};
</script>

