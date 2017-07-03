import { observes, on } from 'ember-addons/ember-computed-decorators';
import loadScript from 'discourse/lib/load-script';

export default Ember.Component.extend({
  @on('init')
  chart(){
    var user = this.get('user');
    Date.prototype.getWeek = function() {
      var onejan = new Date(this.getFullYear(),0,1);
      var millisecsInDay = 86400000;
      return Math.ceil((((this - onejan) /millisecsInDay) + onejan.getDay()+1)/7);
    };
    var data = [];
    var d = new Date();
    var weekNum = 52;
    for (var j = 0; j < 365; j++){
      d.setDate(d.getDate() - 1);
      data.push([weekNum, d.getDay(), user.user_activity_chart_data[j]])
      if (d.getDay() == 0){
        weekNum = weekNum -1;
      }
    }
    var options = {
      chart: {
          type: 'heatmap',
          borderWidth: 0,
          plotBorderWidth: 0,
          zoomType: 'xy',
          height: 250
      },

      legend: {
          enabled: false,
      },

      credits : {
          enabled : false,
      },

      title: {
          text: 'User Activity Chart',
      },

      subtitle: {
          text: 'Based on your likes, posts, and topics',
      },

      xAxis: {
          gridLineWidth: 0,
          tickWidth: 0,
          lineWidth: 0,
          title: {
              text: null,
          },
          showFirstLabel: true,
          showLastLabel: true,
          labels: {
            formatter: function(){
              var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              var d = new Date();
              d.setDate(d.getDate() + this.value * 7);
              return months[d.getMonth()];
            }
          }
      },

      yAxis: {
        gridLineWidth: 0,
        tickWidth: 0,
        title: {
            text: null
        },
        categories: ['Sun', 'Mon', 'Tue', 'Wed', "Thu", "Fri", "Sat"],
        minPadding: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false,
        reversed: true
      },

      colorAxis: {
        stops: [
            [0, '#eeeeee'],
            [5, '#c6e48b'],
            [10, '#7bc96f'],
            [15, '#239a3b'],
            [20, '#196127']
        ],
        min: 0
      },
      
      tooltip: {
          formatter: function() {
              var val = this.point.value
              return val;
          }
      },

      series: [{
          data: data,
          borderWidth: 3,
          borderColor: '#ffffff',
          color: "grey",
          marker: {
            height: 32,
            width: 32
          }
      }]
    };

    loadScript("http://code.highcharts.com/highcharts.js", { scriptTag: true }).then(() => {
      loadScript("https://code.highcharts.com/modules/heatmap.js", { scriptTag: true }).then(() => {
        loadScript("http://code.highcharts.com/highcharts-more.js", { scriptTag: true }).then(() => {
          var chart = this.$().highcharts(options).highcharts();
          return chart;
        });
      });
    });
  }
})