<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <!--{{allPayments}}-->
        <div class="col-lg-3"><past-twelve-months></past-twelve-months></div>
        <div class="col-lg-3">
          <this-month-vs-last-month></this-month-vs-last-month>
        </div>
        <div class="col-lg-3">
          <this-month-vs-last-year></this-month-vs-last-year>
        </div>
        <div class="col-lg-3">
          <this-year-vs-last-year></this-year-vs-last-year>
        </div>

      </div>
    </div>

    <loading v-if="loading"></loading>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import Loading from '../components/Loading'
import ThisMonthVsLastMonth from '../components/ThisMonthVsLastMonth'
import ThisMonthVsLastYear from '../components/ThisMonthVsLastYear'
import ThisYearVsLastYear from '../components/ThisYearVsLastYear'
import PastTwelveMonths from '../components/PastTwelveMonths'

export default {
  name: 'home',
  components: {
    Loading,
    ThisMonthVsLastMonth,
    ThisMonthVsLastYear,
    ThisYearVsLastYear,
    PastTwelveMonths
  },
  data() {
    return {
      loading: true,

    }
  },
  computed: {
    ...mapGetters({
      allPayments: 'getAllPayments',
      totalEver: 'getTotal',
    }),
    // totalThisMonth: this.$store.getters.getTotal({
    //   startDate: moment().startOf('month'),
    //   endDate: moment().endOf('month')
    // })
  },
  async created() {
    try {
      await this.$store.dispatch('fetchPayments');
      this.loading = false;

      setInterval(async () => {
        console.log('starting interval to check for new data');
        await this.$store.dispatch('fetchLatestPage');
      }, 300000)


    }catch (e) {
      console.error(e);
      alert('e')
    }


  }
}
</script>

<style>
  .home {
    margin-top: 20px;
  }
</style>
