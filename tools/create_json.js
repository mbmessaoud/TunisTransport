
const fs = require('fs');

const LONG_INDEX = 9;

var Stations = {stations:[]}; 

function testForCordinate(value)
{

   for (let i = 0,  len = value.length; i < len; i++)
   {
      if('.' == value[i])
      {
         return true;
      }
   }
   console.log("error value = ", value);
   return false;
}

// First I want to read the file
fs.readFile('../data/station.txt', "utf8",function read(err, data) {
    if (err) {
        throw err;
    }
   //console.log(data);

 let arrLines = data.split("\n");
        let MinLat,MaxLat,MinLong,MaxLong;
        
        for (let index = 1 ; index < arrLines.length; index++)
        {
           const items = arrLines[index].split(",");
            
            if(items.length < LONG_INDEX)
            {
               break;
            }
            let i = LONG_INDEX;
            while (false == testForCordinate(items[i]))
            {
               i++;
            }
            const lat =parseFloat(items[i+1]);
            const long = parseFloat(items[i]);
           //console.log(items[9], items[10]);
           if(items.length > 1)
           {
              
               if ( !MinLat || MinLat > lat)
               {
                   console.log("MinLat  = ",MinLat, "lat = ",lat, " MinLat = ", lat);
        
                  MinLat =  lat;
                 
               }
               if ( !MaxLat || MaxLat < lat)
               {
                    console.log("MaxLat  = ",MaxLat, "lat = ",lat, " MaxLat = ", lat);
                  MaxLat =  lat;
               }
               if ( !MinLong || MinLong > long)
               {
                   console.log("MinLong  = ",MinLong, "long = ",long, " MinLong = ", long);
                  MinLong =  long;
                  
               }
               if ( !MaxLong || MaxLong < long)
               {
                          console.log("MaxLong  = ",MaxLong, "long = ",long, " MaxLong = ", long);
                  MaxLong = long;
                 
               }
               
            //console.log(data.stations);
               Stations.stations.push({name:items[1],lat:lat,long:long});
            }
         }

         Stations.bounds = [[MinLat,MinLong],[MaxLat,MaxLong]];

         console.log(Stations.bounds);
         console.log(Stations.stations.length);

        fs.writeFile ("../dist/data/stations.json", JSON.stringify(Stations), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
});


