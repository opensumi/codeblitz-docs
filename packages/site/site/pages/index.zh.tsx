import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '@codeblitz/gatsby-theme/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@codeblitz/gatsby-theme/site/components/Banner';
import Companies from '@codeblitz/gatsby-theme/site/components/Companies';
import Feature from '@codeblitz/gatsby-theme/site/components/Feature';
import BannerSVG from '@codeblitz/gatsby-theme/site/components/BannerSVG';
import Experience from '@codeblitz/gatsby-theme/site/components/Experience';

const IndexPage: React.FC = () => {
  const query = graphql`
    query SiteHomeQuery {
      site {
        siteMetadata {
          logoUrl
        }
      }
    }
  `;
  const { t, i18n } = useTranslation();
  const { site } = useStaticQuery(query);
  const { logoUrl } = site.siteMetadata;

  const features = [
    {
      icon: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*pLy9TrrXfPUAAAAAAAAAAAAADhl8AQ/original',
      title: t('提供与 IDE 一致的体验'),
      description: t(
        '除了无法运行 node 服务，在前端上体验和标准的产品是完全一致的，因此主题、编辑等偏好设置，快捷键、菜单等操作基本保持一致，对于接入方来说，可以更改默认设置来实现满足业务的需求。',
      ),
    },
    {
      icon: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*3ZE7RpcYkfAAAAAAAAAAAAAADhl8AQ/original',
      title: t('本地提供基于浏览器 API 的文件存储服务'),
      description: t(
        '模拟文件服务以保持与 IDE 产品一致。提供多种文件系统服务，包括基于内存、基于 IndexedDB 和基于远程接口等文件系统。同时还能通过插件的 workspace.fs API 对文件数据内容进行读取。',
      ),
    },
    {
      icon: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*zU8oQYmlPF8AAAAAAAAAAAAADhl8AQ/original',
      title: t('基于Worker的语言服务和插件生态'),
      description: t(
        '提供了基于Worker的语言服务，支持语法高亮和LSP语言服务，具备语法分析、智能补全、格式化等功能。同时，基于Worker的插件生态，可定制和复用插件，打造更强大的IDE。',
      ),
    },
    {
      icon: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*jlmzQpzsqpwAAAAAAAAAAAAADhl8AQ/original',
      title: t('接入快速方便'),
      description: t(
        '我们提供了多个 npm 包，只需几行代码即可运行一个纯前端版的 Web IDE，具备灵活的配置，可参考配置文档。',
      ),
    },
  ];

  const companies = [
    {
      name: '支付宝小程序云效能',
      img: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*oevJTKIEq2oAAAAAAAAAAAAADhl8AQ/original',
      description:
        '支付宝小程序云效能, 基于小程序生态的效能解决方案产品, 包含代码托管、流水线、云端研发、云测和制品库等子产品',
    },
    {
      name: '蚂蚁链',
      img: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*4VvCRJkNU7kAAAAAAAAAAAAADhl8AQ/original',
      description:
        '蚂蚁链致力于用科技链接信任, 为产业互联网提供可信、高效的技术解决方案',
    },
    {
      name: 'GitLink',
      img: 'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*51BqQYi6SiIAAAAAAAAAAAAADhl8AQ/original',
      description:
        'GitLink 确实开源, 新一代开源创新服务平台，让您的创意在这里释放',
    },
    {
      name: 'AtomGit',
      img: 'https://file.atomgit.com/uploads/assets/atom.png',
      description:
        '开放原子开源基金会, 以开发者为本的开源项目孵化平台、科技公益性服务机构',
    },
  ];

  const bannerButtons = [
    {
      text: t('立即使用'),
      link: '#experience',
      type: 'primary',
    },
    {
      text: t('产品文档'),
      link: `/${i18n.language}/docs/develop/api-docs`,
    },
  ];

  const openExperience = (value: string) => {
    console.log('openExperience:>> ', value);
    window.open(`https://codeblitz.cloud.alipay.com/console#${value}`);
  };

  return (
    <>
      <SEO title={t('Codeblitz')} lang={i18n.language} />
      <Banner
        coverImage={<BannerSVG />}
        logoUrl={logoUrl}
        title={t('什么是 Codeblitz')}
        description={t(
          'Codeblitz 是由蚂蚁云研发团队打造的基于 OpenSumi 的纯前端 IDE 基础框架，相比于我们传统的 Cloud IDE，最大的特点是无需容器，只需一个浏览器就能运行 Web IDE。在保证体验一致的基础之上具备启动快，定制灵活、接入方便等特点',
        )}
        className="banner"
        buttons={bannerButtons}
      />
      <Feature title={t('核心能力')} features={features} />
      {/* 功能体验 */}
      <Experience title={'功能体验'} onOpen={openExperience} />
      <Companies title={t('合作案例')} companies={companies} />
    </>
  );
};

export default IndexPage;
