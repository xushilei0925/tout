<template>
  <div class="layoutLogin">
    <!-- 已登录 -->
    <div class="header userinfo-wrap" v-if="token">
      <div class="userinfo">
        <div class="userinfo-top">
          <div class="userinfo-avator">
            <div class="avator">
              <img :src="userInfo.photo" alt="" />
            </div>
            <span class="text">{{ userInfo.name }}</span>
          </div>
          <div class="userinfo-edit">
            编辑资料
          </div>
        </div>
        <div class="userinfo-bottom">
          <div class="userinfoBottomItem">
            <span class="num">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="userinfoBottomItem">
            <span class="num">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="userinfoBottomItem">
            <span class="num">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="userinfoBottomItem">
            <span class="num">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header" v-else>
      <div class="header-btn nologin" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid clickable :column-num="2" class="cell">
      <van-grid-item class="cell-item">
        <i slot="icon" class="toutiao1 toutiaoshoucang"> </i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="cell-item">
        <i slot="icon" class="toutiao1 toutiaolishi"> </i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 小智同学 -->
    <van-cell-group class="cell-group">
      <van-cell class="message" title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="student" />
      <van-button type="default" @click="loginOut" class="loginOut" v-if="token"
        >退出登录</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'layout-my',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created() {
    if (this.token) {
      this.loaderUserInfo()
    }
  },
  methods: {
    loginOut() {
      this.$dialog
        .confirm({
          title: '确认退出吗'
        })
        .then(() => {
          this.$store.commit('setToken', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loaderUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layoutLogin {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .header-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 130px;
        height: 130px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .userinfo-wrap {
    width: 100%;
    .userinfo {
      width: 100%;
      padding: 77px 32px 22px;
      box-sizing: border-box;
      .userinfo-top {
        height: 231px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .userinfo-avator {
          display: flex;
          justify-content: center;
          align-items: center;
          .avator {
            width: 132px;
            height: 132px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            margin-left: 22px;
            font-size: 30px;
            color: #fff;
          }
        }
        .userinfo-edit {
          width: 116px;
          height: 32px;
          background-color: #fff;
          font-size: 20px;
          text-align: center;
          line-height: 32px;
          border-radius: 30px;
          color: #666666;
        }
      }
      .userinfo-bottom {
        height: 130px;
        display: flex;
        .userinfoBottomItem {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          .num {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
        }
      }
    }
  }
  .cell {
    .cell-item {
      .toutiaoshoucang {
        color: #eb5354;
      }
      .toutiaolishi {
        color: #ff9d1d;
      }
      i.toutiao1 {
        font-size: 45px;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .cell-group {
    background-color: #f5f7f9;
    margin-top: 10px;
    .loginOut {
      text-align: center;
      color: #d86262;
      width: 100%;
      border: none;
      margin-top: 10px;
    }
  }
}
</style>