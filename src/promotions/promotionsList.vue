<template>
  <div>
    <Row>
      <Col>
        <Select
          v-model="status"
          style="width: 20%; margin-right: 1rem"
          clearable
          placeholder="请选择状态"
        >
          <Option v-for="(s,index) in statusList" :value="s.value" :key="index">{{ s.label}}</Option>
        </Select>
        <Select v-model="type" clearable placeholder="请选择类型" style="width: 20%; margin-right: 1rem">
          <Option v-for="(t,index) in typeList" :value="t.value" :key="index">{{t.label}}</Option>
        </Select>
        <Date-picker
          type="daterange"
          placeholder="选择开始日期和时间"
          split-panels
          v-model="started_at"
          style="width: 20%; margin-right: 1rem"
        ></Date-picker>
        <Date-picker
          type="daterange"
          placeholder="选择结束日期和时间"
          split-panels
          v-model="ended_at"
          style="width: 20%; margin-right: 1rem"
        ></Date-picker>
        <Button type="primary" @click="getPromotions(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="promotions"></Table>
    <Page
      show-total
      show-elevator
      :total="total"
      :current="current_page"
      :page-size="20"
      @on-change="getPromotions"
    />
    <Modal v-model="ivewsCount" title="浏览数量" @on-ok="ok">
      <p>
        浏览量
        <Input type="text" v-model="ivews_count" />
      </p>
    </Modal>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Select,
  Option,
  Button,
  Page,
  Table,
  DatePicker,
  Modal,
  Input
} from "iview";
export default {
  components: {
    Row,
    Col,
    Select,
    Option,
    Button,
    Page,
    Table,
    DatePicker,
    Modal,
    Input
  },
  data() {
    return {
      ivewsCount: false,
      ivews_count: null,
      promotionId: null,
      status: "",
      started_at: "",
      ended_at: "",
      type: "",
      typeList: [
        {
          value: "",
          label: "所有类型"
        },
        {
          value: "1",
          label: "普通"
        },
        {
          value: "2",
          label: "推广"
        },
        {
          value: "3",
          label: "图文"
        }
      ],
      statusList: [
        {
          value: "",
          label: "所有状态"
        },
        {
          value: "-1",
          label: "已取消"
        },
        {
          value: "0",
          label: "已结束"
        },
        {
          value: "1",
          label: "正进行"
        }
      ],
      promotions: [],
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "商户名称",
          key: "shop_name"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "二维码",
          key: "qr_code_url",
          render: (h, params) => {
            if (params.row.qr_code_url !== null) {
              return h("img", {
                domProps: {
                  src: params.row.qr_code_url
                },
                style: {
                  width: "50px",
                  height: "50px"
                }
              });
            } else {
              return h("div", "暂无");
            }
          }
        },
        {
          title: "活动类型",
          key: "type",
          render: (h, params) => {
            let renderText = "";
            switch (params.row.render) {
              case "lv_limit":
                renderText = "等级限制";
                break;
              case "zhuanpan":
                renderText = "大转盘";
                break;
            }
            switch (params.row.type) {
              case 1:
                return h("div", `普通(${renderText})`);
                break;
              case 2:
                return h("div", `图文(${renderText})`);
                break;
              case 3:
                return h("div", `推广(${renderText})`);
                break;
            }
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h(
              "div",
              ["已取消", "已结束", "正进行"][params.row.status + 1]
            );
          }
        },
        {
          title: "开始时间",
          key: "started_at"
        },
        {
          title: "结束时间",
          key: "ended_at"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.editPromotion(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.show_views_count(params.row);
                    }
                  }
                },
                "浏览量"
              )
            ]);
          }
        }
      ],
      total: null,
      current_page: null
    };
  },
  activated() {
    this.getPromotions(1);
  },
  methods: {
    getPromotions(page) {
      let url = `/promotions?page=${page}`;
      if (this.status) {
        url += `&status=${this.status}`;
      }
      if (this.started_at) {
        url += `&started_at = ${this.started_at}`;
      }
      if (this.ended_at) {
        url += `&end_at=${this.ended_at}`;
      }
      if (this.type) {
        url += `&type=${this.type}`;
      }
      this.$http.get(url).then(res => {
        this.promotions = res.data.promotions;
        this.total = res.data.total;
        this.current_page = res.data.current_page;
      });
    },
    show_views_count(params) {
      console.log(params.ivews_count);
      console.log(111, params.id);
      this.ivewsCount = true;
      this.ivews_count = params.ivews_count;
      this.promotionID = params.id;
    },
    ok() {
      this.$http
        .put(`/promotions/${this.promotionId}/update_ivews_count`, {
          ivews_count: this.ivews_count
        })
        .then(res => {
          console.log(222, this.promotionID);
          if (res.data.status === 1) {
            this.$Message.info(res.data.notice);
            this.getPromotions(this.current_page);
          }
          //  else{
          //    this.$Message.error(res.data.notice)
          //  }
        });
    },
    remove(index) {
      let promotion = this.promotions[index];
      this.$http.delete(`/promotions/${promotion.id}`).then(res => {
        if (res.data.status === 1) {
          this.promotions.splice(index, 1);
        }
      });
    },
    editPromotion(row) {
      console.log(row.type);
      switch (row.type) {
        case 1:
          this.$router.push(`/onePromotion/${row.id}/edit`);
          break;
        case 2:
          this.$router.push(`/twoPromotion/${row.id}/edit`);
          break
        case 3:
          this.$router.push(`/threePromotion/${row.id}/edit`);
          break
      }
    }
  }
};
</script>