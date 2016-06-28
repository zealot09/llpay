import Backbone from 'backbone';
import api from '../utils/api';
import device from '../utils/device';

export default Backbone.Model.extend({
  defaults: {
    noData: false,
    loaded: 0
  },
  isIOS: function() {
    return device.isIOS;
  },
  isLoaded: function() {
    return this.get('loaded') > 0;
  },
  addLoaded: function() {
    var loaded = this.get('loaded') || 0;
    loaded++;
    this.set('loaded', loaded);
  }
});
