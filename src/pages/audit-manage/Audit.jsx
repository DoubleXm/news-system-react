import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { getAuditNewsListData, patchExamine } from '../../api/audit-manage';

function List({ userInfo }) {
  const location = useLocation();

  const [dataSource, setDataSource] = useState([]);
  const columns = [
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
      title: '操作',
      render(row) {
        return (
          <>
            <Button size="small" type="primary" style={{ marginRight: 10 }} onClick={() => yesOrNo(row, 1, 2)}>
              通过
            </Button>
            <Button size="small" type="primary" danger onClick={() => yesOrNo(row, 0, 3)}>
              驳回
            </Button>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    getListData();
  }, []);

  // 获取审核新闻列表数据
  const getListData = async () => {
    const result = await getAuditNewsListData();
    setDataSource(result);
  };
  // 审核通过 or 驳回
  const yesOrNo = async (row, publishState, auditState) => {
    await patchExamine(row.id, { data: { publishState, auditState } });
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
