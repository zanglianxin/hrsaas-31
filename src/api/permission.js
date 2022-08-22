import request from '@/utils/request'

// 获取权限
export function getPermissionList(params) {
    return request({
      url: '/sys/permission',
      params
    })
  }


  /**
   * 添加权限点
   * @param {Object} data 
   * @returns Promise
   */
  export const addPermission = (data) => {
    return request({
      url: '/sys/permission',
      method: 'POST',
      data
    })
  }