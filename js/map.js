google.load( 'visualization', '1', { packages:['corechart'] });

function ChartMarker( options ) {
    this.setValues( options );

    this.$inner = $('<div>').css({
        position: 'relative',
        left: '-50%', top: '-50%',
        width: options.width,
        height: options.height,
        fontSize: '1px',
        lineHeight: '1px',
        backgroundColor: 'transparent',
        cursor: 'default'
    });

    this.$div = $('<div>')
        .append( this.$inner )
        .css({
            position: 'absolute',
            display: 'none'
        });
};

ChartMarker.prototype = new google.maps.OverlayView;

ChartMarker.prototype.onAdd = function() {
    $( this.getPanes().overlayMouseTarget ).append( this.$div );
};

ChartMarker.prototype.onRemove = function() {
    this.$div.remove();
};

ChartMarker.prototype.draw = function() {
    var marker = this;
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel( this.get('position') );

    this.$div.css({
        left: position.x,
        top: position.y,
        display: 'block'
    })

    this.$inner
        .html( '<img src="' + this.get('image') + '"/>' )
        .click( function( event ) {
            var events = marker.get('events');
            events && events.click( event );
        });

    this.chart = new google.visualization.PieChart( this.$inner[0] );
    this.chart.draw( this.get('chartData'), this.get('chartOptions') );
};

function initializeMap(pieChartData) {
    const legendPieChart= ['keywords','frequency'];
    //var latLng = new google.maps.LatLng( 40.708762, -74.006731 );
    var AberdeenlatLng = new google.maps.LatLng( 57.375210, -2.108806 );
    var AmsterdamlatLng = new google.maps.LatLng( 52.37, 4.8952 );
    var HamburglatLng = new google.maps.LatLng( 53.55, 9.99 );
    var AarhuslatLng = new google.maps.LatLng( 56.16, 10.20 );
    var BradfordlatLng = new google.maps.LatLng( 53.796, 1.759 );
    var BergenlatLng = new google.maps.LatLng( 60.391, 5.322 );
    var GentlatLng = new google.maps.LatLng( 51.054, 3.7174 );
    var DordrechtlatLng = new google.maps.LatLng( 51.813, 4.6901 );
    var GothenburglatLng = new google.maps.LatLng( 57.7089, 11.9746 );
    
    let cityLatLng = {
        'Aberdeen': AberdeenlatLng, 
        'Amsterdam':AmsterdamlatLng, 
        'Hamburg': HamburglatLng, 
        'Aarhus': AarhuslatLng, 
        'Bradford':BradfordlatLng, 
        'Bergen':BergenlatLng, 
        'Gent':GentlatLng,
        'Dordrecht':DordrechtlatLng, 
        'Gothenburg':GothenburglatLng
    };

    var maplatLng = new google.maps.LatLng( 54.227, 5.636 );

    var map = new google.maps.Map( $('#map_canvas')[0], {
        zoom: 4,
        center: maplatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    
    var options = {
        fontSize: 8,
        backgroundColor: 'transparent',
        legend: 'none'
    };
    var h ='200px'

    for(let city in pieChartData) {
        let cityData = pieChartData[city];
        cityData.splice(0,0,legendPieChart);  
        let dataTableVisualization = google.visualization.arrayToDataTable(cityData);

        var marker = new ChartMarker({
            map: map,
            position: cityLatLng[city],
            width: h,
            height: h,
            chartData: dataTableVisualization,
            chartOptions: options,
            events: {
                click: function( event ) {
                    alert( 'Clicked marker' );
                }
            }
        }); 
        //console.log(city);
    }

};