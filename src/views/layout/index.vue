<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 底部tab栏 -->
    <van-tabbar v-model="active" class="layout-tab" route>
      <van-tabbar-item icon="search" to="/">
        <i slot="icon" class="toutiao1 toutiaoshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">
        <i slot="icon" class="toutiao1 toutiaowenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/video">
        <i slot="icon" class="toutiao1 toutiaoshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/my">
        <i slot="icon" class="toutiao1 toutiaowode"></i>
        <span class="text">{{ token ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['token'])
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tab {
    .toutiao1 {
      font-size: 22px;
    }
    .text {
      font-size: 12px;
    }
  }
}
</style>