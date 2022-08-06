<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tools :treeNode="company" @add="dialogVisible = true" :isRoot="true"></tree-tools>
        <!-- 树形 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          default-expand-all
        >
        <template v-slot='{data}'>
          <tree-tools  @add="showAddDept" :treeNode="data" @remove='loadDepts'></tree-tools>
        </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹出层 -->
    <add-dept :visible.sync="dialogVisible" :currentTreeNode="currentTreeNode" @add-success="loadDepts"></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDeptsApi } from '@/api/department'
import { transListToTree } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name' // 将data中哪个数据名显示到树形页面中
      },
      company: {name: '传智教育', manage: '负责人'},
      dialogVisible: false,
      currentTreeNode: {}
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts(){
      const res = await getDeptsApi()
      console.log(res);
      this.treeData = transListToTree(res.depts, '')
    },
    showAddDept(val){
      this.dialogVisible = true
      this.currentTreeNode = val
    }
  }
}
</script>

<style scoped lang="less"></style>
