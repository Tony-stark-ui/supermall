// 引入axios
import axios from 'axios'

export function request(config) {
  const intance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 1000
  });

  // axios 拦截器
  // 请求拦截
  intance1.interceptors.request.use(config => {

    return config
  },
    err => {

    }
  );
  // 响应拦截
  intance1.interceptors.response.use(res => {

    return res.data
  },
    err => {

    }
  )
  // 发送真正的网络请求
  return intance1(config)
}


