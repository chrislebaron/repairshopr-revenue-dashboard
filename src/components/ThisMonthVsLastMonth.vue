<template>
    <div class="card border-info">
        <div class="card-header text-white bg-info">
            <h5>
                {{ startOfMonth.format("MMM YYYY")}} Vs. {{ startOfLastMonth.clone().subtract(1, 'months').format("MMM YYYY")}}
            </h5>

        </div>
        <div class="card-body">
            <!--<p>This Month To Date: {{ $store.getters.getTotal({startDate: startOfMonth, endDate: endOfMonth}) | currency }}</p>-->
            <!--<p>To This Date Last Month: {{ $store.getters.getTotal({startDate: startOfLastMonth, endDate: toThisDateLastMonth }) | currency }}</p>-->
            <!--<p>Total Last Month: {{ $store.getters.getTotal({startDate: startOfLastMonth, endDate: endOfLastMonth}) | currency }}</p>-->

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
        name: "ThisMonthVsLastMonth",
        computed: {
            chartData: function() {
                let thisMonthToDate = this.$store.getters.getTotal({
                    startDate: this.startOfMonth, endDate: this.endOfMonth
                });
                let toThisDateLastMonth= this.$store.getters.getTotal({startDate: this.startOfLastMonth, endDate: this.toThisDateLastMonth })
                let lastMonthTotal = this.$store.getters.getTotal({startDate: this.startOfLastMonth, endDate: this.endOfLastMonth})

                return [
                    ["Stuff", "Revenue", { role: 'annotation'}],
                    [
                        "Month To Date",
                        {v: thisMonthToDate, f: this.$options.filters.currency(thisMonthToDate)},
                        this.$options.filters.currency(thisMonthToDate)
                    ],
                    [
                        "Last Month To Date",
                        {v: toThisDateLastMonth, f: this.$options.filters.currency(toThisDateLastMonth)},
                        this.$options.filters.currency(toThisDateLastMonth)
                    ],
                    [
                        "Last Month Total",
                        {v:lastMonthTotal, f: this.$options.filters.currency(lastMonthTotal)},
                        this.$options.filters.currency(lastMonthTotal)
                    ]
                ]
            }
        },
        data() {
            return {
                startOfMonth: moment().startOf('month'),
                endOfMonth: moment().endOf('month'),
                toThisDateLastMonth: moment().subtract(1, 'months'),
                startOfLastMonth: moment().subtract(1, 'months').startOf('month'),
                endOfLastMonth: moment().subtract(1, 'months').endOf('month'),
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