(function(){
   
    // const exampleData = {
    //     "time": 1708886803,
    //     "states": [
    //         [
    //             "4b1817",
    //             "SWR7EA  ",
    //             "Switzerland",
    //             1708886741,
    //             1708886743,
    //             3.3471,
    //             49.3121,
    //             11582.4,
    //             false,
    //             220.68,
    //             312.35,
    //             0.33,
    //             null,
    //             11079.48,
    //             "3020",
    //             false,
    //             0
    //         ],
    //         [
    //             "c03bf2",
    //             "WJA651  ",
    //             "Canada",
    //             1708887626,
    //             1708887626, 
    //             39.75621,
    //             -104.99404,
    //             3352.8,
    //             false,
    //             148.47,
    //             306.83,
    //             5.85,
    //             null,
    //             2026.92,
    //             "2276",
    //             false,
    //             0
    //         ],
    //         [
    //             "c04fe4",
    //             "ACA874  ",
    //             "Canada",
    //             1708887636,
    //             1708887636,
    //             -7.4425,
    //             53.4074,
    //             11277.6,
    //             false,
    //             256.44,
    //             118.52,
    //             0,
    //             null,
    //             10599.42,
    //             "6301",
    //             false,
    //             0
    //         ]
    //     ]
    // }

    //create map in leaflet and tie it to the div called 'theMap'
    const map = L.map('theMap').setView([42, -60], 4);

    const planeIcon = L.icon({
        iconUrl: 'plane.png',
    
        iconSize:     [25, 25], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [45, 61], // point of the icon which will correspond to marker's location CHANGE THIS 
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-10, -95] // point from which the popup should open relative to the iconAnchor

    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    // L.marker([42, -60],{icon:planeIcon}).addTo(map)
    //     .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
    //     .openPopup();
    
       

    let myLayer = L.geoJSON().addTo(map); //declaring new layer
        
    function formatDataGeo(rawData){ //format raw data to geojson format using map
        const mappedJson = rawData.map(function(dataItem){
            return {
                "type": "Feature",
                "properties": {
                    "name": dataItem[1],
                    "amenity": dataItem[2],
                    "popupContent": "testing",
                    "altitude": dataItem[13],
                    "bearing": dataItem[10]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [dataItem[5], dataItem[6]]
                }
            }
        })
        //console.log(mappedJson)
        return mappedJson
    }

    function populateMap(geoJson){ //put icons and pop-ups on the map
       
        myLayer = L.geoJSON(null, {
            pointToLayer: function (feature, latlng) {
                const marker = L.marker(latlng, { icon: planeIcon, rotationAngle:(feature.properties.bearing)-360 });
                marker.bindPopup(`Call Sign: ${feature.properties.name}<br>Originating Country: ${feature.properties.amenity}<br>Altitude: ${feature.properties.altitude} m above sea level`);
                return marker;
            }
        }).addTo(map);
        
        geoJson.forEach(item => {
            myLayer.addData(item);//add EACH data point to map
        });
    }
    function getData(){ // main function that calls all other functions an fetches data
        fetch('https://prog2700.onrender.com/opensky')
        .then(response => response.json())
        .then(json => {
            console.log(json);
        
            const canadianData = json.states.filter(function(data){//filter by country of origin
                return data[2] === "Canada"
            })
            //console.log(canadianData)
            const formattedCadFlights = formatDataGeo(canadianData)//turn cad data into geojson format
            //console.log(formattedCadFlights)
            myLayer.clearLayers();//remove old data
            populateMap(formattedCadFlights)//populate the formatted canadian flight data onto the map
            setTimeout(getData, 15000) //call setTimeout every 15 secs.
        })
        // Run using test data
    //     const canadianData = exampleData.states.filter(function(data){
    //         return data[2] === "Canada"
    //     }) 
    //    return canadianData
    }

    getData();
 
    

})()
