import Backbone from 'backbone';
import utils from './utils/utils'
import initializer from './initializer';
import router from './router';
import store from './store';
import MainModel from './models/MainModel';

import './public/css/base.scss';
import './public/css/header.scss';
import './public/css/footer.scss';
import './public/css/page.scss';

var env = utils.request('env');
window.resources = {
  lifeWechatUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7a07d32f675816f8&redirect_uri=http%3a%2f%2fm.lianlianlife.com%2f%3fApp%3dLife.WeChatOA&response_type=code&scope=snsapi_base&state=#wechat_redirect',
  luckyMoneyDesc: '联豆红包当钱花 ，1联豆抵1元钱，经济又实惠。可在联连Life中选购丰富商品，一应俱全。购物折上折，价格低又低。',
  luckyMoneyTitle: '联豆红包当钱花',
  transferDesc: '1联豆抵1元钱  联豆转账方便快捷。输入手机号码，轻轻松松一键转账成功，更便利，更轻松。联豆亦可当钱花，在联连Life中各种商品，价格折上折，价格低又低。',
  transferTitle: '联豆转账方便快捷',
  maxBuyQuantity: 200000,
  helpCollection: {
    'oilCard': '联豆充油卡',
    'topUp': '联豆充话费',
    'dataTraffic': '联豆充流量',
    'sellLd': '卖联豆',
    'prepaidCoupons': '联豆充值',
    'ldMonetize': '福利联豆变现',
    'buyLd': '买联豆'
  },
  articleCodes: {
    mobileRecharge: 'topUp',
    dataRecharge: 'dataTraffic',
    oilRecharge: 'oilCard',
    sell: 'sellLd',
    buy: 'buyLd',
    lianCard: 'prepaidCoupons',
    welfare: 'ldMonetize',

    userGuide: 'userGuide',
    ldService: 'ldService',
    ldPay: 'ldPay'
  }
};

initializer.init();

store.setMainModel(new MainModel());
store.setRouter(new router());

Backbone.history.start();
