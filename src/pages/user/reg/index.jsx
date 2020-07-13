import { Alert, Checkbox, Icon, message, Select } from "antd";
import { FormattedMessage, formatMessage } from "umi-plugin-react/locale";
import React, { Component } from "react";
import Link from "umi/link";
import { connect } from "dva";
import LoginComponents from "./components/Login";
import styles from "./style.less";

const {
  Tab,
  UserName,
  Password,
  Mobile,
  Captcha,
  Submit,
  ImgCode,
  ServiceList
} = LoginComponents;
const { Option } = Select;

const agree = false;

@connect(({ userReg, loading }) => ({
  userReg,
  submitting: loading.effects["userReg/reg"]
}))
class UserReg extends Component {
  loginForm = undefined;
  loginContext = undefined;

  state = {
    type: "mobile",
    autoLogin: true,
    agree: false,
    serviceType: "1",
    imgUrl: "",
    imgId: ""
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch({
      type: `userReg/getImgCode`,
      payload: this.state.imgId
    }).then(resp => {
      if (resp.code == 200) {
        let data = resp.result;
        this.setState({
          imgId: data.id,
          imgUrl: data.img
        });
      }
    });
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  handleRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `userReg/getImgCode`,
      payload: this.state.imgId
    }).then(resp => {
      if (resp.code == 200) {
        let data = resp.result;
        this.setState({
          imgId: data.id,
          imgUrl: data.img
        });
      }
    });
  };

  handleSubmit = (err, values) => {
    const { type, serviceType } = this.state;
    console.log(err, type);
    if (!err) {
      const { dispatch } = this.props;
      if (type === "mobile") {
        this.handleRegister(values, type, serviceType, dispatch);
        return;
      }
    }
  };

  handleRegister = (values, type, smsprice, dispatch) => {
    let services = values.services.join(",");
    dispatch({
      type: "userReg/register",
      payload: { ...values, services }
    })
      .then(resp => {
        if (resp.code == 200) {
          message.success("申请成功");
          // this.handleRefresh()
        } else {
          message.error(`申请失败,${resp.msg}`);
        }
        this.handleRefresh();
        // this.onTabChange('user');
      })
      .catch(err => {
        this.handleRefresh();
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

      this.loginForm.validateFields(
        ["mobile", "imgCode"],
        {},
        (err, values) => {
          console.log(err);
          if (err) {
            reject(err);
          } else {
            const { dispatch } = this.props;
            dispatch({
              type: "userReg/getCaptcha",
              payload: {
                mobile: values.mobile,
                id: this.state.imgId,
                code: values.imgCode
              }
            })
              .then(resolve)
              .catch(reject);
          }
        }
      );
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

  // handleUserCheckValidator = (rule, value, callback) => {
  //   const { dispatch } = this.props;
  //   console.log(rule, value);
  //   if (value == '') {
  //     callback();
  //     return;
  //   }
  //   dispatch({
  //     type: `userLogin/checkName`,
  //     payload: value
  //   }).then(response => {
  //     if (response.code === 200) {
  //       callback();
  //     } else {
  //       callback('用户名已存在');
  //     }
  //   })
  // };

  render() {
    const { userReg, submitting } = this.props;
    const { status, type: loginType } = userReg;
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
          {/* <Tab
            key="user"
            tab="登录"
          >
            {status === 'error' &&
              loginType === 'user' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-verification-code',
                }),
              )}
            <Mobile
              name="userName"
              placeholder="手机号"
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
          
            <Password
              name="password1"
              placeholder={`${formatMessage({
                id: 'user-login.login.password',
              })}`}
              rules={[
                {
                  required: true,
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
            <div className="ant-row login-find-pass" style={{color: 'red !important'}} >
              <Link to="/user/retrieveByMobile" style={{ float: 'right', display: 'block'}}><span>找回密码</span></Link>
            </div>
            

            
              <Submit loading={submitting} style={{float: 'left'}}>
                登录
              </Submit>
            
          </Tab> */}

          <Tab key="mobile" tab="睿宏产品服务免费试用申请表">
            {status === "error" &&
              loginType === "mobile" &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: "user-login.login.message-invalid-verification-code"
                })
              )}
            <UserName
              name="name"
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

            <ServiceList name="services"></ServiceList>

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
            <div className="" style={{ display: "flex" }}>
              <div
                className="ant-col ant-form-item-control-wrapper"
                style={{ width: "90%" }}
              >
                <ImgCode
                  name="imgCode"
                  placeholder="请输入图形验证码"
                ></ImgCode>
              </div>
              <div className="ant-col ant-form-item-control-wrapper">
                <img
                  src={this.state.imgUrl}
                  style={{ cursor: "pointer" }}
                  onClick={this.handleRefresh}
                ></img>
              </div>
            </div>
            {/* <div>
              <img src={this.state.imgUrl}></img>
            </div> */}
            <Captcha
              name="code"
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

            {/* <div>
              <Checkbox onChange={ this.checkboxChange } defaultChecked={ this.state.agree } /> 
              <span style={{'paddingLeft': '8px'}}>我已阅读并同意</span> 
              <a href="https://docs.hongyusky.cn/web/#/2?page_id=1" target="_blank">《用户协议》</a> 
              及 
              <a href="https://docs.hongyusky.cn/web/#/2?page_id=9" target="_blank">《服务条款》</a>
            </div> */}

            <Submit loading={submitting} style={{ float: "left" }}>
              提交申请
            </Submit>
          </Tab>

          <div>
            为了能给您提供更好的服务，请填写真实信息，此试用申请仅供意向客户使用，客户经理会在2个工作日内和您联系，咨询电话：025-68909766。
            <br></br>
            睿宏承诺：您不会因注册而被扣除任何费用，并且保证您的信息隐私，请放心填写！
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default UserReg;
