import {
  Form,
  Input,
  Button,
  Alert,
  Drawer,
  Icon,
  Descriptions,
  Badge
} from "antd";
import React from "react";
import Editor from "./Editor";

const FormItem = Form.Item;
const { TextArea } = Input;

const UpdateForm = props => {
  const {
    updateModalVisible,
    form,
    handleUpdate,
    handleUpdateModalVisible,
    values
  } = props;

  console.log(values);

  const okHandle = () => {
    handleUpdate({ id: values.userid });
    // form.validateFields((err, fieldsValue) => {
    //   if (err) return;
    //   console.log(fieldsValue);
    //   let fileObj = fieldsValue.imgData != undefined ? fieldsValue.imgData.file : undefined;
    //   handleUpdate({...fieldsValue, id: values.id, img: fileObj != undefined ? fileObj.thumbUrl : values.img});
    // });
  };

  return (
    <Drawer
      destroyOnClose
      title="用户信息"
      width="60%"
      visible={updateModalVisible}
      onClose={() => handleUpdateModalVisible()}
    >
      <Descriptions title="企业信息" layout="vertical" bordered>
        <Descriptions.Item label="企业名称">{values.company}</Descriptions.Item>
        <Descriptions.Item label="纳税人识别号">
          {values.taxno}
        </Descriptions.Item>
        <Descriptions.Item label="对公账号">
          {values.accountnum}
        </Descriptions.Item>
        <Descriptions.Item label="咨询服务" span={3}>
          {values.smsprice}
        </Descriptions.Item>
        <Descriptions.Item label="地址" span={3}>
          {values.provicename} {values.cityname} {values.address}
        </Descriptions.Item>
        <Descriptions.Item label="联系人">{values.contact}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{values.phone}</Descriptions.Item>
        <Descriptions.Item label="认证状态">
          {values.authstatus == 1 ? "已认证" : "未认证"}
        </Descriptions.Item>
        <Descriptions.Item label="营业执照">
          <img
            src={values.license}
            style={{
              width: "100%",
              height: "auto"
            }}
            alt=""
          />
        </Descriptions.Item>
      </Descriptions>

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e9e9e9",
          padding: "10px 16px",
          background: "#fff",
          textAlign: "right"
        }}
      >
        <Button
          onClick={() => handleUpdateModalVisible()}
          style={{ marginRight: 8 }}
        >
          取消
        </Button>
        <Button onClick={() => okHandle()} type="primary">
          通过
        </Button>
      </div>
    </Drawer>
  );
};

export default Form.create()(UpdateForm);
