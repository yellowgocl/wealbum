<template>
  <v-container fluid no-gutters align="center" justify="center">
    <v-toolbar flat dark class="header-title" fixed>
      <v-toolbar-title :class="{ 'subtitle-1': $vuetify.breakpoint.xsOnly }"
        >编辑微商店铺账号信息
      </v-toolbar-title>
    </v-toolbar>
    <v-row align="start" justify="start">
      <v-col cols="12">
        <v-form
          @submit.prevent="validate"
          id="form"
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-text-field
            v-model="name"
            :counter="30"
            :rules="nameRules"
            clearable
            label="微商账户名"
            autofocus
            tabindex="1"
            prepend-icon="person"
            v-on:keyup.enter.native="onNext"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :counter="20"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            prepend-icon="lock"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            label="密码"
            tabindex="2"
            clearable
            required
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="2">
        <v-btn
          block
          @click.stop="exit(true)"
          :loading="blockLoading"
          :disabled="blockLoading"
          color="secondary"
          :x-large="!$vuetify.breakpoint.mdAndDown"
          text
          >&nbsp;&nbsp;&nbsp;&nbsp;取消编辑&nbsp;&nbsp;&nbsp;&nbsp;
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          block
          class="mx-4"
          type="submit"
          form="form"
          @click.stop="validate"
          :loading="blockLoading"
          :disabled="blockLoading || !hasModify"
          color="primary"
          :x-large="!$vuetify.breakpoint.mdAndDown"
          >&nbsp;&nbsp;&nbsp;&nbsp;确定保存&nbsp;&nbsp;&nbsp;&nbsp;
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      tipsText: "",
      snackbar: false,
      loading: false,
      showPassword: false,
      valid: true,
      lazy: false,
      name: "admin",
      password: "123456",
      nameRules: [
        (v) => !!v || "名称不能为空",
        (v) => (v && v.length <= 100) || "内容长度不能超出30个字符",
      ],
      passwordRules: [
        (v) => !!v || "密码不能为空",
        (v) => (v && v.length <= 100) || "内容长度不能超出20个字符",
      ],
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    exit(isCancel = false) {
      if (isCancel) {
        let msg = `是否不保存退出编辑？`;
        let flag = confirm(msg);
        flag && this.$router.go(-1);
      } else {
        let msg = `${this.isEdit ? "修改" : "添加"}成功，点击确定返回列表`;
        alert(msg);
        this.$router.go(-1);
      }
    },
  }
};
</script>