import {
    message,
  } from 'antd';
  import React, { Component, Fragment } from 'react';
  import { PageHeaderWrapper } from '@ant-design/pro-layout';
  import { connect } from 'dva';
  import moment from 'moment';
  import styles from './style.less';

  class P2P extends Component {
      render () {
          return (
              <message>点对点发送</message>
          )
      }
  }

  export default P2P