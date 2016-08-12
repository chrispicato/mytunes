// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Backbone.Collection.extend({
  model: SongModel,
  initialize: function() {
    this.on('add', function() {
      //console.log("added");
      if (this.length === 1) {
        this.playFirst();
      }
    });

    this.on('dequeue',function(song){
    //  console.log(song);  
      this.remove(song);
      //console.log(this);
    },this);

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