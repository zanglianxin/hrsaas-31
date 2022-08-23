import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'English',
  dashboard: {
    calendar: 'calendar',
    workflow: 'workflow'
  },
  ...enLocale,
  route: {
    首页: 'Dashboard',
    审批: 'Approvals',
    组织架构: 'Departments',
    员工: 'Employees',
    权限管理: 'Permission',
    考勤: 'Attendances',
    工资: 'Salarys',
    公司设置: 'Setting',
    社保: 'Social'
  }
}
