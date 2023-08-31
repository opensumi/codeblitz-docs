import React from 'react';
import * as styles from './BannerSVG.module.less';

const BannerSVG = React.memo(() => {
  return (
    <img
      className={styles.wrapper}
      alt=""
      src="https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*Co5eQZA6Uq8AAAAAAAAAAAAADhl8AQ/original"
    />
  );
});

export default BannerSVG;
