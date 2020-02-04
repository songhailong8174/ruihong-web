import { Button, Form, Input, Select, Upload, message, Checkbox } from 'antd';
import { routerRedux } from 'dva/router';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <Fragment>
    {/* <div className={styles.avatar_title}>
      <FormattedMessage id="account-settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage
            id="account-settings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload> */}
  </Fragment>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('请选择省份');
  }

  if (!city.key) {
    callback('请选择城市');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

@connect(({ accountSettings }) => ({
  currentUser: accountSettings.currentUser,
}))
class AuthView extends Component {
  view = undefined;

  state = {
      agree: true
  }

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;

    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = ref => {
    this.view = ref;
  };

  changeAgreement = e => {
    this.setState({
        agree: e.target.checked,
    });
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        let data = fieldsValue.province;
        let province = data.province.key;
        fieldsValue.city = data.city.key;
        fieldsValue.province = province;
        dispatch({
          type: 'accountSettings/authUser',
          payload: { ...fieldsValue}
        }).then(resp => {
          if(resp.code == 200){
            message.success('更新成功');
            dispatch({
              type: 'accountSettings/fetchCurrent'
            });
          } else {
            message.error(resp.msg);
          }
        });
        // message.success(
        //   formatMessage({
        //     id: 'account-settings.basic.update.success',
        //   }),
        // );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>

          <FormItem
              label="企业名称"
            >
            {getFieldDecorator('company', {
                rules: [
                  {
                    required: true,
                    message: '请输入企业名称'
                  },
                ],
              })(<Input />)}
          </FormItem>

          <FormItem
              label="纳税人识别号"
            >
            {getFieldDecorator('taxno', {
                rules: [
                  {
                    required: true,
                    message: '请输入纳税人识别号'
                  },
                ],
              })(<Input />)}
          </FormItem>

            <FormItem
              label="对公账号"
            >
              {getFieldDecorator('accountnum', {
                rules: [
                  {
                    required: true,
                    message: '请输入对公账号'
                  },
                ],
              })(<Input />)}
            </FormItem>
          
            <FormItem
              label="通信地址"
            >
              {getFieldDecorator('province', {
                rules: [
                  {
                    required: true,
                    message: '请选择通信地址'
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem
            >
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-settings.basic.address-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem
              label="联系人"
            >
            {getFieldDecorator('contact', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-settings.basic.address-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
          </FormItem>

          <FormItem
              label="联系电话"
            >
            {getFieldDecorator('phone', {
                rules: [
                    {
                    required: true,
                    message: '联系电话'
                    },
                    {
                    pattern: /^1\d{10}$/,
                    message: '请输入正确的手机号',
                    },
                ],
                })(<Input placeholder="联系电话" />)}
          </FormItem>
          <div>
            <div style={{float: 'left',width:'5%'}}><Checkbox checked={ this.state.agree} onChange={this.changeAgreement} /></div>
            <div style={{float:'right',width:'95%'}}>本人（公司）确认以上信息都是完整、真实及有效的，因未提供完整、真实及有效信息产生的一切法律后果及给睿宏无限带来损失的由本人（公司）承担。</div>
          </div>

            <div style={{clear: 'both',paddingTop:'2em'}}>
                <Button type="primary" disabled={!this.state.agree} onClick={this.handlerSubmit} style={{width: '100%'}}>确定</Button>
            </div>
            
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default Form.create()(AuthView);