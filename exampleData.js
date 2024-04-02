
let testArray  =[
    "4b1817",
    "SWR7EA  ",//call sign
    "Switzerland",//origin country
    1708882763, 
    1708882765, 
    6.5557, // Use for position (longtude)
    47.6903, // Use for position (lat)
    10309.86, // sea level altitude?
    false, // on ground?
    201.89, // velocity in m/s
    284.46, // direction in degrees from north
    7.48, // vertical rate m/s-positive number=climbing, negative number = descending
    null, //null if no filtering for sensons from request
    9928.86, //other altitude
    "3020", //transponder code
    false, // special purpose?
    0
    
]
// let testGeoData={
//     "type": "Feature",
//     "properties": {
//         "name": exampleData[1], //call sign
//         "amenity": exampleData[2], //country of origin
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [exampleData[6], exampleData[5]]
//     }
//}