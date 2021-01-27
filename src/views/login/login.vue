
<template>
  <div class="login_container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav_bar" title="登录">
      <van-icon
        slot="left"
        size="18"
        class="toutiao1 toutiaozuojiantou"
        @click="$router.back()"
      />
    </van-nav-bar>

    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        :rules="userRules.mobile"
      >
        <i slot="left-icon" class="toutiao1 toutiaoshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入密码"
        :rules="userRules.code"
      >
        <i slot="left-icon" class="toutiao1 toutiaoyanzhengma"></i>
        <template #button>
          <van-count-down
            @finish="isCountDownShow = false"
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
          />
          <van-button
            v-else
            native-type="button"
            round
            size="small"
            type="primary"
            class="send-sms-btn"
            @click="sendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  data() {
    return {
      user: {
        mobile: '13711111111',
        code: '246810'
      },
      userRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            maxlength: 11,
            message: '手机号格式不正确'
          }
        ],
        code: [{ required: true, message: '验证码不能为空' }, { maxlength: 6 }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      // 获取表单信息
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await login(user)
        console.log(data.data.token)
        // 将token存储到store
        this.$store.commit('setToken', data.data.token)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败请稍后重试')
        }
      }
    },
    // 发送验证码
    async sendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 渲染倒计时
      this.isCountDownShow = true

      // 发送请求
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast.fail('请勿频繁发送')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      } finally {
        this.isCountDownShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  .toutaio1 {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    color: #666;
    border: none;
    .van-button__content {
      font-size: 10px;
    }
  }
  .login-btn-wrap {
    padding: 53px 33px;
    box-sizing: border-box;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>>
