import React, { useState, useEffect, useRef, useContext } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteNewsCategoryById, getNewsCategory, patchNewsCategoryById } from '../../api/news-manage';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function Category() {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '栏目名称', dataIndex: 'title', editable: true },
    {
      title: '操作',
      render(row) {
        return (
          <>
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              style={{ marginRight: 10 }}
              onClick={() => delNewsCategoryById(row)}
            />
          </>
        );
      }
    }
  ].map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });
  const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    setNewsCategoryById(row);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  useEffect(() => {
    getNewsCategoryData();
  }, []);

  // 获取新闻分类列表数据
  const getNewsCategoryData = async () => {
    const result = await getNewsCategory();
    setDataSource(result);
  };
  // 根据 id 删除新闻分类数据
  const delNewsCategoryById = row => {
    Modal.confirm({
      content: '确实是否删除',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        await deleteNewsCategoryById(row.id);
        getNewsCategoryData();
      }
    });
  };
  // 根据 id 修改新闻分类
  const setNewsCategoryById = async row => {
    await patchNewsCategoryById(row.id, { data: { title: row.title } });
    getNewsCategoryData();
  };

  return (
    <>
      <Table components={components} columns={columns} dataSource={dataSource} size="small" rowKey={row => row.id} />
    </>
  );
}
