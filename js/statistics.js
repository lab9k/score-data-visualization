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
                //"keyword1,keyword2" => [keyword1,keyword2]
                let challengeKeywords = challenge['gsx$keywords']['$t'].split(", ");
                //[keyword1,keyword2] + [keyword1,keyword2] => city: [keyword,keyword,keyword...]
                cityKeywords[city] = cityKeywords[city].concat(challengeKeywords);
            }
        })
    });

    cities.forEach(city => {
        
    })  

    //count doubles + build up JSON object
    console.log(compressArray(cityKeywords['Gent']));
}
    



function initializeMap(pieChartData) {
  

}


function compressArray(original) {

	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};

// It should go something like this:

var testArray = new Array("dog", "dog", "cat", "buffalo", "wolf", "cat", "tiger", "cat");
var newArray = compressArray(testArray);

 
/*
console: [
	Object { value="dog", count=2}, 
	Object { value="cat", count=3}, 
	Object { value="buffalo", count=1}, 
	Object { value="wolf", count=1}, 
	Object { value="tiger", count=1}
]
*/
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
