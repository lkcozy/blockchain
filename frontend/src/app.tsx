import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import type { RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api'
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import { login } from '@/services/ant-design-pro/api'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser()
      return msg.data
    } catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    }
  }

  console.log('autologin')
  await login({
    username: 'admin',
    password: 'ant.design',
    autoLogin: true,
    type: 'account',
  })
  const currentUser = await fetchUserInfo()

  console.log('currentUser', currentUser)
  return {
    fetchUserInfo,
    currentUser,
    settings: {},
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  console.log('initialState: ', initialState)
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    links: isDev
      ? [
          <Link to='/umi/plugin/openapi' target='_blank'>
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to='/~docs'>
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    ...initialState?.settings,
  }
}
