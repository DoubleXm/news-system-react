import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { getUserRegionList, getUserRoleList, postUser, patchUserById } from '../../api';

const { Option } = Select;

export default function UserEditOrAdd({ visible, onCancel, editData }) {
  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        isEdit ? await editUser(editData.id, values) : await addUser(values);
        onCancel();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    getUserRegions();
    getUserRoles();
  }, []);

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  const title = useMemo(() => (editData ? '编辑用户' : '新增用户'), [editData]);
  const isEdit = useMemo(() => (editData ? true : false), [editData]);

  const [regions, setRegions] = useState([]);
  const [roles, setRoles] = useState([]);

  // 添加用户
  const addUser = async values => {
    await postUser({ data: { ...values, roleState: true, default: false } });
  };
  // 修改用户
  const editUser = async (id, values) => {
    await patchUserById(id, { data: { ...values, roleState: true, default: false } });
  };
  // 获取用户区域列表
  const getUserRegions = async () => {
    const result = await getUserRegionList();
    setRegions(result);
  };
  // 获取用户角色列表
  const getUserRoles = async () => {
    const result = await getUserRoleList();
    setRoles(result);
  };

  return (
    <>
      <Modal title={title} visible={visible} onOk={handleOk} onCancel={onCancel}>
        <Form form={form} initialValues={{ modifier: 'public' }} autoComplete="off" size="small">
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: 'Please input your 用户名!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: 'Please input your 密码!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="region" rules={[{ required: true, message: 'Please input your 角色!' }]}>
            <Select placeholder="Select a region" onChange={value => form.setFieldsValue({ region: value })}>
              {regions.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="区域" name="roleId" rules={[{ required: true, message: 'Please input your 区域!' }]}>
            <Select placeholder="Select a region" onChange={value => form.setFieldsValue({ roleId: value })}>
              {roles.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
