import Backbone from '../polyfill/backbone';
import _ from 'underscore';
// import dialog from '../utils/dialog';
import app from '../store';
import $ from 'jquery';

var baseView = Backbone.View.extend({
  mainBox: $('body'),

  pageCode() {
    return '';
  },

  initialize() {
    return this.render();
  },

  render() {
    this.mainBox.append(this.$el);
    if (this.model) {
      this.$el.html(this.template(this.model.attributes));
    } else {
      this.$el.html(this.template());
    }
    return this;
  },


  /**
   * 显示当前视图方法
   * @returns {BaseView} 视图对象本身，以支持链式调用
   */
  show: function() {
    console.log('show====')
    //var scrollY = window.scrollY;
    var height;
    var activeClassName = 'ui-page-active';
    var reverseClassName = 'reverse';
    var direction = 0;
    var $viewElem = this.$el;
    var toScrollY = $viewElem.data('scrollY') || 0;
    var $currentView = $('.' + activeClassName);

    var toLevel = parseFloat($viewElem.attr('data-level'));
    var currentLevel = parseFloat($currentView.attr('data-level'));
    var mainBox = this.mainBox;
    var transformClasses = ['.pop-from-top', '.pop-from-bottom', '.pop-from-left', '.pop-from-right'];

    if ($viewElem.is('.pop')) {
      $viewElem.addClass(activeClassName);
      if (_.some(transformClasses, function(activeClass) {
          return $viewElem.is(activeClass);
        })) {
        setTimeout(function() {
          $('.dialog-container', $viewElem).addClass('active');
        }, 350);
      }
      return this;
    }

    if ($currentView.get(0) === $viewElem.get(0)) {
      return this;
    }
    //$currentView.data('scrollY', scrollY);
    mainBox.append($viewElem);

    $currentView.removeClass(activeClassName);
    $viewElem.addClass(activeClassName);

    // 判断动画方向
    if (!currentLevel || !toLevel || currentLevel === toLevel) {
      direction = 0;
    } else if (toLevel > currentLevel) {
      direction = 1;
    } else {
      direction = -1;
    }

    //$viewElem.addClass(activeClassName);
    mainBox.addClass('ui-mobile-viewport-transitioning');
    switch (direction) {
      case 0:
        $currentView.removeClass(activeClassName);
        $viewElem.addClass(activeClassName);
        break;
      case -1:
        $currentView.addClass('out ' + reverseClassName);
        $viewElem.addClass(activeClassName + ' pre ' + reverseClassName);
        break;
      case 1:
        $currentView.addClass('out');
        $viewElem.addClass(activeClassName + ' pre');
        break;
    }

    if (direction !== 0) {
      height = this.mainBox.get(0).offsetHeight;
      $viewElem.addClass('in');
    }
    setTimeout(function() {
      $currentView.removeClass(activeClassName);
      $currentView.add($viewElem).removeClass(' out in pre ' + reverseClassName + ' ');
      mainBox.removeClass('ui-mobile-viewport-transitioning');
      window.scrollTo(0, toScrollY);
    }, 350);

    return this;
  },

  deferLoadEvent(loadEvent) {
    var view = this;
    setTimeout(function() {
      if (typeof loadEvent === 'function') {
        loadEvent.call(view);
      }
    }, 400);
  },

  attachTabNavigate() {
    var view = this;
    var $elTabs = view.$('.tab-navigate');

    $elTabs.each(function() {
      var $el = $(this);
      var pageName = $el.data('page');
      var isNowPage = $el.data('isnow');
      if (!isNowPage) {
        $el.on('click', function() {
          // view.tap();
          if (!app.mainModel().isLogin()) {
            view.popLogin();
            return;
          }

          if (pageName === 'sell' && !app.mainModel().isBindThirdPart()) {
            dialog.alert({
              closeIcon: true,
              title: '未开通汇付天下账户',
              message: '您尚未开通第三方支付平台（汇付天下）的支付账户，请前往汇付天下开户。',
              btnText: '好的',
              callback: function() {
                // 绑定汇付...
                app.router().navigate('register', {
                  trigger: true
                });
              }
            });
            return;
          }
          app.router().navigate(pageName, {
            trigger: true
          });
        });
      }
    });
  },

  getMainModel() {
    return app.mainModel();
  },

  goBack() {
    history.back();
  },
  login() {
    console.log('login');
  },

  close() {

  }
});

export default baseView;
