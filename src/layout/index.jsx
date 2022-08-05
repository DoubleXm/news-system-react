import { Layout } from 'antd';
import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthRouterPermission from '../components/AuthRouterPermission';
import Header from './Header';
import Aside from './Aside';

import Home from '../pages/home/Home';
import RightList from '../pages/right-manage/right/List';
import RoleList from '../pages/right-manage/role/List';
import UserList from '../pages/user-manage/List';
import NotFound from '../pages/exception/NotFound';
import AddOrEdit from '../pages/news-manage/AddOrEdit';
import Draft from '../pages/news-manage/Draft';
import Preview from '../pages/news-manage/Preview';
import AuditList from '../pages/audit-manage/List';
import Audit from '../pages/audit-manage/Audit';
import NewsCategoty from '../pages/news-manage/Category';
import Publish from '../pages/publish-manage/Publish';
import UnPublish from '../pages/publish-manage/UnPublish';
import SunSet from '../pages/publish-manage/Sunset';

const { Sider, Content } = Layout;

const Container = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{!collapsed ? '全球新闻发布系统' : '发布系统'}</div>
        <Aside />
      </Sider>
      <Layout className="site-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Switch>
            <Route path="/home" render={() => <AuthRouterPermission Comp={Home} />} />

            <Route path="/right-manage/right/list" render={() => <AuthRouterPermission Comp={RightList} />} />
            <Route path="/right-manage/role/list" render={() => <AuthRouterPermission Comp={RoleList} />} />

            <Route path="/user-manage/list" render={() => <AuthRouterPermission Comp={UserList} />} />

            <Route path="/news-manage/add" render={() => <AuthRouterPermission Comp={AddOrEdit} />} />
            <Route path="/news-manage/draft" render={() => <AuthRouterPermission Comp={Draft} />} />
            <Route path="/news-manage/category" render={() => <AuthRouterPermission Comp={NewsCategoty} />} />
            <Route path="/news-manage/preview/:id" render={() => <Preview />} />
            <Route path="/news-manage/update/:id" component={AddOrEdit} />

            <Route path="/audit-manage/list" render={() => <AuthRouterPermission Comp={AuditList} />} />
            <Route path="/audit-manage/audit" render={() => <AuthRouterPermission Comp={Audit} />} />

            <Route path="/publish-manage/published" render={() => <AuthRouterPermission Comp={Publish} />} />
            <Route path="/publish-manage/unpublished" render={() => <AuthRouterPermission Comp={UnPublish} />} />
            <Route path="/publish-manage/sunset" render={() => <AuthRouterPermission Comp={SunSet} />} />

            <Redirect from="/" to="/home" exact />

            <Route path="*" component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;
