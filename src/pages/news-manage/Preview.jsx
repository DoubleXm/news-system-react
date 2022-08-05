import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { withRouter } from 'react-router-dom';
import { getDraftDetail } from '../../api/news-manage';

function Preview(props) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    return () => {
      window.localStorage.removeItem('currentSelectMenu');
    };
  }, []);

  useEffect(() => {
    getDraftDetail(props.match.params.id).then(res => {
      setContent(res);
    });
  }, [props.match.params.id]);

  return (
    <>
      {content && (
        <>
          <Descriptions title={content.title} size="small">
            <Descriptions.Item label="创建者">{content.author}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{content.createTime}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{content.publishTime}</Descriptions.Item>
            <Descriptions.Item label="区域">{content.region ? content.region : '全球'}</Descriptions.Item>
            <Descriptions.Item label="审核状态">{content.auditState ? '审核通过' : '未审核'}</Descriptions.Item>
            <Descriptions.Item label="发布状态">{content.publishState ? '已发布' : '未发布'}</Descriptions.Item>
            <Descriptions.Item label="访问数量">{content.view}</Descriptions.Item>
            <Descriptions.Item label="点赞数量">{content.star}</Descriptions.Item>
            <Descriptions.Item label="评论数量">0</Descriptions.Item>
          </Descriptions>
          <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
        </>
      )}
    </>
  );
}

export default withRouter(Preview);
