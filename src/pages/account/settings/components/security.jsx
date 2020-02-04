import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List, message } from 'antd';
import { connect } from 'dva';
import SecurityCreateForm from './SecurityCreateForm'
import SecurityMobileForm from './SecurityMobileForm'

const passwordStrength = {
  strong: (
    <span className="strong" style={{color: '#52C41B'}}>
      <FormattedMessage id="account-settings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="account-settings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="account-settings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

@connect(({ accountSettings, loading }) => ({
  accountSettings,
  currentUser: accountSettings.currentUser,
  // submitting: loading.effects['accountSettings/modifyPassword'],
}))
class SecurityView extends Component {

  static defaultProps = {
    getCaptchaButtonText: '获取验证码',
    getCaptchaSecondText: '秒',
  };

  interval = undefined;

  state = {
    modalVisible: false,
    mobileModalVisible: false,
    count: 0,
  };

  componentDidMount() {
    const { updateActive, name = '' } = this.props;

    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData = () => [
    {
      title: formatMessage(
        {
          id: 'account-settings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'account-settings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="Modify" onClick={() => this.handleModalVisible(true)}>
          <FormattedMessage id="account-settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'account-settings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'account-settings.security.phone-description',
        },
        {},
      )}：${ this.getCurrentUser().mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }`,
      actions: [
        <a key="Modify" onClick={() => this.handleModalVisibleForMobile(true)}>
          <FormattedMessage id="account-settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

  getCurrentUser() {
    const { currentUser } = this.props;
    return currentUser;
  }

  onGetCaptcha1 = () =>
    new Promise((resolve, reject) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'accountSettings/getCaptcha',
        payload: this.getCurrentUser().mobile,
      }).then(resolve).catch(reject);
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  onGetCaptcha = () => {
    const result = this.onGetCaptcha1();

    if (result === false) {
      return;
    }

    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  runGetCaptchaCountDown = () => {
    let count = 120;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleModalVisibleForMobile = flag => {
    this.setState({
      mobileModalVisible: !!flag,
    });
  };

  modifyPassword = params => {
    const { dispatch } = this.props;
    dispatch({
        type: 'accountSettings/modifyPassword',
        payload: { ...params }
      }).then(resp => {
        if(resp.code == 200){
          message.success('更新成功');
          this.handleModalVisible(false);
        } else {
          message.error(resp.msg);
        }
      });
  };

  modifyMobile = params => {
    const { dispatch } = this.props;
    params.mobile = this.getCurrentUser().mobile;
    dispatch({
      type: 'accountSettings/modifyMobile',
      payload: { ...params }
    }).then(resp => {
      if(resp.code == 200){
        message.success('更新成功');
        this.handleModalVisible(false);
        dispatch({
          type: 'accountSettings/fetchCurrent'
        });
      } else {
        message.error(resp.msg);
      }
    });
  };

  render() {
    const data = this.getData();
    const { getCaptchaButtonText, getCaptchaSecondText } = this.props;
    const parentMethods = {
      modifyPassword: this.modifyPassword,
      handleModalVisible: this.handleModalVisible,
    };
    const parentMethodsForMobile = {
      modifyMobile: this.modifyMobile,
      mobile: this.getCurrentUser().mobile,
      handleModalVisible: this.handleModalVisibleForMobile,
      onGetCaptcha: this.onGetCaptcha,
      count: this.state.count,
      getCaptchaSecondText: getCaptchaSecondText,
      getCaptchaButtonText: getCaptchaButtonText
    };
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />

        <SecurityCreateForm {...parentMethods} modalVisible={this.state.modalVisible} />
        <SecurityMobileForm {...parentMethodsForMobile} modalVisible={this.state.mobileModalVisible}/>

      </Fragment>
    );
  }
}

export default SecurityView;
