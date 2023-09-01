module.exports = {
  plugins: [
    {
      resolve: '@codeblitz/gatsby-theme',
      options: {
        GATrackingId: `UA-148148901-11`,
      },
    },
  ],
  siteMetadata: {
    title: 'Codeblitz',
    description:
      '一款帮助你快速搭建本地和云端 IDE 的框架 - A framework helps you quickly build Cloud or Desktop IDE products.',
    siteUrl: 'https://codeblitz.cloud.alipay.com',
    logo: {
      img: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*D9r6R7ncCd8AAAAAAAAAAAAADhl8AQ/original',
      link: 'https://codeblitz.cloud.alipay.com',
    },
    logoUrl:
      'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*D9r6R7ncCd8AAAAAAAAAAAAADhl8AQ/original',
    githubUrl: 'https://github.com/opensumi/core',
    docsUrl: 'https://github.com/opensumi/doc',
    navs: [
      {
        slug: 'docs/develop/how-to-contribute',
        title: {
          zh: '开发文档',
          en: 'Development',
        },
      },
    ],
    docs: [
      {
        slug: 'develop/sample',
        title: {
          zh: '开发案例',
          en: 'Develop Sample',
        },
        order: 4,
      },
    ],
    showDingTalkQRCode: true,
    showWeChatQRCode: false,
    weChatQRCode: '',
    dingTalkQRCode:
      'https://img.alicdn.com/imgextra/i2/O1CN01Fcw6RC1T8qozkQBFG_!!6000000002338-2-tps-200-239.png',
    redirects: [],
    showGithubCorner: true, // 是否展示角落的 GitHub 图标
    showGithubStars: true,
    showLanguageSwitcher: true, // 用于定义是否展示语言切换
    showSearch: true,
  },
};
