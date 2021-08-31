import { useIntl } from 'umi'
import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

export default () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  })

  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[
        {
          key: 'Dashboard',
          title: 'Dashboard',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/lkcozy/blockchain',
          blankTarget: true,
        }
      ]}
    />
  )
}
