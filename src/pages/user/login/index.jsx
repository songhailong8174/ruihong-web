import { Alert, Checkbox, Icon, message, Select } from "antd";
import { FormattedMessage, formatMessage } from "umi-plugin-react/locale";
import React, { Component } from "react";
import Link from "umi/link";
import { connect } from "dva";
import LoginComponents from "./components/Login";
import styles from "./style.less";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;
const { Option } = Select;

const agree = false;

@connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects["userLogin/login"]
}))
class Login extends Component {
  loginForm = undefined;
  loginContext = undefined;

  state = {
    type: "user",
    autoLogin: true,
    agree: false,
    serviceType: "1"
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  handleSubmit = (err, values) => {
    const { type, serviceType } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      if (type === "mobile") {
        this.handleRegister(values, type, serviceType, dispatch);
        return;
      }
      dispatch({
        type: "userLogin/login",
        payload: { ...values, type }
      });
    }
  };

  handleRegister = (values, type, smsprice, dispatch) => {
    dispatch({
      type: "userLogin/register",
      payload: { ...values, type, smsprice }
    }).then(resp => {
      if (resp.code == 200) {
        message.success("恭喜您，注册成功");
        let params = {
          ...values,
          type: "user",
          password1: values.password,
          userName: values.mobile
        };
        dispatch({
          type: "userLogin/login",
          payload: params
        });
      } else {
        message.error(`注册失败,${resp.msg}`);
      }
      // this.onTabChange('user');
    });
  };

  onTabChange = (type, context) => {
    console.log(context);
    this.loginContext = context;
    this.setState({
      type
    });
  };

  onBlur = () => {
    console.log(this.state);
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(["mobile"], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: "userLogin/getCaptcha",
            payload: values.mobile
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  checkboxChange = e => {
    this.setState({
      agree: e.target.checked
    });
  };

  handleChange = value => {
    this.setState({
      serviceType: value
    });
  };

  handleUserCheckValidator = (rule, value, callback) => {
    const { dispatch } = this.props;
    console.log(rule, value);
    if (value == "") {
      callback();
      return;
    }
    dispatch({
      type: `userLogin/checkName`,
      payload: value
    }).then(response => {
      if (response.code === 200) {
        callback();
      } else {
        callback("用户名已存在");
      }
    });
  };

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
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
          <Tab key="user" tab="登录">
            {status === "error" &&
              loginType === "user" &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: "user-login.login.message-invalid-verification-code"
                })
              )}
            <Mobile
              name="userName"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.phone-number.required"
                  })
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({
                    id: "user-login.phone-number.wrong-format"
                  })
                }
              ]}
            />

            <Password
              name="password1"
              placeholder={`${formatMessage({
                id: "user-login.login.password"
              })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.password.required"
                  })
                }
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
            <div
              className="ant-row login-find-pass"
              style={{ color: "red !important" }}
            >
              <Link
                to="/user/retrieveByMobile"
                style={{ float: "right", display: "block" }}
              >
                <span>找回密码</span>
              </Link>
            </div>

            <Submit loading={submitting} style={{ float: "left" }}>
              登录
            </Submit>
            {/* <a
                style={{
                  float: 'right',
                }}
                href="login"
              >
                <FormattedMessage id="user-retrieve.login" />
              </a> */}
          </Tab>

          <Tab key="mobile" tab="注册">
            {status === "error" &&
              loginType === "mobile" &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: "user-login.login.message-invalid-verification-code"
                })
              )}
            <UserName
              name="username"
              placeholder="用户名 字母、数字、下划线"
              onBlur={this.onBlur}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!"
                },
                {
                  pattern: /^[a-zA-Z0-9_]{4,10}$/,
                  message: "请输入4到10位的字母、数字、下划线组合"
                },
                {
                  validator: (rule, value, callback) =>
                    this.handleUserCheckValidator(rule, value, callback)
                }
              ]}
            />
            <UserName
              name="concat"
              placeholder="联系人"
              onBlur={this.onBlur}
              rules={[
                {
                  required: true,
                  message: "请输入联系人!"
                }
              ]}
            />

            <UserName
              name="email"
              placeholder="请输入您的邮箱 方便为您提供接入支持"
              onBlur={this.onBlur}
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!"
                },
                {
                  pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                  message: "邮箱格式错误"
                }
              ]}
            />

            <div className="ant-row ant-form-item">
              <Select
                size="large"
                defaultValue="1"
                name="smsprice"
                onChange={this.handleChange}
              >
                <Option value="1">短信服务</Option>
                <Option value="2">语音服务</Option>
                <Option value="3">视频短信</Option>
                <Option value="4">一键认证</Option>
              </Select>
            </div>

            <Mobile
              name="mobile"
              placeholder="11位手机号"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.phone-number.required"
                  })
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({
                    id: "user-login.phone-number.wrong-format"
                  })
                }
              ]}
            />
            <Captcha
              name="realname"
              placeholder={formatMessage({
                id: "user-login.verification-code.placeholder"
              })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({
                id: "user-login.form.get-captcha"
              })}
              getCaptchaSecondText={formatMessage({
                id: "user-login.captcha.second"
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.verification-code.required"
                  })
                },
                {
                  pattern: /\d{6}$/,
                  message: "验证码格式错误!"
                }
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({
                id: "user-login.login.password"
              })}: 6 - 16位密码，区分大小写`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.password.required"
                  })
                },
                {
                  pattern: /^[a-zA-Z0-9_]{6,16}$/,
                  message: "请输入字母、数字、下划线的组合"
                }
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />

            <div>
              <Checkbox
                onChange={this.checkboxChange}
                defaultChecked={this.state.agree}
              />
              <span style={{ paddingLeft: "8px" }}>我已阅读并同意</span>
              <a
                href="https://docs.hongyusky.cn/web/#/2?page_id=1"
                target="_blank"
              >
                《用户协议》
              </a>
              及
              <a
                href="https://docs.hongyusky.cn/web/#/2?page_id=9"
                target="_blank"
              >
                《服务条款》
              </a>
            </div>

            <Submit
              loading={submitting}
              style={{ float: "left" }}
              disabled={!this.state.agree}
            >
              注册
            </Submit>
          </Tab>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
