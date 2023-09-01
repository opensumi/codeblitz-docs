import React, { useState, useEffect, useContext } from 'react';
import { withPrefix } from 'gatsby';
import { default as RCFooter, FooterProps as RcFooterProps } from 'rc-footer';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import omit from 'omit.js';
import { LayoutContext } from '../layouts/layout-context';
import * as styles from './Footer.module.less';
import 'rc-footer/assets/index.less';
import { DingtalkOutlined } from '@ant-design/icons';

interface FooterProps extends RcFooterProps {
  rootDomain?: string;
  language?: string;
  githubUrl?: string;
  location: Location;
}

const Footer: React.FC<FooterProps> = ({
  columns,
  bottom,
  theme = 'dark',
  language,
  rootDomain = '',
  location,
  ...restProps
}) => {
  const [withMenu, setWithMenu] = useState<boolean>(false);
  const { t } = useTranslation();
  const { collapsed } = useContext(LayoutContext);

  useEffect(() => {
    // 有 menu 的模版 footer 表现不同，通过 location 判断加载的模版
    const pathPrefix = withPrefix('/').replace(/\/$/, '');
    const path = location.pathname.replace(pathPrefix, '');
    const isExamplePage =
      path.startsWith(`/zh/examples`) || path.startsWith(`/en/examples`);
    const isDocsPage =
      path.startsWith(`/zh/docs`) || path.startsWith(`/en/docs`);
    // examples 页面里目前只有 gallery 是有 footer 的，
    // 且 gallery 会出现 `location.key = 'initial'` 逻辑，所以先统一处理为需要 menu
    if (isExamplePage) {
      setWithMenu(true);
    } else if (isDocsPage) {
      // 文档页为 404 时 footer 没有 menu
      setWithMenu(!((location as any).key === 'initial'));
    } else {
      setWithMenu(false);
    }
  }, [location]);

  const getColums = () => {
    const col0 = {
      title: '',
      className: styles.footer_logo_container,
      items: [
        {
          icon: (
            <img
              className={styles.logo_icon}
              src="https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*D9r6R7ncCd8AAAAAAAAAAAAADhl8AQ/original"
            />
          ),
          title: ``,
          url: 'https://codeblitz.cloud.alipay.com',
          openExternal: true,
        },
      ],
    };
    // 如果外部没有传入 columns，则默认展示默认 footer
    const col1 = {
      title: t('核心能力'),
      items: [
        {
          title: t('平台介绍'),
          url: 'https://codeblitz.cloud.alipay.com',
          openExternal: true,
        },
        {
          title: t('名次解释'),
          url: 'https://codeblitz.cloud.alipay.com',
          openExternal: true,
        },
      ],
    };

    const col2 = {
      title: t('功能体验'),
      items: [
        {
          title: t('立即使用'),
          url: 'https://codeblitz.cloud.alipay.com',
          openExternal: true,
        },
      ],
    };

    const col3 = {
      title: t('合作案例'),
      items: [
        {
          title: '商家平台',
          url: 'https://codeblitz.cloud.alipay.com',
          openExternal: true,
        },
        {
          title: '服务商平台',
          url: 'https://codeblitz.cloud.alipay.com',
          openExternal: true,
        },
      ],
    };

    const more = {
      title: t('联系我们'),
      items: [
        {
          icon: <DingtalkOutlined />,
          title: t('钉钉'),
          openExternal: true,
        },
      ],
    };

    return [col0, col1, col2, col3, more];
  };

  return (
    <RCFooter
      maxColumnsPerRow={5}
      theme={theme}
      columns={columns || getColums()}
      className={classnames(styles.footer, {
        [styles.withMenu]: withMenu,
        [styles.collapsed]: collapsed,
      })}
      bottom={
        bottom ||
        'Copyright © 2019-present Alibaba Group Holding Limited, Ant Group Co. Ltd.'
      }
      {...omit(restProps, ['githubUrl'])}
    />
  );
};

export default Footer;
