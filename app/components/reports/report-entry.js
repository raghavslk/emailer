import Ember from 'ember';

export default Ember.Component.extend({
  entry:{},

  actions: {
    destroyEntry(){
      console.log('destroyEntry');
      this.willDestroyElement();
    }
  }

});
