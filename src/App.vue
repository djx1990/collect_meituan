<template>
 <!-- <div v-if="this.$route.matched.some(record => record.meta.layout === false)">
    <router-view></router-view>
 </div> -->
 <div class="layout" v-else>
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">

      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
        <Submenu :name="index" v-for="(menu, index) in menus">
          <template slot="title">
            <Icon :type="menu.icon"></Icon>
            {{menu.name}}
          </template>
          <MenuItem
            :to="menuitem.to"
            :name="index + '-' + itemindex"
            v-for="(menuitem, itemindex) in menu.chilren"
          > <!-- :name="index + '-' + itemindex" 放在：to后面，给导航添加的序列号-->
            <Icon :type="menuitem.icon"></Icon>
            {{menuitem.name}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
      <Content :style="{padding: '10px 16px 16px'}"></Content>

        <Card>
          <div>
            <router-view></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
import {
  Sider,
  Menu,
  Submenu,
  Icon,
  MenuItem,
  Layout,
  Header,
  Content,
  Card
} from "iview";

export default {
  components: {
    Sider,
    Menu,
    Submenu,
    Icon,
    MenuItem,
    Layout,
    Header,
    Content,
    Card
  },
  data() {
    return {
      menus:[
        {
          name: "后台管理",
          icon: "ios-navigate",
        },
        {
          name: "导航",
          icon: "ios-navigate",
          chilren: [{ name: "控制面版", icon: "ios-navigate", to: "/list" }]
        },
        {
          name: "平台管理",
          icon: "ios-navigate",
          chilren: [{ name: "商家管理", icon: "ios-navigate", to: "/merchants" }]
        }
      ],
      show: false
}
  }
}
</script>

<style>
.layout {
  width:100%;
  height:100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>

