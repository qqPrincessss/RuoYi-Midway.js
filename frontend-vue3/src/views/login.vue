<template>
  <div class="container">
    <!-- 左侧展示区 -->
    <div class="left-form">
      <div class="login-show">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <p class="header-text">RuoYi-Midwayjs 管理系统</p>
        <p class="left-text">基于 Midway.js + Vue3 + Element Plus 的现代化后台管理系统</p>
      </div>
    </div>

    <!-- 右侧表单区 -->
    <div class="right-form">
      <transition name="title-fade" mode="out-in">
        <div class="title-text" :key="isRegisterMode ? 'register' : 'login'">
          {{ isRegisterMode ? '用户注册' : '用户登录' }}
        </div>
      </transition>

      <!-- 登录表单 -->
      <transition name="form-slide" mode="out-in">
        <el-form v-if="!isRegisterMode" key="login-form" ref="loginRef" :model="loginForm" :rules="rules" class="login-form" label-position="top">
          <el-form-item prop="userName" label="账号">
            <el-input v-model.trim="loginForm.userName" maxlength="20" type="text" auto-complete="off" placeholder="请输入账号" style="height: 52px">
              <template #prefix>
                <User class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="loginForm.password" maxlength="20" type="password" auto-complete="off" placeholder="请输入密码" @keyup.enter="handleLogin" style="height: 52px">
              <template #prefix>
                <Lock class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaEnabled" label="验证码">
            <el-input v-model.trim="loginForm.code" maxlength="5" auto-complete="off" placeholder="请输入验证码" style="width: 63%; height: 52px" @keyup.enter="handleLogin">
              <template #prefix>
                <svg-icon icon-class="validCode" class="input-icon" />
              </template>
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" style="height: 52px" />
            </div>
          </el-form-item>

          <div class="login-tips">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            <el-link v-if="register" class="login-tips-link" type="primary" @click="isRegisterMode = true">立即注册</el-link>
          </div>

          <el-form-item style="width: 100%">
            <el-button :loading="loading" type="primary" style="width: 100%; height: 52px" @click.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 注册表单 -->
        <el-form v-else key="register-form" ref="registerRef" :model="registerForm" size="large" :rules="registerRules" class="login-form" label-position="top">
          <el-form-item prop="userName" label="账号">
            <el-input v-model.trim="registerForm.userName" maxlength="20" type="text" auto-complete="off" placeholder="请输入账号" style="height: 52px">
              <template #prefix>
                <User class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="registerForm.password" maxlength="20" type="password" auto-complete="off" placeholder="请输入密码" @keyup.enter="handleRegister" style="height: 52px">
              <template #prefix>
                <Lock class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认密码">
            <el-input v-model="registerForm.confirmPassword" maxlength="20" type="password" auto-complete="off" placeholder="请再次输入密码" @keyup.enter="handleRegister" style="height: 52px">
              <template #prefix>
                <Lock class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaEnabled" label="验证码">
            <el-input v-model.trim="registerForm.code" maxlength="5" auto-complete="off" placeholder="请输入验证码" style="width: 63%; height: 52px" @keyup.enter="handleRegister">
              <template #prefix>
                <svg-icon icon-class="validCode" class="input-icon" />
              </template>
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
            <div style="text-align: right; margin-top: 10px">
              <el-link class="link-type" type="primary" @click="isRegisterMode = false">使用已有账户登录</el-link>
            </div>
          </el-form-item>

          <el-form-item style="width: 100%">
            <el-button :loading="loading" type="primary" style="width: 100%; height: 52px" @click.prevent="handleRegister">
              <span v-if="!loading">注 册</span>
              <span v-else>注 册 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg, getRegisterUser, registerUser } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import useUserStore from '@/store/modules/user'
import { ElMessageBox } from 'element-plus'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
import Title from '@/components/Title/index.vue'

// 切换登录/注册模式
const isRegisterMode = ref(false)
const loginForm = ref({
  userName: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
})

const rules = {
  userName: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
}

// 注册表单
const registerRef = ref()
const equalToPassword = (rule, value, callback) => {
  if (registerForm.password !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const registerForm = reactive({
  userName: '',
  password: '',
  confirmPassword: '',
  code: '',
  uuid: ''
})

const registerRules = {
  userName: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' }
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请再次输入您的密码' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
}

const codeUrl = ref('')
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(false)
// 注册开关
const register = ref(false)
const redirect = ref(undefined)

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('userName', loginForm.value.userName, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('userName')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          router.push({ path: redirect.value || '/' })
        })
        .catch(() => {
          loading.value = false
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode()
          }
        })
    }
  })
}

function getRegister() {
  getRegisterUser().then((res) => {
    register.value = res.data.register === undefined ? true : res.data.register
  })
}
function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled.value = res.data.captchaEnabled === undefined ? true : res.data.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = res.data.img // 此处后端直接返回图片，不用拼接了
      loginForm.value.uuid = res.data.uuid
      registerForm.uuid = res.data.uuid
    }
  })
}

