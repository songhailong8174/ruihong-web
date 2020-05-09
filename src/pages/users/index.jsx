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
  Popconfirm
} from 'antd';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import StandardTable from './components/StandardTable';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

/* eslint react/no-multi-comp:0 */
@connect(({ Users, loading }) => ({
  Users,
  loading: loading.models.rule,
}))
class UsersList extends Component {
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
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '姓名',
      dataIndex: 'realname'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '价格',
      dataIndex: 'smsprice'
    },
    {
      title: '公司',
      dataIndex: 'company'
    },
    {
      title: '税号',
      dataIndex: 'taxno'
    },
    {
      title: '账户名称',
      dataIndex: 'accountnum'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => <span>{ val == 10 ? '正常' : '已冻结'}</span>
    },
    {
      title: '认证状态',
      dataIndex: 'authstatus',
      sorter: false,
      render: val => <span>{ val == 1 ? '已认证' : '未认证'}</span>
    },
    {
      title: '注册时间',
      dataIndex: 'createdate',
      sorter: false,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a href="#" onClick={ () => this.handleUpdateModalVisible(true, record) }>{ record.authStatus == 0 ? '查看' : '审核'}</a>&nbsp;
          {/* <a href="#" onClick={ () => this.handlePublish(record) }>{ record.status == 10 ? '冻结' : '解冻'}</a>&nbsp; */}
        </Fragment>
      ),
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Users/fetch',
      payload: {currentPage: 1, pageSize: 10}
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
      type: 'Users/fetch',
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
      type: 'Users/fetch',
      payload: {},
    });
  };

  handleEdit = (record) => {
    const { form, dispatch } = this.props;
  };
  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Users/delete',
      payload: {id: record.id},
    }).then(resp => {
      if(resp.code == 200){
        message.success('删除成功');
        dispatch({
          type: 'News/fetch',
          payload: {}
        });
      } else {
        message.error(resp.msg);
      }
    });
  };
  handlePublish = (record) => {
    const { dispatch } = this.props;
    if (record.status != 0) {
      this.unPublish(record);
      return
    }
    dispatch({
      type: 'Users/publish',
      payload: {id: record.id},
    }).then(resp => {
      if(resp.code == 200){
        message.success('发布成功');
        dispatch({
          type: 'Users/fetch',
          payload: {}
        });
      } else {
        message.error(resp.msg);
      }
    });
  };

  unPublish = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Users/unPublish',
      payload: {id: record.id},
    }).then(resp => {
      if(resp.code == 200){
        message.success('取消成功');
        dispatch({
          type: 'Users/fetch',
          payload: {}
        });
      } else {
        message.error(resp.msg);
      }
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
          type: 'Users/remove',
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
      // let values = {};
      // if(fieldsValue.times != undefined){
      //   values.startDay = fieldsValue.times[0].format('YYYY-MM-DD');
      //   values.endDay = fieldsValue.times[1].format('YYYY-MM-DD');
      // }
      this.setState({
        formValues: fieldsValue,
      });
      dispatch({
        type: 'Users/fetch',
        payload: {...fieldsValue, pageSize: 10, currentPage: 1},
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'News/add',
      payload: fields,
    }).then(resp => {
      if(resp.code == 200){
        message.success('添加成功');
        dispatch({
          type: 'News/fetch'
        });
      } else {
        message.error(resp.msg);
      }
    })
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Users/appove',
      payload: fields,
    }).then(resp => {
      if(resp.code == 200){
        message.success('操作成功');
        dispatch({
          type: 'Users/fetch',
          payload: {currentPage: 1, pageSize: 10}
        });
      } else {
        message.error(resp.msg);
      }
    })
    this.handleUpdateModalVisible();
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
          <Col md={5} sm={8}>
            <FormItem label="用户名">
              {getFieldDecorator('username')(< Input />)}
              {/* {getFieldDecorator('times')(<RangePicker allowClear={false} />)} */}
            </FormItem>
          </Col>

          <Col md={5} sm={8}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(< Input />)}
              {/* {getFieldDecorator('times')(<RangePicker allowClear={false} />)} */}
            </FormItem>
          </Col>

          <Col md={5} sm={8}>
            <FormItem label="公司">
              {getFieldDecorator('company')(< Input />)}
              {/* {getFieldDecorator('times')(<RangePicker allowClear={false} />)} */}
            </FormItem>
          </Col>
          
          <Col md={9} sm={24}>
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
          <Col md={5} sm={8}>
            <FormItem label="用户名">
              {getFieldDecorator('username')(< Input />)}
              {/* {getFieldDecorator('times')(<RangePicker allowClear={false} />)} */}
            </FormItem>
          </Col>

          <Col md={5} sm={8}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(< Input />)}
              {/* {getFieldDecorator('times')(<RangePicker allowClear={false} />)} */}
            </FormItem>
          </Col>

          <Col md={5} sm={8}>
            <FormItem label="公司">
              {getFieldDecorator('company')(< Input />)}
              {/* {getFieldDecorator('times')(<RangePicker allowClear={false} />)} */}
            </FormItem>
          </Col>
          <Col md={5} sm={8}>
            <FormItem label="使用状态">
              {getFieldDecorator('authstatus')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">未认证</Option>
                  <Option value="1">已认证</Option>
                </Select>,
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
      Users: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {/* <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button> */}
              {/* {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )} */}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {/* <CreateForm {...parentMethods} modalVisible={modalVisible} /> */}
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(UsersList);
