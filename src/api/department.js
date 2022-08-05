import request from '@/utils/request'

/**
 *获取组织架构数据
 * @returns promise
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}
