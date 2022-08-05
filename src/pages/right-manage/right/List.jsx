import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import { getAuthListData, delAuthListDataById, patchMasterAuthListById, patchAuthListById } from '../../../api';

export default function List() {
  const [data, setData] = useState([]);
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '权限名称', dataIndex: 'title' },
    {
      title: '权限路径',
      render(datas) {
        return <Tag color="orange">{datas.key}</Tag>;
      }
    },
    {
      title: '操作',
      render(data) {
        return (
          <>
            <Popover
              content={<Switch checked={data.pagepermisson} onChange={() => changeAuth(data)} />}
              title="Title"
              trigger={data.pagepermisson ? 'click' : ''}
            >
              <Button size="small" type="primary" ghost style={{ marginRight: 10 }} disabled={!data.pagepermisson}>
                编辑
              </Button>
            </Popover>

            <Button size="small" type="primary" ghost danger onClick={() => authDelById(data)}>
              删除
            </Button>
          </>
        );
      }
    }
  ];

  // 修改 switch 状态
  const changeAuth = data => {
    data.pagepermisson = data.pagepermisson === 1 ? 0 : 1;
    if (data.grade === 1) {
      authPatchMasterById(data);
      return;
    }
    authPatchById(data);
  };

  // 获取权限列表
  const authGetData = () => {
    getAuthListData().then(res => {
      if (res[0].children?.length === 0) {
        delete res[0].children;
      }
      setData(res);
    });
  };
  // 根据 id 删除数据
  const authDelById = data => {
    Modal.confirm({
      content: '确实是否删除',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        delAuthListDataById(data.id).then(() => {
          authGetData();
        });
      }
    });
  };
  // 根据 id 修改访问权限
  const authPatchById = data => {
    patchAuthListById(data.id, { data: { pagepermisson: data.pagepermisson } }).then(() => {
      authGetData();
    });
  };
  // 根据 id 修改主菜单访问权限
  const authPatchMasterById = data => {
    patchMasterAuthListById(data.id, { data: { pagepermisson: data.pagepermisson } }).then(() => {
      authGetData();
    });
  };

  useEffect(() => {
    authGetData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={data} size="small" />
    </>
  );
}
