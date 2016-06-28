/**
 * Created by leiguo on 2016/06/10.
 */

// define(['jquery', 'utils/device', 'view/templates', 'app/app'], function($, $device, jst, app) {
import device from './device';
import app from '../store';
import alertTpl from '../templates/dialog/alert.html';
import alertTwoTpl from '../templates/dialog/alertTwo.html';
import toastTpl from '../templates/dialog/toast.html';
import blockTpl from '../templates/dialog/block.html';
import confirmTpl from '../templates/dialog/confirm.html';
import shareConfirmTpl from '../templates/dialog/shareConfirm.html';
import superAlertTpl from '../templates/dialog/superAlert.html';
import waitingTpl from '../templates/dialog/waiting.html';

// export default {};

var viewportSize = device.viewport();
var $body = $('body');
var $loading = $('.mask[data-usage="loading"]');
var $tap = $('.mask[data-usage="tapMask"]');
var $firstLoading = $('.mask[data-usage="firstLoading"]');

function setDialogPosition($dialog) {
  var dialogHeight = ($dialog.height()) / 2; //viewportSize.height -
  $dialog.css('margin-top', -dialogHeight + 'px');
}

function alert(options) {
  var $alert;
  var defaults = {
    header: true,
    closeIcon: false,
    titleValue: true,
    textAlign: '',
    title: '小连提示',
    message: '',
    btnText: '好的',
    reloadWhenClosed: true,
    callback: function() {}
  };

  options = $.extend(true, defaults, options);
  if (!options.message) {
    console.error('无效的弹框请求：弹框内容缺失');
    return;
  }
  $('.dialog-mask').remove();

  $alert = $(alertTpl(options));
  $alert.appendTo($body)
    .find('footer a')
    .on('click', function() {
      options.callback();
      $alert.remove();
    });

  $alert.find('.dialog-btn-close').on('click', function() {
    if (options.reloadWhenClosed)
      app.mainModel().reload();
    $alert.remove();
  });

  $alert.on('click', function(e) {
    if (e.target == this) {
      $alert.remove();
    }
  });

  setDialogPosition($alert.find('.common-dialog'));

  return $alert;
}

function alertTwo(options) {
  var $alertTwo;
  var defaults = {
    header: true,
    closeIcon: false,
    textAlign: '',
    title: '小连提示',
    message: '',
    btnTextLeft: '取消',
    btnTextRight: '确定',
    callBackRight: function() {}
  };

  options = $.extend(true, defaults, options);
  if (!options.message) {
    console.error('无效的弹框请求：弹框内容缺失');
    return;
  }
  $('.dialog-mask').remove();

  $alertTwo = $(alertTwoTpl(options));
  $alertTwo.appendTo($body)
    .find('footer a.b-left')
    .on('click', function() {
      if (typeof options.callBackLeft === 'function') {
        options.callBackLeft.call($alertTwo);
      } else {
        app.mainModel().reload();
        $alertTwo.remove();
      }
    });
  $alertTwo.appendTo($body)
    .find('footer a.b-right')
    .on('click', function() {
      options.callBackRight();
      $alertTwo.remove();
    });

  $alertTwo.find('.dialog-btn-close').on('click', function() {
    app.mainModel().reload();
    $alertTwo.remove();
  });

  $alertTwo.on('click', function(e) {
    if (e.target == this) {
      $alertTwo.remove();
    }
  });

  setDialogPosition($alertTwo.find('.common-dialog'));
}

function toast(options) {
  var $toast;
  var defaults = {
    textAlign: '',
    message: '',
    timeout: 3000,
    isAutoDismiss: true,
    button: ''
  };

  var options = $.extend(true, defaults, options);
  // console.log(options);
  if (!options.message) {
    console.error('无效的弹框请求：弹框内容缺失');
    return;
  }
  //if (options.header) {
  //    $dialogHead.removeClass('hide');
  //}
  $('.dialog-mask').remove();

  $toast = $(toastTpl(options));
  $toast.appendTo($body);
  if (options.isAutoDismiss) {
    setTimeout(function() {
      $toast.remove();
    }, options.timeout);
  }
  if (options.button) {
    $toast.find('.button').on('click', function() {
      $toast.remove();
    });
  }

  setDialogPosition($toast.find('.toast-dialog'));
}

function block(options) {
  var $block;
  var defaults = {
    message: '加载中,请稍后...',
    timeout: 3000,

  };
  var options = $.extend(true, defaults, options);
  if (!options.message) {
    console.error('无效的弹框请求：弹框内容缺失');
    return;
  }
  //$('.dialog-mask').remove();

  $block = $(blockTpl(options));
  $block.appendTo($body);


  setTimeout(function() {
    $block.remove();
  }, options.timeout);

  setDialogPosition($block.find('.block-dialog'));
}

