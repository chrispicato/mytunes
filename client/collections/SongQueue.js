// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Backbone.Collection.extend({
  model: SongModel,
  initialize: function() {
    this.on('add', function() {
      console.log("added");
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
      if (this.models.length > 0) {
        this.playFirst();
      }
    }, this);

  },

  playFirst: function() {
    this.models[0].play();
  },


});