import React, { useEffect, useState } from 'react';
import { Button, Table, Switch, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUserData, patchUserState, deleteUserById } from '../../api';
import UserEditOrAdd from '../../components/user-manage/UserEditOrAdd';

export default function List() {
  const [dataSource, setDataSource] = useState([]);
  const [editData, setEditData] = useState(null);
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render(region) {
        return region ? region : '全球';
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render(role) {
        return role.roleName;
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      render(row) {
        return <Switch checked={row.roleState} onChange={() => onChange(row)} />;
      }
    },
    {
      title: '操作',
      render(row) {
        return (
          <>
            <Button
              type="primary"
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                showModal();
                setEditData(row);
              }}
            />
            <Button
              type="primary"
              size="small"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  content: '是否确认删除',
                  onOk() {
                    delUserById(row.id);
                  }
                });
              }}
            />
          </>
        );
      }
    }
  ];

  useEffect(() => {
    userGetData();
  }, []);

  // switch
  const onChange = row => {
    row.roleState = row.roleState ? false : true;
    userPatchUserStateById(row);
  };
  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (!isModalVisible) {
      userGetData();
    }
  }, [isModalVisible]);

  // 获取用户列表数据
  const userGetData = async () => {
    const result = await getUserData();
    setDataSource(result);
  };
  // 根据 id 修改用户状态
  const userPatchUserStateById = async row => {
    await patchUserState(row.id, { data: { roleState: row.roleState } });
    userGetData();
  };
  // 根据 id 删除用户
  const delUserById = async id => {
    await deleteUserById(id);
    userGetData();
  };

  return (
    <>
      <Button type="primary" size="small" style={{ marginBottom: 10 }} onClick={showModal}>
        添加用户
      </Button>
      <Table columns={columns} dataSource={dataSource} rowKey={row => row.id} size="small" />

      <UserEditOrAdd visible={isModalVisible} onCancel={handleCancel} editData={editData} />
    </>
  );
}
