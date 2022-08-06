<template>
  <!-- 灰色弹层是eL-dialog组件内部的 -->
  <!--组件内部点击灰色遮罩在修改visible->
<!-this.Semit('update:visible',false)-->
  <!--:visible="visible”"父向子传值-->
  <!--@update:visible="visible Sevent"-->
  <el-dialog title="添加部门" @close="onClose" :visible="visible" width="50%">
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择负责人"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employees"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          v-model="formData.introduce"
          placeholder="1-300个字符"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi } from '@/api/department'
import { getEmployeesSimpleApi, addDepartment } from '@/api/employees'
export default {
  name: 'AddDept',
  data() {
    const checkDeptName = (rule, value, callback) => {
      // console.log(this.currentTreeNode)
      // 判断value是否和添加的同级部门是否重复
      if (!this.currentTreeNode.children) return callback()
      const isRepeat = this.currentTreeNode.children.some(
        (item) => item.name === value
      )
      // 如果重复了callback(new Error('部门重复'))
      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isRepeat = depts.some((item) => item.code === value)
      isRepeat ? callback(new Error('部门编号重复')) : callback()
    }
    return {
      employees: [],
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门管理者', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentTreeNode: {
      type: Object
    }
  },
  created() {
    this.getEmployeesSimple()
  },

  methods: {
    async getEmployeesSimple() {
      const res = await getEmployeesSimpleApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentTreeNode.id
      try {
        await addDepartment(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')

      } catch (error) {
        this.$message.error('新增部门失败')
      }
    }
  }
}
</script>

<style scoped></style>
