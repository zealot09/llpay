import Backbone from 'backbone';
import BaseView from './BaseView';
import homepageTpl from '../templates/homepage.html';

import '../public/css/homepage.scss';

var homepage = BaseView.extend({
  pageName: 'homepage',
  tagName: 'div',
  className: 'ui-page slide',
  attributes: {
    'data-level': 100
  },
  timeout: 0,
  template: homepageTpl,
  events: {
    'click .exit': 'close',
  },

  initialize() {
    this.render();
    this.show();

    this.attachTabNavigate();
  },

  render() {
    if (this.model) {
      this.$el.html(this.template(this.model));
    } else {
      this.$el.html(this.template());
    }


  },

  bindNavigator: function () {

  }

});

export default homepage;
