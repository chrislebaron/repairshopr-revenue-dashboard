<template>
    <div class="col-12">
        <h3>Past 6 months Revenue</h3>
        <p v-for="i in 12" :key="i">
            {{ sevenMonthsAgo.clone().add(i, 'months').format('MMMM YYYY') }}:
            {{ $store.getters.getTotal({startDate: sevenMonthsAgo.clone().add(i, 'months').startOf('month'), endDate: sevenMonthsAgo.clone().add(i, 'months').endOf('month')}) | currency }}
        </p>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "Past12Months",
        data(){
            return {
                sevenMonthsAgo: moment().subtract(12, 'months')
            }
        }
    }
</script>

<style scoped>

</style>