// Songs.js - Defines a backbone collection class for songs.
var Songs = Backbone.Collection.extend({
  initialize: function() {
    $.ajax({  
      url: 'https://api.parse.com/1/classes/songs',
      type: 'GET',
      success: function (data) {
        // console.log(this);      
        var data = data.results.forEach(function(dataelement) {
          this.add(new SongModel({
            url: dataelement.url,
            title: dataelement.title,
            artist: dataelement.artist
          }));
        }.bind(this));
       // console.log(data);
      }.bind(this),
      data: JSON.stringify({}),
      error: function() {
        console.log('Failed');
      }
    });
  },

  model: SongModel

});