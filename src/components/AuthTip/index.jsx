import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'antd'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less'
import classNames from 'classnames';
import bg from '../../assets/guide-front.png';

class AuthTip extends React.Component {
  constructor (props) {
    super(props);
    console.log(props);
    const _auth = sessionStorage.getItem('auth');
    const _role = sessionStorage.getItem('u-r'); 
    this.state = {
      isAuth: _role == 'user' && _auth != 1
    }
  }

  authClick = () => {
    // console.log(this);
    const { dispatch } = this.props;
    this.props.dispatch(routerRedux.push({
      pathname: '/account/settings',
      state: {
        selectKey: 'auth'
      }
    }));
  }

  render() {
    const { className, placeholder, open, ...restProps } = this.props;
    console.log(this.props);
    return(
      <Modal
        visible={ this.state.isAuth }
        centered={true}
        closable={false}
        footer={null}
        mask={true}
        width="800px"
        wrapClassName={'authTip'}
        style={{
          backgroundColor: 'transparent',
          padding: '80px'
        }}
        bodyStyle={{
          padding: '0px',
          backgroundColor: 'transparent'
        }}
      >
        <div style={{
          fontSize: '20px'
        }}>实名认证尊享服务</div>
        <div style={{
          paddingTop: '10px'
        }}>
          <h1 style={{
            display: 'inline-block',
            fontWeight: 'bold'
          }}>专属客户</h1>
          <h1 style={{
            display: 'inline-block',
            color: '#2A44F0',
            paddingLeft: '20px',
            fontWeight: 'bold'
          }}>贵宾式服务</h1>
        </div>
        <div style={{
          position: 'absolute',
          left: '0px',
          bottom: '-70px'
        }}>
          
        </div>
        <Button onClick={this.authClick} type="primary" size="large" shape="round" style={{
              fontSize: '20px'
            }}>立即实名</Button>
        {/* <div style={{
          width: '300px'
        }}>
          
        </div> */}
      </Modal>
    );
  }
}

export default AuthTip;