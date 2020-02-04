import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import StandardTable from './components/StandardTable';
import styles from './style.less';
import AuthTip from '../../../components/AuthTip';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ Receive, loading }) => ({
  Receive,
  loading: loading.models.rule,
}))
class ReceiveList extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '上行短信内容',
      dataIndex: 'moContent',
    },
    {
      title: '下行短信内容',
      dataIndex: 'mtContent',
    },
    {
      title: '子码',
      dataIndex: 'srcNum',
    },
    {
      title: '上行时间',
      dataIndex: 'time',
      sorter: false,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Receive/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'Receive/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'Receive/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'Receive/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;

      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      let values = {};
      if(fieldsValue.content != undefined){
        values.content = fieldsValue.content;
      }
      if(fieldsValue.smscontent != undefined){
        values.smscontent = fieldsValue.smscontent;
      }
      if(fieldsValue.times != undefined){
        values.startDay = fieldsValue.times[0].format('YYYY-MM-DD');
        values.endDay = fieldsValue.times[1].format('YYYY-MM-DD');
      }
      this.setState({
        formValues: fieldsValue,
      });
      dispatch({
        type: 'Receive/fetch',
        payload: values,
      });
    });
  };


  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="上行时间">
            {getFieldDecorator('times')(<RangePicker allowClear={false} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="上行内容">
              {getFieldDecorator('content')(
                <Input placeholder="上行的内容或关键字" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="上行时间">
              {getFieldDecorator('times')(<RangePicker allowClear={false} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="上行内容">
              {getFieldDecorator('content')(
                <Input placeholder="上行的内容或关键字" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="下行内容">
              {getFieldDecorator('smscontent')(
                <Input placeholder="下行的内容或关键字" />
              )}
            </FormItem>
          </Col>
        </Row>
        
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              float: 'right',
              marginBottom: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
              onClick={this.handleFormReset}
            >
              重置
            </Button>
            <a
              style={{
                marginLeft: 8,
              }}
              onClick={this.toggleForm}
            >
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      Receive: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderWrapper>
        <AuthTip {...this.props}></AuthTip>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(ReceiveList);
