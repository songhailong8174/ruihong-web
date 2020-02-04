import { Form, Input, Button, Alert, Drawer, Upload, Icon } from 'antd';
import React from 'react';
import Editor from './Editor'

const FormItem = Form.Item;
const { TextArea } = Input;

const UpdateForm = props => {
  const { updateModalVisible, form, handleUpdate, handleUpdateModalVisible, values } = props;


  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      let fileObj = fieldsValue.imgData != undefined ? fieldsValue.imgData.file : undefined;
      handleUpdate({...fieldsValue, id: values.id, img: fileObj != undefined ? fileObj.thumbUrl : values.img});
    });
  };

  let imgList = []
  if (values.img != '') {
    imgList.push({
      uid: Math.random,
      name: Math.random,
      staus: 'done',
      thumbUrl: values.img
    })
  }

  const contentEvent = (val) => {
    content = val
  }

  return (
    <Drawer
      destroyOnClose
      title="新闻发布"
      width="60%"
      visible={updateModalVisible}
      onClose={() => handleUpdateModalVisible()}
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
            initialValue: values.title
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
            initialValue: values.introduce
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
            fileList: imgList
          })(<Upload
              accept="image/*"
              listType="picture"
              customRequest={ () => {} }
            >
            { 
              values.img != null ? <img src={ values.img } style={{width: '120px', height: '120px', cursor: 'pointer'}} title="点击更换图片" />
              :  <Button><Icon type="upload" />上传</Button>
            }
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
            initialValue: values.content
          })(<Editor />)}
        </FormItem>
      </Form>
      <div
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          // width: '100%',
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

export default Form.create()(UpdateForm);