import Backbone from 'backbone';
import store from './store';
import HomePageView from './views/HomePageView';

var router = Backbone.Router.extend({
  routes: {
    '': 'homepage',
  },

  homepage: function() {
    var viewKey = 'view$homeView';
    var view = store.get(viewKey);
    if (!view) {
      view = new HomePageView();
      store.set(viewKey, view);
    } else {
      view.show();
    }
  }
});

export default router;
