import {
    message,
  } from 'antd';
  import React, { Component, Fragment } from 'react';
  import { PageHeaderWrapper } from '@ant-design/pro-layout';
  import { connect } from 'dva';
  import moment from 'moment';
  import styles from './style.less';

  class Invoice extends Component {
      render () {
          return (
              <message>发票管理</message>
          )
      }
  }

  export default Invoice