<template>
  <div class="login-bg">
    <div v-for="n in 5" :key="n" />
  </div>

  <div class="login">
    <!-- 登录表单 -->
    <el-form ref="loginRef" :model="loginForm" :rules="rules" class="login-form" v-show="!isRegisterMode">
      <h3 class="title">midway-admin后台管理系统</h3>
      <el-form-item prop="userName">
        <el-input v-model.trim="loginForm.userName" maxlength="10" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix>
            <!-- <svg-icon icon-class="User" class="input-icon" /> -->
            <User class="input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" maxlength="20" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
          <template #prefix>
            <Lock class="input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input v-model.trim="loginForm.code" maxlength="5" size="large" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter="handleLogin">
          <template #prefix>
            <svg-icon icon-class="validCode" class="input-icon" />
          </template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>

      <div class="login-tips">
        <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
        <el-link v-if="register" class="login-tips-link" type="primary" @click="isRegisterMode = true">去注册账号</el-link>
      </div>

      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 注册表单 -->
    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="login-form" v-show="isRegisterMode">
      <h3 class="title">midway-admin后台管理系统</h3>
      <el-form-item prop="userName">
        <el-input v-model.trim="registerForm.userName" maxlength="20" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix>
            <User class="input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" maxlength="20" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleRegister">
          <template #prefix>
            <Lock class="input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" maxlength="20" type="password" size="large" auto-complete="off" placeholder="确认密码" @keyup.enter="handleRegister">
          <template #prefix>
            <Lock class="input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input v-model.trim="registerForm.code" maxlength="5" size="large" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter="handleRegister">
          <template #prefix>
            <svg-icon icon-class="validCode" class="input-icon" />
          </template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleRegister">
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right; margin-top: 10px">
          <el-link class="link-type" type="primary" @click="isRegisterMode = false">使用已有账户登录</el-link>
        </div>
      </el-form-item>
    </el-form>

    <div class="el-login-footer">
      <span>Copyright © 2018-2025 midway-admin All Rights Reserved.</span>
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
@import '@/assets/styles/login.scss';

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f0f2f5;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
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
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #909399;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-tips {
  &-link {
    position: relative;
    top: -3px;
    left: 10px;
    font-size: 13px;
  }
}
</style>
