import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
      meta: { title: '导入模块', icon: 'lock' }
    }
  ]
}