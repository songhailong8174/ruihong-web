import {
    message,
  } from 'antd';
  import React, { Component, Fragment } from 'react';
  import { PageHeaderWrapper } from '@ant-design/pro-layout';
  import { connect } from 'dva';
  import moment from 'moment';
  import styles from './style.less';

  class Group extends Component {
      render () {
          return (
              <message>短信群发</message>
          )
      }
  }

  export default Group