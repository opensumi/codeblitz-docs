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
    siteUrl: 'https://codeblitz.opensumi.com',
    logo: {
      img: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*D9r6R7ncCd8AAAAAAAAAAAAADhl8AQ/original',
      link: 'https://codeblitz.opensumi.com',
    },
    logoUrl:
      'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*D9r6R7ncCd8AAAAAAAAAAAAADhl8AQ/original',
    githubUrl: 'https://github.com/opensumi/codeblitz',
    docsUrl: 'https://github.com/opensumi/codeblitz-docs',
    navs: [
      {
        slug: 'docs/develop/api-docs',
        title: {
          zh: '开发文档',
          en: 'Development',
        },
      },
    ],
    showDingTalkQRCode: true,
    showWeChatQRCode: false,
    weChatQRCode: '',
    dingTalkQRCode:
      'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*E4p0TJ4l77kAAAAAAAAAAAAADhl8AQ/original',
    redirects: [],
    showGithubCorner: true, // 是否展示角落的 GitHub 图标
    showGithubStars: true,
    showLanguageSwitcher: false, // 用于定义是否展示语言切换
    showSearch: true,
  },
};
