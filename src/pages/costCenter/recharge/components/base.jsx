import { Button, Form, Input, Select, Upload, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
// import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const FormItem = Form.Item;
// const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

class BaseView extends Component {
  view = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    console.log(currentUser, form);

    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" {...formItemLayout} hideRequiredMark style={{
            fontWeight: 'bold',
            fontSize: '20px'
          }}>

          <FormItem
              label="名称："
            >
             <div>南京睿宏无限网络技术有限公司</div>
          </FormItem>
          <FormItem
              label="开户行："
            >
             <div>招商银行南京分行鼓楼支行</div>
          </FormItem>
          <FormItem
              label="账号："
            >
             <div>125907465910501</div>
          </FormItem>
          <FormItem
              label="税号："
            >
             <div>91320102MA1MT69F32</div>
          </FormItem>
          <FormItem
              label="地址："
            >
             <div>南京市玄武区丹凤街19号5单元701室</div>
          </FormItem>
          <FormItem
              label="电话："
            >
             <div>025-68909768</div>
          </FormItem>

          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(BaseView);
