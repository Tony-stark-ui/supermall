import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((res, rej) => {
      // let oldProduct = null
      // for (let item in context.state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        res('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        res('添加了新的商品')
      }
    })
  }
}