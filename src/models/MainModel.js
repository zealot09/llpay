import BaseModel from './BaseModel';

export default BaseModel.extend({
  defaults: {
    token: '',
    id: 0, //会员标识
    isVerified: false, //是否注册
    hasManagedAccount: false, //是否在汇付开户
    shouldNotify: false, //是否需要在我的转让显示红点
    mobile: '', //手机
    email: '', //电子邮箱
    name: '', //真实姓名
    portrait: '', //头像地址
    identityCard: '', //身份证类型
    lbKind: '', //账户类型-联豆
    restrictedLbKind: '',
    lbAvailableAmount: 0.00, //联豆可用余额
    lbOutgoLockedAmount: 0.00, //联豆冻结余额
    restrictedLbAvailableAmount: 0.00,
    restrictedLbLockedAmount: 0.00,
    chinaPnRKind: '', //账户类型-现金
    chinaPnRAvailableAmount: 0.00, //现金可用余额
    chinaPnROutgoLockedAmount: 0.00, //现金冻结余额
    chinaPnRVirtualAvailableAmount: 0.00,
    chinaPnRIncomeLockedAmount: 0.00, //转入中现金
    mediatorKind: '',
    mediatorAvailableAmount: 0.00,
    mediatorIncomeLockedAmount: 0.00,
    mediatorOutgoLockedAmount: 0.00,

    mediatorRestrictedKind: 0.00,
    mediatorRestrictedAvailableAmount: 0.00,
    mediatorRestrictedIncomeLockedAmount: 0.00,
    mediatorRestrictedOutgoLockedAmount: 0.00,

    bankCardsAmount: 0, //银行卡的数量
    userName: '', //用户名
    account: '', //汇付账号 ChinaPnRSN
    customerId: '', //汇付客户号
    loginStatus: false, //是否匿名登录
    bankCode: '', //银行代码
    averageBoughtPrice: 0.00, //购入均价
    averageSoldPrice: 0.00, //转出均价
    hasPayPassword: true,
    quota: 0,
    isUsePayPassword: false,
    officialPrice: 1,
    commissionRate: 0.00,
    creditCardCommissionRate: 0.00,
    creditCardSingleAmount: 0
  },

  isLogin() {
    return true;
  },

  isBindThirdPart() {
    return true;
  }
});
