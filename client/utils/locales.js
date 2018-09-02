export default {
  'zh-Hans': {
    language: '语言',
    languageName: '简体中文',
    changed: '修改成功',

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
    oldPassword: {
      title: '原密码',
      placeholder: '请输入原密码'
    },
    newPassword: {
      title: '新密码',
      placeholder: '请输入新密码'
    },
    confirm: '确定',
    save: '保存',
    cancel: '取消',

    monthly: '本月',
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
    enterNote: '记录我的生活'
  },
  'en': {
    language: 'Language',
    languageName: 'English',
    changed: 'Changed successfully',

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
    404: 'Wrong input, please input again',
    409: 'Conflict with the server',
    500: 'Error on the server',

    personalInfo: 'Personal information',
    settings: 'Settings',

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

    fillInInfo: 'Fill in user information',
    stuId: {
      title: 'ID',
      placeholder: 'Please input your ID',
      illegal: 'ID is invalid'
    },
    stuName: {
      title: 'Name',
      placeholder: 'Please input your name',
      illegal: 'Name is invalid, and only Chinese name is supported'
    },
    stuPassword: {
      title: 'Password',
      placeholder: 'Please input your password'
    },
    oldPassword: {
      title: 'Old password',
      placeholder: 'Please input your old password'
    },
    newPassword: {
      title: 'New password',
      placeholder: 'Please input a new password'
    },
    confirm: 'Confirm',
    save: 'Save',
    cancel: 'Cancel',

    monthly: 'Monthly',
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
    enterNote: 'Note my life'
  }
};
