function getPieChartData() {
    const spreadsheetURL = "https://spreadsheets.google.com/feeds/list/1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2Y" +
            "fIQjzbM/od6/public/values?alt=json";
    fetch(spreadsheetURL)
        .then(r => r.json())
        .then(function(data) { 
            const pieChartData = transformData(data.feed.entry);
            //initializeMap(pieChartData);
            return pieChartData;
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
    var pieChartData = {};
    
    cities.forEach(city => {
        JSONdata.forEach(challenge => {
            if(challenge['gsx$city']['$t'] === city) {
                //"keyword1,keyword2" => [keyword1,keyword2]
                let challengeKeywords = challenge['gsx$keywords']['$t'].split(", ");
                //[keyword1,keyword2] + [keyword1,keyword2] => city: [keyword,keyword,keyword...]
                cityKeywords[city] = cityKeywords[city].concat(challengeKeywords);
            }
        })
    });

    cities.forEach(city => { pieChartData[city] = compressArray(cityKeywords[city]); })  
    
    console.log(pieChartData);
    return pieChartData;
}
    
function compressArray(original) {
	let compressed = [];
	// make a copy of the input array
	let copy = original.slice(0);
	// first loop goes over every element
	for (let i = 0; i < original.length; i++) {
		let myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (let w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
		if (myCount > 0) {
			let a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
	return compressed;
};