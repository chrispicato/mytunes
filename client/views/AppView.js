// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params) {
    this.playerView = new PlayerView({model: this.model.get('library')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.queueView = new SongQueueView({collection: this.model.get('songQueue')});
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model) {
      this.playerView.setSong(model.get('currentSong'));
    }, this);

    this.model.on('enqueue',function(appmodel){
     // console.log("here");
      this.queueView.render();
    },this);

    this.model.on('dequeue',function(){
      this.queueView.render();
      console.log(this.queueView.collection);
    },this);

    var endcurrent = function() {
      //console.log(this.model.get('currentSong'), "example");
      this.model.get('currentSong').trigger('ended', this);
    };
    var bound = endcurrent.bind(this);

    this.playerView.$el.on('ended', bound);
  },

  render: function() {
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.queueView.$el
    ]);
  }

});
