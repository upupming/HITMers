/* global wx */

let T = {
  locale: null,
  locales: {},
  langCode: ['zh-Hans', 'en']
};
let lastLangIndex;

T.registerLocale = function (locales) {
  T.locales = locales;
};

T.setLocale = function (code) {
  T.locale = code;
};

T.setLocaleByIndex = function (index) {
  lastLangIndex = index;
  T.setLocale(T.langCode[index]);

  setTabBarLang(index);
};

T.getLanguage = function () {
  return T.locales[T.locale];
};


let navigationBarTitles = [
  '哈工大博物馆小助手',
  'HIT Museum Assistant'
];
// 设置导航栏标题
T.setNavigationBarTitle = function() {
  wx.setNavigationBarTitle({
    title: navigationBarTitles[lastLangIndex]
  });
};

let tabBarLangs = [
  [
    '工作',
    '我'
  ],
  [
    'Work',
    'Me'
  ]
];
// 设置 TabBar 语言
function setTabBarLang(index) {
  let tabBarLang = tabBarLangs[index];
  
  tabBarLang.forEach((element, index) => {
    wx.setTabBarItem({
      'index': index,
      'text': element
    });
  });
}

export default T;