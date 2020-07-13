import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { Component } from "react";
import omit from "omit.js";
import ItemMap from "./map";
import LoginContext from "./LoginContext";
import styles from "./index.less";

const FormItem = Form.Item;
const { Option } = Select;

class WrapFormItem extends Component {
  static defaultProps = {
    getCaptchaButtonText: "captcha",
    getCaptchaSecondText: "second"
  };

  interval = undefined;

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    const { updateActive, name = "" } = this.props;

    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;

    if (result === false) {
      return;
    }

    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({
    onChange,
    defaultValue,
    customProps = {},
    rules
  }) => {
    const options = {
      rules: rules || customProps.rules
    };

    if (onChange) {
      options.onChange = onChange;
    }

    if (defaultValue) {
      options.initialValue = defaultValue;
    }

    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({
      count
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count: count <= 0 ? 0 : count
      });

      if (count <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count } = this.state; // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil

    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      form,
      tabUtil,
      ...restProps
    } = this.props;

    if (!name) {
      return null;
    }

    if (!form) {
      return null;
    }

    const { getFieldDecorator } = form; // get getFieldDecorator props

    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};
    if (type === "ServiceList") {
      return (
        <FormItem>
          {getFieldDecorator(
            name,
            options
          )(
            <Select {...customProps}>
              <Option value="短信服务">短信服务</Option>
              <Option value="语音服务">语音服务</Option>
              <Option value="视频短信">视频短信</Option>
              <Option value="一键认证">一键认证</Option>
            </Select>
          )}
        </FormItem>
      );
    }

    if (type === "Captcha") {
      const inputProps = omit(otherProps, ["onGetCaptcha", "countDown"]);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(
                name,
                options
              )(<Input {...customProps} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count
                  ? `${count} ${getCaptchaSecondText}`
                  : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }

    return (
      <FormItem>
        {getFieldDecorator(
          name,
          options
        )(<Input {...customProps} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];

  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});
export default LoginItem;