function handleRegister() {
  registerRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      registerUser(registerForm)
        .then(() => {
          const userName = registerForm.userName
          ElMessageBox.alert("<font color='red'>恭喜你，您的账号 " + userName + ' 注册成功！</font>', '系统提示', {
            dangerouslyUseHTMLString: true,
            type: 'success'
          })
            .then(() => {
              isRegisterMode.value = false
              // 清空注册表单
              registerForm.userName = ''
              registerForm.password = ''
              registerForm.confirmPassword = ''
              registerForm.code = ''
            })
            .catch(() => {})
        })
        .catch(() => {
          loading.value = false
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode()
          }
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

function getCookie() {
  const userName = Cookies.get('userName')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    userName: userName === undefined ? loginForm.value.userName : userName,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

onMounted(() => {
  getRegister()
  getCode()
  getCookie()
})
</script>

<style lang="scss" scoped>
@use 'sass:math';

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;
}

.left-form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 100%;
}

.login-show {
  width: 94%;
  height: 94%;
  background: linear-gradient(135deg, var(--el-color-primary) 0%, #2c4a76 100%);
  border-radius: 25px;
  margin: 3%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.right-form {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 2% 0 0;

  .el-form-item {
    margin-bottom: 24px;
  }
}

// 星空动画效果
@function getShadows($n) {
  $shadows: '#{random(100)}vw #{random(100)}vh #fff';
  @for $i from 2 through $n {
    $shadows: '#{$shadows},#{random(100)}vw #{random(100)}vh #fff';
  }
  @return unquote($shadows);
}

$duration: 400s;
$count: 1000;

@for $i from 1 through 3 {
  $duration: floor(math.div($duration, 2));
  $count: floor(math.div($count, 2));

  .layer#{$i} {
    $size: #{$i}px;
    position: absolute;
    width: $size;
    height: $size;
    border-radius: 50%;
    background: #fff;
    left: 0;
    top: 0;
    box-shadow: getShadows(100);
    animation: moveUp $duration linear infinite;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 100vh;
      width: $size;
      height: $size;
      border-radius: inherit;
      box-shadow: inherit;
    }
  }
}

@keyframes moveUp {
  100% {
    transform: translateY(-100vh);
  }
}

@mixin header-text($font-size: 60px, $letter-spacing: 4px, $fontweight: 600) {
  display: flex;
  font-size: $font-size;
  font-weight: $fontweight;
  color: white;
  margin-left: 5%;
  margin-right: 5%;
  letter-spacing: $letter-spacing;
}

.header-text {
  @include header-text();
  display: flex;
  flex-shrink: 0;
  height: 15%;
  align-items: center;
}

.left-text {
  @include header-text(18px, 2px, 400);
  display: flex;
  flex: 1;
  min-height: 0;
  align-items: flex-start;
  padding-top: 0;
}

.title-text {
  display: flex;
  font-size: 32px;
  justify-content: center;
  font-weight: 550;
  letter-spacing: 4px;
  margin-bottom: 8%;
  color: var(--el-color-primary);
}

.login-form {
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 10px;
  }
}

.login-code {
  width: 35%;
  height: 48px;
  float: right;
  text-align: right;
  img {
    cursor: pointer;
    vertical-align: middle;
    height: 100%;
    border-radius: 4px;
  }
}

.login-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &-link {
    font-size: 14px;
  }
}

// 标题切换动画
.title-fade-enter-active,
.title-fade-leave-active {
  transition: all 0.3s ease;
}

.title-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.title-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

// 表单切换动画
.form-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.form-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

// 移动端适配
@media screen and (max-width: 1024px) {
  .container {
    flex-direction: column;
    padding: 20px;
  }

  .left-form {
    width: 100%;
    height: 30%;
    min-height: 200px;
  }

  .login-show {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 15px;
  }

  .header-text {
    font-size: 28px;
    height: auto;
    padding: 5%;
  }

  .left-text {
    font-size: 14px;
    padding: 0 5%;
  }

  .right-form {
    width: 100%;
    min-width: auto;
    max-width: 450px;
    height: 70%;
    padding: 20px;

    .el-form-item {
      margin-bottom: 18px;
    }
  }

  .title-text {
    font-size: 24px;
    margin-bottom: 20px;
  }

  // 移动端简化动画
  .form-slide-enter-from {
    transform: translateX(20px) scale(0.98);
  }

  .form-slide-leave-to {
    transform: translateX(-20px) scale(0.98);
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .left-form {
    height: 25%;
    min-height: 150px;
  }

  .header-text {
    font-size: 22px;
  }

  .left-text {
    font-size: 12px;
  }

  .right-form {
    padding: 15px;
    height: 75%;

    .el-form-item {
      margin-bottom: 15px;
    }
  }

  .title-text {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .login-code {
    width: 35%;
    height: 40px;
  }

  // 进一步简化动画
  .form-slide-enter-active,
  .form-slide-leave-active {
    transition: all 0.3s ease;
  }

  .form-slide-enter-from {
    transform: translateX(15px) scale(0.99);
  }

  .form-slide-leave-to {
    transform: translateX(-15px) scale(0.99);
  }
}

@media screen and (max-width: 480px) {
  .left-form {
    height: 20%;
    min-height: 120px;
  }

  .header-text {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .left-text {
    font-size: 11px;
    letter-spacing: 1px;
  }

  .right-form {
    height: 80%;
  }

  .title-text {
    font-size: 18px;
  }

  // 小屏幕快速动画
  .form-slide-enter-active,
  .form-slide-leave-active {
    transition: all 0.25s ease;
  }

  .form-slide-enter-from,
  .form-slide-leave-to {
    transform: translateX(10px);
  }

  .title-fade-enter-active,
  .title-fade-leave-active {
    transition: all 0.2s ease;
  }
}
</style>
