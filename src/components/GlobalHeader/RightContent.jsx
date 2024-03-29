import { Icon, Tooltip, Modal, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
// import SelectLang from '../SelectLang';
import styles from './index.less';
// import NoticeIconView from './NoticeIconView';

const GlobalHeaderRight = props => {
  // console.log(props)
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>

      {/* <Modal
        centered={true}
        visible={true}
        closable={false}
        footer={null}
        width="200"
        style={{
          textAlign: 'center',
          background: 'transpant'
        }}
      >
        <div style={{
          padding: '10px',
          fontSize: '24px'
        }}>
          实名认证享受贵服务{currentUser.realname}
        </div>
        <Button
          size="large"
          type="primary"
          shape="round"
        >立即实名</Button>
      </Modal> */}
      {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        dataSource={[
          formatMessage({
            id: 'component.globalHeader.search.example1',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example2',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example3',
          }),
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
      /> */}
      {/* <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip> */}
      {/* <NoticeIconView /> */}
      <Avatar menu />
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default GlobalHeaderRight

// export default connect(({ settings, user }) => ({
//   currentUser: user.currentUser,
//   theme: settings.navTheme,
//   layout: settings.layout,
// }))(GlobalHeaderRight);
