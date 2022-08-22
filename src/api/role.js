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

/**
 * 根据角色id获取详情
 * @param {*} id 
 * @returns 
 */
export const getRolesInfo = (id) => {
    return request({
        url: "/sys/role/" + id,
    })
}

/**
 * 给角色分配权限
 * @param {Object} data 
 * @returns 
 */
export const  assignPrem = (data) => {
    return request({
        url: '/sys/role/assignPrem',
        method: 'PUT',
        data
    })
}