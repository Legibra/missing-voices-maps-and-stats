$(document).ready(function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoiZ3JlZ2dhd2F0dCIsImEiOiJjaWppNGpzZm4wMnZxdHRtNWNuaHFsOWE5In0.XZJCOdDSALLBYWBt4bHmlw';
  var map = L.mapbox.map('map', 'mapbox.streets')
                    .setView([1, 36], 6)
  var unclustered = L.mapbox.featureLayer();
  var clustered = L.markerClusterGroup();
  var counties = "";
  var county_name,gender,status = "";

  var getSelectedCounty = "";
  var getSelectedGender = "";
  var getSelectedStatus = "";

  var projectPerCounty = {}

  var myIcon = L.mapbox.marker.icon({
      'marker-size': 'small',
      'marker-color': '#F15A24'
  })

  function popUp(element){
    return "<img src='images/kenyamap.png' width='100%'/>" + "</br></br>" +
     element["Description (Status) Summary of Incident"] + "<br/>" +
      "<br/>" + "<span class='map-date'>" + element["Month/ Date"] + '-' + element["Year"] + "</span>";
  }

  function drawCounties(){
    $.ajax({
      type: "GET",
      url: "http://localhost/missing_voices_maps/data/counties.geojson",
      dataType: "text",
      success: function(data){
        counties = JSON.parse(data)
        L.geoJson(counties,  {
          style: getStyle,
        }).addTo(map);
      }
    });
  }


  function getStyle(feature) {
    return {
      weight: 2,
      opacity: 0.1,
      color: '#F15A24',
      weight: 1,
      fillOpacity: 1,
      fillColor: '#00800030'
    };
  }

  function getColor(d) {
    return d > 300 ? '#8c2d04' :
        d > 200  ? '#cc4c02' :
        d > 100  ? '#ec7014' :
        d > 70  ? '#fe9929' :
        d > 50   ? '#fec44f' :
        d > 30   ? '#fee391' :
        d > 20   ? '#fff7bc' :
        '#ffffe5';
  }

  function getLegendHTML() {
    var grades = [0, 20, 30, 50, 70, 100, 200, 300],
    labels = [],
    from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<li><span class="swatch" style="background:' + getColor(from + 1) + '"></span> ' +
        from + (to ? '&ndash;' + to : '+')) + '</li>';
    }

    return '<span>Missing Persons Per County(Age)</span><ul>' + labels.join('') + '</ul>';
  }


  function populateClusteredMap(county_name,gender,status) {
      $.ajax({
      type: "GET",
      url: "http://localhost/missing_voices_maps/data/m_voices.csv",
      dataType: "text",
      success: function(data){
        projectPerCounty = {}
        locations = $.csv.toObjects(data);
        locations.forEach(function(element, index){
          if(typeof projectPerCounty[element[" Province"]] === 'undefined'){
            projectPerCounty[element[" Province"]] = 1
          } else {
            projectPerCounty[element[" Province"]] = 1 + projectPerCounty[element[" Province"]]
          }
          lat_long = element.Latitude_and_Longitude.replace(/[()]/g, '').replace(/\s/g, '').split(',')
          //console.log(lat_long);
          //console.log(element[" Province"]);
          if(typeof lat_long[0] === 'undefined' || typeof lat_long[1] === 'undefined'){
            console.log(element.EPGeoName + " does not have valid location data, skipping")
          } else {

            if (county_name !== "") {
              if (element[" Province"].toUpperCase() == county_name) {
  
                var marker = L.marker([lat_long[0], lat_long[1]], {
                  icon: myIcon
                }).bindPopup(popUp(element))
                clustered.addLayer(marker)
                
              }
            } else if( gender !== "" ){
              if (element["Gender"] == gender) {
  
                var marker = L.marker([lat_long[0], lat_long[1]], {
                  icon: myIcon
                }).bindPopup(popUp(element))
                clustered.addLayer(marker)
                
              }
            } else if( status !== "" ){
              if (element["Current status (missing, dead?) "] == status) {
  
                var marker = L.marker([lat_long[0], lat_long[1]], {
                  icon: myIcon
                }).bindPopup(popUp(element))
                clustered.addLayer(marker)
                
              }
            }else{
               var marker = L.marker([lat_long[0], lat_long[1]], {
                  icon: myIcon
                }).bindPopup(popUp(element))
                clustered.addLayer(marker)
            }
          }
        });

        drawCounties();
        map.legendControl.addLegend(getLegendHTML());
        map.addLayer(clustered);
      }
    });
  }

  $("#button").click(function(){
    if(this.innerHTML == "Uncluster"){
      populateUnclusteredMap()
      map.removeLayer(clustered)
      this.innerHTML = "Cluster"
    } else {
      populateClusteredMap()
      map.removeLayer(unclustered)
      this.innerHTML = "Uncluster"
    }
  });

  //populateClusteredMap("","",""); 

  $( "#kenya_counties" ).change(function() {
    map.removeLayer(clustered);
    getSelectedCounty = $("#kenya_counties option:selected").val();
    populateClusteredMap(getSelectedCounty,"",""); 
  });

  $( "#map_gender" ).change(function() {
    map.removeLayer(clustered);
    getSelectedGender = $("#map_gender option:selected").val();
    populateClusteredMap("",getSelectedGender,""); 
  });

  $( "#map_status" ).change(function() {
    map.removeLayer(clustered);
    getSelectedStatus = $("#map_status option:selected").val();
    populateClusteredMap("","",getSelectedStatus); 
  });
  
});
