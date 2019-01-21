<template>
    <div class="card border-info">
        <div class="card-header text-white bg-info">
            <h5>{{ startOfMonth.format("MMM YYYY")}} Vs. {{ startOfThisMonthLastYear.format('MMM YYYY')}}</h5>
        </div>
        <div class="card-body">
            <GChart
                    type="ColumnChart"
                    :data="chartData"
                    :options="chartOptions"
            />
        </div>


    </div>

</template>

<script>
    import moment from 'moment';
    export default {
        name: "ThisMonthVsLastYear",
        computed: {
            chartData: function() {
                let thisMonthToDate = this.$store.getters.getTotal({
                    startDate: this.startOfMonth, endDate: this.endOfMonth
                });
                let lastYearThisMonthToDate = this.$store.getters.getTotal({
                    startDate: this.startOfThisMonthLastYear, endDate: this.toThisDateThisMonthLastYear
                })
                let lastYearThisMonthTotal = this.$store.getters.getTotal({
                    startDate: this.startOfThisMonthLastYear, endDate: this.endOfThisMonthLastYear
                })

                return [
                    ["Stuff", "Revenue", { role: 'annotation'}],
                    [
                        "Month To Date",
                        {v: thisMonthToDate, f: this.$options.filters.currency(thisMonthToDate)},
                        this.$options.filters.currency(thisMonthToDate)
                    ],
                    [
                        "Last Year To Date",
                        {v: lastYearThisMonthToDate, f: this.$options.filters.currency(lastYearThisMonthToDate)},
                        this.$options.filters.currency(lastYearThisMonthToDate)
                    ],
                    [
                        "Last Year Total",
                        {v:lastYearThisMonthTotal, f: this.$options.filters.currency(lastYearThisMonthTotal)},
                        this.$options.filters.currency(lastYearThisMonthTotal)
                    ]
                ]
            }

        },
        data() {
            return {
                startOfMonth: moment().startOf('month'),
                endOfMonth: moment().endOf('month'),
                toThisDateThisMonthLastYear: moment().subtract(1, 'years'),
                startOfThisMonthLastYear: moment().subtract(1, 'years').startOf('month'),
                endOfThisMonthLastYear: moment().subtract(1, 'years').endOf('month'),
                chartOptions: {
                    height: 400,
                    bar: {groupWidth: "90%"},
                    chartArea: {'height': '85%'},
                    vAxis: {
                        format:'$###,###,###',
                        title: 'Revenue',
                    },
                    legend: {position: 'none'}
                },
            }
        }
    }
</script>

<style scoped>

</style>