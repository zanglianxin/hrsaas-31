<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addRole" v-if="isHas(point.roles.add)">新建角色</el-button>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="allocation(row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
            :page-sizes="[3, 5, 10, 20]"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新增对话框 -->
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRoleForm"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightDialog"
      width="50%"
      destroy-on-close
      @close="setRightClose"
    >
      <el-tree
        ref="perTree"
        :data="permissions"
        :props="{ label: 'name' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckedPermissin"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleApi, getRolesApi, getRolesInfo, assignPrem } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
import permissionPoints from '@/constant/permission'
import MixinPermission from '@/mixins/permission'
export default {
  mixins: [MixinPermission],
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        description: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      companyInfo: {},
      setRightDialog: false,
      permissions: [],
      defaultCheckedPermissin: [],
      roleId: '',
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      console.log(rows)

      this.tableData = rows
      this.total = total
    },

    currentChange(val) {
      this.page = val
      this.getRoles()
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },

    addRole() {
      this.addDialogVisible = true
    },
    // 点击取消
    close() {
      this.addDialogVisible = false
    },

    async onAddRole() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRoleForm)
      this.addDialogVisible = false
      this.$message.success('添加成功')
      this.getRoles()
    },
    // 监听对话框关闭
    dialogClose() {
      // 前置：只能重置有校验的表单
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },

    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      console.log(res)
      this.companyInfo = res
    },

    async allocation(id) {
      this.setRightDialog = true
      this.roleId = id
      const res = await getRolesInfo(id)
      // console.log(res);
      this.defaultCheckedPermissin = res.permIds
    },

    async getPermissions() {
      const res = await getPermissionList()
      this.permissions = transListToTree(res, '0')
    },

    setRightClose() {
      this.defaultCheckedPermissin = []
    },

    async onSaveRights() {
      // console.log(this.roleId)
      // console.log(this.$refs.perTree.getCheckedKeys())
      let permIds = this.$refs.perTree.getCheckedKeys()
      await assignPrem({
        id: this.roleId,
        permIds
      })
      this.$message.success("分配成功")
      this.setRightDialog = false
    },
  }
}
</script>

<style scoped lang="less"></style>
