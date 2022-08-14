<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登录账户设置" name="account">

            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input style="width:300px" v-model="form.username"/>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input style="width:300px" type="password" v-model="form.password"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="jobs"/>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import {getUserDetail,saveUserDetailById} from '@/api/user'
import UserInfo from './user-info.vue'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
        form: {},
        activeName: Cookies.get('employees') || 'account'
    }
  },

  created () {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail (){
        const res = await getUserDetail(this.$route.params.id)
        this.form = res
    },
    async onSave(){
        await saveUserDetailById(this.form)
        this.$message.success('更新成功')
        this.$router.go(-1)
    },
    tabClick() {
        Cookies.set('employees', this.activeName)
    }
  },
  components: {
    UserInfo
  }
}
</script>

<style scoped>

</style>
