export default {
  'zh-Hans': {
    desc: '记录在的博物馆一切',

    language: '语言',
    languageName: '简体中文',
    changed: '修改成功',

    register: '注册',
    registerSucceed: '注册成功',
    login: '登录',
    logout: '登出',
    logining: '正在登陆',
    loginSucceed: '登录成功',
    loginFailed: '登录失败',
    wrongPassword: '学号/姓名/密码错误',
    changePassword: '修改密码',
    wrongOldPassword: '原密码错误',
    shouldChangePassword: '您现在使用的是初始密码，为了您的账号安全，请修改密码。',
    changePasswordSucceed: '密码修改成功',
    changePasswordFailed: '密码修改失败',
    illegalPassword: '密码不合法',
    permissions: '应用权限',

    requestError: '请求失败',
    requestSuccess: '请求成功',
    200: '请求成功',
    401: '密码/token 错误，请重新登录',
    403: '权限不足',
    404: '信息有误，请重新输入',
    409: '要修改的数据与服务端出现冲突',
    500: '服务器错误',


    personalInfo: '个人信息',
    settings: '设置',
    about: '关于',
    version: '版本',
    currentVersion: '0.0.5',
    opensource: '开源声明',

    privacy: '隐私权政策',
    collectedInfo: {
      title: '收集的信息',
      text: '我们会收集用户个人信息、值班信息、签到信息。你的个人信息（密码除外）和签到信息只对自己和诸如老师、队长等其他管理员可见，你的值班信息对所有人可见。'
    },
    whyCollectInfo: {
      title: '为什么要收集信息',
      text: '我们使用你的个人信息验证你的请求，与你取得联系，统计好博物馆现有人员。你所有的值班和签到信息只会用于分析你当前的工作状态。'
    },

    license: '协议和版权',
    sourceCode: '源代码',
    issueTracker: 'Issue 追踪',
    docs: '官方文档',
    contact: '联系方式',
    contributors: '贡献者',

    changeProfile: '修改个人信息',
    changeProfileSucceed: '修改个人信息成功',

    TARGET_POSITION: '哈工大博物馆',
    checkIn: '签到',
    checkedIn: '签到成功',
    checkOut: '签出',
    checkOutForcely: '强制签出',
    shallWeforcelyCheckOut: '是否强制签出？本次值班将不会计入工作量！',
    checkedOut: '签出成功',
    morning: '上午',
    afternoon: '下午',
    morningShift: '早班',
    afternoonShift: '晚班',
    period: '时间段',
    notInPeriod: '不在签到时间范围内',
    notOutPeriod: '不在签出时间范围内',
    calDistanceFailed: '距离计算失败',
    tooFarFrom: '距离工作地点太远',
    pleaseArrive: '请到达工作地点',
    pleaseLogin: '请先登录',
    location: '位置信息',
    currentLocation: '当前位置',
    latitude: '纬度',
    longitude: '经度',
    distance: '与哈工大博物馆相距',
    meters: '米',

    fillInInfo: '填写用户信息',
    stuId: {
      title: '学号/职工号',
      placeholder: '请输入学号/职工号',
      illegal: '学号/职工号不合法'
    },
    stuName: {
      title: '姓名',
      placeholder: '请输入姓名',
      illegal: '姓名不合法，仅支持中文姓名'
    },
    stuPassword: {
      title: '密码',
      placeholder: '请输入密码'
    },
    confirmPassword: {
      title: '确认密码',
      placeholder: '请再次输入密码'
    },
    passwordNotMatch: '密码不匹配',
    oldPassword: {
      title: '原密码',
      placeholder: '请输入原密码'
    },
    newPassword: {
      title: '新密码',
      placeholder: '请输入新密码'
    },
    identify: {
      title: '身份',
      placeholder: '老师/队长/讲解员/馆藏人员'
    },
    phone_number: {
      title: '手机号码',
      placeholder: '请输入手机号码'
    },
    stuLanguage: {
      title: '语言',
      placeholder: '中英/中文/英文/韩文/俄文/日文'
    },
    session: {
      title: '届数',
      placeholder: '请输入届数'
    },
    email: {
      title: '邮箱',
      placeholder: '请输入邮箱'
    },
    school: {
      title: '学院',
      placeholder: '请输入学院'
    },
    registerCode: {
      title: '注册码',
      placeholder: '请输入注册码'
    },
    confirm: '确定',
    save: '保存',
    cancel: '取消',

    monthly: '值班日历',
    months: ['1 月', '2 月', '3 月', '4 月', '5 月', '6月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
    days: ['1 日', '2 日', '3 日', '4 日', '5 日', '6 日', '7 日', '8 日', '9 日', '10 日','11 日', '12 日', '13 日', '14 日', '15 日', '16 日', '17 日', '18 日', '19 日', '20 日', '21 日', '22 日', '23 日', '24 日', '25 日', '26 日', '27 日', '28 日', '29 日', '30 日', '31 日'],
    workloadSummary: '本月已值班次数',
    selectedDay: '已选日期',
    times: '次',
    finished: '已完成',
    left: '未完成',

    fillInSheet: '填写值班表',
    weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    status: '状态',
    statuses: ['值班', '待命', '背稿'],
    date: '日期',
    sheet: '值班表',
    fillInSheetSuccess: '填写成功',
    fillInSheetForbidden: '当前不允许填写值班表',deleteShift: '删除值班信息',
    confirmDeleteShift: '是否删除此条值班信息？',
    deleteShiftSuccess: '删除值班信息成功',
    deleteShiftForbidden: '当前不允许删除值班信息',

    note: '随手记',
    enterNote: '记录我的生活',

    video: '演示视频',
    submitVideo: '提交视频',
    videoDesc: '视频简介',
    enterVideoDesc: '请输入视频简介',
    enterVideoSubject: '请输入视频主题',
    enterVideoCode: '请输如 Streamable 视频代码',
    videoAdded: '视频发布成功',

    notices: '通知',
    time: '发布时间',
    person: '发布者',
    subject: '主题',
    enterSubject: '请输入通知主题',
    enterNotice: '请输入通知内容',
    noticeAdded: '通知发布成功',

    appName: '哈工大博物馆小助手',
    shiftsRules: '值班规则',

    welcomeContribution: 'HITMers 是开源软件，欢迎任何人为它贡献代码，哪怕再小的贡献也非常欢迎！😃更多技术信息请阅读官方文档。',
    weProtectPravicy: 'HITmers 会非常谨慎地对待你的用户数据，竭尽所能不让用户的隐私被其他人窥探到。'
  },
  'en': {
    desc: 'Record everything in the museum',

    language: 'Language',
    languageName: 'English',
    changed: 'Changed successfully',

    register: 'Register',
    registerSucceed: 'Registered successfully',
    login: 'Log in',
    logout: 'Log out',
    logining: 'Logging in',
    loginSucceed: 'Logged in successfully',
    loginFailed: 'Log in failed',
    wrongPassword: 'Wrong ID/Name/Password',
    wrongOldPassword: 'Wrong old password',
    changePassword: 'Change password',
    shouldChangePassword: 'You are using the initial password. For your account security, please change your password.',
    changePasswordSucceed: 'Change password succeed',
    changePasswordFailed: 'Change password failed',
    illegalPassword: 'Password is invalid',
    permissions: 'Permissions',

    requestError: 'Request error',
    requestSuccess: 'Request success',
    200: 'Request success',
    401: 'Wrong password/token, please login again',
    403: 'Insufficient priviledges',
    404: 'Wrong enter, please enter again',
    409: 'Conflict with the server',
    500: 'Error on the server',

    personalInfo: 'Profile',
    settings: 'Settings',
    about: 'About',
    version: 'Version',
    currentVersion: '0.0.5',
    opensource: 'Open source',
    contributors: 'Contributors',

    license: 'License and copyright',
    sourceCode: 'Source code',
    issueTracker: 'Issue tracker',
    docs: 'Documentation',
    contact: 'Contact',

    privacy: 'Privacy',
    collectedInfo: {
      title: 'Collected information',
      text: 'We collect our users\'s profile, checks, and shifts. Your profile(excluding password) and checks are only visible to yourself and superusers such as teachers and other managers. Your shifts are visible to all other users.'
    },
    whyCollectInfo: {
      title: 'Why we collects information',
      text: 'We use your profile data to verify your request, contact you, and orginze our team members. All your checks and shifts are used for analyzing your working status.'
    },

    changeProfile: 'Change profile',    
    changeProfileSucceed: 'Changed profile successfully',

    TARGET_POSITION: 'Harbin Institute of Technology Museum',
    checkIn: 'Check in',
    checkedIn: 'Checked in',
    checkOut: 'Check out',
    checkOutForcely: 'Check out forcely',
    shallWeforcelyCheckOut: 'Do you want to check out forcely? This will NOT be recorded in your workload!',
    checkedOut: 'Checked Out',
    morningShift: 'Morning shift',
    afternoonShift: 'Afternoon shift',
    morning: 'Morning',
    afternoon: 'Afternoon',
    period: 'Period',
    notInPeriod: 'Not in the check-in period',
    notOutPeriod: 'Not in the check-out period',
    calDistanceFailed: 'Calculate diatance failed',
    tooFarFrom: 'Too far from work place',
    pleaseArrive: 'Please arrive at work place',
    pleaseLogin: 'Please login first',
    location: 'Location',
    currentLocation: 'Current location',
    latitude: 'latitude',
    longitude: 'longitude',
    distance: 'Distance away from Harbin Institute of Technology Museum',
    meters: 'meters',

    fillInInfo: 'Fill in user information',
    stuId: {
      title: 'ID',
      placeholder: 'Please enter your ID',
      illegal: 'ID is invalid'
    },
    stuName: {
      title: 'Name',
      placeholder: 'Please enter your name',
      illegal: 'Name is invalid, and only Chinese name is supported'
    },
    stuPassword: {
      title: 'Password',
      placeholder: 'Please enter your password'
    },
    confirmPassword: {
      title: 'Confirm password',
      placeholder: 'Please enter your password again'
    },
    passwordNotMatch: 'Passwords do not match',
    oldPassword: {
      title: 'Old password',
      placeholder: 'Please enter your old password'
    },
    newPassword: {
      title: 'New password',
      placeholder: 'Please enter a new password'
    },
    identify: {
      title: 'Identity',
      placeholder: '老师/队长/讲解员/馆藏人员'
    },
    phone_number: {
      title: 'Phone number',
      placeholder: 'Please enter your phone number'
    },
    stuLanguage: {
      title: 'language',
      placeholder: '中英/中文/英文/韩文/中俄/俄文/日文'
    },
    session: {
      title: 'Session',
      placeholder: 'Please enter your session'
    },
    email: {
      title: 'Email',
      placeholder: 'Please enter your Email'
    },
    school: {
      title: 'School',
      placeholder: 'Please enter your school'
    },
    registerCode: {
      title: 'Register code',
      placeholder: 'Please enter your register code'
    },
    confirm: 'Confirm',
    save: 'Save',
    cancel: 'Cancel',

    monthly: 'Shifts calender',
    months: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    days: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21th', '22th', '23th', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31th'],
    workloadSummary: 'Finished shifts this month',
    selectedDay: 'Selected day',
    times: 'times',
    finished: 'Finished',
    left: 'Left',

    fillInSheet: 'Fill in the shift sheet',
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    status: 'Status',
    statuses: ['Working', 'Standby', 'Studying'],
    date: 'Date',
    sheet: 'Shifts Sheet',
    fillInSheetSuccess: 'Filled in successfully',
    fillInSheetForbidden: 'Filling in sheet is not allowed',
    deleteShift: 'Delete shift',
    confirmDeleteShift: 'Are you sure to delete this shift?',
    deleteShiftSuccess: 'Shift deleted successfully',
    deleteShiftForbidden: 'Deleting shift is not allowed',

    note: 'Note',
    enterNote: 'Note my life',

    video: 'Videos',
    submitVideo: 'Submit video',
    videoDesc: 'Video description',
    enterVideoDesc: 'Enter video description',
    enterVideoSubject: 'Enter video subject',
    enterVideoCode: 'Enter streamable video code',
    videoAdded: 'Video published successfully',
    
    notices: 'Notices',
    time: 'Publish time',
    person: 'Publisher',
    subject: 'Subject',
    enterSubject: 'Enter notice subject',
    enterNotice: 'Enter notice content',
    noticeAdded: 'Notice published successfully',

    appName: 'HIT Museum Assistant',
    shiftsRules: 'Shifts rules',

    welcomeContribution: 'HITMers is an open-source software, any minor contribution is welcome!😃 For technical support, please read documentation.',
    weProtectPravicy: 'HITmers will treat your user data very carefully, and do everything we can to prevent the privacy of our users from being snooped by others.'
  }
};
