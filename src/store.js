import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payments: []
  },
  mutations: {
    setPayments(state, newPayments) {
      state.payments.push(...newPayments);
    }
  },
  actions: {
    fetchPaymentPage(context, pageNum){
      return new Promise(async (resolve, reject) => {
        if(!pageNum) pageNum = 1;
        const response = await axios.get(`https://gbllc.repairshopr.com/api/v1/payments?api_key=cb03a398-5c4b-485c-a762-a23afcdfec4b&page=${pageNum}`);
        if(response.status == 200) {
          resolve(response.data);
        }else {
          reject(response);
        }
      })
    },
    fetchPayments: (context) => {
      return new Promise(async (resolve, reject) => {
        try {
          let pageNum = 1;
          let numPages = 1;

          while (pageNum <= numPages) {
            let paymentInfo = await context.dispatch('fetchPaymentPage', pageNum);
            console.log('paymentInfo', paymentInfo);
            context.commit('setPayments', paymentInfo.payments);
            numPages = paymentInfo.meta.total_pages;
            // numPages = 10, // TODO REMOVE ME
            pageNum += 1;

            console.log('got page', pageNum, 'of', numPages, ' -- ', paymentInfo);
          }

          resolve(context.state)
        }catch (e) {
          reject(e);
        }

      })
    }
  },
  getters: {
    getAllPayments: state => {
      return state.payments;
    },
    getTotal: state => params =>{
      if(!params) {
        let total = 0;
        for(const payment of state.payments){
          total += payment.payment_amount;
        }
        return total;
      } else {
        const startDate = params.startDate;
        const endDate = params.endDate;
        let total = 0;
        for(const payment of state.payments) {
          if(moment(payment.applied_at) >= startDate && moment(payment.applied_at) < endDate) {
            total += payment.payment_amount;
          }
        }
        return total;
      }

    }
  }
})
