
var age_total = 0;

$.ajax({
    type: "GET",
    url: "http://localhost/missing_voices_maps/data/m_voices.csv",
    dataType: "text",
    success: function(data){
      projectPerCounty = {}
      locations = $.csv.toObjects(data);
      //console.log(locations);
      var ages = new Array();
          
      var year_count = new Array();
      locations.forEach(function(element, index){
          
        if(Number.isInteger(parseInt(element["Age"]))){

            var agenumber = parseInt(element["Age"]);
            var year = element["Year"];
            ages.push(agenumber);
              
        }       

        var year = element["Year"];
        year_count.push(year);

      });

      function foo(arr) {
          var a = [], b = [], prev;
          
          arr.sort();
          for ( var i = 0; i < arr.length; i++ ) {
              if ( arr[i] !== prev ) {
                  a.push(arr[i]);
                  b.push(1);
              } else {
                  b[b.length-1]++;
              }
              prev = arr[i];
          }
          
          return [a, b];
      }

      var result = foo(year_count);

       console.log(result[0]);
    //   console.log(result[1]); 

      //console.log(ages);

        Highcharts.chart('bargraph', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Missing Persons, 2001 to, 2018'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories:result[0],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'No. of People Missing (Hundreds)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:f} Persons</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Years',
                    data: result[1]
                }
            ]
        });

    }
}); 

