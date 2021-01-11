<template>
  <div class="szwego-user-container">
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
        prop="name"
        label="账号"
        width="180"
      />
      <el-table-column
        prop="shop_name"
        label="名称"
        width="180"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="auto"
      >
        <template slot-scope="scope">
          <el-button
            type="info"
            icon="el-icon-message"
            @click="infoHandle(scope.row)"
          >
            信息
          </el-button>
          <el-button
            type="info"
            icon="el-icon-more"
            @click="shopListHandle(scope.row)"
          >
            商铺列表
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editHandle(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="() => {
              deleteTipsVisible = true
              currentDeleteRow = scope.row
            }"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="deleteTipsVisible"
      width="30%"
      center
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="deleteTipsVisible = false"
        >
          取 消
        </el-button>
        <el-button type="primary" @click="deleteHandle(currentDeleteRow)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="增加账号" :visible.sync="addPaneVisible">
      <el-form ref="userFormData" :model="userFormData" :rules="userFormRules">
        <el-form-item label="账号" prop="username" label-width="auto">
          <el-input v-model="userFormData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="auto">
          <el-input v-model="userFormData.password" autocomplete="off" />
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
  name: 'Szwegouser',
  components: { },
  data() {
    return {
      addPaneVisible: false,
      deleteTipsVisible: false,
      currentDeleteRow: null,
      userFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 11, message: '不能少于11位', trigger: 'blur' },
          { max: 11, message: '不能多于11位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确密码', trigger: 'blur' }
        ]
      },
      userFormData: {
        username: '',
        password: ''
      },
      userList: []
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
    },
    deleteTipsVisible(value) {
      if (!value) {
        this.currentDeleteRow = null
      }
    }
  },
  created() {
  },
  mounted() {
    this.fetchList()
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
    async addHandle() {
      this.loading
      await this.$store.dispatch('szwego/userAdd', this.userFormData)
        .then(res => {
          console.log(res)
          this.loading.close()
          this.addPaneVisible = false
        })
        .catch(() => {
          this.loading.close()
        })
      this.fetchList()
    },
    infoHandle(row) {
    },
    editHandle(row) {
    },
    async deleteHandle(row) {
      console.log(row)
      this.loading
      await this.$store.dispatch('szwego/userRemove', row)
        .then(res => {
          this.deleteTipsVisible = false
          this.loading.close()
        })
        .catch(() => {
          this.loading.close()
        })
      this.fetchList()
    },
    async shopListHandle(row) {
      this.loading
      // await this.$store.dispatch('szwego/shopList', row.id)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(() => {
      //     this.loading.close()
      //   })
    },
    async fetchList() {
      this.loading
      await this.$store.dispatch('szwego/userList')
        .then(res => {
          this.userList = res
          this.loading.close()
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
.szwego-user-container {
  padding: 50px;
}
</style>
