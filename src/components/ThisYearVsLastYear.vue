<template>
    <div class="col-12">
        <h3>This Year Vs Last Year</h3>
        <p>This Year To Date: {{ $store.getters.getTotal({startDate: startOfYear, endDate: endOfYear}) | currency }}</p>
        <p>To this Date Last Year: {{ $store.getters.getTotal({startDate: startOfLastYear, endDate: thisDateLastYear}) | currency }}</p>
        <p>Last Year total: {{ $store.getters.getTotal({startDate: startOfLastYear, endDate: endOfLastYear}) | currency }}</p>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "ThisYearVsLastYear",
        data() {
            return {
                startOfYear: moment().startOf('year'),
                endOfYear: moment().endOf('year'),
                thisDateLastYear: moment().subtract(1, 'years'),
                startOfLastYear: moment().subtract(1, 'years').startOf('year'),
                endOfLastYear: moment().subtract(1, 'years').endOf('year')
            }
        }
    }
</script>

<style scoped>

</style>