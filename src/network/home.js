

// 导入封装好的网络请求模块
import { request } from './request';

// 首页网络请求的封装

// 请求首页轮播图和推荐信息数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata',

  })
}

// 请求选项卡的流行、新款、精选的数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}