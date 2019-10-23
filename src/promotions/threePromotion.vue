<template>
  <div>
    <Row>
      <Col>
      333
        <Button type="primary" @click="ss">返回</Button>  
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col, Button} from "iview";
export default {
  components:{
    Row,
    Col,
    Button
  },
  data() {
    return {};
  },
  methdos:{
    ss(){
      console.log(222)
      this.$router.push(`/promotions`)
    }
  }
};
</script>