import React from 'react';
import { Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export default function PublishTable({ dataSource, Button }) {
  const location = useLocation();

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
        return Button(row);
      }
    }
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataSource} size="small" rowKey={row => row.id} />
    </>
  );
}
