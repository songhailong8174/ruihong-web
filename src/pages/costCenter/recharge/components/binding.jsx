import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Icon, List, Modal } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {

  state = {
    modalVisible: false,
    unbVisible: false,
    imgUrl: 'http://new.vckin.com/images/%E4%BA%8C%E7%BB%B4%E7%A0%81/u716.jpg'
  };

  getData = () => [
    {
      title: '绑定微信',
      description: '当前未绑定微信',
      actions: [
        <a key="Bind" onClick={() => this.handleModalVisible(true)}>
          <FormattedMessage id="account-settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="wechat" className="alipay" style={{ 'color': '#00D02A'}} />,
    },
    {
      title: '解绑微信',
      description: '当前已绑定微信',
      actions: [
        <a key="Bind" onClick={() => this.showModal(true)}>
          解绑
        </a>,
      ],
      avatar: <Icon type="wechat" className="alipay" style={{ 'color': '#00D02A'}} />,
    },
  ];

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  hideModalVisible = () => {
    this.handleModalVisible(false);
  };

  showModal = flag => {
    this.setState({
      unbVisible: !!flag,
    });
  };

  hideModal = () => {
    this.showModal(false);
  };

  unBinding = () => {

    this.hideModal();
  }

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />

        <Modal
          title="绑定微信"
          closable={ false }
          footer={ null }
          visible={ this.state.modalVisible }
          onCancel={ this.hideModalVisible }
        >
            <div style={{
              'textAlign': 'center'
            }}>
              <img src={ this.state.imgUrl }/>
              <div style={{
                'paddingTop': '20px'
              }}>扫描上面二维码图案，关注公众号即可绑定帐号</div>
            </div>
        </Modal>

        <Modal
          title="解除微信绑定"
          closable={ false }
          visible={ this.state.unbVisible }
          onCancel={ this.hideModal }
          onOk={ this.unBinding }
        >
          <div 
            style={{
              'color': '#929292',
              'fontWeight': 'bold',
              'fontSize': '16px'
            }}
          >
            解除绑定不会取消微信公众号关注，解除绑定后扫描二维码图案即可重新绑定。
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default BindingView;
