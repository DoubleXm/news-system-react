import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import PublishTable from '../../components/publish-manage/PublishTable';
import { usePublishTable } from '../../hooks/publish-manage/usePublishTable';
import { getPublishedData } from '../../api/publish-manage';

function Publish({ userInfo }) {
  const reqFunc = () => getPublishedData(userInfo.username);
  const { dataSource, newsOffline } = usePublishTable(reqFunc);

  return (
    <PublishTable
      dataSource={dataSource}
      Button={row => (
        <Button type="primary" size="small" ghost danger onClick={() => newsOffline(row)}>
          下线
        </Button>
      )}
    />
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.loginReducer.userInfo[0]
  };
};

export default connect(mapStateToProps, null)(Publish);
