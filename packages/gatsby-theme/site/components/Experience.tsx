import React from 'react';
import { Button, Input } from 'antd';
import * as styles from './Experience.module.less';
import { useTranslation } from 'react-i18next';

interface ExperienceProps {
  title?: string;
}

const InputSuffix: React.FC<any> = () => {
  return (
    <div className={styles.input_suffix}>
      <span className="divider"></span>
      <div className={styles.input_suffix_wrapper}>
        <img
          src="https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*aMV6SbyQwT4AAAAAAAAAAAAADhl8AQ/original"
          alt=""
          className={styles.send_icon}
        />
        <span className={styles.open_text}>打开</span>
      </div>
    </div>
  );
};

const Experience: React.FC<ExperienceProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <>
      <section className={styles.experience} id="experience">
        <div className={styles.content}>
          <div className={styles.title}>
            <span>{title || t('功能体验')}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.label}>欢迎使用 Codeblitz</span>
            <div className={styles.wrapper}>
              <div className={styles.input}>
                {/* <Input size={'large'} placeholder='Search the code of Github and Gitlab'></Input> */}
                <Input.Group compact className={styles.input_affix_wrapper}>
                  <Input
                    placeholder="Search the code of Github and Gitlab"
                    suffix={<InputSuffix />}
                  />
                </Input.Group>
              </div>
              <div className={styles.button}>
                <Button size={'large'}>示例代码</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Experience;
