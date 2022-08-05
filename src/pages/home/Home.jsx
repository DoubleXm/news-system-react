import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import * as charts from 'echarts';
import HomeDrawer from '../../components/HomeDrawer';
import { maxPreview, maxStar, allNews } from '../../api/home';
import { chartOptions } from '../../charts';
import style from './home.module.css';

const { Meta } = Card;

function Home({ userInfo }) {
  const [stars, setStars] = useState([]);
  const [previews, setPreviews] = useState([]);
  const chartRef = useRef(null);

  const getChartData = useCallback(() => {
    allNews().then(res => {
      renderBarChart(_.groupBy(res, item => item.category.title));
    });
  }, []);

  useEffect(() => {
    getMaxPreview();
    getMaxStar();
  }, []);

  useEffect(() => {
    chartRef.current && getChartData();
  }, [chartRef, getChartData]);

  async function getMaxStar() {
    const result = await maxStar();
    setStars(result);
  }
  async function getMaxPreview() {
    const result = await maxPreview();
    setPreviews(result);
  }
  function renderBarChart(datas) {
    const chartInstance = charts.init(chartRef.current);
    const payload = {
      xAxisData: Object.keys(datas),
      seriesData: Object.values(datas).map(item => item.length)
    };
    chartInstance.setOption(chartOptions.getHomeBarChar(payload));
  }

  // 抽屉
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const maxCommonCard = data => (
    <Col span={8} style={{ height: '100%' }}>
      <Card title="用户最常浏览" bordered size="small" className={style.cardContainer}>
        <List
          size="small"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Link to={`/news-manage/preview/${item.id}`}>{item.title}</Link>
            </List.Item>
          )}
        />
      </Card>
    </Col>
  );
  return (
    <>
      <div className={style.container}>
        <div className={style.topHeader}>
          <Row gutter={16} style={{ height: '100%' }}>
            {maxCommonCard(stars)}
            {maxCommonCard(previews)}
            <Col span={8} style={{ height: '100%' }}>
              <Card
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[
                  <SettingOutlined key="setting" onClick={() => showDrawer()} />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />
                ]}
                className="imgCard"
                style={{ height: '100%' }}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={userInfo.username}
                  description={userInfo.role.roleName}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div className={style.bottomFooter}>
          <div ref={chartRef} style={{ height: '100%', width: '100%' }}></div>
        </div>
      </div>

      <HomeDrawer visible={visible} onClose={onClose} destroyOnClose />
    </>
  );
}

const mapStateToProps = state => ({ userInfo: state.loginReducer.userInfo[0] });

export default connect(mapStateToProps, null)(Home);
