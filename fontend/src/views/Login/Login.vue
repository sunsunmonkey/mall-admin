<template>
  <div class="login">
    <a-form
      name="custom-validation"
      ref="formRef"
      :model="form"
      :rules="rules"
      v-bind="{ labelCol: { span: 0 }, wrapperCol: { span: 24 } }"
    >
      <a-form-item required name="userAccount">
        <a-input
          v-model:value="form.userAccount"
          size="large"
          placeholder="账号"
        />
      </a-form-item>
      <a-form-item required name="passWord">
        <a-input-password
          v-model:value="form.passWord"
          size="large"
          type="password"
          placeholder="密码"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          class="login-btn"
          size="large"
          type="primary"
          html-type="submit"
          :loading="loading"
          @click="onSubmit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

let usernameRule = async (rule, value) => {
  if (!value) {
    return Promise.reject("请输入");
  }
};

let passwordRule = async (rule, value) => {
  if (value === "") {
    return Promise.reject("请输入");
  }
  return Promise.resolve();
};

const rules = {
  userAccount: [{ validator: usernameRule, trigger: ["change", "blur"] }],
  passWord: [{ validator: passwordRule, trigger: ["change", "blur"] }],
};
const form = reactive({
  userAccount: "admin",
  passWord: "zb123456",
});
const loading = ref(false);
const formRef = ref();
const store = useStore();
const router = useRouter();

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async (res) => {
      try {
        console.log(res);
        loading.value = true;
        await store.dispatch("Login", form);
        await router.push({ path: "/home/page" });
        message.success("登录成功");
      } catch {
        console.log("fail");
        loading.value = false;
      }
    })
};
</script>

<style scoped lang="less">
.login {
  width: 340px;
  margin: 0 auto;
  .login-btn {
    width: 100%;
  }
}
</style>
