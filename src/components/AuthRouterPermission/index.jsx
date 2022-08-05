import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NoPermission from '../../pages/exception/NoPermission';

function AuthRouterPermission({ Comp, rights }) {
  const location = useLocation();

  return <>{rights.includes(location.pathname) ? <Comp /> : <NoPermission />}</>;
}

const mapStateToProps = state => {
  return {
    rights: state.loginReducer.userInfo[0].role.rights
  };
};

export default connect(mapStateToProps, null)(AuthRouterPermission);
