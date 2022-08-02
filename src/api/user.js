import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data password mobile  
 * @returns promise
 */
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data
    })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export function getUserInfoApi() {
    return request({
        url: '/sys/profile',
        method: 'POST'
    })
}

/**
 * 获取用户详细信息
 * @param {String} id 用户id
 * @returns Promise
 */
export function getUserDetail(id) {
    return request({
        url: '/sys/user/' + id
    })
}