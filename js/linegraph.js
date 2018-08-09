

/*
*   Line Graph
*
*/
Highcharts.chart('piechart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Missing Person By Regional January, 2012 to April, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'County',
        colorByPoint: true,
        data: [{
            name: 'Nairobi:',
            y: 61,
            sliced: true,
            selected: true
        }, {
            name: 'Coast:',
            y: 11
        }, {
            name: 'Nyanza:',
            y: 10
        }, {
            name: 'Western:',
            y: 4
        }, {
            name: 'North Eastern:',
            y: 4
        }, {
            name: 'Central:',
            y: 1
        }, {
            name: 'Uasin Gishu',
            y: 1
        }, {
            name: 'Garissa',
            y: 1
        }, {
            name: 'Mombasa',
            y: 2
        }]
    }]
});
