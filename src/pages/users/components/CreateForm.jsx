import { Form, Input, Button, Alert, Drawer, Upload, Icon } from 'antd';
import React from 'react';
import Editor from './Editor'

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateForm = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  let content = ''
  let imgData = ''

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let fileObj = fieldsValue.imgData.file;
      handleAdd({...fieldsValue, img: fileObj.thumbUrl});
    });
  };

  const contentEvent = (val) => {
    content = val
  }

  const uploadEvent = (file) => {
    let fileObj = file.file;
    let reader = new FileReader();
    reader.readAsDataURL(fileObj)
    reader.onload = function(e) {
      imgData = e.target.result
    }
  }



  return (
    <Drawer
      destroyOnClose
      title="新闻发布"
      width="60%"
      visible={modalVisible}
      onClose={() => handleModalVisible()}
    >
      <Form>
        <FormItem
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          label="新闻标题"
        >
          {form.getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: '请输入新闻标题',
                min: 2,
              },
            ],
          })(<Input placeholder="请输入至少两个字符" />)}
        </FormItem>
        <FormItem
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          label="新闻简介"
        >
          {form.getFieldDecorator('introduce', {
            rules: [
              {
                required: true,
                message: '请输入新闻简介',
                min: 10,
              },
            ],
          })(<TextArea rows={4} placeholder="请输入至少十个字符" />)}
        </FormItem>
        <FormItem
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          label="缩略图"
        >
          {form.getFieldDecorator('imgData', {
            rules: [
              {
                required: true,
                message: '请选择缩略图'
              },
            ]
          })(<Upload
              accept="image/*"
              listType="picture"
              customRequest={ () => {} }
            >
            <Button>
              <Icon type="upload" />上传
            </Button>
          </Upload>)}
        </FormItem>
        <FormItem
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          label="新闻内容"
        >
          {form.getFieldDecorator('content', {
            rules: [
              // {
              //   required: true,
              //   message: '请输入新闻内容',
              //   min: 10,
              // },
            ],
            initialValue: ''
          })(<Editor onChange={ contentEvent } />)}
        </FormItem>
      </Form>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={() => handleModalVisible()} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={() => okHandle()} type="primary">
          提交
        </Button>
      </div>
    </Drawer>
  );
};

export default Form.create()(CreateForm);