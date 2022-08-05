import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Row, Col, Card, List } from 'antd';
import { groupBy } from 'lodash';
import { newsList } from '../../api/outter';

export default function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getNewsList();
  }, []);

  const getNewsList = async () => {
    const result = await newsList();
    setNewsData(Object.entries(groupBy(result, item => item.category.title)));
  };

  return (
    <>
      <PageHeader title="全球大新闻" subTitle="查看新闻" />
      <div style={{ width: '98%', margin: '0 auto' }}>
        <Row gutter={[16, 16]}>
          {newsData.map(news => {
            return (
              <Col span={8} key={news[0]}>
                <Card title={news[0]} bordered hoverable size="small" style={{ height: '100%' }} className="news-card">
                  <List
                    size="small"
                    dataSource={news[1]}
                    renderItem={item => (
                      <List.Item>
                        <Link to={`/news/detail/${item.id}`}>{item.title}</Link>
                      </List.Item>
                    )}
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
