// 该页面的函数是过滤器
import dayjs from 'dayjs'
export const formatTime = (val) => {
    return dayjs(val).format('YYYY-MM-DD')
}