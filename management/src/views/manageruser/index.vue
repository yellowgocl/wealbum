<template>
  <div class="manager-user-container">
    <el-button
      type="primary"
      circle
      icon="el-icon-plus"
      style="margin-bottom: 30px;"
      @click="addPaneVisible = true"
    />
    <el-table
      :data="userList"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="账号"
        width="180"
      />
      <el-table-column
        prop="password"
        label="密码"
        width="180"
      />
      <el-table-column>
        <el-button
          type="primary"
          icon="el-icon-edit"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
        >
          删除
        </el-button>
      </el-table-column>
    </el-table>
    <el-dialog title="增加账号" :visible.sync="addPaneVisible">
      <el-form ref="userFormData" :model="userFormData" :rules="userFormRules">
        <el-form-item label="账号" prop="username" label-width="auto">
          <el-input v-model="userFormData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="auto">
          <el-input v-model="userFormData.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" label-width="auto">
          <el-input v-model="userFormData.checkPass" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('userFormData')">重置</el-button>
        <el-button @click="() => {addPaneVisible = false}">取 消</el-button>
        <el-button type="primary" @click="submitForm('userFormData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'

export default {
  name: 'Manageruser',
  components: { },
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userFormData.checkPass !== '') {
          this.$refs.userFormData.validateField('checkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userFormData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      addPaneVisible: false,
      userFormRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur', required: true }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur', required: true }
        ]
      },
      userFormData: {
        username: '',
        password: '',
        checkPass: ''
      },
      userList: [
      ]
    }
  },
  computed: {
    loading: () => {
      return Loading.service({
        fullscreen: true,
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  watch: {
    addPaneVisible(value) {
      if (!value) {
        this.clearUserFormData()
      }
    }
  },
  created() {
  },
  mounted() {
    this.loading.close()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addHandle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addHandle() {
      this.loading
      this.$store.dispatch('user/add', this.userFormData)
        .then(res => {
          console.log(res)
          this.loading.close()
          this.addPaneVisible = false
        })
        .catch(() => {
          this.loading.close()
        })
    },
    clearUserFormData() {
      this.userFormData = {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.manager-user-container {
  padding: 50px;
}
</style>
