import { orderService } from '../service/order.service.js'

export const orderStore = {
   srtict: true,
   state: {
      orders: []
   },
   getters: {
      orders({ orders }) {
         return orders
      },
   },

   mutations: {
      setOrders(state, { orders }) {
         state.orders = orders
      },
      removeOrder(state, { orderId }) {
         const idx = state.orders.findIndex(order => order._id === orderId)
         state.orders.splice(idx, 1)
      },
      saveOrder(state, { orderToSave }) {
         const idx = state.orders.findIndex(order => order._id === orderToSave._id)
         if (idx === -1) {
            state.orders.unshift(orderToSave)
         } else {
            state.orders.splice(idx, 1, orderToSave)
         }
      },
   },
   actions: {
      async loadOrders({ commit }) {
         try {
            const orders = await orderService.query()
            commit({ type: 'setOrders', orders })
         } catch (err) {
            console.log('OrderStore: Cant load orders', err)
            throw err
         }
      },
      async removeOrder({ commit }, payload) {
         try {
            await orderService.remove(payload.orderId)
            commit(payload)
         } catch (err) {
            console.log('OrderStore: Cant remove order', err);
            throw err
         }
      },
      async saveOrder({ commit }, payload) {
         try {
            const savedOrder = await orderService.save(payload.orderToSave)
            commit({ type: 'saveOrder', orderToSave: savedOrder })
            return savedOrder
         } catch (err) {
            console.log('OrderStore: Cant save order', err)
            throw err
         }
      }
   }
}