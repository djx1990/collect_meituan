<template>
  <Row>
    <Col>

    </Col>
  </Row>
</template>
<script>
export default {
  data(){
    return{
    city:[]
    }
  },
  created(){
    this.$http.get(`/cities/${this.route.id}`).then(res=>{
      this.city = res.data.city
    })
  }
}
</script>

