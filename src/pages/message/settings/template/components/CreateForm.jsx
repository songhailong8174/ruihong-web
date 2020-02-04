import { Form, Input, Radio, Modal, Alert } from 'antd';
import React from 'react';

const FormItem = Form.Item;
const { TextArea } = Input;

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
      title="新建短信模版"
      width="600px"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <div style={{'marginBottom': '20px' }}>
        <Alert message="短信模板在提交后1个工作日内完成审核" type="info" showIcon />
      </div>

      <FormItem
          labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="模板类型"
      >
        {form.getFieldDecorator('type', {
          rules: [
            {
              required: true,
              message: '请选择模版类型'
            },
          ],
          initiaValue: '1'
        })(
          <Radio.Group>
            <Radio.Button value="1">验证码类</Radio.Button>
            <Radio.Button value="2">通知类</Radio.Button>
          </Radio.Group>
        )}

      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="模版名称"
      >
        {form.getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入模版名称',
              min: 2,
            },
          ],
        })(<Input placeholder="请输入至少两个字符" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="短信签名"
      >
        {form.getFieldDecorator('signature', {
          rules: [
            {
              required: true,
              message: '请输入短信签名'
            },
          ],
        })(<Input placeholder="请输入短信签名" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="模版内容"
      >
        {form.getFieldDecorator('content', {
          rules: [
            {
              required: true,
              message: '请输入模版内容',
              min: 10,
            },
          ],
        })(<TextArea rows={4} placeholder="请输入至少十个字符" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(CreateForm);
