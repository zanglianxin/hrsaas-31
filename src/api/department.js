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

/**
 * 删除部门
 * @param {*} id 
 * @returns 
 */
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/**
 * 获取相关部门信息
 * @param {*} id 
 * @returns 
 */
export const getDeptByIdApi = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

export const EditDeptByIdApi = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
