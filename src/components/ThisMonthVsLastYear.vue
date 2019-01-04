<template>
    <div class="col-12">
        <h3>This Month Vs This Month Last Year</h3>
        <p>This Month To Date: {{ $store.getters.getTotal({startDate: startOfMonth, endDate: endOfMonth}) | currency }}</p>
        <p>This Month To Date Last Year: {{ $store.getters.getTotal({startDate: startOfThisMonthLastYear, endDate: toThisDateThisMonthLastYear}) | currency }}</p>
        <p>This Month Last Year Total: {{ $store.getters.getTotal({startDate: startOfThisMonthLastYear, endDate: endOfThisMonthLastYear}) | currency }}</p>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "ThisMonthVsLastYear",
        data() {
            return {
                startOfMonth: moment().startOf('month'),
                endOfMonth: moment().endOf('month'),
                toThisDateThisMonthLastYear: moment().subtract(1, 'years'),
                startOfThisMonthLastYear: moment().subtract(1, 'years').startOf('month'),
                endOfThisMonthLastYear: moment().subtract(1, 'years').endOf('month'),
            }
        }
    }
</script>

<style scoped>

</style>