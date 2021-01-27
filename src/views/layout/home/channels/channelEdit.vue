<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="text">我的频道</div>
      <van-button class="editBtn" round size="mini" plain type="danger"
        >编辑</van-button
      >
    </van-cell>
    <van-grid :border="false" :gutter="10">
      <van-grid-item
        class="myChannelEdit"
        icon="clear"
        v-for="(item, index) in myChanelList"
        :key="index"
      >
        <span class="text" :class="{ active: index === active }" slot="text">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="text">频道推荐</div>
    </van-cell>
    <van-grid :border="false" :gutter="10">
      <van-grid-item
        class="channelEditIcon"
        icon="plus"
        v-for="(value, index) in remainChannelList"
        :key="index"
        :text="value.name"
        @click="addChannels(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannelAll } from '@/api/channel.js'
export default {
  props: {
    myChanelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    this.loadAllchannelList()
  },
  computed: {
    remainChannelList() {
      return this.channeAll.filter(channel => {
        return !this.myChanelList.find(item => {
          return item.id == channel.id
        })
      })
    }
  },
  data() {
    return {
      channeAll: [] //所有频道
    }
  },
  methods: {
    //   获取所有频道列表
    async loadAllchannelList() {
      try {
        const { data: res } = await getChannelAll()
        console.log(res)
        this.channeAll = res.data.channels
      } catch (error) {
        console.log('获取失败')
      }
    },
    // 添加频道
    addChannels(value) {
      console.log(value)
      this.myChanelList.push(value)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .text {
    font-size: 32px;
  }

  .editBtn {
    width: 100px;
    height: 48px;
    font-size: 28px;
    color: #f85a5a;
  }

  .van-grid {
    margin-bottom: 54px;
    margin-top: 20px;
    border-radius: 10px;

    /deep/ .van-icon-clear {
      position: absolute;
      top: -7px;
      right: 20px;
      font-size: 20px;
      color: #aaa;
    }
  }
  /deep/ .van-grid-item__content--center {
    flex-direction: row;

    .van-icon-plus {
      font-size: 25px;
    }
  }
  /deep/.van-grid-item__content {
    background-color: #f4f5f6;
    width: 158px;
    height: 84px;
    white-space: nowrap;
    border-radius: 15px;

    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    /deep/.active {
      color: red;
    }
  }
}
</style>