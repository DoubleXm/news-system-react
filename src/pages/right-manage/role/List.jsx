import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tree } from 'antd';
import { getRoleData, getRoleTreeData, patchRoleAuthById } from '../../../api';

export default function List() {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '角色名称', dataIndex: 'roleName' },
    {
      title: '操作',
      render(data) {
        return (
          <Button size="small" type="primary" ghost style={{ marginRight: 10 }} onClick={() => editAuth(data)}>
            编辑
          </Button>
        );
      }
    }
  ];

  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tree, setTree] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const handleOk = () => rolePatchAuthById();
  const handleCancel = () => setIsModalVisible(false);
  const onCheck = ({ checked }) => setCheckedKeys(checked);

  // 编辑权限
  const editAuth = data => {
    setIsModalVisible(true);
    getModalTreeData();
    setCheckedKeys(data.rights);
    setCurrentId(data.id);
  };

  // 获取角色列表
  const roleGetData = async () => {
    const result = await getRoleData();
    setDataSource(result);
  };
  // 获取 Modal 内 tree 数据
  const getModalTreeData = async () => {
    const result = await getRoleTreeData();
    setTree(result);
  };
  // 根据 id 修改角色权限
  const rolePatchAuthById = async () => {
    await patchRoleAuthById(currentId, { data: { rights: checkedKeys } });
    handleCancel();
    roleGetData();
  };

  useEffect(() => {
    roleGetData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={dataSource} size="small" rowKey={column => column.id} />

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree checkable checkedKeys={checkedKeys} treeData={tree} onCheck={onCheck} checkStrictly />
      </Modal>
    </>
  );
}
