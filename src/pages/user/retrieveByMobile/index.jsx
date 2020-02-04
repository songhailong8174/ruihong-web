import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ RetrieveByMobile, loading }) => ({
  RetrieveByMobile,
  submitting: loading.effects['findPass/findPass'],
}))
class RetrieveByMobile extends Component {
  loginForm = undefined;

  state = {
    type: 'mobile',
    autoLogin: true,
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'findPass/findPass',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    // this.setState({
    //   type,
    // });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'findPass/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
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

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = RetrieveByMobile;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          
          <Tab
            key="mobile"
            tab={formatMessage({
              id: 'user-retrieve.tab',
            })}
          >
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-verification-code',
                }),
              )}
            <Mobile
              name="mobile"
              placeholder="11位手机号"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.phone-number.required',
                  }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({
                    id: 'user-login.phone-number.wrong-format',
                  }),
                },
              ]}
            />
            <Captcha
              name="realname"
              placeholder={formatMessage({
                id: 'user-login.verification-code.placeholder',
              })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({
                id: 'user-login.form.get-captcha',
              })}
              getCaptchaSecondText={formatMessage({
                id: 'user-login.captcha.second',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.verification-code.required',
                  }),
                },
                {
                  pattern: /\d{6}$/,
                  message: '验证码格式错误!'
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({
                id: 'user-login.login.password',
              })}: 6 - 16位密码，区分大小写`}
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 16,
                  message: formatMessage({
                    id: 'user-login.password.required',
                  }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
            <Password
              name="company"
              placeholder={`${formatMessage({
                id: 'user-login.login.password',
              })}: 确认密码`}
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 16,
                  message: formatMessage({
                    id: 'user-login.password.required',
                  }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          
          <div>
            <Submit loading={submitting} style={{float: 'left'}}>
              <FormattedMessage id="user-retrieve.submitName" />
            </Submit>
            <Link to="login" style={{
                float: 'right',
              }}><FormattedMessage id="user-retrieve.login" /></Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default RetrieveByMobile;
