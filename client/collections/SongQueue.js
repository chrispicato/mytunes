// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Backbone.Collection.extend({
  model: SongModel,
  initialize: function() {
    this.on('add', function() {
      if (this.length === 1) {
        this.playFirst();
      }
    });

    this.on('dequeue',function(song){
      //debugger;
      this.remove(song);
    });

    this.on('ended',function(song){
      this.models[0].dequeue();
    },this);


  },

  playFirst: function() {
    this.models[0].play();
  },


});