import React from 'react';
import { Layout, Menu, Dropdown, Space, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

const { Header } = Layout;

function TopHeader(props) {
  const menu = <Menu onClick={({ key }) => menuClick(key)} items={[{ label: '退出登录', key: 'logout' }]} />;

  const menuClick = key => {
    switch (key) {
      case 'logout':
        props.logout();
        break;
      default:
        break;
    }
  };

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => props.setCollapsed(!props.collapsed)
      })}
      <div style={{ float: 'right' }}>
        <Dropdown overlay={menu} trigger={['click']} style={{ float: 'right' }}>
          <a href="javascript;" onClick={e => e.preventDefault()}>
            <Space>欢迎 {props.username} </Space>
          </a>
        </Dropdown>
        <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginLeft: 10 }} />
      </div>
    </Header>
  );
}

const mapDispatchToProps = state => {
  return {
    username: state.loginReducer.userInfo[0].username
  };
};

const mapDispatchToState = dispatch => {
  return {
    logout() {
      dispatch({ type: 'USER_LOGOUT' });
      window.location.reload();
    }
  };
};
export default connect(mapDispatchToProps, mapDispatchToState)(TopHeader);
