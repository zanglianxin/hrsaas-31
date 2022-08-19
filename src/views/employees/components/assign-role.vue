<template>
  <el-dialog @open="onOpen" :visible="visible" @close="close" title="分配角色">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getRolesApi} from '@/api/role'
import {getUserDetail as getUserDetailApi} from '@/api/user'
import { assignRolesApi } from '@/api/employees'
export default {
  data() {
    return {
        checkList: [],
        roles: []
    }
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    onOpen(){
        this.getRolesList()
        this.getUserDetail()
    },
    async getRolesList(){
        const {rows} = await getRolesApi()
        console.log(rows);
        this.roles = rows
    },
    
    async getUserDetail() {
        const {roleIds} = await getUserDetailApi(this.employeesId)
        this.checkList = roleIds
    },
    
    async onSave(){
        if (!this.checkList.length) return this.$message.error('请选择一项')
        await assignRolesApi({
            id: this.employeesId,
            roleIds: this.checkList
        })
        this.$message.success('更新成功')
        this.close()
    }

  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
        type: String,
        required: true
    }
  }
}
</script>

<style scoped></style>
