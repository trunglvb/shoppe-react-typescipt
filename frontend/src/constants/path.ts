const path = {
  home: '/',
  login: '/login',
  register: '/register',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/changePassword',
  historyPurchase: '/user/historyPurchase',
  logout: '/logout',
  productDetail: '/:id',
  cart: '/cart'
} as const

export default path
