import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  fixedHeader: true,
  fixSiderbar: true,
  menuHeaderRender: false,
  navTheme: 'realDark',
  primaryColor: '#13C2C2',
  layout: 'mix',
  contentWidth: 'Fluid',
  splitMenus: true,
  colorWeak: false,
  title: 'Dashboard',
  pwa: false,
  logo: 'https://raw.githubusercontent.com/lkcozy/code-notes/master/assets/logo.png',
  iconfontUrl: '',
}

export default Settings
