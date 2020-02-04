import React from "react";
import { Layout, Icon } from 'antd'
const { Footer } = Layout;

class MyFooter extends React.Component {
  render() {
    return(
      <Footer
        style={{
          color: 'rgba(0, 0, 0, 0.45)',
          textAlign: 'center'
        }}
      >
        Copyright <Icon type="copyright" />  2019 南京睿宏无限网络技术有限公司
      </Footer>
    );
  }
}

export default MyFooter