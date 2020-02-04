import { Form, Input, Modal } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, modifyPassword, handleModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      modifyPassword(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="更新密码"
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
        label="旧密码"
      >
        {form.getFieldDecorator('oldPwd', {
          rules: [
            {
              required: true,
              message: '请输入旧密码'
            },
          ],
        })(<Input.Password placeholder="请输入旧密码" />)}
      </FormItem>

      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="新密码"
      >
        {form.getFieldDecorator('newPwd', {
          rules: [
            {
              required: true,
              message: '请输入新密码'
            },
          ],
        })(<Input.Password placeholder="请输入新密码" />)}
      </FormItem>

      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="确认密码"
      >
        {form.getFieldDecorator('rePwd', {
          rules: [
            {
              required: true,
              message: '请输入确认密码'
            },
          ],
        })(<Input.Password placeholder="请输入确认密码" />)}
      </FormItem>
      
    </Modal>
  );
};

export default Form.create()(CreateForm);
