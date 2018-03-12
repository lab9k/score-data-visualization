function getJSONChartData() {
    const spreadsheetURL = "https://spreadsheets.google.com/feeds/list/1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2Y" +
            "fIQjzbM/od6/public/values?alt=json";
    fetch(spreadsheetURL)
        .then(r => r.json())
        .then(function(data) { 
            const pieChartData = transformData(data.feed.entry);
            initializeMap(pieChartData);
        })
        .catch(e => 
            console.log
        );
}


/*
    var keywords = {
        "gent": {
            "keyword 1": 5,
            "keyword 2": 7,
            "keyword 3": 5
        },
        "amsterdam": {
            "keyword 1": 5,
            "keyword 2": 7,
            "keyword 3": 5
        }
    } */
function transformData(JSONdata) {
    const cities=['Aarhus','Aberdeen','Amsterdam','Bradford','Bergen','Dordrecht','Gent','Gothenburg','Hamburg'];
    let cityKeywords = {
        'Aarhus': [],
        'Aberdeen': [],
        'Amsterdam': [],
        'Bradford': [],
        'Bergen': [],
        'Dordrecht': [],
        'Gent': [],
        'Gothenburg': [],
        'Hamburg': []
    };
    
    cities.forEach(city => {
        JSONdata.forEach(challenge => {
            if(challenge['gsx$city']['$t'] === city) {
                //console.log(city+ ": " + challenge['gsx$keywords']['$t']); 
                let challengeKeywords = challenge['gsx$keywords']['$t'].split(", ");
                //console.log(city + ": " + challengeKeywords);
                cityKeywords[city] = cityKeywords[city].concat(challengeKeywords);
                //console.log(cityKeywords[city].concat(challengeKeywords));
                //.split, in array steken,

                // gent: [keyword,keyword,keyword]
            }
        })
    })

    for(var key in cityKeywords) {
        var value = cityKeywords[key];
        console.log(key + ":\n " + value);
        // do something with "key" and "value" variables
       
      }
    //console.log("blasdf")
    return null;
}
    



function initializeMap(pieChartData) {
  

}

/*
    var keywords = {
        "gent": {
            "keyword 1": 5,
            "keyword 2": 7,
            "keyword 3": 5
        },
        "amsterdam": {
            "keyword 1": 5,
            "keyword 2": 7,
            "keyword 3": 5
        }
    } */

 /*    var participating_cities = {
        gent: ['item1','item1','item2'],
        amsterdam: ['item3','item3','item1'],
        bradford: [],
        gothenburg: []
    }; */
