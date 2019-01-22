import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payments: [],
    pageNumber: 0,
    totalPages: 0
  },
  mutations: {
    setPayments(state, newPayments) {
      for(let newPayment of newPayments) {
        if (!state.payments.find(payment => payment.id === newPayment.id)){
          state.payments.push(newPayment);
        }
      }
    },
    setPageNumber(state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    setTotalPages(state, pages) {
      state.totalPages = pages;
    }

  },
  actions: {
    fetchPaymentPage(context, pageNum){
      return new Promise(async (resolve, reject) => {
        const apiKey = process.env.VUE_APP_API_KEY;
        if(!pageNum) pageNum = 1;
        const response = await axios.get(`https://gbllc.repairshopr.com/api/v1/payments?api_key=${apiKey}&page=${pageNum}`);
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
            context.commit('setPageNumber', pageNum);
            context.commit('setTotalPages', numPages);
          }

          resolve(context.state)
        }catch (e) {
          reject(e);
        }

      })
    },
    fetchLatestPage: (context) => {
      return new Promise(async(resolve, reject) => {
        let paymentInfo = await context.dispatch('fetchPaymentPage', 1);
        context.commit('setPayments', paymentInfo.payments);
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

    },
    getPageNumber: state => {
      return state.pageNumber;
    },
    getTotalPages: state => {
      return state.totalPages;
    }
  }
})
