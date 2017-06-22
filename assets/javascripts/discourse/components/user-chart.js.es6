import { observes, on } from 'ember-addons/ember-computed-decorators';
import loadScript from 'discourse/lib/load-script';

export default Ember.Component.extend({
  @on('init')
  chart(){
    var data = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 2, 0],
      [0, 3, 0],
      [0, 4, 0],
      [0, 5, 0],
      [0, 6, 0],
      [0, 7, 0],
      [0, 8, 0],
      [0, 9, 0],
      [0, 10, 0],
      [0, 11, 0],
      [0, 12, 1],
      [0, 13, 1],
      [0, 14, 0],
      [0, 15, 0],
      [0, 16, 0],
      [0, 17, 0],
      [0, 18, 0],
      [0, 19, 0],
      [0, 20, 0],
      [0, 21, 0],
      [0, 22, 0],
      [0, 23, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 2, 0],
      [1, 3, 0],
      [1, 4, 0],
      [1, 5, 0],
      [1, 6, 0],
      [1, 7, 0],
      [1, 8, 0],
      [1, 9, 0],
      [1, 10, 0],
      [1, 11, 0],
      [1, 12, 0],
      [1, 13, 0],
      [1, 14, 0],
      [1, 15, 0],
      [1, 16, 2],
      [1, 17, 0],
      [1, 18, 0],
      [1, 19, 0],
      [1, 20, 0],
      [1, 21, 0],
      [1, 22, 0],
      [1, 23, 0],
      [2, 0, 0],
      [2, 1, 0],
      [2, 2, 0],
      [2, 3, 0],
      [2, 4, 0],
      [2, 5, 0],
      [2, 6, 1],
      [2, 7, 1],
      [2, 8, 0],
      [2, 9, 0],
      [2, 10, 0],
      [2, 11, 0],
      [2, 12, 0],
      [2, 13, 0],
      [2, 14, 0],
      [2, 15, 0],
      [2, 16, 0],
      [2, 17, 0],
      [2, 18, 1],
      [2, 19, 0],
      [2, 20, 0],
      [2, 21, 0],
      [2, 22, 1],
      [2, 23, 1],
      [3, 0, 2],
      [3, 1, 3],
      [3, 2, 1],
      [3, 3, 0],
      [3, 4, 0],
      [3, 5, 1],
      [3, 6, 1],
      [3, 7, 2],
      [3, 8, 0],
      [3, 9, 0],
      [3, 10, 0],
      [3, 11, 0],
      [3, 12, 0],
      [3, 13, 0],
      [3, 14, 0],
      [3, 15, 0],
      [3, 16, 0],
      [3, 17, 0],
      [3, 18, 0],
      [3, 19, 0],
      [3, 20, 1],
      [3, 21, 0],
      [3, 22, 0],
      [3, 23, 0],
      [4, 0, 0],
      [4, 1, 2],
      [4, 2, 2],
      [4, 3, 0],
      [4, 4, 14],
      [4, 5, 5],
      [4, 6, 0],
      [4, 7, 0],
      [4, 8, 0],
      [4, 9, 0],
      [4, 10, 0],
      [4, 11, 0],
      [4, 12, 0],
      [4, 13, 0],
      [4, 14, 0],
      [4, 15, 0],
      [4, 16, 0],
      [4, 17, 1],
      [4, 18, 5],
      [4, 19, 8],
      [4, 20, 2],
      [4, 21, 0],
      [4, 22, 1],
      [4, 23, 1],
      [5, 0, 1],
      [5, 1, 1],
      [5, 2, 0],
      [5, 3, 0],
      [5, 4, 0],
      [5, 5, 0],
      [5, 6, 0],
      [5, 7, 0],
      [5, 8, 0],
      [5, 9, 1],
      [5, 10, 0],
      [5, 11, 0],
      [5, 12, 0],
      [5, 13, 0],
      [5, 14, 1],
      [5, 15, 1],
      [5, 16, 0],
      [5, 17, 0],
      [5, 18, 0],
      [5, 19, 0],
      [5, 20, 0],
      [5, 21, 0],
      [5, 22, 0],
      [5, 23, 0],
      [6, 0, 0],
      [6, 1, 0],
      [6, 2, 0],
      [6, 3, 0],
      [6, 4, 0],
      [6, 5, 0],
      [6, 6, 0],
      [6, 7, 0],
      [6, 8, 0],
      [6, 9, 0],
      [6, 10, 0],
      [6, 11, 1],
      [6, 12, 1],
      [6, 13, 0],
      [6, 14, 0],
      [6, 15, 3],
      [6, 16, 2],
      [6, 17, 0],
      [6, 18, 0],
      [6, 19, 0],
      [6, 20, 0],
      [6, 21, 0],
      [6, 22, 0],
      [6, 23, 0]
    ];
    var new_data = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i][2] != 0) {
            new_data.push([data[i][1], data[i][0], data[i][2]]);
        }
    }
    var options = {
      chart: {
          type: 'bubble',
          plotBorderWidth: 1,
          zoomType: 'xy',

          // Explicitly tell the width and height of a chart
          width: window.innerWidth * 0.95,
          height: null
      },

      legend: {
          enabled: false,
      },

      credits : {
          enabled : false,
      },

      title: {
          text: 'GitHub Punch card',
      },

      subtitle: {
          text: 'Based on your public commits',
      },

      xAxis: {
          minorGridLineDashStyle: 'dash',
          minorTickInterval: 1,
          minorTickWidth: 0,
          title: {
              text: null,
          },
          labels: {
              formatter: function() {
                  var val = this.value;
                  if (val == 0)
                      return "12a";
                  else if (val == 12)
                      return "12p";
                  else if (val > 12)
                      return (val - 12) + "p";
                  else
                      return val + "a";
              }
          },
      },

      yAxis: {
          reversed: true,
          categories: ['Sun', 'Mon', 'Tue', 'Wed', "Thu", "Fri", "Sat"],
          startOnTick: false,
          title: {
              text: null,
          },
          endOnTick: false,
          maxPadding: 0.9,
          maxPadding: 0.9,
          lineWidth: 0,
      },
      
      tooltip: {
          formatter: function() {
              var val = this.point.z;
              return val + " commit" + ((val > 1) ? "s" : "");
          }
      },
      
      plotOptions: {
          bubble:{
              minSIze:'8%',
              maxSize:'12%'
          }
      },

      series: [{
          data: new_data,
          color: "grey",
      }]
    };

    loadScript("http://code.highcharts.com/highcharts.js", { scriptTag: true }).then(() => {
      loadScript("http://code.highcharts.com/highcharts-more.js", { scriptTag: true }).then(() => {
        loadScript("http://code.highcharts.com/modules/exporting.js", { scriptTag: true }).then(() => {
          var chart = this.$().highcharts(options).highcharts();
          console.log(chart);
          return chart;
        });
      });
    });
  }
})