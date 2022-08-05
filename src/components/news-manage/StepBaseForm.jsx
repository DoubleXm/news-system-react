import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { getNewsCategory } from '../../api/news-manage';

const { Option } = Select;

export default function StepBaseForm({ getForm }) {
  const [newsOptions, setNewsOptions] = useState([]);
  const [form] = Form.useForm();

  // 获取新闻分类列表
  const getNewsOptions = async () => {
    const result = await getNewsCategory();
    setNewsOptions(result);
  };

  useEffect(() => {
    getNewsOptions();
  }, []);

  useEffect(() => {
    getForm(form);
  }, [getForm, form]);

  return (
    <Form form={form} autoComplete="off">
      <Form.Item label="新闻标题" name="title" rules={[{ required: true, message: 'Please input your 新闻标题!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="新闻分类"
        name="categoryId"
        rules={[{ required: true, message: 'Please select your 新闻分类!' }]}
      >
        <Select>
          {newsOptions.map(item => (
            <Option value={item.id} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
