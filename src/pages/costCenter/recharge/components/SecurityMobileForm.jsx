import { Form, Input, Modal, Button } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { 
    modalVisible, 
    form, 
    modifyMobile, 
    mobile, 
    handleModalVisible, 
    onGetCaptcha,
    count,
    getCaptchaButtonText,
    getCaptchaSecondText
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      modifyMobile(fieldsValue);
      // form.resetFields();
      // handleAdd(fieldsValue);
    });
  };

  

  return (
    <Modal
      destroyOnClose
      title="更新绑定手机"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="当前手机号"
      >
        <span>{ mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }</span>
        <Button 
          type="primary"
          disabled={!!count}
          style={{marginLeft: '2em'}}
          onClick={onGetCaptcha}
        >
          {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
        </Button>
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="验证码"
      >
        {form.getFieldDecorator('realname', {
          rules: [
            {
              required: true,
              message: '请输入验证码'
            },
          ],
        })(<Input placeholder="请输入验证码" />)}
      </FormItem>

      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="新手机号"
      >
        {form.getFieldDecorator('company', {
          rules: [
            {
              required: true,
              message: '请输入新手机号'
            },
            {
              pattern: /^1\d{10}$/,
              message: '请输入正确的手机号',
            },
          ],
        })(<Input placeholder="请输入新手机号" />)}
      </FormItem>
      
    </Modal>
  );
};

export default Form.create()(CreateForm);
