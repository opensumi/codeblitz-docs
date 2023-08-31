import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '@codeblitz/gatsby-theme/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@codeblitz/gatsby-theme/site/components/Banner';
import Companies from '@codeblitz/gatsby-theme/site/components/Companies';
import Features from '@codeblitz/gatsby-theme/site/components/Features';
import Cases from '@codeblitz/gatsby-theme/site/components/Cases';
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
      name: '阿里云',
      img: 'https://img.alicdn.com/imgextra/i2/O1CN01RRW8Cb28yy42JRz3c_!!6000000008002-2-tps-369-108.png',
    },
    {
      name: '支付宝',
      img: 'https://img.alicdn.com/imgextra/i3/O1CN01wpX2KZ1WxB7Nl6rxq_!!6000000002854-2-tps-381-114.png',
    },
    {
      name: '天猫',
      img: 'https://img.alicdn.com/imgextra/i1/O1CN01hK7NHY1g7YdThPWng_!!6000000004095-2-tps-206-64.png',
    },
    {
      name: '淘宝',
      img: 'https://img.alicdn.com/imgextra/i4/O1CN01v5ZFqf1loDbbkZCrV_!!6000000004865-2-tps-291-120.png',
    },
    {
      name: '斑马智行',
      img: 'https://img.alicdn.com/imgextra/i1/O1CN01Kdo06P1EgXeCg89DD_!!6000000000381-2-tps-206-64.png',
    },
  ];

  const cases = [
    {
      logo: 'https://img.alicdn.com/imgextra/i2/O1CN01DVM7ow1njIZNWiUnK_!!6000000005125-2-tps-180-172.png',
      title: t('支付宝小程序开发工具'),
      description: t(
        '小程序开发者工具是支付宝开放平台打造的一站式小程序研发工具，提供了编码、调试、测试、上传、项目管理等功能。不仅支持开发支付宝小程序，相同代码还通用于蚂蚁开放生态，可直接发布至淘宝、钉钉、高德等应用平台。',
      ),
      link: 'https://opendocs.alipay.com/mini/ide/overview',
      image:
        'https://img.alicdn.com/imgextra/i1/O1CN01BYqn4B219wcGGXHBS_!!6000000006943-2-tps-775-667.png',
    },
    {
      logo: 'https://img.alicdn.com/imgextra/i1/O1CN01P04WYq1HV2XD2XhTP_!!6000000000762-2-tps-180-172.png',
      title: t('淘宝开发者工具'),
      link: 'https://miniapp-dev.taobao.com/',
      description: t(
        '开发者工具 IDE 是辅助淘宝开发者开发商家应用的本地开发工具，包含本地调试、代码编辑、真机预览、发布等功能，覆盖了应用开发的完整流程。',
      ),
      image:
        'https://img.alicdn.com/imgextra/i3/O1CN01goeVvb1w0iYnj95LL_!!6000000006246-2-tps-775-667.png',
    },
  ];

  const bannerButtons = [
    {
      text: t('进入控制台'),
      link: './docs/integrate/quick-start/web',
      type: 'primary',
    },
    {
      text: t('产品文档'),
      link: `/${i18n.language}/docs/integrate/overview`,
    },
  ];

  return (
    <>
      <SEO title={t('Codeblitz')} lang={i18n.language} />
      <Banner
        coverImage={<BannerSVG />}
        logoUrl={logoUrl}
        title={t('什么是 Codeblitz')}
        description={t(
          'Codeblitze 是由蚂蚁云研发团队打造的基于 OpenSumi 的纯前端 IDE 基础框架，相比于我们传统的 Cloud IDE，最大的特点是无需容器，只需一个浏览器就能运行 Web IDE。在保证体验一致的基础之上具备启动快，定制灵活、接入方便等特点',
        )}
        className="banner"
        buttons={bannerButtons}
      />
      <Features title={t('核心能力')} features={features} />
      {/* 功能体验 */}
      <Experience title={'功能体验'} />
      <Companies title={t('合作案例')} companies={companies} />
    </>
  );
};

export default IndexPage;
