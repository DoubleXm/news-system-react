import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, ToTopOutlined } from '@ant-design/icons';
import { getDraft, delDraftId, patchExamine } from '../../api/news-manage';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';

function Draft({ userInfo }) {
  const location = useLocation();
  const history = useHistory();

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
      title: '操作',
      render(row) {
        return (
          <>
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              style={{ marginRight: 10 }}
              onClick={() => {
                history.push(`/news-manage/update/${row.id}`);
              }}
            />
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              style={{ marginRight: 10 }}
              onClick={() => delGraftById(row)}
            />
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<ToTopOutlined />}
              onClick={() => submitExamine(row)}
            />
          </>
        );
      }
    }
  ];

  useEffect(() => {
    getDraft(userInfo.username).then(res => {
      setDataSource(res);
    });
  }, [userInfo.username]);

  // 获取草稿箱数据
  const getDraftData = async () => {
    const result = await getDraft(userInfo.username);
    setDataSource(result);
  };
  // 根据 id 删除草稿箱数据
  const delGraftById = row => {
    Modal.confirm({
      content: '确实是否删除',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        await delDraftId(row.id);
        getDraftData();
      }
    });
  };
  // 审核新闻
  const submitExamine = async row => {
    await patchExamine(row.id, { data: { auditState: 1 } });
    message.success('提交审核成功');
    getDraftData();
    history.push('/audit-manage/list');
  };

  return (
    <>
      <Table columns={columns} dataSource={dataSource} size="small" rowKey={row => row.id} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.loginReducer.userInfo[0]
  };
};

export default connect(mapStateToProps, null)(Draft);
