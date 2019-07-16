<template>
  <Row type="flex" :gutter="16">
    <Col>
      <p>城市</p>
      <Input disabled v-model="merchants.city_name"></Input>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Input } from "iview";
export default {
  components: {
    Row,
    Col,
    Input
  },
  data(){
    return {
      merchants:[]
    }
  },
  created(){
    this.$http.get(`/merchants`).then(res => {
      this.merchants = res.data.merchants
    })
  }
};
</script>

