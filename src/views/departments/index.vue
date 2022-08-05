<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tools :treeNode="company" :isRoot="true"></tree-tools>
        <!-- 树形 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          default-expand-all
        >
        <template v-slot='{data}'>
          <tree-tools :treeNode="data"></tree-tools>
        </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/department'
import { transListToTree } from '@/utils'
export default {
  components: {
    TreeTools
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
      company: {name: '传智教育', manage: '负责人'}
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
    }
  }
}
</script>

<style scoped lang="less"></style>
