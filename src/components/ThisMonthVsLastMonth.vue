<template>
    <div class="col-12">
        <h3>This Month Vs Last Month</h3>
        <p>This Month To Date: {{ $store.getters.getTotal({startDate: startOfMonth, endDate: endOfMonth}) | currency }}</p>
        <p>To This Date Last Month: {{ $store.getters.getTotal({startDate: startOfLastMonth, endDate: toThisDateLastMonth }) | currency }}</p>
        <p>Total Last Month: {{ $store.getters.getTotal({startDate: startOfLastMonth, endDate: endOfLastMonth}) | currency }}</p>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "ThisMonthVsLastMonth",
        data() {
            return {
                startOfMonth: moment().startOf('month'),
                endOfMonth: moment().endOf('month'),
                toThisDateLastMonth: moment().subtract(1, 'months'),
                startOfLastMonth: moment().subtract(1, 'months').startOf('month'),
                endOfLastMonth: moment().subtract(1, 'months').endOf('month'),
            }
        }
    }
</script>

<style scoped>

</style>