$.ajax({
  type: "GET",
  url: "http://localhost/Legibra/missing-voices-maps-and-stats/data/m_voices.csv",
  dataType: "text",
  success: function(data) {
    projectPerCounty = {}
    //console.log(locations);
    locations = $.csv.toObjects(data);

    var ages_male = [
      []
    ];
    var ages_female = [
      []
    ];

    var nairobi_arr = new Array();
    var coast_arr = new Array();
    var central_arr = new Array();
    var nyanza_arr = new Array();
    var western_arr = new Array();
    var easter_arr = new Array();
    var north_arr = new Array();
    var rift_arr = new Array();

    var i = 0;

console.log(locations);

    locations.forEach(function(element, index) {

      i++;

      if (Number.isInteger(parseInt(element["Age"]))) {

        if (element["Gender"] == "M") {
          var agenumber = parseInt(element["Age"]);
          var year = element["Year"];
          ages_male.push([agenumber, i]);
        }

        if (element["Gender"] == "F") {
          var agenumber = parseInt(element["Age"]);
          var year = element["Year"];
          ages_female.push([agenumber, i]);
        }

      }

      //console.log(ages);

      if (element[" Province"] == "Nairobi") {
        var year = element["Year"];
        //if (year >= "2010") {
        nairobi_arr.push(year);
        //}
      }

      if (element[" Province"] == "Mombasa" || element[" Province"] == "Kwale" || element[" Province"] == "Likoni") {
        var year = element["Year"];
        //if (year >= "2010") {
        coast_arr.push(year);
        //}
      }

      if (element[" Province"] == "Nyeri" || element[" Province"] == "Murang'a" || element[" Province"] == "Nyeri- Solio Ranch" || element[" Province"] == "Kirinyaga") {
        var year = element["Year"];
        //if (year >= "2010") {
        central_arr.push(year);
        //}
      }

      if (element[" Province"] == "Kisumu" || element[" Province"] == "Kisii") {
        var year = element["Year"];
        //if (year >= "2010") {
        nyanza_arr.push(year);
        //}
      }

      if (element[" Province"] == "Bungoma" || element[" Province"] == "Vihiga" || element[" Province"] == "Kakamega") {
        var year = element["Year"];
        //if (year >= "2010") {
        western_arr.push(year);
        //}
      }

      if (element[" Province"] == "Meru") {
        var year = element["Year"];
        //if (year >= "2010") {
        easter_arr.push(year);
        //}
      }

      if (element[" Province"] == "Garissa" || element[" Province"] == "Mandera" || element[" Province"] == "Wajir" || element[" Province"] == "Marsabit") {
        var year = element["Year"];
        //if (year >= "2010") {
        north_arr.push(year);
        //}
      }

      if (element[" Province"] == "Nakuru" || element[" Province"] == "Laikipia" || element[" Province"] == "Baringo" || element[" Province"] == "Bomet County- Sotik sub county") {
        var year = element["Year"];
        //if (year >= "2010") {
        rift_arr.push(year);
        //}
      }



    });
    //console.log(year_count.sort());

    function foo(arr) {
      var a = [],
        b = [],
        prev;

      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }

      return [a, b];
    }

    var nairobi = foo(nairobi_arr);
    var coast = foo(coast_arr);
    var central = foo(central_arr);
    var nyanza = foo(nyanza_arr);
    var western = foo(western_arr);
    var eastern = foo(easter_arr);
    var north = foo(north_arr);
    var rift = foo(rift_arr);

    // console.log(central[0]);
    // console.log(central[1]);

    let nairobi_total = 0;
    let nairobi_items = nairobi[1];
    for (let index = 0; index < nairobi_items.length; index++) {
      nairobi_total = nairobi_total + nairobi_items[index];

    }

    let coast_total = 0;
    let coast_items = coast[1];
    for (let index = 0; index < coast_items.length; index++) {
      coast_total = coast_total + coast_items[index];

    }

    let central_total = 0;
    let central_items = central[1];
    for (let index = 0; index < central_items.length; index++) {
      central_total = central_total + central_items[index];

    }

    let nyanza_total = 0;
    let nyanza_items = nyanza[1];
    for (let index = 0; index < nyanza_items.length; index++) {
      nyanza_total = nyanza_total + nyanza_items[index];

    }

    let western_total = 0;
    let western_items = western[1];
    for (let index = 0; index < western_items.length; index++) {
      western_total = western_total + western_items[index];

    }

    let eastern_total = 0;
    let eastern_items = eastern[1];
    for (let index = 0; index < eastern_items.length; index++) {
      eastern_total = eastern_total + eastern_items[index];

    }

    let north_total = 0;
    let north_items = north[1];
    for (let index = 0; index < north_items.length; index++) {
      north_total = north_total + north_items[index];

    }

    let rift_total = 0;
    let rift_items = rift[1];
    for (let index = 0; index < rift_items.length; index++) {
      rift_total = rift_total + rift_items[index];

    }

    var percentage_total = nairobi_total + coast_total + central_total + nyanza_total + western_total + eastern_total + north_total + rift_total;

    var nairobi_percentage = (nairobi_total / percentage_total) * 100;
    var coast_percentage = (coast_total / percentage_total) * 100;
    var central_percentage = (central_total / percentage_total) * 100;
    var nyanza_percentage = (nyanza_total / percentage_total) * 100;
    var western_percentage = (western_total / percentage_total) * 100;
    var eastern_percentage = (eastern_total / percentage_total) * 100;
    var north_percentage = (north_total / percentage_total) * 100;
    var rift_percentage = (rift_total / percentage_total) * 100;
    //console.log(percentage);

    var twod_array = [
      []
    ];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        twod_array.push([i, j]);

      }
    }


    /*
     *   Pie Chart
     *
     */




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
        text: 'Missing/Dead Person By Regional , 1995 to 2018'
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
          y: nairobi_percentage,
          sliced: true,
          selected: true
        }, {
          name: 'Coast:',
          y: coast_percentage
        }, {
          name: 'Nyanza:',
          y: nyanza_percentage
        }, {
          name: 'Western:',
          y: western_percentage
        }, {
          name: 'North Eastern:',
          y: north_percentage
        }, {
          name: 'Central:',
          y: central_percentage
        }, {
          name: 'Rift Valley',
          y: rift_percentage
        }, {
          name: 'Eastern',
          y: eastern_percentage
        }]
      }]
    });


    /*
     *   Bubble Chart
     *
     */

