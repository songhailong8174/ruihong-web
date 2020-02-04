import { Form, Input, Modal } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建短信签名"
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
        label="签名名称"
      >
        {form.getFieldDecorator('desc', {
          rules: [
            {
              required: true,
              message: '请输入2至12个字符',
              min: 2,
              max: 12
            },
          ],
        })(<Input placeholder="请按照要求填写" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        >
        <ul style={{
          paddingLeft: '8em',
          width: '100vw',
          lineHeight: 1.5,
          listStyle: 'disc',
          color: '#c0c0c0'
        }}>
          <li> 长度为2-12个字符</li>
          <li>签名不能是纯数字、纯字母。</li>
          <li>不能使用特殊符号，如 -.+# 等。</li>
          <li>签名带上【】符号，例如【睿宏无限】。</li>
        </ul>
      </FormItem>
      
    </Modal>
  );
};

export default Form.create()(CreateForm);
