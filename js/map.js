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
    //var latLng = new google.maps.LatLng( 40.708762, -74.006731 );
    var AberdeenlatLng = new google.maps.LatLng( 57.1497, 2.09 );
    var AmsterdamlatLng = new google.maps.LatLng( 52.37, 4.8952 );
    var HamburglatLng = new google.maps.LatLng( 53.55, 9.99 );
    var AarhuslatLng = new google.maps.LatLng( 56.16, 10.20 );
    var BradfordlatLng = new google.maps.LatLng( 53.796, 1.759 );
    var BergenlatLng = new google.maps.LatLng( 60.391, 5.322 );
    var GentlatLng = new google.maps.LatLng( 51.054, 3.7174 );
    var DordrechtlatLng = new google.maps.LatLng( 51.813, 4.6901 );
    var GothenburglatLng = new google.maps.LatLng( 57.7089, 11.9746 );

    var maplatLng = new google.maps.LatLng( 54.227, 5.636 );



    var map = new google.maps.Map( $('#map_canvas')[0], {
        zoom: 4,
        center: maplatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //pieChartData
    //per stad keywords and count in juiste formaat
/*     //curr format
    {
        gent: [ 
                {
                    value:"waste",
                    count: 2
                },
                {
                    value:"waste",
                    count: 2
                }
            ]
        aberdeen: [
            {
                value:"waste",
                count: 2
            },
            {
                value:"waste",
                count: 2
            }
        ]
    } */
 
    //console.log(pieChartData);



    // key: [[],[],[]]

/* 
    arr = [
        gent: [
            ["keyword",2],
            ["keyword",2]
        ],
        amsterdam: [
            ["keyword",2],
            ["keyword",2]
        ]
    ]

    let legendePieChart = ['keywors','frequency'];
    arr.forEach(element => {
        var marker = new ChartMarker({
            map: map,
            position: AberdeenlatLng,
            width: h,
            height: h,
            chartData: data,
            chartOptions: options,
            events: {
                click: function( event ) {
                    alert( 'Clicked marker' );
                }
            }
        });
    }); */


     
    

    var data = google.visualization.arrayToDataTable([
        [ 'Task', 'Hours per Day' ],
        [ 'Work', 11 ],
        [ 'Eat', 2 ],
        [ 'Commute', 2 ],
        [ 'Watch TV', 2 ],
        [ 'Sleep', 7 ]
    ]);

    var options = {
        fontSize: 8,
        backgroundColor: 'transparent',
        legend: 'none'
    };
    var h ='200px'
    var marker = new ChartMarker({
        map: map,
        position: AberdeenlatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });

    var marker = new ChartMarker({
        map: map,
        position: HamburglatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
    var marker = new ChartMarker({
        map: map,
        position: AarhuslatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
    var marker = new ChartMarker({
        map: map,
        position: BradfordlatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
    var marker = new ChartMarker({
        map: map,
        position: BergenlatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
    var marker = new ChartMarker({
        map: map,
        position: GentlatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            mouseenter: function( event ) {
                alert( 'mouse entered' );
            }
        }
    });
    var marker = new ChartMarker({
        map: map,
        position: DordrechtlatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
    var marker = new ChartMarker({
        map: map,
        position: GothenburglatLng,
        width: h,
        height: h,
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
};