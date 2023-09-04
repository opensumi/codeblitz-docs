import React from 'react';
import { Button, Input } from 'antd';
import * as styles from './Experience.module.less';
import { useTranslation } from 'react-i18next';

const CODEBLITZ_REPO = 'https://github.com/opensumi/codeblitz';

interface ExperienceProps {
  title?: string;
  onOpen: (v: string) => void;
}

const InputSuffix: React.FC<any> = ({ onOpen }) => {
  return (
    <div className={styles.input_suffix}>
      <span className="divider"></span>
      <div className={styles.input_suffix_wrapper} onClick={onOpen}>
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

const Experience: React.FC<ExperienceProps> = (props: ExperienceProps) => {
  const { t } = useTranslation();
  const { title, onOpen } = props;
  const [value, setValue] = React.useState<string>('');

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setValue(value);
  };

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
                <Input.Group compact className={styles.input_affix_wrapper}>
                  <Input
                    placeholder="输入仓库地址，支持 github、gitlab、gitlink、atomgit"
                    onChange={handleInputChange}
                    suffix={
                      <InputSuffix
                        onOpen={() => {
                          onOpen(value);
                        }}
                      />
                    }
                  />
                </Input.Group>
              </div>
              <div className={styles.button}>
                <Button size={'large'} onClick={() => onOpen(CODEBLITZ_REPO)}>
                  示例代码
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Experience;
