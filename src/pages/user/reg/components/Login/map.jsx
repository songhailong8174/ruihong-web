import { Icon, Select } from "antd";
import React from "react";
import styles from "./index.less";

const selectBefore = (
  // <img src={ this.state.imgUrl }></img>
  <Select defaultValue="+86" style={{ width: 90 }}>
    <Option value="+86">+86</Option>
  </Select>
);

export default {
  UserName: {
    props: {
      size: "large",
      id: "userName",
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: "admin"
    },
    rules: [
      {
        required: true,
        message: "Please enter username!"
      }
    ]
  },
  Password: {
    props: {
      size: "large",
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: "password",
      id: "password",
      placeholder: "888888"
    },
    rules: [
      {
        required: true,
        message: "Please enter password!"
      }
    ]
  },
  Mobile: {
    props: {
      size: "large",
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: "mobile number"
      // addonBefore: selectBefore
    },
    rules: [
      {
        required: true,
        message: "Please enter mobile number!"
      },
      {
        pattern: /^1\d{10}$/,
        message: "Wrong mobile number format!"
      }
    ]
  },
  ImgCode: {
    props: {
      size: "large",
      placeholder: "mobile number"
      // addonBefore: selectBefore
    },
    rules: [
      {
        required: true,
        message: "请输入图形验证码"
      }
    ]
  },
  ServiceList: {
    props: {
      size: "large",
      placeholder: "请选择需要的服务",
      mode: "multiple"
      // addonBefore: selectBefore
    },
    rules: [
      {
        required: true,
        message: "请选择需要的服务"
      }
    ]
  },
  Captcha: {
    props: {
      size: "large",
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: "captcha"
    },
    rules: [
      {
        required: true,
        message: "Please enter Captcha!"
      }
    ]
  }
};
