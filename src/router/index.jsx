import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../layout';
import Login from '../pages/login/Login';
import NotFound from '../pages/exception/NotFound';
import News from '../pages/outter/News';
import NewsDetail from '../pages/outter/NewsDetail';

const RootRouter = props => {
  const location = useLocation();

  const filterRoute = function () {
    if (!props.token) {
      if (location.pathname !== '/') {
        return <Redirect to={location.pathname} />;
      } else {
        return <Redirect to={'/login'} />;
      }
    } else {
      return <Layout />;
    }
  };

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/news" component={News} exact />
      <Route path="/news/detail/:id" component={NewsDetail} exact />

      <Route path="/" render={filterRoute} />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};
export default connect(mapStateToProps, null)(RootRouter);
