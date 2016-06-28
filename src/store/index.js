var store = {};

var MAIN_MODEL_KEY = 'model$main',
    ROUTER_KEY = 'router$app';

var localStorage = {
  set: function(key, value) {
    window.localStorage[key] = value;

    return localStorage;
  },
  get: function(key) {
    return window.localStorage[key];
  }
};

var cacheHandler = {
  get: function(key) {
    if (key in store) {
      return store[key];
    }
    return null;
  },
  exist: function(key) {
    return key in store;
  },
  set: function(key, obj) {
    store[key] = obj;
  },

  mainModel() {
    return this.get(MAIN_MODEL_KEY);
  },

  setMainModel(model) {
    this.set(MAIN_MODEL_KEY, model);
  },

  router() {
    return this.get(ROUTER_KEY);
  },

  setRouter(router) {
    this.set(ROUTER_KEY, router);
  }
}

export default cacheHandler;
