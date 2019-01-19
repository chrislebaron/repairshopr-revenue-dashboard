<template>
    <div class="col-12">
        <div class="card border-info">
            <div class="card-header text-white bg-info">
                <h5>Past 12 months Revenue</h5>
            </div>
            <div class="card-body">
                <GChart
                        type="BarChart"
                        :data="chartData"
                        :options="chartOptions"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "Past12Months",
        computed: {
            chartData: function() {
                const twelveMonthsAgo = moment().subtract(12, 'months');
                let chartData = [['Month', 'Revenue', { role: 'annotation'}]];
                for(let i=0; i<=12;i++){
                    let month = twelveMonthsAgo.clone().add(i, 'months').format('MM/YYYY');

                    let total = this.$store.getters.getTotal({startDate: twelveMonthsAgo.clone().add(i, 'months').startOf('month'), endDate: twelveMonthsAgo.clone().add(i, 'months').endOf('month')});
                    chartData.push(
                        [
                            month,
                            {v: total, f: this.$options.filters.currency(total)},
                            this.$options.filters.currency(total)
                        ]
                    );
                    if(i === 12) return chartData;
                }

            }
        },
        data(){
            return {
                twelveMonthsAgo: moment().subtract(12, 'months'),
                chartOptions: {
                    height: 400,
                    bar: {groupWidth: "90%"},
                    chartArea: {'height': '85%'},
                    hAxis: {
                        format:'$###,###,###',
                        title: 'Revenue'
                    },
                    legend: {position: 'none'}
                },
            }
        },
        async created(){

        }
    }
</script>

<style scoped>

</style>