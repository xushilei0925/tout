<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav_bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- tag标签 -->
    <van-tabs v-model="active" class="tagBar">
      <van-tab v-for="item in ChannelsList" :key="item.id" :title="item.name">
        <Channel :channel="item"></Channel>
      </van-tab>

      <div slot="nav-right" class="plc"></div>
      <div slot="nav-right" class="hamburger" @click="channelEdit = true">
        <i class="toutiao1 toutiaogengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹层 -->
    <van-popup
      class="channerEditComponent"
      v-model="channelEdit"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channelEdit :myChanelList="ChannelsList" :active="active"></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import channelEdit from './channels/channelEdit'
import Channel from './channels/channels.vue'
import { getChannelsList } from '@/api/user.js'
export default {
  name: 'HomeIndex',
  components: {
    Channel,
    channelEdit
  },
  props: {},
  data() {
    return {
      active: 0,
      ChannelsList: [],
      channelEdit: false //频道编辑显示隐藏
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannelsList()
  },
  mounted() {},
  methods: {
    // 加载频道列表
    async loadChannelsList() {
      const { data: res } = await getChannelsList()
      if (res.message == 'OK') {
        this.ChannelsList = res.data.channels
      }
    }
  }
}
</script>

<style lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .nav_bar {
    .van-nav-bar__content {
      .van-nav-bar__title {
        max-width: unset !important;
      }
    }
  }
  .van-tabs__wrap {
    height: 82px;
    position: fixed;
    top: 92px;
    z-index: 2;
    left: 0;
    right: 0;
  }
  // .tagBar {
  //   /deep/ .van-tab-Active {
  //     color: #333;
  //   }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
    font-size: 33px;
  }
  .plc {
    width: 66px !important;
    height: 82px;
    flex-shrink: 0;
  }
  .hamburger {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    opacity: 0.9;
    &::before {
      content: '';
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      position: absolute;
      left: 0;
      background-size: contain;
    }
  }
  .van-tabs__line {
    width: 32px;
    height: 7px;
    background-color: #3296fa;
    bottom: 23px;
  }
}

.search-btn {
  width: 554px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
    color: #fff;
  }
}

.channerEditComponent {
  padding: 86px 0;
  box-sizing: border-box;
}
</style>
