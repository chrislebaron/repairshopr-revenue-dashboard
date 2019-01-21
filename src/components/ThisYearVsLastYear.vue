<template>
    <div class="card border-info">
        <div class="card-header text-white bg-info">
            <h5>{{startOfYear.format("YYYY")}} Vs. {{startOfLastYear.format("YYYY")}}</h5>
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
    import moment from 'moment'
    export default {
        name: "ThisYearVsLastYear",
        computed:{
            chartData: function() {
                let toThisDateLastYear = this.$store.getters.getTotal({
                    startDate:  this.startOfLastYear, endDate: this.thisDateLastYear
                })
                let lastYearTotal = this.$store.getters.getTotal({
                    startDate: this.startOfLastYear, endDate: this.endOfLastYear
                })
                let thisYearTotal = this.$store.getters.getTotal({
                    startDate: this.startOfYear, endDate: this.endOfYear
                })

                return [
                    ["Stuff", "Revenue", { role: 'annotation'}],
                    [
                        "Year to Date",
                        {v: thisYearTotal, f: this.$options.filters.currency(thisYearTotal)},
                        this.$options.filters.currency(thisYearTotal)
                    ],
                    [
                        "Last Year To Date",
                        {v: toThisDateLastYear, f: this.$options.filters.currency(toThisDateLastYear)},
                        this.$options.filters.currency(toThisDateLastYear)
                    ],
                    [
                        "Last Year Total",
                        {v:lastYearTotal, f: this.$options.filters.currency(lastYearTotal)},
                        this.$options.filters.currency(lastYearTotal)
                    ]
                ]
            }
        },
        data() {
            return {
                startOfYear: moment().startOf('year'),
                endOfYear: moment().endOf('year'),
                thisDateLastYear: moment().subtract(1, 'years'),
                startOfLastYear: moment().subtract(1, 'years').startOf('year'),
                endOfLastYear: moment().subtract(1, 'years').endOf('year'),
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