console.log(ages_female);

    Highcharts.chart('bubblechart', {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Age By Gender of Missing/Dead Persons'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Age'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} Years'
          }
        }
      },
      series: [{
        name: 'Female',
        color: 'rgba(223, 83, 83, .5)',
        data: ages_female

      }, {
        name: 'Male',
        color: 'rgba(119, 152, 191, .5)',
        data: ages_male
      }]
    });

    /*
     *   Line Chart
     *
     */

    var nairobi = generateYearDifference(foo(nairobi_arr), 1);
    var coast = generateYearDifference(foo(coast_arr), 1);
    var central = generateYearDifference(foo(central_arr), 1);
    var nyanza = generateYearDifference(foo(nyanza_arr), 1);
    var western = generateYearDifference(foo(western_arr), 1);
    var eastern = generateYearDifference(foo(easter_arr), 1);
    var north = generateYearDifference(foo(north_arr), 1);
    var rift = generateYearDifference(foo(rift_arr), 1);

    // console.log(north_arr);
    // console.log(north);

    Highcharts.chart('linegraph', {

      title: {
        text: 'Missing/Dead Persons In All Regions In Kenya'
      },

      subtitle: {
        text: ''
      },

      yAxis: {
        title: {
          text: 'Number of Missing/Dead Persons'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1995
        }
      },

      series: [{
        name: 'Nairobi',
        data: nairobi[1]
      }, {
        name: 'Central',
        data: central[1]
      }, {
        name: 'Nyanza',
        data: nyanza[1]
      }, {
        name: 'Western',
        data: western[1]
      }, {
        name: 'Eastern',
        data: eastern[1]
      }, {
        name: 'North Eastern',
        data: north[1]
      }, {
        name: 'Coast',
        data: coast[1]
      }, {
        name: 'Rift Valley',
        data: rift[1]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    });


    function generateYearDifference(array, diff) {
      var firstYear = 1995
      var firstElement = 1995;
      var lastElement = parseInt(array[0][array[0].length - 1]);
      var la = lastElement
      var num = 0
      mainArray = {}
      for (var x in array[0]) {
        mainArray[array[0][x]] = array[1][num]
        num++
      }
      // console.log(mainArray);

      var years = []
      while (firstElement < (lastElement + diff)) {
        years.push(firstElement);

        firstElement += diff
      }

      // console.log(years);

      var yearData = []

      var prevousYear = 0
      var emptyStatus = null
      for (var y in years) {
        var year = years[y]


        if (array[1][0] == year) {
          prevousYear = year
          yearData.push(array[1][0])
          prevousYear = parseInt(prevousYear) + 1;
          // emptyStatus=0
        } else {
          var totalData = 0

          if (mainArray[year]) {
            emptyStatus = 0

            while (prevousYear <= year) {
              //  console.log(prevousYear);
              if (mainArray[prevousYear]) {
                totalData += mainArray[prevousYear]
              }
              prevousYear = prevousYear + 1
            }
            yearData.push(totalData);
          } else {
            yearData.push(emptyStatus);
          }


        }
      }

      // console.log(yearData);

      years.pop()
      years.push(la)





      return [years, yearData]

    }

  }
});
