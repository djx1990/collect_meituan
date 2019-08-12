<template>
  <Row type="flex" :gutter="16">
    <Col :span='24'>
      <Table border stripe :columns="columns" :data="users"></Table>
    </Col>
    <Col :span="24">
      <Page 
      :total='total'
      :current="current_page"
      :page-size="20"
      show-total
      show-elevator
      @on-change="page"
      />
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Table, Page } from "iview";
export default {
  components: {
    Row,
    Col,
    Table,
    Page
  },
  data() {
    return {
      users: [],
      total:0,
      current_page:1,
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "注册时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "Action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.$router.push(`/users/${params.row.id}`);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.remove(params. index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",{
                  on:{
                    click:()=>{
                      this.$router.push(`/users/${params.row.id}/edit`)
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.$http.get(`/users`).then(res => {
      this.users = res.data.users;
      this.total = res.data.total
      this.current_page = res.data.current_page
    });
  },
  methods: {
    remove(index) {
      let user = this.users[index];
      this.$http.delete(`/users/${user.id}`).then(res => {
        if (res.data.status === 1) {
          this.users.splice(index, 1);
          alert(res.data.notice);
        }
      });
    },
    page(page){
      this.$http.get(`/users?page=${page}`).then(res =>{
        this.users = res.data.users
      })
    }
  }
};
</script>
