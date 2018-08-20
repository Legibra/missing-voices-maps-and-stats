
var age_total = 0;

$.ajax({
    type: "GET",
    url: "http://localhost/Legibra/missing-voices-maps-and-stats/data/m_voices.csv",
    dataType: "text",
    success: function(data){
      projectPerCounty = {}
      locations = $.csv.toObjects(data);
      // console.log(locations);
      var ages = new Array();

      var year_count = new Array();
      locations.forEach(function(element, index){

        if(Number.isInteger(parseInt(element["Age"]))){

            var agenumber = parseInt(element["Age"]);
            var year = element["Year"];
            ages.push(agenumber);

        }

        var year = element["Year"];
        if(year!=""){
          // console.log(element);
        year_count.push(year);
      }

      });

// console.log(year_count.filter(findUnique).sort());


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

    return generateYearDifference([a, b],2);
}


      var result = foo(year_count);
    //   console.log(result[0]);
    //  console.log(result[1]);

      //  console.log(result[0]);
      // console.log(result[1]);

      //console.log(ages);

        Highcharts.chart('bargraph', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Missing Persons, 1995 to, 2018'
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



        function generateYearDifference(array,diff){

          var firstElement=parseInt(array[0][0]);
         var lastElement=parseInt(array[0][array[0].length-1]);
        var la=lastElement
        var num=0
        mainArray={}
        for(var x in array[0]){
        mainArray[""+array[0][x]]=array[1][num]
        num++
        }
        // console.log(mainArray);

         var years=[]
         while(firstElement<(lastElement+diff)){
           years.push(""+firstElement);

           firstElement+=diff
         }

         // console.log(years);

         var yearData=[]

         var prevousYear=0
         for(var y in years){
           var year=years[y]


           if(prevousYear==0){
             prevousYear=year
             yearData.push(array[1][0])
             prevousYear=parseInt(prevousYear)+1;
           }else {
             var totalData=0


             while(prevousYear<=year){
              //  console.log(prevousYear);
               if(mainArray[""+prevousYear]){
                totalData+=mainArray[""+prevousYear]
              }
              prevousYear=prevousYear+1
             }
             yearData.push(totalData);

           }
         }

         // console.log(yearData);

        years.pop()
        years.push(""+la)

        return [years,yearData]

        }

    }
});