function confirm(options) {
  var $confirm;
  var defaults = {
    header: true,
    title: '操作确认',
    message: '',
    yesText: '好的',
    noText: '取消',
    yesCallback: function() {},
    noCallback: function() {}
  };

  var options = $.extend(true, defaults, options);
  if (!options.message) {
    console.error('无效的弹框请求：弹框内容缺失');
    return;
  }
  $('.dialog-mask').remove();

  $confirm = $(confirmTpl(options));
  $confirm.appendTo($body);
  $confirm.find('footer a.b-yes')
    .on('click', function() {
      tapMask();
      options.yesCallback();
      $confirm.remove();
    });
  $confirm.find('footer a.b-no')
    .on('click', function() {
      tapMask();
      options.noCallback();
      $confirm.remove();
    });

  $confirm.find('.dialog-btn-close').on('click', function() {
    $confirm.remove();
  });


  $confirm.on('click', function(e) {
    if (e.target == this) {
      $confirm.remove();
    }
  });


  setDialogPosition($confirm.find('.common-dialog'));
}

function shareConfirm(addOrRemove) {
  addOrRemove = typeof addOrRemove == 'undefined' ? true : addOrRemove;
  if (addOrRemove) {
    var $shareConfirm;

    $('.dialog-mask').remove();
    $shareConfirm = $(shareConfirmTpl());
    $shareConfirm.appendTo($body);

    $shareConfirm.find('.dialog-btn-close').on('click', function() {
      $shareConfirm.remove();
    });

    $shareConfirm.on('click', function(e) {
      if (e.target == this) {
        $shareConfirm.remove();
      }
    });
  } else {
    $('.dialog-share-confirm').remove();
  }
}

function superAlert(options) {
  var $alert;
  var defaults = {
    header: true,
    closeIcon: true,
    title: '小连提示',
    message: '',
    btnText: '好的',
    callback: function() {}
  };

  options = $.extend(true, defaults, options);
  if (!options.message) {
    console.error('无效的弹框请求：弹框内容缺失');
    return;
  }
  $('.dialog-mask').remove();

  $alert = $(superAlertTpl(options));
  $alert.appendTo($body)
    .find('footer a')
    .on('click', function() {
      if ($(this).is('.disabled')) {
        return;
      }
      options.callback();
      $alert.remove();
    });

  $alert.find('.check-agreement')
    .on('click', function() {
      var $this = $(this);
      var $btn = $alert.find('footer a');
      if ($this.is('.checked')) {
        $this.removeClass('checked');
        $btn.addClass('disabled');
      } else {
        $this.addClass('checked');
        $btn.removeClass('disabled');
      }
    });
  $alert.find('.dialog-btn-close').on('click', function() {
    $alert.remove();
  });
  setDialogPosition($alert.find('.common-dialog'));
}

function waiting(options) {
  var $waiting;
  var defaults = {
    message: '小连在等你哟~',
    btnLeft: '取消',
    title: '小连提示',
    btnRight: '完成',
    btnAttach: '遇到问题>',
    isAbsolute: false,
    callBackRight: function() {},
    callBackLeft: function() {},
    callBackAttach: function() {}
  };

  options = $.extend(true, defaults, options);

  $waiting = $(waitingTpl(options));
  $waiting.appendTo($body);
  $waiting.find('.b-right')
    .on('click', function() {
      $waiting.remove();
      options.callBackRight();
    });
  $waiting.find('.b-left')
    .on('click', function() {
      $waiting.remove();
      options.callBackLeft();
    });
  $waiting.find('.b-attach')
    .on('click', function() {
      $waiting.remove();
      options.callBackAttach();
    });

  $waiting.on('click', function(e) {
    if (e.target == this) {
      $waiting.remove();
    }
  });


  setDialogPosition($waiting.find('.common-dialog'));
}

function showLoading() {
  $loading.removeClass('hide');
}

function hideLoading() {
  $loading.addClass('hide');
}

function showFirstLoading() {
  $firstLoading.removeClass('hide');
}

function hideFirstLoading() {
  $firstLoading.addClass('hide');
}

function tapMask() {
  $tap.removeClass('hide');
  setTimeout(function() {
    $tap.addClass('hide');
  }, 400);
}

export default {
  alert: alert,
  alertTwo: alertTwo,
  toast: toast,
  block: block,
  confirm: confirm,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showFirstLoading: showFirstLoading,
  hideFirstLoading: hideFirstLoading,
  tap: tapMask,
  waiting: waiting,
  superAlert: superAlert,
  shareConfirm: shareConfirm
}
