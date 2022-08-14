import request from '@/utils/request'

/**
 * 获取员工列表（简单）
 * @returns promise
 */
export const getEmployeesSimpleApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 添加部门
 code	string	非必须		部门编码，同级部门不可重复	
introduce	string	非必须		介绍	
manager	string	非必须		负责人名称	
name	string	非必须		部门名称	
pid	string	非必须		父级部门ID
 * @param {*} data
 * @returns promise
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
 export function getEmployeeListApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工接口
 * ****/

 export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
 export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 批量导入员工
 * @param {*} data 员工数组
 * @returns 
 */
export const importEmployees = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}