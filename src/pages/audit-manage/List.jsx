import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Button, Tag } from 'antd';
import { getAuditListData, patchAuditPublish, getAuditNewsListData } from '../../api/audit-manage';

function List({ userInfo }) {
  const location = useLocation();
  const history = useHistory();

  const auditList = [
    <Tag>未审核</Tag>,
    <Tag color="orange">审核中</Tag>,
    <Tag color="green">已通过</Tag>,
    <Tag color="red">未通过</Tag>
  ];
  const auditButtonList = row => [
    <Button size="small" type="primary" danger style={{ marginRight: 10 }} onClick={() => cancelNews(row)}>
      撤销
    </Button>,
    <Button size="small" type="primary" onClick={() => releaseNews(row)}>
      发布
    </Button>,
    <Button
      size="small"
      type="primary"
      ghost
      style={{ marginRight: 10 }}
      onClick={() => {
        history.push(`/news-manage/update/${row.id}`);
        window.localStorage.setItem('currentSelectMenu', JSON.stringify([location.pathname]));
      }}
    >
      修改
    </Button>
  ];
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    {
      title: '新闻标题',
      render(row) {
        return (
          <Link
            to={`/news-manage/preview/${row.id}`}
            onClick={() => {
              window.localStorage.setItem('currentSelectMenu', JSON.stringify([location.pathname]));
            }}
          >
            {row.title}
          </Link>
        );
      }
    },
    { title: '作者', dataIndex: 'author' },
    {
      title: '分类',
      dataIndex: 'category',
      render(category) {
        return category.title;
      }
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render(auditState) {
        return auditList[auditState];
      }
    },
    {
      title: '操作',
      render(row) {
        return auditButtonList(row)[row.auditState - 1];
      }
    }
  ];

  useEffect(() => {
    getAuditListData(userInfo.username).then(res => {
      setDataSource(res);
    });
  }, [userInfo.username]);

  // 获取审核列表数据
  const getListData = async () => {
    const result = await getAuditListData(userInfo.username);
    setDataSource(result);
  };
  // 发布
  const releaseNews = async row => {
    await patchAuditPublish(row.id, { data: { publishState: 2 } });
    getListData();
  };
  // 撤销
  const cancelNews = async row => {
    await getAuditNewsListData(row.id, { data: { auditState: 0 } });
    getListData();
  };

  return <Table columns={columns} dataSource={dataSource} size="small" rowKey={row => row.id} />;
}

const mapStateToProps = state => {
  return {
    userInfo: state.loginReducer.userInfo[0]
  };
};

export default connect(mapStateToProps, null)(List);
