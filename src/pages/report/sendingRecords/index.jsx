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
import CreateForm from './components/CreateForm';
import StandardTable from './components/StandardTable';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';
import AuthTip from '../../../components/AuthTip';


const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'processing', 'success', 'error'];
const status = {
  1: '未知',
  3: '未发送',
  4: '发送失败',
  5: '发送成功',
  6: '黑名单',
  7: '拦截',
  8: '审核失败'
};

const dateFormat = 'YYYY-MM-DD';
const defaultSelectDate = {
  startDate: moment(),
  endDate: moment()
}

// const limitSelectDate = {
//   min: moment()
// }

/* eslint react/no-multi-comp:0 */
@connect(({ NearHistory, loading }) => ({
  NearHistory,
  loading: loading.models.rule,
}))
class NearHistoryList extends Component {
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
      title: '短信内容',
      dataIndex: 'msgContent',
    },
    {
      title: '扣费金额',
      dataIndex: 'costMoney',
      sorter: false,
      align: 'right',
      render: val => `${val} 元`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '计费条数',
      dataIndex: 'chargeCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: false,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '状态',
      dataIndex: 'sendState',
      // filters: [
      //   {
      //     text: status[0],
      //     value: '0',
      //   },
      //   {
      //     text: status[1],
      //     value: '1',
      //   },
      //   {
      //     text: status[2],
      //     value: '2',
      //   },
      //   {
      //     text: status[3],
      //     value: '3',
      //   },
      // ],

      render(val) {
        return status[val];
      },
    },
    {
      title: '接收时间',
      dataIndex: 'reportTime',
      sorter: false,
      render: val => <span>{ val != null ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''}</span>,
    }
  
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'NearHistory/fetch',
      payload: {
        startDay: defaultSelectDate.startDate.format('YYYY-MM-DD'),
        endDay: defaultSelectDate.endDate.format('YYYY-MM-DD')
      }
    });
  }

  disabledDate = current => current && current > moment();

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
      type: 'NearHistory/fetch',
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
      type: 'NearHistory/fetch',
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
          type: 'NearHistory/remove',
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
      if(fieldsValue.sendState != undefined){
        values.sendState = fieldsValue.sendState;
      }
      if(fieldsValue.content != undefined){
        values.content = fieldsValue.content;
      }
      if(fieldsValue.mobiles != undefined){
        values.mobiles = fieldsValue.mobiles;
      }
      if(fieldsValue.times != undefined){
        values.startDay = fieldsValue.times[0].format('YYYY-MM-DD');
        values.endDay = fieldsValue.times[1].format('YYYY-MM-DD');
      }
      this.setState({
        formValues: fieldsValue,
      });
      dispatch({
        type: 'NearHistory/fetch',
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
            <FormItem label="创建时间">
              {getFieldDecorator('times',{
                initialValue: [defaultSelectDate.startDate, defaultSelectDate.endDate]
              })(
                <RangePicker allowClear={false} disabledDate={ this.disabledDate} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('sendState')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="4">失败</Option>
                  <Option value="5">成功</Option>
                </Select>,
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
            <FormItem label="创建时间">
              {getFieldDecorator('times',{
                initialValue: [defaultSelectDate.startDate, defaultSelectDate.endDate]
              })(
                <RangePicker allowClear={false} disabledDate={ this.disabledDate} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('sendState')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="4">失败</Option>
                  <Option value="5">成功</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="发送内容">
              {getFieldDecorator('content')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobiles')(
                <Input placeholder="多个手机号用逗号隔开" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            
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
      NearHistory: { data },
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

export default Form.create()(NearHistoryList);
