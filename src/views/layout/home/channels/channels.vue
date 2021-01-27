<template>
  <div class="channels">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="isOK"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="(item ,index) in list" :key="index" :title="item.title" /> -->
        <ArticleItem v-for="(item ,index) in list" :key="index" :article="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/articleItem/article.vue'
import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false, //下拉刷新loading,
      isOK: '刷新成功'
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 模拟错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('dadwdwdd')
        // }

        const { results } = res.data
        this.list.push(...results)
console.log(this.list);

        this.loading = false

        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 模拟错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('dadwdwdd')
        // }

        const { results } = res.data
        this.list.unshift(...results)

        this.isLoading = false
      } catch (error) {
        this.isOK = '刷新失败'
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channels {
  height: 80vh;
  overflow-y: auto;
}
</style>