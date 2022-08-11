import request from '@/utils/request'


/**
 * 
 * 获取角色列表
 */
export const getRolesApi = (params) => {
    return request({
        url: '/sys/role',
        params
    })
}

/**
 * 新增角色
 * @param {*} data name, region
 * @returns 
 */
export const addRoleApi = (data) => {
    return request({
        url: '/sys/role',
        method: 'POST',
        data
    })
}