import React, { Component } from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, Card } from 'antd';
import { connect } from 'dva';
import BaseView from './components/base';
// import BindingView from './components/binding';
import SecurityView from './components/security';
import AuthView from './components/auth'
import styles from './style.less';
import AuthTip from '../../../components/AuthTip';

const { Item } = Menu;

@connect(({ AccountInfo }) => ({
  AccountInfo,
}))
class AccountInfo extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      base: '线下汇款'
    };
    this.state = {
      banlance: 0,
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'AccountInfo/fetch',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = key => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'base':
        return <BaseView />;
      default:
        break;
    }

    return null;
  };

  render() {
    // const { balacnce } = this.props;

    // if (!balacnce) {
    //   return '';
    // }

    const { mode, selectKey } = this.state;
    const {
      AccountInfo: { data },
      loading,
    } = this.props;

    console.log(data);
    return (
      <GridContent>
        <AuthTip {...this.props}></AuthTip>
        <Card style={{
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '20px',
          color: '#000'
        }}>
          账户余额：
          {
            AccountInfo.banlance > 0 ?
              <span style={{
                fontSize: '26px'
              }}>{data.banlance}</span>
            :
              <span style={{
                fontSize: '26px',
                color: 'red'
              }}>{data.banlance}</span>
          }
          <span style={{
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.45)',
            paddingLeft: '8px'
          }}>元</span>
        </Card>
        <div
          className={styles.main}
          ref={ref => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default AccountInfo;
