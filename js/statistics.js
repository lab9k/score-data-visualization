function getChartData() {
    const spreadsheetURL = "https://spreadsheets.google.com/feeds/list/1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2Y" +
            "fIQjzbM/od6/public/values?alt=json";
            
    fetch(spreadsheetURL)
        .then(r => r.json())
        .then(data => console.log(data.feed.entry))
        .catch(e => console.log)
       

}

function initializeMap() {}

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
