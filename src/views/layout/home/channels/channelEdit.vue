<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="text">我的频道</div>
      <van-button
        class="editBtn"
        round
        size="mini"
        plain
        type="danger"
        @click="isEdit=!isEdit"
        :text="this.isEdit ?'完成':'编辑'"
      ></van-button>
    </van-cell>
    <van-grid :border="false" :gutter="10">
      <van-grid-item
        class="myChannelEdit"
        v-for="(item, index) in myChanelList"
        :key="index"
        @click="edit(item, index)"
      >
        <van-icon slot="icon" name="clear" v-show="isEdit && !fixChannel.includes(item.id)" />
        <span class="text" :class="{ active: index === active }" slot="text">
          {{
          item.name
          }}
        </span>
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
import {
  getChannelAll,
  addChannelForever,
  delChannelForever
} from '@/api/channel.js'

import { setToken } from '@/utils/storage.js'
import { mapState } from 'vuex'
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
    ...mapState(['token']),
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
      channeAll: [], //所有频道
      isEdit: false, //编辑状态
      fixChannel: [2, 3] //不显示状态的选项
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
    async addChannels(value) {
      this.myChanelList.push(value)
      // 判断是否是登录
      console.log(value.length)

      if (this.token) {
        // 存储到线上服务器
        const r = await addChannelForever({
          id: value.id,
          seq: this.myChanelList.length
        })
        console.log(r)
      } else {
        // 存储到本地
        setToken('TOKENCHANNEL', this.myChanelList)
      }
    },
    // 点击切换内容和删除内容
    edit(item, index) {
      console.log(item, index)

      // 编辑状态删除
      if (this.isEdit) {
        if (index < this.active) {
          this.$emit('updateChannel', this.active - 1)
        }

        this.myChanelList.splice(index, 1)
        this.delchannel(item)
      } else {
        // 非编辑状态切换
        this.$emit('updateChannel', index, false)
      }
    },
    async delchannel(item) {
      try {
        console.log(item.id)

        if (this.token) {
          await delChannelForever(item.id)
        } else {
          // 存储到本地
          setToken('TOKENCHANNEL', this.myChanelList)
        }
      } catch (error) {
        this.$toast('删除失败,请稍后重试')
      }
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
    .van-grid-item__icon-wrapper {
      position: unset;
    }

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